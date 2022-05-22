<template>
  <div v-show="showTaskCard" class="task-container">
    <div style="text-align: right">
      <button class="btn__edit-task" @click="editTask">
        <icon-base width="12" height="12" icon-name="write"><icon-write /></icon-base>
      </button>
      <button class="btn__delete-task" @click="deleteTask">X</button>
    </div>
    {{ task.title }}
  </div>
  <EditTask 
    v-if="!showTaskCard" 
    :task="task" 
    @close-editTask="showTaskCard = true"
  />
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
import EditTask from './EditTask.vue';
import { ref } from 'vue';
import IconWrite from '@/icons/IconWrite.vue'
import IconBase from '@/icons/IconBase.vue';

const { task } = defineProps(["task"]);

const taskStore = useTaskStore();
const showTaskCard = ref(true);

function editTask() {
  showTaskCard.value = false;
}

function deleteTask() {
  taskStore.deleteTask(task.id);
}
</script>

<style scoped>

.task-container {
  background: white;
  border-radius: 10px;
  padding-inline: 15px;
  padding-bottom: 10px;
  margin-top: 15px;
  margin-bottom: 5px;
  cursor: pointer;
}

.btn__edit-task {
  background: #36e4da;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  padding-block: 3px;
  opacity: 0.6;
}

.btn__edit-task:hover {
  opacity: 1;
}

.btn__delete-task {
  background: red;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  padding-block: 3px;
  opacity: 0.6;
}

.btn__delete-task:hover {
  opacity: 1;
}

</style>