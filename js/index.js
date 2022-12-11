(async function (){
    //获取所需要的dom元素
    const doms = {
        aside:{
            nickname:$('#nickname'),
            loginId:$('#loginId')
        },
        close:$('.close'),
        chatContainer:$('.chat-container'),
        txtMsg:$('#txtMsg'),
        msgContainer:$('.msg-container')
    }


    //登录状态下才能进入该页面
    const resp = await API.userInfo()
    const userData = resp.data;
    //如果没有登录则跳转至登录页面
    if(resp.code){//如果code有值则表示用户未登录
        alert('您还未登录或者登录信息已过期,请重新登录');
        location.href = 'login.html';
    }
    //补充侧边栏的用户信息
    doms.aside.nickname.innerText = userData.nickname
    doms.aside.loginId.innerText = userData.loginId
    //点击关闭按钮后退出登录,进入登录页面
    doms.close.onclick = function(){
        API.loginOut();
        location.href = 'login.html'
    }

    const history =  await API.queryHistory();
    //通过循环将历史记录放入消息记录中
    for (const item of history.data) {
        addChat(item)
    }
    //给form表单添加提交事件
    doms.msgContainer.onsubmit = async function(e){
        e.preventDefault();//阻止提交的默认事件
        sendChat()

    }


     async function sendChat(){
        const msg = doms.txtMsg.value.trim();
        if(!msg){
            return;
        }
        addChat({
            from:userData.nickname,
            content:msg,
            createdAt:Date.now(),
        })
        //清空输入框的值
        doms.txtMsg.value = ''
        const resp = await  API.sendMsg(msg);//等待服务器反馈的响应体,在进行添加消息操作
        console.log(resp)
        addChat({
            from:null,
            ...resp.data
        })
        
    }
    /**
     * 传入一个对象{
     *  from:'',
     *  content:'',
     * createdAt:'',
     * }将对应的消息存入聊天记录中
     * @param {Object} message 
     */
    function addChat(message){
        const div = $$$('div');
        div.classList.add('chat-item');
        const img = $$$('img');
        img.classList.add('chat-avatar')
        const content = $$$('div');
        content.classList.add('chat-content')
        const date = $$$('div');
        date.classList.add('chat-date')
        content.innerText = message.content;
            date.innerText = formatDate(message.createdAt);
        //判断是用户发送的消息还是机器人发送的消息
        if(message.from){//这是用户发送消息
            div.classList.add('me');
            img.src = "./asset/avatar.png";
            
        }else{
            img.src = "./asset/robot-avatar.jpg"
        }
        div.appendChild(img)
        div.appendChild(content)
        div.appendChild(date)
        doms.chatContainer.appendChild(div)
        //将滚轮调至最底部
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
    }
 
 /**
  * 根据时间戳返回一个具体的月份日期
  * @param {Number} timestamp 
  * @returns 
  */
    function formatDate(timestamp){
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2,'0');
        const day = date.getDay().toString().padStart(2,'0');
        const hour = date.getHours().toString().padStart(2,'0');
        const minute = date.getMinutes().toString().padStart(2,'0');
        const second = date.getSeconds().toString().padStart(2,'0');
        
        return `${year}-${month}-${day} ${hour}-${minute}-${second}`
    }
})()