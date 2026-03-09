import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-JhL3uwfD.js";import{S as x}from"./index-CA2oR2yp.js";import{c as n}from"./cn-BmGQd4RS.js";import"./index-CB6uX4vz.js";import"./bundle-mjs-Ce1ZTWB2.js";function g(r){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...r,children:e.jsx("path",{d:"m9 18 6-6-6-6"})})}const i=t.forwardRef(({...r},a)=>e.jsx("nav",{ref:a,"aria-label":"breadcrumb",...r}));i.displayName="Breadcrumb";const p=t.forwardRef(({className:r,...a},o)=>e.jsx("ol",{ref:o,className:n("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",r),...a}));p.displayName="BreadcrumbList";const s=t.forwardRef(({className:r,...a},o)=>e.jsx("li",{ref:o,className:n("inline-flex items-center gap-1.5",r),...a}));s.displayName="BreadcrumbItem";const m=t.forwardRef(({asChild:r,className:a,...o},B)=>{const h=r?x:"a";return e.jsx(h,{ref:B,className:n("transition-colors hover:text-foreground",a),...o})});m.displayName="BreadcrumbLink";const u=t.forwardRef(({className:r,...a},o)=>e.jsx("span",{ref:o,role:"link","aria-disabled":"true","aria-current":"page",className:n("font-normal text-foreground",r),...a}));u.displayName="BreadcrumbPage";const c=({children:r,className:a,...o})=>e.jsx("li",{role:"presentation","aria-hidden":"true",className:n("[&>svg]:h-3.5 [&>svg]:w-3.5",a),...o,children:r??e.jsx(g,{})});c.displayName="BreadcrumbSeparator";i.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb",props:{separator:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbList"};s.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbItem"};m.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbLink",props:{asChild:{required:!1,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbPage"};c.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbSeparator"};const _={title:"Components/Breadcrumb",component:i,parameters:{layout:"centered"},tags:["autodocs"]},d={args:{children:e.jsxs(p,{children:[e.jsx(s,{children:e.jsx(m,{href:"/",children:"Home"})}),e.jsx(c,{}),e.jsx(s,{children:e.jsx(m,{href:"/components",children:"Components"})}),e.jsx(c,{}),e.jsx(s,{children:e.jsx(u,{children:"Breadcrumb"})})]})}};var l,b,f;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
  }
}`,...(f=(b=d.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const k=["Default"];export{d as Default,k as __namedExportsOrder,_ as default};
