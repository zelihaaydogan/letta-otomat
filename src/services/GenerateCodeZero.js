import BaseService from './BaseService';
class GenerateCodeZero {
  generate(deviceSerial, aCode) {
    return BaseService.getData(`/Devices/GenerateCodeZero?deviceSeriNo=${deviceSerial}&aCode=${aCode}`);
  }
}

export default new GenerateCodeZero();
