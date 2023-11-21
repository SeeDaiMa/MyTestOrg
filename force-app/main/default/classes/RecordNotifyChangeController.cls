public with sharing class RecordNotifyChangeController {
    @AuraEnabled
    public static String saveAccount(String recordId,String industry,String phone) {
        Account accountItem = new Account();
        accountItem.Id = recordId;
        accountItem.industry = industry;
        accountItem.phone = phone;
        accountItem.Name = industry + phone;
        try {
            update accountItem;
            return 'success';
        } catch(Exception e) {
            return 'error';
        }
    }

    @AuraEnabled(cacheable=true)
    public static Account getAccount(String recordId) {
        Account accountItem = [SELECT Name,Industry,Phone from Account where Id = :recordId limit 1];
        return accountItem;
    }
}