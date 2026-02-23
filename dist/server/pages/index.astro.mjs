import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BUJDb0Gp.mjs';
import 'piccolore';
import { C as Card, a as CardHeader, b as CardTitle, f as CardDescription, e as CardFooter, B as Button, $ as $$Layout } from '../chunks/card_C-jCoFlv.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { LinkIcon, FileText } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function Home() {
  return /* @__PURE__ */ jsxs("main", { className: "relative isolate flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
      }
    ),
    /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl", children: [
      "QuickLink:",
      " ",
      /* @__PURE__ */ jsx("span", { className: "bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "Simple URL Shortener & Text Sharer" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: "A self-hostable solution for easily sharing links and text on social media and chats." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { className: "group flex flex-col items-center justify-between rounded-2xl border border-border bg-background p-6 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary", children: /* @__PURE__ */ jsx(LinkIcon, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold", children: "Shorten URL" }),
          /* @__PURE__ */ jsx(CardDescription, { className: "mt-2 text-sm text-muted-foreground", children: "Create compact links instantly." })
        ] }),
        /* @__PURE__ */ jsx(CardFooter, { className: "pt-4 w-full", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full bg-purple-700 text-white hover:bg-purple-600", children: /* @__PURE__ */ jsx("a", { href: "/shorturl", children: "Get Started" }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "group flex flex-col items-center justify-between rounded-2xl border border-border bg-background p-6 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex items-center justify-center rounded-full bg-secondary/10 p-3 text-secondary-foreground", children: /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold", children: "Share Text" }),
          /* @__PURE__ */ jsx(CardDescription, { className: "mt-2 text-sm text-muted-foreground", children: "Share text snippets effortlessly." })
        ] }),
        /* @__PURE__ */ jsx(CardFooter, { className: "pt-4 w-full", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full bg-purple-500 text-white hover:bg-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700", children: /* @__PURE__ */ jsx("a", { href: "/sharetext", children: "Get Started" }) }) })
      ] })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomePage", Home, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/pages/HomePage", "client:component-export": "default" })} ` })}`;
}, "/var/home/pmustafi/code/quic-link/src/pages/index.astro", void 0);

const $$file = "/var/home/pmustafi/code/quic-link/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
