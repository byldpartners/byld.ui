import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-JhL3uwfD.js";import{c as t}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const F=s.createContext({id:"",name:""}),u=s.forwardRef(({className:o,...r},n)=>e.jsx("form",{ref:n,className:t("space-y-6",o),...r}));u.displayName="Form";function a({name:o,children:r}){const n=s.useId();return e.jsx(F.Provider,{value:{id:n,name:o},children:r})}a.displayName="FormField";const m=s.forwardRef(({className:o,...r},n)=>e.jsx("div",{ref:n,className:t("space-y-2",o),...r}));m.displayName="FormItem";const l=s.forwardRef(({className:o,...r},n)=>{const{id:i}=s.useContext(F);return e.jsx("label",{ref:n,className:t("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",o),htmlFor:i,...r})});l.displayName="FormLabel";const d=s.forwardRef(({className:o,...r},n)=>{const{id:i}=s.useContext(F);return e.jsx("div",{ref:n,id:i,className:t("",o),...r})});d.displayName="FormControl";const c=s.forwardRef(({className:o,...r},n)=>e.jsx("p",{ref:n,className:t("text-[0.8rem] text-muted-foreground",o),...r}));c.displayName="FormDescription";const f=s.forwardRef(({className:o,children:r,...n},i)=>r?e.jsx("p",{ref:i,className:t("text-[0.8rem] font-medium text-destructive",o),...n,children:r}):null);f.displayName="FormMessage";u.__docgenInfo={description:"",methods:[],displayName:"Form"};a.__docgenInfo={description:"",methods:[],displayName:"FormField",props:{name:{required:!0,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"FormItem"};l.__docgenInfo={description:"",methods:[],displayName:"FormLabel"};d.__docgenInfo={description:"",methods:[],displayName:"FormControl"};c.__docgenInfo={description:"",methods:[],displayName:"FormDescription"};f.__docgenInfo={description:"",methods:[],displayName:"FormMessage"};const C={title:"Components/Form",component:u,parameters:{layout:"centered"},tags:["autodocs"]},p={render:()=>e.jsxs(u,{style:{width:350},children:[e.jsx(a,{name:"username",children:e.jsxs(m,{children:[e.jsx(l,{children:"Username"}),e.jsx(d,{children:e.jsx("input",{type:"text",placeholder:"Enter your username",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"})}),e.jsx(c,{children:"This is your public display name."})]})}),e.jsx(a,{name:"email",children:e.jsxs(m,{children:[e.jsx(l,{children:"Email"}),e.jsx(d,{children:e.jsx("input",{type:"email",placeholder:"Enter your email",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"})}),e.jsx(c,{children:"We will never share your email."})]})})]})},x={render:()=>e.jsx(u,{style:{width:350},children:e.jsx(a,{name:"username",children:e.jsxs(m,{children:[e.jsx(l,{children:"Username"}),e.jsx(d,{children:e.jsx("input",{type:"text",placeholder:"Enter your username",className:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"})}),e.jsx(c,{children:"This is your public display name."}),e.jsx(f,{children:"Username must be at least 3 characters."})]})})})};var h,b,y;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Form style={{
    width: 350
  }}>
      <FormField name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <input type="text" placeholder="Enter your username" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
        </FormItem>
      </FormField>

      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <input type="email" placeholder="Enter your email" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </FormControl>
          <FormDescription>
            We will never share your email.
          </FormDescription>
        </FormItem>
      </FormField>
    </Form>
}`,...(y=(b=p.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var g,j,N;x.parameters={...x.parameters,docs:{...(g=x.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Form style={{
    width: 350
  }}>
      <FormField name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <input type="text" placeholder="Enter your username" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage>Username must be at least 3 characters.</FormMessage>
        </FormItem>
      </FormField>
    </Form>
}`,...(N=(j=x.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const E=["Default","WithError"];export{p as Default,x as WithError,E as __namedExportsOrder,C as default};
