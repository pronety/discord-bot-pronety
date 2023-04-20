<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if data.error}
  <h1>Error</h1>
  <p>{data.error}</p>
{:else}
  <h1>Role Undiksha sudah ditambahkan!</h1>
  <p>Anda bisa menutup jendela ini</p>
{/if}
