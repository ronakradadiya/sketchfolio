import { MENU_ITEMS } from "@/app/constants";
import { StateCreator } from "zustand";

export interface IMenuStore {
  activeMenuItem: keyof typeof MENU_ITEMS;
  menuItemClick: (payload: IMenuStore["activeMenuItem"]) => void;
  actionMenuItem: keyof typeof MENU_ITEMS | null;
  actionItemClick: (payload: IMenuStore["actionMenuItem"]) => void;
}

const initialState: Pick<IMenuStore, "activeMenuItem" | "actionMenuItem"> = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
};

const menuSlice: StateCreator<IMenuStore> = (set) => ({
  ...initialState,
  menuItemClick: (payload: keyof typeof MENU_ITEMS) =>
    set(() => ({
      activeMenuItem: payload,
    })),
  actionItemClick: (payload: keyof typeof MENU_ITEMS | null) => {
    set(() => ({
      actionMenuItem: payload,
    }));
  },
});

export default menuSlice;
