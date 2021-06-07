<template>
  <div class="d-flex justify-content-center mb-3">
    <b-spinner label="Loading..." variant="primary"></b-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class LoadingSpinner extends Vue {}
</script>

<style lang="scss" scoped>
.d-flex {
  margin-top: 3em;
}
</style>
