import { ResultConstants } from "@celeris/constants";
/**
 * Request data format for API calls.
 */
export interface RequestParams<T = any, Q = Record<string, any>> {
  method: string;
  body: T;
  headers?: { authorization?: string };
  query: Q;
}

/**
 * Success response format for API calls.
 */
export interface SuccessResponse<T = any> {
  code: number;
  data: T;
  message: string;
  type: "success";
}

/**
 * Error response format for API calls.
 */
export interface ErrorResponse<T = any> {
  code: number;
  data: T | null;
  message: string;
  type: "error";
}

/**
 * Paginates a list of items.
 * @param pageNo The page number of the items.
 * @param pageSize The number of items per page.
 * @param array The list of items to be paginated.
 * @returns The paginated list of items.
 */
export const paginate = <T = any>(
  pageNo: number,
  pageSize: number,
  array: T[],
): T[] => {
  const startIndex = (pageNo - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  return array.slice(startIndex, endIndex);
};

/**
 * Returns a successful response with a data.
 * @param data The result to be returned.
 * @param message The message to be included in the response.
 * @returns A successful response with a data.
 */
export const createSuccessResponse = <T = any>(
  data: T,
  message = "ok",
): SuccessResponse<T> => ({
    code: ResultConstants.SUCCESS,
    data,
    message,
    type: "success",
  });

/**
 * Returns a successful response with a paginated list of results.
 * @param page The page number of the results.
 * @param pageSize The number of results per page.
 * @param list The list of results to be paginated.
 * @param message The message to be included in the response.
 * @returns A successful response with a paginated list of results.
 */
export const createPaginatedSuccessResponse = <T = any>(
  page: number,
  pageSize: number,
  list: T[],
  message = "ok",
): SuccessResponse<{ items: T[]; total: number }> => {
  const paginatedList = paginate(page, pageSize, list);

  return {
    ...createSuccessResponse({
      items: paginatedList,
      total: list.length,
    }, message),
  };
};

/**
 * Returns an error response with a message and optional code and data.
 * @param message The error message to be included in the response.
 * @param code The error code to be included in the response.
 * @param data The optional error result to be included in the response.
 * @returns An error response with a message and optional code and data.
 */
export const createErrorResponse = <T = any>(
  message = "Request failed.",
  code = ResultConstants.ERROR,
  data: T | null = null,
): ErrorResponse<T> => ({
    code,
    data,
    message,
    type: "error",
  });

/**
 * Extracts the authorization token from the request headers.
 * @param headers The request headers.
 * @returns The authorization token, if present.
 */
export const extractAuthorizationToken = (
  { headers }: RequestParams,
): string | undefined => headers?.authorization;
