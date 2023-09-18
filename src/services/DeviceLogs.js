import BaseService from './BaseService';
class DeviceLogs {
  get(doorId) {
    return BaseService.getData(`/Doors/DeviceLogs?DoorId=${doorId}`);
  }
}

export default new DeviceLogs();
