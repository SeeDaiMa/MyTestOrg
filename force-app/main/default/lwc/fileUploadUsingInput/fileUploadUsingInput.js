import { LightningElement, track, api } from 'lwc';
import saveFile from '@salesforce/apex/FileUploadUsingInputController.saveFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class FileUploadUsingInput extends LightningElement {
    @api recordId;
    @track fileName = '';
    @track UploadFile = 'Upload File';
    @track showLoadingSpinner = false;
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    content;
    MAX_FILE_SIZE = 1500000;

    get acceptedType() {
        return ['.csv'];
    }

    handleFilesChange(event) {
        if(event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            this.fileName = event.target.files[0].name;
        }
    }

    handleSave() {
        if(this.filesUploaded.length > 0) {
            this.file = this.filesUploaded[0];
            if (this.file.size > this.MAX_FILE_SIZE) {
                window.console.log('文件过大');
                return ;
            }
            this.showLoadingSpinner = true;
            this.fileReader= new FileReader();

            this.fileReader.onloadend = (() => {
                this.fileContents = this.fileReader.result;
                let base64 = 'base64,';
                this.content = this.fileContents.indexOf(base64) + base64.length;
                this.fileContents = this.fileContents.substring(this.content);
                this.saveToFile();
            });
            this.fileReader.readAsDataURL(this.file);
        }
        else {
            this.fileName = '选择一个csv文件上传';
        }
    }


    saveToFile() {
        saveFile({ recordId: this.recordId, fileName: this.file.name, base64Data: encodeURIComponent(this.fileContents)})
        .then(result => {
            this.isTrue = true;
            this.showLoadingSpinner = false;

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: this.fileName + ' - 上传成功',
                    variant: 'success',
                }),
            );

        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: '上传失败',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}