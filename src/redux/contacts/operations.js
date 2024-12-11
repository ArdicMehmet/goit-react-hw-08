import { contactAxios, setContactAxios } from "../api/contact";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async (_,thunkAPI)=>{
    contactAxios.interceptors.request.use((config) => {
        const token = thunkAPI.getState().auth.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

        try {
            const response = await contactAxios.get('/contacts');
            return response.data;
        }   
        catch(e){
            return thunkAPI.rejectWithValue(e.message || "Beklenmeyen bir durum oluştu")
        }
    
})

export const addContact = createAsyncThunk("contacts/addContact", async (data,thunkAPI)=>{
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    if(data && token){
        try {
            setContactAxios(token);
            const response = await contactAxios.post('/contacts',data);
            return response.data;
        }   
        catch(e){
            return thunkAPI.rejectWithValue("Beklenmeyen bir durum oluştu")
        }
    }
    else{
        return thunkAPI.rejectWithValue("Data boş veya token yok")
    }
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id,thunkAPI)=>{
    const state = thunkAPI.getState();
    const token = state.auth.token;
 
    if(id && token){
        try {
            setContactAxios(token)
            const response = await contactAxios.delete(`/contacts/${id}`);      
            return response.data;
        }   
        catch(e){
            return thunkAPI.rejectWithValue(e.message || "Beklenmeyen bir durum oluştu")
        }
    }
    else{
        return thunkAPI.rejectWithValue(e.message || "Data boş veya token yok")
    }
})


