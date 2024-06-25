import { create } from "zustand";
import { INITIALSIGNUPFORM, LOCALSTORAGE } from "./constant";
import { TFormStore } from "./types";
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

export default useFormStore;
