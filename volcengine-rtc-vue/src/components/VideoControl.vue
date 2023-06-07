<template>
  <el-icon style="cursor: pointer">
    <img
      v-if="isVideoOn"
      :src="videoOnIcon"
      width="32"
      @click.stop="isVideoOn = false"
    />
    <img
      v-else
      :src="videoOffIcon"
      width="32"
      @click.stop="isVideoOn = true"
    />
  </el-icon>
</template>
<script>
import { defineComponent } from "vue";
import videoOnIcon from "@/assets/images/videoOnIcon.png";
import videoOffIcon from "@/assets/images/videoOffIcon.png";
export default defineComponent({
  name: "VideoControl",
  data() {
    return {
      isVideoOn: false,
      videoOnIcon: videoOnIcon,
      videoOffIcon: videoOffIcon,
    };
  },
  methods: {},
});
</script>
