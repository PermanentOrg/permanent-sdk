export interface Archive {
  id: number;
  slug: string;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
