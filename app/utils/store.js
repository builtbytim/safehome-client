import { create } from "zustand";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

const useNotifyStore = create((set) => ({
  notifyState: {
    show: false,
    content: "Sup peope in the world!",
    title: "Hello!",
    working: false,
    onAccept: null,
    onAcceptText: "Ok",
    onReject: null,
    onRejectText: "Close",
  },

  showNotify: () =>
    set((state) => ({
      ...state.notifyState,
      show: true,
    })),

  hideNotify: () =>
    set((state) => ({
      ...state.notifyState,
      show: false,
    })),

  setNotify: (obj) =>
    set((state) => ({
      ...state.notifyState,
      ...obj,
    })),
}));

const useUiStore = create((set) => ({
  showSidebar: false,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
}));

export { useBearStore, useUiStore, useNotifyStore };
