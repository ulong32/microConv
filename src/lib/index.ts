import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";
export const wattageStore = persisted("wattages", [150, 500, 600, 700, 800, 900, 1000, 1500]);
export function sec2time(seconds: number): string {
  return `${Math.floor(seconds / 60)}m${(seconds % 60).toString().padStart(2, "0")}s`;
}
