import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as n}from"./index-JhL3uwfD.js";import{c as s}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const R=n.createContext({open:!0,setOpen:()=>{},toggleSidebar:()=>{}});function T(){const a=n.useContext(R);if(!a)throw new Error("useSidebar must be used within a SidebarProvider.");return a}const x=n.forwardRef(({defaultOpen:a=!0,open:r,onOpenChange:t,className:d,children:i,...o},l)=>{const[C,H]=n.useState(a),b=r??C,g=n.useCallback(S=>{t==null||t(S),H(S)},[t]),q=n.useCallback(()=>g(!b),[b,g]);return e.jsx(R.Provider,{value:{open:b,setOpen:g,toggleSidebar:q},children:e.jsx("div",{ref:l,className:s("flex min-h-svh w-full",d),...o,children:i})})});x.displayName="SidebarProvider";const c=n.forwardRef(({side:a="left",collapsible:r="offcanvas",className:t,children:d,...i},o)=>{const{open:l}=T();return r==="none"?e.jsx("div",{ref:o,className:s("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",t),...i,children:d}):e.jsx("div",{ref:o,className:s("group/sidebar relative flex flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear",l?"w-[--sidebar-width]":r==="icon"?"w-[--sidebar-width-icon]":"w-0",a==="right"&&"order-last",t),"data-state":l?"expanded":"collapsed","data-side":a,...i,children:e.jsx("div",{className:s("flex h-full w-[--sidebar-width] flex-col overflow-hidden",!l&&r==="offcanvas"&&"invisible"),children:d})})});c.displayName="Sidebar";const f=n.forwardRef(({className:a,...r},t)=>e.jsx("div",{ref:t,className:s("flex flex-col gap-2 p-2",a),...r}));f.displayName="SidebarHeader";const h=n.forwardRef(({className:a,...r},t)=>e.jsx("div",{ref:t,className:s("flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2",a),...r}));h.displayName="SidebarContent";const v=n.forwardRef(({className:a,...r},t)=>e.jsx("div",{ref:t,className:s("flex flex-col gap-2 p-2",a),...r}));v.displayName="SidebarFooter";const u=n.forwardRef(({className:a,onClick:r,...t},d)=>{const{toggleSidebar:i}=T();return e.jsxs("button",{ref:d,className:s("h-7 w-7",a),onClick:o=>{r==null||r(o),i()},...t,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"h-4 w-4",children:[e.jsx("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),e.jsx("path",{d:"M9 3v18"})]}),e.jsx("span",{className:"sr-only",children:"Toggle Sidebar"})]})});u.displayName="SidebarTrigger";c.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{side:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},collapsible:{required:!1,tsType:{name:"union",raw:'"offcanvas" | "icon" | "none"',elements:[{name:"literal",value:'"offcanvas"'},{name:"literal",value:'"icon"'},{name:"literal",value:'"none"'}]},description:"",defaultValue:{value:'"offcanvas"',computed:!1}}}};x.__docgenInfo={description:"",methods:[],displayName:"SidebarProvider",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},defaultOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""}}};f.__docgenInfo={description:"",methods:[],displayName:"SidebarHeader"};h.__docgenInfo={description:"",methods:[],displayName:"SidebarContent"};v.__docgenInfo={description:"",methods:[],displayName:"SidebarFooter"};u.__docgenInfo={description:"",methods:[],displayName:"SidebarTrigger"};const F={title:"Components/Sidebar",component:c,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>e.jsxs(x,{defaultOpen:!0,style:{"--sidebar-width":"240px","--sidebar-width-icon":"48px",height:400,width:600},className:"border rounded-lg overflow-hidden",children:[e.jsxs(c,{children:[e.jsx(f,{children:e.jsx("span",{className:"text-lg font-semibold px-2",children:"App Name"})}),e.jsx(h,{children:e.jsxs("nav",{className:"flex flex-col gap-1",children:[e.jsx("a",{href:"#",className:"rounded-md px-3 py-2 text-sm hover:bg-accent",children:"Dashboard"}),e.jsx("a",{href:"#",className:"rounded-md px-3 py-2 text-sm hover:bg-accent",children:"Projects"}),e.jsx("a",{href:"#",className:"rounded-md px-3 py-2 text-sm hover:bg-accent",children:"Settings"})]})}),e.jsx(v,{children:e.jsx("span",{className:"text-xs text-muted-foreground px-2",children:"v1.0.0"})})]}),e.jsxs("main",{className:"flex-1 p-4",children:[e.jsx(u,{}),e.jsx("p",{className:"mt-4 text-sm text-muted-foreground",children:"Main content area. Click the trigger to toggle the sidebar."})]})]})},p={render:()=>e.jsxs(x,{defaultOpen:!0,style:{"--sidebar-width":"240px","--sidebar-width-icon":"48px",height:400,width:600},className:"border rounded-lg overflow-hidden",children:[e.jsxs("main",{className:"flex-1 p-4",children:[e.jsx(u,{}),e.jsx("p",{className:"mt-4 text-sm text-muted-foreground",children:"Main content with sidebar on the right."})]}),e.jsxs(c,{side:"right",children:[e.jsx(f,{children:e.jsx("span",{className:"text-lg font-semibold px-2",children:"Details"})}),e.jsx(h,{children:e.jsx("div",{className:"px-3 text-sm",children:e.jsx("p",{children:"Additional information panel."})})})]})]})};var w,N,j;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <SidebarProvider defaultOpen style={{
    "--sidebar-width": "240px",
    "--sidebar-width-icon": "48px",
    height: 400,
    width: 600
  } as React.CSSProperties} className="border rounded-lg overflow-hidden">
      <Sidebar>
        <SidebarHeader>
          <span className="text-lg font-semibold px-2">App Name</span>
        </SidebarHeader>
        <SidebarContent>
          <nav className="flex flex-col gap-1">
            <a href="#" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Dashboard
            </a>
            <a href="#" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Projects
            </a>
            <a href="#" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Settings
            </a>
          </nav>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-xs text-muted-foreground px-2">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <p className="mt-4 text-sm text-muted-foreground">
          Main content area. Click the trigger to toggle the sidebar.
        </p>
      </main>
    </SidebarProvider>
}`,...(j=(N=m.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var y,_,P;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <SidebarProvider defaultOpen style={{
    "--sidebar-width": "240px",
    "--sidebar-width-icon": "48px",
    height: 400,
    width: 600
  } as React.CSSProperties} className="border rounded-lg overflow-hidden">
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <p className="mt-4 text-sm text-muted-foreground">
          Main content with sidebar on the right.
        </p>
      </main>
      <Sidebar side="right">
        <SidebarHeader>
          <span className="text-lg font-semibold px-2">Details</span>
        </SidebarHeader>
        <SidebarContent>
          <div className="px-3 text-sm">
            <p>Additional information panel.</p>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
}`,...(P=(_=p.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};const M=["Default","RightSide"];export{m as Default,p as RightSide,M as __namedExportsOrder,F as default};
