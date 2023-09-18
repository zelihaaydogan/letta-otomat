import BaseService from './BaseService';
class DashboarService {
  getWidget() {
    return BaseService.postData(`Dashboard/GetWidgetContents`);
  }
  updateDoor(data) {
    return BaseService.postData(`Doors/UpdateDoor`, data);
  }
  deleteDoor(deviceIP) {
    return BaseService.postData(`Doors/DeleteDoor?deviceIP=${deviceIP}`);
  }
  getSystemOptions() {
    return BaseService.getData(`api/SystemOptions/GetSystemOptions`);
  }
  updateSystemOptions(data) {
    return BaseService.postData(`/SystemOptions/UpdateSystemOptions`, data);
  }
}

export default new DashboarService();
