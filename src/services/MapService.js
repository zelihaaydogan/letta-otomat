import BaseService from './BaseService';

class MapService {
  getCityData() {
    return BaseService.getData(`api/Dashboard/TurkiyeMap`);
  }
}

export default new MapService();
