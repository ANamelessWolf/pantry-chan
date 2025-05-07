/**
 * Represents an exception with an associated HTTP status code.
 */
export class Exception extends Error {
  /**
   * The HTTP status code associated with the exception.
   */
  statusCode: number;
  /**
   * A detailed message describing the exception.
   */
  detail: string;

  /**
   * Creates a new instance of the Exception class.
   * @param message A description of the exception.
   * @param errDetail A detailed message describing the exception.
   * @param statusCode The HTTP status code associated with the exception.
   */
  constructor(message: string, statusCode: number, errDetail: string) {
    super(message);
    this.statusCode = statusCode;
    this.detail = errDetail;
    Error.captureStackTrace(this, this.constructor);
  }
}
