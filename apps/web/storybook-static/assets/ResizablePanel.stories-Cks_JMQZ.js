import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-JhL3uwfD.js";import{c as m}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const i=p.forwardRef(({className:r,direction:t="horizontal",children:s,...l},f)=>e.jsx("div",{ref:f,"data-panel-group":"","data-panel-group-direction":t,className:m("flex h-full w-full data-[panel-group-direction=vertical]:flex-col",r),...l,children:s}));i.displayName="ResizablePanelGroup";const a=p.forwardRef(({className:r,defaultSize:t,minSize:s,maxSize:l,children:f,style:R,...g},P)=>e.jsx("div",{ref:P,"data-panel":"",className:m("relative overflow-auto",r),style:{flexGrow:t??1,flexShrink:1,flexBasis:0,minWidth:s?`${s}%`:void 0,maxWidth:l?`${l}%`:void 0,overflow:"auto",resize:"both",...R},...g,children:f}));a.displayName="ResizablePanel";const n=p.forwardRef(({className:r,withHandle:t,...s},l)=>e.jsx("div",{ref:l,"data-panel-resize-handle":"",className:m("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",r),...s,children:t&&e.jsx("div",{className:"z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"5",r:"1"}),e.jsx("circle",{cx:"12",cy:"12",r:"1"}),e.jsx("circle",{cx:"12",cy:"19",r:"1"}),e.jsx("circle",{cx:"19",cy:"5",r:"1"}),e.jsx("circle",{cx:"19",cy:"12",r:"1"}),e.jsx("circle",{cx:"19",cy:"19",r:"1"})]})})}));n.displayName="ResizableHandle";i.__docgenInfo={description:"",methods:[],displayName:"ResizablePanelGroup",props:{direction:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};a.__docgenInfo={description:"",methods:[],displayName:"ResizablePanel",props:{defaultSize:{required:!1,tsType:{name:"number"},description:""},minSize:{required:!1,tsType:{name:"number"},description:""},maxSize:{required:!1,tsType:{name:"number"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"ResizableHandle",props:{withHandle:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const q={title:"Components/ResizablePanel",component:i,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>e.jsx("div",{style:{width:500,height:200},className:"rounded-lg border",children:e.jsxs(i,{direction:"horizontal",children:[e.jsx(a,{defaultSize:1,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Panel One"})})}),e.jsx(n,{withHandle:!0}),e.jsx(a,{defaultSize:1,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Panel Two"})})})]})})},c={render:()=>e.jsx("div",{style:{width:500,height:300},className:"rounded-lg border",children:e.jsxs(i,{direction:"vertical",children:[e.jsx(a,{defaultSize:1,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Top Panel"})})}),e.jsx(n,{withHandle:!0}),e.jsx(a,{defaultSize:1,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Bottom Panel"})})})]})})},o={render:()=>e.jsx("div",{style:{width:500,height:200},className:"rounded-lg border",children:e.jsxs(i,{direction:"horizontal",children:[e.jsx(a,{defaultSize:1,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Left"})})}),e.jsx(n,{}),e.jsx(a,{defaultSize:2,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Center"})})}),e.jsx(n,{}),e.jsx(a,{defaultSize:1,children:e.jsx("div",{className:"flex h-full items-center justify-center p-6",children:e.jsx("span",{className:"font-semibold",children:"Right"})})})]})})};var u,h,x;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 500,
    height: 200
  }} className="rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
}`,...(x=(h=d.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var b,v,j;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 500,
    height: 300
  }} className="rounded-lg border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Top Panel</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Bottom Panel</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
}`,...(j=(v=c.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var z,N,y;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 500,
    height: 200
  }} className="rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Left</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={2}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Center</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Right</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
}`,...(y=(N=o.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};const G=["Default","Vertical","ThreePanels"];export{d as Default,o as ThreePanels,c as Vertical,G as __namedExportsOrder,q as default};
