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
    
    pub fn insert(&mut self, value: i32) {
        let root = self.root.take();
        self.root = self.insert_node(root, value);
    }
    
    pub fn search(&self, value: i32) -> bool {
        self.search_node(&self.root, value)
    }
    
    // その他のメソッド...
    
    fn height(node: &Option<Box<Node>>) -> i32 {
        match node {
            Some(n) => n.height,
            None => 0,
        }
    }
    
    fn balance_factor(node: &Option<Box<Node>>) -> i32 {
        match node {
            Some(n) => Self::height(&n.left) - Self::height(&n.right),
            None => 0,
        }
    }
    
    fn update_height(node: &mut Box<Node>) {
        node.height = 1 + max(
            Self::height(&node.left),
            Self::height(&node.right)
        );
    }

    fn insert_node(&mut self, node: Option<Box<Node>>, value: i32) -> Option<Box<Node>> {
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
                    return Some(n);  // 重複値は無視
                }
    
                Self::update_height(&mut n);
    
                let balance = Self::balance_factor(&Some(n.clone()));
    
                // 左の左ケース
                if balance > 1 && value < n.left.as_ref().unwrap().value {
                    return Some(Self::rotate_right(n));
                }
    
                // 左の右ケース
                if balance > 1 && value > n.left.as_ref().unwrap().value {
                    n.left = Some(Self::rotate_left(n.left.take().unwrap()));
                    return Some(Self::rotate_right(n));
                }
    
                // 右の右ケース
                if balance < -1 && value > n.right.as_ref().unwrap().value {
                    return Some(Self::rotate_left(n));
                }
    
                // 右の左ケース
                if balance < -1 && value < n.right.as_ref().unwrap().value {
                    n.right = Some(Self::rotate_right(n.right.take().unwrap()));
                    return Some(Self::rotate_left(n));
                }
    
                Some(n)
            }
        }
    }
    
    fn rotate_right(mut y: Box<Node>) -> Box<Node> {
        let mut x = y.left.take().unwrap();
        let t2 = x.right.take();
    
        x.right = Some(y);
        if let Some(ref mut y_node) = x.right {
            y_node.left = t2;
            Self::update_height(y_node);
        }
        Self::update_height(&mut x);
    
        x
    }
    
    fn rotate_left(mut x: Box<Node>) -> Box<Node> {
        let mut y = x.right.take().unwrap();
        let t2 = y.left.take();
    
        y.left = Some(x);
        if let Some(ref mut x_node) = y.left {
            x_node.right = t2;
            Self::update_height(x_node);
        }
        Self::update_height(&mut y);
    
        y
    }
    
    
    fn search_node(&self, node: &Option<Box<Node>>, value: i32) -> bool {
        match node {
            None => false,
            Some(n) => {
                if value == n.value {
                    true
                } else if value < n.value {
                    self.search_node(&n.left, value)
                } else {
                    self.search_node(&n.right, value)
                }
            }
        }
    }
}