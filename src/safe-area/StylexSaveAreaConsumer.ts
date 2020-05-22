// @ts-ignore
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { emit } from "./eventEmitter";
import { state } from "./state";

export const StylexSaveAreaConsumer = () => {
  const insets = useSafeAreaInsets();
  const isChanged = Object.entries(insets).some(
    ([key, value]) => state.insets[key] !== value
  );

  if (isChanged) {
    state.insets = insets;

    emit();
  }

  return null;
};
