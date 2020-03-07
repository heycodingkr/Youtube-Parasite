<template>
  <q-page padding>
    <div class="row">
      {{ this.$route.params.youtuberId }}
      <line-chart :chart-data="chartdata" />
      <q-btn label="섭외 비용 입력" color="primary" @click="bar2 = true" />
    </div>
    <q-dialog
      v-model="bar2"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn v-close-popup dense flat icon="close">
            <q-tooltip content-class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">
            비용입력
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            v-model.number="price"
            type="number"
            filled
            style="max-width: 200px"
          />
        </q-card-section>
        <q-card-section>
          <q-space />
          <q-btn v-close-popup dense flat icon="save" @click="addPrice" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import LineChart from "./Chart.vue";
export default {
  name: "YoutuberDetail",
  components: {
    LineChart
  },
  data() {
    return {
      loaded: false,
      chartdata: {},
      liveId: "",
      bar2: false,
      price: 0
    };
  },
  created: function() {},
  mounted: function() {
    console.log(this.$route.params.youtuberId);
    this.$axios
      .get("/youtubers/" + this.$route.params.youtuberId, {
        params: { populate: ["prices"] }
      })
      .then(res => {
        const renderData = es.data.prices.map(i => {
          return {
            label: i.createdAt,
            backgroundColor: "#f87979",
            data: [1, 2]
          };
        });
        this.chartdata = {
          labels: ["January", "February"],
          datasets: [
            {
              label: "Data One",
              backgroundColor: "#f87979",
              data: [40, 20]
            }
          ]
        };
        // this.chartData = res.data.prices;
      });
  },
  methods: {
    addPrice: function() {
      this.$axios
        .post("/" + this.$route.params.youtuberId + "/price", {
          slug: this.$route.params.youtuberId,
          price: this.price
        })
        .then(res => console.log(res));
    }
  }
};
</script>
