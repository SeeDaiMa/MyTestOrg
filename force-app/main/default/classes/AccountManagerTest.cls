@isTest
public with sharing class AccountManagerTest {
    @isTest
    private static void testTestCase() {
        Account a = new Account();
        a.name = 'a11';
        insert a;
        Contact c1 = new Contact();
        c1.AccountId = a.id;
        c1.LastName ='asdasdasd';
        insert c1;
        // Test data setup
        RestRequest request = new RestRequest();
        request.requestUri =
            'https://empathetic-panda-2q2x15-dev-ed.trailblaze.lightning.force.com/services/apexrest/Accounts/'+a.id+'/a11';
        request.httpMethod = 'GET';
        RestContext.request = request;
        // Actual test
        Test.startTest();
        a = AccountManager.getAccount();
        System.debug('aaa#'+a);
        Test.stopTest();
    
        // Asserts
    }
}