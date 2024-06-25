import { create } from "zustand";
import {
  EMPTYSTRING,
  INITIALSIGNUPFORM,
  LOCALSTORAGE,
  STORE,
} from "./constant";
import { TDatabaseStore, TFormStore, TLoginStore } from "./types";
import { persist } from "zustand/middleware";

const useFormStore = create<TFormStore>()(
  persist(
    (set) => ({
      formData: INITIALSIGNUPFORM,
      status: false,
      updateStatus: () => set((state) => ({ status: !state.status })),
      updateForm: (values) => set({ formData: { ...values } }),
      resetForm: () =>
        set(() => {
          localStorage.removeItem(LOCALSTORAGE.propName);
          return { formData: INITIALSIGNUPFORM };
        }),
    }),
    { name: "formStore" }
  )
);

export const useDatabaseStore = create<TDatabaseStore>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (newEntry) =>
        set((state) => ({ entries: [...state.entries, newEntry] })),
    }),
    { name: STORE.database }
  )
);

export const useLoginStore = create<TLoginStore>()(
  persist(
    (set) => ({
      username: EMPTYSTRING,
      updateStore: (username) => set({ username }),
      resetStore: () => set({ username: EMPTYSTRING }),
    }),
    { name: STORE.login }
  )
);

export default useFormStore;
