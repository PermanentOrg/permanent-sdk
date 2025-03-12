export interface PaginatedItems<T> {
  items: T[];
  pagination: {
    nextCursor: string,
    nextPage: string,
    totalPages: number,
  }
}
