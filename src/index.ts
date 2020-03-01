/** Map of event name → payload type, e.g. { 'user:login': { id: string } }. */
export type EventMap = Record<string, unknown>;

type Handler<T> = (payload: T) => void;

export interface Bus<E extends EventMap> {
  on<K extends keyof E>(event: K, handler: Handler<E[K]>): () => void;
  emit<K extends keyof E>(event: K, payload: E[K]): void;
  // Roadmap v0.2: once(), off(), and a wildcard listener
}

export function createBus<E extends EventMap>(): Bus<E> {
  const handlers = new Map<keyof E, Set<Handler<never>>>();

  return {
    on(event, handler) {
      const set = handlers.get(event) ?? new Set();
      set.add(handler as Handler<never>);
      handlers.set(event, set);
      return () => set.delete(handler as Handler<never>);
    },
    emit(event, payload) {
      for (const h of handlers.get(event) ?? []) (h as Handler<typeof payload>)(payload);
    },
  };
}
