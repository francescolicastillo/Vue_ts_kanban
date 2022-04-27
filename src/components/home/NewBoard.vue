<template>
  <div class="new-boarg__background">
    <div class="newBoard">
      <p class="input__name-title">Board name:</p>
      <input class="input-board-name" type="text" id="name" v-model.trim="boardName" ref="autofocus">
      <!-- <input class="checkbox" type="checkbox" id="template" name="template" v-model="template">
      <label class="checkbox__title" for="template">Default template</label> -->
      <div class="btn-container">
        <button class="btn__style btn-delete" @click="closeComponent">Cancel</button>
        <button class="btn__style btn-create" @click="saveBoard">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { useBoardStore } from '@/stores/boardStore';
import { onMounted, ref } from 'vue';

const boards = useBoardStore();
const boardName = ref("");
const autofocus = ref(null);

onMounted(() => {
  autofocus.value.focus();
});

const emit = defineEmits(["close-newBoard"]);

const saveBoard = () => {
  const newBoard = {
    id: uuidv4(),
    name: boardName.value,
    bgColor: "white",
  }
  boards.addBoard(newBoard);
  closeComponent();
}

function closeComponent() {
  boardName.value = ""
  emit("close-newBoard");
}
</script>

<style scoped>
.new-boarg__background {
  background: rgba(0, 0, 0, 0.603);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.newBoard {
  background: rgb(252, 252, 238);
  width:350px;
  height:300px;
  margin:auto;
  position: absolute;
  top:0;
  bottom: 50px;
  left:0;
  right:0;
  max-width:100%;
  max-height:100%;
  padding: 10px 40px;
  border-radius: 10px;
  align-content: center;
  z-index: 100;
}

.input__name-title {
  padding: 0;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.7rem;
}

.input-board-name {
  display: block;
  margin-bottom: 30px;
  width: 70%;
  font-size: 1.5rem;
}

.checkbox {
  margin-left: 10px;
}

.checkbox__title {
  font-size: 1.2rem;
}

.btn-container {
  text-align: center;
}

.btn__style {
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
  margin-inline: 15px;
}

.btn__style:hover {
  opacity: 1;
}

.btn-delete {
  background-color: #db1212;
}

.btn-create {
  background-color: #12db22;
}

</style>