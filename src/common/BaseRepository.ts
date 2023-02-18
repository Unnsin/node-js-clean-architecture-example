export interface BaseRepository<T> {
  Save(body: T): Promise<T>;
  GetById(id: string): Promise<T>;
  Get(param?: GetParameter<T>): Promise<T[]>;
  Update(entity: T): Promise<T>;
  Delete(entity: T): Promise<boolean>;
}

export interface GetParameter<T> {
  page?: number;
  limit?: number;
  where: Partial<T>;
}
