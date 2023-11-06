import { EPriority } from "../interfaces/priority";

export const getPrioritytext = (priority: EPriority) => {
  return priority === EPriority.High
    ? "Высокий"
    : priority === EPriority.Medium
    ? "Средний"
    : "Низкий";
};
