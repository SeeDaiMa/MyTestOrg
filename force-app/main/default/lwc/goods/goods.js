import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getGoods from '@salesforce/apex/GoodsController.getGoods';

const columns = [
    { label: 'id', fieldName: 'Id', type: 'text' },
    { label: 'GoodsName', fieldName: 'GoodsName__c' },
    { label: 'GoodsBrands', fieldName: 'GoodsBrands__c', type: 'text' }
];

var result = {};

export default class Goods extends LightningElement {

    @track columns = columns;

    @wire(getGoods)
    getGoods;

    
    handleReset(event) {
        console.log('goods##',this.getGoods);
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }  

     handleSuccess(event){
        console.log(event.detail);
        this.dispatchEvent(
            new ShowToastEvent({
                title: '编辑成功',
                message: '编辑的内容保存成功',
                variant: 'success',
            }),
        );
    }

}