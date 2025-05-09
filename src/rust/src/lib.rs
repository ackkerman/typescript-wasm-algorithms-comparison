mod quicksort;
mod avl_tree;
mod graph;

use wasm_bindgen::prelude::*;

// ブラウザのコンソールでログを表示できるようにする
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// マクロでログ出力を簡略化
macro_rules! console_log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}

// Wasmモジュールの初期化時に呼ばれる関数
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // ログ出力確認
    console_log!("Wasm module initialized successfully!");
    Ok(())
}

// 各モジュールの関数をエクスポート
pub use quicksort::quick_sort;
pub use avl_tree::AVLTree;
pub use graph::Graph;