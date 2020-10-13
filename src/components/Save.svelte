<script>
  export let saveActive;
  import modalsStore from "../store/modalsStore";
  import hexStore from "../store/hexStore";
  import {palettes} from "../store/localStorage";

  let paletteName = '';
  

  function focusInput(el) {
    if (saveActive) {
      el.focus();

    }
  }


  function savePalette() {
    palettes.update(state => {
      return {
        ...state,
        [paletteName]: $hexStore
      };
    });
    paletteName = '';
    $modalsStore.saveActive = false;
  }
</script>

<style>
  .save-container {
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
  .save-container.active {
    opacity: 1;
    pointer-events: all;
  }

  .save-popup {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    transition: transform 0.3s ease;
    transform: translateY(-3rem);
    min-width: 30%;
    min-height: 30vh;
  }
  .save-popup.active {
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
    top: .5rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }
  h4 {
    color: rgba(40, 40, 40, 0.5);
    font-size: 2rem;
    padding: 2rem;
  }

  input {
    border: 1px solid #aaa;
    margin: 1rem auto;
    padding: .5rem;
    width: 65%;
  }

  .submit-save {
    background-color: rgb(34, 27, 27);
    border: none;
    border-radius: 4px;
    color: #ccc;
    margin: 0 auto;
    padding: 1rem 2rem;
    width: 50%;
  }
</style>


<div class="save-container" class:active={saveActive}>
  <div class="save-popup" class:active={saveActive}>
    <button class="close-save" on:click={() => $modalsStore.saveActive = false}>&times;</button>

    {#if $modalsStore.saveActive}
      <form on:submit|preventDefault={savePalette}>
        <h4>Name your palette</h4>
        <input bind:value={paletteName} use:focusInput type="text" maxlength="35" class="save-name" />
        <button type="submit" class="submit-save">Save</button>
      </form>
    {/if}
  </div>
</div>