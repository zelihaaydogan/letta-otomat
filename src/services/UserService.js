import BaseService from './BaseService';
class UserService {
  addUser(data) {
    return BaseService.postData(`api/Users/AddUser`, data);
  }
  updateUser(data) {
    return BaseService.putData(`api/Users/UpdateUser`, data);
  }
  deleteUser(userId) {
    return BaseService.deleteData(`api/Users/DeleteUser?UserId=${userId}`);
  }
  getUser() {
    return BaseService.getData(`api/Users/GetAllWebUsers`);
  }
}

export default new UserService();
