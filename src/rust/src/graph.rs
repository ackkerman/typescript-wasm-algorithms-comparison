use wasm_bindgen::prelude::*;
use std::collections::BinaryHeap;
use std::cmp::Reverse;

#[wasm_bindgen]
pub struct Graph {
    adjacency_list: Vec<Vec<(usize, i32)>>,
}

#[wasm_bindgen]
impl Graph {
    #[wasm_bindgen(constructor)]
    pub fn new(num_vertices: usize) -> Graph {
        let mut adjacency_list = Vec::with_capacity(num_vertices);
        for _ in 0..num_vertices {
            adjacency_list.push(Vec::new());
        }
        Graph { adjacency_list }
    }

    #[wasm_bindgen]
    pub fn add_edges(&mut self, edges: &[i32]) {
        for chunk in edges.chunks(3) {
            if chunk.len() == 3 {
                let from = chunk[0] as usize;
                let to = chunk[1] as usize;
                let weight = chunk[2];
                if from != to {
                    self.adjacency_list[from].push((to, weight));
                }
            }
        }
    }

    #[wasm_bindgen]
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
            for &(to, weight) in &self.adjacency_list[vertex] {
                let new_dist = dist + weight;
                if new_dist < distances[to] {
                    distances[to] = new_dist;
                    pq.push(Reverse((new_dist, to)));
                }
            }
        }

        distances.into_boxed_slice()
    }

    #[wasm_bindgen]
    pub fn free(&mut self) {
        self.adjacency_list.clear();
    }
}