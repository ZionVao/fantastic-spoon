// import axios, {
//   AxiosError,
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosRequestHeaders,
//   Method,
// } from 'axios';
// import { SrvRecord } from 'dns';
// import { ContentType } from 'src/common/enums/content-type.enum';
// import { HttpHeader } from 'src/common/enums/http-header.enum';
// import { HttpMethod } from 'src/common/enums/http-method.enum';
// import { StorageKey } from 'src/common/enums/storage-key.enum';
// import { Options } from 'src/interfaces/services/http/Options';
// import { Query } from 'src/interfaces/services/http/Query';
// import { IHttpService } from './IHttpServise';

// const getStringifiedQuery = (params: Query) =>
//   Object.keys(params)
//     .map((key) => key + '=' + (params[key] ? String(params[key]) : ''))
//     .join('&');

// export class HttpService implements IHttpService {
//   constructor() {}

//   async load(url: string, options: Options): Promise<any> {
//     const {
//       method = HttpMethod.GET,
//       payload = null,
//       hasAuth = false,
//       contentType = ContentType.JSON,
//       query,
//       form = null,
//     } = options;

//     // return axios({
//     //   method,
//     //   url: this.getUrl(url, query),
//     //   // headers: this.getHeader(hasAuth, contentType),
//     // });

//     const config: AxiosRequestConfig = {
//       method,
//       url: this.getUrl(url, query),
//       headers: {
//         ...this.getHeader(hasAuth, contentType),
//       } as AxiosRequestHeaders,
//     };
//     const specificAxios = this.setupInterceptorsTo(axios.create());
//     return specificAxios(config);
//   }

//   private getHeader(
//     hasAuth: boolean,
//     contentType?: string,
//   ): Record<string, string | boolean> {
//     let headers: Record<string, string | boolean> = {
//       Accept: 'application/json',

//       'Access-Control-Allow-Credentials': true,
//     };

//     if (contentType) {
//       headers = { ...headers }; // HttpHeader.CONTENT_TYPE: contentType}
//     }

//     if (hasAuth) {
//       const token = localStorage.getItem(StorageKey.TOKEN);

//       // headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
//     }

//     return headers;
//   }

//   private checkStatus() {}

//   private getUrl(url: string, query?: Query): string {
//     console.log(url, query);

//     const api = process.env.REACT_APP_HOST_API;

//     return `${api}${url}${query && `?${getStringifiedQuery(query)}`}`;
//   }

//   private getJSON(response: Response) {
//     return response.json();
//   }

//   onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
//     console.info(`[request] [${JSON.stringify(config)}]`);
//     return config;
//   };

//   onRequestError = (error: AxiosError): Promise<AxiosError> => {
//     console.error(`[request error] [${JSON.stringify(error)}]`);
//     return Promise.reject(error);
//   };

//   private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
//     axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);

//     return axiosInstance;
//   }
// }

// export const Http = new HttpService();

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StorageKey } from 'src/common/enums/storage-key.enum';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  // 'Access-Control-Allow-Credentials': true,
  // 'X-Requested-With': 'XMLHttpRequest',
};

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = localStorage.getItem(StorageKey.TOKEN);

    if (token != null && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers = { ...config.headers };
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: 'https://blooming-earth-65596.herokuapp.com',
      headers,
      // withCredentials: true,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error),
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      },
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: any) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.NotFound: {
        // Handle NotFound
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
      default: {
        console.log(status, 'not found case');
        break;
      }
    }
    console.log(status);

    return Promise.reject(error);
  }
}

export const http = new Http();
