import { useLayoutEffect } from "react";
import useGlobalToast from "./useGlobalToast";
import { toastEventKeys } from "../react-query/constants";

type ToastType = "error" | "success";
export type CustomEventDetail = { type: ToastType; message: string };

// API Response 에 대한 type 은 'error' | 'success'
export default function useGlobalToastInit() {
  const { generateToast, dismissAllToast } = useGlobalToast();
  useLayoutEffect(() => {
    const eventGenerateToast = (event: Event) => {
      const detail: CustomEventDetail = (event as CustomEvent).detail;
      dismissAllToast();
      switch (detail.type) {
        case "error":
          generateToast({
            type: "error",
            message: detail.message,
            closeTime: 5000,
          });
          break;
        case "success":
          generateToast({ type: "success", message: detail.message });
          break;
        default:
          break;
      }
    };
    window.addEventListener(toastEventKeys.queryError, eventGenerateToast);
    window.addEventListener(toastEventKeys.querySuccess, eventGenerateToast);
    return () => {
      Object.keys(toastEventKeys).forEach((key) => {
        window.removeEventListener(key, eventGenerateToast);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
