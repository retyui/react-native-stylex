type Handler = () => void;

const events: Record<string, Array<Handler>> = {};

export const createEventEmitter = (event: string) => {
  const emit = () => (events[event] || []).forEach(fn => fn());
  const on = (cb: Handler) => {
    (events[event] = events[event] || []).push(cb);

    return () => {
      events[event] = events[event].filter(fn => fn !== cb);
    };
  };

  return { on, emit };
};
