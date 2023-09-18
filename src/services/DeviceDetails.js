import BaseService from './BaseService';
class DeviceDetails {
  get(ipAddr) {
    return BaseService.getData(`/Doors/DeviceDetails?ip=${ipAddr}`);
  }
}

export default new DeviceDetails();
