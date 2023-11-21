import { LightningElement, wire,track } from 'lwc';
import {getListUi} from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GetListUIDemo extends LightningElement {
    @track error;
    @track accountList;
    @wire(getListUi,{objectApiName:ACCOUNT_OBJECT,listViewApiName:'AllAccounts',pageSize:100})
    wiredAccountList({error,data}) {
        if(data) {
            this.accountList = data.records.records;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.accountList = undefined;
        }
    }
}