import{j as l}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-JhL3uwfD.js";import{c as j}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const z=o.createContext({value:"",activeIndex:-1,length:6}),y=o.forwardRef(({length:s=6,value:n,onValueChange:u,disabled:x=!1,className:A,children:G,...V},E)=>{const[F,B]=o.useState(""),[b,I]=o.useState(-1),c=o.useRef([]),d=n!==void 0?n:F,m=o.useCallback(t=>{const e=t.slice(0,s);n===void 0&&B(e),u==null||u(e)},[n,s,u]),K=(t,e)=>{var r,a,i;if(e.key==="Backspace"){e.preventDefault();const p=d.split("");p[t]?(p[t]="",m(p.join(""))):t>0&&(p[t-1]="",m(p.join("")),(r=c.current[t-1])==null||r.focus())}else e.key==="ArrowLeft"&&t>0?(a=c.current[t-1])==null||a.focus():e.key==="ArrowRight"&&t<s-1&&((i=c.current[t+1])==null||i.focus())},L=(t,e)=>{var i;const r=e.target.value.slice(-1);if(!r)return;const a=d.split("");for(;a.length<s;)a.push("");a[t]=r,m(a.join("")),t<s-1&&((i=c.current[t+1])==null||i.focus())},M=t=>{var a;t.preventDefault();const e=t.clipboardData.getData("text").slice(0,s);m(e);const r=Math.min(e.length,s-1);(a=c.current[r])==null||a.focus()};return l.jsx(z.Provider,{value:{value:d,activeIndex:b,length:s},children:l.jsx("div",{ref:E,className:j("flex items-center gap-2",x&&"opacity-50",A),onPaste:M,...V,children:Array.from({length:s},(t,e)=>l.jsx("input",{ref:r=>{c.current[e]=r},type:"text",inputMode:"numeric",maxLength:1,value:d[e]||"",disabled:x,onChange:r=>L(e,r),onKeyDown:r=>K(e,r),onFocus:()=>I(e),onBlur:()=>I(-1),className:j("flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-center text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed",b===e&&"ring-1 ring-ring"),autoComplete:"one-time-code"},e))})})});y.displayName="InputOTP";y.__docgenInfo={description:"",methods:[],displayName:"InputOTP",props:{length:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},value:{required:!1,tsType:{name:"string"},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const W={title:"Components/InputOTP",component:y,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{length:{control:"number"},disabled:{control:"boolean"}}},f={args:{length:6}},g={args:{length:4}},v={render:s=>{const[n,u]=o.useState("");return l.jsxs("div",{children:[l.jsx(y,{...s,length:6,value:n,onValueChange:u}),l.jsxs("p",{className:"mt-4 text-sm text-muted-foreground",children:["Current value: ",n||"(empty)"]})]})}},h={args:{length:6,disabled:!0}};var D,T,w;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    length: 6
  }
}`,...(w=(T=f.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var P,C,S;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    length: 4
  }
}`,...(S=(C=g.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var N,O,k;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div>
        <InputOTP {...args} length={6} value={value} onValueChange={setValue} />
        <p className="mt-4 text-sm text-muted-foreground">
          Current value: {value || "(empty)"}
        </p>
      </div>;
  }
}`,...(k=(O=v.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};var q,R,_;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    length: 6,
    disabled: true
  }
}`,...(_=(R=h.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};const X=["Default","FourDigits","Controlled","Disabled"];export{v as Controlled,f as Default,h as Disabled,g as FourDigits,X as __namedExportsOrder,W as default};
