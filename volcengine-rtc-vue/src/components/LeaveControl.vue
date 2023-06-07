<template>
  <el-icon style="cursor: pointer">
    <img :src="leaveIcon" width="32" height="32" />
  </el-icon>
</template>
<script>
import { defineComponent } from "vue";
import LeaveIcon from "@/assets/images/leaveIcon.png";
export default defineComponent({
  name: "LeaveControl",
  data() {
    return {
      leaveIcon: LeaveIcon,
    };
  },
  methods: {},
});
</script>
