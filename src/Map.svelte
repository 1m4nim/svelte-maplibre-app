<script>
  import maplibregl from 'maplibre-gl';
  import { onMount } from 'svelte';
  import { selectedPlace, isModalOpen } from './store';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let map;
  let searchTag = 'cafe'; // amenityタグの値
  let markers = [];

  async function searchByCategory() {
    clearMarkers();

    // 地図の現在の範囲を取得
    const bounds = map.getBounds();
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    const query = `
      [out:json][timeout:25];
      node["amenity"="${searchTag}"](${south},${west},${north},${east});
      out body;
    `.trim();

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.elements.length) {
        alert('該当する施設が見つかりませんでした');
        return;
      }

      data.elements.forEach(el => {
        const { lat, lon, tags } = el;
        const name = tags?.name || '名前なし';

        const marker = new maplibregl.Marker()
          .setLngLat([lon, lat])
          .addTo(map);

        marker.getElement().addEventListener('click', () => {
          selectedPlace.set({ name, lat, lng: lon });
          isModalOpen.set(true);
        });

        markers.push(marker);
      });

    } catch (e) {
      console.error('Overpass API エラー:', e);
      alert('施設情報の取得に失敗しました');
    }
  }

  function clearMarkers() {
    markers.forEach(m => m.remove());
    markers = [];
  }

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json', // ベース地図
      center: [139.7671, 35.6812], // 東京駅周辺
      zoom: 14,
    });

    map.on('load', () => {
      // OpenRailwayMapの路線図タイルを重ねる
      map.addSource('openrailwaymap', {
        type: 'raster',
        tiles: [
          'https://a.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
          'https://b.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
          'https://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
        attribution: '© OpenRailwayMap contributors'
      });

      map.addLayer({
        id: 'openrailwaymap-layer',
        type: 'raster',
        source: 'openrailwaymap',
        paint: {}
      });

      // 施設検索も実行
      searchByCategory();
    });
  });
</script>

<div>
  <label for="category-select">カテゴリ:</label>
  <select id="category-select" bind:value={searchTag}>
    <option value="cafe">カフェ</option>
    <option value="restaurant">レストラン</option>
    <option value="convenience">コンビニ</option>
    <option value="hotel">ホテル</option>
  </select>
  <button on:click={searchByCategory}>現在地図範囲で検索</button>
</div>

<div id="map" style="width: 100%; height: 600px; margin-top: 0.5rem;"></div>

<style>
  div {
    margin-bottom: 0.5rem;
  }
  label {
    margin-right: 0.5rem;
  }
  button {
    margin-left: 0.5rem;
    padding: 0.3rem 0.7rem;
    cursor: pointer;
  }
</style>
