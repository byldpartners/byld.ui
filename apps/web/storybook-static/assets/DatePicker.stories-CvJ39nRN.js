import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as n}from"./index-JhL3uwfD.js";import{R as N,T as q,P as O,C as R}from"./index-BCYPcUS4.js";import{c as _}from"./cn-BmGQd4RS.js";import{C as E}from"./Calendar.web-C1_0bwyp.js";import"./index-YasOEclf.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";import"./index-CB6uX4vz.js";import"./index-C1LTxbTb.js";import"./index-tVlkdnhF.js";import"./index-CVk_MH_0.js";import"./index-CqS5VB6L.js";import"./index-Cw_KDvnN.js";import"./index-CU6Es7_K.js";import"./index-DN2Y1lLp.js";import"./index-DUWJZruh.js";import"./index-B18UcZMa.js";import"./index-Cj0ndUg1.js";import"./index-Db74Di-P.js";import"./bundle-mjs-Ce1ZTWB2.js";function L(t){return t.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}const s=n.forwardRef(({value:t,onValueChange:r,placeholder:a="Pick a date",disabled:b=!1,className:S,...k},P)=>{const[C,l]=n.useState(!1),T=V=>{r==null||r(V),l(!1)};return e.jsxs(N,{open:C,onOpenChange:l,children:[e.jsx(q,{asChild:!0,disabled:b,children:e.jsxs("button",{type:"button",className:_("flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",!t&&"text-muted-foreground",S),children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-4 w-4",children:[e.jsx("path",{d:"M8 2v4"}),e.jsx("path",{d:"M16 2v4"}),e.jsx("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),e.jsx("path",{d:"M3 10h18"})]}),t?L(t):a]})}),e.jsx(O,{children:e.jsx(R,{ref:P,className:"z-50 rounded-md border bg-popover p-0 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",align:"start",sideOffset:4,...k,children:e.jsx(E,{selected:t,onSelect:T})})})]})});s.displayName="DatePicker";s.__docgenInfo={description:"",methods:[],displayName:"DatePicker",props:{value:{required:!1,tsType:{name:"Date"},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: Date | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"Date | undefined",elements:[{name:"Date"},{name:"undefined"}]},name:"date"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Pick a date"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const se={title:"Components/DatePicker",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean"},placeholder:{control:"text"}}},o={render:t=>{const[r,a]=n.useState(void 0);return e.jsx("div",{style:{width:280},children:e.jsx(s,{...t,value:r,onValueChange:a})})}},d={render:t=>{const[r,a]=n.useState(new Date);return e.jsx("div",{style:{width:280},children:e.jsx(s,{...t,value:r,onValueChange:a})})}},i={args:{disabled:!0,placeholder:"Pick a date"}},c={render:t=>{const[r,a]=n.useState(void 0);return e.jsx("div",{style:{width:280},children:e.jsx(s,{...t,value:r,onValueChange:a,placeholder:"Select your birthday"})})}};var u,p,m;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <div style={{
      width: 280
    }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>;
  }
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var h,f,g;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <div style={{
      width: 280
    }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>;
  }
}`,...(g=(f=d.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,D,y;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Pick a date"
  }
}`,...(y=(D=i.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var v,w,j;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <div style={{
      width: 280
    }}>
        <DatePicker {...args} value={date} onValueChange={setDate} placeholder="Select your birthday" />
      </div>;
  }
}`,...(j=(w=c.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};const ne=["Default","WithValue","Disabled","CustomPlaceholder"];export{c as CustomPlaceholder,o as Default,i as Disabled,d as WithValue,ne as __namedExportsOrder,se as default};
