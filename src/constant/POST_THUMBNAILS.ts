const labels: Record<string, string> = {
  "infra-study-1-after-merge": "머지 이후",
  "infra-study-2-infra-as-code": "IaC",
  "infra-study-3-kubernetes-yaml": "Kubernetes",
  "infra-study-4-gitops": "GitOps",
  "infra-study-5-release-flow": "릴리스",
  "chat-runtime-connection-vs-run": "연결과 실행",
  "human-approval-and-agent-writes": "승인과 버전",
  "design-system-product-owned-ui": "공유와 소유",
  "abort-signal-listener-leak": "AbortSignal",
  "event-translator-dispatcher-pattern": "이벤트 → 상태",
  "event-source-use-data-handling": "SSE 스트림",
  "react-declarative-logic-refactoring": "use · Suspense",
  "feel-route-module-react-router": "Server Components",
  "zustand-breaking": "Zustand",
  "feeling-proxy": "Proxy",
  "blog-migration": "Velite",
  "app-router-pursue-file-architecture": "App Router",
  "view-transitions-ui": "View Transitions",
};

export function getPostThumbnailLabel(slug: string, tag: string) {
  return labels[slug] || tag;
}
