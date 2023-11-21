import { LightningElement,api,track } from 'lwc';

export default class TestLookUpForLwc extends LightningElement {

    @api recordId;
    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(JSON.stringify(event.detail.fields.test_user__c));
    }


    @track item = {
        id:'xxx',
        fields:['Account.Name']
    };

    @track accountId;

    handleSelection(event) {
        console.log(event.detail.selectedId);
        this.accountId = event.detail.selectedId;
    }

}