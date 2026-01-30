import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        nowTrailerMovies:null,
        nowPopularMovies:null,
        nowTopMovies:null,
        nowSearchMovies:null,
        }, 
    reducers:{
        addnowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload
        },
        addTrailerMovies:(state,action)=>{
            state.nowTrailerMovies=action.payload;
        },
         addnowPopularMovies:(state,action)=>{
            state.nowPopularMovies=action.payload
        },
        addnowTopMovies:(state,action)=>{
            state.nowTopMovies=action.payload
        },
        addnowUpcomingMovies:(state,action)=>{
            state.nowComingMovies=action.payload
        },
        addnowSearchMovies:(state,action)=>{
            state.nowSearchMovies=action.payload
        }   

    }

})


export const {addnowPlayingMovies,addTrailerMovies,
    addnowPopularMovies,addnowTopMovies,addnowUpcomingMovies,addnowSearchMovies}=moviesSlice.actions 
export default moviesSlice.reducer