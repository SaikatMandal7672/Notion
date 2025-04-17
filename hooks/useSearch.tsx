import {create} from 'zustand';
type SeacrhStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useSearch = create<SeacrhStore>((set) => ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false}),
    toggle: () => set(({isOpen}) => ({isOpen:!isOpen})),
}))