<script>
  import locales from "../locales/en.json";
  import src from "../assets/logo.png";

  let config = {
    docsUrl: "https://docs.langsync.app/",
  };

  let email = "";
  let invalidEmail = false;
  let isLoading = false;

  let emailRegex = new RegExp(
    // eslint-disable-next-line no-useless-escape
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
  );
  function handleClick() {
    if (!emailRegex.test(email)) {
      invalidEmail = true;
    } else {
      registerEmail();
    }

    async function registerEmail() {
      try {
        isLoading = true;

        const response = await fetch("/new-interest", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // console.log(response);

        // @ts-ignore
        my_modal_5.showModal();
      } catch (error) {
        console.error(error);
      } finally {
        isLoading = false;
      }
    }
  }

  $: !!email ? (invalidEmail = false) : null;
</script>

<div class="container mx-auto text-center" style="width: 965px">
  <div class="navbar">
    <div class="flex-1">
      <img class="w-10" {src} alt="LangSync Logo" />

      <div class="w-5" />
      <h1 class="text-xl font-extralight">LangSync</h1>
    </div>

    <div class="flex-none">
      <button
        on:click={() => window.open(config.docsUrl, "_blank")}
        class="btn btn-active btn-sm btn-primary float-right"
      >
        {locales.documentation}
        <ion-icon name="document-text-outline" />
      </button>
    </div>
  </div>

  <div class="h-40" />

  <div
    class="alert absolute w-auto left-[50%] bottom-0"
    style="
    transform: translate(-50%, -50%);
 }
"
  >
    <span>{locales.alertText}</span>
    <div>
      <button
        on:click={() => window.open(config.docsUrl, "_blank")}
        class="btn btn-outline btn-sm">{locales.docs}</button
      >
    </div>
  </div>

  <div class="mx-auto" style="width: 650px">
    <h3 class="text-center font-bold text-5xl bg-clip-text">
      {locales.bigTitle}
    </h3>

    <div class="h-7" />

    <p class="text-center text-sm">{locales.description}</p>
    <div class="h-14" />

    <div class=" flex">
      <input
        bind:value={email}
        type="email"
        on:keyup={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
        class="input input-bordered {invalidEmail
          ? ' border-2 border-red-500 placeholder-grey-500'
          : ''}"
        placeholder="john.doe@example.com"
        style="width: 70%;"
      />

      <div class="w-2" />

      <button
        class="btn btn-primary btn-active text-xs"
        on:click={handleClick}
        style="width: 30%;"
      >
        {#if isLoading}
          <span class="loading loading-infinity loading-sm" />
        {:else}
          {locales.iAmInterested}
        {/if}
      </button>
    </div>

    {#if invalidEmail}
      <p class="text-left m-2 text-red-500">{locales.invalidEmail}</p>
    {/if}
  </div>

  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box text-left border-2">
      <h2 class="font-bold text-lg">{locales.congrats}</h2>
      <p class="py-4">{locales.successMessage}</p>
      <div class="modal-action">
        <button class="btn btn-outline">Close</button>
        <div class="w-1" />
        <button
          on:click={() => window.open(config.docsUrl, "_blank")}
          class="btn btn-primary">Check Documentation</button
        >
      </div>
    </form>
  </dialog>
</div>

<style>
  h3 {
    background-image: linear-gradient(
      87deg,
      rgb(255, 255, 255) 0%,
      rgb(138, 138, 138) 100%
    );
    font-family: "Inter", "Inter Placeholder", sans-serif;
  }
</style>
