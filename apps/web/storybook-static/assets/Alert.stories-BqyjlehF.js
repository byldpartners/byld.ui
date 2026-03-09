import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-JhL3uwfD.js";import{c as h}from"./index-DgkKfON_.js";import{c as l}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const A=h("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),c=d.forwardRef(({className:t,variant:r,...s},f)=>e.jsx("div",{ref:f,role:"alert",className:l(A({variant:r}),t),...s}));c.displayName="Alert";const o=d.forwardRef(({className:t,...r},s)=>e.jsx("h5",{ref:s,className:l("mb-1 font-medium leading-none tracking-tight",t),...r}));o.displayName="AlertTitle";const i=d.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:l("text-sm [&_p]:leading-relaxed",t),...r}));i.displayName="AlertDescription";c.__docgenInfo={description:"",methods:[],displayName:"Alert"};o.__docgenInfo={description:"",methods:[],displayName:"AlertTitle"};i.__docgenInfo={description:"",methods:[],displayName:"AlertDescription"};const w={title:"Components/Alert",component:c,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{style:{width:420},children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Heads up!"}),e.jsx(i,{children:"You can add components to your app using the CLI."})]})}},n={args:{variant:"destructive",style:{width:420},children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Error"}),e.jsx(i,{children:"Your session has expired. Please log in again."})]})}};var p,m,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    style: {
      width: 420
    },
    children: <>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </>
  }
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,v,x;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: "destructive",
    style: {
      width: 420
    },
    children: <>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </>
  }
}`,...(x=(v=n.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const b=["Default","Destructive"];export{a as Default,n as Destructive,b as __namedExportsOrder,w as default};
