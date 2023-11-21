import { LightningElement, track, wire } from 'lwc';
import getCaseList from '@salesforce/apex/DataTableExampleController.getCaseList';

const COLUMNS = [
    {label: 'Case Number', fieldName: 'CaseNumber', type: 'text'},
    {label: 'Account Name', fieldName: 'AccountName', type: 'text'},
    {label: 'Priority', fieldName: 'Priority', type: 'text'},
    { label: 'Priority Image',fieldName:'Priority_Image__c',type: 'image' },
    {label: 'Status', fieldName: 'Status', type: 'text'}
];
export default class DataTableExample3 extends LightningElement {
    columns = COLUMNS;
    @track datas;

    @wire(getCaseList)
    wiredCaseList({ error, data }) {
        if(data) {
            //this.datas = data;
            let resultList = [];
            let objectTemp;
            data.forEach(item => {
                objectTemp = Object.assign({},item);
                if(item.Account) {
                    objectTemp.AccountName = item.Account.Name;
                }

                const srcIndex = objectTemp.Priority_Image__c.indexOf('src=');
                if(srcIndex !== -1) {
                    const imgSrcSubstring = objectTemp.Priority_Image__c.substring(srcIndex + 5);
                    objectTemp.Priority_Image__c = imgSrcSubstring.substring(0,imgSrcSubstring.indexOf('"'))
                }
                console.log(JSON.stringify(objectTemp));
                resultList.push(objectTemp);
            });
            this.datas = resultList;
        } else if(error) {
            //TODO
            console.log(JSON.stringify(error));
        }
    }
}