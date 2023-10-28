<template>
  <div class="row">
    <div class="col-12">
      <div v-if="showError">
        <div class="alert alert-danger d-flex align-items-center alert-notification" role="alert">
          <strong>{{ message }}</strong>
          <button @click="hide()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showError: false,
      message: "",
    };
  },
  methods: {
    show(message) {
      this.showError = true;
      this.message = message;

      setTimeout(() => {
        this.hide();
      }, 500055);
    },
    hide() {
      this.showError = false;
      this.message = "";
    },
  },
};
</script>
