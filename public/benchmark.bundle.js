/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/rust/pkg/rust.js":
/*!******************************!*\
  !*** ./src/rust/pkg/rust.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVLTree: () => (/* binding */ AVLTree),
/* harmony export */   Graph: () => (/* binding */ Graph),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   initSync: () => (/* binding */ initSync),
/* harmony export */   main_js: () => (/* binding */ main_js),
/* harmony export */   quick_sort: () => (/* binding */ quick_sort)
/* harmony export */ });
let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function main_js() {
    wasm.main_js();
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
 * @param {Int32Array} arr
 * @returns {Int32Array}
 */
function quick_sort(arr) {
    const ptr0 = passArray32ToWasm0(arr, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.quick_sort(ptr0, len0);
    var v2 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v2;
}

const AVLTreeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_avltree_free(ptr >>> 0, 1));

class AVLTree {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AVLTreeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_avltree_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.avltree_new();
        this.__wbg_ptr = ret >>> 0;
        AVLTreeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} value
     */
    insert(value) {
        wasm.avltree_insert(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     * @returns {boolean}
     */
    search(value) {
        const ret = wasm.avltree_search(this.__wbg_ptr, value);
        return ret !== 0;
    }
}

const GraphFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_graph_free(ptr >>> 0, 1));

class Graph {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GraphFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_graph_free(ptr, 0);
    }
    /**
     * @param {number} num_vertices
     */
    constructor(num_vertices) {
        const ret = wasm.graph_new(num_vertices);
        this.__wbg_ptr = ret >>> 0;
        GraphFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} from
     * @param {number} to
     * @param {number} weight
     */
    add_edge(from, to, weight) {
        wasm.graph_add_edge(this.__wbg_ptr, from, to, weight);
    }
    /**
     * @param {number} start_vertex
     * @returns {Int32Array}
     */
    dijkstra(start_vertex) {
        const ret = wasm.graph_dijkstra(this.__wbg_ptr, start_vertex);
        var v1 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_log_d7be6feae117d748 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL(/* asset import */ __webpack_require__(/*! rust_bg.wasm */ "./src/rust/pkg/rust_bg.wasm"), __webpack_require__.b);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__wbg_init);


/***/ }),

/***/ "./src/rust/pkg/rust_bg.wasm":
/*!***********************************!*\
  !*** ./src/rust/pkg/rust_bg.wasm ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9c25896283118580fc0d.wasm";

/***/ }),

/***/ "./src/ts/algorithms/avlTree.ts":
/*!**************************************!*\
  !*** ./src/ts/algorithms/avlTree.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVLTree: () => (/* binding */ AVLTree)
/* harmony export */ });
class AVLTree {
    constructor() {
        this.root = null;
    }
    // ノードの高さを取得
    getHeight(node) {
        return node ? node.height : 0;
    }
    // バランスファクターを計算
    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
    // ノードの高さを更新
    updateHeight(node) {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
    // 右回転
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }
    // 左回転
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }
    // ノードの挿入
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }
    insertNode(node, value) {
        // 通常のBST挿入
        if (node === null) {
            return { value, height: 1, left: null, right: null };
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }
        else {
            // 重複値は許可しない
            return node;
        }
        // ノードの高さを更新
        this.updateHeight(node);
        // バランスファクターを取得
        const balance = this.getBalanceFactor(node);
        // 左の左のケース
        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }
        // 左の右のケース
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        // 右の右のケース
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        // 右の左のケース
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }
    // 検索機能
    search(value) {
        return this.searchNode(this.root, value);
    }
    searchNode(node, value) {
        if (!node)
            return false;
        if (value === node.value)
            return true;
        if (value < node.value)
            return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }
}


/***/ }),

/***/ "./src/ts/algorithms/graph.ts":
/*!************************************!*\
  !*** ./src/ts/algorithms/graph.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Graph: () => (/* binding */ Graph)
/* harmony export */ });
class MinHeap {
    constructor() {
        this.heap = [];
    }
    enqueue(item, priority) {
        this.heap.push({ item, priority });
        this.bubbleUp();
    }
    dequeue() {
        if (this.heap.length === 0)
            return undefined;
        const min = this.heap[0].item;
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];
            if (element.priority >= parent.priority)
                break;
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }
    sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let swap = null;
            if (leftChildIdx < length) {
                if (this.heap[leftChildIdx].priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                if ((swap === null && this.heap[rightChildIdx].priority < element.priority) ||
                    (swap !== null && this.heap[rightChildIdx].priority < this.heap[leftChildIdx].priority)) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null)
                break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}
class Graph {
    constructor(numVertices) {
        this.adjacencyList = [];
        for (let i = 0; i < numVertices; i++) {
            this.adjacencyList.push([]);
        }
    }
    addEdge(from, to, weight) {
        this.adjacencyList[from].push({ to, weight });
    }
    dijkstra(startVertex) {
        const distances = [];
        const visited = [];
        const pq = new MinHeap();
        // 初期化
        for (let i = 0; i < this.adjacencyList.length; i++) {
            distances[i] = i === startVertex ? 0 : Infinity;
            visited[i] = false;
        }
        pq.enqueue({ vertex: startVertex, distance: 0 }, 0);
        while (!pq.isEmpty()) {
            const current = pq.dequeue();
            if (!current)
                break;
            const { vertex, distance } = current;
            if (visited[vertex])
                continue;
            visited[vertex] = true;
            for (const edge of this.adjacencyList[vertex]) {
                const newDistance = distance + edge.weight;
                if (newDistance < distances[edge.to]) {
                    distances[edge.to] = newDistance;
                    pq.enqueue({ vertex: edge.to, distance: newDistance }, newDistance);
                }
            }
        }
        return distances;
    }
    // グラフのノード数を取得
    getVertexCount() {
        return this.adjacencyList.length;
    }
    // グラフのエッジ数を取得
    getEdgeCount() {
        let count = 0;
        for (const edges of this.adjacencyList) {
            count += edges.length;
        }
        return count;
    }
}


/***/ }),

/***/ "./src/ts/algorithms/quickSort.ts":
/*!****************************************!*\
  !*** ./src/ts/algorithms/quickSort.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   quickSort: () => (/* binding */ quickSort)
/* harmony export */ });
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}
function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}


/***/ }),

/***/ "./src/ts/benchmarks/graphBenchmark.ts":
/*!*********************************************!*\
  !*** ./src/ts/benchmarks/graphBenchmark.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runGraphBenchmark: () => (/* binding */ runGraphBenchmark)
/* harmony export */ });
/* harmony import */ var _algorithms_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../algorithms/graph */ "./src/ts/algorithms/graph.ts");
/* harmony import */ var _wasmWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wasmWrapper */ "./src/ts/wasmWrapper.ts");


async function runGraphBenchmark(nodeCount) {
    var _a, _b, _c, _d;
    // 指定されたノード数でランダムなグラフを生成
    const generateRandomGraph = (nodes) => {
        const graph = new _algorithms_graph__WEBPACK_IMPORTED_MODULE_0__.Graph(nodes);
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
    const tsMemoryBefore = ((_a = window.performance.memory) === null || _a === void 0 ? void 0 : _a.usedJSHeapSize) || 0;
    const { graph: tsGraph } = generateRandomGraph(nodeCount);
    const tsResult = tsGraph.dijkstra(0); // ノード0からの最短経路
    const tsAfter = performance.now();
    const tsMemoryAfter = ((_b = window.performance.memory) === null || _b === void 0 ? void 0 : _b.usedJSHeapSize) || 0;
    const tsTime = tsAfter - tsBefore;
    const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB単位
    // Wasm実装のベンチマーク
    const wasmBefore = performance.now();
    const wasmMemoryBefore = ((_c = window.performance.memory) === null || _c === void 0 ? void 0 : _c.usedJSHeapSize) || 0;
    const wasmGraph = await _wasmWrapper__WEBPACK_IMPORTED_MODULE_1__.WasmGraph.create(nodeCount);
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
    const wasmMemoryAfter = ((_d = window.performance.memory) === null || _d === void 0 ? void 0 : _d.usedJSHeapSize) || 0;
    const wasmTime = wasmAfter - wasmBefore;
    const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB単位
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


/***/ }),

/***/ "./src/ts/benchmarks/sortBenchmark.ts":
/*!********************************************!*\
  !*** ./src/ts/benchmarks/sortBenchmark.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runSortingBenchmark: () => (/* binding */ runSortingBenchmark)
/* harmony export */ });
/* harmony import */ var _algorithms_quickSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../algorithms/quickSort */ "./src/ts/algorithms/quickSort.ts");
/* harmony import */ var _wasmWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wasmWrapper */ "./src/ts/wasmWrapper.ts");


async function runSortingBenchmark(size) {
    var _a, _b, _c, _d;
    // ランダムな配列を生成
    const generateRandomArray = (n) => {
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(Math.floor(Math.random() * 1000000));
        }
        return arr;
    };
    // TypeScript実装のベンチマーク
    const tsArray = generateRandomArray(size);
    const tsBefore = performance.now();
    const tsMemoryBefore = ((_a = window.performance.memory) === null || _a === void 0 ? void 0 : _a.usedJSHeapSize) || 0;
    (0,_algorithms_quickSort__WEBPACK_IMPORTED_MODULE_0__.quickSort)([...tsArray]);
    const tsAfter = performance.now();
    const tsMemoryAfter = ((_b = window.performance.memory) === null || _b === void 0 ? void 0 : _b.usedJSHeapSize) || 0;
    const tsTime = tsAfter - tsBefore;
    const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB単位
    // Wasm実装のベンチマーク
    const wasmArray = generateRandomArray(size);
    const wasmBefore = performance.now();
    const wasmMemoryBefore = ((_c = window.performance.memory) === null || _c === void 0 ? void 0 : _c.usedJSHeapSize) || 0;
    await (0,_wasmWrapper__WEBPACK_IMPORTED_MODULE_1__.wasmQuickSort)([...wasmArray]);
    const wasmAfter = performance.now();
    const wasmMemoryAfter = ((_d = window.performance.memory) === null || _d === void 0 ? void 0 : _d.usedJSHeapSize) || 0;
    const wasmTime = wasmAfter - wasmBefore;
    const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB単位
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


/***/ }),

/***/ "./src/ts/benchmarks/treeBenchmark.ts":
/*!********************************************!*\
  !*** ./src/ts/benchmarks/treeBenchmark.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runTreeBenchmark: () => (/* binding */ runTreeBenchmark)
/* harmony export */ });
/* harmony import */ var _algorithms_avlTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../algorithms/avlTree */ "./src/ts/algorithms/avlTree.ts");
/* harmony import */ var _wasmWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wasmWrapper */ "./src/ts/wasmWrapper.ts");


async function runTreeBenchmark(size) {
    var _a, _b, _c, _d;
    // ランダムな数値配列を生成
    const generateRandomNumbers = (n) => {
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
    const tsMemoryBefore = ((_a = window.performance.memory) === null || _a === void 0 ? void 0 : _a.usedJSHeapSize) || 0;
    const tsTree = new _algorithms_avlTree__WEBPACK_IMPORTED_MODULE_0__.AVLTree();
    // 挿入操作
    for (const num of numbers) {
        tsTree.insert(num);
    }
    // 検索操作
    for (const num of searchNumbers) {
        tsTree.search(num);
    }
    const tsAfter = performance.now();
    const tsMemoryAfter = ((_b = window.performance.memory) === null || _b === void 0 ? void 0 : _b.usedJSHeapSize) || 0;
    const tsTime = tsAfter - tsBefore;
    const tsMemory = (tsMemoryAfter - tsMemoryBefore) / (1024 * 1024); // MB単位
    // Wasm実装のベンチマーク
    const wasmBefore = performance.now();
    const wasmMemoryBefore = ((_c = window.performance.memory) === null || _c === void 0 ? void 0 : _c.usedJSHeapSize) || 0;
    const wasmTree = await _wasmWrapper__WEBPACK_IMPORTED_MODULE_1__.WasmAVLTree.create();
    // 挿入操作
    for (const num of numbers) {
        wasmTree.insert(num);
    }
    // 検索操作
    for (const num of searchNumbers) {
        wasmTree.search(num);
    }
    const wasmAfter = performance.now();
    const wasmMemoryAfter = ((_d = window.performance.memory) === null || _d === void 0 ? void 0 : _d.usedJSHeapSize) || 0;
    const wasmTime = wasmAfter - wasmBefore;
    const wasmMemory = (wasmMemoryAfter - wasmMemoryBefore) / (1024 * 1024); // MB単位
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


/***/ }),

/***/ "./src/ts/wasmWrapper.ts":
/*!*******************************!*\
  !*** ./src/ts/wasmWrapper.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WasmAVLTree: () => (/* binding */ WasmAVLTree),
/* harmony export */   WasmGraph: () => (/* binding */ WasmGraph),
/* harmony export */   initWasm: () => (/* binding */ initWasm),
/* harmony export */   wasmQuickSort: () => (/* binding */ wasmQuickSort)
/* harmony export */ });
/* harmony import */ var _src_rust_pkg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/rust/pkg */ "./src/rust/pkg/rust.js");
// Wasm生成時に作成される型定義を使用（実際の型はwasm-pack buildで生成される）

// モジュールの初期化状態
let wasmInitialized = false;
let initPromise = null;
// Wasmモジュールの初期化
async function initWasm() {
    if (wasmInitialized)
        return;
    if (!initPromise) {
        initPromise = (0,_src_rust_pkg__WEBPACK_IMPORTED_MODULE_0__["default"])().then(() => {
            wasmInitialized = true;
            console.log('WebAssembly module initialized');
        });
    }
    return initPromise;
}
// クイックソートのラッパー
async function wasmQuickSort(arr) {
    await initWasm();
    return Array.from((0,_src_rust_pkg__WEBPACK_IMPORTED_MODULE_0__.quick_sort)(new Int32Array(arr)));
}
// AVL木のラッパークラス
class WasmAVLTree {
    constructor() {
        this.tree = new _src_rust_pkg__WEBPACK_IMPORTED_MODULE_0__.AVLTree();
    }
    static async create() {
        await initWasm();
        return new WasmAVLTree();
    }
    insert(value) {
        this.tree.insert(value);
    }
    search(value) {
        return this.tree.search(value);
    }
}
// グラフのラッパークラス
class WasmGraph {
    constructor(numVertices) {
        this.graph = new _src_rust_pkg__WEBPACK_IMPORTED_MODULE_0__.Graph(numVertices);
    }
    static async create(numVertices) {
        await initWasm();
        return new WasmGraph(numVertices);
    }
    addEdge(from, to, weight) {
        this.graph.add_edge(from, to, weight);
    }
    dijkstra(startVertex) {
        return Array.from(this.graph.dijkstra(startVertex));
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"benchmark": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/ts/benchmark.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _benchmarks_sortBenchmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./benchmarks/sortBenchmark */ "./src/ts/benchmarks/sortBenchmark.ts");
/* harmony import */ var _benchmarks_treeBenchmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./benchmarks/treeBenchmark */ "./src/ts/benchmarks/treeBenchmark.ts");
/* harmony import */ var _benchmarks_graphBenchmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./benchmarks/graphBenchmark */ "./src/ts/benchmarks/graphBenchmark.ts");



window.runSortingBenchmark = _benchmarks_sortBenchmark__WEBPACK_IMPORTED_MODULE_0__.runSortingBenchmark;
window.runTreeBenchmark = _benchmarks_treeBenchmark__WEBPACK_IMPORTED_MODULE_1__.runTreeBenchmark;
window.runGraphBenchmark = _benchmarks_graphBenchmark__WEBPACK_IMPORTED_MODULE_2__.runGraphBenchmark;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7Ozs7Ozs7Ozs7QUNyQmlFO0FBQ0g7QUFDRTtBQUUvRCxNQUFjLENBQUMsbUJBQW1CLEdBQUcsMEVBQW1CLENBQUM7QUFDekQsTUFBYyxDQUFDLGdCQUFnQixHQUFHLHVFQUFnQixDQUFDO0FBQ25ELE1BQWMsQ0FBQyxpQkFBaUIsR0FBRyx5RUFBaUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vLi9zcmMvcnVzdC9wa2cvcnVzdC5qcyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2FsZ29yaXRobXMvYXZsVHJlZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2FsZ29yaXRobXMvZ3JhcGgudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi8uL3NyYy90cy9hbGdvcml0aG1zL3F1aWNrU29ydC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2JlbmNobWFya3MvZ3JhcGhCZW5jaG1hcmsudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi8uL3NyYy90cy9iZW5jaG1hcmtzL3NvcnRCZW5jaG1hcmsudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi8uL3NyYy90cy9iZW5jaG1hcmtzL3RyZWVCZW5jaG1hcmsudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi8uL3NyYy90cy93YXNtV3JhcHBlci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2JlbmNobWFyay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgd2FzbTtcblxuY29uc3QgY2FjaGVkVGV4dERlY29kZXIgPSAodHlwZW9mIFRleHREZWNvZGVyICE9PSAndW5kZWZpbmVkJyA/IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnLCB7IGlnbm9yZUJPTTogdHJ1ZSwgZmF0YWw6IHRydWUgfSkgOiB7IGRlY29kZTogKCkgPT4geyB0aHJvdyBFcnJvcignVGV4dERlY29kZXIgbm90IGF2YWlsYWJsZScpIH0gfSApO1xuXG5pZiAodHlwZW9mIFRleHREZWNvZGVyICE9PSAndW5kZWZpbmVkJykgeyBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoKTsgfTtcblxubGV0IGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwID0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0VWludDhBcnJheU1lbW9yeTAoKSB7XG4gICAgaWYgKGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgY2FjaGVkVWludDhBcnJheU1lbW9yeTAgPSBuZXcgVWludDhBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkVWludDhBcnJheU1lbW9yeTA7XG59XG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21XYXNtMChwdHIsIGxlbikge1xuICAgIHB0ciA9IHB0ciA+Pj4gMDtcbiAgICByZXR1cm4gY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKGdldFVpbnQ4QXJyYXlNZW1vcnkwKCkuc3ViYXJyYXkocHRyLCBwdHIgKyBsZW4pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5fanMoKSB7XG4gICAgd2FzbS5tYWluX2pzKCk7XG59XG5cbmxldCBjYWNoZWRVaW50MzJBcnJheU1lbW9yeTAgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXRVaW50MzJBcnJheU1lbW9yeTAoKSB7XG4gICAgaWYgKGNhY2hlZFVpbnQzMkFycmF5TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWRVaW50MzJBcnJheU1lbW9yeTAuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjYWNoZWRVaW50MzJBcnJheU1lbW9yeTAgPSBuZXcgVWludDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZFVpbnQzMkFycmF5TWVtb3J5MDtcbn1cblxubGV0IFdBU01fVkVDVE9SX0xFTiA9IDA7XG5cbmZ1bmN0aW9uIHBhc3NBcnJheTMyVG9XYXNtMChhcmcsIG1hbGxvYykge1xuICAgIGNvbnN0IHB0ciA9IG1hbGxvYyhhcmcubGVuZ3RoICogNCwgNCkgPj4+IDA7XG4gICAgZ2V0VWludDMyQXJyYXlNZW1vcnkwKCkuc2V0KGFyZywgcHRyIC8gNCk7XG4gICAgV0FTTV9WRUNUT1JfTEVOID0gYXJnLmxlbmd0aDtcbiAgICByZXR1cm4gcHRyO1xufVxuXG5sZXQgY2FjaGVkSW50MzJBcnJheU1lbW9yeTAgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXRJbnQzMkFycmF5TWVtb3J5MCgpIHtcbiAgICBpZiAoY2FjaGVkSW50MzJBcnJheU1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVkSW50MzJBcnJheU1lbW9yeTAuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjYWNoZWRJbnQzMkFycmF5TWVtb3J5MCA9IG5ldyBJbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRJbnQzMkFycmF5TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0QXJyYXlJMzJGcm9tV2FzbTAocHRyLCBsZW4pIHtcbiAgICBwdHIgPSBwdHIgPj4+IDA7XG4gICAgcmV0dXJuIGdldEludDMyQXJyYXlNZW1vcnkwKCkuc3ViYXJyYXkocHRyIC8gNCwgcHRyIC8gNCArIGxlbik7XG59XG4vKipcbiAqIEBwYXJhbSB7SW50MzJBcnJheX0gYXJyXG4gKiBAcmV0dXJucyB7SW50MzJBcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1aWNrX3NvcnQoYXJyKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NBcnJheTMyVG9XYXNtMChhcnIsIHdhc20uX193YmluZGdlbl9tYWxsb2MpO1xuICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgY29uc3QgcmV0ID0gd2FzbS5xdWlja19zb3J0KHB0cjAsIGxlbjApO1xuICAgIHZhciB2MiA9IGdldEFycmF5STMyRnJvbVdhc20wKHJldFswXSwgcmV0WzFdKS5zbGljZSgpO1xuICAgIHdhc20uX193YmluZGdlbl9mcmVlKHJldFswXSwgcmV0WzFdICogNCwgNCk7XG4gICAgcmV0dXJuIHYyO1xufVxuXG5jb25zdCBBVkxUcmVlRmluYWxpemF0aW9uID0gKHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgPyB7IHJlZ2lzdGVyOiAoKSA9PiB7fSwgdW5yZWdpc3RlcjogKCkgPT4ge30gfVxuICAgIDogbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KHB0ciA9PiB3YXNtLl9fd2JnX2F2bHRyZWVfZnJlZShwdHIgPj4+IDAsIDEpKTtcblxuZXhwb3J0IGNsYXNzIEFWTFRyZWUge1xuXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fd2JnX3B0cjtcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xuICAgICAgICBBVkxUcmVlRmluYWxpemF0aW9uLnVucmVnaXN0ZXIodGhpcyk7XG4gICAgICAgIHJldHVybiBwdHI7XG4gICAgfVxuXG4gICAgZnJlZSgpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcbiAgICAgICAgd2FzbS5fX3diZ19hdmx0cmVlX2ZyZWUocHRyLCAwKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uYXZsdHJlZV9uZXcoKTtcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSByZXQgPj4+IDA7XG4gICAgICAgIEFWTFRyZWVGaW5hbGl6YXRpb24ucmVnaXN0ZXIodGhpcywgdGhpcy5fX3diZ19wdHIsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICovXG4gICAgaW5zZXJ0KHZhbHVlKSB7XG4gICAgICAgIHdhc20uYXZsdHJlZV9pbnNlcnQodGhpcy5fX3diZ19wdHIsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc2VhcmNoKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uYXZsdHJlZV9zZWFyY2godGhpcy5fX3diZ19wdHIsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHJldCAhPT0gMDtcbiAgICB9XG59XG5cbmNvbnN0IEdyYXBoRmluYWxpemF0aW9uID0gKHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgPyB7IHJlZ2lzdGVyOiAoKSA9PiB7fSwgdW5yZWdpc3RlcjogKCkgPT4ge30gfVxuICAgIDogbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KHB0ciA9PiB3YXNtLl9fd2JnX2dyYXBoX2ZyZWUocHRyID4+PiAwLCAxKSk7XG5cbmV4cG9ydCBjbGFzcyBHcmFwaCB7XG5cbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xuICAgICAgICB0aGlzLl9fd2JnX3B0ciA9IDA7XG4gICAgICAgIEdyYXBoRmluYWxpemF0aW9uLnVucmVnaXN0ZXIodGhpcyk7XG4gICAgICAgIHJldHVybiBwdHI7XG4gICAgfVxuXG4gICAgZnJlZSgpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcbiAgICAgICAgd2FzbS5fX3diZ19ncmFwaF9mcmVlKHB0ciwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1fdmVydGljZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihudW1fdmVydGljZXMpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5ncmFwaF9uZXcobnVtX3ZlcnRpY2VzKTtcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSByZXQgPj4+IDA7XG4gICAgICAgIEdyYXBoRmluYWxpemF0aW9uLnJlZ2lzdGVyKHRoaXMsIHRoaXMuX193YmdfcHRyLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRvXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdlaWdodFxuICAgICAqL1xuICAgIGFkZF9lZGdlKGZyb20sIHRvLCB3ZWlnaHQpIHtcbiAgICAgICAgd2FzbS5ncmFwaF9hZGRfZWRnZSh0aGlzLl9fd2JnX3B0ciwgZnJvbSwgdG8sIHdlaWdodCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydF92ZXJ0ZXhcbiAgICAgKiBAcmV0dXJucyB7SW50MzJBcnJheX1cbiAgICAgKi9cbiAgICBkaWprc3RyYShzdGFydF92ZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5ncmFwaF9kaWprc3RyYSh0aGlzLl9fd2JnX3B0ciwgc3RhcnRfdmVydGV4KTtcbiAgICAgICAgdmFyIHYxID0gZ2V0QXJyYXlJMzJGcm9tV2FzbTAocmV0WzBdLCByZXRbMV0pLnNsaWNlKCk7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHJldFswXSwgcmV0WzFdICogNCwgNCk7XG4gICAgICAgIHJldHVybiB2MTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9fd2JnX2xvYWQobW9kdWxlLCBpbXBvcnRzKSB7XG4gICAgaWYgKHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGUgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhtb2R1bGUsIGltcG9ydHMpO1xuXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykgIT0gJ2FwcGxpY2F0aW9uL3dhc20nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZ2AgZmFpbGVkIGJlY2F1c2UgeW91ciBzZXJ2ZXIgZG9lcyBub3Qgc2VydmUgV2FzbSB3aXRoIGBhcHBsaWNhdGlvbi93YXNtYCBNSU1FIHR5cGUuIEZhbGxpbmcgYmFjayB0byBgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVgIHdoaWNoIGlzIHNsb3dlci4gT3JpZ2luYWwgZXJyb3I6XFxuXCIsIGUpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBieXRlcyA9IGF3YWl0IG1vZHVsZS5hcnJheUJ1ZmZlcigpO1xuICAgICAgICByZXR1cm4gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnl0ZXMsIGltcG9ydHMpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShtb2R1bGUsIGltcG9ydHMpO1xuXG4gICAgICAgIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lkluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpbnN0YW5jZSwgbW9kdWxlIH07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gX193YmdfZ2V0X2ltcG9ydHMoKSB7XG4gICAgY29uc3QgaW1wb3J0cyA9IHt9O1xuICAgIGltcG9ydHMud2JnID0ge307XG4gICAgaW1wb3J0cy53YmcuX193YmdfbG9nX2Q3YmU2ZmVhZTExN2Q3NDggPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX2luaXRfZXh0ZXJucmVmX3RhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gd2FzbS5fX3diaW5kZ2VuX2V4cG9ydF8wO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSB0YWJsZS5ncm93KDQpO1xuICAgICAgICB0YWJsZS5zZXQoMCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGFibGUuc2V0KG9mZnNldCArIDAsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRhYmxlLnNldChvZmZzZXQgKyAxLCBudWxsKTtcbiAgICAgICAgdGFibGUuc2V0KG9mZnNldCArIDIsIHRydWUpO1xuICAgICAgICB0YWJsZS5zZXQob2Zmc2V0ICsgMywgZmFsc2UpO1xuICAgICAgICA7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX3Rocm93ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGltcG9ydHM7XG59XG5cbmZ1bmN0aW9uIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMsIG1lbW9yeSkge1xuXG59XG5cbmZ1bmN0aW9uIF9fd2JnX2ZpbmFsaXplX2luaXQoaW5zdGFuY2UsIG1vZHVsZSkge1xuICAgIHdhc20gPSBpbnN0YW5jZS5leHBvcnRzO1xuICAgIF9fd2JnX2luaXQuX193YmluZGdlbl93YXNtX21vZHVsZSA9IG1vZHVsZTtcbiAgICBjYWNoZWRJbnQzMkFycmF5TWVtb3J5MCA9IG51bGw7XG4gICAgY2FjaGVkVWludDMyQXJyYXlNZW1vcnkwID0gbnVsbDtcbiAgICBjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9IG51bGw7XG5cblxuICAgIHdhc20uX193YmluZGdlbl9zdGFydCgpO1xuICAgIHJldHVybiB3YXNtO1xufVxuXG5mdW5jdGlvbiBpbml0U3luYyhtb2R1bGUpIHtcbiAgICBpZiAod2FzbSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gd2FzbTtcblxuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YobW9kdWxlKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgKHttb2R1bGV9ID0gbW9kdWxlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1c2luZyBkZXByZWNhdGVkIHBhcmFtZXRlcnMgZm9yIGBpbml0U3luYygpYDsgcGFzcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRzID0gX193YmdfZ2V0X2ltcG9ydHMoKTtcblxuICAgIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMpO1xuXG4gICAgaWYgKCEobW9kdWxlIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuTW9kdWxlKSkge1xuICAgICAgICBtb2R1bGUgPSBuZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG1vZHVsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UobW9kdWxlLCBpbXBvcnRzKTtcblxuICAgIHJldHVybiBfX3diZ19maW5hbGl6ZV9pbml0KGluc3RhbmNlLCBtb2R1bGUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfX3diZ19pbml0KG1vZHVsZV9vcl9wYXRoKSB7XG4gICAgaWYgKHdhc20gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHdhc207XG5cblxuICAgIGlmICh0eXBlb2YgbW9kdWxlX29yX3BhdGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YobW9kdWxlX29yX3BhdGgpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgICAgICAoe21vZHVsZV9vcl9wYXRofSA9IG1vZHVsZV9vcl9wYXRoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1c2luZyBkZXByZWNhdGVkIHBhcmFtZXRlcnMgZm9yIHRoZSBpbml0aWFsaXphdGlvbiBmdW5jdGlvbjsgcGFzcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZV9vcl9wYXRoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGVfb3JfcGF0aCA9IG5ldyBVUkwoJ3J1c3RfYmcud2FzbScsIGltcG9ydC5tZXRhLnVybCk7XG4gICAgfVxuICAgIGNvbnN0IGltcG9ydHMgPSBfX3diZ19nZXRfaW1wb3J0cygpO1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGVfb3JfcGF0aCA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIG1vZHVsZV9vcl9wYXRoIGluc3RhbmNlb2YgUmVxdWVzdCkgfHwgKHR5cGVvZiBVUkwgPT09ICdmdW5jdGlvbicgJiYgbW9kdWxlX29yX3BhdGggaW5zdGFuY2VvZiBVUkwpKSB7XG4gICAgICAgIG1vZHVsZV9vcl9wYXRoID0gZmV0Y2gobW9kdWxlX29yX3BhdGgpO1xuICAgIH1cblxuICAgIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMpO1xuXG4gICAgY29uc3QgeyBpbnN0YW5jZSwgbW9kdWxlIH0gPSBhd2FpdCBfX3diZ19sb2FkKGF3YWl0IG1vZHVsZV9vcl9wYXRoLCBpbXBvcnRzKTtcblxuICAgIHJldHVybiBfX3diZ19maW5hbGl6ZV9pbml0KGluc3RhbmNlLCBtb2R1bGUpO1xufVxuXG5leHBvcnQgeyBpbml0U3luYyB9O1xuZXhwb3J0IGRlZmF1bHQgX193YmdfaW5pdDtcbiIsImludGVyZmFjZSBUcmVlTm9kZSB7XG4gIHZhbHVlOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBsZWZ0OiBUcmVlTm9kZSB8IG51bGw7XG4gIHJpZ2h0OiBUcmVlTm9kZSB8IG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBBVkxUcmVlIHtcbiAgcm9vdDogVHJlZU5vZGUgfCBudWxsID0gbnVsbDtcbiAgXG4gIC8vIOODjuODvOODieOBrumrmOOBleOCkuWPluW+l1xuICBwcml2YXRlIGdldEhlaWdodChub2RlOiBUcmVlTm9kZSB8IG51bGwpOiBudW1iZXIge1xuICAgIHJldHVybiBub2RlID8gbm9kZS5oZWlnaHQgOiAwO1xuICB9XG4gIFxuICAvLyDjg5Djg6njg7Pjgrnjg5XjgqHjgq/jgr/jg7zjgpLoqIjnrpdcbiAgcHJpdmF0ZSBnZXRCYWxhbmNlRmFjdG9yKG5vZGU6IFRyZWVOb2RlIHwgbnVsbCk6IG51bWJlciB7XG4gICAgcmV0dXJuIG5vZGUgPyB0aGlzLmdldEhlaWdodChub2RlLmxlZnQpIC0gdGhpcy5nZXRIZWlnaHQobm9kZS5yaWdodCkgOiAwO1xuICB9XG4gIFxuICAvLyDjg47jg7zjg4njga7pq5jjgZXjgpLmm7TmlrBcbiAgcHJpdmF0ZSB1cGRhdGVIZWlnaHQobm9kZTogVHJlZU5vZGUpOiB2b2lkIHtcbiAgICBub2RlLmhlaWdodCA9IE1hdGgubWF4KHRoaXMuZ2V0SGVpZ2h0KG5vZGUubGVmdCksIHRoaXMuZ2V0SGVpZ2h0KG5vZGUucmlnaHQpKSArIDE7XG4gIH1cbiAgXG4gIC8vIOWPs+Wbnui7olxuICBwcml2YXRlIHJvdGF0ZVJpZ2h0KHk6IFRyZWVOb2RlKTogVHJlZU5vZGUge1xuICAgIGNvbnN0IHggPSB5LmxlZnQgYXMgVHJlZU5vZGU7XG4gICAgY29uc3QgVDIgPSB4LnJpZ2h0O1xuICAgIFxuICAgIHgucmlnaHQgPSB5O1xuICAgIHkubGVmdCA9IFQyO1xuICAgIFxuICAgIHRoaXMudXBkYXRlSGVpZ2h0KHkpO1xuICAgIHRoaXMudXBkYXRlSGVpZ2h0KHgpO1xuICAgIFxuICAgIHJldHVybiB4O1xuICB9XG4gIFxuICAvLyDlt6blm57ou6JcbiAgcHJpdmF0ZSByb3RhdGVMZWZ0KHg6IFRyZWVOb2RlKTogVHJlZU5vZGUge1xuICAgIGNvbnN0IHkgPSB4LnJpZ2h0IGFzIFRyZWVOb2RlO1xuICAgIGNvbnN0IFQyID0geS5sZWZ0O1xuICAgIFxuICAgIHkubGVmdCA9IHg7XG4gICAgeC5yaWdodCA9IFQyO1xuICAgIFxuICAgIHRoaXMudXBkYXRlSGVpZ2h0KHgpO1xuICAgIHRoaXMudXBkYXRlSGVpZ2h0KHkpO1xuICAgIFxuICAgIHJldHVybiB5O1xuICB9XG4gIFxuICAvLyDjg47jg7zjg4njga7mjL/lhaVcbiAgaW5zZXJ0KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmluc2VydE5vZGUodGhpcy5yb290LCB2YWx1ZSk7XG4gIH1cbiAgXG4gIHByaXZhdGUgaW5zZXJ0Tm9kZShub2RlOiBUcmVlTm9kZSB8IG51bGwsIHZhbHVlOiBudW1iZXIpOiBUcmVlTm9kZSB7XG4gICAgLy8g6YCa5bi444GuQlNU5oy/5YWlXG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlLCBoZWlnaHQ6IDEsIGxlZnQ6IG51bGwsIHJpZ2h0OiBudWxsIH07XG4gICAgfVxuICAgIFxuICAgIGlmICh2YWx1ZSA8IG5vZGUudmFsdWUpIHtcbiAgICAgIG5vZGUubGVmdCA9IHRoaXMuaW5zZXJ0Tm9kZShub2RlLmxlZnQsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID4gbm9kZS52YWx1ZSkge1xuICAgICAgbm9kZS5yaWdodCA9IHRoaXMuaW5zZXJ0Tm9kZShub2RlLnJpZ2h0LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOmHjeikh+WApOOBr+ioseWPr+OBl+OBquOBhFxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIFxuICAgIC8vIOODjuODvOODieOBrumrmOOBleOCkuabtOaWsFxuICAgIHRoaXMudXBkYXRlSGVpZ2h0KG5vZGUpO1xuICAgIFxuICAgIC8vIOODkOODqeODs+OCueODleOCoeOCr+OCv+ODvOOCkuWPluW+l1xuICAgIGNvbnN0IGJhbGFuY2UgPSB0aGlzLmdldEJhbGFuY2VGYWN0b3Iobm9kZSk7XG4gICAgXG4gICAgLy8g5bem44Gu5bem44Gu44Kx44O844K5XG4gICAgaWYgKGJhbGFuY2UgPiAxICYmIHRoaXMuZ2V0QmFsYW5jZUZhY3Rvcihub2RlLmxlZnQpID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0ZVJpZ2h0KG5vZGUpO1xuICAgIH1cbiAgICBcbiAgICAvLyDlt6bjga7lj7Pjga7jgrHjg7zjgrlcbiAgICBpZiAoYmFsYW5jZSA+IDEgJiYgdGhpcy5nZXRCYWxhbmNlRmFjdG9yKG5vZGUubGVmdCkgPCAwKSB7XG4gICAgICBub2RlLmxlZnQgPSB0aGlzLnJvdGF0ZUxlZnQobm9kZS5sZWZ0IGFzIFRyZWVOb2RlKTtcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0ZVJpZ2h0KG5vZGUpO1xuICAgIH1cbiAgICBcbiAgICAvLyDlj7Pjga7lj7Pjga7jgrHjg7zjgrlcbiAgICBpZiAoYmFsYW5jZSA8IC0xICYmIHRoaXMuZ2V0QmFsYW5jZUZhY3Rvcihub2RlLnJpZ2h0KSA8PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3RhdGVMZWZ0KG5vZGUpO1xuICAgIH1cbiAgICBcbiAgICAvLyDlj7Pjga7lt6bjga7jgrHjg7zjgrlcbiAgICBpZiAoYmFsYW5jZSA8IC0xICYmIHRoaXMuZ2V0QmFsYW5jZUZhY3Rvcihub2RlLnJpZ2h0KSA+IDApIHtcbiAgICAgIG5vZGUucmlnaHQgPSB0aGlzLnJvdGF0ZVJpZ2h0KG5vZGUucmlnaHQgYXMgVHJlZU5vZGUpO1xuICAgICAgcmV0dXJuIHRoaXMucm90YXRlTGVmdChub2RlKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgXG4gIC8vIOaknOe0ouapn+iDvVxuICBzZWFyY2godmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaE5vZGUodGhpcy5yb290LCB2YWx1ZSk7XG4gIH1cbiAgXG4gIHByaXZhdGUgc2VhcmNoTm9kZShub2RlOiBUcmVlTm9kZSB8IG51bGwsIHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodmFsdWUgPT09IG5vZGUudmFsdWUpIHJldHVybiB0cnVlO1xuICAgIGlmICh2YWx1ZSA8IG5vZGUudmFsdWUpIHJldHVybiB0aGlzLnNlYXJjaE5vZGUobm9kZS5sZWZ0LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoTm9kZShub2RlLnJpZ2h0LCB2YWx1ZSk7XG4gIH1cbiAgXG59IiwiaW50ZXJmYWNlIEVkZ2Uge1xuICB0bzogbnVtYmVyO1xuICB3ZWlnaHQ6IG51bWJlcjtcbn1cblxuY2xhc3MgTWluSGVhcDxUPiB7XG4gIHByaXZhdGUgaGVhcDogQXJyYXk8e2l0ZW06IFQsIHByaW9yaXR5OiBudW1iZXJ9PiA9IFtdO1xuXG4gIGVucXVldWUoaXRlbTogVCwgcHJpb3JpdHk6IG51bWJlcikge1xuICAgIHRoaXMuaGVhcC5wdXNoKHsgaXRlbSwgcHJpb3JpdHkgfSk7XG4gICAgdGhpcy5idWJibGVVcCgpO1xuICB9XG5cbiAgZGVxdWV1ZSgpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5oZWFwLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBtaW4gPSB0aGlzLmhlYXBbMF0uaXRlbTtcbiAgICBjb25zdCBlbmQgPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgaWYgKHRoaXMuaGVhcC5sZW5ndGggPiAwICYmIGVuZCkge1xuICAgICAgdGhpcy5oZWFwWzBdID0gZW5kO1xuICAgICAgdGhpcy5zaW5rRG93bigpO1xuICAgIH1cbiAgICByZXR1cm4gbWluO1xuICB9XG5cbiAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oZWFwLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIHByaXZhdGUgYnViYmxlVXAoKSB7XG4gICAgbGV0IGlkeCA9IHRoaXMuaGVhcC5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmhlYXBbaWR4XTtcbiAgICB3aGlsZSAoaWR4ID4gMCkge1xuICAgICAgbGV0IHBhcmVudElkeCA9IE1hdGguZmxvb3IoKGlkeCAtIDEpIC8gMik7XG4gICAgICBsZXQgcGFyZW50ID0gdGhpcy5oZWFwW3BhcmVudElkeF07XG4gICAgICBpZiAoZWxlbWVudC5wcmlvcml0eSA+PSBwYXJlbnQucHJpb3JpdHkpIGJyZWFrO1xuICAgICAgdGhpcy5oZWFwW3BhcmVudElkeF0gPSBlbGVtZW50O1xuICAgICAgdGhpcy5oZWFwW2lkeF0gPSBwYXJlbnQ7XG4gICAgICBpZHggPSBwYXJlbnRJZHg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaW5rRG93bigpIHtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmhlYXBbMF07XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IGxlZnRDaGlsZElkeCA9IDIgKiBpZHggKyAxO1xuICAgICAgbGV0IHJpZ2h0Q2hpbGRJZHggPSAyICogaWR4ICsgMjtcbiAgICAgIGxldCBzd2FwOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgICAgaWYgKGxlZnRDaGlsZElkeCA8IGxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy5oZWFwW2xlZnRDaGlsZElkeF0ucHJpb3JpdHkgPCBlbGVtZW50LnByaW9yaXR5KSB7XG4gICAgICAgICAgc3dhcCA9IGxlZnRDaGlsZElkeDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHJpZ2h0Q2hpbGRJZHggPCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKChzd2FwID09PSBudWxsICYmIHRoaXMuaGVhcFtyaWdodENoaWxkSWR4XS5wcmlvcml0eSA8IGVsZW1lbnQucHJpb3JpdHkpIHx8XG4gICAgICAgICAgICAoc3dhcCAhPT0gbnVsbCAmJiB0aGlzLmhlYXBbcmlnaHRDaGlsZElkeF0ucHJpb3JpdHkgPCB0aGlzLmhlYXBbbGVmdENoaWxkSWR4XS5wcmlvcml0eSkpIHtcbiAgICAgICAgICBzd2FwID0gcmlnaHRDaGlsZElkeDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN3YXAgPT09IG51bGwpIGJyZWFrO1xuICAgICAgdGhpcy5oZWFwW2lkeF0gPSB0aGlzLmhlYXBbc3dhcF07XG4gICAgICB0aGlzLmhlYXBbc3dhcF0gPSBlbGVtZW50O1xuICAgICAgaWR4ID0gc3dhcDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyYXBoIHtcbiAgcHJpdmF0ZSBhZGphY2VuY3lMaXN0OiBFZGdlW11bXSA9IFtdO1xuICBcbiAgY29uc3RydWN0b3IobnVtVmVydGljZXM6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVmVydGljZXM7IGkrKykge1xuICAgICAgdGhpcy5hZGphY2VuY3lMaXN0LnB1c2goW10pO1xuICAgIH1cbiAgfVxuICBcbiAgYWRkRWRnZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hZGphY2VuY3lMaXN0W2Zyb21dLnB1c2goeyB0bywgd2VpZ2h0IH0pO1xuICB9XG4gIFxuICBkaWprc3RyYShzdGFydFZlcnRleDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IGRpc3RhbmNlczogbnVtYmVyW10gPSBbXTtcbiAgICBjb25zdCB2aXNpdGVkOiBib29sZWFuW10gPSBbXTtcbiAgICBjb25zdCBwcSA9IG5ldyBNaW5IZWFwPHsgdmVydGV4OiBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXIgfT4oKTtcbiAgICBcbiAgICAvLyDliJ3mnJ/ljJZcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWRqYWNlbmN5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgZGlzdGFuY2VzW2ldID0gaSA9PT0gc3RhcnRWZXJ0ZXggPyAwIDogSW5maW5pdHk7XG4gICAgICB2aXNpdGVkW2ldID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHBxLmVucXVldWUoeyB2ZXJ0ZXg6IHN0YXJ0VmVydGV4LCBkaXN0YW5jZTogMCB9LCAwKTtcbiAgICBcbiAgICB3aGlsZSAoIXBxLmlzRW1wdHkoKSkge1xuICAgICAgY29uc3QgY3VycmVudCA9IHBxLmRlcXVldWUoKTtcbiAgICAgIGlmICghY3VycmVudCkgYnJlYWs7XG4gICAgICBcbiAgICAgIGNvbnN0IHsgdmVydGV4LCBkaXN0YW5jZSB9ID0gY3VycmVudDtcbiAgICAgIFxuICAgICAgaWYgKHZpc2l0ZWRbdmVydGV4XSkgY29udGludWU7XG4gICAgICB2aXNpdGVkW3ZlcnRleF0gPSB0cnVlO1xuICAgICAgXG4gICAgICBmb3IgKGNvbnN0IGVkZ2Ugb2YgdGhpcy5hZGphY2VuY3lMaXN0W3ZlcnRleF0pIHtcbiAgICAgICAgY29uc3QgbmV3RGlzdGFuY2UgPSBkaXN0YW5jZSArIGVkZ2Uud2VpZ2h0O1xuICAgICAgICBcbiAgICAgICAgaWYgKG5ld0Rpc3RhbmNlIDwgZGlzdGFuY2VzW2VkZ2UudG9dKSB7XG4gICAgICAgICAgZGlzdGFuY2VzW2VkZ2UudG9dID0gbmV3RGlzdGFuY2U7XG4gICAgICAgICAgcHEuZW5xdWV1ZSh7IHZlcnRleDogZWRnZS50bywgZGlzdGFuY2U6IG5ld0Rpc3RhbmNlIH0sIG5ld0Rpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZGlzdGFuY2VzO1xuICB9XG4gIFxuICAvLyDjgrDjg6njg5Xjga7jg47jg7zjg4nmlbDjgpLlj5blvpdcbiAgZ2V0VmVydGV4Q291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hZGphY2VuY3lMaXN0Lmxlbmd0aDtcbiAgfVxuICBcbiAgLy8g44Kw44Op44OV44Gu44Ko44OD44K45pWw44KS5Y+W5b6XXG4gIGdldEVkZ2VDb3VudCgpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBlZGdlcyBvZiB0aGlzLmFkamFjZW5jeUxpc3QpIHtcbiAgICAgIGNvdW50ICs9IGVkZ2VzLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHF1aWNrU29ydDxUPihhcnI6IFRbXSwgbGVmdDogbnVtYmVyID0gMCwgcmlnaHQ6IG51bWJlciA9IGFyci5sZW5ndGggLSAxKTogVFtdIHtcbiAgaWYgKGxlZnQgPCByaWdodCkge1xuICAgIGNvbnN0IHBpdm90SW5kZXggPSBwYXJ0aXRpb24oYXJyLCBsZWZ0LCByaWdodCk7XG4gICAgcXVpY2tTb3J0KGFyciwgbGVmdCwgcGl2b3RJbmRleCAtIDEpO1xuICAgIHF1aWNrU29ydChhcnIsIHBpdm90SW5kZXggKyAxLCByaWdodCk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gcGFydGl0aW9uPFQ+KGFycjogVFtdLCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBwaXZvdCA9IGFycltyaWdodF07XG4gIGxldCBpID0gbGVmdCAtIDE7XG4gIFxuICBmb3IgKGxldCBqID0gbGVmdDsgaiA8IHJpZ2h0OyBqKyspIHtcbiAgICBpZiAoYXJyW2pdIDw9IHBpdm90KSB7XG4gICAgICBpKys7XG4gICAgICBbYXJyW2ldLCBhcnJbal1dID0gW2FycltqXSwgYXJyW2ldXTtcbiAgICB9XG4gIH1cbiAgXG4gIFthcnJbaSArIDFdLCBhcnJbcmlnaHRdXSA9IFthcnJbcmlnaHRdLCBhcnJbaSArIDFdXTtcbiAgcmV0dXJuIGkgKyAxO1xufSIsImltcG9ydCB7IEdyYXBoIH0gZnJvbSAnLi4vYWxnb3JpdGhtcy9ncmFwaCc7XG5pbXBvcnQgeyBXYXNtR3JhcGggfSBmcm9tICcuLi93YXNtV3JhcHBlcic7XG5cbmludGVyZmFjZSBCZW5jaG1hcmtSZXN1bHQge1xuICB0eXBlc2NyaXB0OiB7XG4gICAgdGltZTogbnVtYmVyO1xuICAgIG1lbW9yeTogbnVtYmVyO1xuICB9O1xuICB3YXNtOiB7XG4gICAgdGltZTogbnVtYmVyO1xuICAgIG1lbW9yeTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuR3JhcGhCZW5jaG1hcmsobm9kZUNvdW50OiBudW1iZXIpOiBQcm9taXNlPEJlbmNobWFya1Jlc3VsdD4ge1xuICAvLyDmjIflrprjgZXjgozjgZ/jg47jg7zjg4nmlbDjgafjg6njg7Pjg4Djg6DjgarjgrDjg6njg5XjgpLnlJ/miJBcbiAgY29uc3QgZ2VuZXJhdGVSYW5kb21HcmFwaCA9IChub2RlczogbnVtYmVyKTogeyBncmFwaDogR3JhcGgsIGVkZ2VzOiBudW1iZXIgfSA9PiB7XG4gICAgY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgobm9kZXMpO1xuICAgIGxldCBlZGdlQ291bnQgPSAwO1xuICAgIFxuICAgIC8vIOWQhOODjuODvOODieOBi+OCieW5s+WdhzXjgaTjga7jgqjjg4PjgrjjgpLov73liqBcbiAgICBjb25zdCBlZGdlc1Blck5vZGUgPSA1O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXM7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlZGdlc1Blck5vZGU7IGorKykge1xuICAgICAgICBjb25zdCB0byA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vZGVzKTtcbiAgICAgICAgY29uc3Qgd2VpZ2h0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgICAgIFxuICAgICAgICBpZiAoaSAhPT0gdG8pIHtcbiAgICAgICAgICBncmFwaC5hZGRFZGdlKGksIHRvLCB3ZWlnaHQpO1xuICAgICAgICAgIGVkZ2VDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGdyYXBoLCBlZGdlczogZWRnZUNvdW50IH07XG4gIH07XG4gIFxuICAvLyBUeXBlU2NyaXB05a6f6KOF44Gu44OZ44Oz44OB44Oe44O844KvXG4gIGNvbnN0IHRzQmVmb3JlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHRzTWVtb3J5QmVmb3JlID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHsgZ3JhcGg6IHRzR3JhcGggfSA9IGdlbmVyYXRlUmFuZG9tR3JhcGgobm9kZUNvdW50KTtcbiAgY29uc3QgdHNSZXN1bHQgPSB0c0dyYXBoLmRpamtzdHJhKDApOyAvLyDjg47jg7zjg4kw44GL44KJ44Gu5pyA55+t57WM6LevXG4gIFxuICBjb25zdCB0c0FmdGVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHRzTWVtb3J5QWZ0ZXIgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgY29uc3QgdHNUaW1lID0gdHNBZnRlciAtIHRzQmVmb3JlO1xuICBjb25zdCB0c01lbW9yeSA9ICh0c01lbW9yeUFmdGVyIC0gdHNNZW1vcnlCZWZvcmUpIC8gKDEwMjQgKiAxMDI0KTsgLy8gTULljZjkvY1cbiAgXG4gIC8vIFdhc23lrp/oo4Xjga7jg5njg7Pjg4Hjg57jg7zjgq9cbiAgY29uc3Qgd2FzbUJlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB3YXNtTWVtb3J5QmVmb3JlID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHdhc21HcmFwaCA9IGF3YWl0IFdhc21HcmFwaC5jcmVhdGUobm9kZUNvdW50KTtcbiAgXG4gIC8vIOWQjOOBmOOCsOODqeODleOCkuWGjeePvuOBmeOCi+OBn+OCgeOBruS5seaVsOOCt+ODvOODieOCkuODquOCu+ODg+ODiFxuICAvLyDlrp/pmpvjga7lrp/oo4Xjgafjga/jgIHlkIzjgZjjgqjjg4PjgrjjgpLov73liqDjgZnjgovjgZ/jgoHjga7jg63jgrjjg4Pjgq/jgYzlv4XopoFcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQ291bnQ7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgICBjb25zdCB0byA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vZGVDb3VudCk7XG4gICAgICBjb25zdCB3ZWlnaHQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICAgIFxuICAgICAgaWYgKGkgIT09IHRvKSB7XG4gICAgICAgIHdhc21HcmFwaC5hZGRFZGdlKGksIHRvLCB3ZWlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgY29uc3Qgd2FzbVJlc3VsdCA9IHdhc21HcmFwaC5kaWprc3RyYSgwKTtcbiAgXG4gIGNvbnN0IHdhc21BZnRlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB3YXNtTWVtb3J5QWZ0ZXIgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgY29uc3Qgd2FzbVRpbWUgPSB3YXNtQWZ0ZXIgLSB3YXNtQmVmb3JlO1xuICBjb25zdCB3YXNtTWVtb3J5ID0gKHdhc21NZW1vcnlBZnRlciAtIHdhc21NZW1vcnlCZWZvcmUpIC8gKDEwMjQgKiAxMDI0KTsgLy8gTULljZjkvY1cbiAgXG4gIHJldHVybiB7XG4gICAgdHlwZXNjcmlwdDoge1xuICAgICAgdGltZTogdHNUaW1lLFxuICAgICAgbWVtb3J5OiB0c01lbW9yeVxuICAgIH0sXG4gICAgd2FzbToge1xuICAgICAgdGltZTogd2FzbVRpbWUsXG4gICAgICBtZW1vcnk6IHdhc21NZW1vcnlcbiAgICB9XG4gIH07XG59IiwiaW1wb3J0IHsgcXVpY2tTb3J0IH0gZnJvbSAnLi4vYWxnb3JpdGhtcy9xdWlja1NvcnQnO1xuaW1wb3J0IHsgd2FzbVF1aWNrU29ydCB9IGZyb20gJy4uL3dhc21XcmFwcGVyJztcblxuaW50ZXJmYWNlIEJlbmNobWFya1Jlc3VsdCB7XG4gIHR5cGVzY3JpcHQ6IHtcbiAgICB0aW1lOiBudW1iZXI7XG4gICAgbWVtb3J5OiBudW1iZXI7XG4gIH07XG4gIHdhc206IHtcbiAgICB0aW1lOiBudW1iZXI7XG4gICAgbWVtb3J5OiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5Tb3J0aW5nQmVuY2htYXJrKHNpemU6IG51bWJlcik6IFByb21pc2U8QmVuY2htYXJrUmVzdWx0PiB7XG4gIC8vIOODqeODs+ODgOODoOOBqumFjeWIl+OCkueUn+aIkFxuICBjb25zdCBnZW5lcmF0ZVJhbmRvbUFycmF5ID0gKG46IG51bWJlcik6IG51bWJlcltdID0+IHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgYXJyLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuICBcbiAgLy8gVHlwZVNjcmlwdOWun+ijheOBruODmeODs+ODgeODnuODvOOCr1xuICBjb25zdCB0c0FycmF5ID0gZ2VuZXJhdGVSYW5kb21BcnJheShzaXplKTtcbiAgY29uc3QgdHNCZWZvcmUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3QgdHNNZW1vcnlCZWZvcmUgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgcXVpY2tTb3J0KFsuLi50c0FycmF5XSk7XG4gIFxuICBjb25zdCB0c0FmdGVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHRzTWVtb3J5QWZ0ZXIgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgY29uc3QgdHNUaW1lID0gdHNBZnRlciAtIHRzQmVmb3JlO1xuICBjb25zdCB0c01lbW9yeSA9ICh0c01lbW9yeUFmdGVyIC0gdHNNZW1vcnlCZWZvcmUpIC8gKDEwMjQgKiAxMDI0KTsgLy8gTULljZjkvY1cbiAgXG4gIC8vIFdhc23lrp/oo4Xjga7jg5njg7Pjg4Hjg57jg7zjgq9cbiAgY29uc3Qgd2FzbUFycmF5ID0gZ2VuZXJhdGVSYW5kb21BcnJheShzaXplKTtcbiAgY29uc3Qgd2FzbUJlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB3YXNtTWVtb3J5QmVmb3JlID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGF3YWl0IHdhc21RdWlja1NvcnQoWy4uLndhc21BcnJheV0pO1xuICBcbiAgY29uc3Qgd2FzbUFmdGVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHdhc21NZW1vcnlBZnRlciA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBjb25zdCB3YXNtVGltZSA9IHdhc21BZnRlciAtIHdhc21CZWZvcmU7XG4gIGNvbnN0IHdhc21NZW1vcnkgPSAod2FzbU1lbW9yeUFmdGVyIC0gd2FzbU1lbW9yeUJlZm9yZSkgLyAoMTAyNCAqIDEwMjQpOyAvLyBNQuWNmOS9jVxuICBcbiAgcmV0dXJuIHtcbiAgICB0eXBlc2NyaXB0OiB7XG4gICAgICB0aW1lOiB0c1RpbWUsXG4gICAgICBtZW1vcnk6IHRzTWVtb3J5XG4gICAgfSxcbiAgICB3YXNtOiB7XG4gICAgICB0aW1lOiB3YXNtVGltZSxcbiAgICAgIG1lbW9yeTogd2FzbU1lbW9yeVxuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgeyBBVkxUcmVlIH0gZnJvbSAnLi4vYWxnb3JpdGhtcy9hdmxUcmVlJztcbmltcG9ydCB7IFdhc21BVkxUcmVlIH0gZnJvbSAnLi4vd2FzbVdyYXBwZXInO1xuXG5pbnRlcmZhY2UgQmVuY2htYXJrUmVzdWx0IHtcbiAgdHlwZXNjcmlwdDoge1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICBtZW1vcnk6IG51bWJlcjtcbiAgfTtcbiAgd2FzbToge1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICBtZW1vcnk6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1blRyZWVCZW5jaG1hcmsoc2l6ZTogbnVtYmVyKTogUHJvbWlzZTxCZW5jaG1hcmtSZXN1bHQ+IHtcbiAgLy8g44Op44Oz44OA44Og44Gq5pWw5YCk6YWN5YiX44KS55Sf5oiQXG4gIGNvbnN0IGdlbmVyYXRlUmFuZG9tTnVtYmVycyA9IChuOiBudW1iZXIpOiBudW1iZXJbXSA9PiB7XG4gICAgY29uc3QgbnVtYmVycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBudW1iZXJzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVtYmVycztcbiAgfTtcbiAgXG4gIGNvbnN0IG51bWJlcnMgPSBnZW5lcmF0ZVJhbmRvbU51bWJlcnMoc2l6ZSk7XG4gIGNvbnN0IHNlYXJjaE51bWJlcnMgPSBnZW5lcmF0ZVJhbmRvbU51bWJlcnMoMTAwMCk7IC8vIOaknOe0oueUqOOBruaVsOWApFxuICBcbiAgLy8gVHlwZVNjcmlwdOWun+ijheOBruODmeODs+ODgeODnuODvOOCr1xuICBjb25zdCB0c0JlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB0c01lbW9yeUJlZm9yZSA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBjb25zdCB0c1RyZWUgPSBuZXcgQVZMVHJlZSgpO1xuICBcbiAgLy8g5oy/5YWl5pON5L2cXG4gIGZvciAoY29uc3QgbnVtIG9mIG51bWJlcnMpIHtcbiAgICB0c1RyZWUuaW5zZXJ0KG51bSk7XG4gIH1cbiAgXG4gIC8vIOaknOe0ouaTjeS9nFxuICBmb3IgKGNvbnN0IG51bSBvZiBzZWFyY2hOdW1iZXJzKSB7XG4gICAgdHNUcmVlLnNlYXJjaChudW0pO1xuICB9XG4gIFxuICBjb25zdCB0c0FmdGVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHRzTWVtb3J5QWZ0ZXIgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgY29uc3QgdHNUaW1lID0gdHNBZnRlciAtIHRzQmVmb3JlO1xuICBjb25zdCB0c01lbW9yeSA9ICh0c01lbW9yeUFmdGVyIC0gdHNNZW1vcnlCZWZvcmUpIC8gKDEwMjQgKiAxMDI0KTsgLy8gTULljZjkvY1cbiAgXG4gIC8vIFdhc23lrp/oo4Xjga7jg5njg7Pjg4Hjg57jg7zjgq9cbiAgY29uc3Qgd2FzbUJlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB3YXNtTWVtb3J5QmVmb3JlID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHdhc21UcmVlID0gYXdhaXQgV2FzbUFWTFRyZWUuY3JlYXRlKCk7XG4gIFxuICAvLyDmjL/lhaXmk43kvZxcbiAgZm9yIChjb25zdCBudW0gb2YgbnVtYmVycykge1xuICAgIHdhc21UcmVlLmluc2VydChudW0pO1xuICB9XG4gIFxuICAvLyDmpJzntKLmk43kvZxcbiAgZm9yIChjb25zdCBudW0gb2Ygc2VhcmNoTnVtYmVycykge1xuICAgIHdhc21UcmVlLnNlYXJjaChudW0pO1xuICB9XG4gIFxuICBjb25zdCB3YXNtQWZ0ZXIgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3Qgd2FzbU1lbW9yeUFmdGVyID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHdhc21UaW1lID0gd2FzbUFmdGVyIC0gd2FzbUJlZm9yZTtcbiAgY29uc3Qgd2FzbU1lbW9yeSA9ICh3YXNtTWVtb3J5QWZ0ZXIgLSB3YXNtTWVtb3J5QmVmb3JlKSAvICgxMDI0ICogMTAyNCk7IC8vIE1C5Y2Y5L2NXG4gIFxuICByZXR1cm4ge1xuICAgIHR5cGVzY3JpcHQ6IHtcbiAgICAgIHRpbWU6IHRzVGltZSxcbiAgICAgIG1lbW9yeTogdHNNZW1vcnlcbiAgICB9LFxuICAgIHdhc206IHtcbiAgICAgIHRpbWU6IHdhc21UaW1lLFxuICAgICAgbWVtb3J5OiB3YXNtTWVtb3J5XG4gICAgfVxuICB9O1xufSIsIi8vIFdhc23nlJ/miJDmmYLjgavkvZzmiJDjgZXjgozjgovlnovlrprnvqnjgpLkvb/nlKjvvIjlrp/pmpvjga7lnovjga93YXNtLXBhY2sgYnVpbGTjgafnlJ/miJDjgZXjgozjgovvvIlcbmltcG9ydCBpbml0LCB7XG4gIHF1aWNrX3NvcnQsXG4gIEFWTFRyZWUgYXMgUnVzdEFWTFRyZWUsXG4gIEdyYXBoIGFzIFJ1c3RHcmFwaFxufSBmcm9tICcuLi8uLi9zcmMvcnVzdC9wa2cnO1xuXG4vLyDjg6Ljgrjjg6Xjg7zjg6vjga7liJ3mnJ/ljJbnirbmhYtcbmxldCB3YXNtSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0UHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IG51bGwgPSBudWxsO1xuXG4vLyBXYXNt44Oi44K444Ol44O844Or44Gu5Yid5pyf5YyWXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdFdhc20oKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICh3YXNtSW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgXG4gIGlmICghaW5pdFByb21pc2UpIHtcbiAgICBpbml0UHJvbWlzZSA9IGluaXQoKS50aGVuKCgpID0+IHtcbiAgICAgIHdhc21Jbml0aWFsaXplZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmxvZygnV2ViQXNzZW1ibHkgbW9kdWxlIGluaXRpYWxpemVkJyk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHJldHVybiBpbml0UHJvbWlzZTtcbn1cblxuLy8g44Kv44Kk44OD44Kv44K944O844OI44Gu44Op44OD44OR44O8XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd2FzbVF1aWNrU29ydChhcnI6IG51bWJlcltdKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICBhd2FpdCBpbml0V2FzbSgpO1xuICByZXR1cm4gQXJyYXkuZnJvbShxdWlja19zb3J0KG5ldyBJbnQzMkFycmF5KGFycikpKTtcbn1cblxuLy8gQVZM5pyo44Gu44Op44OD44OR44O844Kv44Op44K5XG5leHBvcnQgY2xhc3MgV2FzbUFWTFRyZWUge1xuICBwcml2YXRlIHRyZWU6IFJ1c3RBVkxUcmVlO1xuICBcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRyZWUgPSBuZXcgUnVzdEFWTFRyZWUoKTtcbiAgfVxuICBcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPFdhc21BVkxUcmVlPiB7XG4gICAgYXdhaXQgaW5pdFdhc20oKTtcbiAgICByZXR1cm4gbmV3IFdhc21BVkxUcmVlKCk7XG4gIH1cbiAgXG4gIGluc2VydCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50cmVlLmluc2VydCh2YWx1ZSk7XG4gIH1cbiAgXG4gIHNlYXJjaCh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHJlZS5zZWFyY2godmFsdWUpO1xuICB9XG59XG5cbi8vIOOCsOODqeODleOBruODqeODg+ODkeODvOOCr+ODqeOCuVxuZXhwb3J0IGNsYXNzIFdhc21HcmFwaCB7XG4gIHByaXZhdGUgZ3JhcGg6IFJ1c3RHcmFwaDtcbiAgXG4gIHByaXZhdGUgY29uc3RydWN0b3IobnVtVmVydGljZXM6IG51bWJlcikge1xuICAgIHRoaXMuZ3JhcGggPSBuZXcgUnVzdEdyYXBoKG51bVZlcnRpY2VzKTtcbiAgfVxuICBcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShudW1WZXJ0aWNlczogbnVtYmVyKTogUHJvbWlzZTxXYXNtR3JhcGg+IHtcbiAgICBhd2FpdCBpbml0V2FzbSgpO1xuICAgIHJldHVybiBuZXcgV2FzbUdyYXBoKG51bVZlcnRpY2VzKTtcbiAgfVxuICBcbiAgYWRkRWRnZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ncmFwaC5hZGRfZWRnZShmcm9tLCB0bywgd2VpZ2h0KTtcbiAgfVxuICBcbiAgZGlqa3N0cmEoc3RhcnRWZXJ0ZXg6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmdyYXBoLmRpamtzdHJhKHN0YXJ0VmVydGV4KSk7XG4gIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYmVuY2htYXJrXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJpbXBvcnQgeyBydW5Tb3J0aW5nQmVuY2htYXJrIH0gZnJvbSAnLi9iZW5jaG1hcmtzL3NvcnRCZW5jaG1hcmsnO1xuaW1wb3J0IHsgcnVuVHJlZUJlbmNobWFyayB9IGZyb20gJy4vYmVuY2htYXJrcy90cmVlQmVuY2htYXJrJztcbmltcG9ydCB7IHJ1bkdyYXBoQmVuY2htYXJrIH0gZnJvbSAnLi9iZW5jaG1hcmtzL2dyYXBoQmVuY2htYXJrJztcblxuKHdpbmRvdyBhcyBhbnkpLnJ1blNvcnRpbmdCZW5jaG1hcmsgPSBydW5Tb3J0aW5nQmVuY2htYXJrO1xuKHdpbmRvdyBhcyBhbnkpLnJ1blRyZWVCZW5jaG1hcmsgPSBydW5UcmVlQmVuY2htYXJrO1xuKHdpbmRvdyBhcyBhbnkpLnJ1bkdyYXBoQmVuY2htYXJrID0gcnVuR3JhcGhCZW5jaG1hcms7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=