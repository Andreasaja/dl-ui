import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service, PurchasingService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isEdit = false;
  @bindable isView = false;
  @bindable title;
  @bindable data = {};
  @bindable selectedUnit;
  @bindable itemOptions = {};

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 5
    }
  };

  itemsInfo = {
    columns: [
      "RO",
      "Article",
      "Buyer",
      "Komoditi",
      ""
    ]
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isEdit: this.context.isEdit,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true
    }

    if (this.data && this.data.Items) {
      this.data.Items.forEach(
        item => {
            item.Unit = this.data.Unit;
        }
      );
      for(var item of this.data.Items){
        var details=[];
        for(var d of item.Details){
          var detail={};
          if(details.length==0){
              detail.Quantity=d.Quantity;
              detail.DesignColor=d.DesignColor;
              detail.Uom=d.Uom;
              details.push(detail);
          }
          else{
            var exist= details.find(a=>a.DesignColor==d.DesignColor);
            if(!exist){
                detail.Quantity=d.Quantity;
                detail.DesignColor=d.DesignColor;
                detail.Uom=d.Uom;
                details.push(detail);
            }
            else{
                var idx= details.indexOf(exist);
                exist.Quantity+=d.Quantity;
                details[idx]=exist;
            }
          }  
        }
        item.Details=details;
      }
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  }

  get unitLoader() {
    return UnitLoader;
  }

  selectedUnitChanged(newValue) {
    if (newValue) {
      this.data.Unit = newValue;
    }
    else {
      this.data.Items.splice(0);
    }
    this.data.Items.splice(0);
  }

  get addItems() {
    return (event) => {
        this.data.Items.push({
            Unit:this.data.Unit
        });
    };
  }

  get removeItems() {
      return (event) => {
          this.error = null;
      };
  }
  // changeChecked() {
  //   if (this.data.Items) {
  //     for (var a of this.data.Items) {
  //       a.Quantity = 0;
  //       a.IsSave = false;
  //     }
  //   }
  // }

  get totalQuantity(){
    var qty=0;
    if(this.data.Items){
        for(var item of this.data.Items){
            if(item.Details){
                for(var detail of item.Details){
                    qty += detail.Quantity;
                }
            }
        }
    }
    return qty;
  }
}
