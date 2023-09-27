import BaseService from './BaseService';
class AutomatService {
  getNodeWithObjectList() {
    return BaseService.getData(`api/Automat/GetNodeWithObjectList`);
  }
  getNodeTelemetryListByNodeId(NodeId) {
    return BaseService.getData(`api/Automat/GetNodeTelemetryListByNodeId?NodeId=${NodeId}`);
  }
  GetNodeWithObjectByNodeId(NodeId) {
    return BaseService.getData(`api/Automat/GetNodeWithObjectByNodeId?NodeId=${NodeId}`);
  }
  addAutomat(data) {
    return BaseService.postData(`api/Automat/AddAutomat`, data);
  }
  updateAutomat(data) {
    return BaseService.postData(`api/Automat/UpdateAutomat`, data);
  }
  deleteAutomat(AutomatId) {
    return BaseService.deleteData(`api/Automat/DeleteAutomat?AutomatId=${AutomatId}`);
  }
  getAutomatSlots(AutomatId) {
    return BaseService.postData(`api/AutomatSlots/GetAutomatSlots?AutomatId=${AutomatId}`);
  }
}

export default new AutomatService();
