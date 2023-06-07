<template>
  <div class="container">
    <h3 class="title">远程会诊</h3>
    <div class="room" v-if="hasJoin">
      <MeetingRoom :userId="userId" :roomId="roomId"/>
    </div>
    <el-dialog v-model="dialogVisible" title="登录" width="360px">
      <el-form :model="ruleForm" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="roomId">
          <el-input placeholder="会议ID" v-model="ruleForm.roomId"></el-input>
        </el-form-item>
        <el-form-item prop="userId">
          <el-input placeholder="用户ID" v-model="ruleForm.userId"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer">
          <el-button type="primary" @click.stop="handleSubmit">
            进入房间
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Meeting from '@/components/Meeting.vue';
export default defineComponent({
  name: "App",
  components: {
    MeetingRoom: Meeting
  },
  data() {
    return {
      ruleForm: {
        userId: "Admin",
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
      dialogVisible: true,
      hasJoin: false
    };
  },
  computed: {
  },
  methods: {
    async handleSubmit() {
      const formEl = this.$refs.ruleFormRef;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
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
