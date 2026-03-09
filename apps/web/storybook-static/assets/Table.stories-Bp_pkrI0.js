import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-JhL3uwfD.js";import{c as n}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const i=r.forwardRef(({className:a,...l},o)=>e.jsx("div",{className:"relative w-full overflow-auto",children:e.jsx("table",{ref:o,className:n("w-full caption-bottom text-sm",a),...l})}));i.displayName="Table";const b=r.forwardRef(({className:a,...l},o)=>e.jsx("thead",{ref:o,className:n("[&_tr]:border-b",a),...l}));b.displayName="TableHeader";const m=r.forwardRef(({className:a,...l},o)=>e.jsx("tbody",{ref:o,className:n("[&_tr:last-child]:border-0",a),...l}));m.displayName="TableBody";const f=r.forwardRef(({className:a,...l},o)=>e.jsx("tfoot",{ref:o,className:n("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",a),...l}));f.displayName="TableFooter";const d=r.forwardRef(({className:a,...l},o)=>e.jsx("tr",{ref:o,className:n("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",a),...l}));d.displayName="TableRow";const t=r.forwardRef(({className:a,...l},o)=>e.jsx("th",{ref:o,className:n("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l}));t.displayName="TableHead";const s=r.forwardRef(({className:a,...l},o)=>e.jsx("td",{ref:o,className:n("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l}));s.displayName="TableCell";const T=r.forwardRef(({className:a,...l},o)=>e.jsx("caption",{ref:o,className:n("mt-4 text-sm text-muted-foreground",a),...l}));T.displayName="TableCaption";i.__docgenInfo={description:"",methods:[],displayName:"Table"};b.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};m.__docgenInfo={description:"",methods:[],displayName:"TableBody"};f.__docgenInfo={description:"",methods:[],displayName:"TableFooter"};d.__docgenInfo={description:"",methods:[],displayName:"TableRow"};t.__docgenInfo={description:"",methods:[],displayName:"TableHead"};s.__docgenInfo={description:"",methods:[],displayName:"TableCell"};T.__docgenInfo={description:"",methods:[],displayName:"TableCaption"};const g={title:"Components/Table",component:i,tags:["autodocs"],parameters:{layout:"centered"}},c={render:()=>e.jsxs(i,{children:[e.jsx(T,{children:"A list of team members."}),e.jsx(b,{children:e.jsxs(d,{children:[e.jsx(t,{children:"Name"}),e.jsx(t,{children:"Email"}),e.jsx(t,{children:"Role"})]})}),e.jsxs(m,{children:[e.jsxs(d,{children:[e.jsx(s,{children:"Alice Johnson"}),e.jsx(s,{children:"alice@example.com"}),e.jsx(s,{children:"Engineer"})]}),e.jsxs(d,{children:[e.jsx(s,{children:"Bob Smith"}),e.jsx(s,{children:"bob@example.com"}),e.jsx(s,{children:"Designer"})]}),e.jsxs(d,{children:[e.jsx(s,{children:"Carol Lee"}),e.jsx(s,{children:"carol@example.com"}),e.jsx(s,{children:"Manager"})]})]})]})};var p,x,h;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Table>
      <TableCaption>A list of team members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>alice@example.com</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Smith</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Carol Lee</TableCell>
          <TableCell>carol@example.com</TableCell>
          <TableCell>Manager</TableCell>
        </TableRow>
      </TableBody>
    </Table>
}`,...(h=(x=c.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const w=["Default"];export{c as Default,w as __namedExportsOrder,g as default};
