/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class MyComponentWithRecordEdit extends LightningElement {
    // The record page provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];

    handleLoad(event) {
        console.log('execute handle load');
        console.log("load details#" ,event.detail);
    }

    handleSubmit(event){
        this.fields.forEach(item=>{
            console.log("item#",item);
        })
        console.log('execute handle submit');
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        console.log("fields",fields);
        console.log("value#",event.target.value);
        fields.Industry = 'aaaaaa'; // modify a field   
        console.log("fields.Industry",fields.Industry);
        if(fields.Industry === null || fields.Industry === '') {
            console.log("fields.Industry",fields.Industry);
            const evt = new ShowToastEvent({
                title: "Account Operated Failed",
                message: "Account Industry cannot be blank",
                variant: "error"
            });
            this.dispatchEvent(evt);
            return;
        }
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleSuccess(event) {
        console.log("evt success evt detail",event.detail);
        console.log('execute handle success');
        const evt = new ShowToastEvent({
            title: "Account Operated",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    handleError(event) {
        console.log("evt error evt detail",event.detail);
        console.log('execute handle error');
        const evt = new ShowToastEvent({
            title: "Account Operated",
            message: event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(evt);
    }

    handleCancel(event) {
        console.log('execute handle cancel')
        const evt = new ShowToastEvent({
            title: "Account canceled",
            variant: "cancel"
        });
        this.dispatchEvent(evt);
    }
}