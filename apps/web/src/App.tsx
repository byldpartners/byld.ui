import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AspectRatio,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Combobox,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  DataTable,
  DatePicker,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Input,
  InputOTP,
  Label,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ScrollArea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  ThemeProvider,
  useTheme,
  toast,
  useToast,
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@byldpartners/ui";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "default" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("default")}
      >
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

function Showcase() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [radioValue, setRadioValue] = useState("option-1");
  const [sliderValue, setSliderValue] = useState([50]);
  const [comboValue, setComboValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">@byldpartners/ui</h1>
          <ThemeSwitcher />
        </div>

        {/* Button */}
        <Section title="Button">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">+</Button>
          </div>
          <Button disabled>Disabled</Button>
        </Section>

        <Separator />

        {/* Badge */}
        <Section title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Section>

        <Separator />

        {/* Card */}
        <Section title="Card">
          <Card className="p-6 space-y-2">
            <h3 className="text-base font-semibold">Card Title</h3>
            <p className="text-sm text-muted-foreground">
              This is a card component with some example content.
            </p>
          </Card>
        </Section>

        <Separator />

        {/* Alert */}
        <Section title="Alert">
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        </Section>

        <Separator />

        {/* Input */}
        <Section title="Input">
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input placeholder="Disabled" disabled />
        </Section>

        <Separator />

        {/* Textarea */}
        <Section title="Textarea">
          <Textarea
            placeholder="Write a message..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </Section>

        <Separator />

        {/* Label */}
        <Section title="Label">
          <div className="space-y-1">
            <Label htmlFor="email-input">Email address</Label>
            <Input id="email-input" placeholder="you@example.com" />
          </div>
        </Section>

        <Separator />

        {/* Checkbox */}
        <Section title="Checkbox">
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={checkboxChecked}
              onCheckedChange={(v) => setCheckboxChecked(v === true)}
            />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </Section>

        <Separator />

        {/* Switch */}
        <Section title="Switch">
          <div className="flex items-center justify-between">
            <Label>Airplane Mode</Label>
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          </div>
        </Section>

        <Separator />

        {/* RadioGroup */}
        <Section title="RadioGroup">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-1" id="r1" />
              <Label htmlFor="r1">Option One</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-2" id="r2" />
              <Label htmlFor="r2">Option Two</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-3" id="r3" />
              <Label htmlFor="r3">Option Three</Label>
            </div>
          </RadioGroup>
        </Section>

        <Separator />

        {/* Select */}
        <Section title="Select">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </Section>

        <Separator />

        {/* Combobox */}
        <Section title="Combobox">
          <Combobox
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
              { label: "Svelte", value: "svelte" },
            ]}
            value={comboValue}
            onValueChange={setComboValue}
            placeholder="Select framework..."
            searchPlaceholder="Search frameworks..."
          />
        </Section>

        <Separator />

        {/* Slider */}
        <Section title="Slider">
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-sm text-muted-foreground">Value: {sliderValue[0]}</p>
        </Section>

        <Separator />

        {/* Progress */}
        <Section title="Progress">
          <Progress value={66} />
        </Section>

        <Separator />

        {/* Toggle */}
        <Section title="Toggle">
          <div className="flex gap-2">
            <Toggle variant="default">B</Toggle>
            <Toggle variant="outline">I</Toggle>
          </div>
        </Section>

        <Separator />

        {/* ToggleGroup */}
        <Section title="ToggleGroup">
          <ToggleGroup type="single">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </Section>

        <Separator />

        {/* Tabs */}
        <Section title="Tabs">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-sm text-foreground p-2">
                Make changes to your account here.
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-sm text-foreground p-2">
                Change your password here.
              </p>
            </TabsContent>
          </Tabs>
        </Section>

        <Separator />

        {/* Accordion */}
        <Section title="Accordion">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles using Tailwind CSS.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Separator />

        {/* Collapsible */}
        <Section title="Collapsible">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">Toggle Content</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm text-foreground p-2">
                This content can be toggled.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </Section>

        <Separator />

        {/* Avatar */}
        <Section title="Avatar">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        <Separator />

        {/* Skeleton */}
        <Section title="Skeleton">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </Section>

        <Separator />

        {/* Separator */}
        <Section title="Separator">
          <div className="space-y-2">
            <p className="text-sm">Horizontal</p>
            <Separator />
            <div className="flex items-center gap-2 h-6">
              <span className="text-sm">Left</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Right</span>
            </div>
          </div>
        </Section>

        <Separator />

        {/* AspectRatio */}
        <Section title="AspectRatio">
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
              <span className="text-sm text-muted-foreground">16:9</span>
            </div>
          </AspectRatio>
        </Section>

        <Separator />

        {/* Calendar */}
        <Section title="Calendar">
          <Calendar selected={date} onSelect={setDate} />
        </Section>

        <Separator />

        {/* DatePicker */}
        <Section title="DatePicker">
          <DatePicker value={pickerDate} onValueChange={setPickerDate} />
        </Section>

        <Separator />

        {/* InputOTP */}
        <Section title="InputOTP">
          <InputOTP length={6} />
        </Section>

        <Separator />

        {/* Breadcrumb */}
        <Section title="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Separator />

        {/* Pagination */}
        <Section title="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(3, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        <Separator />

        {/* Table */}
        <Section title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob</TableCell>
                <TableCell>Inactive</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        <Separator />

        {/* DataTable */}
        <Section title="DataTable">
          <DataTable
            columns={[
              { id: "name", header: "Name", accessorKey: "name", sortable: true },
              { id: "email", header: "Email", accessorKey: "email" },
              { id: "role", header: "Role", accessorKey: "role" },
            ]}
            data={[
              { name: "Alice", email: "alice@example.com", role: "Admin" },
              { name: "Bob", email: "bob@example.com", role: "User" },
              { name: "Charlie", email: "charlie@example.com", role: "Editor" },
            ]}
          />
        </Section>

        <Separator />

        {/* Dialog */}
        <Section title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here.
                </DialogDescription>
              </DialogHeader>
              <Input placeholder="Name" />
              <DialogFooter>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Separator />

        {/* AlertDialog */}
        <Section title="AlertDialog">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Section>

        <Separator />

        {/* Sheet */}
        <Section title="Sheet">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a side sheet.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </Section>

        <Separator />

        {/* Drawer */}
        <Section title="Drawer">
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerDescription>
                  This is a drawer component.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Section>

        <Separator />

        {/* Popover */}
        <Section title="Popover">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm">Popover content goes here.</p>
            </PopoverContent>
          </Popover>
        </Section>

        <Separator />

        {/* HoverCard */}
        <Section title="HoverCard">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm">
                This card appears on hover.
              </p>
            </HoverCardContent>
          </HoverCard>
        </Section>

        <Separator />

        {/* Tooltip */}
        <Section title="Tooltip">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Section>

        <Separator />

        {/* DropdownMenu */}
        <Section title="DropdownMenu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Separator />

        {/* ContextMenu */}
        <Section title="ContextMenu">
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
                Right click here
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuItem>Cut</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Paste</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        <Separator />

        {/* Menubar */}
        <Section title="Menubar">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Section>

        <Separator />

        {/* NavigationMenu */}
        <Section title="NavigationMenu">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[300px]">
                    <NavigationMenuLink asChild>
                      <a href="#" className="text-sm hover:underline">Introduction</a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[300px]">
                    <NavigationMenuLink asChild>
                      <a href="#" className="text-sm hover:underline">All Components</a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Section>

        <Separator />

        {/* Command */}
        <Section title="Command">
          <Command className="rounded-lg border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Section>

        <Separator />

        {/* Carousel */}
        <Section title="Carousel">
          <Carousel>
            <CarouselContent>
              {[1, 2, 3, 4].map((i) => (
                <CarouselItem key={i}>
                  <div className="flex h-32 items-center justify-center rounded-md bg-muted">
                    <span className="text-2xl font-bold text-muted-foreground">{i}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </Section>

        <Separator />

        {/* ScrollArea */}
        <Section title="ScrollArea">
          <ScrollArea className="h-48 w-full rounded-md border p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-sm py-1">
                Scrollable item {i + 1}
              </p>
            ))}
          </ScrollArea>
        </Section>

        <Separator />

        {/* ResizablePanel */}
        <Section title="ResizablePanel">
          <ResizablePanelGroup direction="horizontal" className="min-h-[100px] rounded-lg border">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-sm text-muted-foreground">Panel 1</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-sm text-muted-foreground">Panel 2</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Section>

        <Separator />

        {/* Form */}
        <Section title="Form">
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormField name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
              </FormItem>
            </FormField>
          </Form>
        </Section>

        <Separator />

        {/* Toast */}
        <Section title="Toast">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                toast({ title: "Success", description: "Your changes were saved." })
              }
            >
              Show Toast
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast({
                  title: "Error",
                  description: "Something went wrong.",
                  variant: "destructive",
                })
              }
            >
              Destructive Toast
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Showcase />
      <Toaster />
    </ThemeProvider>
  );
}
