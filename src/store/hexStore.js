import { writable } from "svelte/store";
import chroma from "chroma-js";

function createPalette() {
  const first = chroma.random().hex();
    const second = chroma.random().hex();
    return chroma.scale([first, second]).mode('hsl').colors(5);
}

const initialState = createPalette();

const hexStore = () => {
  const { subscribe, set, update } = writable(initialState);
  const locked = Array(5).fill('');
  
  function generate() {
    const newState = createPalette();
    locked.forEach((color, i) => {
      if (!!color) {
        newState[i] = color;
      }
    });
    set(newState);
  }
  
  function lockColor(index, hex) {
    if (!!locked[index]) {
      locked[index] = '';
    } else {
      locked[index] = hex;
    }
  }

  return {
    subscribe,
    set,
    update,
    generate,
    lockColor
  };
};

export default hexStore();
