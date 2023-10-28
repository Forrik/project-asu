<template>
  <div class="col">
    <div class="card">
      <div class="card-body text-center">
        <h5 class="card-title fw-bold">{{ title }}</h5>
        <p class="card-text">{{ text }}</p>
        <a @click="emitShowTable" class="btn btn-primary">Перейти</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
  },
  methods: {
    emitShowTable() {
      this.$emit("showTable", this.title); // Эмиттер события для вызова showTable в родительском компоненте с передачей аргумента
    },
  },
};
</script>
