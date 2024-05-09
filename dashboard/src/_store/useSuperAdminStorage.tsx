import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ItemStorageProps {
  whichStorage: number;
  setStorage: (val: number) => void;
}

export const useItemStorage = create<ItemStorageProps>()(
  devtools(
    persist(
      (set) => ({
        whichStorage: 0,
        setStorage: (by) => set(() => ({ whichStorage: by })),
      }),
      { name: 'super-admin-storage', getStorage: () => localStorage }
    )
  )
);

export const updateStorageValue = (newValue: number) => {
  useItemStorage.getState().setStorage(newValue);
};

export const getStorageValue = () => {
  return useItemStorage.getState().whichStorage;
};
