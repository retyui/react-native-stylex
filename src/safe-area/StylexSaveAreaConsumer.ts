import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EdgeInsets } from "./types";

import { emit } from "./eventEmitter";
import { state } from "./state";
import { useLayoutEffect } from "react";

export function StylexSaveAreaConsumer(): JSX.Element | null {
  const insets: EdgeInsets = useSafeAreaInsets();

  useLayoutEffect(() => {
    const isChanged = Object.entries(insets).some(
      ([key, value]) => state.insets[key as keyof EdgeInsets] !== value
    );

    if (isChanged) {
      state.insets = insets;
      emit();
    }
  }, [insets]);

  return null;
}
