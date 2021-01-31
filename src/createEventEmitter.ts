type Handler = () => void;
type UnSubscribe = () => void;

interface EventsRegistry {
  [eventName: string]: Array<Handler>;
}

interface Result {
  on: (callback: Handler) => UnSubscribe;
  emit: () => void;
}

const events: EventsRegistry = {};

export function createEventEmitter(event: string): Result {
  const emit = (): void => (events[event] || []).forEach((fn) => fn());
  const on = (cb: Handler): UnSubscribe => {
    (events[event] = events[event] || []).push(cb);

    return () => {
      events[event] = events[event]!.filter((fn) => fn !== cb);
    };
  };

  return { on, emit };
}
