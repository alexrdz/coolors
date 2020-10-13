<script>
  import chroma from "chroma-js";
  import hexStore from "../store/hexStore";
  import modalsStore from "../store/modalsStore";

  export let color;
  export let index;

  let showSliders = false;
  let locked = false;

  let hexColor = chroma(color);
  $: prevColor = $hexStore[index];
  $hexStore[index] = hexColor.hex();

  let hueValue = hexColor.get("hsl.h");
  let saturationValue = hexColor.get("hsl.s");
  let brightnessValue = hexColor.get("hsl.l");

  $: textColor = hexColor.luminance() > 0.5 ? "#232323" : "#d6d6d6";

  // set saturation slider colors
  $: noSaturation = hexColor.set("hsl.s", 0);
  $: fullSaturation = hexColor.set("hsl.s", 1);
  $: scaleSaturation = chroma.scale([noSaturation, hexColor, fullSaturation]);
  $: saturationSliderStyle = `background-image: linear-gradient(to right, ${scaleSaturation(
    0
  )}, ${scaleSaturation(1)})`;

  // set brightness slider colors
  $: midBrightness = hexColor.set("hsl.l", 0.5);
  $: scaleBrightness = chroma.scale([
    "black",
    midBrightness,
    hexColor,
    "white",
  ]);
  $: brightnessSliderStyle = `background-image: linear-gradient(to right, ${scaleBrightness(
    0
  )}, ${scaleBrightness(0.5)}, ${scaleBrightness(1)})`;

  // set hue slider colors
  const hueSliderStyle = `background-image: linear-gradient(to right, rgb(204, 75, 75), rgb(204,204,75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204,75,75))`;

  function setHex(e) {
    $hexStore[index] = e.target.value;
  }

  function setHue() {
    hexColor = chroma(prevColor).set("hsl.h", hueValue);
    $hexStore[index] = hexColor.hex();
  }

  function setBrightness() {
    hexColor = chroma(hexColor).set("hsl.l", brightnessValue);
    $hexStore[index] = hexColor.hex();
  }

  function setSaturation() {
    hexColor = chroma(hexColor).set("hsl.s", saturationValue);
    $hexStore[index] = hexColor.hex();
  }

  function copyToClipboard() {
    const el = document.createElement("textarea");
    el.value = hexColor.hex();
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    $modalsStore.copyActive = true;
    setTimeout(() => ($modalsStore.copyActive = false), 1000);
  }

  function toggleLockColor() {
    locked = !locked;
    hexStore.lockColor(index, color);
  }
</script>

<style>
  span {
    color: rgb(120, 120, 120);
  }

  input[type="text"] {
    margin: 1rem 0 1.5rem 0;
    padding: .75rem;
    border: 1px solid #aaa;
  }
</style>

<div class="color" style="background-color: {color}">
  <h2 style="color: {textColor}" on:click={copyToClipboard}>
    {$hexStore[index]}
  </h2>
  <div class="controls">
    <button
      class="adjust-button icon-button"
      on:click={() => (showSliders = !showSliders)}>
      <img class="icon" src="/icons/sliders.svg" alt="" />
    </button>
    <button class="lock icon-button" on:click={toggleLockColor}>
      {#if locked}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
            d="M18.75 9H18V6c0-3.309-2.691-6-6-6S6 2.691 6 6v3h-.75A2.253 2.253 0 003 11.25v10.5C3 22.991 4.01 24 5.25 24h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5C21 10.009 19.99 9 18.75 9zM8 6c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8zm5 10.722V19a1 1 0 11-2 0v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" /></svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.65 512.65"><path
            d="M409.925 205.45h-230.4v-74.24c0-38.4 25.6-71.68 61.44-79.36 48.64-7.68 92.16 28.16 92.16 76.8 0 15.36 12.8 25.6 25.6 25.6s25.6-10.24 25.6-25.6c0-74.24-64-135.68-140.8-128-66.56 7.68-115.2 66.56-115.2 133.12v71.68h-25.6c-12.8 0-25.6 10.24-25.6 25.6v256c0 12.8 12.8 25.6 25.6 25.6h307.2c15.36 0 25.6-12.8 25.6-25.6v-256c0-15.36-10.24-25.6-25.6-25.6zm-128 171.52v33.28c0 15.36-10.24 25.6-25.6 25.6s-25.6-10.24-25.6-25.6v-33.28c-15.36-10.24-25.6-25.6-25.6-43.52 0-33.28 30.72-56.32 64-48.64 17.92 5.12 33.28 20.48 38.4 38.4 5.12 23.04-7.68 43.52-25.6 53.76z" /></svg>
      {/if}
    </button>
  </div>

  <div class="sliders" class:active={showSliders}>
    <button
      class="close-adjustment"
      on:click={() => (showSliders = false)}>&times;</button>

    <span>Hex</span>
    <input type="text" placeholder={hexColor} value={hexColor} on:input={setHex}>

    <span>Hue</span>
    <input
      bind:value={hueValue}
      on:input={setHue}
      style={hueSliderStyle}
      type="range"
      min="0"
      max="360"
      step="1"
      name="hue"
      class="hue-input" />

    <span>Brightness</span>
    <input
      bind:value={brightnessValue}
      on:input={setBrightness}
      style={brightnessSliderStyle}
      type="range"
      min="0"
      max="1"
      step="0.01"
      name="brightness"
      class="bright-input" />

    <span>Saturation</span>
    <input
      bind:value={saturationValue}
      on:input={setSaturation}
      style={saturationSliderStyle}
      type="range"
      min="0"
      max="1"
      step="0.01"
      name="saturation"
      class="sat-input" />
  </div>
</div>
