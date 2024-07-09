import { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// Error handling scheme: Error types
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// Response data structure agreed with the backend
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

// Runtime configuration
export const request: RequestConfig = {
  // Unified request settings
  timeout: 1000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // Error handling: umi@3's error handling scheme.
  errorConfig: {
    // Error throwing
    errorThrower: (res: ResponseStructure) => {
      const { success, data, errorCode, errorMessage, showType } = res;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // Throw custom error
      }
    },
    // Error catching and handling
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // The errors thrown by our errorThrower.
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios error
        // The request was made, and the server responded with a status code that falls out of the range of 2xx
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        // \`error.request\` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message.error('None response! Please retry.');
      } else {
        // Something happened in setting up the request that triggered an error
        message.error('Request error, please retry.');
      }
    },

  },

  // Request interceptors
  requestInterceptors: [
    (config) => {
    // Intercept request configurations for personalized processing.
      const url = config.url.concat('?token = 123');
      return { ...config, url};
    }
  ],

  // Response interceptors
  responseInterceptors: [
    (response) => {
       // Intercept the response data for personalized processing
       const { data } = response;
       if(!data.success){
         message.error('Request failed!');
       }
       return response;
    }
  ]
};