<template>
  <el-icon style="cursor: pointer">
    <img
      v-if="isVideoOn"
      :src="videoOnIcon"
      width="32"
      @click.stop="() => toggleVideo(false)"
    />
    <img
      v-else
      :src="videoOffIcon"
      width="32"
      @click.stop="() => toggleVideo(true)"
    />
  </el-icon>
</template>
<script>
import { defineComponent } from "vue";
import videoOnIcon from "@/assets/images/videoOnIcon.png";
import videoOffIcon from "@/assets/images/videoOffIcon.png";
export default defineComponent({
  name: "VideoControl",
    props: {
    isVideoOn: {
      default: false,
    },
    toggleVideo: {
      default: () => {}
    }
  },
  data() {
    return {
      videoOnIcon: videoOnIcon,
      videoOffIcon: videoOffIcon,
    };
  },
  methods: {},
});
</script>
