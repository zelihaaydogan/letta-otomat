import BaseService from './BaseService';
class ReportService {
  getAllDeviceEvents() {
    return BaseService.getData(`Reports/GetAllDeviceEvents`);
  }
  getAllEndedOperations() {
    return BaseService.getData(`Reports/GetAllEndedOperations`);
  }
  getDeviceAlarms() {
    return BaseService.getData(`Reports/GetDeviceAlarms`);
  }
  getSystemAlarms() {
    return BaseService.getData(`Reports/GetSystemAlarms`);
  }
  getTableDataByDateFilter(tableName, startDate, endDate) {
    return BaseService.getData(
      `Reports/GetTableDataByDateFilter?tableName=${tableName}&startDate=${startDate}&endDate=${endDate}`
    );
  }
  setSystemAlarms() {
    return BaseService.getData(`Reports/SetSystemAlarms`);
  }
  getAllWebEvents() {
    return BaseService.getData(`Reports/GetAllWebEvents`);
  }
}

export default new ReportService();
