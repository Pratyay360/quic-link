import PocketBase from 'pocketbase';

async function getData(id) {
  const pb = new PocketBase(process.env.POCKETBASE_URL);
  const length = id.length;
  try {
    if (length === 6) {
      const sharedtext = await pb.collection("sharedText").getFirstListItem(`slug="${id}"`);
      const initialText = sharedtext.largeText;
      if (typeof initialText === "string" && initialText.length > 0) {
        return { id: sharedtext.id, initialText };
      }
      return null;
    }
    if (length >= 7) {
      const shorturl = await pb.collection("shorturls").getFirstListItem(`slug="${id}"`);
      const redirectUrl = shorturl.largeurl;
      if (typeof redirectUrl === "string" && redirectUrl.length > 0) {
        return { redirectUrl };
      }
      return null;
    }
    return null;
  } catch {
    return null;
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getData
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, getData as g };
