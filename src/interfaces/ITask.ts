import { EPriority } from "./priority";
import { EStatus } from "./status";

export interface ITask {
  id: string;
  title: string;
  description: string;
  planDuration: number;
  actualDuration: number;
  startsAt: string;
  priority: EPriority;
  status: EStatus;
}
