export type MessageMode = "none" | "dialog" | "message" | "notification" | undefined;

export interface RequestOptions {
  // Whether to splice request parameters into URL
  shouldJoinParamsToUrl?: boolean;
  // Whether to format request parameter time
  shouldFormatDate?: boolean;
  // Whether to process the request result
  shouldTransformResponse?: boolean;
  // Whether to return native response headers
  shouldReturnNativeResponseHeaders?: boolean;
  // Whether to join URL
  shouldJoinPrefix?: boolean;
  // Interface address (use the default apiUrl if this is not specified)
  apiUrl?: string | (() => string);
  // Request path to prefix to the URL
  urlPrefix?: string;
  // Type of error message prompt
  errorMessageMode?: MessageMode;
  // Type of success message prompt
  successMessageMode?: MessageMode;
  // Whether to add a timestamp to the URL
  shouldJoinTime?: boolean;
  // Whether to ignore AbortController when sending the request
  shouldIgnoreAbortController?: boolean;
  // Whether to send token in header
  shouldSendTokenInHeader?: boolean;
  // Request retry mechanism
  retryOptions?: RetryOptions;
}

export interface RetryOptions {
  // Whether to enable request retry
  shouldRetry: boolean;
  // Number of times to retry the request
  retryCount: number;
  // Time to wait before retrying the request
  retryWaitTime: number;
}

export interface RequestResult<T = any> {
  // HTTP status code
  statusCode: number;
  // Result type
  type: "success" | "error" | "warning";
  // Result message
  message: string;
  // Result data
  data: T;
}

// Parameters for multipart/form-data file uploads
export interface UploadFileParams {
  // Other parameters to include in the request
  data?: Recordable;
  // Field name for the file in the request
  fieldName?: string;
  // The file to upload
  file: File | Blob;
  // The name to use for the file in the request
  fileName?: string;
  [key: string]: any;
}
