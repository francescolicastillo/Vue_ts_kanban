<template>
  <div class="main">
      <div class="boards">
        <p class="section-header-title">
          Personal Boards
        </p>
        <div class="dashboard-container">
          <ul class="board-list">
            <li v-for="board in boards.list" :key="board.id" class="board__container">
                <div class="board-title" @click="goToBoard(board)">{{ board.name }}</div>
                <div>
                  <button class="btn-board btn__edit-board" @click="editBoard(board)">Edit</button>
                  <button class="btn-board btn__delete-board" @click="deleteBoard(board.id)">Delete</button>
                </div>
            </li>
          </ul>
        </div>
          <button class="btn__new-board" @click="newDashboard">Create new board</button>
      </div>
    <NewBoard 
      v-if="newBoard" 
      @close-newBoard="newBoard = !newBoard"
    />
    <EditBoard 
      v-if="editBd" 
      :board="editBoardElement"
      @close-editBd="editBd = !editBd"
    />
  </div>
</template>

<script setup lang="ts">
import router from "@/router/routes";
import { ref } from "vue";
import { useBoardStore } from "@/stores/boardStore";
import { useColumnStore } from "@/stores/columnStore";
import { useTaskStore } from "@/stores/taskStore";
import NewBoard from "@/components/home/NewBoard.vue";
import EditBoard from "@/components/home/EditBoard.vue";

const boards = useBoardStore();
const columnStore = useColumnStore();
const taskStore = useTaskStore();
const newBoard = ref(false);
const editBd = ref(false);
const editBoardElement = ref(null);

const goToBoard = (item) => {
  router.push({ name: 'Board', params: { id: item.id } });
}

const newDashboard = () => {
  newBoard.value = true;
}

const editBoard = (board) => {
  editBoardElement.value = board;
  editBd.value = true;
};

const deleteBoard = (id) => {
  if (confirm(`Do you really want to delete? 
You will lose all your info in this board.`)) {
    const columns = columnStore.getListByOwner(id);
    columns.forEach((column) => taskStore.deleteAllTaskinColumn(column.id));
    columnStore.deleteAllColumninBoard(id);
    boards.deleteBoard(id);
  }
};
</script>

<style scoped>
.boards {
  margin: auto;
  margin-top: 40px;
  width: 100%;
  max-width: 1000px;
  min-width: 288px;
  display: grid;
}

.section-header-title {
  position: relative;
  display: inline-block;
  line-height: 24px;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 2rem;
  font-weight: 700;
  flex: 1;
  white-space: nowrap;
}

.add-new-board-link {
  margin-top:20px; 
  border-radius:5px;
}

.dashboard-container {
  display:flex;
  flex-wrap: wrap;
  place-self: center;
}
 
.board-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display:flex;
  flex-wrap: wrap;
}

.board__container {
  width: 200px;
  height: 150px;
  cursor: pointer;
  margin: 10px 20px;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 5px;
  background: rgba(168, 188, 143, 0.589);
}

.board__container:hover {
  background: rgb(143, 188, 143);
}

.board-title {
  height: 120px;
  width: 100%;
  text-align: center;
  align-content: center;
  font-size: 2rem;
}

.board-title:hover {
  font-size: 2.3rem;
}

.btn-board {
  width: 50%;
  height: 30px;
  border: none;
  cursor: pointer;
  opacity: 0.6;
}

.btn__edit-board {
  background: #36e4da;
}

.btn__delete-board {
  background: #f66767;
}

.btn-board:hover {
  opacity: 1;
}

.btn__new-board {
  background-color: #12db22;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  font-size: 20px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  margin: auto;
  border-radius: 15px;
  margin-top: 20px;
}

.btn__new-board:hover {
  opacity: 1;
}

</style>