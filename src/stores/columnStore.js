import { getDefaultList } from "@/assets/defaultData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useColumnStore = defineStore("columnStore", {
  state: () => ({
    list: useStorage("my-columnKanban", getDefaultList(), localStorage, {
      mergeDefaults: true,
    }),
    filter: [],
  }),
  getters: {
    getListByOwner: (state) => {
      return (boardId) =>
        state.list.filter((column) => column.owner == boardId);
    },
  },
  actions: {
    addColumn(boardId, name) {
      const newList = {
        id: uuidv4(),
        owner: boardId,
        name: name,
      };
      this.list.push(newList);
    },
    editNameColumn(item) {
      this.list = this.list.map((column) =>
        column.id == item.id ? item : column
      );
    },
    moveColumn(item, directionLeft) {
      if (directionLeft) {
        this.list.reverse();
      }
      const index = this.list.findIndex((column) => column.id == item.id);
      const listSlice = this.list.slice(index + 1);
      const tempElem = listSlice.find((column) => column.owner == item.owner);
      if (directionLeft) {
        this.list.reverse();
      }
      this.list = this.list.map((column) => {
        if (column.id == item.id) return tempElem;
        else if (column.id == tempElem.id) return item;
        else return column;
      });
    },
    deleteColumn(id) {
      this.list = this.list.filter((column) => column.id != id);
    },
    deleteAllColumninBoard(ownerId) {
      this.list = this.list.filter((column) => column.owner != ownerId);
    },
  },
});