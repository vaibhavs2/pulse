export type ReturnData<T> =
  | {
      errorMessage: undefined;
      data: T;
    }
  | {
      errorMessage: string;
      data: undefined;
    };
