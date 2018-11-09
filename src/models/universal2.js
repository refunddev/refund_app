import { getColumns, getData } from '../services/api';

export default {
  namespace: 'universal2',
  state: {
    dataStore: [],
    columns: [],
  },
  effects: {

    * clear(payload, { call, put }) {
      yield put({
        type: 'clearData',
      });
    },

    * data(payload, { call, put }) {

      const response = yield call(getData, payload);

      yield put({
        type: 'getData',
        payload: response,
      });
    },
    * columns(payload, { call, put }) {

      const response = yield call(getColumns, payload);

      yield put({
        type: 'getColumns',
        payload: response,
      });
    },
  },
  reducers: {
    clearData(state, { payload }) {
      return {
        columns: [],
        dataStore: [],
      };
    },
    getData(state, { payload }) {
      return {
        ...state,
        dataStore: payload,
      };
    },
    getColumns(state, { payload }) {
      return {
        ...state,
        columns: payload,
      };
    },
  },
};
