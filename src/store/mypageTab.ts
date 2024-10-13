import { create } from 'zustand';

interface TabState {
  tab: 'foster' | 'diary' | 'bookmark';
  setTab(tab: 'foster' | 'diary' | 'bookmark'): void;
  reset(): void;
}

export const useMypageTabStore = create<TabState>((set) => ({
  tab: 'foster',

  setTab(tab) {
    set({ tab });
  },

  reset() {
    set({
      tab: 'foster',
    });
  },
}));
