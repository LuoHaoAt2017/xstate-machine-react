<script>
import { h } from 'vue';
export default {
  name: "MediaPlayer",
  props: {
    userId: {
      default: "",
    },
  },
  render() {
    return h("div", {
      id: "remoteStream_" + this.userId,
      class: 'player'
    }, this.$slots.default);
  },
};
</script>

<style scoped>
.player {
  background: #eee;
  height: 240px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>