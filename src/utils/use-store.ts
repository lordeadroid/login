import { create } from "zustand";
import { EMPTYSTRING, STORE } from "./constant";
import { TDatabaseStore, TLoginStore } from "../types";
import { persist } from "zustand/middleware";
import users from "../../users.json";

export const useDatabaseStore = create<TDatabaseStore>()(
  persist(
    (set) => ({
      entries: users,
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
      updateUsername: (username) => set({ username }),
      resetUsername: () => set({ username: EMPTYSTRING }),
    }),
    { name: STORE.login }
  )
);
