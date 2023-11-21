import { LightningElement, track, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
export default class PicklistLwc extends LightningElement {

    @track masterPicklist;

    @track controllerPicklist;

    @track selectedMasterValue;

    @track selectedControllerValue;

    @track MasterValueControllerPicklist;// m1:[d1,d2]

    @track error;

    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    objetcInfo

    @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: '$objetcInfo.data.defaultRecordTypeId' })
    initPicklist({data,error}){
        console.log('data######',data);
        if(data){
            console.log('1',data.picklistFieldValues.Master_Picklist__c.values);
            console.log('2',data.picklistFieldValues.Controlling_Picklist__c.values);
            console.log('3',data.picklistFieldValues.Master_Picklist__c.controllerValues);
            console.log('4',data.picklistFieldValues.Controlling_Picklist__c.controllerValues);
            this.masterPicklist = data.picklistFieldValues.Master_Picklist__c.values;
            this.controllerPicklist = data.picklistFieldValues.Controlling_Picklist__c.values;
            // console.log(data.picklistFieldValues.Controlling_Picklist__c.controllerValues);
            var controllerVals = data.picklistFieldValues.Controlling_Picklist__c.controllerValues;
            // console.log(controllerVals[0]);
            var controllerValues = Object.keys(controllerVals);
            // console.log('controllerValues###',controllerValues);
            if(controllerValues.length > 0){
                console.log(1111111111,controllerValues.length);
                // [m1,m2,m3]
                let MasterValueControllerPicklist = {};
                // {m1:[]}
                // key m1 value d1
                console.log( data.picklistFieldValues.Controlling_Picklist__c.values);
                data.picklistFieldValues.Controlling_Picklist__c.values.forEach(element => {
                    // {label = 'D1', value = 'D1'}
                    console.log('element.validFor#',element.validFor);
                    if(element.validFor.length > 0){
                        element.validFor.forEach(i=>{
                            let masterVal  = controllerValues[i] ; // m1
                            console.log('masterVal',masterVal);
                            console.log(MasterValueControllerPicklist.hasOwnProperty(masterVal));
                            // 判断对象中存在该属性
                            if(MasterValueControllerPicklist.hasOwnProperty(masterVal)){
                                MasterValueControllerPicklist[masterVal].push(element);
                            }else{
                                let arr = [];
                                arr.push(element);
                                MasterValueControllerPicklist[masterVal] = arr;
                            }
                        })  
                    }
                });
                // console.log('MasterValueControllerPicklist',MasterValueControllerPicklist);
                this.MasterValueControllerPicklist = MasterValueControllerPicklist;
            }
        }else if(error){

        }
    }


    handleChange(event){
        if(event.target.name == 'masterPicklist'){
            this.selectedMasterValue = event.target.value;
            // 换controllerPicklist 的list ;
            // 有当前的值
            console.log('value###',event.target.value);
            if(this.MasterValueControllerPicklist.hasOwnProperty(event.target.value)){
                // console.log(this.MasterValueControllerPicklist);
                this.controllerPicklist = this.MasterValueControllerPicklist[event.target.value];
            }else{
                this.controllerPicklist  = null
            }
        }else if(event.target.name == 'controllerPicklist'){
            this.selectedControllerValue = event.target.value;
        }
    }

}