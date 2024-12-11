import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";
import { selectContacts } from "./selectors";
import { selectNameFilter } from "../filters/selectors";

const initialState = {
    contacts: {
      items: [],
      loading: false,
      error: null
    },
  };

  const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(fetchContacts.fulfilled,(state,action)=>{
            state.contacts.items = action.payload || [];
            state.contacts.loading = false;
        })
        .addCase(fetchContacts.rejected,(state,action)=>{
            state.contacts.loading = false;
        })
        .addCase(fetchContacts.pending,(state,action)=>{
            state.contacts.loading = true;
        })
        .addCase(addContact.fulfilled,(state,action)=>{
            state.contacts.loading = false;
            state.contacts.items.push(action.payload);
        })
        .addCase(addContact.rejected,(state,action)=>{
            state.contacts.loading = false;
        })
        .addCase(addContact.pending,(state,action)=>{
            state.contacts.loading = true;
        })
        .addCase(deleteContact.fulfilled,(state,action)=>{
            state.contacts.loading = false
            state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload.id)
        })
        .addCase(deleteContact.rejected,(state,action)=>{
            state.contacts.loading = false;
        })
        .addCase(deleteContact.pending,(state,action)=>{
            state.contacts.loading = true;
        })
    }

  })

  export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, nameFilter) =>  {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    }
        
  );

  export default contactsSlice.reducer