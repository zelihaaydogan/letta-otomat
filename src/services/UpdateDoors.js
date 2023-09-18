import BaseService from './BaseService';
class UpdateDoors {
  updateDoors() {
    return BaseService.postData(`Doors/UpdateDoors`);
  }
}

export default new UpdateDoors();
