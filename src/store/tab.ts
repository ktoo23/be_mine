import { create } from 'zustand';

interface TabState {
  selectedTab: 'dog' | 'cat';
  setSelectedTab(selectedTab: 'dog' | 'cat'): void;
}

export const useFosterTabStore = create<TabState>((set) => ({
  selectedTab: 'dog',
  setSelectedTab(selectedTab) {
    set({ selectedTab });
  },
}));

export const useDiaryTabStore = create<TabState>((set) => ({
  selectedTab: 'dog',
  setSelectedTab(selectedTab) {
    set({ selectedTab });
  },
}));
