import * as runtime from "react/jsx-runtime";

const cache = new Map<string, any>();

export default function parseMDX(code: string) {
  if (cache.has(code)) {
    return cache.get(code);
  }

  const fn = new Function(code);
  const Component = fn({ ...runtime }).default;

  cache.set(code, Component);
  return Component;
}
