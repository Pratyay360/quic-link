import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BUJDb0Gp.mjs';
import 'piccolore';
import { c as cn, C as Card, a as CardHeader, b as CardTitle, d as CardContent, e as CardFooter, B as Button, $ as $$Layout } from '../chunks/card_C-jCoFlv.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { TriangleAlert } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[calc(100vh-3.5rem)] p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md shadow-lg", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxs(Alert, { variant: "destructive", className: "mb-4", children: [
        /* @__PURE__ */ jsx(TriangleAlert, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx(AlertTitle, { children: "404" }),
        /* @__PURE__ */ jsx(AlertDescription, { children: "Page Not Found" })
      ] }),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold", children: "Oops! Lost your way?" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/", children: "Go to Homepage" }) }) })
  ] }) });
}

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page Not Found - Quic-Link" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NotFound", NotFound, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/NotFound", "client:component-export": "default" })} ` })}`;
}, "/var/home/pmustafi/code/quic-link/src/pages/404.astro", void 0);

const $$file = "/var/home/pmustafi/code/quic-link/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
