/* eslint-disable prettier/prettier */
export type IGenericResponse<T> = {
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
