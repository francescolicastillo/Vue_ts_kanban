import { getDefaultTasks } from "@/assets/defaultData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { Task } from "@/types/task";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    list: useStorage("my-taskKanban", getDefaultTasks(), localStorage, {
      mergeDefaults: true,
    }),
    filter: [],
  }),
  getters: {
    getListByOwner: (state) => {
      return (columnId: string) => state.list.filter((item) => item.owner == columnId);
    },
  },
  actions: {
    addTask(task: Task) {
      this.list.push(task);
    },
    editTask(updatedTask: Task) {
      this.list = this.list.map((item) => item.id == updatedTask.id ? updatedTask : item);
    },
    deleteTask(taskId: string) {
      this.list = this.list.filter(item => item.id != taskId);
    },
    deleteAllTaskinColumn(ownerId: string) {
      this.list = this.list.filter((item) => item.owner != ownerId);
    }
  },
});