<template>
  <div class="container">
    <h3 class="title">远程会诊</h3>
    <div class="online-video">
      <div id="local-video" class="local"></div>
      <div id="remote-video" class="remote"></div>
    </div>
    <el-dialog v-model="dialogVisible" title="登录" width="30%">
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
export default defineComponent({
  name: "App",
  data() {
    return {
      ruleForm: {
        userId: "",
        roomId: "",
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
    };
  },
  methods: {
    async handleSubmit() {
      const formEl = this.$refs.ruleFormRef;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
          this.dialogVisible = false;
        } else {
          console.log("error submit!", fields);
        }
      });
    },
  },
  mounted() {},
});
</script>

<style scoped>
.title {
  text-align: center;
}
.container {
  width: 100%;
  height: 100%;
}
.online-video {
  display: flex;
  justify-content: space-between;
}
.local {
  flex-basis: 320px;
  flex-grow: 1;
  flex-shrink: 1;
}
.remote {
  width: 240px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
