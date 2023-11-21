import { LightningElement,api, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import {getFieldValue} from 'lightning/uiRecordApi';
import {getFieldDisplayValue} from 'lightning/uiRecordApi';
import ACCOUNT_ACCOUNT_SOURCE from '@salesforce/schema/Account.AccountSource';
import { getRecordUi } from 'lightning/uiRecordApi';
export default class GetFieldDisplayValueDemo extends LightningElement {
    @api recordId;

    @wire(getRecord,{recordId:'$recordId',fields:ACCOUNT_ACCOUNT_SOURCE})
    account;

    @wire(getRecordUi, { recordIds: '$recordId', layoutTypes: 'Compact',
    modes: 'View' })
    propertyOrFunction;


    get accountSourceValue() {
        console.log("propertyOrFunction#",this.propertyOrFunction);
        console.log("Record#",this.account);
        if(this.account.data !== undefined) {
            return getFieldValue(this.account.data,ACCOUNT_ACCOUNT_SOURCE );
        }
        return '';
    }

    get accountSourceDisplayValue() {
        if(this.account.data !== undefined) {
            return getFieldDisplayValue(this.account.data,ACCOUNT_ACCOUNT_SOURCE);
        }
        return '';
    }
}