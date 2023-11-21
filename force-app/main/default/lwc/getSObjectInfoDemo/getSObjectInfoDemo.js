import { LightningElement,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class GetObjectInfoDemo extends LightningElement {
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    get recordInfo() {
        if(this.accountInfo.data !== undefined) {
            return this.accountInfo.data.fields.AccountSource.label;
        }
        return '';
    }

    connectedCallback(){
        console.log("accountInfo#",this.accountInfo);
    }
}