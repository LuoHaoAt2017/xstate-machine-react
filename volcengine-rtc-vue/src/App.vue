<template>
  <div class="container">
    <el-icon @click="dialogVisible = true" style="cursor: pointer;">
      <img :src="videoIcon" alt="video" height="24" />
    </el-icon>
    <div class="room" v-if="hasJoin">
      <MeetingRoom
        :userId="ruleForm.userId"
        :roomId="ruleForm.roomId"
        @leave="hasJoin = false"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="登录" width="360px">
      <el-form :model="ruleForm" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="roomId" label="会议号">
          <el-input
            placeholder="会议ID"
            v-model="ruleForm.roomId"
            readonly
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="userId" label="用户名">
          <el-select
            placeholder="用户ID"
            v-model="ruleForm.userId"
            style="width: 100%"
          >
            <el-option
              v-for="(elem, index) in options"
              :label="elem.label"
              :value="elem.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer">
          <el-button type="primary" @click.stop="handleSubmit">
            进入会议
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Meeting from "@/components/Meeting.vue";
import VideoIcon from "@/assets/svg/video.svg";
import { UserOpts } from "@/config";
export default defineComponent({
  name: "App",
  components: {
    MeetingRoom: Meeting,
  },
  data() {
    return {
      ruleForm: {
        userId: "User1",
        roomId: "1",
      },
      formRules: {
        roomId: [
          {
            required: true,
            message: "会议号必填",
            trigger: "blur",
          },
        ],
        userId: [
          {
            required: true,
            message: "用户名必填",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      hasJoin: false,
      options: UserOpts,
      videoIcon: VideoIcon,
    };
  },
  methods: {
    async handleSubmit() {
      const formEl = this.$refs.ruleFormRef;
      await formEl.validate((valid, fields) => {
        if (valid) {
          this.dialogVisible = false;
          this.hasJoin = true;
        } else {
          console.log("error submit!", fields);
        }
      });
    },
  },
});
</script>

<style scoped>
.title {
  text-align: center;
  height: 36px;
  line-height: 36px;
  margin: 0 auto;
}
.room {
  height: calc(100% - 36px);
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
