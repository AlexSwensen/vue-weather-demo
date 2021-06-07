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

      <loading-spinner v-if="loading" />

      <div v-if="!loading">
        <b-table responsive :items="weatherData"></b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";
import ZipInput from "./components/ZipInput.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { IShownWeatherData, WeatherService } from "./services/weather";

@Component({
  components: {
    NavBar,
    ZipInput,
    LoadingSpinner,
  },
})
export default class App extends Vue {
  private loading = false;
  private weatherData: IShownWeatherData[] | null = null;

  async zipFormSubmit(e: string): Promise<void> {
    this.loading = true;
    this.weatherData = await WeatherService.hourlyQuery(e);
    this.loading = false;
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
