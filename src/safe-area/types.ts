import { ReactNode } from "react";

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SafeAreaViewProps {
  children?: ReactNode;
  initialSafeAreaInsets?: EdgeInsets | null;
}
