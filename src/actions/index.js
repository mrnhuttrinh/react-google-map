export const GET_DATA = 'GET_DATA';

export const GET_DATA_REQUESTING = 'GET_DATA_REQUESTING';
export const GET_DATA_SUCCESSED = 'GET_DATA_SUCCESSED';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export const UPDATE_ITEM_RENDER_TO_MAP = 'UPDATE_ITEM_RENDER_TO_MAP';

export const UPDATE_FILTER = 'UPDATE_FILTER';

export const HOVER_ROW_DATA = 'HOVER_ROW_DATA';

export function getData() {
  return {
    type: GET_DATA,
  }
}

export function getDataStart() {
  return {
    type: GET_DATA_REQUESTING,
  }
}

export function getDataSuccesed(data) {
  return {
    type: GET_DATA_SUCCESSED,
    data,
  }
}

export function getDataFailed(error) {
  return {
    type: GET_DATA_FAILED,
    error,
  }
}

export function updateItemRenderToMap(data) {
  return {
    type: UPDATE_ITEM_RENDER_TO_MAP,
    data,
  }
}

export function updateFilter(data) {
  return {
    type: UPDATE_FILTER,
    data,
  }
}

export function hoverRowData(data) {
  return {
    type: HOVER_ROW_DATA,
    data,
  }
}