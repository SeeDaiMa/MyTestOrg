import { LightningElement, track, api } from 'lwc';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import { updateRecord } from 'lightning/uiRecordApi';
export default class TestParent extends LightningElement {
    @api recordId;
    @track needRefresh = false;
    refreshHandler() {
        const fields = {};
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.recordId;
        fields[ACCOUNT_INDUSTRY_FIELD.fieldApiName] = '';
        const recordInput = { fields };
        updateRecord(recordInput)
            .then(() => {
                // this.needRefresh = true;
            })
            .catch(error => {
                //TODO 
            });
        
    }

}