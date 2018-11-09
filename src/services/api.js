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
  return request('/api/refund/getreference');
}

export async function getColumns(params) {
  return request(`/api/refund/${params.payload.table}column`);
}

export async function getData(params) {
  return request(`/api/refund/${params.payload.table}data`);
}

export async function LoginUser(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
  });
}


export async function getmainViewTable(params) {
  return request('/api/refund/maintable', {
    method: 'POST',
    body: params
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


