<template>
  <div class="container">
    <div id="local-player" class="player"></div>
    <div id="remote-player" class="player"></div>
  </div>
</template>

<script>
import VERTC, {
  RoomProfileType,
  StreamIndex,
} from "@volcengine/rtc";
import { config, remote } from "@/config";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 创建引擎
    const engine = VERTC.createEngine(config.appId);
    // 加入房间
    engine
      .joinRoom(
        config.token,
        config.roomId,
        {
          userId: config.userId,
        },
        {
          isAutoPublish: true,
          isAutoSubscribeAudio: true,
          isAutoSubscribeVideo: true,
          roomProfileType: RoomProfileType.communication,
        }
      )
      .then(async (resp) => {
        console.log(resp);
        // 开启本地采集
        await engine.startAudioCapture();
        await engine.startVideoCapture();
        // 设置本地播放器
        engine.setLocalVideoPlayer(StreamIndex.STREAM_INDEX_MAIN, {
          renderDom: "local-player",
        });
        // 订阅和播放房间内的音视频流
        engine.on(VERTC.events.onUserPublishStream, async function(event) {
          const { userId, mediaType } = event;
          console.log(event);
          engine.setRemoteVideoPlayer(VERTC.StreamIndex.STREAM_INDEX_MAIN, {
            userId: userId,
            renderDom: "remote-player"
          });
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.player {
  width: 400px;
  height: 400px;
}
</style>
