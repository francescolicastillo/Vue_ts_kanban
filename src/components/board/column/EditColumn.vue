<template>
  <div class="edit-board-column">
    <input class="input__edit-list" type="text" v-model.trim="name" ref="newNameInput" placeholder="New name list">
    <div>
      <button class="btn__confirm-list" @click="saveList">Save changes</button>
      <button class="btn__cancel-list" @click="closeEditList">X</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useColumnStore } from '@/stores/columnStore';

const { column } = defineProps(["column"]);
const emit = defineEmits(["close-editColumn"]);

const columnStore = useColumnStore();
const name = ref(column.name);
const newNameInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  newNameInput.value?.focus();
})

const saveList = () => {
  column.name = name.value;
  columnStore.editNameColumn(column);
  closeEditList()
}

const closeEditList = () => {
  name.value = "";
  emit("close-editColumn");
}
</script>

<style scoped>
.edit-board-column {
  width: 100%;
  max-height: 100px;
  border-radius: 15px;
  background: #cdcecf;
}

.input__edit-list {
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