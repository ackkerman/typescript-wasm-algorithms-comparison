import { Graph } from '../algorithms/graph';
import { WasmGraph } from '../wasmWrapper';

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

export async function runGraphBenchmark(nodeCount: number): Promise<BenchmarkResult> {
  const EDGE_PER_NODE = 5;

  // 共通のランダムグラフを構築（型: [from, to, weight, ...]）
  const flatEdges: number[] = [];
  const graphTS = new Graph(nodeCount);

  for (let from = 0; from < nodeCount; from++) {
    for (let j = 0; j < EDGE_PER_NODE; j++) {
      const to = Math.floor(Math.random() * nodeCount);
      if (from === to) continue;
      const weight = Math.floor(Math.random() * 100) + 1;
      flatEdges.push(from, to, weight);
      graphTS.addEdge(from, to, weight);
    }
  }

  // TypeScript 実装の測定
  const tsMemBefore = (performance as any).memory?.usedJSHeapSize || 0;
  const tsStart = performance.now();
  graphTS.dijkstra(0);
  const tsEnd = performance.now();
  const tsMemAfter = (performance as any).memory?.usedJSHeapSize || 0;

  const tsTime = tsEnd - tsStart;
  const tsMemory = (tsMemAfter - tsMemBefore) / (1024 * 1024); // MB

  // Wasm 実装の測定
  const wasmMemBefore = (performance as any).memory?.usedJSHeapSize || 0;
  const wasmStart = performance.now();

  const wasmGraph = await WasmGraph.create(nodeCount);
  wasmGraph.addEdges(flatEdges);
  wasmGraph.dijkstra(0);

  const wasmEnd = performance.now();
  const wasmMemAfter = (performance as any).memory?.usedJSHeapSize || 0;

  const wasmTime = wasmEnd - wasmStart;
  const wasmMemory = (wasmMemAfter - wasmMemBefore) / (1024 * 1024); // MB

  wasmGraph.cleanup?.();

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
