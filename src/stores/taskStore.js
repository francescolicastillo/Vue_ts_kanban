import { getDefaultTasks } from "@/assets/defaultData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    list: useStorage("my-taskKanban", getDefaultTasks(), localStorage, {
      mergeDefaults: true,
    }),
    filter: [],
  }),
  getters: {
    getListByOwner: (state) => {
      return (columnId) => state.list.filter((item) => item.owner == columnId);
    },
  },
  actions: {
    addTask(item) {
      this.list.push(item);
    },
    editTask(updatedItem) {
      this.list = this.list.map((item) => item.id == updatedItem.id ? updatedItem : item);
    },
    deleteTask(taskId) {
      this.list = this.list.filter(item => item.id != taskId);
    },
    deleteAllTaskinColumn(ownerId) {
      this.list = this.list.filter((item) => item.owner != ownerId);
    }
  },
});