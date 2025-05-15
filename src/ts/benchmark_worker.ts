import { runSortingBenchmark } from './benchmarks/sortBenchmark';
import { runTreeBenchmark } from './benchmarks/treeBenchmark';
import { runGraphBenchmark } from './benchmarks/graphBenchmark';

const benchmarkMap: Record<string, (size: number) => Promise<any>> = {
  sorting: runSortingBenchmark,
  avltree: runTreeBenchmark,
  graph: runGraphBenchmark
};

// Web Worker message handler
self.onmessage = async (e: MessageEvent<{ mode: string; size: number }>) => {
  const { mode, size } = e.data;

  const benchmarkFn = benchmarkMap[mode];
  if (!benchmarkFn) {
    self.postMessage({ error: `No such benchmark function for mode: ${mode}` });
    return;
  }

  try {
    const result = await benchmarkFn(size);
    self.postMessage({ result });
  } catch (err: any) {
    self.postMessage({ error: `Benchmark failed: ${err.message}` });
  }
};
