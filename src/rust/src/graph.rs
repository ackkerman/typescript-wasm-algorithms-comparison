use wasm_bindgen::prelude::*;
use std::collections::BinaryHeap;
use std::cmp::Reverse;

#[wasm_bindgen]
pub struct Graph {
    adjacency_list: Vec<Vec<Edge>>,
}

#[derive(Clone)]
struct Edge {
    to: usize,
    weight: i32,
}

#[wasm_bindgen]
impl Graph {
    #[wasm_bindgen]
    pub fn free(&mut self) {
        self.adjacency_list.clear();
    }

    #[wasm_bindgen(constructor)]
    pub fn new(num_vertices: usize) -> Self {
        let mut adjacency_list = Vec::with_capacity(num_vertices);
        for _ in 0..num_vertices {
            adjacency_list.push(Vec::new());
        }
        Graph { adjacency_list }
    }
    
    pub fn add_edge(&mut self, from: usize, to: usize, weight: i32) {
        self.adjacency_list[from].push(Edge { to, weight });
    }
    
    pub fn dijkstra(&self, start_vertex: usize) -> Box<[i32]> {
        let n = self.adjacency_list.len();
        let mut distances = vec![i32::MAX; n];
        let mut visited = vec![false; n];
        let mut pq = BinaryHeap::new();
        
        distances[start_vertex] = 0;
        pq.push(Reverse((0, start_vertex)));
        
        while let Some(Reverse((dist, vertex))) = pq.pop() {
            if visited[vertex] {
                continue;
            }
            
            visited[vertex] = true;
            
            for edge in &self.adjacency_list[vertex] {
                let new_dist = dist + edge.weight;
                if new_dist < distances[edge.to] {
                    distances[edge.to] = new_dist;
                    pq.push(Reverse((new_dist, edge.to)));
                }
            }
        }
        
        distances.into_boxed_slice()
    }
}