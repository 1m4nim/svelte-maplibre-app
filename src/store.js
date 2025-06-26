import { writable } from 'svelte/store';

export const selectedPlace = writable(null);
export const isModalOpen = writable(false);
