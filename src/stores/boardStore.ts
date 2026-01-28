import { getDefaultBoard } from "@/assets/defaultData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { Board } from "@/types/board";

export const useBoardStore = defineStore("boardStore", {
  state: () => ({
    list: useStorage("my-board", getDefaultBoard(), localStorage, {
      mergeDefaults: true,
    }),
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
  // getters: {
  //   getListByName: (state) => {
  //     return (name) =>
  //       state.list.filter((contact) => {
  //         const regex = new RegExp(name.value, "i");
  //         return contact.name.match(regex);
  //       });
  //   },
  // },
  actions: {
    addBoard(board: Board) {
      this.list.push(board);
    },
    editBoard(updatedBoard: Board) {
      this.list = this.list.map((board: Board) => (board.id == updatedBoard.id ? updatedBoard : board));
    },
    deleteBoard(id: string) {
      this.list = this.list.filter((board: Board) => board.id !== id);
    },
  },
});