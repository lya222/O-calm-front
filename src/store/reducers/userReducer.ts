import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { User } from "../../@types/user";
import { ICredentials } from "../../@types/Icredentials";
import axios from "axios";

export interface UserState {
  data: User[],
  loading: boolean;
  error: string | null | undefined
  credentials: ICredentials,
  pseudo: string
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
  credentials: {
    email: "",
    password: ""
  },
  pseudo: ""
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  console.log('asyncthunk fetchUser marche');
  const response = await axios.get<{ users: User[] }>(`http://localhost:3001/login/`);
  console.log('test de fetchUser depuis la fonction asyncthunk', response.data);
  const users = response.data.users;
  return users;
});

export const updateUser = createAsyncThunk('user/updateUser', async () => {
  const response = await axios.put(`http://localhost:3001/login/`);
  console.log('test de updateUser depuis la fonction asynctunk', response.data)
  return response.data;
});

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
  const response = await axios.post(`http://localhost:3001/login/`, userData);
  return response.data;
});




export const login = createAsyncThunk('user/login', async (credentials) => {
  const response = await axios.post(`http://localhost:3001/login/`, credentials);
  return response.data;
});





export const updateEmail = createAsyncThunk('user/updateEmail', async (email) => {
  const response = await axios.put(`http://localhost:3001/login/email`, { email });
  return response.data;
});

export const updatePassword = createAsyncThunk('user/updatePassword', async (password) => {
  const response = await axios.put(`http://localhost:3001/login/password`, { password });
  return response.data;
});

export const userReducer = createReducer(initialState, (builder) => {
  builder
   .addCase(fetchUser.pending, (state) => {
      state.loading = true;
    })
   .addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
   .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
   .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
   .addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
   .addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
   .addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
   .addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
   .addCase(createUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
   .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
   .addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
   .addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
   .addCase(updateEmail.pending, (state) => {
      state.loading = true;
    })
   .addCase(updateEmail.fulfilled, (state, action) => {
      state.data[0].email = action.payload;
      state.loading = false;
    })
   .addCase(updateEmail.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
   .addCase(updatePassword.pending, (state) => {
      state.loading = true;
    })
   .addCase(updatePassword.fulfilled, (state, action) => {
      state.data[0].password = action.payload;
      state.loading = false;
    })
   .addCase(updatePassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
});

export default userReducer;

// import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
// import { User } from "../../@types/user";
// import axios from "axios";

// export interface UserState {
//     data: User[],
//     loading: boolean;
//     error: string | null | undefined 
//   }
  
//   const initialState: UserState = {
//     data: [],
//     loading: false,
//     error: null,
//   };


// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//   console.log('asyncthunk fetchUser marche');
//   const response = await axios.get<{ users: User[] }>(`http://localhost:3001/login/`);
//   console.log('test de fetchUser depuis la fonction asyncthunk', response.data);
//   const users = response.data.users;
//   return users;
// });

// export const updateUser = createAsyncThunk('user/updateUser', async () => {
//   const response = await axios.put(`http://localhost:3001/login/`);
//   console.log('test de updateUser depuis la fonction asynctunk', response.data)
//   return response.data;
// });

// export const createUser = createAsyncThunk('user/createUser', async (userData) => {
//   const response = await axios.post(apiUrl, userData);
//   return response.data;
// });

// export const userReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(fetchUser.pending, (state) => {
//       state.loading = true;
//     })
//     .addCase(fetchUser.fulfilled, (state, action) => {
//       state.data = action.payload;
//       state.loading = false;
//     })
//     .addCase(fetchUser.rejected, (state, action) => {
//       state.error = action.error.message;
//       state.loading = false;
//     })
//     .addCase(updateUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(updateUser.fulfilled, (state, action) => {
//       state.data = action.payload;
//       state.loading = false;
//     })
//     .addCase(updateUser.rejected, (state, action) => {
//       state.error = action.error.message;
//       state.loading = false;
//     })
//     .addCase(createUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(createUser.fulfilled, (state, action) => {
//       state.data = action.payload;
//       state.loading = false;
//     })
//     .addCase(createUser.rejected, (state, action) => {
//       state.error = action.error.message;
//       state.loading = false;
//     });
// });

// export default userReducer;