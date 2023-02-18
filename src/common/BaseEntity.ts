export class BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<BaseEntity>) {
    Object.assign(partial);
  }
}
