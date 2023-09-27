import BaseService from './BaseService';
class ProductService {
  getAllProducts() {
    return BaseService.getData(`api/Product/GetAllProducts`);
  }
  addProduct(data) {
    return BaseService.postData(`api/Product/AddProduct`, data);
  }
  updateProduct(data) {
    return BaseService.putData(`api/Product/UpdateProduct`, data);
  }
  deleteProduct(ProductId) {
    return BaseService.deleteData(`api/Product/DeleteProduct?ProductId=${ProductId}`);
  }
}

export default new ProductService();
