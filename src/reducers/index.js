import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  GET_DATA_REQUESTING,
  GET_DATA_SUCCESSED,
  GET_DATA_FAILED,
  UPDATE_ITEM_RENDER_TO_MAP,
  UPDATE_FILTER,
  HOVER_ROW_DATA,
} from '../actions';

const initialData = {
  geoData: [],
  requesting: false,
  error: null,
  itemOnMap: [],
  hoverPoint: null,
  filters: [
    '1',
    '2',
    '4',
    '5'
  ],
};

function data(state = initialData, action) {
  switch (action.type) {
    case GET_DATA_REQUESTING:
      return {
        ...state,
        ...initialData,
        requesting: true,
        error: null,
      };
    case GET_DATA_SUCCESSED:
      return {
        ...state,
        geoData: action.data,
        requesting: false,
        error: null,
      };
    
    case GET_DATA_FAILED:
      return {
        ...state,
        ...initialData,
        requesting: false,
        error: action.error,
      };
    case UPDATE_ITEM_RENDER_TO_MAP:
      return {
        ...state,
        itemOnMap: action.data,
      }
    case UPDATE_FILTER:
      return {
        ...state,
        filters: action.data,
      }
    case HOVER_ROW_DATA:
      return {
        ...state,
        hoverPoint: action.data,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({data});

export default rootReducer
