import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerApi } from '../../../api/register-api';
import { RootState } from '../../../app/store';
import { createAccountFunc } from './accCreateSlice';
import { processDob } from './components';
import { accountRegisterStateDto, registerFormDto, registerStateDto } from './register-dto';

const initialState:accountRegisterStateDto = {
    isExisted:'',
    status:'idle',
    errMsg:''
}


export const checkAccountExist = createAsyncThunk(
    'Register/regisfunc', async(params: registerFormDto, thunkApi) => {
        let response:any = await registerApi.checkAccountExisted(params.UserName, params.Password);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            thunkApi.dispatch(createAccountFunc(params));
            return response
        }
    }
)


export const accountExisted = createSlice({
    name:'Register',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(checkAccountExist.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(checkAccountExist.rejected, (state, actions: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = actions.payload;
        })
        .addCase(checkAccountExist.fulfilled, (state, actions: PayloadAction<any>) => {
            state.status = 'idle';
            state.isExisted = actions.payload;
        })
    }
})

export const { reducer, actions } = accountExisted;
// export const {  } = actions;
export const selectAccountExistedState = (state: RootState) => state.accountExisted;
export default reducer;