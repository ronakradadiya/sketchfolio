import { MENU_ITEMS } from "@/app/constants";
import { StateCreator } from "zustand";
import { IToolboxSlice } from "./toolbox-slice";

export interface IMenuSlice {
  activeMenuItem: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS];
  menuItemClick: (payload: IMenuSlice["activeMenuItem"]) => void;
  actionMenuItem: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS] | null;
  actionItemClick: (payload: IMenuSlice["actionMenuItem"]) => void;
}

const initialState: Pick<IMenuSlice, "activeMenuItem" | "actionMenuItem"> = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
};

const menuSlice: StateCreator<
  IMenuSlice & IToolboxSlice,
  [],
  [],
  IMenuSlice
> = (set) => ({
  ...initialState,
  menuItemClick: (payload: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS]) =>
    set(() => ({
      activeMenuItem: payload,
    })),
  actionItemClick: (
    payload: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS] | null
  ) => {
    set(() => ({
      actionMenuItem: payload,
    }));
  },
});

export default menuSlice;
