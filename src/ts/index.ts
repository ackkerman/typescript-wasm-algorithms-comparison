import { BenchRequest, BenchResult, Mode } from './types';

// Worker 初期化
const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

// Workerへのリクエスト & 応答待機
function postAndWait(req: BenchRequest): Promise<BenchResult> {
  return new Promise(resolve => {
    const handler = (e: MessageEvent) => {
      console.log('Worker returned:', e.data);
      resolve(e.data);
      worker.removeEventListener('message', handler);
    };
    worker.addEventListener('message', handler);
    worker.postMessage(req);
  });
}

// DOMイベント設定
document.addEventListener('DOMContentLoaded', () => {
  const setups = [
    { btnId: 'run-sort-benchmark', selectId: 'sort-size', resultId: 'sort-results', mode: 'sort' as Mode },
    { btnId: 'run-tree-benchmark', selectId: 'tree-size', resultId: 'tree-results', mode: 'tree' as Mode },
    { btnId: 'run-graph-benchmark', selectId: 'graph-size', resultId: 'graph-results', mode: 'graph' as Mode }
  ];

  for (const { btnId, selectId, resultId, mode } of setups) {
    const btn = document.getElementById(btnId) as HTMLButtonElement;
    const select = document.getElementById(selectId) as HTMLSelectElement;
    const resultDiv = document.getElementById(resultId) as HTMLDivElement;

    btn.addEventListener('click', async () => {
      const size = parseInt(select.value, 10);
      resultDiv.innerHTML = '<p>Running benchmark...</p>';

      const result = await postAndWait({ mode, size });
      displayResults(resultDiv, result);
    });
  }
});

// 結果テーブルを表示
function displayResults(container: HTMLElement, results: BenchResult) {
  const table = document.createElement('table');
  table.innerHTML = `
    <tr><th>Implementation</th><th>Execution Time (ms)</th><th>Memory Used (MB)</th></tr>
    <tr><td>TypeScript</td><td>${results.typescript.time.toFixed(2)}</td><td>${results.typescript.memory.toFixed(2)}</td></tr>
    <tr><td>WebAssembly</td><td>${results.wasm.time.toFixed(2)}</td><td>${results.wasm.memory.toFixed(2)}</td></tr>
    <tr><td>Improvement</td><td>${(results.typescript.time / results.wasm.time).toFixed(2)}x faster</td>
        <td>${(results.typescript.memory / results.wasm.memory).toFixed(2)}x less memory</td></tr>
  `;
  container.innerHTML = '';
  container.appendChild(table);
}
