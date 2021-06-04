<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  created(): void {
    // axios.get().then()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
