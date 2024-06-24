import { create } from "zustand";
import { INITIALFORMDATA, LOCALSTORAGE } from "./constant";
import { TFormStore } from "./types";

const useFormStore = create<TFormStore>()((set) => ({
  formData: INITIALFORMDATA,
  updateForm: (values) =>
    set(() => {
      return { formData: values };
    }),

  resetForm: () => {
    set(() => {
      localStorage.setItem(
        LOCALSTORAGE.propName,
        JSON.stringify(INITIALFORMDATA)
      );
      return { formData: INITIALFORMDATA };
    });
  },
}));

export default useFormStore;
