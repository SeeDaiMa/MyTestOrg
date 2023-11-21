import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class FileUploadSample extends LightningElement {
    @api recordId;

    get acceptedFormats() {
        return ['.csv'];
    }
    handleUploadFinishedEvent(event) {
        const uploadedFiles = event.detail.files;
        let uploadedFilesName = uploadedFiles.map(element => element.name);
        let uploadedFileNamesStr = uploadedFilesName.join(',');

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNamesStr,
                variant: 'success',
            }),
        );
    }
}