import type { Item } from './Item';

export interface Folder {
  id: number;
  name: string;
  size: number;
  displayDate: Date;
  readonly folders: Folder[];
  readonly items: Item[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
