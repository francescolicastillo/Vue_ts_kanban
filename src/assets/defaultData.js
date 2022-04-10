const getDefaultBoard = () => [
  {
    id: 1,
    name: "Example",
    bgColor: "white",
  },
];

const getDefaultList = () => [
  {
    id: 1,
    owner: 1,
    name: "backlog",
  },
  {
    id: 2,
    owner: 1,
    name: "to do",
  },
  {
    id: 3,
    owner: 1,
    name: "in progress",
  },
  {
    id: 4,
    owner: 1,
    name: "done",
  },
];

const getDefaultTasks = () => [
  {
    id: 1,
    status: 2,
    owner: 2,
    title: "Change task's title",
  },
  {
    id: 2,
    status: 1,
    owner: 1,
    title: "Create new board",
  },
  {
    id: 3,
    status: 3,
    owner: 3,
    title: "Add new tasks",
  },
  {
    id: 4,
    status: 3,
    owner: 3,
    title: "Review code in GitHub and contact developer",
  },
];

export { getDefaultBoard, getDefaultList, getDefaultTasks };
