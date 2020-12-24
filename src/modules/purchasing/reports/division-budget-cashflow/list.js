import { inject } from "aurelia-framework";
import { Service } from "./service";
import { CoreService } from "./core-service";
import { Router } from "aurelia-router";
import moment from "moment";

let DivisionLoader = require("../../../../loader/division-loader");

@inject(Router, Service, CoreService)
export class List {
  constructor(router, service, coreService) {
    this.service = service;
    this.router = router;
    this.coreService = coreService;
    this.error = {};
    this.division = "";
    this.dueDate = null;
    this.isEmpty = true;
    this.collectionOptions = {
      readOnly: true,
    };
    this.rowSpan = {};
    this.total = {
      oaci: [],
      oaco: [],
      oadiff: [],
      iaci: [],
      iaco: [],
      iadiff: [],
      faci: [],
      faco: [],
      fadiff: [],
    };
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  columns = [];
  rows = [];

  enums = [
    "ExportSales",
    "LocalSales",
    "CashSales",
    "InteralDivisionSales",
    "InternalUnitSales",
    "InternalIncomeVATCalculation",
    "OthersSales",
    "ExternalIncomeVATCalculation",
    "ImportedRawMaterial",
    "LocalRawMaterial",
    "EmployeeExpenses", // Missing before
    "AuxiliaryMaterial",
    "SubCount",
    "Embalage",
    "Electricity",
    "Coal",
    "FuelOil",
    "SparePartsMachineMaintenance",
    "DirectLaborCost",
    "HolidayAllowanceLaborCost",
    "ConsultantCost",
    "HealthInsuranceSocialSecurity",
    "SeveranceCost",
    "UtilityCost",
    "ImportCost",
    "InternalDivisionPurchase",
    "InternalUnitPurchase",
    "InternalOutcomeVATCalculation",
    "MarketingSalaryCost",
    "MarketingSalaryExpense",
    "MarketingHealthInsuranceSocialSecurity",
    "MarketingHolidayAllowance",
    "AdvertisementCost",
    "BusinessTripCost",
    "ShippingCost",
    "SalesComission",
    "FreightCost",
    "ClaimCost",
    "DocumentationCost",
    "InsuranceCost",
    "OtherSalesCost",
    "GeneralAdministrativeExternalOutcomeVATCalculation",
    "TaxCost",
    "GeneralAdministrativeSalaryCost",
    "GeneralAdministrativeSalaryExpense",
    "GeneralAdministrativeSocialSecurity",
    "GeneralAdministrativeDirectorsSalary",
    "GeneralAdministrativeBuildingMaintenance",
    "GeneralAdministrativeBusinessTrip",
    "GeneralAdministrativeMailingCost",
    "GeneralAdministrativeStationary",
    "GeneralAdministrativeWaterCost",
    "GeneralAdministrativeElectricityCost",
    "GeneralAdministrativeConsultant",
    "GeneralAdministrativeTraining",
    "GeneralAdministrativeCertification",
    "GeneralAdministrativeDonation",
    "GeneralAdministrativeGuestEntertainment",
    "GeneralAdministrativeVehicleBuildingMachineInsurance",
    "GeneralAdministrativeCorporateHousehold",
    "GeneralAdministrativeSeveranceCost",
    "GeneralAdministrativeHolidayAllowance",
    "GeneralAdministrativeVehicleCost",
    "GeneralAdministrativeSecurityCost",
    "GeneralAdministrativeOthersCost",
    "GeneralAdministrativeCommunicationCost",
    "OthersOperationalCost",
    "CashInDeposit",
    "CashInOthers",
    "MachineryPurchase",
    "VehiclePurchase",
    "InventoryPurchase",
    "ComputerToolsPurchase",
    "ProductionToolsMaterialsPurchase",
    "ProjectPurchase",
    "CashOutDesposit",
    "CashInLoanWithdrawal", // Missing before
    "CashInAffiliates",
    "CashInForexTrading",
    "CashInCompanyReserves",
    "CashInLoanWithdrawalOthers",
    "CashOutInstallments",
    "CashOutBankInterest",
    "CashOutBankAdministrationFee",
    "CashOutAffiliates",
    "CashOutForexTrading",
    "CashOutOthers",
  ];

  bind() {
    this.data = {};
  }

  printXls() {
    if (this.division === "" || this.dueDate === null) {
      this.error.division = "Divisi harus diisi";
      this.error.dueDate = "Periode harus diisi";
    } else {
      this.error.division = "";
      this.error.dueDate = "";

      let divisionId = 0;
      if (this.division && this.division.Id) {
        divisionId = this.division.Id;
      }

      let dueDate = this.dueDate
        ? moment(this.dueDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getXls({ divisionId, dueDate });
    }
  }

  printPdf() {
    if (this.division === "" || this.dueDate === null) {
      this.error.division = "Divisi harus diisi";
      this.error.dueDate = "Periode harus diisi";
    } else {
      this.error.division = "";
      this.error.dueDate = "";

      let divisionId = 0;
      if (this.division && this.division.Id) {
        divisionId = this.division.Id;
      }

      let dueDate = this.dueDate
        ? moment(this.dueDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getPdf({ divisionId, dueDate });
    }
  }

  async search() {
    this.collectionOptions = {
      readOnly: true,
    };

    if (this.division === "" || this.dueDate === null) {
      this.error.division = "Divisi harus diisi";
      this.error.dueDate = "Periode harus diisi";
    } else {
      this.error.division = "";
      this.error.dueDate = "";

      let divisionId = 0;
      if (this.division && this.division.Id) {
        divisionId = this.division.Id;
        this.data.DivisionId = this.division.Id;
      }

      let dueDate = this.dueDate
        ? moment(this.dueDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.data.DueDate = dueDate;

      let divisionPromises = this.enums.map((enumItem, index) => {
        return this.service
          .getDivision({
            layoutOrder: index + 1,
            divisionId: divisionId,
            dueDate: dueDate,
          })
          .then((divisions) => {
            return divisions;
          });
      });

      // let totalOACI = await this.service
      //   .getOACI({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalOACO = await this.service
      //   .getOACO({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalOADiff = await this.service
      //   .getOADiff({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalIACI = await this.service
      //   .getIACI({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalIACO = await this.service
      //   .getIACO({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalIADiff = await this.service
      //   .getIADiff({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalFACI = await this.service
      //   .getFACI({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalFACO = await this.service
      //   .getFACO({ divisionId, dueDate })
      //   .then((result) => result);

      // let totalFADiff = await this.service
      //   .getFADiff({ divisionId, dueDate })
      //   .then((result) => result);

      await Promise.all(divisionPromises).then((divisionPromiseResult) => {
        let divisionResult = divisionPromiseResult;

        let unitIds = [];
        let layoutOrderData = [];
        let currencyIds = [];
        let data = [];

        for (let response of divisionResult) {
          for (let unitId of response.data.UnitIds) {
            let existingUnitId = unitIds.find((id) => id == unitId);
            if (!existingUnitId && unitId > 0) {
              unitIds.push(unitId);
            }
          }

          for (let item of response.data.Items) {
            let existingLayoutOrderData = layoutOrderData.find(
              (datum) =>
                datum.LayoutOrder == item.LayoutOrder &&
                datum.CurrencyId == item.CurrencyId
            );
            if (!existingLayoutOrderData) {
              layoutOrderData.push({
                LayoutOrder: item.LayoutOrder,
                CurrencyId: item.CurrencyId,
              });
            }

            let existingCurrencyId = currencyIds.find(
              (id) => item.CurrencyId == id
            );
            if (!existingCurrencyId && item.CurrencyId > 0) {
              currencyIds.push(item.CurrencyId);
            }

            data.push(item);
          }
        }

        let unitPromises = unitIds.map((id) =>
          this.coreService.getUnitById(id)
        );
        let currencyPromises = currencyIds.map((id) =>
          this.coreService.getCurrencyById(id)
        );

        return Promise.all([
          Promise.all(unitPromises),
          Promise.all(currencyPromises),
        ]).then((promiseResult) => {
          let units = promiseResult[0];
          let currencies = promiseResult[1];

          let divisions = [];
          if (units.length > 0) {
            for (let unit of units) {
              let existingDivision = divisions.find(
                (division) => division.Id == unit.Division.Id
              );
              if (!existingDivision && unit.Division && unit.Division.Id > 0) {
                divisions.push(unit.Division);
              }
            }
          }

          let columns = ["MATA UANG"];

          for (let division of divisions) {
            let selectedUnits = units.filter(
              (unit) => unit.Division.Id == division.Id
            );
            for (let unit of selectedUnits) {
              columns.push(`${unit.Name} VALAS`);
              columns.push(`${unit.Name} IDR`);
              // columns.push(`Nominal Actual ${unit.Name}`);
            }

            columns.push(`DIVISI ${division.Name} VALAS`);
            columns.push(`DIVISI ${division.Name} IDR`);
          }

          columns.push(`ACTUAL`);

          // this.total.oaci = totalOACI.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.oaco = totalOACO.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.oadiff = totalOADiff.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.iaci = totalIACI.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.iaco = totalIACO.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.iadiff = totalIADiff.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.faci = totalFACI.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.faco = totalFACO.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.fadiff = totalFADiff.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });

          console.log(columns);

          let rows = [];
          for (let datum of layoutOrderData) {
            let currency = currencies.find((f) => f.Id == datum.CurrencyId);

            let row = Object.create({});
            row.LayoutOrder = datum.LayoutOrder;

            if (currency) {
              row.CurrencyCode = currency.Code;
            } else {
              row.CurrencyCode = "";
            }

            let actualNominal = 0;
            for (let division of divisions) {
              let selectedUnits = units.filter(
                (unit) => unit.Division.Id == division.Id
              );
              let currencyNominal = 0;
              let nominal = 0;
              for (let unit of selectedUnits) {
                let filteredDatum = data.find(
                  (f) =>
                    f.LayoutOrder == datum.LayoutOrder &&
                    f.CurrencyId == datum.CurrencyId &&
                    f.UnitId == unit.Id
                );

                if (filteredDatum) {
                  actualNominal += filteredDatum.ActualNominal;

                  row[`${unit.Code}CurrencyNominal`] =
                    filteredDatum.CurrencyNominal;
                  currencyNominal += filteredDatum.CurrencyNominal;
                  row[`${unit.Code}Nominal`] = filteredDatum.Nominal;
                  nominal += filteredDatum.Nominal;
                  // row[`${unit.Code}ActualNominal`] = filteredDatum.ActualNominal;
                } else {
                  row[`${unit.Code}CurrencyNominal`] = 0;
                  row[`${unit.Code}Nominal`] = 0;
                  // row[`${unit.Code}ActualNominal`] = 0;
                }
              }
              row[`${division.Code}CurrencyNominal`] = currencyNominal;
              row[`${division.Code}Nominal`] = nominal;
            }

            row.actualNominal = actualNominal;
            rows.push(row);
          }

          this.columns = columns;
          this.rows = rows;
        });
      });

      setTimeout(() => {
        this.ItemsCollection.bind();
      }, 50);

      const getItem = (min, max) => (item) =>
        item.LayoutOrder >= min && item.LayoutOrder <= max;

      // OPERATING ACTIVITIES
      // Cash In
      const revenue = this.rows.filter(getItem(1, 6));
      const otherRevenue = this.rows.filter(getItem(7, 8));
      // Cash Out
      const cogSold = this.rows.filter(getItem(9, 28));
      const sellingExpenses = this.rows.filter(getItem(29, 41));
      const gaExpenses = this.rows.filter(getItem(42, 43));
      const generalExpenses = this.rows.filter(getItem(44, 65));
      const telpExpenses = this.rows.filter(getItem(66, 66));
      const otherExpenses = this.rows.filter(getItem(67, 67));

      // INVESTING ACTIVITIES
      // Cash In
      const depoInAndOthers = this.rows.filter(getItem(68, 69));
      // Cash Out
      const assetTetap = this.rows.filter(getItem(70, 75));
      const depoOut = this.rows.filter(getItem(76, 76));

      // FINANCING ACTIVITIES
      // Cash In
      const loanWithdrawal = this.rows.filter(getItem(77, 77));
      const othersCI = this.rows.filter(getItem(78, 81));
      // Cash Out
      const loanInstallment = this.rows.filter(getItem(82, 83));
      const bankExpenses = this.rows.filter(getItem(84, 84));
      const othersCO = this.rows.filter(getItem(85, 87));

      let objectSample = this.rows.find((f) => true);
      // console.log("objectSample", objectSample);

      // oaci
      const oaciArr = [...revenue, ...otherRevenue];

      let oaciCurrencyCodes = oaciArr.map((f) => f.CurrencyCode);
      // console.log("oaciCurrencyCodes before", oaciCurrencyCodes);

      oaciCurrencyCodes = oaciCurrencyCodes.filter(
        (item, pos) => oaciCurrencyCodes.indexOf(item) == pos && item
      );
      // console.log("oaciCurrencyCodes after", oaciCurrencyCodes);

      let oaci = oaciCurrencyCodes.map((currencyCode) => {
        let data = oaciArr.filter((e) => e.CurrencyCode == currencyCode);

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a + (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.oaci =
        oaci.length !== 0 ? oaci : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.oaci", this.total.oaci);

      // oaco
      const oacoArr = [
        ...cogSold,
        ...sellingExpenses,
        ...gaExpenses,
        ...generalExpenses,
        ...telpExpenses,
        ...otherExpenses,
      ];

      let oacoCurrencyCodes = oacoArr.map((f) => f.CurrencyCode);
      // console.log("oacoCurrencyCodes before", oacoCurrencyCodes);

      oacoCurrencyCodes = oacoCurrencyCodes.filter(
        (item, pos) => oacoCurrencyCodes.indexOf(item) == pos && item
      );
      // console.log("oacoCurrencyCodes after", oacoCurrencyCodes);

      let oaco = oacoCurrencyCodes.map((currencyCode) => {
        let data = oacoArr.filter((e) => e.CurrencyCode == currencyCode);

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a + (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.oaco =
        oaco.length !== 0 ? oaco : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.oaco", this.total.oaco);

      // oadiff
      let oadiffCurrencyCodes = [...oaciCurrencyCodes, ...oacoCurrencyCodes];
      oadiffCurrencyCodes = oadiffCurrencyCodes.filter(
        (item, pos) => oadiffCurrencyCodes.indexOf(item) == pos && item
      );

      let oadiff = oadiffCurrencyCodes.map((currencyCode) => {
        let filteredOaci = oaci.find((e) => e.CurrencyCode == currencyCode);
        if (!filteredOaci) filteredOaci = objectSample;
        let filteredOaco = oaco.find((e) => e.CurrencyCode == currencyCode);
        if (!filteredOaco) filteredOaco = objectSample;
        let data = [filteredOaci, filteredOaco];

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a - (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.oadiff =
        oadiff.length !== 0 ? oadiff : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.oadiff", this.total.oadiff);

      // iaci
      const iaciArr = [...depoInAndOthers];
      let iaciCurrencyCodes = iaciArr.map((f) => f.CurrencyCode);
      // console.log("iaciCurrencyCodes before", iaciCurrencyCodes);

      iaciCurrencyCodes = iaciCurrencyCodes.filter(
        (item, pos) => iaciCurrencyCodes.indexOf(item) == pos && item
      );
      // console.log("iaciCurrencyCodes after", iaciCurrencyCodes);

      let iaci = iaciCurrencyCodes.map((currencyCode) => {
        let data = iaciArr.filter((e) => e.CurrencyCode == currencyCode);

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a + (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.iaci =
        iaci.length !== 0 ? iaci : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.iaci", this.total.iaci);

      // iaco
      const iacoArr = [...assetTetap, ...depoOut];
      let iacoCurrencyCodes = iacoArr.map((f) => f.CurrencyCode);
      // console.log("iacoCurrencyCodes before", iacoCurrencyCodes);

      iacoCurrencyCodes = iacoCurrencyCodes.filter(
        (item, pos) => iacoCurrencyCodes.indexOf(item) == pos && item
      );
      // console.log("iacoCurrencyCodes after", iacoCurrencyCodes);

      let iaco = iacoCurrencyCodes.map((currencyCode) => {
        let data = iacoArr.filter((e) => e.CurrencyCode == currencyCode);

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a + (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.iaco =
        iaco.length !== 0 ? iaco : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.iaco", this.total.iaco);

      // iadiff
      let iadiffCurrencyCodes = [...iaciCurrencyCodes, ...iacoCurrencyCodes];
      iadiffCurrencyCodes = iadiffCurrencyCodes.filter(
        (item, pos) => iadiffCurrencyCodes.indexOf(item) == pos && item
      );

      let iadiff = iadiffCurrencyCodes.map((currencyCode) => {
        let filteredIaci = iaci.find((e) => e.CurrencyCode == currencyCode);
        if (!filteredIaci) filteredIaci = objectSample;
        let filteredIaco = iaco.find((e) => e.CurrencyCode == currencyCode);
        if (!filteredIaco) filteredIaco = objectSample;
        let data = [filteredIaci, filteredIaco];

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a - (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.iadiff =
        iadiff.length !== 0 ? iadiff : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.iadiff", this.total.iadiff);

      // faci
      const faciArr = [...loanWithdrawal, ...othersCI];

      let faciCurrencyCodes = faciArr.map((f) => f.CurrencyCode);
      // console.log("faciCurrencyCodes before", faciCurrencyCodes);

      faciCurrencyCodes = faciCurrencyCodes.filter(
        (item, pos) => faciCurrencyCodes.indexOf(item) == pos && item
      );
      // console.log("faciCurrencyCodes after", faciCurrencyCodes);

      let faci = faciCurrencyCodes.map((currencyCode) => {
        let data = faciArr.filter((e) => e.CurrencyCode == currencyCode);

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a + (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.faci =
        faci.length !== 0 ? faci : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.faci", this.total.faci);

      // faco
      const facoArr = [...loanInstallment, ...bankExpenses, ...othersCO];

      let facoCurrencyCodes = facoArr.map((f) => f.CurrencyCode);
      // console.log("facoCurrencyCodes before", facoCurrencyCodes);

      facoCurrencyCodes = facoCurrencyCodes.filter(
        (item, pos) => facoCurrencyCodes.indexOf(item) == pos && item
      );
      // console.log("facoCurrencyCodes after", facoCurrencyCodes);

      let faco = facoCurrencyCodes.map((currencyCode) => {
        let data = facoArr.filter((e) => e.CurrencyCode == currencyCode);

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a + (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.faco =
        faco.length !== 0 ? faco : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.faco", this.total.faco);

      // fadiff
      let fadiffCurrencyCodes = [...faciCurrencyCodes, ...facoCurrencyCodes];
      fadiffCurrencyCodes = fadiffCurrencyCodes.filter(
        (item, pos) => fadiffCurrencyCodes.indexOf(item) == pos && item
      );

      let fadiff = fadiffCurrencyCodes.map((currencyCode) => {
        let filteredFaci = faci.find((e) => e.CurrencyCode == currencyCode);
        if (!filteredFaci) filteredFaci = objectSample;
        let filteredFaco = faco.find((e) => e.CurrencyCode == currencyCode);
        if (!filteredFaco) filteredFaco = objectSample;
        let data = [filteredFaci, filteredFaco];

        let result = {
          CurrencyCode: currencyCode,
        };

        for (var key in objectSample) {
          if (key == "CurrencyCode") continue;

          result[key] = data.reduce((a, b) => a - (b[key] || 0), 0);
        }

        result.LayoutOrder = 0;

        return result;
      });
      this.total.fadiff =
        fadiff.length !== 0 ? fadiff : [{ ...objectSample, LayoutOrder: 0 }];
      // console.log("this.total.fadiff", this.total.fadiff);

      const joined = [
        "Pendapatan Operasional:",
        ...revenue,
        "Pendapatan Operasional Lain-lain:",
        ...otherRevenue,
        ...this.total.oaci,
        "HPP/Biaya Produksi:",
        ...cogSold,
        " ",
        "Biaya Penjualan:",
        ...sellingExpenses,
        "Biaya Administrasi & Umum:",
        ...gaExpenses,
        "Biaya umum dan administrasi",
        ...generalExpenses,
        ...telpExpenses,
        "Biaya Operasional Lain-lain:",
        ...otherExpenses,
        ...this.total.oaco,
        ...this.total.oadiff,
        "Penerimaan dari Investasi:",
        ...depoInAndOthers,
        ...this.total.iaci,
        "Pembayaran pembelian asset tetap:",
        ...assetTetap,
        ...depoOut,
        ...this.total.iaco,
        ...this.total.iadiff,
        "Penerimaan dari Pendanaan:",
        ...loanWithdrawal,
        "Penerimaan lain-lain dari pendanaan:",
        ...othersCI,
        ...this.total.faci,
        "Pembayaran angsuran dan bunga Pinjaman:",
        ...loanInstallment,
        "Pembayaran Biaya Administrasi Bank:",
        ...bankExpenses,
        "Pengeluaran lain-lain dari Pendanaan:",
        ...othersCO,
        ...this.total.faco,
        ...this.total.fadiff,
        "Saldo Awal Kas",
        "TOTAL SURPLUS/DEFISIT KAS",
        "Saldo Akhir Kas",
        "Saldo Real Kas",
        "Selisih",
        "Rate $",
        "TOTAL SURPLUS (DEFISIT) EQUIVALENT",
      ];

      this.isEmpty = this.rows.length !== 0 ? false : true;
      this.rows = joined;

      console.log("this.total", this.total);
      // console.log("this.rows", this.rows);

      const itemsNoString = this.rows.filter(
        (item) => typeof item !== "string" && item.LayoutOrder !== 0
      );

      const rowSpan = itemsNoString
        .map((item) => {
          return {
            count: 1,
            layoutOrder: item.LayoutOrder,
          };
        })
        .reduce((a, b) => {
          a[b.layoutOrder] = (a[b.layoutOrder] || 0) + b.count;
          return a;
        }, {});

      this.rowSpan = rowSpan;

      const rowSpanArr = Object.values(rowSpan);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      const oaciRowSpan =
        rowSpanArr.slice(0, 8).reduce(reducer, 2) + this.total.oaci.length;
      const oacoRowSpan =
        rowSpanArr.slice(8, 67).reduce(reducer, 6) + this.total.oaco.length;
      const iaciRowSpan =
        rowSpanArr.slice(67, 69).reduce(reducer, 1) + this.total.iaci.length;
      const iacoRowSpan =
        rowSpanArr.slice(69, 76).reduce(reducer, 1) + this.total.iaco.length;
      const faciRowSpan =
        rowSpanArr.slice(76, 81).reduce(reducer, 2) + this.total.faci.length;
      const facoRowSpan =
        rowSpanArr.slice(81, 87).reduce(reducer, 3) + this.total.faco.length;

      this.calRowSpan = {
        oaciRowSpan,
        oacoRowSpan,
        iaciRowSpan,
        iacoRowSpan,
        faciRowSpan,
        facoRowSpan,
        oaRowSpan: oaciRowSpan + oacoRowSpan + this.total.oadiff.length,
        iaRowSpan: iaciRowSpan + iacoRowSpan + this.total.iadiff.length,
        faRowSpan: faciRowSpan + facoRowSpan + this.total.fadiff.length,
      };
    }
  }

  reset() {
    this.division = null;
    this.dueDate = null;
  }

  get divisionLoader() {
    return DivisionLoader;
  }
}