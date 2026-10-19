import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * 클라이언트에서 하이드레이션이 끝났는지 알려 준다.
 * 서버 렌더와 첫 클라이언트 렌더에서는 false, 이후 true.
 * effect 안에서 setState로 "mounted" 플래그를 세우던 패턴을 대체한다.
 */
export default function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
