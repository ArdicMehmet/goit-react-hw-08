import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAxiosInstance, setAuthAxios } from "../api/authAxios";

export const register = createAsyncThunk("auth/register",
    async (data, thunkAPI) => {
        try {
           const response = await authAxiosInstance.post("/users/signup",{name : data.name, email : data.email, password : data.password})
           return response.data;
        }catch(e){
           return thunkAPI.rejectWithValue(e?.message || "Registration failed")
        }
    }
)

export const login = createAsyncThunk("/auth/login", async(data, thunkAPI)=>{      
    try{
        const response = await authAxiosInstance.post("/users/login", data)
        const token = response.data.token
        if(token === null){
            return thunkAPI.rejectWithValue(e?.message || "Login failed")  
        }  
        setAuthAxios(token);
        return response.data
    }catch(e){
        return thunkAPI.rejectWithValue(e?.message || "Login failed")
    }
})

export const refreshUser = createAsyncThunk("auth/refresh", async(_,thunkAPI)=>{
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if(token === null){
        return thunkAPI.rejectWithValue("Unable to fetch user")
    }
    try{
        const response = await authAxiosInstance.get("/users/refresh")
        if(response.data.token === null){
            return thunkAPI.rejectWithValue(e?.message || "Unable to fetch user")
        }
        setAuthAxios(response.data.token);
        return response.data;
    }catch(e){
        return thunkAPI.rejectWithValue(e?.message || "Unable to fetch user")
    }
})

export const currentUser = createAsyncThunk(
    "auth/currentUser",
    async (token, thunkAPI) => {
      if (!token) {
        return thunkAPI.rejectWithValue("Token bulunamadı");
      }
      try {
        setAuthAxios(token);
        const response = await authAxiosInstance.get("/users/current");
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e?.message || "Kullanıcı bilgileri alınamadı");
      }
    }
  );