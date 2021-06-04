<template>
  <div>
    <b-form @submit="formSubmit" inline>
      <label for="feedback-zip" class="mr-sm-2">Zip Code: </label>
      <b-form-input
        v-model="zipCode"
        :state="validZipCode"
        id="feedback-zip"
        class="mr-sm-2"
      ></b-form-input>
      <b-button variant="primary" :disabled="!validZipCode" @click="formSubmit"
        >Check Weather</b-button
      >
      <b-form-invalid-feedback :state="validZipCode">
        Must be a valid US Zip Code
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validZipCode">
        Looks Good.
      </b-form-valid-feedback>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class ZipInput extends Vue {
  private zipCode: string | null = null;

  formSubmit(event: Event): void {
    event.preventDefault();
    if (this.validZipCode) {
      this.onFormSubmit();
    }
  }

  @Emit()
  onFormSubmit(): string | undefined {
    if (this.zipCode && this.validZipCode) {
      return this.zipCode;
    }
  }

  get validZipCode(): boolean | null {
    if (this.zipCode) {
      return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.zipCode);
    }
    return null;
  }
}
</script>

<style lang="scss" scoped></style>
