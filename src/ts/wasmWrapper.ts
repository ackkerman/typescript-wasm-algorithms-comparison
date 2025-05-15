// Wasm生成時に作成される型定義を使用（実際の型はwasm-pack buildで生成される）
import init, {
  quick_sort,
  AVLTree as RustAVLTree,
  Graph as RustGraph
} from '../../src/rust/pkg';

// モジュールの初期化状態
let wasmInitialized = false;
let initPromise: Promise<void> | null = null;

// Wasmモジュールの初期化
export async function initWasm(): Promise<void> {
  if (wasmInitialized) return;
  
  if (!initPromise) {
    initPromise = init().then(() => {
      wasmInitialized = true;
      console.log('WebAssembly module initialized');
    });
  }
  
  return initPromise;
}

// クイックソートのラッパー
export async function wasmQuickSort(arr: number[]): Promise<number[]> {
  await initWasm();
  return Array.from(quick_sort(new Int32Array(arr)));
}

// AVL木のラッパークラス
export class WasmAVLTree {
  private tree: RustAVLTree;
  
  private constructor() {
    this.tree = new RustAVLTree();
  }
  
  static async create(): Promise<WasmAVLTree> {
    await initWasm();
    return new WasmAVLTree();
  }
  
  insert(value: number): void {
    this.tree.insert(value);
  }
  
  search(value: number): boolean {
    return this.tree.search(value);
  }
}

// グラフのラッパークラス
export class WasmGraph {
  private graph: RustGraph;
  
  private constructor(numVertices: number) {
    this.graph = new RustGraph(numVertices);
  }
  
  static async create(numVertices: number): Promise<WasmGraph> {
    await initWasm();
    return new WasmGraph(numVertices);
  }
  
  addEdge(from: number, to: number, weight: number): void {
    this.graph.add_edge(from, to, weight);
  }
  
  dijkstra(startVertex: number): number[] {
    return Array.from(this.graph.dijkstra(startVertex));
  }

  cleanup(): void {
    if (typeof this.graph.free === 'function') {
      this.graph.free();
    }
    this.graph = null as any;
  }
}