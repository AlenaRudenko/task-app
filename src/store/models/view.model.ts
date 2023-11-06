import { createModel } from "@rematch/core";

export const view = createModel()({
  state: "short",
  reducers: {
    setView: (state, payload: string) => {
      return payload;
    },
  },
});
