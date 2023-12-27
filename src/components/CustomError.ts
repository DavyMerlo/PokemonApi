class CustomError extends Error {
    statusCode: number;
    error: string;
    error_message: string;
  
    constructor(statusCode: number, error: string, error_message: string = '') {
      super();
      this.statusCode = statusCode;
      this.error = error;
      this.error_message = error_message;
    }
  }

  export default CustomError;