interface Edge {
  to: number;
  weight: number;
}

class MinHeap<T> {
  private heap: Array<{item: T, priority: number}> = [];

  enqueue(item: T, priority: number) {
    this.heap.push({ item, priority });
    this.bubbleUp();
  }

  dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0].item;
    const end = this.heap.pop();
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];
      if (element.priority >= parent.priority) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }

  private sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let swap: number | null = null;

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
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }
}

export class Graph {
  private adjacencyList: Edge[][] = [];
  
  constructor(numVertices: number) {
    for (let i = 0; i < numVertices; i++) {
      this.adjacencyList.push([]);
    }
  }
  
  addEdge(from: number, to: number, weight: number): void {
    this.adjacencyList[from].push({ to, weight });
  }
  
  dijkstra(startVertex: number): number[] {
    const distances: number[] = [];
    const visited: boolean[] = [];
    const pq = new MinHeap<{ vertex: number, distance: number }>();
    
    // 初期化
    for (let i = 0; i < this.adjacencyList.length; i++) {
      distances[i] = i === startVertex ? 0 : Infinity;
      visited[i] = false;
    }
    
    pq.enqueue({ vertex: startVertex, distance: 0 }, 0);
    
    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      if (!current) break;
      
      const { vertex, distance } = current;
      
      if (visited[vertex]) continue;
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
  getVertexCount(): number {
    return this.adjacencyList.length;
  }
  
  // グラフのエッジ数を取得
  getEdgeCount(): number {
    let count = 0;
    for (const edges of this.adjacencyList) {
      count += edges.length;
    }
    return count;
  }
}