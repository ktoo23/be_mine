import { Animal } from './Animal';

export interface FosterSummary {
  id: string;
  announcementNo: string;
  animal: Animal;
  imageUrl: string;
}
