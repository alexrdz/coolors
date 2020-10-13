<script>
  import hexStore from "../store/hexStore";
  import modalsStore from "../store/modalsStore";
  import { palettes } from "../store/localStorage";

  export let libraryActive;
  // $: paletteNames = Object.keys($palettes);


  function deletePalette(paletteName) {
    const p = $palettes;
    delete p[paletteName];
    palettes.update(state => p);
  }
</script>

<style>
  .library-container {
    align-items: center;
    background-color: rgba(40, 40, 40, 0.5);
    display: flex;
    justify-content: center;
    height: 100%;
    left: 0;
    position: fixed;
    transition: all 0.3s ease-in-out;
    top: 0;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }
  .library-container.active {
    opacity: 1;
    pointer-events: all;
  }

  .library-popup {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    padding: 3rem 0;
    transition: transform 0.3s ease;
    transform: translateY(-3rem);
    min-width: 60%;
    min-height: 30vh;
  }
  .library-popup.active {
    transform: translateY(0rem);
  }

  .close-save {
    border: none;
    background-color: transparent;
    color: #aaa;
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    right: 1rem;
    top: 0.5rem;
  }

  h4 {
    color: rgba(40, 40, 40, 0.5);
    font-size: 2rem;
    padding: 2rem;
  }
  .palette {
    align-items: center;
    display: flex;
    margin: 0.5rem;
    width: 85%;
  }
  .color-name {
    margin-right: 1rem;
    width: 30%;
  }
  .color-square {
    display: block;
    height: 40px;
    width: 40px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 1rem;
    width: 10%;
  }
  .select {
    margin-left: 1rem;
  }
</style>

<div class="library-container" class:active={libraryActive}>
  <div class="library-popup" class:active={libraryActive}>
    <button
      class="close-save"
      on:click={() => ($modalsStore.libraryActive = false)}>&times;</button>

    <h4>Choose a palette</h4>

    
    {#each Object.keys($palettes) as p}
      <div class="palette">
        <span class="color-name">{p}</span>
        {#each $palettes[p] as color}
          <span style="background-color: {color}" class="color-square" />
        {/each}
        <button
          class="select"
          on:click={() => hexStore.set($palettes[p])}>Select</button>
        <button
          class="delete"
          on:click={() => deletePalette(p)}>&times;</button>
      </div>
    {/each}
  </div>
</div>
