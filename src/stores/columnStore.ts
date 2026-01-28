import { getDefaultList } from "@/assets/defaultData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';
import type { Column } from "@/types/column";


export const useColumnStore = defineStore("columnStore", {
  state: () => ({
    list: useStorage("my-columnKanban", getDefaultList(), localStorage, {
      mergeDefaults: true,
    }),
    filter: [],
  }),
  getters: {
    getListByOwner: (state) => {
      return (boardId: string) =>
        state.list.filter((column) => column.owner == boardId);
    },
  },
  actions: {
    addColumn(boardId: string, name: string) {
      const newColumn = {
        id: uuidv4(),
        owner: boardId,
        name: name,
      };
      this.list.push(newColumn);
    },
    editNameColumn(updatedColumn: Column) {
      this.list = this.list.map((column) =>
        column.id == updatedColumn.id ? updatedColumn : column,
      );
    },
    moveColumn(item: Column, directionLeft: boolean) {
      if (directionLeft) {
        this.list.reverse();
      }
      const index = this.list.findIndex((column) => column.id == item.id);
      const listSlice = this.list.slice(index + 1);
      const tempElem = listSlice.find((column) => column.owner == item.owner);
      if (directionLeft) {
        this.list.reverse();
      }
      if (tempElem) {
        this.list = this.list.map((column) => {
          if (column.id === item.id) return tempElem;
          if (column.id === tempElem.id) return item;
          return column;
        });
      }
    },
    deleteColumn(id: string) {
      this.list = this.list.filter((column) => column.id != id);
    },
    deleteAllColumninBoard(ownerId: string) {
      this.list = this.list.filter((column) => column.owner != ownerId);
    },
  },
});