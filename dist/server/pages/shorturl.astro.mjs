import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BUJDb0Gp.mjs';
import 'piccolore';
import { C as Card, a as CardHeader, b as CardTitle, f as CardDescription, d as CardContent, B as Button, $ as $$Layout } from '../chunks/card_C-jCoFlv.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { T as Textarea } from '../chunks/textarea_CiqDbWel.mjs';
import { Copy } from 'lucide-react';
import { L as Label } from '../chunks/label_v9CBU84T.mjs';
import { Toaster, toast } from 'sonner';
import { useState, useRef } from 'react';
import PocketBase from 'pocketbase';
export { renderers } from '../renderers.mjs';

const pb = new PocketBase("https://pocketbase.pratyay.qzz.io");
function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
function ShortUrlPage() {
  const [sharedUrl, setSharedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const largeUrlRef = useRef(null);
  const urlRef = useRef(null);
  const shareUrl = async () => {
    const longUrl = largeUrlRef.current?.value.trim();
    if (!longUrl || !validateUrl(longUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }
    setIsLoading(true);
    try {
      const short = "abcdefghijklmnopqrstuvwxyz";
      const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      const all = short + capital + numbers;
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += all[Math.floor(Math.random() * all.length)];
      }
      const data = {
        slug: result,
        largeurl: longUrl
      };
      const record = await pb.collection("shorturls").create(data);
      if (!record?.id) {
        throw new Error("No record ID returned");
      }
      setSharedUrl(`${window.location.origin}/${result}`);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const copyUrl = () => {
    if (urlRef.current) {
      urlRef.current.select();
      navigator.clipboard.writeText(urlRef.current.value);
      toast.success("URL copied to clipboard");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center min-h-[calc(100vh-3.5rem)] p-4", children: [
    /* @__PURE__ */ jsx(Toaster, { richColors: true, closeButton: true, position: "bottom-right", expand: true }),
    /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "URL Shortener" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Shorten your long URLs to shareable links" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "largeUrlArea", children: "Your Long URL" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                ref: largeUrlRef,
                placeholder: "Enter long URL here (e.g. https://example.com)",
                id: "largeUrlArea",
                rows: 4,
                disabled: isLoading
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: shareUrl,
              disabled: isLoading,
              className: "w-full bg-purple-500 text-white hover:bg-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700",
              children: isLoading ? "Shortening..." : "Shorten URL"
            }
          )
        ] }),
        sharedUrl && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "url", children: "Shortened URL" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                ref: urlRef,
                id: "url",
                readOnly: true,
                value: sharedUrl,
                className: "flex-grow"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: copyUrl,
              size: "icon",
              className: "h-full bg-blue-300",
              children: [
                /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Copy URL" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

const $$Shorturl = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Shorten URL - Quic-Link" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ShortUrlPage", ShortUrlPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/pages/ShortUrlPage", "client:component-export": "default" })} ` })}`;
}, "/var/home/pmustafi/code/quic-link/src/pages/shorturl.astro", void 0);

const $$file = "/var/home/pmustafi/code/quic-link/src/pages/shorturl.astro";
const $$url = "/shorturl";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Shorturl,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
