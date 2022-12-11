
let loginValidator = new FieldValidator($("#txtLoginId"), async function (val) {
    if (!val) {
      return "请输入账号";
    }
    // const resp = await API.checkId(val);
    // if (resp.data) {
    //   return "该账号已经被注册";
    // }
  });
let pwdValidator = new FieldValidator($("#txtLoginPwd"),async function(val){
    if(!val){
        return "请输入密码";
    }
})

const form = $('.user-form');
form.onsubmit = async function(e){
    e.preventDefault();
    const result = await FieldValidator.validateAll(loginValidator,pwdValidator);
    if(!result){
        return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const resp = await API.login(data)
    if(resp.code === 0){
        location.href = 'index.html';
    }else{
        loginValidator.p.innerText = '账号或密码错误'
        pwdValidator.input.value = '';
    }
}
