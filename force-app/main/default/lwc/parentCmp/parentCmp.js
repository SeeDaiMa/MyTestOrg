import { LightningElement } from 'lwc';

export default class ParentCmp extends LightningElement {
 
    
    parentAtt;


    changeParentAtt(event){
        this.parentAtt = event.target.value;
    }

    logChildByParent(){
        this.template.querySelector("c-child-cmp").logChild();
    }
    
}