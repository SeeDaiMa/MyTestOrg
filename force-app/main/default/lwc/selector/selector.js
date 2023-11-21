import { LightningElement ,wire} from 'lwc';
import { getRecord ,getFieldValue} from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';

export default class Selector extends LightningElement {

    fields = [NAME_FIELD];
    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields })
    user;

    connectedCallback(){
        window.postMessage(
            {
                message: "1111111",
                type: "chasitor.sendMessage"
            },
            window.parent.location.href
        );
    }

    get name(){
        return getFieldValue(this.user.data,NAME_FIELD);
    }
}