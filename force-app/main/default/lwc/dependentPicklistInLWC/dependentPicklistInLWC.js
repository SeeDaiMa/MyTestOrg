/* eslint-disable no-console */
import { LightningElement, wire, track, api } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class DependentPickListInLWC extends LightningElement {

    @api recordId;
    @api objectApiName;
    //存储controlling picklist的所有的值
    @track masterValues = [];
    //存储dependent picklist的所有的值
    @track controllingValues = [];
    //选择的controlling picklist 的值
    @track selectedMasterValue;
    //选择的dependent picklist的值
    @track selectedControllingValue;
    
    @track error;
    //用来记录master picklist中的 value -> valid for的列表集合
    master2ValidForValues;
    //用来记录controlling picklist的value以及valid for等信息的列表集合
    controllingValuesWithValidFor = [];

    // 获取account 的schema info
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // 获取 control picklist的值并且组装dependent picklist
    @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId'})
    countryPicklistValues({error, data}) {
        if(data) {
            this.error = null;
            let masterOptions = [];
            
            data.picklistFieldValues.Master_Picklist__c.values.forEach(key => {
                masterOptions.push({
                    label : key.label,
                    value: key.value
                })
            });

            this.masterValues = masterOptions;

            let controllingOptions = [];

            this.master2ValidForValues = data.picklistFieldValues.Controlling_Picklist__c.controllerValues;
            //用来记录controlling picklist的value以及valid for等信息的列表集合 Picklist values
            this.controllingValuesWithValidFor = data.picklistFieldValues.Controlling_Picklist__c.values;
            this.controllingValuesWithValidFor.forEach(key => {
                controllingOptions.push({
                    label : key.label,
                    value: key.value
                })
            });

            this.controllingValues = controllingOptions;
        }
        else if(error) {
            this.error = JSON.stringify(error);
        }
    }

    handleMasterPicklistChange(event) {
        //set selected master Value
        this.selectedMasterValue = event.target.value;
        this.selectedControllingValue = '';
        let controllingList = [];

        if(this.selectedMasterValue) {
            //通过valid for进行mapping，匹配的放进controlling list中
            this.controllingValuesWithValidFor.forEach(conValues => {
                if(conValues.validFor.some(item => item === this.master2ValidForValues[this.selectedMasterValue])) {
                    controllingList.push({
                        label: conValues.label,
                        value: conValues.value
                    })
                }
            })

            this.controllingValues = controllingList;
        }
    }

    handleControllingPicklistChange(event) {
        this.selectedControllingValue = event.target.value;
    }
}