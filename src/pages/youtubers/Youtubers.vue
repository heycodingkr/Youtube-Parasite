<template>
  <q-page padding>
    <p>Youtubers page</p>
    <div
      class="q-pa-md"
      style="max-width: 1350px"
    >
      <q-list
        bordered
        separator
      >
        <q-item>
          <q-item-section>
            <q-item-label>
              ID
            </q-item-label>
          </q-item-section>
          <q-item-section top>
            <q-item-label>
              타이틀
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>썸네일</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>뷰 카운트</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>서브스크립션</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>최근 섭외 비용</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>액션</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-for="item in youtubers"
          :key="item._id"
        >
          <q-item-section>
            <q-item-label @click.stop="goDetail(item._id)">
              <p> {{ item.channelId }} </p>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ item.snippet.title }}
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="item.snippet.thumbnails.default.url">
            <q-img
              :src="item.snippet.thumbnails.default.url"
              spinner-color="white"
              style="height: 200px; max-width: 200px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.statistics.viewCount }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.statistics.subscriberCount }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="item.prices[0]">
              {{ item.prices[0].price }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-btn
              flat
              dense
              round
              label="수정"
              icon="edit"
              color="primary"
              @click.stop="updateItem(item._id)"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              label="삭제"
              color="primary"
              @click.stop="deleteItem(item._id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Youtubers",  
  data() {
    return {
      youtubers: []
    };
  },
  created: function() {
    this.$axios.get("/youtubers", { params: { "populate": ["prices"] }}).then(res => {
      this.youtubers = res.data.rows;
    });
  },
  methods: {
    goDetail: function(id) {
      this.$router.push({ name: "YoutuberDetail", params: { youtuberId: id } });
    }
  }
};
</script>
