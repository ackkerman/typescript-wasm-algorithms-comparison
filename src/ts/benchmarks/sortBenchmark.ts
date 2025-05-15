import { quickSort } from '../algorithms/quickSort';
import { wasmQuickSort } from '../wasmWrapper';

interface BenchmarkResult {
  typescript: {
    time: number;
    memory: number;
  };
  wasm: {
    time: number;
    memory: number;
  };
}

export async function runSortingBenchmark(size: number): Promise<BenchmarkResult> {
  // ランダムな配列を生成
  const generateRandomArray = (n: number): number[] => {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * 1000000));
    }
    return arr;
  };
  
  // TypeScript実装のベンチマーク
  const tsArray = generateRandomArray(size);
  const tsBefore = performance.now();
  const tsMemoryBefore = (performance as any).memory?.usedJSHeapSize || 0;
  
  quickSort([...tsArray]);
  
  const tsAfter = performance.now();
  const tsMemoryAfter = (performance as any).memory?.usedJSHeapSize || 0;
  
  const tsTime = tsAfter - tsBefore;
  const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB単位
  
  // Wasm実装のベンチマーク
  const wasmArray = generateRandomArray(size);
  const wasmBefore = performance.now();
  const wasmMemoryBefore = (performance as any).memory?.usedJSHeapSize || 0;
  
  await wasmQuickSort([...wasmArray]);
  
  const wasmAfter = performance.now();
  const wasmMemoryAfter = (performance as any).memory?.usedJSHeapSize || 0;
  
  const wasmTime = wasmAfter - wasmBefore;
  const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB単位

  tsArray.length = 0;
  wasmArray.length = 0;
  
  return {
    typescript: {
      time: tsTime,
      memory: tsMemory
    },
    wasm: {
      time: wasmTime,
      memory: wasmMemory
    }
  };
}