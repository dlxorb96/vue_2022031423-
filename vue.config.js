// CORS => 같은 서버가 아니면 연동이 안됨.
// proxy를 설정하면 해결됨. 단, android 등은 CORS를 반드시 설정해야 함.
// 같은 서버가 아닌데 같은 서버인 것처럼 만들어주는 방법
module.exports = {
    devServer:{
        proxy : {
            '/member' : {  //rest
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
            '/item' : {  //rest
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
            // socket.io, websocket => 문자나 파일을통신
            // webrtc => 실시간 화상채팅
            '/socket' : { 
                target:'http://localhost:3001',
                changeOrigin :true,
                logLevel : 'debug'
            },
        },
    }
}
