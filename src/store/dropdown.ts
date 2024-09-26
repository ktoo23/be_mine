import { create } from 'zustand';

interface DropdownState {
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  isOpen: false,
  setOpen(isOpen) {
    set({ isOpen });
  },
}));
