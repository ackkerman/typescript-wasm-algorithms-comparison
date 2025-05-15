import type { BenchRequest, BenchResult, Mode } from './types';
import { runSortingBenchmark } from './benchmarks/sortBenchmark';
import { runTreeBenchmark } from './benchmarks/treeBenchmark';
import { runGraphBenchmark } from './benchmarks/graphBenchmark';

// Web Worker message handler
self.onmessage = async (event: MessageEvent<BenchRequest>) => {
  const { mode, size } = event.data;

  let result;

  const measure = async (fn: () => Promise<BenchResult>) => {
    const start = performance.now();
    const res = await fn();
    const end = performance.now();
    console.log(`Worker benchmark for "${mode}" size=${size} took ${(end - start).toFixed(2)} ms`);
    return res;
  };

  try {
    if (mode === 'sort') {
      result = await measure(async () => {
        const benchmarkResult = await runSortingBenchmark(size);
        return { mode, size, ...benchmarkResult };
      });
    } else if (mode === 'tree') {
      result = await measure(async () => {
        const benchmarkResult = await runTreeBenchmark(size);
        return { mode, size, ...benchmarkResult };
      });
    } else if (mode === 'graph') {
      result = await measure(async () => {
        const benchmarkResult = await runGraphBenchmark(size);
        return { mode, size, ...benchmarkResult };
      });
    } else {
      throw new Error(`Unknown mode: ${mode}`);
    }

    self.postMessage(result);
  } catch (err) {
    self.postMessage({
      error: `Benchmark failed: ${(err as Error).message}`,
      mode,
      size
    });
  }
};
