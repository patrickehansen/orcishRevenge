export interface RollInput {
  count: number;
  size: number;
  post: string;
  operator: string;
  raw?: string;
}

export interface RollOutput {
  input: RollInput;
  dice: Array<number>;
  sum: number;
  post: string;
  total: number;
}