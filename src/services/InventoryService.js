import BaseService from './BaseService';
class InventoryService {
  addDevice(data) {
    return BaseService.postData(`Inventory/AddDevice`, data);
  }
  updateDevice(data) {
    return BaseService.postData(`Inventory/UpdateDevice`, data);
  }
  deleteDevice(deviceSerial) {
    return BaseService.postData(`Inventory/DeleteDevice?deviceSerial=${deviceSerial}`);
  }
  addStatusDevice(addStatus) {
    return BaseService.postData(`Inventory/AddStatus?addStatus=${addStatus}`);
  }
  deleteStatusDevice(deleteStatus) {
    return BaseService.postData(`Inventory/DeleteStatus?deleteStatus=${deleteStatus}`);
  }
  getInventory() {
    return BaseService.getData(`Inventory/GetInventory`);
  }
}

export default new InventoryService();
