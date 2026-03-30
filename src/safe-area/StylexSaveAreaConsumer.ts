import type { FC } from "react";
import { useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { emit } from "./eventEmitter";
import { state } from "./state";
import { EdgeInsets } from "./types";

export const StylexSaveAreaConsumer: FC = () => {
  const insets: EdgeInsets = useSafeAreaInsets();

  useLayoutEffect(() => {
    const isChanged = Object.entries(insets).some(
      ([key, value]) => state.insets[key as keyof EdgeInsets] !== value,
    );

    if (isChanged) {
      state.insets = insets;
      emit();
    }
  }, [insets]);

  return null;
};

StylexSaveAreaConsumer.displayName = "StylexSaveAreaConsumer";
