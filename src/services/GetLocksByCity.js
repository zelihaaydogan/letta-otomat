import BaseService from './BaseService';
class GetLocksByCity {
  getData(cityName) {
    return BaseService.getData(`api/Automat/GetAutomatsByCity?cityName=${cityName}`);
  }
}

export default new GetLocksByCity();
