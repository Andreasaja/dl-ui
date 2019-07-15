import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var SupplierLoader = require('../../../loader/garment-supplier-loader');
var InternLoader = require('../../../loader/garment-intern-note-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }

    bind(context) {
        console.log(context);
        this.context = context;
    }

    attached() {
    }

    activate() {
    }

    search(){
        this.info.page = 1;
        this.info.total = 0;
        this.searching();
    }

    // controlOptions = {
    //     label: {
    //         length: 4
    //     },
    //     control: {
    //         length: 4
    //     }
    // };

    // tableOptions = {
    //     search: false,
    //     showToggle: false,
    //     showColumns: false
    // }

    
    // columns = [
    //     { field: "index", title: "No", sortable:false},
    //     { field: "inNo", title: "Nomor Nota Intern", sortable:false},
    //     { field: "iNDate", title: "Tanggal Nota Intern", sortable:false,
    //         formatter: (value,data)=> {
    //             return moment(value).format("DD/MM/YYYY")
    //         }
    //     },
    //     { field: "currencyCode", title: "Mata Uang", sortable:false},
    //     { field: "supplierName", title: "Supplier", sortable:false},
    //     { field: "invoiceNo", title: "Nomor Invoice", sortable:false},
    //     { field: "invoiceDate", title: "Tanggal Invoice", sortable:false,
    //         formatter: (value,data) => {
    //             return moment(value).format("DD/MM/YYYY")
    //         }
    //     },
    //     { field: "priceTotal", title: "Harga Total", sortable:false},
    //     { field: "createdBy", title: "Staff", sortable: false}
    // ];


    // loader = (info) => {
    //     var order = {};

    //     if (info.sort)
    //         order[info.sort] = info.order;
    //     let args = {
    //         page: parseInt(info.offset / info.limit, 10) + 1,
    //         size: info.limit,
    //         no : this.internNote ? this.internNote.inNo : "",
    //         supplierCode : this.supplier ? this.supplier.code : "",
    //         curencyCode: this.currency ? this.currency.Code  : "",
    //         dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
    //         dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
    //     };
    //     console.log(args);
    //     return this.flag ? (
    //         this.service.search(args)
    //             .then(result => {
    //                 console.log(result);
    //                 var datas=[];
    //                 var index = 1;
    //                 for(var _data of result.data){
    //                 _data.priceTotal=_data.priceTotal.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
    //                 _data.index = index;
    //                 index = index + 1;
    //                 datas.push(_data);
    //              }
    //              return {
    //                  total: result.info.total,
    //                  data: datas

    //              }
                 
    //             })

    //     ) : {total: 0, data: {} };

    // }
    
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            no : this.internNote ? this.internNote.inNo : "",
            supplierCode : this.supplier ? this.supplier.code : "",
            curencyCode: this.currency ? this.currency.Code  : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        };
        this.service.search(args)
                .then(result => {
                    console.log(result);
                    var datas=[];
                    var index = 1;
                    for(var _data of result.data){
                    _data.priceTotal=_data.priceTotal.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    datas.push(_data);
                    }
                
                     this.info.total= result.info.total;
                     this.data = datas;

                 
                 
                })
        }
    
    
    ExportToExcel() {
        this.error ={};
        if(Object.getOwnPropertyNames(this.error).length === 0){
            let args = {
                no : this.internNote ? this.internNote.inNo : "",
                supplierCode : this.supplier ? this.supplier.Code : "",
                curencyCode: this.currency ? this.currency.Code  : "",
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            };
            
            this.service.generateExcel(args)
            .catch(e => {
                alert(e.replace(e, "Error:",""));
            });
        }
    }

    get supplierLoader(){
        return SupplierLoader;
    }

    get internNoteLoader(){
        return InternLoader;
    }

    get currencyLoader(){
        return CurrencyLoader;
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = null;
        this.internNote = null;
        this.currency = null;
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}