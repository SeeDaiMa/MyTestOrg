import { LightningElement, track, wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class contactListSampleLwc extends LightningElement {
    @api accountId;
    handleShowToastEvent(event) {
        console.log('handle show toast event');
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'show toast sample',
                message: 'show toast message',
                variant: 'info'
            })
        );
    }

    handleCloseTabEvent(event) {
        this.dispatchEvent(new CustomEvent('closecurrenttab'));
    }
}