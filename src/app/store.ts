import { create } from "zustand";
import { devtools } from "zustand/middleware";
import menuSlice, { IMenuStore } from "@/app/slice/menu-slice";

const useStore = create<IMenuStore>()(
  devtools(
    (...a) => ({
      ...menuSlice(...a),
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
