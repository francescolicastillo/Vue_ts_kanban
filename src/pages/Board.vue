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
    <div class="container-newList-AI">
      <button 
        class="btn__new-column" 
        v-if="!newList"
        @click="toggleNewList"
      >Add new list</button>
      <button 
        class="btn__new-column" 
        @click="showAI = !showAI"
      >Use AI to create tasks</button>
    </div>
  </div>

  <AiAssistant
    v-if="showAI" 
    :boardId="boardId"
    @close-AiAssistant="showAI = !showAI"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useColumnStore } from '@/stores/columnStore';
import ColumnCard from '@/components/board/column/ColumnCard.vue';
import NewColumn from '@/components/board/column/NewColumn.vue';
import AiAssistant from '@/components/board/aiassistent/AiAssistent.vue';

const route = useRoute();
const boardId = route.params.id as string;
const columnStore = useColumnStore();

const dragColumn = ref();
const dropColumn = ref();
const newList = ref(false);
const showAI = ref(false);

const drapping = (e: string) => {
  dragColumn.value = e;
}

const dropped = (e: string) => {
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

.container-newList-AI {
  display: grid;
  row-gap: 50px;
  align-content: start;
}
</style>