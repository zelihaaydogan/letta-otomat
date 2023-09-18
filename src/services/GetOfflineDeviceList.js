import BaseService from './BaseService';
class GetOfflineDeviceList {
  get() {
    return BaseService.getData('/Devices/GetOfflineDeviceList');
  }
}

export default new GetOfflineDeviceList();
