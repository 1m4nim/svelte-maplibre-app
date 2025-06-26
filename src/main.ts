import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import "maplibre-gl/dist/maplibre-gl.css"

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
