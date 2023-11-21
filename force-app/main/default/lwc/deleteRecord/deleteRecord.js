import { LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class DeleteRecord extends LightningElement {
    
    AccountId;
    
    deleteAccount(event){
        console.log("111111111");
        AccountId = this.template.querySelector("lightning-input").value;
        console.log('AccountId#',AccountId);
        deleteRecord(AccountId).then(
            ()=>{
                this.dispatchEvent(new ShowToastEvent(
                    {
                        title: 'Success',
                        message: 'Delete Record Success',
                        variant: 'success'
                    }
                ));
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Contact',
                        actionName: 'home',
                    },
                });
            }
        ).catch(
            error=>{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error' 
                }))
            }
        )
    }
}