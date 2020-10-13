import { writable } from "svelte/store";

const initialState = {
  copyActive: false,
  saveActive: false,
  libraryActive: false,
};

function modalsStore() {
  const { subscribe, update, set } = writable(initialState);

  return {
    subscribe,
    update,
    set,
  };
}

export default modalsStore();
