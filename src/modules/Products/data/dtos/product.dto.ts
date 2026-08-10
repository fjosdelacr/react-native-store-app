export interface ProductDtoResponse {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
}

export interface ProductDtoRequest {
  title: string;
  description?: string;
}
