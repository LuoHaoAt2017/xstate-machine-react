<template>
  <div class="meeting">
    <div class="video-container">
      <div id="local-player" class="local"></div>
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
import { ElMessage, ElMessageBox } from "element-plus";
import RtcClient from "@/sdk/rtc-client";
import VoiceControl from "./VoiceControl.vue";
import VideoControl from "./VideoControl.vue";
import LeaveControl from "./LeaveControl.vue";
import { streamOptions, config } from "@/config";
export default defineComponent({
  name: "Meeting",
  components: {
    VoiceControl,
    VideoControl,
    LeaveControl,
  },
  props: {
    userId: {
      default: "Admin",
      required: true,
    },
    roomId: {
      default: "1",
      required: true,
    },
  },
  data() {
    return {
      rtcClient: null,
    };
  },
  computed: {
    rtcParams() {
      return this.roomId + this.userId;
    },
  },
  watch: {
    rtcParams() {
      this.setupRtcClient();
    },
  },
  methods: {
    setupRtcClient() {
      if (!this.userId || !this.roomId || !this.rtcClient) {
        return;
      }
      this.rtcClient
        .join(config.token, this.roomId, this.userId)
        .then(() => {
          this.rtcClient.createLocalStream(this.userId, function callback(res) {
            const { code, msg, devicesStatus } = res;
            if (code == -1) {
              console.error(msg, devicesStatus);
              ElMessageBox.alert(msg, devicesStatus, {
                confirmButtonText: "OK",
                callback: (action) => {
                },
              });
            }
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleUserEnter() {},
    handleUserLeave() {},
    handleUserPublishStream() {},
    handleUserUnpublishStream() {},
    handleUserStartVideoCapture() {},
    handleUserStopVideoCapture() {},
    handleEventError() {},
    handleAutoPlayFail() {},
    handlePlayerEvent() {},
  },
  mounted() {
    this.rtcClient = new RtcClient({
      config: {
        ...config,
        roomId: this.roomId,
        userId: this.userId,
      },
      streamOptions: streamOptions,
      handleUserEnter: this.handleUserEnter,
      handleUserLeave: this.handleUserLeave,
      handleUserPublishStream: this.handleUserPublishStream,
      handleUserUnpublishStream: this.handleUserUnpublishStream,
      handleUserStartVideoCapture: this.handleUserStartVideoCapture,
      handleUserStopVideoCapture: this.handleUserStopVideoCapture,
      handleEventError: this.handleEventError,
      handleAutoPlayFail: this.handleAutoPlayFail,
      handlePlayerEvent: this.handlePlayerEvent,
    });
    this.setupRtcClient();
  },
});
</script>
<style scoped>
.meeting {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1240px;
  margin: 0 auto;
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
  width: 320px;
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
