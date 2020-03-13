import { createEventEmitter } from "../createEventEmitter";

it("should call handler when invoke emit", () => {
  const a = createEventEmitter("event");
  const handler = jest.fn();

  const unsub = a.on(handler);

  expect(handler).toHaveBeenCalledTimes(0);

  a.emit();

  expect(handler).toHaveBeenCalledTimes(1);
});

it("should not call handler when unsubscribe", () => {
  const a = createEventEmitter("event");
  const handler = jest.fn();

  const unsub = a.on(handler);

  a.emit();

  expect(handler).toHaveBeenCalledTimes(1);

  unsub();

  a.emit();

  expect(handler).toHaveBeenCalledTimes(1);
});

it("should throw error when no subscribed functions", () => {
  const a = createEventEmitter("test");

  a.emit();
});
