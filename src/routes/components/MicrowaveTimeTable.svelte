<script lang="ts">
  let { heatingPower, roundingOption } = $props();
  import { sec2time, wattages } from "$lib";
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
</script>


<div class="table-wrap w-fit min-w-96 mx-auto md:mx-2 my-2 mb-4 p-1 preset-filled-surface-100-900 rounded-container">
  <table class="table">
    <thead>
      <tr>
        <th>Wattage</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {#each wattages as wattage}
      {@const heatingTime = calculateTime(wattage)}
        <tr>
          <td>{wattage} W</td>
          <td class="text-right">{sec2time(heatingTime)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
