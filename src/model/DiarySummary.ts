export interface DiarySummary {
  id: number;
  animal: {
    species: 'dog' | 'cat';
    name: string;
    gender: '남' | '여';
  };
  announcementNo: string;
  imageUrl: string;
}
