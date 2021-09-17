/* eslint-disable @typescript-eslint/ban-types */

export interface CommitFunction {
  commit: Function;
}

export interface CommitStateFunction<TState> {
  commit: Function;
  state: TState;
}

export interface CommitDispatchFunction {
  commit: Function;
  dispatch: Function;
}

export interface CommitDispatchStateFunction<TState> extends CommitStateFunction<TState> {
  dispatch: Function;
}
