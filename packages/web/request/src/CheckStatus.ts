import { HttpStatusConstants } from "@celeris/constants";

/**
 * 策略模式：定义一组算法，将每个算法都封装起来，并且使它们之间可以互换。
 */

// 定义一个状态码处理策略接口
interface CheckStrategy {
  check(status: number, msg?: string): void;
}
// Processing = 102
class ProcessingCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    if (msg) {
      throw new Error(msg);
    } else {
      throw new Error(`处理中，状态码：${status}`);
    }
  }
}

// OK = 200
class OKCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the response is successful.
  }
}

// Created = 201
class CreatedCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the resource was successfully created.
  }
}

// Accepted = 202
class AcceptedCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the request was accepted for processing, but the processing has not been completed yet.
  }
}

// NoContent = 204
class NoContentCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the response is successful but there is no entity-body in the response.
  }
}

// ResetContent = 205
class ResetContentCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the response is successful and tells the client to reset the document view.
  }
}

// PartialContent = 206
class PartialContentCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the response is successful and contains partial content as requested by the client.
  }
}

// MovedPermanently = 301
class MovedPermanentlyCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the requested resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs.
  }
}

// Found = 302
class FoundCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the requested resource has been temporarily moved to the URI specified in the Location header field.
  }
}

// SeeOther = 303
class SeeOtherCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the response to the request can be found under a different URI and should be retrieved using a GET method on that resource.
  }
}

// NotModified = 304
class NotModifiedCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the resource has not been modified since the last request, and there is no need to retransmit the resource to the client.
  }
}

// UseProxy = 305
// class UseProxyCheckStrategy implements CheckStrategy {
//   check(status: number, msg?: string): void {
//     throw new Error(msg ?? `状态码 ${status} 已被废弃，不再使用`);
//   }
// }

// TemporaryRedirect = 307
class TemporaryRedirectCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the requested resource has been temporarily moved to the URI specified in the Location header field.
  }
}

// PermanentRedirect = 308
class PermanentRedirectCheckStrategy implements CheckStrategy {
  check(): void {
    // Do nothing, the requested resource has been permanently moved to the URI specified in the Location header field.
  }
}

class BadRequestCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "请求失败！请您稍后重试");
  }
}

class UnauthorizedCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "请求需要身份验证，但未提供有效的凭据，请您重新登录。");
  }
}

class ForbiddenCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "当前账号无权限访问！");
  }
}

class NotFoundCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "你所访问的资源不存在！");
  }
}

class MethodNotAllowedCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "请求方式错误！请您稍后重试");
  }
}

class RequestTimeoutCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "请求超时！请您稍后重试");
  }
}

class InternalServerErrorCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "服务器遇到错误，无法完成请求！");
  }
}

class BadGatewayCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "网关错误！");
  }
}

class ServiceUnavailableCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "服务器暂时不可用！");
  }
}

class GatewayTimeoutCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    throw new Error(msg ?? "网关超时！");
  }
}

// 定义默认的状态码处理策略类
class DefaultCheckStrategy implements CheckStrategy {
  check(status: number, msg?: string): void {
    if (msg) {
      throw new Error(msg);
    } else {
      throw new Error(`请求失败，状态码：${status}`);
    }
  }
}

/**
 * 上下文类：选择合适的策略类并执行 check 方法
 */
class CheckStatus {
  private readonly strategyMap: Map<number, CheckStrategy>;

  constructor() {
    // 初始化策略类的映射
    this.strategyMap = new Map<number, CheckStrategy>([
      [HttpStatusConstants.Processing, new ProcessingCheckStrategy()],
      [HttpStatusConstants.OK, new OKCheckStrategy()],
      [HttpStatusConstants.Created, new CreatedCheckStrategy()],
      [HttpStatusConstants.Accepted, new AcceptedCheckStrategy()],
      [HttpStatusConstants.NoContent, new NoContentCheckStrategy()],
      [HttpStatusConstants.ResetContent, new ResetContentCheckStrategy()],
      [HttpStatusConstants.PartialContent, new PartialContentCheckStrategy()],
      [HttpStatusConstants.MovedPermanently, new MovedPermanentlyCheckStrategy()],
      [HttpStatusConstants.Found, new FoundCheckStrategy()],
      [HttpStatusConstants.SeeOther, new SeeOtherCheckStrategy()],
      [HttpStatusConstants.NotModified, new NotModifiedCheckStrategy()],
      // [HttpStatusConstants.UseProxy, new UseProxyCheckStrategy()],
      [HttpStatusConstants.TemporaryRedirect, new TemporaryRedirectCheckStrategy()],
      [HttpStatusConstants.PermanentRedirect, new PermanentRedirectCheckStrategy()],
      [HttpStatusConstants.BadRequest, new BadRequestCheckStrategy()],
      [HttpStatusConstants.Unauthorized, new UnauthorizedCheckStrategy()],
      [HttpStatusConstants.Forbidden, new ForbiddenCheckStrategy()],
      [HttpStatusConstants.NotFound, new NotFoundCheckStrategy()],
      [HttpStatusConstants.MethodNotAllowed, new MethodNotAllowedCheckStrategy()],
      [HttpStatusConstants.RequestTimeout, new RequestTimeoutCheckStrategy()],
      [HttpStatusConstants.InternalServerError, new InternalServerErrorCheckStrategy()],
      [HttpStatusConstants.BadGateway, new BadGatewayCheckStrategy()],
      [HttpStatusConstants.ServiceUnavailable, new ServiceUnavailableCheckStrategy()],
      [HttpStatusConstants.GatewayTimeout, new GatewayTimeoutCheckStrategy()],
    ]);
  }

  /**
   *
   *根据状态码选择合适的策略类并执行 check 方法
   *@param status 状态码
   *@param msg 提示消息
   */
  checkStatus(status: number, msg?: string): void {
    const strategy = this.strategyMap.get(status) || new DefaultCheckStrategy();
    strategy.check(status, msg);
  }
}
// 导出 checkStatus 函数
export function checkStatus(status: number, msg?: string): void {
  const checker = new CheckStatus();
  checker.checkStatus(status, msg);
}
