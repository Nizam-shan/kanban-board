import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const getTask = () => api.get("/all_task");
export const createTask = (data) => api.post("/add_task", data);

export const deleteTaskById = (id) => api.delete(`/delete_task/${id}`);
export const updateTaskStatus = (taskId, status) =>
  axios.put(`http://localhost:5000/update_task_status/${taskId}`, { status });
