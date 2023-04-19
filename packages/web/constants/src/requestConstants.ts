/**
 * @description: request method
 */
export enum RequestConstants {
  GET = "GET", // Used for retrieving data from a server
  POST = "POST", // Used for sending data to a server
  PUT = "PUT", // Used for updating existing data on a server
  DELETE = "DELETE", // Used for deleting data from a server
}

/**
 * @description: Request result set
 */
export enum ResultConstants {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 408,
}

/**
 * @description: contentType
 */
export enum ContentTypeConstants {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_MULTIPART = "multipart/form-data;charset=UTF-8",
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * An enumeration of HTTP status codes.
 * HTTP状态码的枚举类型。
 */
export enum HttpStatusConstants {
  // The request has been accepted for processing, but the processing has not been completed.
  // 请求已被接受进行处理，但处理尚未完成。
  Processing = 102,

  // The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.
  // 服务器已成功完成请求，响应负载体中没有额外的内容可发送。
  OK = 200,

  // The request has succeeded and a new resource has been created as a result of it.
  // 请求成功，因此已创建了一个新资源。
  Created = 201,

  // The server has received and is processing the request, but no response is available yet.
  // 服务器已接收并正在处理请求，但尚未有响应可用。
  Accepted = 202,

  // The request was successful but the server is not returning any content.
  // 请求成功，但服务器没有返回任何内容。
  NoContent = 204,

  // The server successfully processed the request but is not returning any content.
  // 服务器已成功处理请求，但不返回任何内容。
  ResetContent = 205,

  // The request was successful and the server is returning partial content.
  // 请求成功，服务器正在返回部分内容。
  PartialContent = 206,

  // The requested resource has been permanently moved to a new location, and any future references to this resource should use one of the returned URIs.
  // 请求的资源已永久移动到新位置，未来对该资源的引用应使用返回的URI之一。
  MovedPermanently = 301,

  // The requested resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs.
  // 请求的资源已被分配了一个新的永久URI，未来对该资源的引用应使用返回的URI之一。
  Found = 302,

  // The server is redirecting the client to a different resource, as indicated by a URI in the Location header field, and the user agent may automatically redirect its request to that URI.
  // 服务器将客户端重定向到不同的资源，这在Location头字段中的URI中指示，并且用户代理可以自动重定向其请求到该URI。
  SeeOther = 303,

  // The server is redirecting the client to a different resource, as indicated by a URI in the Location header field, and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.
  // 服务器将客户端重定向到不同的资源，这在Location头字段中的URI中指示，并且如果它执行自动重定向到该URI，则用户代理不得更改请求方法。
  NotModified = 304,

  // Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy.
  // 使用代理。所请求的资源必须通过代理访问
  UseProxy = 305,

  // The requested resource MUST be accessed through the proxy given by the Location field.
  // 必须通过Location字段给定的代理访问请求的资源。
  TemporaryRedirect = 307,

  // The requested resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.
  // 请求的资源暂时位于不同的 URI 下，如果它执行自动重定向到该 URI，则用户代理必须不更改请求方法。
  PermanentRedirect = 308,

  // The request could not be understood or was missing required parameters.
  // 请求不能被理解或缺少必需的参数。
  BadRequest = 400,

  // Authentication failed or user doesn't have permissions for the requested operation.
  // 身份验证失败或用户没有请求操作的权限。
  Unauthorized = 401,

  // The authenticated user does not have access to the requested resource.
  // 经过身份验证的用户无权访问请求的资源。
  Forbidden = 403,

  // The requested resource could not be found.
  // 请求的资源未找到。
  NotFound = 404,

  // The request method is not supported for the requested resource.
  // 请求方法不支持请求的资源。
  MethodNotAllowed = 405,

  // This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection.
  // 服务器等待客户端发送的请求时间过长，超时
  RequestTimeout = 408,

  // The server encountered an unexpected condition that prevented it from fulfilling the request.
  // 服务器遇到意外情况，无法完成请求。
  InternalServerError = 500,

  // The server, while acting as a gateway or proxy, received an invalid response from an upstream server it accessed while attempting to fulfill the request.
  // 服务器充当网关或代理时，从其访问的上游服务器接收到无效响应，而导致无法完成请求。
  BadGateway = 502,

  // The server is currently unable to handle the request due to a temporary overload or maintenance of the server.
  // 服务器当前由于临时过载或维护而无法处理请求。
  ServiceUnavailable = 503,

  // The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.
  // 服务器在充当网关或代理时，未能及时从其需要访问以完成请求的上游服务器收到响应。
  GatewayTimeout = 504,
}
