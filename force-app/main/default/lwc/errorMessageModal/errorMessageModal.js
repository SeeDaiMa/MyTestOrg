import { LightningElement,api,track } from 'lwc';
export default class ErrorMessageModal extends LightningElement {

    @api isShowErrorDiv = false;
    @api errorMessageList = [];
    @track isShowMessage = false;

    renderedCallback() {
        if(this.errorMessageList && this.errorMessageList.length > 0) {
            this.isShowMessage = true;
        } else {
            this.isShowMessage = false;
        }
    }
}