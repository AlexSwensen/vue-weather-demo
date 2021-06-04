<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand href="#">Vue Weather Demo</b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>
