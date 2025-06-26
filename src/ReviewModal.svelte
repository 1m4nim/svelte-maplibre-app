<script>
  import { selectedPlace, isModalOpen } from './store';
  import { onDestroy } from 'svelte';

  let name = '';
  let review = '';
  let place;
  let show = false;

  const unsub1 = selectedPlace.subscribe(val => place = val);
  const unsub2 = isModalOpen.subscribe(val => show = val);

  onDestroy(() => {
    unsub1();
    unsub2();
  });

  function submitReview() {
    console.log('レビュー送信:', { name, review, place });
    alert(`レビューを送信しました\n店舗名: ${place?.name}\n名前: ${name}\nレビュー: ${review}`);
    name = '';
    review = '';
    isModalOpen.set(false);
  }
</script>

{#if show}
  <div class="backdrop">
    <div class="modal">
      <h2 class="review">{place?.name} にレビュー</h2>
      <input bind:value={name} placeholder="お名前" />
      <textarea bind:value={review} placeholder="レビュー内容"></textarea>
      <div class="buttons">
        <button on:click={submitReview}>送信</button>
        <button on:click={() => isModalOpen.set(false)}>閉じる</button>
      </div>
    </div>
  </div>
{/if}

<style>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 320px;
  max-width: 90vw;
}
input, textarea {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}
textarea {
  height: 80px;
  resize: vertical;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.review{
    color:black;
}
</style>
