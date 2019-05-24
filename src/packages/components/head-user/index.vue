<template>
  <!--<div>-->
    <el-dropdown>
    <span>
      <span style="font-size: 18px;">
        hello
        <!--{{userName}}-->
      </span>
      &nbsp;&nbsp;&nbsp;
      <!--<el-button plain class="buttonStyle" @click="exitLogin">-->
        <img src="../../../assets/images/exitImg.png">
      &nbsp;&nbsp;&nbsp;
      <!--</el-button>-->
    </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item @click.native="open"><i class="icon iconfont icon-yanzhengma"></i>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="exitLogin"><i class="icon iconfont icon-tuichu" ></i>退出登陆</el-dropdown-item>
      </el-dropdown-menu>

      <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="40%">
        <el-form ref="form" :model="form" :rules="rule" label-width="130px">
          <el-form-item label="请输入新密码：" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="再次确认密码：" prop="checkPassword">
            <el-input v-model="form.checkPassword" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePassword('form')">提交</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dropdown>
    <!--<div  >-->
    <!--<div style="float: left">某种用户名</div>-->
    <!--<el-button plain class="buttonStyle" @click="exitLogin"><img src="../../../assets/images/exitImg.png">-->
    <!--</el-button></div>-->

  <!--</div>-->
</template>

<script>
  import {headUserApi as headerUserApi} from "./headUserApi";
  import {Msg} from "../../../tools/message";

  export default {
    name: 'comp-bread',
    data() {
      var checkPass =(rule,value,callback)=>{
        if(value == ''){
          return callback(new Error("请再次输入密码"));
        }
        else if (value != this.form.password){
          return callback(new Error("两次密码不一致"));
        }
        else{
          return callback();
        }
      };
      return {
        userName:'',
        dialogVisible:false,
        form:{password:'',checkPassword:''},
        rule: {
          password: [
            {required: true, message: '请设置密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
          checkPassword:[{validator: checkPass, trigger: 'blur',required: true,}]
        }
      }
    },
    mounted(){
      this.userName = JSON.parse(sessionStorage.getItem('userName'));
    },

    methods: {
      /** 退出登录 */
      exitLogin:function () {
        this.$confirm('确认退出登录？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
        this.$store.dispatch('accountLogoutSubmit').then((res) => {
          this.$router.push({path: '/login'})
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })
      },

      /** 修改密码提交 */
      changePassword:function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            headerUserApi.submmitPassword({account:this.userName,password:this.form.password}).then(res=>{
              if(res.data.code == 200)
                Msg.success('修改成功');
              else
                Msg.error("修改失败");
            })
          } else {
            Msg.error("修改失败");
            return false;
          }
          this.close(formName);
        });
      },

      /** 打开弹窗 */
      open(){
        this.dialogVisible = true;
      },

      /** 关闭弹窗 */
      close:function () {
        this.dialogVisible = false;
        this.resetForm('form');
      },

      /** 重置表单 */
      resetForm(formName) {
          this.$refs[formName].resetFields();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .buttonStyle{
   border:none
  }
</style>
