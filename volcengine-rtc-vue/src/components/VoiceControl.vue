<template>
  <el-icon style="cursor: pointer">
    <img
      v-if="isVoiceOn"
      :src="micOnIcon"
      width="32"
      height="32"
      @click.stop="() => toggleVoice(false)"
    />
    <img
      v-else
      :src="micOffIcon"
      width="32"
      height="32"
      @click.stop="() => toggleVoice(true)"
    />
  </el-icon>
</template>
<script>
import { defineComponent } from "vue";
import micOnIcon from "@/assets/images/micOnIcon.png";
import micOffIcon from "@/assets/images/micOffIcon.png";
export default defineComponent({
  name: "VoiceControl",
  props: {
    isVoiceOn: {
      default: false,
    },
    toggleVoice: {
      default: () => {}
    }
  },
  data() {
    return {
      micOnIcon: micOnIcon,
      micOffIcon: micOffIcon,
    };
  },
  methods: {},
});
</script>
