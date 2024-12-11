import { createSlice } from "@reduxjs/toolkit";
import { currentUser, login, refreshUser, register } from "./operations";
import { boolean } from "yup";

const initialState = {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoading : true,
    isLoggedIn: false,
    isRefreshing: false,
  }

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout : (state) => {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false
        },
        setLoading : (state,action) =>{
            state.isLoading = typeof(action.payload) == boolean ? action : false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.fulfilled,(state, action)=>{
            console.log("kayıt başarılı",action.payload);
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token
            state.isLoggedIn = true;
            state.isLoading = false;
            console.log("Giriş başarılı");
            
        })
        .addCase(login.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(refreshUser.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
        })
        .addCase(register.rejected, (state, action)=>{
            console.log("kayıt başarısız",action.payload);
        })
        .addCase(refreshUser.rejected, (state, action)=>{
            state.isRefreshing = false;
        })
        .addCase(refreshUser.pending,(state,action)=>{
            state.isRefreshing = true;
        })
        .addCase(currentUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(currentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
          })
          .addCase(currentUser.rejected, (state) => {
            state.isLoading = false;
          })
    }
  })
  export const {logout,setLoading} = authSlice.actions;
  export default authSlice.reducer;