import { create } from "zustand";
import { EMPTYSTRING, STORE } from "./constant";
import { TDatabaseStore, TLoginStore } from "../types";
import { persist } from "zustand/middleware";

const user = {
  username: "rishabh",
  email: "e@g.com",
  password:
    "05f70341078acf6a06d423d21720f9643d5f953626d88a02636dc3a9e79582aeb0c820857fd3f8dc502aa8360d2c8fa97a985fda5b629b809cad18ffb62d3899", // eslint-disable-line max-len
  number: "1234567890",
  nationality: "indian",
};

export const useDatabaseStore = create<TDatabaseStore>()(
  persist(
    (set) => ({
      entries: [user],
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
