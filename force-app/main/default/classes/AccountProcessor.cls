public with sharing class AccountProcessor {


    @future
    public static void countContacts(List<Id>  accountIds){
        List<Account> accounts =[SELECT id,
                                        (SELECT id 
                                        FROM contacts)
                                FROM account 
                                WHERE id In :accountIds];
        System.debug('accounts##'+accounts);

        for (Account AccountItem : accounts) {
            AccountItem.Number_Of_Contacts__c = AccountItem.contacts.size();
        }

        UPDATE accounts;
    }
}