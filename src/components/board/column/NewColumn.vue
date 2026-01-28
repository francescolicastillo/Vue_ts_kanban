<template>
  <div class="new-board-column">
    <input class="input__new-list" type="text" v-model.trim="name" ref="newNameInput" placeholder="Name list">
    <div>
      <button class="btn__confirm-list" @click="addList">Create list</button>
      <button class="btn__cancel-list" @click="closeNewList">X</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useColumnStore } from '@/stores/columnStore';

const columnStore = useColumnStore();
const name = ref("");
const newNameInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  newNameInput.value?.focus();
})

const { boardId } = defineProps(["boardId"]);
const emit = defineEmits(["close-newColumn"]);

const addList = () => {
  columnStore.addColumn(boardId, name.value);
  closeNewList()
}

const closeNewList = () => {
  name.value = "";
  emit("close-newColumn");
}
</script>

<style scoped>
.new-board-column {
  width: 240px;
  max-height: 100px;
  margin-inline: 10px;
  border-radius: 15px;
  padding: 10px 10px;
  background: #cdcecf;
}

.input__new-list {
  font-size: 1.4rem;
  margin-block: 10px;
  width: 240px;
  border: none;
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