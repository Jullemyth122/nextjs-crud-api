import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    reset(state) {
      state.count = 0
    },
  },
})

const postState = {
  value: [] as { id:string, title: string; imgLink: string; description: string }[],
  status: "idle",
  error: null
};

const postSlices = createSlice({
  name:'posts',
  initialState: postState,
  reducers: {
    initialPostState: (state, action: PayloadAction<{ id:string,title: string; imgLink: string; description: string }[]>) => {
      state.value = action.payload
    },
    createPostState: (state, action: PayloadAction<{ id:string,title: string; imgLink: string; description: string }>) => {
      state.value.push(action.payload)
    },
    deletePostState: (state, action: PayloadAction<{ id:string,title: string; imgLink: string; description: string }>) => {
      state.value = state.value.filter(
        (post) => post.id !== action.payload.id
      )
    },
    updatePostState: (state, action: PayloadAction<{ id: string, title?: string, imgLink?: string, description?: string }>) => {
      const { id, title, imgLink, description } = action.payload;
      const postIndex = state.value.findIndex(post => post.id === id);
    
      if (postIndex !== -1) {
        state.value[postIndex] = {
          ...state.value[postIndex],
          title: title ?? state.value[postIndex].title,
          imgLink: imgLink ?? state.value[postIndex].imgLink,
          description: description ?? state.value[postIndex].description,
        };
      }
    }    

  } 
})




export const { increment, decrement, reset } = counterSlice.actions
export const { initialPostState, createPostState, deletePostState, updatePostState } = postSlices.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    poster: postSlices.reducer,
  },
})
