import { LightningElement,track } from 'lwc';
import fetchAccountList from '@salesforce/apex/AccountListController.fetchAccountList';
export default class AccountListContainer extends LightningElement {
    //account list used to show in account table
    @track accountList = [];
    //account form used to store form information user searched
    @track accountForm;
    //errors when fetch account list error
    @track errors;
    //indicator if table header total check box checked or not, true means checked
    @track totalChecked = false;
    //indicator if list modal close
    @track showSelectedListModal = false;

    @track data = [];

    //list total size
    @track totalSize;
    //per size for show in table
    @track perSize = 5;
    //current page index
    @track currentPageIndex;
    //list show in table
    @track accountListForCurrentPage;
    @track isFirstPage = true;
    @track isLastPage = true;

    /**
     * description: search account data by form information and set the result to account list to show in table
     * @param  event system event used to get form detail information
     */
    handleSearchAccountEvent(event) {
        this.totalChecked = false;
        this.accountForm = event.detail;
        fetchAccountList({serializedAccount:JSON.stringify(event.detail)})
            .then(result => {
                this.accountList = result;
                this.totalSize = result.length;
                this.currentPageIndex = 1;
                if(this.totalSize > this.perSize * this.currentPageIndex) {
                    this.setPagination();
                } else {
                    this.accountListForCurrentPage = this.accountList;
                    this.accountListForCurrentPage.forEach(item => {
                        if(item.Owner) {
                            item.OwnerName = item.Owner.Name;
                        }
                    });
                    this.isLastPage = true;
                }
                this.errors = undefined;
            })
            .catch(error =>{
                this.errors = error;
                this.accountList = undefined;
            });
    }
    

    handlePreviousPageEvent() {
        this.currentPageIndex = this.currentPageIndex - 1;
        this.setPagination();
    }

    handlePerSizeChangeEvent(event) {
        this.perSize = event.detail.currentSize;
        this.currentPageIndex = 1;
        this.setPagination();
    }

    handleNextPageEvent() {
        this.currentPageIndex = this.currentPageIndex + 1;
        this.setPagination();
    }


    // setPagination() {
    //     this.accountListForCurrentPage = [];
    //     let tmpList = [];
    //     for(let index = (this.perSize * (this.currentPageIndex - 1)); index < this.totalSize; index++) {
    //         if(index < this.perSize * this.currentPageIndex) {
    //             if(this.accountList[index].Owner) {
    //                 this.accountList[index].OwnerName = this.accountList[index].Owner.Name;
    //             }
    //             tmpList.push(this.accountList[index]);
    //         }
    //     }
    //     this.accountListForCurrentPage = tmpList;
    //     if(this.currentPageIndex === 1) {
    //         this.isFirstPage = true;
    //     } else {
    //         this.isFirstPage = false;
    //     }
    //     if(this.perSize * this.currentPageIndex >= this.totalSize) {
    //         this.isLastPage = true;
    //     } else {
    //         this.isLastPage = false;
    //     }
    // }

    setPagination() {
        this.accountListForCurrentPage = [];
        let tmpList = [];
        for(let index = (this.perSize * (this.currentPageIndex - 1)); index < this.totalSize; index++) {
            if(index < this.perSize * this.currentPageIndex) {
                if(this.accountList[index].Owner) {
                    this.accountList[index].OwnerName = this.accountList[index].Owner.Name;
                }
                tmpList.push(this.accountList[index]);
            }
        }
        //this.accountListForCurrentPage = tmpList;
        if(this.currentPageIndex === 1) {
            this.isFirstPage = true;
        } else {
            this.isFirstPage = false;
        }
        if(this.perSize * this.currentPageIndex >= this.totalSize) {
            this.isLastPage = true;
        } else {
            this.isLastPage = false;
        }

        const setList = () =>
        new Promise((resolve, reject) => {
            resolve(tmpList);
        });

        setList()
        .then((result) => {
            this.accountListForCurrentPage = tmpList;
            this.template.querySelector('c-my-account-list').handleTableScrollTop();
        });
    }
}