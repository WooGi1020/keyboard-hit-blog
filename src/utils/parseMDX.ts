import * as runtime from "react/jsx-runtime";
import type { ComponentType, ElementType } from "react";

export type MDXContentComponent = ComponentType<{ components?: Record<string, ElementType> }>;

const cache = new Map<string, MDXContentComponent>();

/** Velite가 컴파일한 MDX 함수 본문을 평가해 React 컴포넌트로 만든다. 같은 코드는 한 번만 평가한다. */
export default function parseMDX(code: string): MDXContentComponent {
  const cached = cache.get(code);
  if (cached) return cached;

  const fn = new Function(code);
  const Component = fn({ ...runtime }).default as MDXContentComponent;

  cache.set(code, Component);
  return Component;
}
