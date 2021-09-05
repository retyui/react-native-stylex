import { Platform } from "react-native";
import { makeUseStyles } from "react-native-stylex";
import { getSafeArea } from "react-native-stylex/safe-area";

export const useStyles = makeUseStyles(() => ({
  skipBtn: {
    position: "absolute",
    left: 20,
    bottom: 30 + getSafeArea().bottom,
    fontSize: 20,
  },
  nextButton: {
    position: "absolute",
    right: 20,
    bottom: 20 + getSafeArea().bottom,
    width: 48,
    height: 48,
    borderRadius: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  nextButtonText: {
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontSize: 26,
        lineHeight: 48,
      },
      android: {
        textAlignVertical: "center",
        fontSize: 36,
      },
      web: {
        fontSize: 36,
        lineHeight: 40,
      },
    }),
  },
}));
