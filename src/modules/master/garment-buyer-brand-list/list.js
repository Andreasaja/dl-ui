import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    { field: "Code", title: "Kode Brand" },
    { field: "Name", title: "Nama Brand" },
    { field: "BuyerName", title: "Buyer Agent" },
    {
      field: "IsPosted", title: "Active",
      formatter: function (value, row, index) {
        return value ? "SUDAH" : "BELUM";
    }
    },
  ];

  loader = (info) => {
     
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ["Code", "Name","BuyerName","IsPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
          console.log(result);
        return {
          total: result.info.total,
          data: result.data
        }
        data.BuyerName=result.data.Buyers.Name;
      });
  }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

    create() {
        this.router.navigateToRoute('create');
    }

    upload() {
        this.router.navigateToRoute('upload');
    } 

}
