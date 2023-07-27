import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  User : null ,
  UserArray : []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    AddUserData : (state , action )=>{
    try{
      state.User =  action.payload
      let data = []
      if(localStorage.getItem('User')){
          data = JSON.parse(localStorage.getItem('User'))
      }
     data.push(state.User)
    //  console.log("dat a ===> " , data )
     localStorage.setItem('User' , JSON.stringify(data))
     state.UserArray = data
  }catch(err){
      console.log('error got exicuted ')
      console.log(err.message)
     }
    }
  },
})

// Action creators are generated for each case reducer function
export const { AddUserData } = counterSlice.actions

export default counterSlice.reducer