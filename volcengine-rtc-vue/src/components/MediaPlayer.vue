<script>
import { h } from 'vue';
import { UserOpts } from "@/config";
export default {
  name: "MediaPlayer",
  props: {
    userId: {
      default: "",
    },
  },
  computed: {
    userName() {
      return UserOpts.find(x => x.value == this.userId)?.label;
    }
  },
  render() {
    return h("div", {
      id: "remoteStream_" + this.userId,
      class: 'player'
    }, [
      this.$slots.default,
      h('div', {
        style: {
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          color: 'red',
          fontSize: 20
        }
      }, [this.userName])
    ]);
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
  position: relative;
}
</style>