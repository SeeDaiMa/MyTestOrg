import { LightningElement, api } from 'lwc';

export default class ChildCmp extends LightningElement {
    @api childAtt

    @api logChild(){
        console.log('child');
    }


    changeChildAtt(event){
        this.childAtt = event.target.value;
    }

    
}