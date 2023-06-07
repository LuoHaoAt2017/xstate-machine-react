<template>
  <el-icon style="cursor: pointer">
    <img
      v-if="isVoiceOn"
      :src="micOnIcon"
      width="32"
      height="32"
      @click.stop="isVoiceOn = false"
    />
    <img
      v-else
      :src="micOffIcon"
      width="32"
      height="32"
      @click.stop="isVoiceOn = true"
    />
  </el-icon>
</template>
<script>
import { defineComponent } from "vue";
import micOnIcon from "@/assets/images/micOnIcon.png";
import micOffIcon from "@/assets/images/micOffIcon.png";
export default defineComponent({
  name: "VoiceControl",
  data() {
    return {
      isVoiceOn: false,
      micOnIcon: micOnIcon,
      micOffIcon: micOffIcon,
    };
  },
  methods: {},
});
</script>
