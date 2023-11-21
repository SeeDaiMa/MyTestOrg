import { LightningElement ,api, track} from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'; 
import CONTACT_LASTNAME_FIELD from '@salesforce/schema/Contact.LastName'; 
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ContactCreator extends LightningElement {;
    @track objectApiName = CONTACT_OBJECT;

    @track fields = [CONTACT_FIRSTNAME_FIELD,CONTACT_LASTNAME_FIELD,CONTACT_EMAIL_FIELD];

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}