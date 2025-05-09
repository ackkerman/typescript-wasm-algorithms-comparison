import { runSortingBenchmark } from './benchmarks/sortBenchmark';
import { runTreeBenchmark } from './benchmarks/treeBenchmark';
import { runGraphBenchmark } from './benchmarks/graphBenchmark';

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  // ソートベンチマークの設定
  const sortButton = document.getElementById('run-sort-benchmark') as HTMLButtonElement;
  sortButton.addEventListener('click', async () => {
    const sizeSelect = document.getElementById('sort-size') as HTMLSelectElement;
    const size = parseInt(sizeSelect.value, 10);
    const resultsDiv = document.getElementById('sort-results') as HTMLDivElement;
    resultsDiv.innerHTML = '<p>Running benchmark...</p>';
    
    // 非同期でベンチマークを実行
    setTimeout(async () => {
      const results = await runSortingBenchmark(size);
      displayResults(resultsDiv, results);
    }, 100);
  });
  
  // ツリーベンチマークの設定
  const treeButton = document.getElementById('run-tree-benchmark') as HTMLButtonElement;
  treeButton.addEventListener('click', async () => {
    const sizeSelect = document.getElementById('tree-size') as HTMLSelectElement;
    const size = parseInt(sizeSelect.value, 10);
    const resultsDiv = document.getElementById('tree-results') as HTMLDivElement;
    resultsDiv.innerHTML = '<p>Running benchmark...</p>';
    
    setTimeout(async () => {
      const results = await runTreeBenchmark(size);
      displayResults(resultsDiv, results);
    }, 100);
  });
  
  // グラフベンチマークの設定
  const graphButton = document.getElementById('run-graph-benchmark') as HTMLButtonElement;
  graphButton.addEventListener('click', async () => {
    const sizeSelect = document.getElementById('graph-size') as HTMLSelectElement;
    const size = parseInt(sizeSelect.value, 10);
    const resultsDiv = document.getElementById('graph-results') as HTMLDivElement;
    resultsDiv.innerHTML = '<p>Running benchmark...</p>';
    
    setTimeout(async () => {
      const results = await runGraphBenchmark(size);
      displayResults(resultsDiv, results);
    }, 100);
  });
});

// 結果表示用の関数
function displayResults(container: HTMLElement, results: any) {
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