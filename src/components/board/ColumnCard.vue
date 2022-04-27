<template >
  <div class="board-column">
    <div v-show="headerColumn" style="display: flex;">
      <h3 class="column-title">{{ column.name }} </h3>
      <section class="dropDownMenuWrapper">
        <button class="dropDownMenuButton" ref="menu" @click="openClose"></button>
        <div class="iconWrapper">
          <div class="bar1" :class="{ 'bar1--open' : isOpen }" />
          <div class="bar2" :class="{ 'bar2--open' : isOpen }" />
          <div class="bar3" :class="{ 'bar3--open' : isOpen }" />
        </div>
        <section class="dropdownMenu" v-if="isOpen" >
          <div class="menuArrow" />
          <section class="option">
            <button class="option-btn" @click="changeName">Rename</button>
          </section>
          <section class="option">
            <button class="option-btn" @click="moveLeft">Move left</button>
          </section>
          <section class="option">
            <button class="option-btn" @click="moveRight">Move right</button>
          </section>
          <section class="option">
            <button class="option-btn" @click="deleteColumn">Delete</button>
          </section>
        </section>
      </section>
    </div>
    <EditColumn v-if="!headerColumn" :column="column" @close-editColumn="headerColumn = true" />
    <draggableComponent 
      class="column-tasks"
      :list="taskStore.getListByOwner(column.id)" 
      group="board" 
      @change="drag"
      item-key="id"
    >
      <template #item="{ element }" >
        <div>
          <TaskCard :task="element" />
        </div>
      </template>
    </draggableComponent>
    <button class="btn__create-card" v-if="!showNewTaskCard" @click="toggleNewTask">Add a card</button>
    <div class="new-task" v-else>
      <input class="input__new-task" type="text" v-model.trim="cardTitle" placeholder="New task">
      <div>
        <button class="btn__confirm-list" @click="addCard">Add card</button>
        <button class="btn__cancel-list" @click="toggleNewTask">X</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import draggableComponent from 'vuedraggable';
import { useTaskStore } from '@/stores/taskStore.js';
import { useColumnStore } from '@/stores/columnStore.js';
import EditColumn from './EditColumn.vue';
import TaskCard from './TaskCard.vue';

const columnStore = useColumnStore();
const taskStore = useTaskStore();

const showNewTaskCard = ref(false);
const cardTitle = ref("");
const isOpen = ref(false);
const headerColumn = ref(true);

const {column, dragColumn, dropColumn} = defineProps(["column", "dragColumn", "dropColumn"]);

function openClose() {
  isOpen.value = !isOpen.value;
};

function drag(evt) {
  if (dragColumn && dropColumn) {
    if (evt.added) {
      const updatedItem = {
        id: evt.added.element.id,
        status: evt.added.element.status,
        owner: dropColumn,
        title: evt.added.element.title,
      }
      taskStore.deleteTask(evt.added.element.id);
      taskStore.addTask(updatedItem);
    }
  }
}

function addCard() {
  const newTask = {
    id: uuidv4(),
    status: 2,
    owner: column.id,
    title: cardTitle.value,
  };
  taskStore.addTask(newTask);
  toggleNewTask();
}

function toggleNewTask() {
  cardTitle.value = "";
  showNewTaskCard.value = !showNewTaskCard.value;
}

function changeName() {
  headerColumn.value = !headerColumn.value;
  openClose();
}

function moveLeft() {
  if (columnStore.getListByOwner(column.owner).length > 1) {
    columnStore.moveColumn(column, true);
  }
  openClose();
}

function moveRight() {
  if (columnStore.getListByOwner(column.owner).length > 1) {
    columnStore.moveColumn(column, false);
  }
  openClose();
}

function deleteColumn() {
  if (confirm(`Do you really want to delete?`)) {
    taskStore.deleteAllTaskinColumn(column.id);
    columnStore.deleteColumn(column.id);
  }
}

</script>

<style scoped>
.board-column {
  width: 250px;
  margin-inline: 10px;
  border-radius: 15px;
  padding: 10px 10px;
  background: #cdcecf;
}

.column-title{
  width: 190px;
  text-transform: capitalize;
  padding-inline: 10px;
}

.column-tasks {
  min-height: 5vh;
}

.dropDownMenuWrapper {
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  box-shadow: 10px 10px 0 0 rgba(black,.03);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.dropDownMenuButton {
  border: none;
  position: absolute;
  line-height: 1;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
  background: none;
}

.iconWrapper {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  z-index: 1;
  padding-left: 10px;
}

.bar1 {
  width: 100%;
  max-width: 28px;
  height: 3px;
  background: black;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  transform: translate(-50%, calc(-50% - 8px) );
  transition: all 0.2s ease;
}

.bar1--open {
  transform: translate(-50%, -50%) rotate(45deg);
  margin-top: 0;
  background: red;
}

.bar2 {
  width: 100%;
  max-width: 28px;
  height: 3px;
  background: black;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  opacity: 1;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}

.bar2--open {
  opacity: 0;
}

.bar3 {
  width: 100%;
  max-width: 28px;
  height: 3px;
  background: black;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  transform: translate(-50%, calc(-50% + 8px) );
  transition: all 0.2s ease;
}

.bar3--open {
  top: 50%;
  transform: translate(-50%, -50% ) rotate(-45deg);
  background: red;
}

.dropdownMenu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  min-width: 150px;
  min-height: 10px;
  border-radius: 8px;
  box-shadow: 10px 10px 0 0 rgba(black,.03);
  background: rgb(192, 191, 191);
  animation: menu 0.3s ease forwards;
  z-index: 1;
}

.option {
  width: 100%;
  padding: 3px 0;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.option-btn {
  border: none;
  cursor: pointer;
  background: none;
  width: 100%;
  padding: 5px;
}

.option-btn:hover {
  width: 100%;
  background: rgb(153, 150, 150);;
}
    
.btn__create-card {
  width: 50%;
  height: 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background: #12db22;
  opacity: 0.6;
}

.btn__create-card:hover {
  opacity: 1;
}

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