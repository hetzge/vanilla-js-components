// @ts-check

let id = 100000000;
export function generateId() {
  return (id++).toString(36);
}

