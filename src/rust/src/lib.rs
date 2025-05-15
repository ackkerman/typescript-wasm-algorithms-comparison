mod quicksort;
mod avl_tree;
mod graph;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}

#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // ログ出力確認
    console_log!("Wasm module initialized successfully!");
    Ok(())
}

pub use quicksort::quick_sort;
pub use avl_tree::AVLTree;
pub use graph::Graph;