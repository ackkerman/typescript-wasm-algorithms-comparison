use wasm_bindgen::prelude::*;
use std::cmp::max;

#[wasm_bindgen]
pub struct AVLTree {
    root: Option<Box<Node>>,
}

#[derive(Clone)]
struct Node {
    value: i32,
    height: i32,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}

#[wasm_bindgen]
impl AVLTree {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        AVLTree { root: None }
    }

    #[wasm_bindgen]
    pub fn insert_many(&mut self, values: &[i32]) {
        for &v in values {
            let root = self.root.take();
            self.root = self.insert_node(root, v);
        }
    }

    #[wasm_bindgen]
    pub fn search_many(&self, values: &[i32]) -> Vec<u8> {
        values.iter().map(|&v| self.search_node(&self.root, v) as u8).collect()
    }

    #[wasm_bindgen]
    pub fn free(&mut self) {
        self.root = None;
    }

    fn insert_node(&self, node: Option<Box<Node>>, value: i32) -> Option<Box<Node>> {
        match node {
            None => Some(Box::new(Node {
                value,
                height: 1,
                left: None,
                right: None,
            })),
            Some(mut n) => {
                if value < n.value {
                    n.left = self.insert_node(n.left.take(), value);
                } else if value > n.value {
                    n.right = self.insert_node(n.right.take(), value);
                } else {
                    return Some(n);
                }
                Self::update_height(&mut n);
                Some(Self::rebalance(n))
            }
        }
    }

    fn search_node(&self, node: &Option<Box<Node>>, value: i32) -> bool {
        match node {
            None => false,
            Some(n) => match value.cmp(&n.value) {
                std::cmp::Ordering::Equal => true,
                std::cmp::Ordering::Less => self.search_node(&n.left, value),
                std::cmp::Ordering::Greater => self.search_node(&n.right, value),
            },
        }
    }

    fn height(node: &Option<Box<Node>>) -> i32 {
        node.as_ref().map_or(0, |n| n.height)
    }

    fn update_height(node: &mut Box<Node>) {
        node.height = 1 + max(Self::height(&node.left), Self::height(&node.right));
    }

    fn balance_factor(node: &Box<Node>) -> i32 {
        Self::height(&node.left) - Self::height(&node.right)
    }

    fn rebalance(mut node: Box<Node>) -> Box<Node> {
        let balance = Self::balance_factor(&node);

        if balance > 1 {
            if Self::balance_factor(node.left.as_ref().unwrap()) < 0 {
                node.left = Some(Self::rotate_left(node.left.take().unwrap()));
            }
            return Self::rotate_right(node);
        }

        if balance < -1 {
            if Self::balance_factor(node.right.as_ref().unwrap()) > 0 {
                node.right = Some(Self::rotate_right(node.right.take().unwrap()));
            }
            return Self::rotate_left(node);
        }

        node
    }

    fn rotate_left(mut x: Box<Node>) -> Box<Node> {
        let mut y = x.right.take().unwrap();
        x.right = y.left.take();
        Self::update_height(&mut x);
        y.left = Some(x);
        Self::update_height(&mut y);
        y
    }

    fn rotate_right(mut y: Box<Node>) -> Box<Node> {
        let mut x = y.left.take().unwrap();
        y.left = x.right.take();
        Self::update_height(&mut y);
        x.right = Some(y);
        Self::update_height(&mut x);
        x
    }
}