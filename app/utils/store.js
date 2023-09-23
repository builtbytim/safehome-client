import { create } from "zustand";

const useNotifyStore = create((set) => ({
  notifyState: {
    show: false,
    content: "Sup peope in the world!",
    title: "Hello!",
    working: false,
    onAccept: null,
    allowClose: true,
    onAcceptText: "Ok",
    onReject: null,
    onRejectText: "Close",
  },

  showNotify: () =>
    set((state) => ({
      notifyState: { ...state.notifyState, show: true },
    })),

  hideNotify: () =>
    set((state) => ({
      notifyState: { ...state.notifyState, show: false },
    })),

  setNotify: (obj) =>
    set((state) => ({
      notifyState: { allowClose: true, ...obj },
    })),
}));

const useUiStore = create((set) => ({
  showSidebar: false,
  showNotifications: false,

  toggleNotifications: () =>
    set((state) => ({ ...state, showNotifications: !state.showNotifications })),
  toggleSidebar: () =>
    set((state) => ({ ...state, showSidebar: !state.showSidebar })),
}));

export { useUiStore, useNotifyStore };
