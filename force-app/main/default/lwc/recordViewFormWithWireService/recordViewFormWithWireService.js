/* eslint-disable no-console */
import { LightningElement,wire,api,track } from 'lwc';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
const ACCOUNT_FIELDS = [ACCOUNT_NAME_FIELD,ACCOUNT_INDUSTRY_FIELD,ACCOUNT_ANNUAL_REVENUE];
export default class RecordViewFormWithWireService extends LightningElement {
    @api recordId;

    @wire(getRecord,{recordId:'$recordId',fields:ACCOUNT_FIELDS})
    wiredAccount;

    get accountName() {
        // console.log(JSON.stringify(this.wiredAccount));
        // console.log('xx');
        // if(this.wiredAccount.data !== undefined) {
        //     return this.wiredAccount.data.fields.Name.value.toUpperCase();
        // }
        // return '';
        return this.wiredAccount.data != undefined ? getFieldValue(this.wiredAccount.data,ACCOUNT_NAME_FIELD).toUpperCase() : '';
    }
}