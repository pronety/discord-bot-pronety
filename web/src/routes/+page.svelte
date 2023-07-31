<script lang="ts">
  import type { ActionData, PageServerData } from "./$types";
  import Icon from "@iconify/svelte";

  export let data: PageServerData;
  export let form: ActionData;
</script>

<svelte:head>
  <title>Dapatkan Role Undiksha - Discord Pronety</title>
  <meta
    name="description"
    content="Untuk memverifikasi email undiksha sebelum mendapat role undiksha"
  />
</svelte:head>

{#if form?.success}
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div
      class="flex flex-col gap-3 card overflow-hidden card-hover variant-ghost-surface text-center"
    >
      <div class="h1 text-success-500 mx-auto pt-8 px-8">
        <Icon icon="feather:check-circle" />
      </div>
      <div class="py-4 px-8 space-y-2">
        <h1 class="h2 font-semibold">Email berhasil dikirim!</h1>
        <p class="text-surface-400">Silahkan cek kotak pesan email anda</p>
        <div class="pt-1" />
        <a
          href="https://mail.google.com/"
          class="btn w-full variant-filled-primary"
          target="_blank"
          rel="noreferrer"
          ><span><Icon icon="feather:mail" class="mr-2" /></span> Buka Gmail di Web</a
        >
      </div>
      <div
        class="bg-surface-800 py-4 px-8 border-t border-t-surface-400 text-surface-400"
      >
        Pronety HMJ Teknik Informatika Undiksha
      </div>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="card card-hover flex flex-col gap-3 overflow-hidden variant-ghost-surface text-center"
    >
      <div class="h1 text-success-500 mx-auto pt-8 px-8">
        <Icon icon="feather:smile" />
      </div>
      <div class="px-8 py-4">
        <h1 class="h2 font-semibold">Halo @{data.user.username}</h1>
        <p class="text-surface-400">
          Masukkan email undiksha anda untuk diverifikasi:
        </p>
        <form
          action="?/kirimEmail"
          method="POST"
          class="flex flex-col gap-2 py-4"
        >
          <label class="label">
            <input
              required
              value={form?.email || ""}
              type="email"
              placeholder="Email undiksha"
              name="email"
              class="input px-4 py-2"
            />
          </label>
          <button type="submit" class="btn variant-filled-primary w-full">
            <span><Icon icon="feather:send" class="mr-2" /></span> Kirim
          </button>
        </form>
        {#if form?.email}
          <div class="alert variant-ghost-error">
            <small class="text-red-500">{form.message}</small>
          </div>
        {/if}
      </div>
      <div
        class="bg-surface-800 py-4 px-8 border-t border-t-surface-400 text-surface-400"
      >
        Pronety HMJ Teknik Informatika Undiksha
      </div>
    </div>
  </div>
{/if}
