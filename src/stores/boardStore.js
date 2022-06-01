import { getDefaultBoard } from "@/assets/defaultData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useBoardStore = defineStore("boardStore", {
  state: () => ({
    list: useStorage("my-board", 
      getDefaultBoard(),
      localStorage,
      {
        mergeDefaults: true,
      },
    ),
    filter: [],
    modalNewBoard: false,
    modalEditBoard: {
      item: null,
      enable: false,
    },
    modalDeleteBoard: {
      item: null,
      enable: false,
    },
  }),
  getters: {
    getListByName: (state) => {
      return (name) =>
        state.list.filter((contact) => {
          const regex = new RegExp(name.value, "i");
          return contact.name.match(regex);
        });
    },
  },
  actions: {
    addBoard(board) {
      this.list.push(board);
    },
    editBoard(board) {
      this.list = this.list.map(item => item.id == board.id ? board : item);
    },
    deleteBoard(id) {
      this.list = this.list.filter((board) => board.id !== id);
    },
  },
});