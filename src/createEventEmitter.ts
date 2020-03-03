// @ts-ignore
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

const eventEmitter = new EventEmitter();

export const createEventEmitter = (event: string) => {
  const emit = () => eventEmitter.emit(event);
  const on = (handler: () => void) => {
    eventEmitter.addListener(event, handler);

    return () => eventEmitter.removeListener(event, handler);
  };

  return { on, emit };
};
