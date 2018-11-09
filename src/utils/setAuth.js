import ajax from 'axios';
import jwtdecode from 'jwt-decode';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { stringify } from 'qs';

export default function(isToken = false) {

  const token = localStorage.getItem('token');

  const destroySession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('antd-pro-authority');
    setAuthority('guest');
    reloadAuthorized();
    location.replace("user/login");
  };


  // if token and isToken
  if (token && isToken) {

    const decoded = jwtdecode(token);

    return decoded.exp > Date.now() / 1000 ? token : false;
  }

  // if token expired
  if (token) {

    const decoded = jwtdecode(token);

    if (!(decoded.exp > Date.now() / 1000)) {
      destroySession();
    }
  }

  // if auth antd-pro-authority
  if (!localStorage.getItem('antd-pro-authority')) {
    destroySession();
  }

}
