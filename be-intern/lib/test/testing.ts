export const helloTest = () => {
  return true;
};

export class Calculator {
  value: Number;

  add(n: number): number {
    this.value = n;
    return n;
  }
}
