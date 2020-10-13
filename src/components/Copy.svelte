<script>
  export let copyActive;
</script>

<style>
  .copy-container {
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
  .copy-container.active {
    opacity: 1;
    pointer-events: all;
  }

  .copy-popup {
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
  .copy-popup.active {
    transform: translateY(0rem);
  }

  h4 {
    color: #4ecc40;
    font-size: 3rem;
    padding: 2rem;
  }
</style>

<div class="copy-container" class:active={copyActive}>
  <div class="copy-popup" class:active={copyActive}>
    <h3>Copied to clipboard!</h3>
    <h4>&#10003;</h4>
  </div>
</div>
