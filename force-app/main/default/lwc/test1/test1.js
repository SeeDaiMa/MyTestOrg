import { LightningElement, wire,api} from 'lwc';
import getCaseList from '@salesforce/apex/DataTableExampleController.getCaseList';
const COLUMNS = [
    {label: 'Case Number', fieldName: 'CaseNumber', type: 'text'},
    {label: 'Account Name', fieldName: 'AccountName', type: 'text'},
    {label: 'Priority', fieldName: 'Priority', type: 'text'},
    {label: 'Status', fieldName: 'Status', type: 'text'}
];
export default class Test1 extends LightningElement {

    data;
    columns = COLUMNS;
    @api recordId;

    @wire(getCaseList)
    wiredCaseList({ error, data }) {
        if(data) {
            console.log('data#',data);
            this.data = data.map( item => {
               return {...item,AccountName:item.Account?.Name}
            });
            console.log('datas#',this.datas);
            console.log('wire',this.recordId);
        } else if(error) {
            //TODO
            console.log('error',JSON.stringify(error));
        }
    }

    async connectedCallback(){
        console.log('connectedCallback');
        // getCaseList()
        // .then(data=>{
        //     console.log('data#',data);
        //     this.data = data.map( item => {
        //        return {...item,AccountName:item.Account?.Name}
        //     });
        //     console.log('datas#',this.datas);
        // })
        // .catch(error=>{
        //     //TODO
        //     console.log('error',JSON.stringify(error));
        // })
        console.log(this.data);
        console.log(this.columns);
        await console.log('await',this.recordId);
        /// 延时就可以访问到recordId
        // setTimeout(()=>{
        //     console.log('setTimeout',this.recordId);
        // },100);
    }

    
    renderedCallback(){
        console.log('renderedCallback',this.recordId);
    }

}