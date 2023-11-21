import { LightningElement, track, wire } from 'lwc';
import getCaseList from '@salesforce/apex/DataTableExampleController.getCaseList';
const COLUMNS = [
    {label: 'Case Number', fieldName: 'CaseNumber', type: 'text'},
    {label: 'Account Name', fieldName: 'AccountName', type: 'text'},
    {label: 'Priority', fieldName: 'Priority', type: 'text'},
    {label: 'Status', fieldName: 'Status', type: 'text'}
];
export default class DataTableExample2 extends LightningElement {
    @track columns = COLUMNS;
    @track datas;

    @wire(getCaseList)
    wiredCaseList({ error, data }) {
        if(data) {
            console.log('data#',data);
            this.datas = data.map( item => { 
                
                // return {...item,'AccountName': item.AccountId ? item.Account.Name: ''};
                return {...item,'AccountName': item.Account?.Name};
            });
            // console.log('datas#',this.datas);
        } else if(error) {
            //TODO
            console.log(JSON.stringify(error));
        }
    }
}