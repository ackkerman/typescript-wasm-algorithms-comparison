import { runSortingBenchmark } from './benchmarks/sortBenchmark';
import { runTreeBenchmark } from './benchmarks/treeBenchmark';
import { runGraphBenchmark } from './benchmarks/graphBenchmark';

(window as any).runSortingBenchmark = runSortingBenchmark;
(window as any).runTreeBenchmark = runTreeBenchmark;
(window as any).runGraphBenchmark = runGraphBenchmark;
