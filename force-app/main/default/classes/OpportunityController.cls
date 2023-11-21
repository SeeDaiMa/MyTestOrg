/**
 * @description       : 
 * @author            : shihuang.zhou
 * @group             : 
 * @last modified on  : 04-09-2023
 * @last modified by  : shihuang.zhou
**/
public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> findOpportunity(String searchKey){
        String key = '%' + searchKey + '%';
        return [SELECT Id,Account.Owner.Name
                    FROM Opportunity
                    WHERE Name like :key
                    ORDER BY LastModifiedDate DESC
                    limit 1];
    }
}