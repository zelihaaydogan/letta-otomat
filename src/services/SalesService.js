import BaseService from './BaseService';
class SalesService {
  getSales() {
    return BaseService.getData(`api/Sales/GetAllSales`);
  }
  getSalesReport() {
    return BaseService.getData(`/api/Sales/GetAllSales`);
  }
  getPaymentReport() {
    return BaseService.getData(`/api/Payment/GetPayments`);
  }
  getSalesSummary() {
    return BaseService.getData(`/api/Sales/GetSalesSummary`);
  }
  getPaymentSummary() {
    return BaseService.getData(`/api/Payment/GetPaymentsSummary`);
  }
}

export default new SalesService();
