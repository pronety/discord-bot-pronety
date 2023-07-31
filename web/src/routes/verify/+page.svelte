<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if data.error}
  <h1>Error</h1>
  <p>{data.error}</p>
{:else}
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div
      class="flex flex-col gap-3 card overflow-hidden card-hover variant-ghost-surface text-center"
    >
      <div class="h1 text-success-500 mx-auto pt-8 px-8">
        <Icon icon="feather:user-plus" />
      </div>
      <div class="py-4 px-8 space-y-2">
        <h1 class="h2 font-semibold">Role berhasil ditambahkan!</h1>
        <p class="text-surface-400">Anda bisa menutup jendela ini</p>
        <div class="pt-1" />
      </div>
      <div
        class="bg-surface-800 py-4 px-8 border-t border-t-surface-400 text-surface-400"
      >
        Pronety HMJ Teknik Informatika Undiksha
      </div>
    </div>
  </div>
{/if}
