import { describe, it, expect, vi } from 'vitest';
import { createBus } from '../src/index';

type Events = { 'trade:booked': { id: number; amount: number }; 'session:end': undefined };

describe('createBus', () => {
  it('delivers typed payloads', () => {
    const bus = createBus<Events>();
    const handler = vi.fn();
    bus.on('trade:booked', handler);
    bus.emit('trade:booked', { id: 1, amount: 500 });
    expect(handler).toHaveBeenCalledWith({ id: 1, amount: 500 });
  });

  it('unsubscribes', () => {
    const bus = createBus<Events>();
    const handler = vi.fn();
    const off = bus.on('session:end', handler);
    off();
    bus.emit('session:end', undefined);
    expect(handler).not.toHaveBeenCalled();
  });

  it('rejects wrong payloads at compile time', () => {
    const bus = createBus<Events>();
    // @ts-expect-error amount must be a number
    bus.emit('trade:booked', { id: 1, amount: '500' });
    // @ts-expect-error unknown event
    bus.emit('trade:cancelled', {});
  });
});
