import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as n}from"./index-JhL3uwfD.js";import{c as g}from"./cn-BmGQd4RS.js";import"./bundle-mjs-Ce1ZTWB2.js";const a=n.forwardRef(({className:r,config:t,children:m,...h},f)=>{const u=n.useMemo(()=>{const o={};return Object.entries(t).forEach(([x,c])=>{c.color&&(o[`--color-${x}`]=c.color)}),o},[t]);return e.jsx("div",{ref:f,className:g("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",r),style:u,...h,children:m})});a.displayName="Chart";a.__docgenInfo={description:"",methods:[],displayName:"Chart",props:{config:{required:!0,tsType:{name:"ChartConfig"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const k={title:"Components/Chart",component:a,parameters:{layout:"centered"},tags:["autodocs"]},l={revenue:{label:"Revenue",color:"hsl(221.2 83.2% 53.3%)"},expenses:{label:"Expenses",color:"hsl(0 84.2% 60.2%)"},profit:{label:"Profit",color:"hsl(142.1 76.2% 36.3%)"}},s={render:()=>e.jsx(a,{config:l,style:{width:400,height:250},children:e.jsxs("div",{className:"flex h-full flex-col items-center justify-center gap-4",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"Chart container with CSS color variables applied."}),e.jsx("div",{className:"flex gap-4",children:Object.entries(l).map(([r,t])=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-3 w-3 rounded-full",style:{backgroundColor:`var(--color-${r})`}}),e.jsx("span",{className:"text-xs",children:t.label})]},r))}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Wrap Recharts components inside this container for themed charts."})]})})};var i,d,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <Chart config={sampleConfig} style={{
    width: 400,
    height: 250
  }}>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          Chart container with CSS color variables applied.
        </p>
        <div className="flex gap-4">
          {Object.entries(sampleConfig).map(([key, value]) => <div key={key} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{
            backgroundColor: \`var(--color-\${key})\`
          }} />
              <span className="text-xs">{value.label}</span>
            </div>)}
        </div>
        <p className="text-xs text-muted-foreground">
          Wrap Recharts components inside this container for themed charts.
        </p>
      </div>
    </Chart>
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const y=["Default"];export{s as Default,y as __namedExportsOrder,k as default};
