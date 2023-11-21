import { LightningElement,api } from 'lwc';
import modal from '@salesforce/resourceUrl/PDFModal';
import {loadStyle} from 'lightning/platformResourceLoader';
import savePDF from '@salesforce/apex/PrintJobPDFController.savePDF';
import sharePdf from '@salesforce/apex/PrintJobPDFController.sharePdf';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class GeneratePDF extends LightningElement {

    siteURL;
    @api recordId;

    connectedCallback() {
        loadStyle(this, modal)
        .then(() => {
            console.log('Loaded modal');
            this.siteURL = '/apex/generatePdf?recId=' + this.recordId;
        })
        .catch(error => console.log(error));
    }



    handleCancel(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }


    handleSubmit(){
        // 生成文件
        savePDF({recordId:this.recordId})
        .then(res=>{
            this.showToast('SUCCESS',"success","success");
            this.handleCancel();
        })
        .catch(error=>{
            this.showToast('ERROR',error.body ? error.body.message : error,"error");
            this.handleCancel();
        })
    }

    sharePDF(){
        sharePdf({recordId:this.recordId})
        .then(res=>{
            this.showToast('SUCCESS',"success","success");
            this.handleCancel();
        })
        .catch(error=>{
            this.showToast('ERROR',error.body ? error.body.message : error,"error");
            this.handleCancel();
        })
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}