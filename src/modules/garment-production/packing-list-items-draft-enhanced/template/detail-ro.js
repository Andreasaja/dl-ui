import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, SalesService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var DraftPackingListItemsLoader = require("../../../../loader/garment-draft-packing-list-items-loader");
var UomLoader = require("../../../../loader/uom-loader");
var UnitLoader = require("../../../../loader/unit-loader");

@inject(SalesService, Service)
export class Item {
  @bindable selectedRO;
  @bindable uom;

  constructor(salesService, service) {
    this.salesService = salesService;
    this.service = service;
  }

  detailsColumns = [
    { header: "Index" },
    { header: "Carton 1" },
    { header: "Carton 2" },
    { header: "Style" },
    { header: "Colour" },
    { header: "Jml Carton" },
    { header: "Qty" },
    { header: "Total Qty" },
    { header: "GW" },
    { header: "NW" },
    { header: "NNW" },
    { header: "" },
  ];

  get filter() {
    var filter = {};
    let section = this.context.context.options.header.section || {};

    if (section.code === "C") {
      var filter = {
        SectionCode: section.code || section.Code,
        //"SCGarmentId!=null": true
      };
    }
    else {
      var filter = {
        BuyerCode: this.data.BuyerCode,
        SectionCode: section.code || section.Code,
        //"SCGarmentId!=null": true
      };
    }
    return filter;
  }


  get roLoader() {
    return DraftPackingListItemsLoader;
  }

  roView = (ro) => {
    return `${ro.roNo}`
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return `${uom.Unit || uom.unit}`
  }

  get unitLoader() {
    return UnitLoader;
  }

  get unitFilter() {
    return { "(Code == \"C2A\" || Code == \"C2B\" || Code == \"C2C\" || Code == \"C1A\" || Code == \"C1B\")": true };
  }

  unitView = (unit) => {
    return `${unit.Code || unit.code}`
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = this.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      readOnly: this.readOnly,
      isEdit: this.isEdit,
      header: context.context.options.header,
      item: this.data,
    };
    if (this.data.roNo) {
      this.selectedRO = {
        roNo: this.data.RONo || this.data.roNo
      };
      this.uom = this.data.uom;
    }

    this.isShowing = false;
    if (this.error && this.error.Details && this.error.Details.length > 0) {
      this.isShowing = true;
    }
  }

  async selectedROChanged(newValue) {
    if (newValue) {
      let section = this.context.context.options.header.section || {};
      let args = {
        filter: JSON.stringify({
          RO_Number: newValue.roNo,
        })
      };
      let dataDraftPLItems = await this.service.getDraftItemsPlById(newValue.id);
      if (dataDraftPLItems != null) {
        this.data.comodityDescription = dataDraftPLItems.comodityDescription;
        this.data.quantity = dataDraftPLItems.quantity;
        this.data.unit = dataDraftPLItems.unit;
        this.data.uom = dataDraftPLItems.uom;
        this.uom = this.data.uom;
        this.data.orderNo = dataDraftPLItems.orderNo;
      }
      if (dataDraftPLItems.details != null) {
        if (dataDraftPLItems.details.length > 0) {
          dataDraftPLItems.details.map(x => {
            x.id = 0;
            x.sizes.map(s => {
              s.id = 0;
              return s;
            });
            this.data.details.push(x);
          });
        }
      }

      this.salesService.getCostCalculationByRoNo(args)
        .then(data => {
          this.salesService.getCostCalculationById(data.data[0].Id)
            .then(result => {
              this.salesService.getSalesContractById(result.SCGarmentId)
                .then(sc => {
                  this.salesService.getPreSalesContractById(result.PreSCId)
                    .then(psc => {
                      this.data.roNo = result.RO_Number;
                      this.data.article = result.Article;
                      this.data.buyerAgent = result.Buyer;
                      this.data.buyerBrand = result.BuyerBrand;
                      this.data.sectionName = result.SectionName;
                      this.data.section = {
                        id: psc.SectionId,
                        code: result.Section,
                      };
                      this.data.valas = "USD";
                      this.data.scNo = sc.SalesContractNo;
                      //this.data.amount=sc.Amount;
                      let avgPrice = 0;
                      if (sc.Price == 0) {
                        avgPrice = sc.Items.reduce((acc, cur) => acc += cur.Price, 0) / sc.Items.length;
                      } else {
                        avgPrice = sc.Price;
                      }
                      this.data.price = avgPrice;
                      this.data.priceRO = avgPrice;
                      this.data.comodity = result.Comodity;
                      this.data.amount = sc.Amount;

                      this.context.context.options.header.section = this.data.section;
                      this.updateMeasurements();
                    });
                })
            });
        });
    }
  }

  sumSubTotal(opt) {
    let result = 0;
    const newDetails = this.data.details.map(d => {
      return {
        carton1: d.carton1,
        carton2: d.carton2,
        cartonQuantity: d.cartonQuantity,
        grossWeight: d.grossWeight,
        netWeight: d.netWeight,
        netNetWeight: d.netNetWeight,
        index: d.index
      };
    }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);
    for (const detail of newDetails) {
      const cartonExist = false;
      const indexItem = this.context.context.options.header.items.indexOf(this.data);
      if (indexItem > 0) {
        for (let i = 0; i < indexItem; i++) {
          const item = this.context.context.options.header.items[i];
          for (const prevDetail of item.details) {
            if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
              cartonExist = true;
              break;
            }
          }
        }
      }
      if (!cartonExist) {
        switch (opt) {
          case 0:
            result += detail.grossWeight * detail.cartonQuantity;
            break;
          case 1:
            result += detail.netWeight * detail.cartonQuantity;
            break;
          case 2:
            result += detail.netNetWeight * detail.cartonQuantity;
            break;
        }
      }
    }
    return result;
  }


  get subGrossWeight() {
    return this.sumSubTotal(0);
    //return (this.data.details || []).reduce((acc, cur) => acc += (cur.grossWeight * cur.cartonQuantity), 0);
  }

  get subNetWeight() {
    return this.sumSubTotal(1);
    // return (this.data.details || []).reduce((acc, cur) => acc += cur.netWeight, 0);
  }

  get subNetNetWeight() {
    return this.sumSubTotal(2);
    //  return (this.data.details || []).reduce((acc, cur) => acc += cur.netNetWeight, 0);
  }

  get addDetails() {
    return (event) => {
      const i = this.context.context.items.indexOf(this.context);
      let lastIndex;

      let lastDetail;
      if (this.data.details.length > 0) {
        lastDetail = this.data.details[this.data.details.length - 1];
        lastIndex = this.data.details[this.data.details.length - 1].index;
      } else if (i > 0) {
        const lastItem = this.context.context.items[i - 1];
        lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
      }

      this.data.details.push({
        carton1: lastDetail ? lastDetail.carton2 + 1 : 0,
        index: lastIndex ? lastIndex : 1,
        sizes: []
      });
    };
  }

  get removeDetails() {
    return (event) => {
      this.error = null;
      this.updateTotalSummary();
      this.updateMeasurements();
    };
  }

  updateMeasurements() {
    let measurementCartons = [];
    for (const item of this.context.context.options.header.items) {
      for (const detail of (item.details || [])) {
        let measurement = measurementCartons.find(m => m.length == detail.length && m.width == detail.width && m.height == detail.height && m.carton1 == detail.carton1 && m.carton2 == detail.carton2 && m.index == detail.index);
        if (!measurement) {
          measurementCartons.push({
            carton1: detail.carton1,
            carton2: detail.carton2,
            length: detail.length,
            width: detail.width,
            height: detail.height,
            cartonsQuantity: detail.cartonQuantity,
            index: detail.index,
          });
        }
      }
    }

    let measurements = [];
    for (const measurementCarton of measurementCartons) {
      let measurement = measurements.find(m => m.length == measurementCarton.length && m.width == measurementCarton.width && m.height == measurementCarton.height && m.index == measurementCarton.index);
      if (measurement) {
        measurement.cartonsQuantity += measurementCarton.cartonsQuantity;
      } else {
        measurements.push(Object.assign({}, measurementCarton));
      }
    }

    this.context.context.options.header.measurements = this.context.context.options.header.measurements || [];
    this.context.context.options.header.measurements.splice(0);

    for (const mt of measurements) {
      let measurement = (this.context.context.options.header.measurementsTemp || []).find(m => m.length == mt.length && m.width == mt.width && m.height == mt.height && m.index == mt.index);
      if (measurement) {
        measurement.cartonsQuantity = mt.cartonsQuantity;
        this.context.context.options.header.measurements.push(measurement);
      } else {
        this.context.context.options.header.measurements.push(mt);
      }
    }

    this.context.context.options.header.measurements.forEach((m, i) => m.MeasurementIndex = i);
  }


  get totalQty() {
    let qty = 0;
    if (this.data.details) {
      for (var detail of this.data.details) {
        if (detail.cartonQuantity && detail.quantityPCS) {
          qty += detail.cartonQuantity * detail.quantityPCS;
        }
      }
    }
    return qty;
  }

  get totalCtn() {
    let qty = 0;
    if (this.data.details) {
      const newDetails = this.data.details.map(d => {
        return {
          carton1: d.carton1,
          carton2: d.carton2,
          cartonQuantity: d.cartonQuantity,
          grossWeight: d.grossWeight,
          netWeight: d.netWeight,
          netNetWeight: d.netNetWeight,
          index: d.index
        };
      }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);
      for (var detail of newDetails) {
        const cartonExist = false;
        const indexItem = this.context.context.options.header.items.indexOf(this.data);
        if (indexItem > 0) {
          for (let i = 0; i < indexItem; i++) {
            const item = this.context.context.options.header.items[i];
            for (const prevDetail of item.details) {
              if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
                cartonExist = true;
                break;
              }
            }
          }
        }
        if (!cartonExist) {
          qty += detail.cartonQuantity;
        }
      }
    }
    return qty;
  }

  get amount() {
    this.data.amount = 0;
    if (this.data.quantity && this.data.price) {
      this.data.amount = this.data.quantity * this.data.price
    }
    return this.data.amount;
  }

  updateTotalSummary() {
    this.context.context.options.header.grossWeight = 0;
    this.context.context.options.header.nettWeight = 0;
    this.context.context.options.header.netNetWeight = 0;

    this.data.subGrossWeight = this.sumSubTotal(0);
    this.data.subNetWeight = this.sumSubTotal(1);
    this.data.subNetNetWeight = this.sumSubTotal(2);

    for (const item of this.context.context.options.header.items) {
      this.context.context.options.header.grossWeight += item.subGrossWeight || 0;
      this.context.context.options.header.nettWeight += item.subNetWeight || 0;
      this.context.context.options.header.netNetWeight += item.subNetNetWeight || 0;
    }
  }

  // indexChanged(newValue) {
  //   this.data.details[this.data.details.length - 1].index = newValue;
  // }

  uomChanged(newValue) {
    if (newValue) {
      this.data.uom = newValue;
      this.uom = newValue;
    }
  }
}
