import { LightningElement } from 'lwc';

const columns = [
     {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
     {label: 'Confidence', fieldName: 'confidence', type: 'percent', cellAttributes:{ iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }},
     {label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR'}},
     {label: 'Contact Email', fieldName: 'contact', type: 'email'},
     {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
];

const data = [{
                    id: 'a',
                    opportunityName: 'Cloudhub',
                    confidence: 0.2,
                    amount: 25000,
                    contact: 'jrogers@cloudhub.com',
                    phone: '2352235235',
                    trendIcon: 'utility:down'
                },
                {
                    id: 'b',
                    opportunityName: 'Quip',
                    confidence: 0.78,
                    amount: 740000,
                    contact: 'quipy@quip.com',
                    phone: '2352235235',
                    trendIcon: 'utility:up'
                }];

export default class DatatableExample1 extends LightningElement {
    data = data;
    columns = columns;

    getSelectedName(event) {
        //两种方式获取选中的行，第一种是使用 event.detail.selectedRows，另外一种是使用querySelector找到 lightning-datatable，然后使用datatable封装的方法
        //const selectedRows = event.detail.selectedRows;
        const dataTable = this.template.querySelector('lightning-datatable');
        const selectedRows = dataTable.getSelectedRows();
        console.log('dataTable#',dataTable);
        console.log('selectedRows',selectedRows[0]);
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            console.log("You selected: " + selectedRows[i].opportunityName);
        }
    }
}