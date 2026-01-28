<template>
  <div class="new-task">
      <input class="input__new-task" type="text" v-model.trim="cardTitle" placeholder="New task" ref="autofocus">
      <div>
        <button class="btn__confirm-list" @click="addTask">Add card</button>
        <button class="btn__cancel-list" @click="closeComponent">X</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const autofocus = ref<HTMLInputElement | null>(null);
const cardTitle = ref("");

const emit = defineEmits(["close-newTask", "addTask"]);

onMounted(() => {
  autofocus.value?.focus();
  cardTitle.value = "";
});

function addTask() {
  emit("addTask", cardTitle.value);
  cardTitle.value = ""
}

function closeComponent() {
  cardTitle.value = ""
  emit("close-newTask");
}
</script>

<style>
  .new-task {
  width: 100%;
  max-height: 100px;
  border-radius: 15px;
  background: #cdcecf;
}
.input__new-task {
  font-size: 1.4rem;
  margin-block: 10px;
  width: 240px;
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