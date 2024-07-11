import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[],
    quantity: 0 ,

};

const cartSlice = createSlice({
    name:"cart",
     initialState,
     reducers:{
        add: (state   , action)=>{
            //if item duplicate
            const existingItem  =  state.cart.find(
               (item) => item.slug === action.payload.slug
            );
            if(existingItem){
                if(existingItem.seats < action.payload.seats){
                    existingItem.seaats ++;
                    state.quantity++;
                }
            }
                else{
                    //allow add new item
                    state.cart.push({...action.payload ,  quantity:1});
                    state.quantity++;
                }
            

        },
        getCount : (state , action) =>{
            const existingItem = state.cart.find(
                (item) => item.slug == action.payload.slug
            );
            if(!existingItem) return 0;
            return existingItem.quantity;
        },
        remove: (state ,  action)=>{
            const newItems = state.cart.filter(
                (item) => item.slug !== action.payload
            );
            state.cart = newItems;
            state.quantity = newItems.reduce((acc ,  obj)=> acc + obj.seats , 0);
        },
        increaseQuantity: () => {},
        decreaseQuantity: () => {},
        removeAll: () => {},
     }
});

export const { add , remove , increaseQuantity ,decreaseQuantity ,removeAll , getCount} = 
cartSlice.actions;


export const cartReducer =  cartSlice.reducer;
