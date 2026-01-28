<template>
 <section v-if="textAreaRequest" >
    <div class="container-plan">
      <div class="newBoard">
        <p class="input__name-title">Introduce new task or project, AI will generate a plan for you.</p>
        <textarea name="" id="" cols="44" rows="10" ref="newAITask"></textarea>
        <div class="btn-container">
          <button class="btn__style btn-submit" @click="get_ai">Submit</button>
          <button class="btn__style btn-delete" @click="closeComponent">Cancel</button>
        </div>
      </div>
    </div>
 </section>
 <section v-else>
    <div class="container-plan">
      <div class="newBoard">
        <p class="input__name-title">AI Generated Plan:</p>
        <ul class="board-list">
            <li v-for="step in responseAI" :key="step">
              <p>{{ step }}</p>
            </li>
        </ul>
        <div class="btn-container">
          <button class="btn__style btn-submit" @click="tryAgain">Try again!</button>
          <button class="btn__style btn-create" @click="savePlan" v-if="valudResponse">Accept</button>
          <button class="btn__style btn-delete" @click="closeComponent">Cancel</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Groq from "groq-sdk";
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useColumnStore } from '@/stores/columnStore';
import { useTaskStore } from '@/stores/taskStore.js';

const columnStore = useColumnStore();
const taskStore = useTaskStore();

const {boardId} = defineProps(["boardId"]);
const emit = defineEmits(["close-AiAssistant"]);
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });
const newAITask = ref<HTMLInputElement | null>(null);
const textAreaRequest = ref(true);
const responseAI = ref<string[]>([]);
const valudResponse = ref(false);

async function get_ai() {
  const chatCompletion = await getGroqChatCompletion();
  const res = chatCompletion.choices[0]?.message?.content || "Something went wrong. Please try again.";
  if (!res.includes("Steps")) {
    responseAI.value = ["Something went wrong. Please try again."];
    textAreaRequest.value = false;
    return;
  }
  responseAI.value = JSON.parse(res).Steps;
  textAreaRequest.value = false;
  valudResponse.value = true;
}

 async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Please generate a simple plan step by step (simple steps) for: ${newAITask.value?.value}. Please only keep the Steps, remove any other text.
        And it is very important the response should be in JSON format like this:
        {
          "Steps": [
            "step",
            "step",
          ]
        }`,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

function tryAgain() {
  textAreaRequest.value = true;
  responseAI.value = [];
}

function savePlan() {
  const columns = columnStore.getListByOwner(boardId);
  if (columns.length === 0) {
    columnStore.addColumn(boardId, "Backlog");
    const newColumnId = columnStore.getListByOwner(boardId)[0]!.id;
    responseAI.value.forEach(step => addTask(step, newColumnId));
  } else {
    const columnId = columns[0]!.id;
    responseAI.value.forEach(step => addTask(step, columnId));
  }
  closeComponent();
}

function addTask(step: string, columnId: string) {
  const newTask = {
    id: uuidv4(),
    status: 2,
    owner: columnId,
    title: step,
  };
  taskStore.addTask(newTask);
}

function closeComponent() {
  newAITask.value = null;
  emit("close-AiAssistant");
}
</script>

<style scoped>
textarea {
  resize: none;
}

.container-plan {
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
  height:fit-content;
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
  font-size: 1rem;
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
  padding: 16px 16px;
  text-align: center;
  font-size: 16px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  margin: auto;
  border-radius: 15px;
  margin-top: 10px;
  margin-inline: 8px;
}

.btn__style:hover {
  opacity: 1;
}

.btn-submit {
  background-color: #9cdcde;
}

.btn-delete {
  background-color: #db1212;
}

.btn-create {
  background-color: #12db22;
}

</style>