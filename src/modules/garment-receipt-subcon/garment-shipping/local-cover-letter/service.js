import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-shipping/receipt-subcon-local-cover-letters";
const serviceUriLocalSalesNoteTS =
  "garment-shipping/receipt-subcon-local-sales-notes";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.id}`;
    return super.delete(endpoint, data);
  }

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  getLocalSalesNoteTS(info) {
    var endpoint = `${serviceUriLocalSalesNoteTS}`;
    return super.list(endpoint, info);
  }
}

const serviceBuyerUri = "master/garment-buyers";

class CoreService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  getBuyerByCode(info) {
    var endpoint = `${serviceBuyerUri}`;
    return super.list(endpoint, info);
  }
}

export { Service, CoreService };
