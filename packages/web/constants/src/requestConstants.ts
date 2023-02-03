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
