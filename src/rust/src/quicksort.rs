use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn quick_sort(mut arr: Vec<i32>) -> Vec<i32> {
    if arr.len() <= 1 {
        return arr;
    }
    quick_sort_in_place(&mut arr);
    arr
}

fn quick_sort_in_place(arr: &mut [i32]) {
    let len = arr.len();
    if len <= 1 {
        return;
    }
    let pivot_index = partition(arr);
    quick_sort_in_place(&mut arr[0..pivot_index]);
    quick_sort_in_place(&mut arr[pivot_index + 1..]);
}

fn partition(arr: &mut [i32]) -> usize {
    let len = arr.len();
    let pivot = arr[len - 1];
    let mut i = 0;
    for j in 0..len - 1 {
        if arr[j] <= pivot {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, len - 1);
    i
}
