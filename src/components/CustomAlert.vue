<template>
  <div class="notification-wrapper">
    <div class="row">
      <div class="col-5"></div>
      <div class="col-3">
        <div class="alert-wrapper" v-if="showAlert">
          <div class="alert alert-success d-flex align-items-center justify-content-around" role="alert">
            <div class="mx-auto d-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width="27px"
                height="27px"
                viewBox="-3.5 0 19 19"
                class="cf-icon-svg"
              >
                <path
                  d="M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z"
                />
              </svg>
              <strong>{{ message }}</strong>
              <button
                @click="hide()"
                type="button"
                class="btn-close alert-notification close-alert-icon"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAlert: false,
      message: "",
    };
  },
  methods: {
    show(message) {
      this.showAlert = true;
      this.message = message;

      setTimeout(() => {
        this.hide();
      }, 2500);
    },
    hide() {
      this.showAlert = false;
      this.message = "";
    },
  },
};
</script>

<style>
.close-alert-icon {
  vertical-align: middle;
}
.notification-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: 100%;
}
</style>
