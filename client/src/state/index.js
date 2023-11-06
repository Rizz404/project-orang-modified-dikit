import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Membuat slice menggunakan createSlice dari Redux Toolkit
export const authSlice = createSlice({
  name: "auth", // Nama slice
  initialState, // State awal
  reducers: {
    // Action untuk mengubah mode antara "light" dan "dark"
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    // Action untuk melakukan login dan mengatur user dan token
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Action untuk melakukan logout dan menghapus user dan token
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // Action untuk mengatur daftar teman pada user
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },

    // Action untuk mengatur daftar post
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // Action untuk mengatur konten suatu post berdasarkan ID
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post; // Mengganti post yang sesuai dengan ID
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Ekstrak action creators dan reducer dari slice yang telah dibuat
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer; // Export reducer
