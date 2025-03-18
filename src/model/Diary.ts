import { Image } from './Image';
import { User } from './User';

export interface Diary {
  id: number;
  User: User;
  Image: Image;
  title: string;
  content: string;
  announcementNo: string;
  createdAt: Date;
}
