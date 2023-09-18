import BaseService from './BaseService';
class UpdateDoor {
  postData(data) {
    return BaseService.postData(`Doors/UpdateDoor`, data);
  }
}

export default new UpdateDoor();
