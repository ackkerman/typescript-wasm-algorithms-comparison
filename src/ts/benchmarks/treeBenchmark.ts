import { AVLTree } from '../algorithms/avlTree';
import { WasmAVLTree } from '../wasmWrapper';

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

export async function runTreeBenchmark(size: number): Promise<BenchmarkResult> {
  const generateRandomNumbers = (n: number): Int32Array => {
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = Math.floor(Math.random() * 1_000_000);
    }
    return arr;
  };

  const numbers = generateRandomNumbers(size);
  const searchNumbers = generateRandomNumbers(1000);

  // --- TypeScript ベンチマーク ---
  const tsBefore = performance.now();
  const tsMemoryBefore = (performance as any).memory?.usedJSHeapSize || 0;

  const tsTree = new AVLTree();
  numbers.forEach(n => tsTree.insert(n));
  searchNumbers.forEach(n => tsTree.search(n));

  const tsAfter = performance.now();
  const tsMemoryAfter = (performance as any).memory?.usedJSHeapSize || 0;

  const tsTime = tsAfter - tsBefore;
  const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB

  // --- Wasm ベンチマーク ---
  const wasmBefore = performance.now();
  const wasmMemoryBefore = (performance as any).memory?.usedJSHeapSize || 0;

  const wasmTree = await WasmAVLTree.create();
  wasmTree.insertMany(numbers);
  wasmTree.searchMany(searchNumbers);

  const wasmAfter = performance.now();
  const wasmMemoryAfter = (performance as any).memory?.usedJSHeapSize || 0;

  const wasmTime = wasmAfter - wasmBefore;
  const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB

  // メモリ解放
  wasmTree.cleanup();

  return {
    typescript: {
      time: tsTime,
      memory: tsMemory,
    },
    wasm: {
      time: wasmTime,
      memory: wasmMemory,
    },
  };
}
