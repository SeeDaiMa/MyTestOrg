import { LightningElement, wire, track, api } from 'lwc';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { getRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
export default class TestSon extends LightningElement {
    accountCached;

    @api recordId;

    refreshFlag = false;

    @wire(getRecord,{ recordId: '$recordId', fields: [ACCOUNT_INDUSTRY_FIELD]})
    wiredRecord(record) {
        this.accountCached = record;
        const { error, data } = record;
        if(data) {
            if(data.fields) {
                this.accountIndustry = data.fields.Industry.value;
            }
        } else if(error) {
            console.log('execute error');
        }
    }

    refreshHandler() {
        refreshApex(this.accountCached);
    }

    get needRefresh() {
        return this.refreshFlag;
    }

    @api set needRefresh(value) {
        if(value) {
            refreshApex(this.accountCached);
        }
        this.refreshFlag = value;
    }

    @track accountIndustry;
}