<script lang="ts">
  import { Popover } from "@skeletonlabs/skeleton-svelte";
  let { heatingPower, roundingOption } = $props();
  import { sec2time, wattageStore } from "$lib";
  let wattages: Set<number> = $state(new Set<number>());
  wattageStore.subscribe((value) => {
    wattages = new Set(value);
  })
  function calculateTime(wattage: number): number {
    switch(roundingOption) {
      case "ceil":
        return Math.ceil(heatingPower / wattage / 10) * 10;
      case "floor":
        return Math.floor(heatingPower / wattage / 10) * 10;
      case "round":
        return Math.round(heatingPower / wattage / 10) * 10;
      default:
        return Math.round(heatingPower / wattage / 10) * 10;
    }
  }

  let inputWattage: number | undefined = $state();
  let openState = $state(false);

</script>


<div class="table-wrap w-72 md:w-96 md:mx-2 my-2 mb-4 p-1 preset-filled-surface-100-900 rounded-container">
  <table class="table">
    <thead>
      <tr>
        <th>Wattage</th>
        <th>Time</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each Array.from(wattages).sort((a,b)=> {return a - b}) as wattage}
        <tr>
          <td>{wattage} W</td>
          <td class="text-right">{sec2time(calculateTime(wattage))}</td>
          <td>
            <button class="btn btn-sm preset-outlined-error-200-800 w-full" onclick={() => {
              wattages.delete(wattage)
              wattageStore.set(Array.from(wattages))
            }}>Delete</button>
          </td>
        </tr>
      {/each}
      <tr>
        <td>
          <div class="w-32 input-group divide-surface-200-800 divide-x grid-cols-[1fr_auto]">
            <input type="number" class="input" bind:value={inputWattage} step="10" min="0" />
            <span class="input-group-cell">W</span>
          </div>
        </td>
        <td>
          {#if inputWattage}
            <div class="text-right">{sec2time(calculateTime(inputWattage as number))}</div>
          {:else}
            <div class="text-right">-</div>
          {/if}
        </td>
        <td class="text-right">
          <button class="btn btn-sm preset-filled w-full" onclick={() => {
            if(inputWattage && !wattages.has(inputWattage)) {
              wattageStore.set(Array.from(wattages.add(inputWattage as number)))
            }
          }}>Add</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td rowspan="3">
          <Popover
            bind:open={openState}
            positioning={{placement: "top"}}
            contentBase="card bg-surface-300-700 p-4 space-y-2 max-w-96"
            arrow
            arrowBase="!bg-surface-300 dark:!bg-surface-700"
          >
            {#snippet trigger()}
              <button class="btn preset-tonal-surface">reset</button>
            {/snippet}
            {#snippet content()}
              <div class="h3">Confirm</div>
              <p>Do you want to reset wattages?</p>
              <p>This action can't be undone.</p>
              <button class="btn preset-filled-error-500" onclick={() => {
                wattageStore.set([150, 500, 600, 700, 800, 900, 1000, 1500]);
                openState = false;
              }}>reset wattages</button>
            {/snippet}
          </Popover>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
