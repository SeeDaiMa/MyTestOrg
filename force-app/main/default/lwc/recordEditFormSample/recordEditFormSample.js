/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecordEditFormSample extends LightningElement {

    @api recordId;
    @api objectApiName;

    handleSubmit(event) {
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        if(fields.Industry === null || fields.Industry === '') {
            const evt = new ShowToastEvent({
                title: "Account Operated Failed",
                message: "Account Industry cannot be blank",
                variant: "error",
                mode:"pester"
            });
            this.dispatchEvent(evt);
            return;
        }
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleLoad(event) {
        console.log('execute load');
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Account Operated Success",
            message: "Record is :" + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    handleError(event) {
        const evt = new ShowToastEvent({
            title: "Account Operated Failed",
            message: event.detail.message,
            variant: "error",
            mode: "sticky"
        });
        this.dispatchEvent(evt);
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }
}