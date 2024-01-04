import { AxiosError } from "axios";
import {
  MutationCache,
  MutationMeta,
  QueryCache,
  QueryClient,
  QueryMeta,
} from "@tanstack/react-query";
import { toastEventKeys } from "./constants";
import { CustomEventDetail } from "../hooks/useGlobalToastInit";
import { ErrorResponse } from "../types/errorResponse";

export type CustomMeta = (MutationMeta | QueryMeta) & {
  message: string;
};

function generateErrorMessage(errorMessage: string) {
  window.dispatchEvent(
    new CustomEvent<CustomEventDetail>(toastEventKeys.queryError, {
      detail: {
        type: "error",
        message: errorMessage,
      },
    })
  );
}

function generateSuccessMessage(successMessage = "success") {
  window.dispatchEvent(
    new CustomEvent<CustomEventDetail>(toastEventKeys.querySuccess, {
      detail: {
        type: "success",
        message: successMessage,
      },
    })
  );
}

/* Error Handler */

function verifyErrorByOnlyRequest(error: AxiosError) {
  if (Boolean(error.response) === false) {
    generateErrorMessage(error.message);
    return true;
  }
  return false;
}

function queryErrorHandler(error: unknown) {
  const isAxiosError = error instanceof AxiosError;
  if (!isAxiosError) {
    return;
  }
  if (verifyErrorByOnlyRequest(error)) {
    return;
  }
  const customError = error as ErrorResponse;
  const statusCode = customError.response.status;

  if (statusCode >= 500) {
    const responseFromServer =
      customError.response.data.message || "Internal Server Error";
    generateErrorMessage(responseFromServer);
    return;
  } else {
    generateErrorMessage(customError.response.data.message);
    return;
  }
}

/* Success Handler */

function querySuccessHandler(message: string) {
  generateSuccessMessage(message);
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: queryErrorHandler,
    onSuccess: (_, query) => {
      if (!query.meta) {
        return;
      }
      querySuccessHandler((query.meta as CustomMeta).message);
    },
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler,
    onSuccess: (_, __, ___, mutation) => {
      if (!mutation.meta) {
        return;
      }
      querySuccessHandler((mutation.meta as CustomMeta).message);
    },
  }),
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: false,
      retry: 0,
    },
  },
});
