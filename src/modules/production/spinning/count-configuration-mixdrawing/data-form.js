import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';
import numeral from 'numeral';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

var moment = require('moment');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var ProductLoader = require('../../../../loader/product-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable mixItems = [];
    @bindable title;
    @bindable yarnType;
    @bindable count;
    @bindable detailOptions;
    @bindable unit;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };


    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }
    controlOptions3 = {
        label: {
            length: 1
        },
        control: {
            length: 5
        }
    }
    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 7
        }
    }
    mixDrawing = false;
    // processTypeList = [
    // ];

    detailOptions = {};
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.detailOptions.service = service;
        this.detailOptions.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        console.log(this.context)
        this.data = this.context.data;
        this.error = this.context.error;

        this.processType = "Mix Drawing";
        if (!this.data.ProcessType) {
            this.data.ProcessType = this.processType;
        }
        if (!this.data.Id) {
            this.data.Grain = 1;
            this.data.Ne = 1;
            this.data.Eff = 1;
            this.data.RPM = 1;
            this.data.MD = 1;
            this.data.Standard = 1;
            this.data.TPI = 1;
            this.data.TotalDraft = 1;
            this.data.Constant = 1;
            if (this.data.ProcessType == 'Winder') {
                this.data.ConeWeight = 1.89;
            } else {
                this.data.ConeWeight = 1;
            }

        }
        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }
        if (this.data.MaterialType && this.data.MaterialType.Id) {
            this.yarnType = this.data.MaterialType;
        }
        this.showItemRegular = false;
        this.mixDrawing = true;

    }

    @computedFrom('data.Eff', 'data.RPM', 'data.MD')
    get CapacityPerShift(){
        let CapacityPerShift = (60 * 8 * this.data.RPM * (this.data.Eff/100) * 2) / (768 * 400 * (50/this.data.MD));
        this.data.CapacityPerShift = CapacityPerShift;

        CapacityPerShift = numeral(CapacityPerShift).format();

        return CapacityPerShift;
    }

    @computedFrom('data.CapacityPerShift')
    get CapacityPerDay(){
        let CapacityPerDay = this.data.CapacityPerShift * 3;
        this.data.CapacityPerDay = CapacityPerDay;

        CapacityPerDay = numeral(CapacityPerDay).format();

        return CapacityPerDay;
    }
    
    spinningFilter = { "DivisionName.toUpper()": "SPINNING" };
    
    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;
            this.detailOptions.UnitDepartmentId = this.unit.Id;
            this.data.MaterialComposition = [];
            // this.mixItems = [];
        }
    }

    yarnTypeChanged(n, o) {
        if (this.yarnType && this.yarnType.Id) {
            this.data.MaterialTypeId = this.yarnType.Id;
        }
    }


    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }
} 