import { computedFrom } from "aurelia-framework";

const UomLoader = require('../../../../loader/uom-loader');

export class Detail {
	activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.isCreate = context.context.options.isCreate;
		this.isEdit = context.context.options.isEdit;
		this.options = context.options;
		if (!this.data.Uom) {
			this.data.Uom = {};
		}
		if (this.data.Uom) {
		this.data.Uom = this.data.Uom;
		}
	}

	controlOption = {
		control: {
		  length: 12
		}
	  }

	get uomLoader(){
        return UomLoader;
    }

	uomView = (Uom) => {
        return `${Uom.Unit || Uom.unit}`
    }
}