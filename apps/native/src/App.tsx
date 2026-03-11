import "../global.css";
import { useState } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { oceanPreset } from "./ocean-theme";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AspectRatio,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Combobox,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  DataTable,
  DatePicker,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Input,
  InputOTP,
  Label,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger as NavMenuTrigger,
  NavigationMenuLink,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ScrollArea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  toast,
  ToastProvider,
  ToastViewport,
  ThemeProvider,
  defaultPreset,
  darkPreset,
  auroraPreset,
  useTheme,
} from "@byldpartners/ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-lg font-semibold text-foreground">{title}</Text>
      {children}
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text className="text-sm text-muted-foreground">{children}</Text>;
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const order = ["default", "dark", "aurora", "ocean"] as const;
  const labels: Record<string, string> = { default: "Light", dark: "Dark", aurora: "Aurora", ocean: "Ocean" };
  return (
    <Button
      variant="outline"
      size="sm"
      onPress={() => {
        const i = order.indexOf(theme as (typeof order)[number]);
        const next = order[(i + 1) % order.length];
        setTheme(next);
      }}
    >
      {labels[theme] ?? "Light"}
    </Button>
  );
}

const dataTableColumns = [
  { id: "name", accessorKey: "name" as const, header: "Name" },
  { id: "email", accessorKey: "email" as const, header: "Email" },
  { id: "role", accessorKey: "role" as const, header: "Role" },
];

const dataTableData = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { name: "Charlie Brown", email: "charlie@example.com", role: "Viewer" },
];

const comboboxOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export default function App() {
  return (
    <ThemeProvider presets={[defaultPreset, darkPreset, auroraPreset, oceanPreset]}>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [radioValue, setRadioValue] = useState("option-1");
  const [sliderValue, setSliderValue] = useState([50]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined);
  const [comboValue, setComboValue] = useState("");

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1">
        <StatusBar style={theme === "default" ? "dark" : "light"} />
        <ToastProvider>
        <ScrollView contentContainerClassName="p-6 gap-8 pb-24">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-foreground">
              @byldpartners/ui
            </Text>
            <ThemeSwitcher />
          </View>

          {/* ── Button ── */}
          <Section title="Button">
            <SectionLabel>Variants</SectionLabel>
            <View className="gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </View>
            <SectionLabel>Sizes</SectionLabel>
            <View className="gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </View>
            <Button disabled>Disabled</Button>
            <SectionLabel>Liquid Glass</SectionLabel>
            <View className="rounded-xl overflow-hidden">
              <ImageBackground
                source={{ uri: "https://picsum.photos/800/400" }}
                className="p-4 gap-2"
              >
                <Button glass glassTextColor="text-foreground">Glass Default</Button>
                <Button glass variant="secondary" glassTextColor="text-secondary-foreground">Glass Secondary</Button>
                <Button glass glassEffect="clear" glassTextColor="text-primary-foreground">Glass Clear</Button>
              </ImageBackground>
            </View>
          </Section>

          <Separator />

          {/* ── Badge ── */}
          <Section title="Badge">
            <View className="flex-row gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </View>
          </Section>

          <Separator />

          {/* ── Card ── */}
          <Section title="Card">
            <Card className="p-4 gap-2">
              <Text className="text-base font-semibold text-foreground">Card Title</Text>
              <Text className="text-sm text-muted-foreground">
                This is a card component with some example content.
              </Text>
            </Card>
            <SectionLabel>Liquid Glass</SectionLabel>
            <View className="rounded-xl overflow-hidden">
              <ImageBackground
                source={{ uri: "https://picsum.photos/800/600" }}
                className="p-4 gap-3"
              >
                <Card glass className="p-4 gap-2">
                  <Text className="text-base font-semibold text-foreground">Glass Card</Text>
                  <Text className="text-sm text-muted-foreground">
                    Translucent liquid glass background on iOS 26+.
                  </Text>
                </Card>
                <Card glass glassEffect="clear" className="p-4 gap-2">
                  <Text className="text-base font-semibold text-foreground">Clear Glass Card</Text>
                  <Text className="text-sm text-muted-foreground">
                    Clear glass effect variant.
                  </Text>
                </Card>
              </ImageBackground>
            </View>
          </Section>

          <Separator />

          {/* ── Alert ── */}
          <Section title="Alert">
            <Alert variant="default">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </Section>

          <Separator />

          {/* ── Input ── */}
          <Section title="Input">
            <Input
              placeholder="Type something..."
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Input placeholder="Disabled" disabled />
          </Section>

          <Separator />

          {/* ── Textarea ── */}
          <Section title="Textarea">
            <Textarea
              placeholder="Write a message..."
              value={textareaValue}
              onChangeText={setTextareaValue}
            />
          </Section>

          <Separator />

          {/* ── Label ── */}
          <Section title="Label">
            <View className="gap-1">
              <Label>Email address</Label>
              <Input placeholder="you@example.com" />
            </View>
          </Section>

          <Separator />

          {/* ── Checkbox ── */}
          <Section title="Checkbox">
            <View className="flex-row items-center gap-2">
              <Checkbox
                checked={checkboxChecked}
                onCheckedChange={setCheckboxChecked}
              />
              <Text className="text-sm text-foreground">
                Accept terms and conditions
              </Text>
            </View>
          </Section>

          <Separator />

          {/* ── Switch ── */}
          <Section title="Switch">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-foreground">Airplane Mode</Text>
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            </View>
          </Section>

          <Separator />

          {/* ── RadioGroup ── */}
          <Section title="RadioGroup">
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <View className="flex-row items-center gap-2">
                <RadioGroupItem value="option-1" />
                <Text className="text-sm text-foreground">Option One</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <RadioGroupItem value="option-2" />
                <Text className="text-sm text-foreground">Option Two</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <RadioGroupItem value="option-3" />
                <Text className="text-sm text-foreground">Option Three</Text>
              </View>
            </RadioGroup>
          </Section>

          <Separator />

          {/* ── Select ── */}
          <Section title="Select">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple"><Text>Apple</Text></SelectItem>
                <SelectItem value="banana"><Text>Banana</Text></SelectItem>
                <SelectItem value="cherry"><Text>Cherry</Text></SelectItem>
              </SelectContent>
            </Select>
          </Section>

          <Separator />

          {/* ── Combobox ── */}
          <Section title="Combobox">
            <Combobox
              options={comboboxOptions}
              value={comboValue}
              onValueChange={setComboValue}
              placeholder="Select framework..."
              searchPlaceholder="Search frameworks..."
            />
          </Section>

          <Separator />

          {/* ── Slider ── */}
          <Section title="Slider">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              min={0}
              max={100}
            />
            <Text className="text-sm text-muted-foreground">Value: {sliderValue[0]}</Text>
          </Section>

          <Separator />

          {/* ── Progress ── */}
          <Section title="Progress">
            <Progress value={66} />
          </Section>

          <Separator />

          {/* ── Toggle ── */}
          <Section title="Toggle">
            <View className="flex-row gap-2">
              <Toggle variant="default"><Text className="text-foreground">B</Text></Toggle>
              <Toggle variant="outline"><Text className="text-foreground">I</Text></Toggle>
            </View>
          </Section>

          <Separator />

          {/* ── ToggleGroup ── */}
          <Section title="ToggleGroup">
            <ToggleGroup type="single">
              <ToggleGroupItem value="left"><Text className="text-foreground">Left</Text></ToggleGroupItem>
              <ToggleGroupItem value="center"><Text className="text-foreground">Center</Text></ToggleGroupItem>
              <ToggleGroupItem value="right"><Text className="text-foreground">Right</Text></ToggleGroupItem>
            </ToggleGroup>
          </Section>

          <Separator />

          {/* ── Tabs ── */}
          <Section title="Tabs">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Text className="text-sm text-foreground">
                  Make changes to your account here.
                </Text>
              </TabsContent>
              <TabsContent value="password">
                <Text className="text-sm text-foreground">
                  Change your password here.
                </Text>
              </TabsContent>
            </Tabs>
          </Section>

          <Separator />

          {/* ── Accordion ── */}
          <Section title="Accordion">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  <Text className="text-sm text-foreground">
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  <Text className="text-sm text-foreground">
                    Yes. It comes with default styles using Tailwind CSS.
                  </Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Separator />

          {/* ── Collapsible ── */}
          <Section title="Collapsible">
            <Collapsible>
              <CollapsibleTrigger><Text className="text-foreground">Toggle Content</Text></CollapsibleTrigger>
              <CollapsibleContent>
                <Text className="text-sm text-foreground p-2">
                  This content can be toggled.
                </Text>
              </CollapsibleContent>
            </Collapsible>
          </Section>

          <Separator />

          {/* ── Avatar ── */}
          <Section title="Avatar">
            <View className="flex-row gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </View>
          </Section>

          <Separator />

          {/* ── Skeleton ── */}
          <Section title="Skeleton">
            <View className="flex-row items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <View className="gap-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </View>
            </View>
          </Section>

          <Separator />

          {/* ── Separator ── */}
          <Section title="Separator">
            <View className="gap-2">
              <Text className="text-sm text-foreground">Horizontal</Text>
              <Separator orientation="horizontal" />
              <View className="flex-row items-center gap-2 h-6">
                <Text className="text-sm text-foreground">Left</Text>
                <Separator orientation="vertical" />
                <Text className="text-sm text-foreground">Right</Text>
              </View>
            </View>
          </Section>

          <Separator />

          {/* ── AspectRatio ── */}
          <Section title="AspectRatio">
            <AspectRatio ratio={16 / 9}>
              <View className="flex-1 bg-muted items-center justify-center rounded-md">
                <Text className="text-sm text-muted-foreground">16:9</Text>
              </View>
            </AspectRatio>
          </Section>

          <Separator />

          {/* ── Calendar ── */}
          <Section title="Calendar">
            <Calendar selected={selectedDate} onSelect={setSelectedDate} />
          </Section>

          <Separator />

          {/* ── DatePicker ── */}
          <Section title="DatePicker">
            <DatePicker value={pickerDate} onValueChange={setPickerDate} />
          </Section>

          <Separator />

          {/* ── InputOTP ── */}
          <Section title="InputOTP">
            <InputOTP length={6} />
          </Section>

          <Separator />

          {/* ── Breadcrumb ── */}
          <Section title="Breadcrumb">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Section>

          <Separator />

          {/* ── Pagination ── */}
          <Section title="Pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onPress={() => setCurrentPage((p) => Math.max(1, p - 1))} />
                </PaginationItem>
                {[1, 2, 3].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onPress={() => setCurrentPage(page)}
                    >
                      <Text className="text-sm font-medium text-foreground">{page}</Text>
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onPress={() => setCurrentPage((p) => Math.min(3, p + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Section>

          <Separator />

          {/* ── Table ── */}
          <Section title="Table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alice</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob</TableCell>
                  <TableCell>Inactive</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          <Separator />

          {/* ── DataTable ── */}
          <Section title="DataTable">
            <DataTable columns={dataTableColumns} data={dataTableData} />
          </Section>

          <Separator />

          {/* ── Dialog ── */}
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger>
                <View className="flex-row items-center justify-center rounded-md border border-input h-9 px-4">
                  <Text className="text-sm font-medium text-foreground">Open Dialog</Text>
                </View>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <Input placeholder="Name" />
                <DialogFooter>
                  <Button>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Separator />

          {/* ── AlertDialog ── */}
          <Section title="AlertDialog">
            <AlertDialog>
              <AlertDialogTrigger>
                <View className="flex-row items-center justify-center rounded-md bg-destructive h-9 px-4">
                  <Text className="text-sm font-medium text-destructive-foreground">Delete Account</Text>
                </View>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Section>

          <Separator />

          {/* ── Sheet ── */}
          <Section title="Sheet">
            <Sheet>
              <SheetTrigger>
                <View className="flex-row items-center justify-center rounded-md border border-input h-9 px-4">
                  <Text className="text-sm font-medium text-foreground">Open Sheet</Text>
                </View>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>
                    This is a bottom sheet.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </Section>

          <Separator />

          {/* ── Drawer ── */}
          <Section title="Drawer">
            <Drawer>
              <DrawerTrigger>
                <View className="flex-row items-center justify-center rounded-md border border-input h-9 px-4">
                  <Text className="text-sm font-medium text-foreground">Open Drawer</Text>
                </View>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>
                    This is a drawer component.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Section>

          <Separator />

          {/* ── Popover ── */}
          <Section title="Popover">
            <Popover>
              <PopoverTrigger>
                <View className="flex-row items-center justify-center rounded-md border border-input h-9 px-4">
                  <Text className="text-sm font-medium text-foreground">Open Popover</Text>
                </View>
              </PopoverTrigger>
              <PopoverContent>
                <Text className="text-sm text-foreground">
                  Popover content goes here.
                </Text>
              </PopoverContent>
            </Popover>
          </Section>

          <Separator />

          {/* ── DropdownMenu ── */}
          <Section title="DropdownMenu">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <View className="flex-row items-center justify-center rounded-md border border-input h-9 px-4">
                  <Text className="text-sm font-medium text-foreground">Open Menu</Text>
                </View>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Text>Profile</Text></DropdownMenuItem>
                <DropdownMenuItem><Text>Settings</Text></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Text>Log out</Text></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          <Separator />

          {/* ── ContextMenu ── */}
          <Section title="ContextMenu">
            <ContextMenu>
              <ContextMenuTrigger>
                <View className="items-center justify-center rounded-md border border-dashed border-border h-24">
                  <Text className="text-sm text-muted-foreground">Long press here</Text>
                </View>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem><Text>Cut</Text></ContextMenuItem>
                <ContextMenuItem><Text>Copy</Text></ContextMenuItem>
                <ContextMenuItem><Text>Paste</Text></ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </Section>

          <Separator />

          {/* ── Menubar ── */}
          <Section title="Menubar">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem><Text>New Tab</Text></MenubarItem>
                  <MenubarItem><Text>New Window</Text></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem><Text>Share</Text></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem><Text>Print</Text></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem><Text>Undo</Text></MenubarItem>
                  <MenubarItem><Text>Redo</Text></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem><Text>Cut</Text></MenubarItem>
                  <MenubarItem><Text>Copy</Text></MenubarItem>
                  <MenubarItem><Text>Paste</Text></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </Section>

          <Separator />

          {/* ── NavigationMenu ── */}
          <Section title="NavigationMenu">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavMenuTrigger>Getting Started</NavMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>Documentation</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>Components</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </Section>

          <Separator />

          {/* ── Carousel ── */}
          <Section title="Carousel">
            <Carousel>
              <CarouselContent>
                {[1, 2, 3, 4].map((i) => (
                  <CarouselItem key={i}>
                    <View className="bg-muted items-center justify-center rounded-md h-32">
                      <Text className="text-2xl font-bold text-muted-foreground">{i}</Text>
                    </View>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <View className="flex-row justify-center gap-4 mt-2">
                <CarouselPrevious />
                <CarouselNext />
              </View>
            </Carousel>
          </Section>

          <Separator />

          {/* ── ScrollArea ── */}
          <Section title="ScrollArea">
            <ScrollArea className="h-24 border border-border rounded-md">
              {Array.from({ length: 10 }, (_, i) => (
                <Text key={i} className="text-sm text-foreground p-2">
                  Scrollable item {i + 1}
                </Text>
              ))}
            </ScrollArea>
          </Section>

          <Separator />

          {/* ── ResizablePanel ── */}
          <Section title="ResizablePanel">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <View className="items-center justify-center p-4">
                  <Text className="text-sm text-foreground">Panel One</Text>
                </View>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <View className="items-center justify-center p-4">
                  <Text className="text-sm text-foreground">Panel Two</Text>
                </View>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Section>

          <Separator />

          {/* ── Form ── */}
          <Section title="Form">
            <Form>
              <FormField name="username">
                <FormItem>
                  <FormLabel>
                    <Text className="text-sm font-medium text-foreground">Username</Text>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" />
                  </FormControl>
                  <FormDescription>
                    <Text className="text-sm text-muted-foreground">This is your public display name.</Text>
                  </FormDescription>
                </FormItem>
              </FormField>
            </Form>
          </Section>

          <Separator />

          {/* ── Toast ── */}
          <Section title="Toast">
            <View className="gap-2">
              <Button
                variant="default"
                onPress={() =>
                  toast({
                    title: "Success",
                    description: "Your changes were saved.",
                  })
                }
              >
                Show Toast
              </Button>
              <Button
                variant="destructive"
                onPress={() =>
                  toast({
                    title: "Error",
                    description: "Something went wrong.",
                    variant: "destructive",
                  })
                }
              >
                Destructive Toast
              </Button>
            </View>
          </Section>
        </ScrollView>
        <ToastViewport />
        </ToastProvider>
      </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
