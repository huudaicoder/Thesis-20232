import {
    FETCH_PROPERTIES_REQUEST,
    FETCH_PROPERTIES_SUCCESS,
    FETCH_PROPERTIES_FAILURE,
  } from '../actions/data';
  
  const initialState = {
    loading: false,
    properties: [],
    error: '',
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROPERTIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_PROPERTIES_SUCCESS:
        return {
          ...state,
          loading: false,
          properties: action.payload,
          error: '',
        };
      case FETCH_PROPERTIES_FAILURE:
        return {
          ...state,
          loading: false,
          properties: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default propertyReducer;
  