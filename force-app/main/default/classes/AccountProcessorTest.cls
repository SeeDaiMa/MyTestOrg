@isTest
public with sharing class AccountProcessorTest {
    

    @isTest
    private static void testTestCase() {
        // Test data setup

        Account a = new Account();
        a.Name = 'asdasdasdas';
        insert a;
        Contact c1  = new Contact();
        c1.LastName= 'cccc';
        c1.AccountId = a.id;
        Contact c2  = new Contact();
        c2.LastName= 'cccc';
        c2.AccountId = a.id;

        // Actual test
        Test.startTest();
        List<Id> accoutids = new List<Id>();
        accoutids.add(a.id);
        AccountProcessor.countContacts(accoutids);
        Test.stopTest();
    
        // Asserts
    }
}