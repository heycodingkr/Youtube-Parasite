<template>
  <q-page padding>
    <p>Youtubers page</p>
    <div class="q-pa-md" style="max-width: 1350px">
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label>
              ID
            </q-item-label>
          </q-item-section>
          <q-item-section top>
            <q-item-label>
              채널 아이디
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>액션</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="item in youtubers" :key="item._id">
          <q-item-section>
            <q-item-label>
              <p>{{ item._id }}</p>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <p>{{ item.channelId }}</p>
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
// var config = {
//   headers: { 'Access-Control-Allow-Origin': '*' }
// }
export default {
  name: "YoutubersWatch",
  data() {
    return {
      youtubers: []
    };
  },
  created: function() {
    this.$axios.get("/youtubers-watch").then(res => {
      this.youtubers = res.data.rows;
    });
  }
};
</script>
