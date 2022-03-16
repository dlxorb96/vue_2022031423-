import { createStore } from 'vuex';

export default createStore({

    // 상태변수
    // 공통적으로 써야하는 변수
    state:{
        logged : false,
        menu : 1,
    },

    // getter => App.vue
    getters: {
        getLogged(state){
            return state.logged;
        },
        getMenu(state){
            return state.menu;
        }
    },

    // mutations => Login.vue에서 사용, logout.vue에서 사용
    mutations:{
        setLogged(state, value){
            state.logged = value;
        },
        setMenu(state, value){
            state.menu = value;
        }
    },



    // actions

    // actions: {

    //     async handleMenu(context, payload){
    //         console.log(route.query.menu)
    //     }

        // async handleData(context , payload){
        //     console.log(payload)
        //     const token = sessionStorage.getItem("TOKEN");
        //     if(typeof token !== 'undefined' && token !==null){
        //         const url = `/member/validation`;
        //         const headers = {
        //         "Content-Type": "application/json",
        //         "token" : token,
        //         };
        //         const response = await axios.get(url, {headers})
        //         if(response.data.status ===200){
        //             context.commit("setUid", response.data.uid);
        //             context.commit("setUname", response.data.uname);
        //             context.commit("setUrole", response.data.urole);
        //             context.commit("setLogged", true);
        //         }
        //         else{
        //             //토큰의 유효성을 검사하여 통과하지 못할경우
        //             context.commit("setLogged", false);
        //         }
        //     }
            
        // }
    // }
})