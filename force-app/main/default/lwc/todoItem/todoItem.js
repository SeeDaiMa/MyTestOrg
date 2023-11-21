import { LightningElement, api } from 'lwc';

export default class TodoItem extends LightningElement {
    
    @api itemName;
    @api person;

    updateItemName(event){
        this.itemName = event.target.value;
    }

    updatePersonName(event){
        this.person = event.target.value;
    }
}