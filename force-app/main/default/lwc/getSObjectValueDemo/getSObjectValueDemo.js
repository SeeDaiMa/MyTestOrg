import { LightningElement, api ,wire} from 'lwc';
import findOpportunity from '@salesforce/apex/OpportunityController.findOpportunity';
import { getSObjectValue } from '@salesforce/apex';
import OPPORTUNITY_ACCOUNT_OWNER_NAME from '@salesforce/schema/Opportunity.Account.Owner.Name';
import test from '@salesforce/label/c.test'
export default class GetSObjectValueDemo extends LightningElement {
    
    opportunityList

    customLabel = test;

    @wire(findOpportunity,{searchKey:'test'})
    findOpportunity({ error, data }) {
      if (data) {
        this.opportunityList = data;
      } else if (error) {
        this.opportunityList = undefined;
      }
    }

    get accountOwnerName(){
       if(this.opportunityList == null){
          return '';
       }
       return getSObjectValue(this.opportunityList[0],OPPORTUNITY_ACCOUNT_OWNER_NAME);
    }


    // connectedCallback(){
    //     this.customLabel = test;
    // }
}