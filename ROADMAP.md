# Roadmap

## v0.1 (current)
- [x] `on` / `emit` with per-event payload types, unsubscribe, compile-time tests

## v0.2
- [ ] `once`, `off`, and `onAny` (handler receives a discriminated union of all events)
- [ ] `emit('session:end')` without a payload for `undefined` events (conditional types + rest tuples)
- [ ] Error isolation: a throwing handler doesn't stop others; `onError` hook

## v1.0
- [ ] Optional runtime validation from a map of Zod schemas, with `E` inferred from it
- [ ] Dual ESM/CJS build with tsup, CHANGELOG, publish to npm
