<script>
	import hexStore from "./store/hexStore";


  import ColorBar from "./components/ColorBar.svelte";
	import Footer from "./components/Footer.svelte";
	
	function activateSpacebar(e) {
		if (e.code === "Space") {
			e.preventDefault();
			hexStore.generate();
		}
	}
	
</script>

<svelte:window on:keydown={activateSpacebar}></svelte:window>

<div class="colors">
  <ColorBar color={$hexStore[0]} index={0} />
  <ColorBar color={$hexStore[1]} index={1} />
  <ColorBar color={$hexStore[2]} index={2} />
  <ColorBar color={$hexStore[3]} index={3} />
  <ColorBar color={$hexStore[4]} index={4} />
</div>

<Footer />
