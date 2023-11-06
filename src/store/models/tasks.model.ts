import { IUser } from "./../../interfaces/IUser";
import { ApiService } from "../../services/api.service";
import { RootModel } from "../store";
import { ITask } from "./../../interfaces/ITask";
import { createModel } from "@rematch/core";
import { EPriority } from "../../interfaces/priority";
import { EStatus } from "../../interfaces/status";

export const tasks = createModel<RootModel>()({
  state: {
    tasks: [] as ITask[],
    newTask: {
      id: Math.random().toString(),
      priority: EPriority.Low,
      status: EStatus.Plan,
      title: "",
      description: "",
      startsAt: "",
      planDuration: 0,
      actualDuration: 0,
    } as ITask,
    sort: "titleUp",
    filterPriority: 0,
    filterStatus: 0,
  },
  reducers: {
    setTasks: (state, payload: ITask[]) => {
      return {
        ...state,
        tasks: payload,
      };
    },
    sortBy: (state, payload) => {
      switch (payload) {
        case "titleUp": {
          return {
            ...state,
            sort: "titleUp",
            tasks: [...state.tasks].sort((a, b) =>
              a.title > b.title ? 1 : -1
            ),
          };
        }
        case "titleDown": {
          return {
            ...state,
            sort: "titleDown",
            tasks: [...state.tasks].sort((a, b) =>
              a.title > b.title ? -1 : 1
            ),
          };
        }
        case "statusUp": {
          return {
            ...state,
            sort: "statusUp",
            tasks: [...state.tasks].sort((a, b) =>
              a.status > b.status ? 1 : -1
            ),
          };
        }
        case "statusDown": {
          return {
            ...state,
            sort: "statusDown",
            tasks: [...state.tasks].sort((a, b) =>
              a.status > b.status ? -1 : 1
            ),
          };
        }
        case "priorityUp": {
          return {
            ...state,
            sort: "priorityUp",
            tasks: [...state.tasks].sort((a, b) =>
              a.priority > b.priority ? -1 : 1
            ),
          };
        }
        case "priorityDown": {
          return {
            ...state,
            sort: "priorityDown",
            tasks: [...state.tasks].sort((a, b) =>
              a.priority > b.priority ? 1 : -1
            ),
          };
        }
        default:
          return state;
      }
    },
    filterByPriority: (state, payload) => {
      return {
        ...state,
        filterPriority: payload,
      };
    },
    filterByStatus: (state, payload) => {
      return {
        ...state,
        filterStatus: payload,
      };
    },
    changeTask: (
      state,
      payload: { id: string } & Partial<
        Pick<ITask, "status" | "planDuration" | "actualDuration">
      >
    ) => {
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      };
    },
    setNewTask: (
      state,
      payload: Partial<
        Pick<
          ITask,
          | "status"
          | "planDuration"
          | "actualDuration"
          | "description"
          | "priority"
          | "title"
          | "startsAt"
        >
      >
    ) => {
      return {
        ...state,
        newTask: { ...state.newTask, ...payload },
      };
    },
    setTask: (state) => {
      return {
        ...state,
        tasks: [...state.tasks, state.newTask],
      };
    },
  },
  effects: (dispatch) => ({
    async tasks(userId: IUser["id"], rootState) {
      const response = await ApiService.getTasks(userId);
      const tasks = response.data;
      if (tasks) {
        dispatch.tasks.setTasks(tasks);
      }
      if (rootState.tasks.sort) {
        dispatch.tasks.sortBy(rootState.tasks.sort);
      }
    },
  }),
});
