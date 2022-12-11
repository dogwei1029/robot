
let loginValidator = new FieldValidator($("#txtLoginId"), async function (val) {
    if (!val) {
      return "请输入账号";
    }
    const resp = await API.checkId(val);
    if (resp.data) {
      return "该账号已经被注册";
    }
  });
let nicknameValidator = new FieldValidator($("#txtNickname"), async function (val) {
    if (!val) {
      return "请输入用户名";
    }
  });
let pwdValidator = new FieldValidator($("#txtLoginPwd"),async function(val){
    if(!val){
        return "请输入密码";
    }
})
let pwdAgainValidator = new FieldValidator($("#txtLoginPwdConfirm"),async function(val){
    if(val !== pwdValidator.input.value){
        return "两次密码不一致";
    }
})


const form = $('.user-form');
form.onsubmit = async function(e){
    e.preventDefault();
    const result = await FieldValidator.validateAll(loginValidator,pwdValidator,nicknameValidator,pwdAgainValidator);
    if(!result) {
        return;
    }
    const data = await API.reg({
        loginId:loginValidator.input.value,
        loginPwd:pwdValidator.input.value,
        nickname:nicknameValidator.input.value
    })
    if(data.code === 0){
       alert('注册成功,点击确定进行跳转');
       location.href = 'login.html'
    }else{
        alert('该账号已经被注册')
    }
}