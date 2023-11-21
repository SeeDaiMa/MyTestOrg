import { LightningElement, wire,api,track } from 'lwc';
import { getRecord,getRecordNotifyChange } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import saveAccount from '@salesforce/apex/RecordNotifyChangeController.saveAccount';
import getAccount from '@salesforce/apex/RecordNotifyChangeController.getAccount';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import NAME_FIELD from '@salesforce/schema/Account.Name';
export default class RecordNotifyChangeSample extends LightningElement {
    @api recordId;

    @track phone;

    @track industry;

    @track accountName;

    fields=[PHONE_FIELD,INDUSTRY_FIELD];

   accountRecord;

   @wire(getAccount,{recordId : '$recordId'})
   wiredAccount(value) {
       this.accountRecord = value;
       const { data, error } = value;
       if(data) {
           this.industry = data.Industry;
           this.phone = data.Phone;
           this.accountName = data.Name;
       }
   }


    handleChange(event) {
        if(event.target.name === 'phone') {
            this.phone = event.detail.value;
        } else if(event.target.name === 'industry') {
            this.industry = event.detail.value;
        }
    }

    async handleSave() {
        await saveAccount({ recordId: this.recordId, industry : this.industry, phone : this.phone})
        .then(result => {
            if(result === 'success') {
                refreshApex(this.accountRecord);
                getRecordNotifyChange([{recordId: this.recordId}]);
            } else {
                //TODO
            }
        })
        .catch(error => {
            //TODO
        });
    }

}