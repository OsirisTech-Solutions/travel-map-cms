export type RequestT<T, P> = {
  body?: T;
  params?: P;
};
export type ResponseT<T> = {
  data: T;
};
export enum MethodType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
