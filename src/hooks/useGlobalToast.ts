import { useCallback } from "react";
import { TypeOptions, ToastPosition, toast } from "react-toastify";
import { CustomMeta } from "../react-query/queryClient";

type Props = {
  message: string;
  type: TypeOptions;
  closeTime?: number;
  position?: ToastPosition;
};

export default function useGlobalToast() {
  const generateMessage = useCallback((message: string): CustomMeta => {
    return {
      message,
    };
  }, []);

  const dismissAllToast = useCallback(() => {
    toast.dismiss();
  }, []);

  const generateToast = useCallback(
    ({ message, type, closeTime = 3000, position = "top-right" }: Props) => {
      toast(message, {
        type,
        autoClose: closeTime,
        position,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    },
    []
  );

  return { generateMessage, generateToast, dismissAllToast };
}
