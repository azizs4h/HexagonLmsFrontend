import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {router} from "@/router";

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        accessToken : "",
        refreshToken : "",
        error : "",
    },
    mutations: {
        setAccessToken(state, token){
            state.accessToken = token;
        },
        setRefreshToken(state, token){
            state.refreshToken = token;
        },
        clearToken(state){
            state.accessToken = "";
            state.refreshToken = "";
        }
    },
    actions : {
        initAuth({commit}){
            let Access_Token = localStorage.getItem("Access-Token");
            if(Access_Token && Access_Token !==''){
                commit("setAccessToken", Access_Token);
                router.push("/");
            }else{
                router.push("/login");
                return false;
            }
        },
        login( {commit, dispatch, state}, authData){
            let link = "http://localhost:8000/user/login/"
            return axios.post(link,{username: authData.mail, email: '', password: authData.password})
                .then((response) => {
                    commit("setAccessToken", response.data.access);
                    commit("setRefreshToken", response.data.refresh);
                    localStorage.setItem("Access-Token", response.data.access);
                    localStorage.setItem("Refresh-Token", response.data.refresh);
                    dispatch("setTimeOut");

                })
                .catch(error => {
                    this.error = error;
                })

        },
        logout({commit}){
            commit("clearToken");
            localStorage.removeItem("Access-Token");
            localStorage.removeItem("Refresh-Token");
            router.push("/login");
        },
        setTimeOut({dispatch}){
            setTimeout(() => {
                dispatch("logout");
            },2*60*60*1000)//     2 hours
        }
    },
    getters : {
        isAuthenticated(state){
            return state.accessToken !==""
        }
    }
})

export default store;