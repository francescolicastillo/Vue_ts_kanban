<template>
  <div class="kanbanBoard" >
    <div v-for="column in columnStore.getListByOwner(boardId)" :key="column.id" @change="drapping(column.id)" @drop="dropped(column.id)">
      <ColumnCard
        :column="column" 
        :dragColumn="dragColumn" 
        :dropColumn="dropColumn" 
      />
    </div>
    <NewColumn 
      v-if="newList"
      :boardId="boardId"
      @close-newColumn="newList = !newList"
    />
    <button 
      class="btn__new-column" 
      v-else 
      @click="toggleNewList"
    >Add new list</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useColumnStore } from '@/stores/columnStore';
import ColumnCard from '@/components/board/ColumnCard.vue';
import NewColumn from '@/components/board/NewColumn.vue';

const route = useRoute();
const boardId = route.params.id;
const columnStore = useColumnStore();

const dragColumn = ref();
const dropColumn = ref();
const newList = ref(false);

const drapping = (e) => {
  dragColumn.value = e;
}

const dropped = (e) => {
  dropColumn.value = e;
}

function toggleNewList() {
  newList.value = !newList.value;
};
</script>

<style scoped>
.kanbanBoard {
  display: flex;
  margin-top: 50px;
  margin-inline: 30px ;
}

.btn__new-column {
  height: 70px;
  min-width: 200px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  background: #9cdcde;
}

.btn__new-column:hover {
  background: #74c4c7;

}
</style>