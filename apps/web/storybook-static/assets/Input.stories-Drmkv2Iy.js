import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./index-JhL3uwfD.js";import{c as h}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const t=y.forwardRef(({className:s,type:g,...b},x)=>o.jsx("input",{type:g,className:h("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:x,...b}));t.displayName="Input";t.__docgenInfo={description:"",methods:[],displayName:"Input"};const I={title:"Components/Input",component:t,parameters:{layout:"centered"},tags:["autodocs"]},e={args:{placeholder:"Type here..."}},r={args:{placeholder:"Disabled",disabled:!0}},a={decorators:[s=>o.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:4},children:[o.jsx("span",{style:{fontSize:14,fontWeight:500},children:"Email"}),o.jsx(s,{})]})],args:{type:"email",placeholder:"you@example.com"}};var n,l,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: "Type here..."
  }
}`,...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,p,c;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    placeholder: "Disabled",
    disabled: true
  }
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,u,f;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  decorators: [Story => <label style={{
    display: "flex",
    flexDirection: "column",
    gap: 4
  }}>
        <span style={{
      fontSize: 14,
      fontWeight: 500
    }}>Email</span>
        <Story />
      </label>],
  args: {
    type: "email",
    placeholder: "you@example.com"
  }
}`,...(f=(u=a.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};const w=["Default","Disabled","WithLabel"];export{e as Default,r as Disabled,a as WithLabel,w as __namedExportsOrder,I as default};
