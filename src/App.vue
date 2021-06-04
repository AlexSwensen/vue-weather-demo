<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <h1>Welcome to Weather App</h1>
      <p>
        This is a demo app. You can find the source
        <a
          target="_blank"
          href="https://github.com/alexswensen/vue-weather-demo"
          >here</a
        >
      </p>
      <ZipInput @on-form-submit="zipFormSubmit"></ZipInput>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";
import ZipInput from "./components/ZipInput.vue";

@Component({
  components: {
    NavBar,
    ZipInput,
  },
})
export default class App extends Vue {
  private loading = false;
  private weatherData = null;

  zipFormSubmit(e: Event): void {
    console.log(e);
  }
}
</script>

<style lang="scss" scoped>
#app {
  .container {
    h1 {
      /* text-align: center; */
    }
  }
}
</style>
