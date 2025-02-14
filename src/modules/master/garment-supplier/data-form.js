import { inject, bindable, computedFrom } from 'aurelia-framework';
var TaxLoader = require('../../../loader/income-tax-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedTax;
  formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

  countries =
    ["", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRITISH VIRGIN ISLANDS", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLANDS", "CHAD", "CHILE", "CHINA", "COLOMBIA", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D IVOIRE", "CROATIA", "CRUISE SHIP", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ESTONIA", "ETHIOPIA", "FALKLAND ISLANDS", "FAROE ISLANDS", "FIJI", "FINLAND", "FRANCE", "FRENCH POLYNESIA", "FRENCH WEST INDIES", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HONG KONG", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISLE OF MAN", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JERSEY", "JORDAN", "KAZAKHSTAN", "KENYA", "KUWAIT", "KYRGYZ REPUBLIC", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MAURITANIA", "MAURITIUS", "MEXICO", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NEPAL", "NETHERLANDS", "NETHERLANDS ANTILLES", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORWAY", "OMAN", "PAKISTAN", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT PIERRE AND MIQUELON", "SAMOA", "SAN MARINO", "SATELLITE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOUTH AFRICA", "SOUTH KOREA", "SPAIN", "SRI LANKA", "ST KITTS AND NEVIS", "ST LUCIA", "ST VINCENT", "ST. LUCIA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR L'ESTE", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES OF AMERICA", "URUGUAY", "UZBEKISTAN", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS (US)", "YEMEN", "ZAMBIA", "ZIMBABWE"];
    selectedCountry = '';
    
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  selectedtaxChanged(newValue) {
    var _selectedIncomeTax = newValue || {};
    if (_selectedIncomeTax.Id) {
        this.data.IncomeTaxes = _selectedIncomeTax ? _selectedIncomeTax : null;
    }
    else {
        this.data.IncomeTaxes = {};
    }
    this.resetErrorItems();
}

usetaxChanged(e) {
    this.selectedTax = "";
    this.data.IncomeTaxes = null;
}

get taxLoader() {
    return TaxLoader;
}

taxView = (tax) => {
    return `${tax.name} - ${tax.rate}`
}
} 
