import { create } from "zustand";
import { INITIALFORMDATA } from "./constant";
import { TFormStore } from "./types";

const useFormStore = create<TFormStore>()((set) => ({
  formData: INITIALFORMDATA,
  status: false,
  updateStatus: () => set((state) => ({ status: !state.status })),
  updateForm: (values) =>
    set(() => {
      return { formData: values };
    }),
  resetForm: () =>
    set(() => {
      localStorage.clear();
      return { formData: INITIALFORMDATA };
    }),
}));

export default useFormStore;
