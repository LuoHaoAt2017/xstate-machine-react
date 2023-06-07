<template>
  <div class="meeting">
    <div class="video-container">
      <div id="local-video" class="local">
        <div class="user-info"></div>
      </div>
      <div id="remote-video" class="remote"></div>
    </div>
    <div class="control-toolbar">
      <VoiceControl />
      <VideoControl />
      <LeaveControl />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import VoiceControl from "./VoiceControl.vue";
import VideoControl from "./VideoControl.vue";
import LeaveControl from "./LeaveControl.vue";
export default defineComponent({
  name: "Meeting",
  components: {
    VoiceControl,
    VideoControl,
    LeaveControl,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style scoped>
.meeting {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.video-container {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  height: calc(100% - 48px);
  margin-bottom: 10px;
}
.local {
  flex-basis: 320px;
  flex-grow: 1;
  flex-shrink: 1;
  border: 1px solid #eee;
  height: 100%;
}
.remote {
  width: 240px;
  border: 1px solid #eee;
  margin-left: 20px;
  height: 100%;
}
.control-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  width: 320px;
  margin: 0 auto;
  padding: 0px 20px;
  border-radius: 24px;
  background-color: #36393f;
}
</style>
