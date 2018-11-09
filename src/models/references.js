import { getReference } from '../services/api';

export default {
  namespace: 'references',
  state: {},
  effects: {
    * load(payload, { call, put }) {

      const response = yield call(getReference, payload);

      //to do redux
      yield put({
        type: 'getLoading',
        payload: {
          data: response,
          code: payload.code,
        },
      });
    },
  },
  reducers: {
    getLoading(state, { payload }) {
      return {
        ...state,
        [payload.code]: payload.data,
      };
    },
  },
};
