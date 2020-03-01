# typed-bus

A tiny event bus where every event's payload is type-checked. Wrong event names and wrong payloads fail at
compile time, not in production.

```ts
import { createBus } from '@satyajeet10/typed-bus';

type Events = {
  'trade:booked': { id: number; amount: number };
  'session:end': undefined;
};

const bus = createBus<Events>();
const off = bus.on('trade:booked', ({ amount }) => console.log(amount)); // amount: number
bus.emit('trade:booked', { id: 1, amount: 500 });
bus.emit('trade:booked', { id: 1, amount: '500' }); // ✗ compile error
off();
```

Used as the cross-team contract pattern in [mfe-banking-platform](../../3-platform-engineering/mfe-banking-platform).

## Develop
```bash
npm install
npm test
```
