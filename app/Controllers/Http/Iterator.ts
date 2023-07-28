class Iterator<T> {
  private data: T[];
  private index: number;

  constructor(data: T[]) {
    this.data = data;
    this.index = 0;
  }

  hasNext(): boolean {
    return this.index < this.data.length;
  }

  next(): T | undefined {
    if (this.hasNext()) {
      const value = this.data[this.index];
      this.index++;
      return value;
    } else {
      return undefined;
    }
  }
}

// Export the class
export { Iterator };
