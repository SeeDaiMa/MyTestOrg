import { LightningElement,wire } from 'lwc';
import startRequest from '@salesforce/apexContinuation/ContinuationDemoController.startRequest';
export default class ContinuationComponent extends LightningElement {
    
    // Using wire service
    @wire(startRequest)
    wiredContinuation;

    get formattedWireResult() {
        console.log('type',typeof this.wiredContinuation);
        console.log(this.wiredContinuation.data);
        console.log(this.wiredContinuation);
        return JSON.stringify(this.wiredContinuation);
    }


    connectedCallback() {
        startRequest()
                    .then(result => {
                        // this.listOfRecords = result;
                        // this.error = undefined;
                        console.log('connectedCallback#',result);
                    })
                    .catch(error => {
                        // this.error = error;
                        // this.listOfRecords = undefined;
                        console.log('connectedCallback error#',result);
                    });
    }
}