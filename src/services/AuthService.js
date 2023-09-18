import BaseService from './BaseService';

class AuthService {
  login(data) {
    return BaseService.postData(`api/Auth/Login`, data);
  }
  logout(token) {
    return BaseService.postData(`api/Auth/LogOut?token=${token}`);
  }
  getWebUserInfo() {
    return BaseService.getData(`api/Users/GetUserInfo`);
  }
}

export default new AuthService();
