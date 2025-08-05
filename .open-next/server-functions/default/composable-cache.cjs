globalThis.disableIncrementalCache = false;globalThis.disableDynamoDBCache = false;globalThis.isNextAfter15 = false;globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.4";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/adapters/composable-cache.js
var composable_cache_exports = {};
__export(composable_cache_exports, {
  default: () => composable_cache_default
});
module.exports = __toCommonJS(composable_cache_exports);

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
function getTagKey(tag) {
  if (typeof tag === "string") {
    return tag;
  }
  return JSON.stringify({
    tag: tag.tag,
    path: tag.path
  });
}
async function writeTags(tags) {
  const store = globalThis.__openNextAls.getStore();
  debug("Writing tags", tags, store);
  if (!store || globalThis.openNextConfig.dangerous?.disableTagCache) {
    return;
  }
  const tagsToWrite = tags.filter((t) => {
    const tagKey = getTagKey(t);
    const shouldWrite = !store.writtenTags.has(tagKey);
    if (shouldWrite) {
      store.writtenTags.add(tagKey);
    }
    return shouldWrite;
  });
  if (tagsToWrite.length === 0) {
    return;
  }
  await globalThis.tagCache.writeTags(tagsToWrite);
}

// node_modules/@opennextjs/aws/dist/utils/stream.js
var import_node_stream = require("node:stream");
function fromReadableStream(stream, base64) {
  const reader = stream.getReader();
  const chunks = [];
  return new Promise((resolve, reject) => {
    function pump() {
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve(Buffer.concat(chunks).toString(base64 ? "base64" : "utf8"));
          return;
        }
        chunks.push(value);
        pump();
      }).catch(reject);
    }
    pump();
  });
}
function toReadableStream(value, isBase64) {
  return import_node_stream.Readable.toWeb(import_node_stream.Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}

// node_modules/@opennextjs/aws/dist/adapters/composable-cache.js
var pendingWritePromiseMap = /* @__PURE__ */ new Map();
var composable_cache_default = {
  async get(cacheKey) {
    try {
      if (pendingWritePromiseMap.has(cacheKey)) {
        const stored = pendingWritePromiseMap.get(cacheKey);
        if (stored) {
          return stored.then((entry) => ({
            ...entry,
            value: toReadableStream(entry.value)
          }));
        }
      }
      const result = await globalThis.incrementalCache.get(cacheKey, "composable");
      if (!result?.value?.value) {
        return void 0;
      }
      debug("composable cache result", result);
      if (globalThis.tagCache.mode === "nextMode" && result.value.tags.length > 0) {
        const hasBeenRevalidated = result.shouldBypassTagCache ? false : await globalThis.tagCache.hasBeenRevalidated(result.value.tags, result.lastModified);
        if (hasBeenRevalidated)
          return void 0;
      } else if (globalThis.tagCache.mode === "original" || globalThis.tagCache.mode === void 0) {
        const hasBeenRevalidated = result.shouldBypassTagCache ? false : await globalThis.tagCache.getLastModified(cacheKey, result.lastModified) === -1;
        if (hasBeenRevalidated)
          return void 0;
      }
      return {
        ...result.value,
        value: toReadableStream(result.value.value)
      };
    } catch (e) {
      debug("Cannot read composable cache entry");
      return void 0;
    }
  },
  async set(cacheKey, pendingEntry) {
    const promiseEntry = pendingEntry.then(async (entry2) => ({
      ...entry2,
      value: await fromReadableStream(entry2.value)
    }));
    pendingWritePromiseMap.set(cacheKey, promiseEntry);
    const entry = await promiseEntry.finally(() => {
      pendingWritePromiseMap.delete(cacheKey);
    });
    await globalThis.incrementalCache.set(cacheKey, {
      ...entry,
      value: entry.value
    }, "composable");
    if (globalThis.tagCache.mode === "original") {
      const storedTags = await globalThis.tagCache.getByPath(cacheKey);
      const tagsToWrite = entry.tags.filter((tag) => !storedTags.includes(tag));
      if (tagsToWrite.length > 0) {
        await writeTags(tagsToWrite.map((tag) => ({ tag, path: cacheKey })));
      }
    }
  },
  async refreshTags() {
    return;
  },
  async getExpiration(...tags) {
    if (globalThis.tagCache.mode === "nextMode") {
      return globalThis.tagCache.getLastRevalidated(tags);
    }
    return 0;
  },
  async expireTags(...tags) {
    if (globalThis.tagCache.mode === "nextMode") {
      return writeTags(tags);
    }
    const tagCache = globalThis.tagCache;
    const revalidatedAt = Date.now();
    const pathsToUpdate = await Promise.all(tags.map(async (tag) => {
      const paths = await tagCache.getByTag(tag);
      return paths.map((path) => ({
        path,
        tag,
        revalidatedAt
      }));
    }));
    const setToWrite = /* @__PURE__ */ new Set();
    for (const entry of pathsToUpdate.flat()) {
      setToWrite.add(entry);
    }
    await writeTags(Array.from(setToWrite));
  },
  // This one is necessary for older versions of next
  async receiveExpiredTags(...tags) {
    return;
  }
};
