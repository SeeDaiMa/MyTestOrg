trigger AccountAddressTrigger on Account(before update, after update, before insert, after insert) {
	
    System.debug('....');
    List<Account> accs = new List<Account>();
    if(Trigger.isBefore){
        System.debug('before');
        if(Trigger.isInsert){
            for(Account a:(List<Account>)Trigger.new){
              if(a.Match_Billing_Address__c){
                  a.BillingPostalCode = a.ShippingPostalCode;
            	}
			}
        
    	 }
        

        else if(Trigger.isUpdate){
              System.debug('before update old'+Trigger.old);
            for(Account a:(List<Account>)Trigger.new){
                if(a.Match_Billing_Address__c){
                   a.BillingPostalCode  = a.ShippingPostalCode;
                }
			}

        }
         
    }



  
    if (Trigger.isBefore) {
        System.debug('********Trigger values***********');
        System.debug('***SFDC: Trigger.old is: ' + Trigger.old);
        System.debug('***SFDC: Trigger.new is: ' + Trigger.new);
    }
    
    if (Trigger.isAfter) {
        System.debug('********Trigger values***********');    
        System.debug('***SFDC: Trigger.old is: ' + Trigger.old);
        System.debug('***SFDC: Trigger.new is: ' + Trigger.new);
    
    }


   

}