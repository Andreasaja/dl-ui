import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
let moment = require("moment");

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    filter = {};

    // context = ["Rincian"];

    columns = [
        { field: "COANo", title: "COA" },
        { field: "JournalType", title: "Tipe Jurnal" },
        { field: "BeginingTextileDebit", title: "Debit Textile" },
        { field: "BeginingTextileCredit", title: "Kredit Textile" },
        { field: "BeginingFinishingPrintingDebit", title: "Debit FINSPRINT" },
        { field: "BeginingFinishingPrintingCredit", title: "Kredit FINSPRINT" },
        { field: "BeginingGarmentDebit", title: "Debit GARMENT" },
        { field: "BeginingGarmentCredit", title: "Kredit GARMENT" },
        
    ]

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(this.filter)
        }

        return this.service.search(arg)
            .then(result => {
                // for (const data of result.data) {
                //     data.UnitCode = data.Unit.Code;
                //     data.StorageCode = data.Storage.Code;
                // }

                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    upload() {
        this.router.navigateToRoute('upload');
    }

}