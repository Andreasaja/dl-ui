import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/detail-local-sales-notes';
const serviceUriSales = 'garment-shipping/local-sales-notes';

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

    getSCById(id) {
        var endpoint = `${serviceUriSC}/${id}`;
        return super.get(endpoint);
    }
}

const coreserviceUri = "master/account-banks";
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getBankAccountById(id) {
        var endpoint = `${coreserviceUri}/${id}`;
        return super.get(endpoint);
    }    
}

export { Service, CoreService }