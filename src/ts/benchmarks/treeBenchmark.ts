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
  // ランダムな数値配列を生成
  const generateRandomNumbers = (n: number): number[] => {
    const numbers = [];
    for (let i = 0; i < n; i++) {
      numbers.push(Math.floor(Math.random() * 1000000));
    }
    return numbers;
  };
  
  const numbers = generateRandomNumbers(size);
  const searchNumbers = generateRandomNumbers(1000); // 検索用の数値
  
  // TypeScript実装のベンチマーク
  const tsBefore = performance.now();
  const tsMemoryBefore = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const tsTree = new AVLTree();
  
  // 挿入操作
  for (const num of numbers) {
    tsTree.insert(num);
  }
  
  // 検索操作
  for (const num of searchNumbers) {
    tsTree.search(num);
  }
  
  const tsAfter = performance.now();
  const tsMemoryAfter = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const tsTime = tsAfter - tsBefore;
  const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB単位
  
  // Wasm実装のベンチマーク
  const wasmBefore = performance.now();
  const wasmMemoryBefore = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const wasmTree = await WasmAVLTree.create();
  
  // 挿入操作
  for (const num of numbers) {
    wasmTree.insert(num);
  }
  
  // 検索操作
  for (const num of searchNumbers) {
    wasmTree.search(num);
  }
  
  const wasmAfter = performance.now();
  const wasmMemoryAfter = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const wasmTime = wasmAfter - wasmBefore;
  const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB単位
  
  // メモリ解放
  tsTree.cleanup();
  wasmTree.cleanup();

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