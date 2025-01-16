import axios from "axios";

const api = axios.create({
  baseURL: "https://kanban-board-bqwz.onrender.com/",
});

export const getTask = () => api.get("/all_task");
export const createTask = (data) => api.post("/add_task", data);

export const deleteTaskById = (id) => api.delete(`/delete_task/${id}`);
export const updateTaskStatus = (taskId, status) =>
  axios.put(
    `https://kanban-board-bqwz.onrender.com/update_task_status/${taskId}`,
    { status }
  );
