import { createContext } from "react";

export const ThemeContext = createContext({ isLightTheme: false, toggleIsLightTheme: () => null })
export const ToastDefaultValue = {
  isShowToast: false,
  toastText: '',
  toastTitle: '',
  toastType: '',
  showToastFor5s: ({ toastText, toastTitle, toastType }) => null
}
export const ToastContext = createContext(ToastDefaultValue);