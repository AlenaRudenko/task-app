import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import { createLogger } from "redux-logger";
import { user } from "./models/user.model";
import { tasks } from "./models/tasks.model";
import { view } from "./models/view.model";

export interface RootModel extends Models<RootModel> {
  user: typeof user;
  tasks: typeof tasks;
  view: typeof view;
}

const models: RootModel = { tasks, user, view };

const logger = createLogger();

export const store = init({
  models,
  redux: {
    middlewares: [logger],
  },
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
