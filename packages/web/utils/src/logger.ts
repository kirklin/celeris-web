/**
 * Possible log levels
 */
export enum LogLevels {
  VERBOSE = "VERBOSE",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

/**
 * Custom logger
 *
 * @param {boolean} labeled — if true,  label is shown
 * @param {string} msg  - message
 * @param {string} type - logging type 'log'|'warn'|'error'|'info'
 * @param {*} [args]      - argument to log with a message
 * @param {string} style  - additional styling to message
 */

function _log(
  labeled: boolean,
  msg: string,
  type = "log",

  args?: any,
  style = "color: inherit",
): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!("console" in window) || !window.console[type]) {
    return;
  }

  const isSimpleType = ["info", "log", "warn", "error"].includes(type);
  const argsToPass = [];

  switch (_log.logLevel) {
    case LogLevels.ERROR:
      if (type !== "error") {
        return;
      }

      break;

    case LogLevels.WARN:
      if (!["error", "warn"].includes(type)) {
        return;
      }

      break;

    case LogLevels.INFO:
      if (!isSimpleType || labeled) {
        return;
      }

      break;
  }

  if (args) {
    argsToPass.push(args);
  }

  const editorLabelText = String(import.meta.env.VITE_GLOB_APP_TITLE);
  const editorLabelStyle = `line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`;

  if (labeled) {
    if (isSimpleType) {
      argsToPass.unshift(editorLabelStyle, style);
      msg = `%c${editorLabelText}%c ${msg}`;
    } else {
      msg = `( ${editorLabelText} )${msg}`;
    }
  }

  try {
    if (!isSimpleType) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line no-console
      console[type](msg);
    } else if (args) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line no-console
      console[type](`${msg} %o`, ...argsToPass);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line no-console
      console[type](msg, ...argsToPass);
    }
  } catch (ignored) {}
}

/**
 * Current log level
 */
_log.logLevel = LogLevels.VERBOSE;

/**
 * Set current log level
 *
 * @param {LogLevels} logLevel - log level to set
 */
export function setLogLevel(logLevel: LogLevels): void {
  _log.logLevel = logLevel;
}

/**
 * _log method proxy without log label
 */
export const log = _log.bind(window, false);

/**
 * _log method proxy with log label
 */
export const logLabeled = _log.bind(window, true);
