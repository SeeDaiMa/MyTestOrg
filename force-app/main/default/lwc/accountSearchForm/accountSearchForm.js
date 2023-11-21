import { LightningElement,track } from 'lwc';

export default class AccountSearchForm extends LightningElement {
    @track activeSections = ['basic'];

    @track account;

    handleRecordFormSubmit(event) {
        event.preventDefault();
        this.account = event.detail;
        this.dispatchEvent(new CustomEvent('searchaccount',{detail:this.account}));
    }

}