declare module "astro:actions" {
	type Actions = typeof import("C:/Users/Stryxus/Projects/Website/src/actions")["server"];

	export const actions: Actions;
}