import BaseService from './BaseService';
class SalesService {
  getSales() {
    return BaseService.getData(`api/Sales/GetAllSales`);
  }
}

export default new SalesService();
