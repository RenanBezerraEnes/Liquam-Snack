/* eslint-disable prettier/prettier */
type PaginatedListDTO<T> = {
  data: T;
  page?: number;
  size?: number;
};
  
export type PaginationResponse<T> = {
  data: T;
  totalItems: number;
  page: number;
  size: number;
};
  
export class PaginationHelper {
  static paginatedList<T>({
    data,
    size = 10,
    page = 1,
  }: PaginatedListDTO<T[]>): PaginationResponse<T[]> {
    const inicial = size * (page - 1);
    const final = size + inicial;
    return {
      data: data.slice(inicial, final),
      totalItems: data.length,
      page,
      size,
    };
  }
}
