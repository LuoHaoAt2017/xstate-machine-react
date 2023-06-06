<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import RtcClient from '@/sdk/rtc-client'
import config from '@/config/index'
import { streamOptions } from '@/constant'
import { MediaType } from '@volcengine/rtc'
export default defineComponent({
  name: 'rtc-component',
  props: {},
  data() {
    return {
      rtc: null,
      roomId: '1',
      uid: 'Admin',
      remoteStreams: {}
    }
  },
  methods: {
    // 房间内新增远端摄像头/麦克风采集音视频流的回调。
    handleUserPublishStream(event) {
      const { userId, mediaType } = event
      if (mediaType & MediaType.VIDEO) {
        if (this.remoteStreams[userId]) {
          rtc?.setRemoteVideoPlayer(userId, `remoteStream_${userId}`)
        }
      }
    },
    // 房间内远端摄像头/麦克风采集的媒体流移除的回调。
    handleUserUnpublishStream(event) {
      const { userId, mediaType } = event
      if (mediaType & MediaType.VIDEO) {
        rtc?.setRemoteVideoPlayer(userId, undefined)
      }
    },
    // 房间内的可见用户开启内部视频采集时，房间内其他用户会收到此事件。
    handleUserStartVideoCapture(event) {
      const { userId } = event

      if (remoteStreams[userId]) {
        rtc?.setRemoteVideoPlayer(userId, `remoteStream_${userId}`)
      }
    },
    // 房间内的可见用户关闭内部视频采集时，房间内其他用户会收到此事件。
    handleUserStopVideoCapture(event) {
      const { userId } = event
      rtc?.setRemoteVideoPlayer(userId, undefined)
    },
    // 远端可见用户加入房间，或房内隐身用户切换为可见的回调
    handleUserJoin(event) {
      console.log('handleUserJoin', event)
      const { userInfo } = event
      const remoteUserId = userInfo.userId
      if (Object.keys(remoteStreams).length < 3) {
        if (remoteStreams[remoteUserId]) return
        remoteStreams[remoteUserId] = remoteUserId // todo
      }
    },
    // 远端可见用户离开房间，或房内可见用户切换为隐身的回调
    handleUserLeave(event) {
      console.log('handleUserLeave', event)
      const { userInfo } = event
      const remoteUserId = userInfo.userId
      if (remoteStreams[remoteUserId]) {
        delete remoteStreams[remoteUserId]
      }
    },
    // 自动播放失败
    handleAutoPlayFail(event) {
      console.log('handleAutoPlayFail', event)
      const { userId, kind } = event
    },
    // 当 SDK 内部发生不可逆转错误时触发该回调
    handleEventError(event, VERTC) {
      if (event.errorCode === VERTC.ErrorCode.DUPLICATE_LOGIN) {
        console.error('你的账号被其他人顶下线了')
        leaveRoom(false)
      }
    },
    // 播放器事件
    handlePlayerEvent(event) {
      const { userId, rawEvent, type } = event

      console.log('handlePlayerEvent', event)
    },
    // 退出房间
    leaveRoom(refresh) {}
  },
  mounted() {
    this.rtc = new RtcClient({
      config: {
        ...config,
        roomId: this.roomId,
        uid: this.uid
      },
      streamOptions: streamOptions,
      handleUserPublishStream: this.handleUserPublishStream,
      handleUserUnpublishStream: this.handleUserUnpublishStream,
      handleUserStartVideoCapture: this.handleUserStartVideoCapture,
      handleUserStopVideoCapture: this.handleUserStopVideoCapture,
      handleUserJoin: this.handleUserJoin,
      handleUserLeave: this.handleUserLeave,
      handleAutoPlayFail: this.handleAutoPlayFail,
      handleEventError: this.handleEventError,
      handlePlayerEvent: this.handlePlayerEvent
    })
  }
})
</script>

<style scoped></style>
