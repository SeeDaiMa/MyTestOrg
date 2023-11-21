// wireGetRelatedListInfo.js
import { LightningElement, wire } from 'lwc';
import { getRelatedListInfo } from 'lightning/uiRelatedListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
export default class WireGetRelatedListInfo extends LightningElement {

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    error;
    displayColumns;

    @wire(getRelatedListInfo, {
        parentObjectApiName: ACCOUNT_OBJECT.objectApiName,
        relatedListId: 'Contacts',
        recordTypeId: '$accountInfo.data.defaultRecordTypeId'// optional
    })listInfo({ error, data }) {
        console.log('data#',data);
        if (data) {
            this.displayColumns = data.displayColumns;
            this.error = undefined;
        } else if (error) {
            // this.error = reduceErrors(error);
            this.displayColumns = undefined;
        }
    }
}