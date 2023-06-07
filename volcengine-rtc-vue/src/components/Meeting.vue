<template>
  <div class="meeting">
    <div class="video-container">
      <div id="local-player" class="local"></div>
      <div id="remote-video" class="remote">
        <MediaPlayer
          v-for="(item, index) in remoteStreams"
          :key="index"
          :userId="item"
        ></MediaPlayer>
      </div>
    </div>
    <div class="control-toolbar">
      <VoiceControl :isVoiceOn="isVoiceOn" :toggleVoice="toggleVoice" />
      <VideoControl :isVideoOn="isVideoOn" :toggleVideo="toggleVideo" />
      <LeaveControl :leaveRoom="leaveRoom" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { ElMessageBox } from "element-plus";
import { MediaType } from "@volcengine/rtc";
import RtcClient from "@/sdk/rtc-client";
import VoiceControl from "./VoiceControl.vue";
import VideoControl from "./VideoControl.vue";
import LeaveControl from "./LeaveControl.vue";
import MediaPlayer from "./MediaPlayer.vue";
import { streamOptions, TokenOpts, config } from "@/config";
export default defineComponent({
  name: "Meeting",
  components: {
    VoiceControl,
    VideoControl,
    LeaveControl,
    MediaPlayer,
  },
  props: {
    userId: {
      default: "",
      required: true,
    },
    roomId: {
      default: "",
      required: true,
    },
  },
  data() {
    return {
      rtcClient: null,
      isVideoOn: true,
      isVoiceOn: true,
      remoteStreams: [],
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
      const target = TokenOpts.find(x => x.userId == this.userId);
      if (!target) {
        console.error('target token 不存在');
        return;
      }
      this.rtcClient
        .join(target.token, this.roomId, this.userId)
        .then(() => {
          this.rtcClient.createLocalStream(this.userId, (res) => {
            const { code, msg, devicesStatus } = res;
            if (code == -1) {
              console.error(msg, devicesStatus);
              this.toggleVoice(false);
              this.toggleVideo(false);
              ElMessageBox.alert(msg, devicesStatus, {
                confirmButtonText: "OK",
                callback: (action) => {},
              });
            } else {
              this.toggleVoice(true);
              this.toggleVideo(true);
            }
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleUserEnter(event) {
      console.log("handleUserEnter: ", event);
      const { userInfo } = event;
      const remoteUserId = userInfo.userId;
      if (this.remoteStreams.indexOf(remoteUserId) == -1) {
        this.remoteStreams.push(remoteUserId);
      }
    },
    handleUserLeave(event) {
      console.log("handleUserLeave: ", event);
      const { userInfo } = event;
      const remoteUserId = userInfo.userId;
      const index = this.remoteStreams.indexOf(remoteUserId);
      if (index > -1) {
        this.remoteStreams.splice(index, 1);
      }
    },
    // 房间内新增摄像头或者麦克风时的回调
    handleUserPublishStream(stream) {
      if (stream.mediaType & MediaType.AUDIO) {
        if (this.remoteStreams.indexOf(stream.userId) > -1) {
          console.log("remoteStreams: ", this.remoteStreams);
          setTimeout(() => {
            this.rtcClient.setRemoteVideoPlayer(
              stream.userId,
              `remoteStream_${stream.userId}`
            );
          }, 0);
        }
      }
    },
    // 房间内减少摄像头或者麦克风时的回调
    handleUserUnpublishStream(stream) {
      if (stream.mediaType & MediaType.AUDIO) {
        if (this.remoteStreams.indexOf(stream.userId) > -1) {
          this.rtcClient.setRemoteVideoPlayer(stream.userId, undefined);
        }
      }
    },
    handleUserStartVideoCapture(stream) {
      this.rtcClient.setRemoteVideoPlayer(
        stream.userId,
        `remoteStream_${stream.userId}`
      );
    },
    handleUserStopVideoCapture(stream) {
      this.rtcClient.setRemoteVideoPlayer(stream.userId, undefined);
    },
    handleEventError() {},
    handleAutoPlayFail() {},
    handlePlayerEvent() {},
    toggleVoice(value) {
      this.isVoiceOn = value;
      this.rtcClient.changeAudioState(value);
    },
    toggleVideo(value) {
      this.isVideoOn = value;
      this.rtcClient.changeVideoState(value);
    },
    leaveRoom() {
      if (!this.rtcClient) {
        return;
      }
      this.rtcClient.removeEventListener();
      this.rtcClient.leave();
      this.$emit("leave");
    },
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
