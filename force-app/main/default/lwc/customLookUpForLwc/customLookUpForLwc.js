/* eslint-disable no-console */
/* eslint-disable @lwc/lwc/no-async-operation */

import lookUp from '@salesforce/apex/LookupController.lookUp';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord } from 'lightning/uiRecordApi';
import { api, LightningElement, track, wire } from 'lwc';

export default class CustomLookUpForLwc extends LightningElement {
    //store object record id
    @api valueId;
    //record API name
    @api objName;
    //record icon name,see Lightning Design System to choose
    @api iconName;

    @api filter = '';
    //unique key used to mark the unique component. several component use this component need to mapping
    @api uniqueKey;
    //used to set the field to fetch.eg: ['Account.Name'] means we need to search account name field as filter
    @api fields;

    //search label show in lookup component
    @api searchLabel;

    @track searchTerm;
    //record name value
    @track valueObj;
    //record href
    @track href;
    //fetch result
    @track options;
    //is available value to show in lightning-pill
    @track isValue = false;

    @track blurTimeout;

    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';

    @wire(lookUp, {searchTerm : '$searchTerm', myObject : '$objName', filter : '$filter'})
    wiredRecords({ error, data }) {
        if (data) {
            this.record = data;
            this.error = undefined;
            this.options = this.record;
            console.log("objName##",this.objName);
            console.log("common this.options", JSON.stringify(this.options));
        } else if (error) {
            this.error = error;
            this.record = undefined;
            console.log("wire.error",this.error);
        }
    }

    //To get preselected or selected record
    @wire(getRecord, { recordId: '$valueId', fields: '$fields' })
    wiredOptions({ error, data }) {
        if (data) {
            console.log('execute1');
            this.record = data;
            this.error = undefined;
            this.valueObj = this.record.fields.Name.value;
            this.href = '/'+this.record.id;
            this.isValue = true;
            console.log("this.href", this.href);
            console.log("this.record", JSON.stringify(this.record));
        } else if (error) {
            console.log('execute2');
            this.error = error;
            this.record = undefined;
            console.log("this.error", this.error);
        }
    }

    handleClick() {
        console.log("In handleClick");

        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onSelect(event) {
        console.log("In onSelect");
        console.log('event.currentTarget#',event.currentTarget);
        let ele = event.currentTarget;
        let selectedId = ele.dataset.id;
        console.log("selectedId", selectedId);
        //As a best practise sending selected value to parent and inreturn parent sends the value to @api valueId
        let key = this.uniqueKey;
        const valueSelectedEvent = new CustomEvent('valueselect', {
            detail: { selectedId, key },
        });
        this.dispatchEvent(valueSelectedEvent);

        // if(this.blurTimeout) {
        //     clearTimeout(this.blurTimeout);
        // }
        console.log(this.isValue);
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    onChange(event) {
        console.log("In onChange");
        this.searchTerm = event.target.value;
        console.log("searchTerm",this.searchTerm);
    }

    handleRemovePill() {
        console.log("In handleRemovePill");
        this.isValue = false;
        let selectedId = '';
        let key = this.uniqueKey;
        const valueSelectedEvent = new CustomEvent('valueselect', {
            detail: { selectedId, key },
        });
        this.dispatchEvent(valueSelectedEvent);
    }

}