use wasm_bindgen::prelude::*;
use std::cmp::max;

#[wasm_bindgen]
pub struct AVLTree {
    nodes: Vec<Node>,
    root: Option<usize>,
}

#[derive(Clone)]
struct Node {
    value: i32,
    height: i32,
    left: Option<usize>,
    right: Option<usize>,
}

#[wasm_bindgen]
impl AVLTree {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        AVLTree { nodes: Vec::new(), root: None }
    }

    #[wasm_bindgen]
    pub fn insert_many(&mut self, values: &[i32]) {
        let mut values = values.to_vec();
        values.sort_unstable();
        values.dedup();
        for &v in &values {
            self.root = Some(self.insert_node(self.root, v));
        }
    }

    #[wasm_bindgen]
    pub fn search_many(&self, values: &[i32]) -> Vec<u8> {
        values.iter().map(|&v| self.search_node(self.root, v) as u8).collect()
    }

    #[wasm_bindgen]
    pub fn free(&mut self) {
        self.nodes.clear();
        self.root = None;
    }

    fn insert_node(&mut self, node_idx: Option<usize>, value: i32) -> usize {
        match node_idx {
            None => {
                let idx = self.nodes.len();
                self.nodes.push(Node { value, height: 1, left: None, right: None });
                idx
            },
            Some(idx) => {
                let mut node = self.nodes[idx].clone();
                if value < node.value {
                    node.left = Some(self.insert_node(node.left, value));
                } else if value > node.value {
                    node.right = Some(self.insert_node(node.right, value));
                } else {
                    return idx;
                }

                Self::update_height(&mut node, &self.nodes);
                let rebalanced_idx = self.rebalance(node, idx);
                rebalanced_idx
            }
        }
    }

    fn search_node(&self, node_idx: Option<usize>, value: i32) -> bool {
        match node_idx {
            None => false,
            Some(idx) => {
                let node = &self.nodes[idx];
                match value.cmp(&node.value) {
                    std::cmp::Ordering::Equal => true,
                    std::cmp::Ordering::Less => self.search_node(node.left, value),
                    std::cmp::Ordering::Greater => self.search_node(node.right, value),
                }
            }
        }
    }

    fn height(nodes: &Vec<Node>, idx: Option<usize>) -> i32 {
        idx.map_or(0, |i| nodes[i].height)
    }

    fn update_height(node: &mut Node, nodes: &Vec<Node>) {
        node.height = 1 + max(Self::height(nodes, node.left), Self::height(nodes, node.right));
    }

    fn balance_factor(node: &Node, nodes: &Vec<Node>) -> i32 {
        Self::height(nodes, node.left) - Self::height(nodes, node.right)
    }

    fn rebalance(&mut self, mut node: Node, original_idx: usize) -> usize {
        let balance = Self::balance_factor(&node, &self.nodes);

        if balance > 1 {
            if Self::balance_factor(&self.nodes[node.left.unwrap()], &self.nodes) < 0 {
                node.left = Some(self.rotate_left(node.left.unwrap()));
            }
            return self.rotate_right_node(node);
        }

        if balance < -1 {
            if Self::balance_factor(&self.nodes[node.right.unwrap()], &self.nodes) > 0 {
                node.right = Some(self.rotate_right(node.right.unwrap()));
            }
            return self.rotate_left_node(node);
        }

        self.nodes[original_idx] = node;
        original_idx
    }

    fn rotate_left(&mut self, x_idx: usize) -> usize {
        let mut x = self.nodes[x_idx].clone();
        let y_idx = x.right.unwrap();
        let mut y = self.nodes[y_idx].clone();

        x.right = y.left;
        Self::update_height(&mut x, &self.nodes);
        y.left = Some(x_idx);
        Self::update_height(&mut y, &self.nodes);

        self.nodes[x_idx] = x;
        self.nodes[y_idx] = y;
        y_idx
    }

    fn rotate_right(&mut self, y_idx: usize) -> usize {
        let mut y = self.nodes[y_idx].clone();
        let x_idx = y.left.unwrap();
        let mut x = self.nodes[x_idx].clone();

        y.left = x.right;
        Self::update_height(&mut y, &self.nodes);
        x.right = Some(y_idx);
        Self::update_height(&mut x, &self.nodes);

        self.nodes[y_idx] = y;
        self.nodes[x_idx] = x;
        x_idx
    }

    fn rotate_left_node(&mut self, node: Node) -> usize {
        let idx = self.nodes.len();
        self.nodes.push(node);
        self.rotate_left(idx)
    }

    fn rotate_right_node(&mut self, node: Node) -> usize {
        let idx = self.nodes.len();
        self.nodes.push(node);
        self.rotate_right(idx)
    }
}