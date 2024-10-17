export type RequestT<T, P> = {
  body?: T;
  params?: P;
};
export type ResponseT<T> = {
  data: T;
};
export enum MethodType {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}
