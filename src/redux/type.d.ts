export type RequestT<T, P> = {
  body?: T;
  params?: P;
};
export type Response<T> = {
  data: T;
};
