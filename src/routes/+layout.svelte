<script>
  import "../app.css";
</script>

<div class="container mx-auto py-3 h-screen">
  <slot />
</div>

<style>
  :global(ion-icon) {
    font-size: 20px;
    color: black;
  }
  :global(.btn-primary) {
    background-color: white !important;
    color: black;
  }
</style>
