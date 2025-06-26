<script>
  import Map from './Map.svelte';
  import ReviewModal from './ReviewModal.svelte';
</script>

<main>
  <h1>Svelte + MapLibre <br/>地図レビューアプリ</h1>
  <Map />
  <ReviewModal />
</main>

<style>
  main {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
</style>
