import { create } from "zustand";
import { devtools } from "zustand/middleware";
import menuSlice, { IMenuSlice } from "@/app/slice/menu-slice";
import toolboxSlice, { IToolboxSlice } from "@/app/slice/toolbox-slice";

const useStore = create<IMenuSlice & IToolboxSlice>()(
  devtools(
    (...a) => ({
      ...menuSlice(...a),
      ...toolboxSlice(...a),
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
