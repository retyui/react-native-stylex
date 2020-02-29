import * as React from "react";

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SafeAreaViewProps {
  children?: React.ReactNode;
  initialSafeAreaInsets?: EdgeInsets | null;
}
