<script lang="ts">
  import MicrowaveTimeTable from "./components/MicrowaveTimeTable.svelte";
  import { wattageStore } from "$lib";
  let wattages: Set<number> = $state(new Set<number>());
  wattageStore.subscribe((value) => {
    wattages = new Set(value);
  })
  let selectedWattage: number = $state(500);
  let roundingOption: "ceil" | "round" | "floor" = $state("round");
  let heatingMinutes: number = $state(0);
  let heatingSeconds: number = $state(0);
  let heatingTime: number = $derived(heatingMinutes * 60 + heatingSeconds);
  let heatingPower: number = $derived(selectedWattage * heatingTime);
  $effect(() => {
    if(heatingSeconds >= 60) {
      heatingMinutes += Math.floor(heatingSeconds / 60);
      heatingSeconds = heatingSeconds % 60;
    }
  })
</script>
<div class="flex flex-col md:flex-row justify-center place-items-center">
  <div class="w-fit mx-auto md:mx-2 bg-surface-900 m-2 p-3 rounded-container flex flex-col justify-evenly">
    <label class="label">
      <span class="label-text">Heating time</span>
      <div class="input-group divide-surface-200-800 divide-x grid-cols-[0.5fr_auto_0.5fr_auto]">
        <input type="number" class="pl-2 py-1" bind:value={heatingMinutes}  placeholder="Input..." step="1" min=0 />
        <div class="input-group-cell">m</div>
        <input type="number" class="pl-2 py-1" bind:value={heatingSeconds}  placeholder="Input..." step="10" min=0 />
        <div class="input-group-cell">s</div>
      </div>
    </label>
    <nav class="btn-group grid grid-cols-3 preset-outlined-surface-200-800">
      <button class="btn preset-filled" onclick={() => {heatingMinutes+=10}}>+10m</button>
      <button class="btn preset-filled" onclick={() => {heatingMinutes++}}>+1m</button>
      <button class="btn preset-filled" onclick={() => {heatingSeconds+=10}}>+10s</button>
      <hr class="hr border-t-2 col-span-3" />
      <button class="btn btn-sm preset-outlined-surface-300-700 col-span-3" onclick={() => {heatingMinutes = heatingSeconds = 0;}}>reset</button>
    </nav>
    <label class="label">
      <span class="label-text">Wattage</span>
      <select bind:value={selectedWattage} class="select rounded-container">
        {#each wattages as wattage}
          <option value={wattage}>{wattage} W</option>
        {/each}
      </select>
    </label>
    <div class="m-2">
      <div class="text-sm">Rounding option</div>
      <label class="block">
        <input type="radio" name="rounding-option" value="ceil" bind:group={roundingOption}>
        <span class="ml-2">Ceil</span>
      </label>
      <label class="block">
        <input type="radio" name="rounding-option" value="floor" bind:group={roundingOption}>
        <span class="ml-2">Floor</span>
      </label>
      <label class="block">
        <input type="radio" name="rounding-option" value="round" bind:group={roundingOption}>
        <span class="ml-2">Round</span>
      </label>
    </div>
  </div>
  <div class="m-2 md:-rotate-90 opacity-90">
    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 56 56">
      <path fill="currentColor" d="M27.988 5.863c-1.218 0-2.086.844-2.086 2.063v30.867l.188 5.016l-7.031-7.711l-5.32-5.25c-.376-.375-.938-.563-1.5-.563c-1.15 0-2.016.89-2.016 2.04c0 .562.21 1.054.656 1.523L26.44 49.434c.446.468.985.703 1.547.703c.586 0 1.125-.235 1.57-.703L45.12 33.848c.445-.47.656-.961.656-1.524c0-1.148-.867-2.039-2.039-2.039c-.539 0-1.101.188-1.476.563l-5.344 5.25l-7.008 7.687l.188-4.992V7.926c0-1.219-.89-2.063-2.11-2.063" />
    </svg>
  </div>
  <div>
    <MicrowaveTimeTable {heatingPower} {roundingOption}/>
  </div>
</div>

<style>
  button {
    @apply touch-manipulation;
  }
</style>
