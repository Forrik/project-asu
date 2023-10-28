<template>
  <div v-if="showConfirm" class="confirm">
    <div @click="hide" class="modal-wrapper">
      <div class="modal-window modal-confirm">
        <h4 class="modal-title py-3 fw-bold">Вы уверены?</h4>
        <svg
          @click="hide"
          class="icon-close"
          xmlns="http://www.w3.org/2000/svg"
          height="35"
          viewBox="0 0 16 16"
          width="35"
        >
          <polygon
            fill-rule="evenodd"
            points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
          />
        </svg>
        <hr />
        <p class="modal-message">{{ message }}</p>
        <div class="modal-buttons">
          <button @click="confirm" class="btn btn-primary">Подтвердить</button>
          <button @click="cancel" class="btn btn-primary">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirm: false,
      message: "",
      resolve: null,
      reject: null,
    };
  },
  methods: {
    show(message) {
      this.showConfirm = true;
      this.message = message;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      this.hide();
      this.resolve(true);
    },
    cancel() {
      this.hide();
      this.reject(false);
    },
    hide() {
      this.showConfirm = false;
      this.message = "";
    },
  },
};
</script>

<style scoped>
.message {
  margin-bottom: 10px;
}

.modal-confirm {
  width: 450px;
  background: #fff;
  height: 325px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-message {
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 700;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}
</style>
