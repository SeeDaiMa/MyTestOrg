import { LightningElement, track,wire } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';
import {refreshApex} from '@salesforce/apex'
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class ContactListSearchWithWireService extends LightningElement {
    @track searchKey;
    @track contacts;
    @track errors;
    storedContacts;

    // to get the default record type id, if you dont' have any recordtypes then it will get master

    value ='';

    // to get the default record type id, if you dont' have any recordtypes then it will get master

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountMetadata;

    // now get the industry picklist values

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 
            fieldApiName: INDUSTRY_FIELD
        }
    )
    industryPicklist;

    // on select picklist value to show the selected value

    handleChange(event) {
        this.value = event.detail.value;
    }

    industryPicklist;
    @wire(findContacts, { searchKey: '$searchKey' })
    wiredContacts(storedContacts) {
        this.storedContacts = storedContacts;
        const {data,error} = storedContacts;
        if(data) {
            this.contacts = data;
            this.errors = undefined;
        } else if(error) {
            this.errors = error;
            this.contacts = undefined;
        }
    }

    handleSearch(event) {
        this.searchKey = this.template.querySelector('lightning-input').value;
    }

    handleRefresh(event) {
        refreshApex(this.storedContacts);
    }
}