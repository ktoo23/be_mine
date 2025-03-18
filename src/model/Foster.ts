import { Animal } from './Animal';
import { BehaviorInformation } from './BehaviorInformation';
import { DetailedInformation } from './DetailedInformation';
import { FosterCondition } from './FosterCondition';
import { HealthInformation } from './HealthInformation';
import { Image } from './Image';
import { User } from './User';

export interface Foster {
  id: number;
  announcementNo: string;
  User: User;
  Images: Image[];
  Animal: Animal;
  Detail: DetailedInformation;
  FosterCondition: FosterCondition;
  Health: HealthInformation;
  Behavior: BehaviorInformation;
  createdAt: Date;
}
