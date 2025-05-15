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
/******/ 			"index": 0
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
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _benchmarks_sortBenchmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./benchmarks/sortBenchmark */ "./src/ts/benchmarks/sortBenchmark.ts");
/* harmony import */ var _benchmarks_treeBenchmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./benchmarks/treeBenchmark */ "./src/ts/benchmarks/treeBenchmark.ts");
/* harmony import */ var _benchmarks_graphBenchmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./benchmarks/graphBenchmark */ "./src/ts/benchmarks/graphBenchmark.ts");



// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    // ソートベンチマークの設定
    const sortButton = document.getElementById('run-sort-benchmark');
    sortButton.addEventListener('click', async () => {
        const sizeSelect = document.getElementById('sort-size');
        const size = parseInt(sizeSelect.value, 10);
        const resultsDiv = document.getElementById('sort-results');
        resultsDiv.innerHTML = '<p>Running benchmark...</p>';
        // 非同期でベンチマークを実行
        setTimeout(async () => {
            const results = await (0,_benchmarks_sortBenchmark__WEBPACK_IMPORTED_MODULE_0__.runSortingBenchmark)(size);
            displayResults(resultsDiv, results);
        }, 100);
    });
    // ツリーベンチマークの設定
    const treeButton = document.getElementById('run-tree-benchmark');
    treeButton.addEventListener('click', async () => {
        const sizeSelect = document.getElementById('tree-size');
        const size = parseInt(sizeSelect.value, 10);
        const resultsDiv = document.getElementById('tree-results');
        resultsDiv.innerHTML = '<p>Running benchmark...</p>';
        setTimeout(async () => {
            const results = await (0,_benchmarks_treeBenchmark__WEBPACK_IMPORTED_MODULE_1__.runTreeBenchmark)(size);
            displayResults(resultsDiv, results);
        }, 100);
    });
    // グラフベンチマークの設定
    const graphButton = document.getElementById('run-graph-benchmark');
    graphButton.addEventListener('click', async () => {
        const sizeSelect = document.getElementById('graph-size');
        const size = parseInt(sizeSelect.value, 10);
        const resultsDiv = document.getElementById('graph-results');
        resultsDiv.innerHTML = '<p>Running benchmark...</p>';
        setTimeout(async () => {
            const results = await (0,_benchmarks_graphBenchmark__WEBPACK_IMPORTED_MODULE_2__.runGraphBenchmark)(size);
            displayResults(resultsDiv, results);
        }, 100);
    });
});
// 結果表示用の関数
function displayResults(container, results) {
    const table = document.createElement('table');
    // テーブルヘッダー
    const headerRow = document.createElement('tr');
    const headers = ['Implementation', 'Execution Time (ms)', 'Memory Used (MB)'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    // TypeScript結果
    const tsRow = document.createElement('tr');
    const tsNameCell = document.createElement('td');
    tsNameCell.textContent = 'TypeScript';
    const tsTimeCell = document.createElement('td');
    tsTimeCell.textContent = results.typescript.time.toFixed(2);
    const tsMemoryCell = document.createElement('td');
    tsMemoryCell.textContent = results.typescript.memory.toFixed(2);
    tsRow.appendChild(tsNameCell);
    tsRow.appendChild(tsTimeCell);
    tsRow.appendChild(tsMemoryCell);
    table.appendChild(tsRow);
    // Wasm結果
    const wasmRow = document.createElement('tr');
    const wasmNameCell = document.createElement('td');
    wasmNameCell.textContent = 'WebAssembly';
    const wasmTimeCell = document.createElement('td');
    wasmTimeCell.textContent = results.wasm.time.toFixed(2);
    const wasmMemoryCell = document.createElement('td');
    wasmMemoryCell.textContent = results.wasm.memory.toFixed(2);
    wasmRow.appendChild(wasmNameCell);
    wasmRow.appendChild(wasmTimeCell);
    wasmRow.appendChild(wasmMemoryCell);
    table.appendChild(wasmRow);
    // 比較結果
    const comparisonRow = document.createElement('tr');
    const comparisonNameCell = document.createElement('td');
    comparisonNameCell.textContent = 'Improvement';
    const timeImprovement = (results.typescript.time / results.wasm.time).toFixed(2);
    const memoryImprovement = (results.typescript.memory / results.wasm.memory).toFixed(2);
    const comparisonTimeCell = document.createElement('td');
    comparisonTimeCell.textContent = `${timeImprovement}x faster`;
    const comparisonMemoryCell = document.createElement('td');
    comparisonMemoryCell.textContent = `${memoryImprovement}x less memory`;
    comparisonRow.appendChild(comparisonNameCell);
    comparisonRow.appendChild(comparisonTimeCell);
    comparisonRow.appendChild(comparisonMemoryCell);
    table.appendChild(comparisonRow);
    // テーブルを表示
    container.innerHTML = '';
    container.appendChild(table);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQztJQUNuRCxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsa0JBQWtCLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztJQUMvQyxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsa0JBQWtCLENBQUMsV0FBVyxHQUFHLEdBQUcsZUFBZSxVQUFVLENBQUM7SUFDOUQsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixDQUFDLFdBQVcsR0FBRyxHQUFHLGlCQUFpQixlQUFlLENBQUM7SUFFdkUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlDLGFBQWEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QyxhQUFhLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVqQyxVQUFVO0lBQ1YsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDekIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi8uL3NyYy9ydXN0L3BrZy9ydXN0LmpzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vLi9zcmMvdHMvYWxnb3JpdGhtcy9hdmxUcmVlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vLi9zcmMvdHMvYWxnb3JpdGhtcy9ncmFwaC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2FsZ29yaXRobXMvcXVpY2tTb3J0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vLi9zcmMvdHMvYmVuY2htYXJrcy9ncmFwaEJlbmNobWFyay50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2JlbmNobWFya3Mvc29ydEJlbmNobWFyay50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL2JlbmNobWFya3MvdHJlZUJlbmNobWFyay50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uLy4vc3JjL3RzL3dhc21XcmFwcGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC13YXNtLWFsZ29yaXRobXMtY29tcGFyaXNvbi93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LXdhc20tYWxnb3JpdGhtcy1jb21wYXJpc29uL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3R5cGVzY3JpcHQtd2FzbS1hbGdvcml0aG1zLWNvbXBhcmlzb24vLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHdhc207XG5cbmNvbnN0IGNhY2hlZFRleHREZWNvZGVyID0gKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgVGV4dERlY29kZXIoJ3V0Zi04JywgeyBpZ25vcmVCT006IHRydWUsIGZhdGFsOiB0cnVlIH0pIDogeyBkZWNvZGU6ICgpID0+IHsgdGhyb3cgRXJyb3IoJ1RleHREZWNvZGVyIG5vdCBhdmFpbGFibGUnKSB9IH0gKTtcblxuaWYgKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcpIHsgY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKCk7IH07XG5cbmxldCBjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9IG51bGw7XG5cbmZ1bmN0aW9uIGdldFVpbnQ4QXJyYXlNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWRVaW50OEFycmF5TWVtb3J5MC5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZFVpbnQ4QXJyYXlNZW1vcnkwO1xufVxuXG5mdW5jdGlvbiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyLCBsZW4pIHtcbiAgICBwdHIgPSBwdHIgPj4+IDA7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OEFycmF5TWVtb3J5MCgpLnN1YmFycmF5KHB0ciwgcHRyICsgbGVuKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluX2pzKCkge1xuICAgIHdhc20ubWFpbl9qcygpO1xufVxuXG5sZXQgY2FjaGVkVWludDMyQXJyYXlNZW1vcnkwID0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0VWludDMyQXJyYXlNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWRVaW50MzJBcnJheU1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVkVWludDMyQXJyYXlNZW1vcnkwLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgY2FjaGVkVWludDMyQXJyYXlNZW1vcnkwID0gbmV3IFVpbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRVaW50MzJBcnJheU1lbW9yeTA7XG59XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5mdW5jdGlvbiBwYXNzQXJyYXkzMlRvV2FzbTAoYXJnLCBtYWxsb2MpIHtcbiAgICBjb25zdCBwdHIgPSBtYWxsb2MoYXJnLmxlbmd0aCAqIDQsIDQpID4+PiAwO1xuICAgIGdldFVpbnQzMkFycmF5TWVtb3J5MCgpLnNldChhcmcsIHB0ciAvIDQpO1xuICAgIFdBU01fVkVDVE9SX0xFTiA9IGFyZy5sZW5ndGg7XG4gICAgcmV0dXJuIHB0cjtcbn1cblxubGV0IGNhY2hlZEludDMyQXJyYXlNZW1vcnkwID0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0SW50MzJBcnJheU1lbW9yeTAoKSB7XG4gICAgaWYgKGNhY2hlZEludDMyQXJyYXlNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZEludDMyQXJyYXlNZW1vcnkwLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgY2FjaGVkSW50MzJBcnJheU1lbW9yeTAgPSBuZXcgSW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkSW50MzJBcnJheU1lbW9yeTA7XG59XG5cbmZ1bmN0aW9uIGdldEFycmF5STMyRnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcHRyID0gcHRyID4+PiAwO1xuICAgIHJldHVybiBnZXRJbnQzMkFycmF5TWVtb3J5MCgpLnN1YmFycmF5KHB0ciAvIDQsIHB0ciAvIDQgKyBsZW4pO1xufVxuLyoqXG4gKiBAcGFyYW0ge0ludDMyQXJyYXl9IGFyclxuICogQHJldHVybnMge0ludDMyQXJyYXl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWlja19zb3J0KGFycikge1xuICAgIGNvbnN0IHB0cjAgPSBwYXNzQXJyYXkzMlRvV2FzbTAoYXJyLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKTtcbiAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIGNvbnN0IHJldCA9IHdhc20ucXVpY2tfc29ydChwdHIwLCBsZW4wKTtcbiAgICB2YXIgdjIgPSBnZXRBcnJheUkzMkZyb21XYXNtMChyZXRbMF0sIHJldFsxXSkuc2xpY2UoKTtcbiAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShyZXRbMF0sIHJldFsxXSAqIDQsIDQpO1xuICAgIHJldHVybiB2Mjtcbn1cblxuY29uc3QgQVZMVHJlZUZpbmFsaXphdGlvbiA9ICh0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnKVxuICAgID8geyByZWdpc3RlcjogKCkgPT4ge30sIHVucmVnaXN0ZXI6ICgpID0+IHt9IH1cbiAgICA6IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShwdHIgPT4gd2FzbS5fX3diZ19hdmx0cmVlX2ZyZWUocHRyID4+PiAwLCAxKSk7XG5cbmV4cG9ydCBjbGFzcyBBVkxUcmVlIHtcblxuICAgIF9fZGVzdHJveV9pbnRvX3JhdygpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcbiAgICAgICAgQVZMVHJlZUZpbmFsaXphdGlvbi51bnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH1cblxuICAgIGZyZWUoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XG4gICAgICAgIHdhc20uX193YmdfYXZsdHJlZV9mcmVlKHB0ciwgMCk7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCByZXQgPSB3YXNtLmF2bHRyZWVfbmV3KCk7XG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gcmV0ID4+PiAwO1xuICAgICAgICBBVkxUcmVlRmluYWxpemF0aW9uLnJlZ2lzdGVyKHRoaXMsIHRoaXMuX193YmdfcHRyLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqL1xuICAgIGluc2VydCh2YWx1ZSkge1xuICAgICAgICB3YXNtLmF2bHRyZWVfaW5zZXJ0KHRoaXMuX193YmdfcHRyLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNlYXJjaCh2YWx1ZSkge1xuICAgICAgICBjb25zdCByZXQgPSB3YXNtLmF2bHRyZWVfc2VhcmNoKHRoaXMuX193YmdfcHRyLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiByZXQgIT09IDA7XG4gICAgfVxufVxuXG5jb25zdCBHcmFwaEZpbmFsaXphdGlvbiA9ICh0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnKVxuICAgID8geyByZWdpc3RlcjogKCkgPT4ge30sIHVucmVnaXN0ZXI6ICgpID0+IHt9IH1cbiAgICA6IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShwdHIgPT4gd2FzbS5fX3diZ19ncmFwaF9mcmVlKHB0ciA+Pj4gMCwgMSkpO1xuXG5leHBvcnQgY2xhc3MgR3JhcGgge1xuXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fd2JnX3B0cjtcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xuICAgICAgICBHcmFwaEZpbmFsaXphdGlvbi51bnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH1cblxuICAgIGZyZWUoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XG4gICAgICAgIHdhc20uX193YmdfZ3JhcGhfZnJlZShwdHIsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtX3ZlcnRpY2VzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobnVtX3ZlcnRpY2VzKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uZ3JhcGhfbmV3KG51bV92ZXJ0aWNlcyk7XG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gcmV0ID4+PiAwO1xuICAgICAgICBHcmFwaEZpbmFsaXphdGlvbi5yZWdpc3Rlcih0aGlzLCB0aGlzLl9fd2JnX3B0ciwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3ZWlnaHRcbiAgICAgKi9cbiAgICBhZGRfZWRnZShmcm9tLCB0bywgd2VpZ2h0KSB7XG4gICAgICAgIHdhc20uZ3JhcGhfYWRkX2VkZ2UodGhpcy5fX3diZ19wdHIsIGZyb20sIHRvLCB3ZWlnaHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRfdmVydGV4XG4gICAgICogQHJldHVybnMge0ludDMyQXJyYXl9XG4gICAgICovXG4gICAgZGlqa3N0cmEoc3RhcnRfdmVydGV4KSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uZ3JhcGhfZGlqa3N0cmEodGhpcy5fX3diZ19wdHIsIHN0YXJ0X3ZlcnRleCk7XG4gICAgICAgIHZhciB2MSA9IGdldEFycmF5STMyRnJvbVdhc20wKHJldFswXSwgcmV0WzFdKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShyZXRbMF0sIHJldFsxXSAqIDQsIDQpO1xuICAgICAgICByZXR1cm4gdjE7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfX3diZ19sb2FkKG1vZHVsZSwgaW1wb3J0cykge1xuICAgIGlmICh0eXBlb2YgUmVzcG9uc2UgPT09ICdmdW5jdGlvbicgJiYgbW9kdWxlIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcobW9kdWxlLCBpbXBvcnRzKTtcblxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChtb2R1bGUuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpICE9ICdhcHBsaWNhdGlvbi93YXNtJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmdgIGZhaWxlZCBiZWNhdXNlIHlvdXIgc2VydmVyIGRvZXMgbm90IHNlcnZlIFdhc20gd2l0aCBgYXBwbGljYXRpb24vd2FzbWAgTUlNRSB0eXBlLiBGYWxsaW5nIGJhY2sgdG8gYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlYCB3aGljaCBpcyBzbG93ZXIuIE9yaWdpbmFsIGVycm9yOlxcblwiLCBlKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCBtb2R1bGUuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJ5dGVzLCBpbXBvcnRzKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUobW9kdWxlLCBpbXBvcnRzKTtcblxuICAgICAgICBpZiAoaW5zdGFuY2UgaW5zdGFuY2VvZiBXZWJBc3NlbWJseS5JbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaW5zdGFuY2UsIG1vZHVsZSB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9fd2JnX2dldF9pbXBvcnRzKCkge1xuICAgIGNvbnN0IGltcG9ydHMgPSB7fTtcbiAgICBpbXBvcnRzLndiZyA9IHt9O1xuICAgIGltcG9ydHMud2JnLl9fd2JnX2xvZ19kN2JlNmZlYWUxMTdkNzQ4ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSkpO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9pbml0X2V4dGVybnJlZl90YWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0YWJsZSA9IHdhc20uX193YmluZGdlbl9leHBvcnRfMDtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGFibGUuZ3Jvdyg0KTtcbiAgICAgICAgdGFibGUuc2V0KDAsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRhYmxlLnNldChvZmZzZXQgKyAwLCB1bmRlZmluZWQpO1xuICAgICAgICB0YWJsZS5zZXQob2Zmc2V0ICsgMSwgbnVsbCk7XG4gICAgICAgIHRhYmxlLnNldChvZmZzZXQgKyAyLCB0cnVlKTtcbiAgICAgICAgdGFibGUuc2V0KG9mZnNldCArIDMsIGZhbHNlKTtcbiAgICAgICAgO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl90aHJvdyA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBpbXBvcnRzO1xufVxuXG5mdW5jdGlvbiBfX3diZ19pbml0X21lbW9yeShpbXBvcnRzLCBtZW1vcnkpIHtcblxufVxuXG5mdW5jdGlvbiBfX3diZ19maW5hbGl6ZV9pbml0KGluc3RhbmNlLCBtb2R1bGUpIHtcbiAgICB3YXNtID0gaW5zdGFuY2UuZXhwb3J0cztcbiAgICBfX3diZ19pbml0Ll9fd2JpbmRnZW5fd2FzbV9tb2R1bGUgPSBtb2R1bGU7XG4gICAgY2FjaGVkSW50MzJBcnJheU1lbW9yeTAgPSBudWxsO1xuICAgIGNhY2hlZFVpbnQzMkFycmF5TWVtb3J5MCA9IG51bGw7XG4gICAgY2FjaGVkVWludDhBcnJheU1lbW9yeTAgPSBudWxsO1xuXG5cbiAgICB3YXNtLl9fd2JpbmRnZW5fc3RhcnQoKTtcbiAgICByZXR1cm4gd2FzbTtcbn1cblxuZnVuY3Rpb24gaW5pdFN5bmMobW9kdWxlKSB7XG4gICAgaWYgKHdhc20gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHdhc207XG5cblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG1vZHVsZSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICh7bW9kdWxlfSA9IG1vZHVsZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybigndXNpbmcgZGVwcmVjYXRlZCBwYXJhbWV0ZXJzIGZvciBgaW5pdFN5bmMoKWA7IHBhc3MgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW1wb3J0cyA9IF9fd2JnX2dldF9pbXBvcnRzKCk7XG5cbiAgICBfX3diZ19pbml0X21lbW9yeShpbXBvcnRzKTtcblxuICAgIGlmICghKG1vZHVsZSBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lk1vZHVsZSkpIHtcbiAgICAgICAgbW9kdWxlID0gbmV3IFdlYkFzc2VtYmx5Lk1vZHVsZShtb2R1bGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG1vZHVsZSwgaW1wb3J0cyk7XG5cbiAgICByZXR1cm4gX193YmdfZmluYWxpemVfaW5pdChpbnN0YW5jZSwgbW9kdWxlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX193YmdfaW5pdChtb2R1bGVfb3JfcGF0aCkge1xuICAgIGlmICh3YXNtICE9PSB1bmRlZmluZWQpIHJldHVybiB3YXNtO1xuXG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZV9vcl9wYXRoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG1vZHVsZV9vcl9wYXRoKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgKHttb2R1bGVfb3JfcGF0aH0gPSBtb2R1bGVfb3JfcGF0aClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybigndXNpbmcgZGVwcmVjYXRlZCBwYXJhbWV0ZXJzIGZvciB0aGUgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb247IHBhc3MgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGVfb3JfcGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlX29yX3BhdGggPSBuZXcgVVJMKCdydXN0X2JnLndhc20nLCBpbXBvcnQubWV0YS51cmwpO1xuICAgIH1cbiAgICBjb25zdCBpbXBvcnRzID0gX193YmdfZ2V0X2ltcG9ydHMoKTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlX29yX3BhdGggPT09ICdzdHJpbmcnIHx8ICh0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGVfb3JfcGF0aCBpbnN0YW5jZW9mIFJlcXVlc3QpIHx8ICh0eXBlb2YgVVJMID09PSAnZnVuY3Rpb24nICYmIG1vZHVsZV9vcl9wYXRoIGluc3RhbmNlb2YgVVJMKSkge1xuICAgICAgICBtb2R1bGVfb3JfcGF0aCA9IGZldGNoKG1vZHVsZV9vcl9wYXRoKTtcbiAgICB9XG5cbiAgICBfX3diZ19pbml0X21lbW9yeShpbXBvcnRzKTtcblxuICAgIGNvbnN0IHsgaW5zdGFuY2UsIG1vZHVsZSB9ID0gYXdhaXQgX193YmdfbG9hZChhd2FpdCBtb2R1bGVfb3JfcGF0aCwgaW1wb3J0cyk7XG5cbiAgICByZXR1cm4gX193YmdfZmluYWxpemVfaW5pdChpbnN0YW5jZSwgbW9kdWxlKTtcbn1cblxuZXhwb3J0IHsgaW5pdFN5bmMgfTtcbmV4cG9ydCBkZWZhdWx0IF9fd2JnX2luaXQ7XG4iLCJpbnRlcmZhY2UgVHJlZU5vZGUge1xuICB2YWx1ZTogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbGVmdDogVHJlZU5vZGUgfCBudWxsO1xuICByaWdodDogVHJlZU5vZGUgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgQVZMVHJlZSB7XG4gIHJvb3Q6IFRyZWVOb2RlIHwgbnVsbCA9IG51bGw7XG4gIFxuICAvLyDjg47jg7zjg4njga7pq5jjgZXjgpLlj5blvpdcbiAgcHJpdmF0ZSBnZXRIZWlnaHQobm9kZTogVHJlZU5vZGUgfCBudWxsKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbm9kZSA/IG5vZGUuaGVpZ2h0IDogMDtcbiAgfVxuICBcbiAgLy8g44OQ44Op44Oz44K544OV44Kh44Kv44K/44O844KS6KiI566XXG4gIHByaXZhdGUgZ2V0QmFsYW5jZUZhY3Rvcihub2RlOiBUcmVlTm9kZSB8IG51bGwpOiBudW1iZXIge1xuICAgIHJldHVybiBub2RlID8gdGhpcy5nZXRIZWlnaHQobm9kZS5sZWZ0KSAtIHRoaXMuZ2V0SGVpZ2h0KG5vZGUucmlnaHQpIDogMDtcbiAgfVxuICBcbiAgLy8g44OO44O844OJ44Gu6auY44GV44KS5pu05pawXG4gIHByaXZhdGUgdXBkYXRlSGVpZ2h0KG5vZGU6IFRyZWVOb2RlKTogdm9pZCB7XG4gICAgbm9kZS5oZWlnaHQgPSBNYXRoLm1heCh0aGlzLmdldEhlaWdodChub2RlLmxlZnQpLCB0aGlzLmdldEhlaWdodChub2RlLnJpZ2h0KSkgKyAxO1xuICB9XG4gIFxuICAvLyDlj7Plm57ou6JcbiAgcHJpdmF0ZSByb3RhdGVSaWdodCh5OiBUcmVlTm9kZSk6IFRyZWVOb2RlIHtcbiAgICBjb25zdCB4ID0geS5sZWZ0IGFzIFRyZWVOb2RlO1xuICAgIGNvbnN0IFQyID0geC5yaWdodDtcbiAgICBcbiAgICB4LnJpZ2h0ID0geTtcbiAgICB5LmxlZnQgPSBUMjtcbiAgICBcbiAgICB0aGlzLnVwZGF0ZUhlaWdodCh5KTtcbiAgICB0aGlzLnVwZGF0ZUhlaWdodCh4KTtcbiAgICBcbiAgICByZXR1cm4geDtcbiAgfVxuICBcbiAgLy8g5bem5Zue6LuiXG4gIHByaXZhdGUgcm90YXRlTGVmdCh4OiBUcmVlTm9kZSk6IFRyZWVOb2RlIHtcbiAgICBjb25zdCB5ID0geC5yaWdodCBhcyBUcmVlTm9kZTtcbiAgICBjb25zdCBUMiA9IHkubGVmdDtcbiAgICBcbiAgICB5LmxlZnQgPSB4O1xuICAgIHgucmlnaHQgPSBUMjtcbiAgICBcbiAgICB0aGlzLnVwZGF0ZUhlaWdodCh4KTtcbiAgICB0aGlzLnVwZGF0ZUhlaWdodCh5KTtcbiAgICBcbiAgICByZXR1cm4geTtcbiAgfVxuICBcbiAgLy8g44OO44O844OJ44Gu5oy/5YWlXG4gIGluc2VydCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yb290ID0gdGhpcy5pbnNlcnROb2RlKHRoaXMucm9vdCwgdmFsdWUpO1xuICB9XG4gIFxuICBwcml2YXRlIGluc2VydE5vZGUobm9kZTogVHJlZU5vZGUgfCBudWxsLCB2YWx1ZTogbnVtYmVyKTogVHJlZU5vZGUge1xuICAgIC8vIOmAmuW4uOOBrkJTVOaMv+WFpVxuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZSwgaGVpZ2h0OiAxLCBsZWZ0OiBudWxsLCByaWdodDogbnVsbCB9O1xuICAgIH1cbiAgICBcbiAgICBpZiAodmFsdWUgPCBub2RlLnZhbHVlKSB7XG4gICAgICBub2RlLmxlZnQgPSB0aGlzLmluc2VydE5vZGUobm9kZS5sZWZ0LCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+IG5vZGUudmFsdWUpIHtcbiAgICAgIG5vZGUucmlnaHQgPSB0aGlzLmluc2VydE5vZGUobm9kZS5yaWdodCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDph43opIflgKTjga/oqLHlj6/jgZfjgarjgYRcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBcbiAgICAvLyDjg47jg7zjg4njga7pq5jjgZXjgpLmm7TmlrBcbiAgICB0aGlzLnVwZGF0ZUhlaWdodChub2RlKTtcbiAgICBcbiAgICAvLyDjg5Djg6njg7Pjgrnjg5XjgqHjgq/jgr/jg7zjgpLlj5blvpdcbiAgICBjb25zdCBiYWxhbmNlID0gdGhpcy5nZXRCYWxhbmNlRmFjdG9yKG5vZGUpO1xuICAgIFxuICAgIC8vIOW3puOBruW3puOBruOCseODvOOCuVxuICAgIGlmIChiYWxhbmNlID4gMSAmJiB0aGlzLmdldEJhbGFuY2VGYWN0b3Iobm9kZS5sZWZ0KSA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3RhdGVSaWdodChub2RlKTtcbiAgICB9XG4gICAgXG4gICAgLy8g5bem44Gu5Y+z44Gu44Kx44O844K5XG4gICAgaWYgKGJhbGFuY2UgPiAxICYmIHRoaXMuZ2V0QmFsYW5jZUZhY3Rvcihub2RlLmxlZnQpIDwgMCkge1xuICAgICAgbm9kZS5sZWZ0ID0gdGhpcy5yb3RhdGVMZWZ0KG5vZGUubGVmdCBhcyBUcmVlTm9kZSk7XG4gICAgICByZXR1cm4gdGhpcy5yb3RhdGVSaWdodChub2RlKTtcbiAgICB9XG4gICAgXG4gICAgLy8g5Y+z44Gu5Y+z44Gu44Kx44O844K5XG4gICAgaWYgKGJhbGFuY2UgPCAtMSAmJiB0aGlzLmdldEJhbGFuY2VGYWN0b3Iobm9kZS5yaWdodCkgPD0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucm90YXRlTGVmdChub2RlKTtcbiAgICB9XG4gICAgXG4gICAgLy8g5Y+z44Gu5bem44Gu44Kx44O844K5XG4gICAgaWYgKGJhbGFuY2UgPCAtMSAmJiB0aGlzLmdldEJhbGFuY2VGYWN0b3Iobm9kZS5yaWdodCkgPiAwKSB7XG4gICAgICBub2RlLnJpZ2h0ID0gdGhpcy5yb3RhdGVSaWdodChub2RlLnJpZ2h0IGFzIFRyZWVOb2RlKTtcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0ZUxlZnQobm9kZSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBub2RlO1xuICB9XG4gIFxuICAvLyDmpJzntKLmqZ/og71cbiAgc2VhcmNoKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hOb2RlKHRoaXMucm9vdCwgdmFsdWUpO1xuICB9XG4gIFxuICBwcml2YXRlIHNlYXJjaE5vZGUobm9kZTogVHJlZU5vZGUgfCBudWxsLCB2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHZhbHVlID09PSBub2RlLnZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodmFsdWUgPCBub2RlLnZhbHVlKSByZXR1cm4gdGhpcy5zZWFyY2hOb2RlKG5vZGUubGVmdCwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnNlYXJjaE5vZGUobm9kZS5yaWdodCwgdmFsdWUpO1xuICB9XG4gIFxufSIsImludGVyZmFjZSBFZGdlIHtcbiAgdG86IG51bWJlcjtcbiAgd2VpZ2h0OiBudW1iZXI7XG59XG5cbmNsYXNzIE1pbkhlYXA8VD4ge1xuICBwcml2YXRlIGhlYXA6IEFycmF5PHtpdGVtOiBULCBwcmlvcml0eTogbnVtYmVyfT4gPSBbXTtcblxuICBlbnF1ZXVlKGl0ZW06IFQsIHByaW9yaXR5OiBudW1iZXIpIHtcbiAgICB0aGlzLmhlYXAucHVzaCh7IGl0ZW0sIHByaW9yaXR5IH0pO1xuICAgIHRoaXMuYnViYmxlVXAoKTtcbiAgfVxuXG4gIGRlcXVldWUoKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuaGVhcC5sZW5ndGggPT09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbWluID0gdGhpcy5oZWFwWzBdLml0ZW07XG4gICAgY29uc3QgZW5kID0gdGhpcy5oZWFwLnBvcCgpO1xuICAgIGlmICh0aGlzLmhlYXAubGVuZ3RoID4gMCAmJiBlbmQpIHtcbiAgICAgIHRoaXMuaGVhcFswXSA9IGVuZDtcbiAgICAgIHRoaXMuc2lua0Rvd24oKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pbjtcbiAgfVxuXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGVhcC5sZW5ndGggPT09IDA7XG4gIH1cblxuICBwcml2YXRlIGJ1YmJsZVVwKCkge1xuICAgIGxldCBpZHggPSB0aGlzLmhlYXAubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5oZWFwW2lkeF07XG4gICAgd2hpbGUgKGlkeCA+IDApIHtcbiAgICAgIGxldCBwYXJlbnRJZHggPSBNYXRoLmZsb29yKChpZHggLSAxKSAvIDIpO1xuICAgICAgbGV0IHBhcmVudCA9IHRoaXMuaGVhcFtwYXJlbnRJZHhdO1xuICAgICAgaWYgKGVsZW1lbnQucHJpb3JpdHkgPj0gcGFyZW50LnByaW9yaXR5KSBicmVhaztcbiAgICAgIHRoaXMuaGVhcFtwYXJlbnRJZHhdID0gZWxlbWVudDtcbiAgICAgIHRoaXMuaGVhcFtpZHhdID0gcGFyZW50O1xuICAgICAgaWR4ID0gcGFyZW50SWR4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2lua0Rvd24oKSB7XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5oZWFwLmxlbmd0aDtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5oZWFwWzBdO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBsZWZ0Q2hpbGRJZHggPSAyICogaWR4ICsgMTtcbiAgICAgIGxldCByaWdodENoaWxkSWR4ID0gMiAqIGlkeCArIDI7XG4gICAgICBsZXQgc3dhcDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAgIGlmIChsZWZ0Q2hpbGRJZHggPCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhcFtsZWZ0Q2hpbGRJZHhdLnByaW9yaXR5IDwgZWxlbWVudC5wcmlvcml0eSkge1xuICAgICAgICAgIHN3YXAgPSBsZWZ0Q2hpbGRJZHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyaWdodENoaWxkSWR4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICgoc3dhcCA9PT0gbnVsbCAmJiB0aGlzLmhlYXBbcmlnaHRDaGlsZElkeF0ucHJpb3JpdHkgPCBlbGVtZW50LnByaW9yaXR5KSB8fFxuICAgICAgICAgICAgKHN3YXAgIT09IG51bGwgJiYgdGhpcy5oZWFwW3JpZ2h0Q2hpbGRJZHhdLnByaW9yaXR5IDwgdGhpcy5oZWFwW2xlZnRDaGlsZElkeF0ucHJpb3JpdHkpKSB7XG4gICAgICAgICAgc3dhcCA9IHJpZ2h0Q2hpbGRJZHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzd2FwID09PSBudWxsKSBicmVhaztcbiAgICAgIHRoaXMuaGVhcFtpZHhdID0gdGhpcy5oZWFwW3N3YXBdO1xuICAgICAgdGhpcy5oZWFwW3N3YXBdID0gZWxlbWVudDtcbiAgICAgIGlkeCA9IHN3YXA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmFwaCB7XG4gIHByaXZhdGUgYWRqYWNlbmN5TGlzdDogRWRnZVtdW10gPSBbXTtcbiAgXG4gIGNvbnN0cnVjdG9yKG51bVZlcnRpY2VzOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVZlcnRpY2VzOyBpKyspIHtcbiAgICAgIHRoaXMuYWRqYWNlbmN5TGlzdC5wdXNoKFtdKTtcbiAgICB9XG4gIH1cbiAgXG4gIGFkZEVkZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCB3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYWRqYWNlbmN5TGlzdFtmcm9tXS5wdXNoKHsgdG8sIHdlaWdodCB9KTtcbiAgfVxuICBcbiAgZGlqa3N0cmEoc3RhcnRWZXJ0ZXg6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCBkaXN0YW5jZXM6IG51bWJlcltdID0gW107XG4gICAgY29uc3QgdmlzaXRlZDogYm9vbGVhbltdID0gW107XG4gICAgY29uc3QgcHEgPSBuZXcgTWluSGVhcDx7IHZlcnRleDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyIH0+KCk7XG4gICAgXG4gICAgLy8g5Yid5pyf5YyWXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFkamFjZW5jeUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRpc3RhbmNlc1tpXSA9IGkgPT09IHN0YXJ0VmVydGV4ID8gMCA6IEluZmluaXR5O1xuICAgICAgdmlzaXRlZFtpXSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBwcS5lbnF1ZXVlKHsgdmVydGV4OiBzdGFydFZlcnRleCwgZGlzdGFuY2U6IDAgfSwgMCk7XG4gICAgXG4gICAgd2hpbGUgKCFwcS5pc0VtcHR5KCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBwcS5kZXF1ZXVlKCk7XG4gICAgICBpZiAoIWN1cnJlbnQpIGJyZWFrO1xuICAgICAgXG4gICAgICBjb25zdCB7IHZlcnRleCwgZGlzdGFuY2UgfSA9IGN1cnJlbnQ7XG4gICAgICBcbiAgICAgIGlmICh2aXNpdGVkW3ZlcnRleF0pIGNvbnRpbnVlO1xuICAgICAgdmlzaXRlZFt2ZXJ0ZXhdID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgZm9yIChjb25zdCBlZGdlIG9mIHRoaXMuYWRqYWNlbmN5TGlzdFt2ZXJ0ZXhdKSB7XG4gICAgICAgIGNvbnN0IG5ld0Rpc3RhbmNlID0gZGlzdGFuY2UgKyBlZGdlLndlaWdodDtcbiAgICAgICAgXG4gICAgICAgIGlmIChuZXdEaXN0YW5jZSA8IGRpc3RhbmNlc1tlZGdlLnRvXSkge1xuICAgICAgICAgIGRpc3RhbmNlc1tlZGdlLnRvXSA9IG5ld0Rpc3RhbmNlO1xuICAgICAgICAgIHBxLmVucXVldWUoeyB2ZXJ0ZXg6IGVkZ2UudG8sIGRpc3RhbmNlOiBuZXdEaXN0YW5jZSB9LCBuZXdEaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpc3RhbmNlcztcbiAgfVxuICBcbiAgLy8g44Kw44Op44OV44Gu44OO44O844OJ5pWw44KS5Y+W5b6XXG4gIGdldFZlcnRleENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYWRqYWNlbmN5TGlzdC5sZW5ndGg7XG4gIH1cbiAgXG4gIC8vIOOCsOODqeODleOBruOCqOODg+OCuOaVsOOCkuWPluW+l1xuICBnZXRFZGdlQ291bnQoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgZWRnZXMgb2YgdGhpcy5hZGphY2VuY3lMaXN0KSB7XG4gICAgICBjb3VudCArPSBlZGdlcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBxdWlja1NvcnQ8VD4oYXJyOiBUW10sIGxlZnQ6IG51bWJlciA9IDAsIHJpZ2h0OiBudW1iZXIgPSBhcnIubGVuZ3RoIC0gMSk6IFRbXSB7XG4gIGlmIChsZWZ0IDwgcmlnaHQpIHtcbiAgICBjb25zdCBwaXZvdEluZGV4ID0gcGFydGl0aW9uKGFyciwgbGVmdCwgcmlnaHQpO1xuICAgIHF1aWNrU29ydChhcnIsIGxlZnQsIHBpdm90SW5kZXggLSAxKTtcbiAgICBxdWlja1NvcnQoYXJyLCBwaXZvdEluZGV4ICsgMSwgcmlnaHQpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIHBhcnRpdGlvbjxUPihhcnI6IFRbXSwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3QgcGl2b3QgPSBhcnJbcmlnaHRdO1xuICBsZXQgaSA9IGxlZnQgLSAxO1xuICBcbiAgZm9yIChsZXQgaiA9IGxlZnQ7IGogPCByaWdodDsgaisrKSB7XG4gICAgaWYgKGFycltqXSA8PSBwaXZvdCkge1xuICAgICAgaSsrO1xuICAgICAgW2FycltpXSwgYXJyW2pdXSA9IFthcnJbal0sIGFycltpXV07XG4gICAgfVxuICB9XG4gIFxuICBbYXJyW2kgKyAxXSwgYXJyW3JpZ2h0XV0gPSBbYXJyW3JpZ2h0XSwgYXJyW2kgKyAxXV07XG4gIHJldHVybiBpICsgMTtcbn0iLCJpbXBvcnQgeyBHcmFwaCB9IGZyb20gJy4uL2FsZ29yaXRobXMvZ3JhcGgnO1xuaW1wb3J0IHsgV2FzbUdyYXBoIH0gZnJvbSAnLi4vd2FzbVdyYXBwZXInO1xuXG5pbnRlcmZhY2UgQmVuY2htYXJrUmVzdWx0IHtcbiAgdHlwZXNjcmlwdDoge1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICBtZW1vcnk6IG51bWJlcjtcbiAgfTtcbiAgd2FzbToge1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICBtZW1vcnk6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkdyYXBoQmVuY2htYXJrKG5vZGVDb3VudDogbnVtYmVyKTogUHJvbWlzZTxCZW5jaG1hcmtSZXN1bHQ+IHtcbiAgLy8g5oyH5a6a44GV44KM44Gf44OO44O844OJ5pWw44Gn44Op44Oz44OA44Og44Gq44Kw44Op44OV44KS55Sf5oiQXG4gIGNvbnN0IGdlbmVyYXRlUmFuZG9tR3JhcGggPSAobm9kZXM6IG51bWJlcik6IHsgZ3JhcGg6IEdyYXBoLCBlZGdlczogbnVtYmVyIH0gPT4ge1xuICAgIGNvbnN0IGdyYXBoID0gbmV3IEdyYXBoKG5vZGVzKTtcbiAgICBsZXQgZWRnZUNvdW50ID0gMDtcbiAgICBcbiAgICAvLyDlkITjg47jg7zjg4njgYvjgonlubPlnYc144Gk44Gu44Ko44OD44K444KS6L+95YqgXG4gICAgY29uc3QgZWRnZXNQZXJOb2RlID0gNTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWRnZXNQZXJOb2RlOyBqKyspIHtcbiAgICAgICAgY29uc3QgdG8gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub2Rlcyk7XG4gICAgICAgIGNvbnN0IHdlaWdodCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxO1xuICAgICAgICBcbiAgICAgICAgaWYgKGkgIT09IHRvKSB7XG4gICAgICAgICAgZ3JhcGguYWRkRWRnZShpLCB0bywgd2VpZ2h0KTtcbiAgICAgICAgICBlZGdlQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBncmFwaCwgZWRnZXM6IGVkZ2VDb3VudCB9O1xuICB9O1xuICBcbiAgLy8gVHlwZVNjcmlwdOWun+ijheOBruODmeODs+ODgeODnuODvOOCr1xuICBjb25zdCB0c0JlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB0c01lbW9yeUJlZm9yZSA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBjb25zdCB7IGdyYXBoOiB0c0dyYXBoIH0gPSBnZW5lcmF0ZVJhbmRvbUdyYXBoKG5vZGVDb3VudCk7XG4gIGNvbnN0IHRzUmVzdWx0ID0gdHNHcmFwaC5kaWprc3RyYSgwKTsgLy8g44OO44O844OJMOOBi+OCieOBruacgOefree1jOi3r1xuICBcbiAgY29uc3QgdHNBZnRlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB0c01lbW9yeUFmdGVyID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHRzVGltZSA9IHRzQWZ0ZXIgLSB0c0JlZm9yZTtcbiAgY29uc3QgdHNNZW1vcnkgPSAodHNNZW1vcnlBZnRlciAtIHRzTWVtb3J5QmVmb3JlKSAvICgxMDI0ICogMTAyNCk7IC8vIE1C5Y2Y5L2NXG4gIFxuICAvLyBXYXNt5a6f6KOF44Gu44OZ44Oz44OB44Oe44O844KvXG4gIGNvbnN0IHdhc21CZWZvcmUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3Qgd2FzbU1lbW9yeUJlZm9yZSA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBjb25zdCB3YXNtR3JhcGggPSBhd2FpdCBXYXNtR3JhcGguY3JlYXRlKG5vZGVDb3VudCk7XG4gIFxuICAvLyDlkIzjgZjjgrDjg6njg5XjgpLlho3nj77jgZnjgovjgZ/jgoHjga7kubHmlbDjgrfjg7zjg4njgpLjg6rjgrvjg4Pjg4hcbiAgLy8g5a6f6Zqb44Gu5a6f6KOF44Gn44Gv44CB5ZCM44GY44Ko44OD44K444KS6L+95Yqg44GZ44KL44Gf44KB44Gu44Ot44K444OD44Kv44GM5b+F6KaBXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNvdW50OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDU7IGorKykge1xuICAgICAgY29uc3QgdG8gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub2RlQ291bnQpO1xuICAgICAgY29uc3Qgd2VpZ2h0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgICBcbiAgICAgIGlmIChpICE9PSB0bykge1xuICAgICAgICB3YXNtR3JhcGguYWRkRWRnZShpLCB0bywgd2VpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGNvbnN0IHdhc21SZXN1bHQgPSB3YXNtR3JhcGguZGlqa3N0cmEoMCk7XG4gIFxuICBjb25zdCB3YXNtQWZ0ZXIgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3Qgd2FzbU1lbW9yeUFmdGVyID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHdhc21UaW1lID0gd2FzbUFmdGVyIC0gd2FzbUJlZm9yZTtcbiAgY29uc3Qgd2FzbU1lbW9yeSA9ICh3YXNtTWVtb3J5QWZ0ZXIgLSB3YXNtTWVtb3J5QmVmb3JlKSAvICgxMDI0ICogMTAyNCk7IC8vIE1C5Y2Y5L2NXG4gIFxuICByZXR1cm4ge1xuICAgIHR5cGVzY3JpcHQ6IHtcbiAgICAgIHRpbWU6IHRzVGltZSxcbiAgICAgIG1lbW9yeTogdHNNZW1vcnlcbiAgICB9LFxuICAgIHdhc206IHtcbiAgICAgIHRpbWU6IHdhc21UaW1lLFxuICAgICAgbWVtb3J5OiB3YXNtTWVtb3J5XG4gICAgfVxuICB9O1xufSIsImltcG9ydCB7IHF1aWNrU29ydCB9IGZyb20gJy4uL2FsZ29yaXRobXMvcXVpY2tTb3J0JztcbmltcG9ydCB7IHdhc21RdWlja1NvcnQgfSBmcm9tICcuLi93YXNtV3JhcHBlcic7XG5cbmludGVyZmFjZSBCZW5jaG1hcmtSZXN1bHQge1xuICB0eXBlc2NyaXB0OiB7XG4gICAgdGltZTogbnVtYmVyO1xuICAgIG1lbW9yeTogbnVtYmVyO1xuICB9O1xuICB3YXNtOiB7XG4gICAgdGltZTogbnVtYmVyO1xuICAgIG1lbW9yeTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuU29ydGluZ0JlbmNobWFyayhzaXplOiBudW1iZXIpOiBQcm9taXNlPEJlbmNobWFya1Jlc3VsdD4ge1xuICAvLyDjg6njg7Pjg4Djg6DjgarphY3liJfjgpLnlJ/miJBcbiAgY29uc3QgZ2VuZXJhdGVSYW5kb21BcnJheSA9IChuOiBudW1iZXIpOiBudW1iZXJbXSA9PiB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGFyci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcbiAgXG4gIC8vIFR5cGVTY3JpcHTlrp/oo4Xjga7jg5njg7Pjg4Hjg57jg7zjgq9cbiAgY29uc3QgdHNBcnJheSA9IGdlbmVyYXRlUmFuZG9tQXJyYXkoc2l6ZSk7XG4gIGNvbnN0IHRzQmVmb3JlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHRzTWVtb3J5QmVmb3JlID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIHF1aWNrU29ydChbLi4udHNBcnJheV0pO1xuICBcbiAgY29uc3QgdHNBZnRlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB0c01lbW9yeUFmdGVyID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHRzVGltZSA9IHRzQWZ0ZXIgLSB0c0JlZm9yZTtcbiAgY29uc3QgdHNNZW1vcnkgPSAodHNNZW1vcnlBZnRlciAtIHRzTWVtb3J5QmVmb3JlKSAvICgxMDI0ICogMTAyNCk7IC8vIE1C5Y2Y5L2NXG4gIFxuICAvLyBXYXNt5a6f6KOF44Gu44OZ44Oz44OB44Oe44O844KvXG4gIGNvbnN0IHdhc21BcnJheSA9IGdlbmVyYXRlUmFuZG9tQXJyYXkoc2l6ZSk7XG4gIGNvbnN0IHdhc21CZWZvcmUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3Qgd2FzbU1lbW9yeUJlZm9yZSA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBhd2FpdCB3YXNtUXVpY2tTb3J0KFsuLi53YXNtQXJyYXldKTtcbiAgXG4gIGNvbnN0IHdhc21BZnRlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB3YXNtTWVtb3J5QWZ0ZXIgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgY29uc3Qgd2FzbVRpbWUgPSB3YXNtQWZ0ZXIgLSB3YXNtQmVmb3JlO1xuICBjb25zdCB3YXNtTWVtb3J5ID0gKHdhc21NZW1vcnlBZnRlciAtIHdhc21NZW1vcnlCZWZvcmUpIC8gKDEwMjQgKiAxMDI0KTsgLy8gTULljZjkvY1cbiAgXG4gIHJldHVybiB7XG4gICAgdHlwZXNjcmlwdDoge1xuICAgICAgdGltZTogdHNUaW1lLFxuICAgICAgbWVtb3J5OiB0c01lbW9yeVxuICAgIH0sXG4gICAgd2FzbToge1xuICAgICAgdGltZTogd2FzbVRpbWUsXG4gICAgICBtZW1vcnk6IHdhc21NZW1vcnlcbiAgICB9XG4gIH07XG59IiwiaW1wb3J0IHsgQVZMVHJlZSB9IGZyb20gJy4uL2FsZ29yaXRobXMvYXZsVHJlZSc7XG5pbXBvcnQgeyBXYXNtQVZMVHJlZSB9IGZyb20gJy4uL3dhc21XcmFwcGVyJztcblxuaW50ZXJmYWNlIEJlbmNobWFya1Jlc3VsdCB7XG4gIHR5cGVzY3JpcHQ6IHtcbiAgICB0aW1lOiBudW1iZXI7XG4gICAgbWVtb3J5OiBudW1iZXI7XG4gIH07XG4gIHdhc206IHtcbiAgICB0aW1lOiBudW1iZXI7XG4gICAgbWVtb3J5OiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5UcmVlQmVuY2htYXJrKHNpemU6IG51bWJlcik6IFByb21pc2U8QmVuY2htYXJrUmVzdWx0PiB7XG4gIC8vIOODqeODs+ODgOODoOOBquaVsOWApOmFjeWIl+OCkueUn+aIkFxuICBjb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlcnMgPSAobjogbnVtYmVyKTogbnVtYmVyW10gPT4ge1xuICAgIGNvbnN0IG51bWJlcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgbnVtYmVycy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH07XG4gIFxuICBjb25zdCBudW1iZXJzID0gZ2VuZXJhdGVSYW5kb21OdW1iZXJzKHNpemUpO1xuICBjb25zdCBzZWFyY2hOdW1iZXJzID0gZ2VuZXJhdGVSYW5kb21OdW1iZXJzKDEwMDApOyAvLyDmpJzntKLnlKjjga7mlbDlgKRcbiAgXG4gIC8vIFR5cGVTY3JpcHTlrp/oo4Xjga7jg5njg7Pjg4Hjg57jg7zjgq9cbiAgY29uc3QgdHNCZWZvcmUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3QgdHNNZW1vcnlCZWZvcmUgPSAod2luZG93LnBlcmZvcm1hbmNlIGFzIGFueSkubWVtb3J5Py51c2VkSlNIZWFwU2l6ZSB8fCAwO1xuICBcbiAgY29uc3QgdHNUcmVlID0gbmV3IEFWTFRyZWUoKTtcbiAgXG4gIC8vIOaMv+WFpeaTjeS9nFxuICBmb3IgKGNvbnN0IG51bSBvZiBudW1iZXJzKSB7XG4gICAgdHNUcmVlLmluc2VydChudW0pO1xuICB9XG4gIFxuICAvLyDmpJzntKLmk43kvZxcbiAgZm9yIChjb25zdCBudW0gb2Ygc2VhcmNoTnVtYmVycykge1xuICAgIHRzVHJlZS5zZWFyY2gobnVtKTtcbiAgfVxuICBcbiAgY29uc3QgdHNBZnRlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCB0c01lbW9yeUFmdGVyID0gKHdpbmRvdy5wZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeT8udXNlZEpTSGVhcFNpemUgfHwgMDtcbiAgXG4gIGNvbnN0IHRzVGltZSA9IHRzQWZ0ZXIgLSB0c0JlZm9yZTtcbiAgY29uc3QgdHNNZW1vcnkgPSAodHNNZW1vcnlBZnRlciAtIHRzTWVtb3J5QmVmb3JlKSAvICgxMDI0ICogMTAyNCk7IC8vIE1C5Y2Y5L2NXG4gIFxuICAvLyBXYXNt5a6f6KOF44Gu44OZ44Oz44OB44Oe44O844KvXG4gIGNvbnN0IHdhc21CZWZvcmUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgY29uc3Qgd2FzbU1lbW9yeUJlZm9yZSA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBjb25zdCB3YXNtVHJlZSA9IGF3YWl0IFdhc21BVkxUcmVlLmNyZWF0ZSgpO1xuICBcbiAgLy8g5oy/5YWl5pON5L2cXG4gIGZvciAoY29uc3QgbnVtIG9mIG51bWJlcnMpIHtcbiAgICB3YXNtVHJlZS5pbnNlcnQobnVtKTtcbiAgfVxuICBcbiAgLy8g5qSc57Si5pON5L2cXG4gIGZvciAoY29uc3QgbnVtIG9mIHNlYXJjaE51bWJlcnMpIHtcbiAgICB3YXNtVHJlZS5zZWFyY2gobnVtKTtcbiAgfVxuICBcbiAgY29uc3Qgd2FzbUFmdGVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGNvbnN0IHdhc21NZW1vcnlBZnRlciA9ICh3aW5kb3cucGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnk/LnVzZWRKU0hlYXBTaXplIHx8IDA7XG4gIFxuICBjb25zdCB3YXNtVGltZSA9IHdhc21BZnRlciAtIHdhc21CZWZvcmU7XG4gIGNvbnN0IHdhc21NZW1vcnkgPSAod2FzbU1lbW9yeUFmdGVyIC0gd2FzbU1lbW9yeUJlZm9yZSkgLyAoMTAyNCAqIDEwMjQpOyAvLyBNQuWNmOS9jVxuICBcbiAgcmV0dXJuIHtcbiAgICB0eXBlc2NyaXB0OiB7XG4gICAgICB0aW1lOiB0c1RpbWUsXG4gICAgICBtZW1vcnk6IHRzTWVtb3J5XG4gICAgfSxcbiAgICB3YXNtOiB7XG4gICAgICB0aW1lOiB3YXNtVGltZSxcbiAgICAgIG1lbW9yeTogd2FzbU1lbW9yeVxuICAgIH1cbiAgfTtcbn0iLCIvLyBXYXNt55Sf5oiQ5pmC44Gr5L2c5oiQ44GV44KM44KL5Z6L5a6a576p44KS5L2/55So77yI5a6f6Zqb44Gu5Z6L44Gvd2FzbS1wYWNrIGJ1aWxk44Gn55Sf5oiQ44GV44KM44KL77yJXG5pbXBvcnQgaW5pdCwge1xuICBxdWlja19zb3J0LFxuICBBVkxUcmVlIGFzIFJ1c3RBVkxUcmVlLFxuICBHcmFwaCBhcyBSdXN0R3JhcGhcbn0gZnJvbSAnLi4vLi4vc3JjL3J1c3QvcGtnJztcblxuLy8g44Oi44K444Ol44O844Or44Gu5Yid5pyf5YyW54q25oWLXG5sZXQgd2FzbUluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW5pdFByb21pc2U6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuLy8gV2FzbeODouOCuOODpeODvOODq+OBruWIneacn+WMllxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRXYXNtKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAod2FzbUluaXRpYWxpemVkKSByZXR1cm47XG4gIFxuICBpZiAoIWluaXRQcm9taXNlKSB7XG4gICAgaW5pdFByb21pc2UgPSBpbml0KCkudGhlbigoKSA9PiB7XG4gICAgICB3YXNtSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2coJ1dlYkFzc2VtYmx5IG1vZHVsZSBpbml0aWFsaXplZCcpO1xuICAgIH0pO1xuICB9XG4gIFxuICByZXR1cm4gaW5pdFByb21pc2U7XG59XG5cbi8vIOOCr+OCpOODg+OCr+OCveODvOODiOOBruODqeODg+ODkeODvFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhc21RdWlja1NvcnQoYXJyOiBudW1iZXJbXSk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgYXdhaXQgaW5pdFdhc20oKTtcbiAgcmV0dXJuIEFycmF5LmZyb20ocXVpY2tfc29ydChuZXcgSW50MzJBcnJheShhcnIpKSk7XG59XG5cbi8vIEFWTOacqOOBruODqeODg+ODkeODvOOCr+ODqeOCuVxuZXhwb3J0IGNsYXNzIFdhc21BVkxUcmVlIHtcbiAgcHJpdmF0ZSB0cmVlOiBSdXN0QVZMVHJlZTtcbiAgXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50cmVlID0gbmV3IFJ1c3RBVkxUcmVlKCk7XG4gIH1cbiAgXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTxXYXNtQVZMVHJlZT4ge1xuICAgIGF3YWl0IGluaXRXYXNtKCk7XG4gICAgcmV0dXJuIG5ldyBXYXNtQVZMVHJlZSgpO1xuICB9XG4gIFxuICBpbnNlcnQodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudHJlZS5pbnNlcnQodmFsdWUpO1xuICB9XG4gIFxuICBzZWFyY2godmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyZWUuc2VhcmNoKHZhbHVlKTtcbiAgfVxufVxuXG4vLyDjgrDjg6njg5Xjga7jg6njg4Pjg5Hjg7zjgq/jg6njgrlcbmV4cG9ydCBjbGFzcyBXYXNtR3JhcGgge1xuICBwcml2YXRlIGdyYXBoOiBSdXN0R3JhcGg7XG4gIFxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG51bVZlcnRpY2VzOiBudW1iZXIpIHtcbiAgICB0aGlzLmdyYXBoID0gbmV3IFJ1c3RHcmFwaChudW1WZXJ0aWNlcyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUobnVtVmVydGljZXM6IG51bWJlcik6IFByb21pc2U8V2FzbUdyYXBoPiB7XG4gICAgYXdhaXQgaW5pdFdhc20oKTtcbiAgICByZXR1cm4gbmV3IFdhc21HcmFwaChudW1WZXJ0aWNlcyk7XG4gIH1cbiAgXG4gIGFkZEVkZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCB3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZ3JhcGguYWRkX2VkZ2UoZnJvbSwgdG8sIHdlaWdodCk7XG4gIH1cbiAgXG4gIGRpamtzdHJhKHN0YXJ0VmVydGV4OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ncmFwaC5kaWprc3RyYShzdGFydFZlcnRleCkpO1xuICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJpbXBvcnQgeyBydW5Tb3J0aW5nQmVuY2htYXJrIH0gZnJvbSAnLi9iZW5jaG1hcmtzL3NvcnRCZW5jaG1hcmsnO1xuaW1wb3J0IHsgcnVuVHJlZUJlbmNobWFyayB9IGZyb20gJy4vYmVuY2htYXJrcy90cmVlQmVuY2htYXJrJztcbmltcG9ydCB7IHJ1bkdyYXBoQmVuY2htYXJrIH0gZnJvbSAnLi9iZW5jaG1hcmtzL2dyYXBoQmVuY2htYXJrJztcblxuLy8gRE9N44GM6Kqt44G/6L6844G+44KM44Gf44KJ5a6f6KGMXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvLyDjgr3jg7zjg4jjg5njg7Pjg4Hjg57jg7zjgq/jga7oqK3lrppcbiAgY29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdydW4tc29ydC1iZW5jaG1hcmsnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzaXplU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnQtc2l6ZScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbnN0IHNpemUgPSBwYXJzZUludChzaXplU2VsZWN0LnZhbHVlLCAxMCk7XG4gICAgY29uc3QgcmVzdWx0c0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3J0LXJlc3VsdHMnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICByZXN1bHRzRGl2LmlubmVySFRNTCA9ICc8cD5SdW5uaW5nIGJlbmNobWFyay4uLjwvcD4nO1xuICAgIFxuICAgIC8vIOmdnuWQjOacn+OBp+ODmeODs+ODgeODnuODvOOCr+OCkuWun+ihjFxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHJ1blNvcnRpbmdCZW5jaG1hcmsoc2l6ZSk7XG4gICAgICBkaXNwbGF5UmVzdWx0cyhyZXN1bHRzRGl2LCByZXN1bHRzKTtcbiAgICB9LCAxMDApO1xuICB9KTtcbiAgXG4gIC8vIOODhOODquODvOODmeODs+ODgeODnuODvOOCr+OBruioreWumlxuICBjb25zdCB0cmVlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bi10cmVlLWJlbmNobWFyaycpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICB0cmVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHNpemVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlZS1zaXplJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHNpemVTZWxlY3QudmFsdWUsIDEwKTtcbiAgICBjb25zdCByZXN1bHRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZWUtcmVzdWx0cycpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHJlc3VsdHNEaXYuaW5uZXJIVE1MID0gJzxwPlJ1bm5pbmcgYmVuY2htYXJrLi4uPC9wPic7XG4gICAgXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuVHJlZUJlbmNobWFyayhzaXplKTtcbiAgICAgIGRpc3BsYXlSZXN1bHRzKHJlc3VsdHNEaXYsIHJlc3VsdHMpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuICBcbiAgLy8g44Kw44Op44OV44OZ44Oz44OB44Oe44O844Kv44Gu6Kit5a6aXG4gIGNvbnN0IGdyYXBoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bi1ncmFwaC1iZW5jaG1hcmsnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgZ3JhcGhCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2l6ZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmFwaC1zaXplJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHNpemVTZWxlY3QudmFsdWUsIDEwKTtcbiAgICBjb25zdCByZXN1bHRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyYXBoLXJlc3VsdHMnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICByZXN1bHRzRGl2LmlubmVySFRNTCA9ICc8cD5SdW5uaW5nIGJlbmNobWFyay4uLjwvcD4nO1xuICAgIFxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHJ1bkdyYXBoQmVuY2htYXJrKHNpemUpO1xuICAgICAgZGlzcGxheVJlc3VsdHMocmVzdWx0c0RpdiwgcmVzdWx0cyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG59KTtcblxuLy8g57WQ5p6c6KGo56S655So44Gu6Zai5pWwXG5mdW5jdGlvbiBkaXNwbGF5UmVzdWx0cyhjb250YWluZXI6IEhUTUxFbGVtZW50LCByZXN1bHRzOiBhbnkpIHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICBcbiAgLy8g44OG44O844OW44Or44OY44OD44OA44O8XG4gIGNvbnN0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gIGNvbnN0IGhlYWRlcnMgPSBbJ0ltcGxlbWVudGF0aW9uJywgJ0V4ZWN1dGlvbiBUaW1lIChtcyknLCAnTWVtb3J5IFVzZWQgKE1CKSddO1xuICBcbiAgaGVhZGVycy5mb3JFYWNoKGhlYWRlclRleHQgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gaGVhZGVyVGV4dDtcbiAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgfSk7XG4gIFxuICB0YWJsZS5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xuICBcbiAgLy8gVHlwZVNjcmlwdOe1kOaenFxuICBjb25zdCB0c1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gIGNvbnN0IHRzTmFtZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICB0c05hbWVDZWxsLnRleHRDb250ZW50ID0gJ1R5cGVTY3JpcHQnO1xuICBjb25zdCB0c1RpbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgdHNUaW1lQ2VsbC50ZXh0Q29udGVudCA9IHJlc3VsdHMudHlwZXNjcmlwdC50aW1lLnRvRml4ZWQoMik7XG4gIGNvbnN0IHRzTWVtb3J5Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gIHRzTWVtb3J5Q2VsbC50ZXh0Q29udGVudCA9IHJlc3VsdHMudHlwZXNjcmlwdC5tZW1vcnkudG9GaXhlZCgyKTtcbiAgXG4gIHRzUm93LmFwcGVuZENoaWxkKHRzTmFtZUNlbGwpO1xuICB0c1Jvdy5hcHBlbmRDaGlsZCh0c1RpbWVDZWxsKTtcbiAgdHNSb3cuYXBwZW5kQ2hpbGQodHNNZW1vcnlDZWxsKTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQodHNSb3cpO1xuICBcbiAgLy8gV2Fzbee1kOaenFxuICBjb25zdCB3YXNtUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgY29uc3Qgd2FzbU5hbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgd2FzbU5hbWVDZWxsLnRleHRDb250ZW50ID0gJ1dlYkFzc2VtYmx5JztcbiAgY29uc3Qgd2FzbVRpbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgd2FzbVRpbWVDZWxsLnRleHRDb250ZW50ID0gcmVzdWx0cy53YXNtLnRpbWUudG9GaXhlZCgyKTtcbiAgY29uc3Qgd2FzbU1lbW9yeUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICB3YXNtTWVtb3J5Q2VsbC50ZXh0Q29udGVudCA9IHJlc3VsdHMud2FzbS5tZW1vcnkudG9GaXhlZCgyKTtcbiAgXG4gIHdhc21Sb3cuYXBwZW5kQ2hpbGQod2FzbU5hbWVDZWxsKTtcbiAgd2FzbVJvdy5hcHBlbmRDaGlsZCh3YXNtVGltZUNlbGwpO1xuICB3YXNtUm93LmFwcGVuZENoaWxkKHdhc21NZW1vcnlDZWxsKTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQod2FzbVJvdyk7XG4gIFxuICAvLyDmr5TovIPntZDmnpxcbiAgY29uc3QgY29tcGFyaXNvblJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gIGNvbnN0IGNvbXBhcmlzb25OYW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gIGNvbXBhcmlzb25OYW1lQ2VsbC50ZXh0Q29udGVudCA9ICdJbXByb3ZlbWVudCc7XG4gIGNvbnN0IHRpbWVJbXByb3ZlbWVudCA9IChyZXN1bHRzLnR5cGVzY3JpcHQudGltZSAvIHJlc3VsdHMud2FzbS50aW1lKS50b0ZpeGVkKDIpO1xuICBjb25zdCBtZW1vcnlJbXByb3ZlbWVudCA9IChyZXN1bHRzLnR5cGVzY3JpcHQubWVtb3J5IC8gcmVzdWx0cy53YXNtLm1lbW9yeSkudG9GaXhlZCgyKTtcbiAgXG4gIGNvbnN0IGNvbXBhcmlzb25UaW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gIGNvbXBhcmlzb25UaW1lQ2VsbC50ZXh0Q29udGVudCA9IGAke3RpbWVJbXByb3ZlbWVudH14IGZhc3RlcmA7XG4gIGNvbnN0IGNvbXBhcmlzb25NZW1vcnlDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgY29tcGFyaXNvbk1lbW9yeUNlbGwudGV4dENvbnRlbnQgPSBgJHttZW1vcnlJbXByb3ZlbWVudH14IGxlc3MgbWVtb3J5YDtcbiAgXG4gIGNvbXBhcmlzb25Sb3cuYXBwZW5kQ2hpbGQoY29tcGFyaXNvbk5hbWVDZWxsKTtcbiAgY29tcGFyaXNvblJvdy5hcHBlbmRDaGlsZChjb21wYXJpc29uVGltZUNlbGwpO1xuICBjb21wYXJpc29uUm93LmFwcGVuZENoaWxkKGNvbXBhcmlzb25NZW1vcnlDZWxsKTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoY29tcGFyaXNvblJvdyk7XG4gIFxuICAvLyDjg4bjg7zjg5bjg6vjgpLooajnpLpcbiAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==