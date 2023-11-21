@isTest
public with sharing class AddPrimaryContactTest {

    @TestSetup
    static void makeData(){
        List<Account> accs = new List<Account>();
        for (Integer i = 0; i < 50; i++) {
            Account acc = new Account();
            acc.Name = 'NY'+i;
            acc.BillingState = 'NY';
            accs.add(acc);
        }
        for (Integer i = 0; i < 50; i++) {
            Account acc = new Account();
            acc.Name = 'CA'+i;
            acc.BillingState = 'CA';
            accs.add(acc);
        }   
        INSERT accs;
    }


    @isTest
    private static void testTestCase() {
        // Test data setup
        

        Contact c = new Contact();
        c.LastName = 'ccc';
        String state = 'CA';
        AddPrimaryContact apc = new AddPrimaryContact(c,state);
        // Actual test
        Test.startTest();
        System.enqueueJob(apc);
        Test.stopTest();
    
        // Asserts
    }
}