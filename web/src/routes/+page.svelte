<script lang="ts">
  import type { ActionData, PageServerData } from "./$types";

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
  <h1>Email berhasil dikirim!</h1>
  <p>Silahkan cek kotak pesan email anda</p>
{:else}
  <div
    class="flex items-center justify-center h-screen bg-[url(/bg.jpeg)] -hue-rotate-60 object-cover"
  >
    <div class="p-10 rounded-md shadow-md space-y-4 bg-white hue-rotate-60">
      <h4>Halo {data.user.username} #{data.user.discriminator}</h4>
      <p>Masukkan email undiksha anda untuk diverifikasi:</p>

      <form
        action="?/kirimEmail"
        method="POST"
        class="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
      >
        <label class="wrapper">
          <input
            required
            value={form?.email || ""}
            type="email"
            placeholder="Email undiksha"
            name="email"
            class="input"
          />
          <span class="placeholder">Email undiksha</span>
        </label>
        <button type="submit">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <span>Kirim</span>
        </button>
      </form>
      {#if form?.email}
        <small class="text-red-500">{form.message}</small>
      {/if}
    </div>
  </div>
{/if}

<style>
  .wrapper {
    position: relative;
  }

  .input {
    width: 190px;
    height: 45px;
    border-radius: 32px;
    border: 2px #323232 solid;
    padding: 5px 15px;
    background-color: #e8e8e8;
    font-size: 15;
    font-weight: 500;
  }

  .placeholder {
    width: 100%;
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    text-align: center;
    color: green;
    background-color: #e8e8e8;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 1.5px;
    transition: all 0.3s;
    opacity: 0;
  }

  .input::placeholder {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .input:focus + .placeholder {
    opacity: 1;
  }

  .input:focus {
    outline: 2px solid green;
    border: none;
    color: green;
  }

  .input:focus::placeholder {
    opacity: 0;
  }

  button {
    font-family: inherit;
    font-size: 20px;
    background: green;
    color: white;
    padding: 0.5em 0.8em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 32px;
    overflow: hidden;
    transition: all 0.2s;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button:hover span {
    transform: translateX(5em);
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
</style>
