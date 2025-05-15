use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn quick_sort(mut arr: Vec<i32>) -> Vec<i32> {
    let len = arr.len();
    if len <= 1 {
        return arr;
    }
    
    quick_sort_internal(&mut arr, 0, (len - 1) as i32);
    arr
}

fn quick_sort_internal(arr: &mut Vec<i32>, left: i32, right: i32) {
    if left < right {
        let pivot_index = partition(arr, left, right);
        quick_sort_internal(arr, left, pivot_index - 1);
        quick_sort_internal(arr, pivot_index + 1, right);
    }
}

fn partition(arr: &mut Vec<i32>, left: i32, right: i32) -> i32 {
    let pivot = arr[right as usize];
    let mut i = left - 1;
    
    for j in left..right {
        if arr[j as usize] <= pivot {
            i += 1;
            arr.swap(i as usize, j as usize);
        }
    }
    
    arr.swap((i + 1) as usize, right as usize);
    i + 1
}