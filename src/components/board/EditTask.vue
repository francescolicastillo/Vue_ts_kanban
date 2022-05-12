<template>
  <div class="edit-board-column">
    <input class="input__edit-list" type="text" v-model.trim="name" ref="newNameInput" value="New list" placeholder="Task">
    <div>
      <button class="btn__confirm-list" @click="saveChanges">Save changes</button>
      <button class="btn__cancel-list" @click="closeEditTask">X</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const { task } = defineProps(["task"]);
const emit = defineEmits(["close-editTask"]);

const taskStore = useTaskStore();
const name = ref(task.title);
const newNameInput = ref(null);

onMounted(() => {
  newNameInput.value.focus();
})

const saveChanges = () => {
  task.title = name.value;
  taskStore.editTask(task);
  closeEditTask()
}

const closeEditTask = () => {
  name.value = "";
  emit("close-editTask");
}
</script>

<style scoped>
.edit-board-column {
  max-height: 100px;
  border-radius: 15px;
  background: white;
  margin-bottom: 10px;
  padding: 5px;
}

.input__edit-list {
  font-size: 1.4rem;
  margin-block: 10px;
  width: 230px;
}

.btn__confirm-list {
  width: 70%;
  height: 35px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background: #12db22;
  opacity: 0.6;
}

.btn__cancel-list {
  width: 30%;
  height: 35px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background: #db1212;
  opacity: 0.6;
}

.btn__confirm-list:hover {
  opacity: 1;
}

.btn__cancel-list:hover {
  opacity: 1;
}
</style>