import { testMethod } from '../services/user';
import { getmainViewTable, getmainViewColumn, getRPMUTable, getMainModal, getMainSelect1, getOptionsdata, setfile, getmt102file } from '../services/api';

export default {
  namespace: 'universal',
  state: {
    table: {
      number: null,
      size: null,
      totalElements: null,
      totalPages: null,
      content: []
    },
    columns: [ ],
    rpmu: {
      columns:[],
      data:[]
    },
    mainmodal:[],
    select1: [],
    options: []
  },
  effects: {
    * setfile(payload, { call, put }) {
      const response = yield call(setfile, payload);

      yield put({
        type: 'setfileReduce',
        payload: response,
      });
    },
    * getmt102(payload, { call, put }) {
      const response = yield call(getmt102file, payload);

      yield put({
        type: 'mt102',
        payload: response,
      });
    },

    * mainviewtable(payload, { call, put }) {
      const response = yield call(getmainViewTable, payload);

      yield put({
        type: 'maintable',
        payload: response,
      });
    },
    * mainviewcolumn(payload, { call, put }) {
      const response = yield call(getmainViewColumn, payload);

      yield put({
        type: 'maincolumn',
        payload: response,
      });
    },
    * rpmuTable(payload, { call, put }) {
      const response = yield call(getRPMUTable, payload);

      yield put({
        type: 'rpmuReduce',
        payload: response,
      });
    },
    * mainModal(payload, { call, put }) {
      const response = yield call(getMainModal, payload);

      yield put({
        type: 'mainModalReducer',
        payload: response,
      });
    },
    * mainSelect1(payload, { call, put }) {
      const response = yield call(getMainSelect1, payload);

      yield put({
        type: 'mainSelect1Reduce',
        payload: response,
      });
    },
    * optionsData(payload, { call, put }) {
          const response = yield call(getOptionsdata, payload);
          yield put({
            type: 'OptionReducer',
            payload: response,
          });
        },
    * optionsDatachange(payload, { put }) {
      yield put({
        type: 'OptionChangeReducer',
        payload: payload,
      });
    },
  },

  reducers: {
    mt102(state, { payload }) {
      return {
        ...state,
        mt102file:payload
      };
    },
    setfileReduce(state, { payload }) {
      return {
        ...state,
        setfile:payload
      };
    },
    maintable(state, { payload }) {
      return {
        ...state,
        table:payload
      };
    },
    maincolumn(state, { payload }) {
      return {
        ...state,
        columns:payload
      };
    },
    rpmuReduce(state, { payload }) {
      return {
        ...state,
        rpmu:payload
      };
    },
    mainModalReducer(state, { payload }) {
      return {
        ...state,
        mainmodal:payload
      };
    },
    mainSelect1Reduce(state, { payload }) {
      return {
        ...state,
        select1:payload
      };
    },
    OptionReducer(state, { payload }) {
      return {
        ...state,
        options:payload
      };
    },
    OptionChangeReducer(state, { payload }) {
      return {
        ...state,
        options:payload.payload
      };
    },

  },
};
