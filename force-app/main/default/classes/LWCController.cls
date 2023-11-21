public with sharing class LWCController {

    public lwc__c lwc {get;set;}
    public LWCController() {
        Id recordId = ApexPages.currentPage().getParameters().get('id');
        lwc = [SELECT test111__c FROM lwc__c WHERE id = :recordId];
    }
}