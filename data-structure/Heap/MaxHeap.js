import Heap from './Heap.js';

class MaxHeap extends Heap {
  bubbleUp() {
    let index = this.heap.length - 1;

    while (index !== 0 && this.getParent(index) !== undefined && this.getParent(index) < this.heap[index]) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (
      (this.getLeftChild(index) !== undefined && this.getLeftChild(index) > this.heap[index]) ||
      (this.getRightChild(index) !== undefined && this.getRightChild(index) > this.heap[index])
    ) {
      let targetIndex = 0;
      if (this.getLeftChild(index) !== undefined && this.getRightChild(index) !== undefined) {
        targetIndex =
          this.getLeftChild(index) >= this.getRightChild(index)
            ? this.getLeftChildIndex(index)
            : this.getRightChildIndex(index);
      } else if (this.getLeftChild(index) !== undefined) {
        targetIndex = this.getLeftChildIndex(index);
      } else {
        targetIndex = this.getRightChildIndex(index);
      }
      this.swap(targetIndex, index);
      index = targetIndex;
    }
  }

  add(data) {
    this.heap.push(data);

    this.bubbleUp();
  }

  pop() {
    const root = this.peekRoot();
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.bubbleDown();
    return root;
  }
}

export default MaxHeap;
