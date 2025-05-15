interface TreeNode {
  value: number;
  height: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export class AVLTree {
  root: TreeNode | null = null;
  
  // ノードの高さを取得
  private getHeight(node: TreeNode | null): number {
    return node ? node.height : 0;
  }
  
  // バランスファクターを計算
  private getBalanceFactor(node: TreeNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }
  
  // ノードの高さを更新
  private updateHeight(node: TreeNode): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }
  
  // 右回転
  private rotateRight(y: TreeNode): TreeNode {
    const x = y.left as TreeNode;
    const T2 = x.right;
    
    x.right = y;
    y.left = T2;
    
    this.updateHeight(y);
    this.updateHeight(x);
    
    return x;
  }
  
  // 左回転
  private rotateLeft(x: TreeNode): TreeNode {
    const y = x.right as TreeNode;
    const T2 = y.left;
    
    y.left = x;
    x.right = T2;
    
    this.updateHeight(x);
    this.updateHeight(y);
    
    return y;
  }
  
  // ノードの挿入
  insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }
  
  private insertNode(node: TreeNode | null, value: number): TreeNode {
    // 通常のBST挿入
    if (node === null) {
      return { value, height: 1, left: null, right: null };
    }
    
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      // 重複値は許可しない
      return node;
    }
    
    // ノードの高さを更新
    this.updateHeight(node);
    
    // バランスファクターを取得
    const balance = this.getBalanceFactor(node);
    
    // 左の左のケース
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node);
    }
    
    // 左の右のケース
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left as TreeNode);
      return this.rotateRight(node);
    }
    
    // 右の右のケース
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node);
    }
    
    // 右の左のケース
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right as TreeNode);
      return this.rotateLeft(node);
    }
    
    return node;
  }
  
  // 検索機能
  search(value: number): boolean {
    return this.searchNode(this.root, value);
  }
  
  private searchNode(node: TreeNode | null, value: number): boolean {
    if (!node) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }
  
}