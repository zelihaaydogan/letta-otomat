import BaseService from './BaseService';
class DeviceService {
  getData() {
    return BaseService.getData(`api/Automat/GetAutomatAlarms`);
  }
}

export default new DeviceService();
