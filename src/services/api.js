import { stringify } from 'qs';
import request from '@/utils/request';

function sleepF(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }

}

export async function getReference(params) {
  return request('/api/dictionaryListByName?name=' + params.code);
}

export async function getColumns(params) {
  return request(`/api/refund/${params.payload.table}column`);
}

export async function getData(params) {
  return request(`/api/refund/${params.payload.table}`, {
    method: 'POST',
    body: params.payload
  });
}


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function LoginUser(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function RefreshToken() {
  return request('/api/CheckToken');
}

export async function getmainViewTable(params) {
  return request('/api/refund/getRefundPage', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getmainViewColumn(params) {
  return request('/api/refund/maindata');
}

export async function getRPMUTable(params) {
  return request('/api/refund/secondTable');
}

export async function getMainModal(params) {
  return request('/api/refund/mainmodal');
}

export async function getMainSelect1(params) {
  return request('/api/refund/mainselect1');
}

export async function getOptionsdata(params) {
  return request('/api/refund/optionsdata');
}

export async function setfile(params) {
  return request('/api/refund/downloading');
}

export async function getmt102file(params) {
  return request('/api/refund/getfile');
}


