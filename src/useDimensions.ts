import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const initialValue = { window, screen };

type Params = { window: ScaledSize; screen: ScaledSize };

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState(initialValue);

  useEffect(() => {
    const onChange = ({ window, screen }: Params) =>
      setDimensions({ window, screen });

    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  return dimensions;
};
