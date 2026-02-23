import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_BUJDb0Gp.mjs';
import 'piccolore';
import { B as Button, C as Card, a as CardHeader, b as CardTitle, f as CardDescription, d as CardContent, e as CardFooter, $ as $$Layout } from '../chunks/card_C-jCoFlv.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { toast, Toaster } from 'sonner';
import { Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { T as Textarea } from '../chunks/textarea_CiqDbWel.mjs';
import { g as getData } from '../chunks/data_DMtKuYnI.mjs';
export { renderers } from '../renderers.mjs';

function CopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2e3);
    } catch (err) {
      toast.error("Failed to copy");
      console.error("Failed to copy text: ", err);
    }
  };
  return /* @__PURE__ */ jsxs(
    Button,
    {
      type: "button",
      onClick: handleCopy,
      "aria-label": "Copy to clipboard",
      variant: "outline",
      size: "sm",
      className: "flex items-center gap-1",
      children: [
        /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: isCopied ? "Copied!" : "Copy" })
      ]
    }
  );
}

function SharedTextCard({
  id,
  initialText
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/shared-text/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Text deleted successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1e3);
    } catch (error) {
      toast.error("Failed to delete text");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { richColors: true, closeButton: true, position: "bottom-right", expand: true }),
    /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-lg", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Shared Text" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "This text is accessible via your unique URL" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: `shared-text-${id}`, className: "sr-only", children: "Shared text content" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: `shared-text-${id}`,
            value: initialText,
            readOnly: true,
            rows: 10
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx(CopyButton, { text: initialText }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleDelete,
            disabled: isDeleting,
            variant: "destructive",
            className: "flex items-center gap-2 bg-red-700",
            children: [
              /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: isDeleting ? "Deleting..." : "Delete" })
            ]
          }
        )
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const data = await getData(id);
  if (!data) {
    return new Response("Not found", { status: 404 });
  }
  if ("redirectUrl" in data) {
    return Astro2.redirect(data.redirectUrl);
  }
  const { id: cardId, initialText } = data;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Shared Text - Quic-Link" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-center items-center min-h-screen p-4"> ${renderComponent($$result2, "SharedTextCard", SharedTextCard, { "client:load": true, "id": cardId, "initialText": initialText, "client:component-hydration": "load", "client:component-path": "@/components/SharedTextCard", "client:component-export": "default" })} </div> ` })}`;
}, "/var/home/pmustafi/code/quic-link/src/pages/[id].astro", void 0);

const $$file = "/var/home/pmustafi/code/quic-link/src/pages/[id].astro";
const $$url = "/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
