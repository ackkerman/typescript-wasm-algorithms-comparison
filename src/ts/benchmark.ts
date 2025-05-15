import { BenchRequest, BenchResult, Mode } from './types';

import { runSortingBenchmark } from './benchmarks/sortBenchmark';
import { runTreeBenchmark } from './benchmarks/treeBenchmark';
import { runGraphBenchmark } from './benchmarks/graphBenchmark';

(globalThis as any).runSortingBenchmark = runSortingBenchmark;
(globalThis as any).runTreeBenchmark = runTreeBenchmark;
(globalThis as any).runGraphBenchmark = runGraphBenchmark;


const benchWorker = new Worker(new URL('./benchmark_worker.ts', import.meta.url), { type: 'module' });

function runBenchmarkWithWorker(mode:Mode, size: number): Promise<BenchResult> {
  return new Promise((resolve, reject) => {
    benchWorker.onmessage = (e) => {
      if (e.data.error) {
        reject(new Error(e.data.error));
      } else {
        resolve(e.data.result);
      }
    };
    benchWorker.postMessage({ mode, size });
  });
};

(window as any).runBenchmarkWithWorker = runBenchmarkWithWorker;