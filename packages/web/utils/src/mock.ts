import { ResultConstants } from "@celeris/constants";

/**
 * API调用的请求数据格式。
 * Request data format for API calls.
 */
export interface RequestParams<T = any, Q = Record<string, any>> {
  method: string;
  body: T;
  headers?: { authorization?: string };
  query: Q;
}

/**
 * API调用的成功响应格式。
 * Success response format for API calls.
 */
export interface SuccessResponse<T = any> {
  code: number;
  data: T;
  message: string;
  type: "success";
}

/**
 * API调用的错误响应格式。
 * Error response format for API calls.
 */
export interface ErrorResponse<T = any> {
  code: number;
  data: T | null;
  message: string;
  type: "error";
}

/**
 * 对项目列表进行分页。
 * Paginates a list of items.
 *
 * @param {number} pageNo - 项目的页码。
 * The page number of the items.
 *
 * @param {number} pageSize - 每页的项目数量。
 * The number of items per page.
 *
 * @param {[]} array - 要进行分页的项目列表。
 * The list of items to be paginated.
 *
 * @returns {[]} - 分页后的项目列表。
 * The paginated list of items.
 */
export function paginate<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const startIndex = (pageNo - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  return array.slice(startIndex, endIndex);
}

/**
 * 返回带有数据的成功响应。
 * Returns a successful response with data.
 *
 * @param {T} data - 要返回的结果。
 * The result to be returned.
 *
 * @param {string} message - 要包含在响应中的消息。
 * The message to be included in the response.
 *
 * @returns {SuccessResponse<T>} - 带有数据的成功响应。
 * A successful response with data.
 */
export function createSuccessResponse<T = any>(data: T, message = "ok"): SuccessResponse<T> {
  return {
    code: ResultConstants.SUCCESS,
    data,
    message,
    type: "success",
  };
}

/**
 * 返回带有分页结果的成功响应。
 * Returns a successful response with a paginated list of results.
 *
 * @param {number} page - 结果的页码。
 * The page number of the results.
 *
 * @param {number} pageSize - 每页的结果数量。
 * The number of results per page.
 *
 * @param {T[]} list - 要进行分页的结果列表。
 * The list of results to be paginated.
 *
 * @param {string} message - 要包含在响应中的消息。
 * The message to be included in the response.
 *
 * @returns {SuccessResponse<{ items: T[]; total: number }>} - 带有分页结果的成功响应。
 * A successful response with a paginated list of results.
 */
export function createPaginatedSuccessResponse<T = any>(page: number, pageSize: number, list: T[], message = "ok"): SuccessResponse<{ items: T[]; total: number }> {
  const paginatedList = paginate(page, pageSize, list);

  return {
    ...createSuccessResponse({
      items: paginatedList,
      total: list.length,
    }, message),
  };
}

/**
 * 返回带有消息和可选代码和数据的错误响应。
 * Returns an error response with a message and optional code and data.
 *
 * @param {string} message - 要包含在响应中的错误消息。
 * The error message to be included in the response.
 *
 * @param {number} code - 要包含在响应中的错误代码（可选）。
 * The error code to be included in the response (optional).
 *
 * @param {T | null} data - 要包含在响应中的可选错误结果（默认为null）。
 * The optional error result to be included in the response (default is null).
 *
 * @returns {ErrorResponse<T>} - 带有消息和可选代码和数据的错误响应。
 * An error response with a message and optional code and data.
 */
export function createErrorResponse<T = any>(message = "请求失败。", code = ResultConstants.ERROR, data: T | null = null): ErrorResponse<T> {
  return {
    code,
    data,
    message,
    type: "error",
  };
}

/**
 * 从请求头中提取授权令牌。
 * Extracts the authorization token from the request headers.
 *
 * @param {RequestParams} headers - 请求头信息。
 * The request headers.
 *
 * @returns {string | undefined} - 如果存在授权令牌，则返回授权令牌；否则返回 undefined。
 * The authorization token, if present; otherwise, undefined.
 */
export function extractAuthorizationToken({ headers }: RequestParams): string | undefined {
  return headers?.authorization;
}
