import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-JhL3uwfD.js";import{R as x,I as f,H as A,T as u,C as g}from"./index-Dg9o9DHE.js";import{c as m}from"./cn-BmGQd4RS.js";import"./index-C1LTxbTb.js";import"./index-hy5aa6oV.js";import"./index-CB6uX4vz.js";import"./index-YasOEclf.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";import"./index-Db74Di-P.js";import"./index-CU6Es7_K.js";import"./index-DuatE4jm.js";import"./index-Cj0ndUg1.js";import"./index-Cw_KDvnN.js";import"./index-DogI4IzG.js";import"./bundle-mjs-Ce1ZTWB2.js";function I(t){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...t,children:e.jsx("path",{d:"m6 9 6 6 6-6"})})}const j=x,r=d.forwardRef(({className:t,...o},n)=>e.jsx(f,{ref:n,className:m("border-b",t),...o}));r.displayName="AccordionItem";const s=d.forwardRef(({className:t,children:o,...n},a)=>e.jsx(A,{className:"flex",children:e.jsxs(u,{ref:a,className:m("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",t),...n,children:[o,e.jsx(I,{className:"h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"})]})}));s.displayName=u.displayName;const i=d.forwardRef(({className:t,children:o,...n},a)=>e.jsx(g,{ref:a,className:"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...n,children:e.jsx("div",{className:m("pb-4 pt-0",t),children:o})}));i.displayName=g.displayName;r.__docgenInfo={description:"",methods:[],displayName:"AccordionItem"};s.__docgenInfo={description:"",methods:[]};i.__docgenInfo={description:"",methods:[]};const B={title:"Components/Accordion",component:j,parameters:{layout:"centered"},tags:["autodocs"]},c={args:{type:"single",collapsible:!0,style:{width:360},children:e.jsxs(e.Fragment,{children:[e.jsxs(r,{value:"item-1",children:[e.jsx(s,{children:"Is it accessible?"}),e.jsx(i,{children:"Yes. It adheres to the WAI-ARIA design pattern."})]}),e.jsxs(r,{value:"item-2",children:[e.jsx(s,{children:"Is it styled?"}),e.jsx(i,{children:"Yes. It comes with default styles that match your theme."})]}),e.jsxs(r,{value:"item-3",children:[e.jsx(s,{children:"Is it animated?"}),e.jsx(i,{children:"Yes. It uses CSS animations for smooth transitions."})]})]})}};var l,p,h;c.parameters={...c.parameters,docs:{...(l=c.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    type: "single",
    collapsible: true,
    style: {
      width: 360
    },
    children: <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match your theme.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses CSS animations for smooth transitions.
          </AccordionContent>
        </AccordionItem>
      </>
  }
}`,...(h=(p=c.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const F=["Default"];export{c as Default,F as __namedExportsOrder,B as default};
