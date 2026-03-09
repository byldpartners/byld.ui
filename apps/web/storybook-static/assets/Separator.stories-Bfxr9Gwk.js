import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as x}from"./index-JhL3uwfD.js";import{R as c}from"./index-CmrjLRmi.js";import{c as g}from"./cn-BmGQd4RS.js";import"./index-CcsgAk74.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";import"./index-CA2oR2yp.js";import"./index-CB6uX4vz.js";import"./bundle-mjs-Ce1ZTWB2.js";const r=x.forwardRef(({className:m,orientation:o="horizontal",decorative:u=!0,...f},h)=>e.jsx(c,{ref:h,decorative:u,orientation:o,className:g("shrink-0 bg-border",o==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",m),...f}));r.displayName=c.displayName;r.__docgenInfo={description:"",methods:[],props:{orientation:{defaultValue:{value:'"horizontal"',computed:!1},required:!1},decorative:{defaultValue:{value:"true",computed:!1},required:!1}}};const z={title:"Components/Separator",component:r,tags:["autodocs"],parameters:{layout:"centered"}},t={render:()=>e.jsxs("div",{style:{width:300},children:[e.jsx("p",{children:"Content above"}),e.jsx(r,{}),e.jsx("p",{children:"Content below"})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,height:20},children:[e.jsx("span",{children:"Left"}),e.jsx(r,{orientation:"vertical"}),e.jsx("span",{children:"Right"})]})};var n,s,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 300
  }}>
      <p>Content above</p>
      <Separator />
      <p>Content below</p>
    </div>
}`,...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var p,l,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 20
  }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const E=["Default","Vertical"];export{t as Default,a as Vertical,E as __namedExportsOrder,z as default};
