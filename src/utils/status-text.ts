import { EStatus } from "../interfaces/status";

export const getStatusText = (status: EStatus) => {
  return status === EStatus.Done
    ? "Готово"
    : status === EStatus.Plan
    ? "План"
    : "В процессе";
};
