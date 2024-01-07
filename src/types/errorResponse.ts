import { AxiosError, AxiosHeaders } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { BaseResponse } from "./response";

export interface ErrorResponse extends AxiosError {
  response: {
    config: InternalAxiosRequestConfig;
    data: BaseResponse;
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
  };
}
