// Wasm生成時に作成される型定義を使用（実際の型はwasm-pack buildで生成される）
import init, {
  quick_sort_many,
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
  // return Array.from(quick_sort(new Int32Array(arr)));
  return Array.from(quick_sort_many(new Int32Array(arr)));
}

// AVL木のラッパークラス
export class WasmAVLTree {
  private tree: RustAVLTree;

  private constructor(tree: RustAVLTree) {
    this.tree = tree;
  }

  static async create(): Promise<WasmAVLTree> {
    await init(); // Wasmモジュール初期化
    const tree = new RustAVLTree();
    return new WasmAVLTree(tree);
  }

  insertMany(values: Int32Array): void {
    this.tree.insert_many(values);
  }

  searchMany(values: Int32Array): boolean[] {
    const result = this.tree.search_many(values);
    return Array.from(result).map((v: number) => v === 1);
  }

  cleanup(): void {
    this.tree.free();
    // 型消去で明示的にnullに
    this.tree = null as any;
  }
}

// グラフのラッパークラス
export class WasmGraph {
  private graph: RustGraph;

  private constructor(graph: RustGraph) {
    this.graph = graph;
  }

  static async create(numVertices: number): Promise<WasmGraph> {
    await initWasm();
    const graph = new RustGraph(numVertices);
    return new WasmGraph(graph);
  }

  /**
   * 一括でエッジを追加する（[from, to, weight, from, to, weight, ...]）
   */
  addEdges(flatEdgeList: number[]): void {
    const typedArray = new Int32Array(flatEdgeList);
    this.graph.add_edges(typedArray);
  }

  /**
   * Dijkstra 法を実行
   */
  dijkstra(startVertex: number): number[] {
    return Array.from(this.graph.dijkstra(startVertex));
  }

  /**
   * メモリ解放
   */
  cleanup(): void {
    if (typeof this.graph.free === 'function') {
      this.graph.free();
    }
    this.graph = null as any;
  }
}
