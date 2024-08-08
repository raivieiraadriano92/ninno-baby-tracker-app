import { EventEmitter } from "eventemitter3";

const event = new EventEmitter();

const ON_SELECT_SUPPLEMENT_EVENT = "onSelectSupplement";

export const emitSelectSupplementEvent = (supplement: string) =>
  event.emit(ON_SELECT_SUPPLEMENT_EVENT, supplement);

export const onSelectSupplementEvent = (fn: (_supplement: string) => void) => {
  event.on(ON_SELECT_SUPPLEMENT_EVENT, fn);

  return {
    off: () => event.off(ON_SELECT_SUPPLEMENT_EVENT)
  };
};
