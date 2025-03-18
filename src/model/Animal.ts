export interface Animal {
  id: number;
  species: 'dog' | 'cat';
  name: string;
  gender: '남' | '여';
  weight: string;
  rescueStory?: string;
  neutered: '완료' | '미완료';
  birth: string;
  rescueLocation: string;
  currentStatus: string;
  fosterType: string;
}
