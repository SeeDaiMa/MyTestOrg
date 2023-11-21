public with sharing class DataTableExampleController {


    @AuraEnabled(cacheable=true)
    @SuppressWarnings('uncheck')
    public static List<Case> getCaseList(){
        List<Case> caseList = [SELECT Id,
                                    CaseNumber,
                                    Account.Name,
                                    Priority_Image__c,
                                    Priority,
                                    Status
                                FROM Case
                                LIMIT 100];
        return caseList;
    }
}