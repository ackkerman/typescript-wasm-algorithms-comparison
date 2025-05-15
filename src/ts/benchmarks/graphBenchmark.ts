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
  // 指定されたノード数でランダムなグラフを生成
  const generateRandomGraph = (nodes: number): { graph: Graph, edges: number } => {
    const graph = new Graph(nodes);
    let edgeCount = 0;
    
    // 各ノードから平均5つのエッジを追加
    const edgesPerNode = 5;
    for (let i = 0; i < nodes; i++) {
      for (let j = 0; j < edgesPerNode; j++) {
        const to = Math.floor(Math.random() * nodes);
        const weight = Math.floor(Math.random() * 100) + 1;
        
        if (i !== to) {
          graph.addEdge(i, to, weight);
          edgeCount++;
        }
      }
    }
    
    return { graph, edges: edgeCount };
  };
  
  // TypeScript実装のベンチマーク
  const tsBefore = performance.now();
  const tsMemoryBefore = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const { graph: tsGraph } = generateRandomGraph(nodeCount);
  const tsResult = tsGraph.dijkstra(0); // ノード0からの最短経路
  
  const tsAfter = performance.now();
  const tsMemoryAfter = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const tsTime = tsAfter - tsBefore;
  const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB単位
  
  // Wasm実装のベンチマーク
  const wasmBefore = performance.now();
  const wasmMemoryBefore = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const wasmGraph = await WasmGraph.create(nodeCount);
  
  // 同じグラフを再現するための乱数シードをリセット
  // 実際の実装では、同じエッジを追加するためのロジックが必要
  for (let i = 0; i < nodeCount; i++) {
    for (let j = 0; j < 5; j++) {
      const to = Math.floor(Math.random() * nodeCount);
      const weight = Math.floor(Math.random() * 100) + 1;
      
      if (i !== to) {
        wasmGraph.addEdge(i, to, weight);
      }
    }
  }
  
  const wasmResult = wasmGraph.dijkstra(0);
  
  const wasmAfter = performance.now();
  const wasmMemoryAfter = (window.performance as any).memory?.usedJSHeapSize || 0;
  
  const wasmTime = wasmAfter - wasmBefore;
  const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB単位
  
  // メモリを解放
  tsGraph?.cleanup?.();
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