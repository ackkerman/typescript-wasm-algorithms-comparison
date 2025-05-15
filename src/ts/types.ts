export type Mode = 'sort' | 'tree' | 'graph';

export interface BenchRequest {
  mode: Mode;
  size: number;
}

export interface BenchResult {
  mode: Mode;
  size: number;
  typescript: {
    time: number;
    memory: number;
  };
  wasm: {
    time: number;
    memory: number;
  };
}