module.exports = [
  {
    route: 'packing-sku-inventory/master-width-type',
    name: 'master-width-type',
    moduleId: './modules/packing-sku-inventory/master-width-type/index',
    nav: true,
    title: 'Master Jenis Lebar',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S1":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/weft-type',
    name: 'weft-type',
    moduleId: './modules/packing-sku-inventory/weft-type/index',
    nav: true,
    title: 'Master Jenis Pakan',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S2":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master-yarn-type',
    name: 'master-yarn-type',
    moduleId: './modules/packing-sku-inventory/master-yarn-type/index',
    nav: true,
    title: 'Master Jenis Benang',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S3":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/warp-type',
    name: 'warp-type',
    moduleId: './modules/packing-sku-inventory/warp-type/index',
    nav: true,
    title: 'Master Jenis Lusi',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S4":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master-process-type',
    name: 'master-process-type',
    moduleId: './modules/packing-sku-inventory/master-process-type/index',
    nav: true,
    title: 'Master Jenis Proses',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S5":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/material-construction',
    name: 'material-construction',
    moduleId: './modules/packing-sku-inventory/material-construction/index',
    nav: true,
    title: 'Master Lusi Pakan',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S6":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {

    route: 'packing-sku-inventory/master-woven-type',
    name: 'master-woven-type',
    moduleId: './modules/packing-sku-inventory/master-woven-type/index',
    nav: true,
    title: 'Master Jenis Anyaman',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S7":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/grade',
    name: 'grade',
    moduleId: './modules/packing-sku-inventory/grade/index',
    nav: true,
    title: 'Master Grade',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S8":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/product-sku',
    name: 'product-sku',
    moduleId: './modules/packing-sku-inventory/product-sku/index',
    nav: true,
    title: 'Barang SKU',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S9":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/product-packing',
    name: 'product-packing',
    moduleId: './modules/packing-sku-inventory/product-packing/index',
    nav: true,
    title: 'Barang Packing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S10":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/inventory-document-sku',
    name: 'product-packing',
    moduleId: './modules/packing-sku-inventory/inventory-document-sku/index',
    nav: true,
    title: 'Dokument Inventori SKU',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S11":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/inventory-document-packing',
    name: 'product-packing',
    moduleId: './modules/packing-sku-inventory/inventory-document-packing/index',
    nav: true,
    title: 'Dokumen Inventori Packing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S12":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/im-area-input',
    name: 'im-area-input',
    moduleId: './modules/packing-sku-inventory/im-area-input/index',
    nav: true,
    title: 'Penerimaan IM Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "IM",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S13":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/quality-control/defect',
    name: 'fabric-quality-control',
    moduleId: './modules/packing-sku-inventory/fabric-quality-control/index',
    nav: true,
    title: 'Pencatatan Pemeriksaan Kain',

    auth: true,
    settings: {
      group: "ps-inventory",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/im-area-output',
    name: 'product-packing',
    moduleId: './modules/packing-sku-inventory/im-area-output/index',
    nav: true,
    title: 'Pencatatan Keluar IM Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "IM",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S14":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/transit-area-input',
    name: 'transit-area-input',
    moduleId: './modules/packing-sku-inventory/transit-area-input/index',
    nav: true,
    title: 'Penerimaan Transit Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "transit",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S15":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/transit-area-output',
    name: 'transit-area-output',
    moduleId: './modules/packing-sku-inventory/transit-area-output/index',
    nav: true,
    title: 'Pencatatan Keluar Transit Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "transit",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S16":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/transit-balance-summary',
    name: 'transit-balance-summary',
    moduleId: './modules/packing-sku-inventory/transit-balance-summary/index',
    nav: true,
    title: 'Saldo Transit',
    auth: true,
    settings: {
      group: "ps-inventory",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  //#region dicomment
  // {
  //     route: 'packing-sku-inventory/dyeing-printing-in-packaging',
  //     name: 'dyeing-printing-in-packaging',
  //     moduleId: './modules/packing-sku-inventory/dyeing-printing-in-packaging/index',
  //     nav: true,
  //     title: 'Penerimaan Packing Area Dyeing/Printing V1',
  //     auth: true,
  //     settings: {
  //         group: "ps-inventory",
  //         permission: { "C9": 1, "F1": 1, "F2": 1 },
  //         iconClass: 'fa fa-dashboard'
  //     }
  // },
  // {

  //     route: 'packing-sku-inventory/dyeing-printing-goods-warehouse',
  //     name: 'dyeing-printing-goods-warehouse',
  //     moduleId: './modules/packing-sku-inventory/dyeing-printing-goods-warehouse/index',
  //     nav: true,
  //     title: 'Bon Gudang Barang Jadi Dyeing/Printing',
  //     auth: true,
  //     settings: {
  //         group: "ps-inventory",
  //         permission: { "C9": 1, "F1": 1, "F2": 1 },
  //         iconClass: 'fa fa-dashboard'
  //     }
  // },
  //#endregion
  {
    route: 'packing-sku-inventory/dyeing-printing-in-packaging-v2',
    name: 'dyeing-printing-in-packaging-v2',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-in-packaging-v2/index',
    nav: true,
    title: 'Penerimaan Packing Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "packing",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S17":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-out-packaging',
    name: 'dyeing-printing-out-packaging',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-out-packaging/index',
    nav: true,
    title: 'Pencatatan Keluar Packing Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "packing",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S18":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-in-warehouses',
    name: 'dyeing-printing-in-warehouses',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-in-warehouses/index',
    nav: true,
    title: 'Penerimaan Gudang Barang Jadi Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "gudang jadi",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S19":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-out-warehouses-v2',
    name: 'dyeing-printing-out-warehouses-v2',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-out-warehouses-v2/index',
    nav: true,
    title: 'Pencatatan Keluar Gudang Barang Jadi Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "gudang jadi",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S20":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/aval-area-input',
    name: 'aval-area-input',
    moduleId: './modules/packing-sku-inventory/aval-area-input/index',
    nav: true,
    title: 'Penerimaan Aval Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "aval",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S21":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/aval-area-transformation-input',
    name: 'aval-area-transformation-input',
    moduleId: './modules/packing-sku-inventory/aval-area-transformation-input/index',
    nav: true,
    title: 'Perubahan Masukan Aval Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "aval",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S22":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/aval-area-output',
    name: 'aval-area-output',
    moduleId: './modules/packing-sku-inventory/aval-area-output/index',
    nav: true,
    title: 'Pencatatan Keluar Aval Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "aval",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S23":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/inspection-im-balance',
    name: 'product-packing',
    moduleId: './modules/packing-sku-inventory/inspection-im-balance/index',
    nav: true,
    title: 'Saldo IM',
    auth: true,
    settings: {
      group: "ps-inventory",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/shipping-area-input',
    name: 'shipping-area-input',
    moduleId: './modules/packing-sku-inventory/shipping-area-input/index',
    nav: true,
    title: 'Penerimaan Shipping Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "shipping",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S24":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/shipping-area-output',
    name: 'shipping-area-output',
    moduleId: './modules/packing-sku-inventory/shipping-area-output/index',
    nav: true,
    title: 'Pencatatan Keluar Shipping Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "shipping",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S25":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/report-dyeing-printing-stock',
    name: 'report-dyeing-printing-stock',
    moduleId: './modules/packing-sku-inventory/report-dyeing-printing-stock/index',
    nav: true,
    title: 'Laporan Stock Dyeing Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "stok",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S26":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/report-dyeing-printing-stock-so',
    name: 'report-dyeing-printing-stock-so',
    moduleId: './modules/packing-sku-inventory/report-dyeing-printing-stock-SO/index',
    nav: true,
    title: 'Laporan Stock Dyeing Printing (SO)',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "stok",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S37":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-stock-opname-document',
    name: 'dyeing-printing-stock-opname-document',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-stock-opname-document/index',
    nav: true,
    title: 'Stock Opname Sudah Di Scan (Barcode)',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "stok",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S27":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-stock-opname',
    name: 'dyeing-printing-stock-opname',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-stock-opname/index',
    nav: true,
    title: 'Stock Opname Dyeing/Printing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "stok",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      permission :{"S28":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-stock-opname-mutation',
    name: 'dyeing-printing-stock-opname-mutation',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-stock-opname-mutation/index',
    nav: true,
    title: 'Stock Opname Mutasi',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "stok",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S38" : 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-stock-opname-track',
    name: 'dyeing-printing-stock-opname-mutation',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-stock-opname-track/index',
    nav: true,
    title: 'Update Jalur & Rak',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "stok",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S38" : 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/aval-stock-report',
    name: 'aval-stock-report',
    moduleId: './modules/packing-sku-inventory/aval-stock-report/index',
    nav: true,
    title: 'Laporan Stock Gudang Aval',
    auth: true,
    settings: {
      group: "ps-inventory",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/category',
    name: 'packing-sku-category',
    moduleId: './modules/packing-sku-inventory/master/category/index',
    nav: true,
    title: 'Kategori Barang',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S29":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/product-packing',
    name: 'packing-sku-product-packing',
    moduleId: './modules/packing-sku-inventory/master/product-packing/index',
    nav: true,
    title: 'Barang Packing',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S30":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/product-sku',
    name: 'product-sku',
    moduleId: './modules/packing-sku-inventory/master/product-sku/index',
    nav: true,
    title: 'Barang SKU',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S31":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/unit-of-measurement',
    name: 'unit-of-measurement',
    moduleId: './modules/packing-sku-inventory/master/unit-of-measurement/index',
    nav: true,
    title: 'Satuan',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S32":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/fabric-packing',
    name: 'fabric-packing',
    moduleId: './modules/packing-sku-inventory/master/fabric-packing/index',
    nav: true,
    title: 'Barang Packing Fabric',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S33":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/fabric-sku',
    name: 'fabric-sku',
    moduleId: './modules/packing-sku-inventory/master/fabric-sku/index',
    nav: true,
    title: 'Barang SKU Fabric',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S34":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/greige-packing',
    name: 'greige-packing',
    moduleId: './modules/packing-sku-inventory/master/greige-packing/index',
    nav: true,
    title: 'Barang Packing Greige',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S35":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/master/greige-sku',
    name: 'greige-sku',
    moduleId: './modules/packing-sku-inventory/master/greige-sku/index',
    nav: true,
    title: 'Barang SKU Greige',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      // permission: { "C9": 1, "F1": 1, "F2": 1 },
      permission :{"S36":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "track",
    name: "track",
    moduleId: "./modules/master/track/index",
    nav: true,
    title: "Jalur / Rak",
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "master",
      permission: { "S39": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-warehouse-in',
    name: 'dyeing-printing-warehouse-in',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-warehouse-in/index',
    nav: true,
    title: 'Penerimaan Gudang Barang Jadi',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "gudang jadi",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S40" : 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-warehouse-track',
    name: 'dyeing-printing-warehouse-track',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-warehouse-track/index',
    nav: true,
    title: 'Update Jalur & Rak',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "gudang jadi",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S41" : 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-warehouse-out',
    name: 'dyeing-printing-warehouse-out',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-warehouse-out/index',
    nav: true,
    title: 'Pengeluaran Gudang Barang Jadi',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "gudang jadi",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S42" : 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-shipping-input',
    name: 'dyeing-printing-shipping-input',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-shipping-input/index',
    nav: true,
    title: 'Penerimaan Shipping DP - Gudang Jadi',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "shipping",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S43" : 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'packing-sku-inventory/dyeing-printing-shipping-retur',
    name: 'dyeing-printing-shipping-retur',
    moduleId: './modules/packing-sku-inventory/dyeing-printing-shipping-retur/index',
    nav: true,
    title: 'Penerimaan Shipping DP - Retur Buyer ',
    auth: true,
    settings: {
      group: "ps-inventory",
      subGroup: "shipping",
      // permission: { "C9": 1, "F1": 1, "F2": 1, "A2": 1, "W2": 1 },
      //permission :{"S28":1},
      permission : {"S43" : 1},
      iconClass: 'fa fa-dashboard'
    }
  }
];
