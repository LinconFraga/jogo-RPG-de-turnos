<script lang="ts">
  import {onMount} from "svelte";
  
  onMount(async () => {
    const k = (await import("$lib/game/kaplay")). default;
    
    const phase0 = (await import("$lib/game/phases/phase0"))

    await k.go("phase0")
  });
</script>