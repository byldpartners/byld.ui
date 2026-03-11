import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const componentName = process.argv[2];

if (!componentName) {
  console.error("Usage: pnpm new-component <ComponentName>");
  process.exit(1);
}

if (!/^[A-Z][a-zA-Z]+$/.test(componentName)) {
  console.error("Component name must be PascalCase (e.g., Button, DatePicker)");
  process.exit(1);
}

const componentsDir = join(__dirname, "..", "packages", "ui", "src", "components");
const componentDir = join(componentsDir, componentName);

// Create directory
mkdirSync(componentDir, { recursive: true });

// Types file
writeFileSync(
  join(componentDir, `${componentName}.types.ts`),
  `export interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}
`,
);

// Web implementation
writeFileSync(
  join(componentDir, `${componentName}.web.tsx`),
  `import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { ${componentName}Props } from "./${componentName}.types";

const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  },
);
${componentName}.displayName = "${componentName}";

export { ${componentName} };
`,
);

// Native implementation (uniwind — Tailwind className)
writeFileSync(
  join(componentDir, `${componentName}.native.tsx`),
  `import { View } from "react-native";
import { cn } from "../../utils/cn";
import type { ${componentName}Props } from "./${componentName}.types";

function ${componentName}({ children, className, ...props }: ${componentName}Props) {
  return (
    <View className={cn("", className)} {...props}>
      {children}
    </View>
  );
}

${componentName}.displayName = "${componentName}";

export { ${componentName} };
`,
);

// Index barrel (web — imports .web explicitly for esbuild)
writeFileSync(
  join(componentDir, "index.ts"),
  `export { ${componentName} } from "./${componentName}.web";
export type { ${componentName}Props } from "./${componentName}.types";
`,
);

// Index barrel (native — Metro resolves .native automatically)
writeFileSync(
  join(componentDir, "index.native.ts"),
  `export { ${componentName} } from "./${componentName}.native";
export type { ${componentName}Props } from "./${componentName}.types";
`,
);

// Update components barrel files (web + native)
for (const suffix of ["index.ts", "index.native.ts"]) {
  const barrelPath = join(componentsDir, suffix);
  let barrel: string;
  try {
    barrel = readFileSync(barrelPath, "utf-8");
  } catch {
    barrel = "";
  }
  const exportLine = `export { ${componentName} } from "./${componentName}";\nexport type { ${componentName}Props } from "./${componentName}";`;

  if (!barrel.includes(`"./${componentName}"`)) {
    barrel = barrel.trimEnd() + "\n" + exportLine + "\n";
    writeFileSync(barrelPath, barrel);
  }
}

console.log(`✓ Created ${componentName} component at packages/ui/src/components/${componentName}/`);
console.log(`  - ${componentName}.types.ts`);
console.log(`  - ${componentName}.web.tsx`);
console.log(`  - ${componentName}.native.tsx`);
console.log(`  - index.ts (web)`);
console.log(`  - index.native.ts (native)`);
console.log(`  - Updated components barrels`);
