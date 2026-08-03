export interface PaginationParams {
  page: number;
  pageSize: number;
  skip: number;
}

export function parsePaginationParams(url: string, defaultPageSize = 20, maxPageSize = 100): PaginationParams {
  const { searchParams } = new URL(url);
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const rawPageSize = parseInt(searchParams.get("pageSize") || String(defaultPageSize), 10);

  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  let pageSize = isNaN(rawPageSize) || rawPageSize < 1 ? defaultPageSize : rawPageSize;
  if (pageSize > maxPageSize) pageSize = maxPageSize;

  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip };
}
