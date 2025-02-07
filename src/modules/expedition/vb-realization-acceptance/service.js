import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "vb-realization-expeditions";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  create(data) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  acceptForVerification(data) {
    let endpoint = `${serviceUri}/accept-for-verification`;
    return super.put(endpoint, data);
  }

  acceptForCashier(data) {
    let endpoint = `${serviceUri}/accept-for-cashier`;
    return super.put(endpoint, data);
  }

  reject(id, data) {
    let endpoint = `${serviceUri}/vb-reject/${id}`;
    return super.put(endpoint, data);
  }

  cashierDelete(id, data) {
    let endpoint = `${serviceUri}/vb-cashier-delete/${id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  post(data) {
    var endpoint = `${serviceUri}/post`;
    return super.put(endpoint, data);
  }

  getVbRealizationById(id) {
    let endpoint = `vb-realization-documents/${id}`;
    return super
      .get(endpoint)
      .then((data) => data)
      .catch(() => null);
  }
  postingClearance(data) {
    let endpoint = `${serviceUri}/clearance-post`;
    return super.post(endpoint, data);
  }
}

// export class
