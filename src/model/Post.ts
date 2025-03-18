import { User } from './User';

export interface Post {
  id: number;
  announcementNo: string;
  User: User;
  imageUrl: string;
}
