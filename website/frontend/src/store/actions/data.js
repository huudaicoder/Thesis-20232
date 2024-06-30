import axios from 'axios';

// Định nghĩa các loại action
export const FETCH_PROPERTIES_REQUEST = 'FETCH_PROPERTIES_REQUEST';
export const FETCH_PROPERTIES_SUCCESS = 'FETCH_PROPERTIES_SUCCESS';
export const FETCH_PROPERTIES_FAILURE = 'FETCH_PROPERTIES_FAILURE';

// Action creator để yêu cầu dữ liệu bất động sản
export const fetchPropertiesRequest = () => ({
  type: FETCH_PROPERTIES_REQUEST,
});

// Action creator cho trường hợp gọi API thành công
export const fetchPropertiesSuccess = (properties) => ({
  type: FETCH_PROPERTIES_SUCCESS,
  payload: properties,
});

// Action creator cho trường hợp gọi API thất bại
export const fetchPropertiesFailure = (error) => ({
  type: FETCH_PROPERTIES_FAILURE,
  payload: error,
});

// Thunk action creator để gọi API và dispatch các action trên
export const fetchProperties = () => async (dispatch) => {
    dispatch(fetchPropertiesRequest());
    try {
      const response = await axios.get('http://127.0.0.1:8000/pools/list-properties/');
      dispatch(fetchPropertiesSuccess(response.data));
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // Request made but no response received
        console.error('Request data:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error message:', error.message);
      }
      dispatch(fetchPropertiesFailure(error.message));
    }
  };
