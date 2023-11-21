import { LightningElement,api, track } from 'lwc';

const columns = [
    {label: 'Account Name', fieldName: 'Name'},
    {label: 'Account Industry', fieldName: 'Industry'},
    {label: 'Account Source', fieldName: 'AccountSource'},
    {label: 'Owner Name', fieldName: 'OwnerName'}
];

export default class MyAccountList extends LightningElement {
    //searched account list used to show in component table
    @api accountList;
    //indicator if table header checkbox check or not, true for check
    @api totalChecked;
    //list total entryList
    @api totalSize;
    //per size for show in table
    @api perSize;
    //current page index
    @api currentPageIndex;
    //list show in table
    @api accountListForCurrentPage;
    //indicator if current page is first page
    @api isFirstPage;
    //indicator if current page is last page
    @api isLastPage;

    @track columns = columns;

    get entryList() {
        return [
            { label: '3', value: '3' },
            { label: '5', value: '5' },
            { label: '10', value: '10' },
        ];
    }

    @api handleTableScrollTop() {
        this.template.querySelector('div').scrollTop = 0;
    }

    /**
     * description: item checkbox check/uncheck, dispatch itemcheck custom event and parent component handle this
     * @param event system event,used to get which item check/uncheck
     */
    handleItemCheckboxClick(event) {
        this.dispatchEvent(new CustomEvent('itemcheck',{detail:{id:event.currentTarget.value,checked:event.currentTarget.checked}}));
    }

    /**
     * description: table header checkbox check/check, dispatch allcheck custom event
     * @param  event system event, used to get if table header checkbox check/uncheck
     */
    handleAllCheckboxClick(event) {
        this.dispatchEvent(new CustomEvent('allcheck',{detail:{checked:event.currentTarget.checked}}));
    }

    handleNextPageClick() {
        this.dispatchEvent(new CustomEvent('nextpage'));
    }

    handlePreviousPageClick() {
        this.dispatchEvent(new CustomEvent('previouspage'));
    }

    handlePerSizeChange(event) {
        let currentSize = event.detail.value;
        this.dispatchEvent(new CustomEvent('persizechange',{detail:{currentSize:currentSize}}));
    }
}