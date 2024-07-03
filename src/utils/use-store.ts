import { create } from "zustand";
import { EMPTYSTRING, STORE } from "./constant";
import { TDatabaseStore, TLoginStore, TSignupFormData } from "../types";
import { persist } from "zustand/middleware";
import users from "../../users.json";

export const useDatabaseStore = create<TDatabaseStore>()(
  persist(
    (set) => ({
      entries: users,
      addEntry: (newEntry) =>
        set((state) => ({ entries: [...state.entries, newEntry] })),
      addItemToCart: (username, id) => {
        set((state) => {
          const entry = state.entries.find(
            (entry) => entry.username === username
          ) as TSignupFormData;

          const newCart = [...entry.cart, id];
          entry.cart = newCart;

          return { entries: state.entries };
        });
      },
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
