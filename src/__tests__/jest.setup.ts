import { NativeModules } from "react-native";

NativeModules.RNDarkMode = { initialMode: "light", addListener() {} };

jest.mock("../dimensions/init", () => ({}));
jest.mock("../dark-mode/init", () => ({}));
