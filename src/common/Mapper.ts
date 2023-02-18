export interface Mapper<Document, Entity> {
  fromEntity(value: Entity): Partial<Document>;
  toEntity(value: Document): Entity;
}
