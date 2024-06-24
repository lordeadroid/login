import { create } from "zustand";
import { INITIALSIGNUPFORM, LOCALSTORAGE } from "./constant";
import { TFormStore } from "./types";

const useFormStore = create<TFormStore>()((set) => ({
  formData: INITIALSIGNUPFORM,
  status: false,
  updateStatus: () => set((state) => ({ status: !state.status })),
  updateForm: (values) =>
    set(() => {
      return { formData: values };
    }),
  resetForm: () =>
    set(() => {
      localStorage.removeItem(LOCALSTORAGE.propName);
      return { formData: INITIALSIGNUPFORM };
    }),
}));

export default useFormStore;
