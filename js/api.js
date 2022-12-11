let API = (function(){
    
const URL_BASE = 'https://study.duyiedu.com';
const TOKEN_KEY = 'token';
function get(url){
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(URL_BASE + url,{headers})
}
function post(url,body){
    const headers = {"Content-Type":"application/json"};
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(URL_BASE + url,{headers,method:"POST",body:JSON.stringify(body)})
}
async function reg(body){
    const resp =  await post('/api/user/reg',body)
    return await resp.json()
}
async function login(body){
    const resp = await post('/api/user/login',body)
   
    const result = await resp.json();
    if(result.code === 0){
        const token = resp.headers.get('authorization')
        localStorage.setItem(TOKEN_KEY,token)
        return result;
    }else{
        return result;
    }
   
}
async function userInfo(){
    const resp = await get('/api/user/profile');
    return await resp.json();
}
async function checkId(loginId){
    const resp = await get('/api/user/exists?loginId=' + loginId)
    return await resp.json();
}
async function sendMsg(content){
    const resp = await post('/api/chat',{
        content,
    });
    return await resp.json();
}
async function queryHistory(){
    const resp = await get('/api/chat/history')
    return await resp.json();
}
function loginOut(){
    localStorage.removeItem(TOKEN_KEY);
}

    return {
        login,
        reg,
        checkId,
        sendMsg,
        queryHistory,
        userInfo,
        loginOut
    }
})()