import { Animal } from './Animal';

export interface FosterSummary {
  id: number;
  announcementNo: string;
  animal: Animal;
  imageUrl: string;
}
