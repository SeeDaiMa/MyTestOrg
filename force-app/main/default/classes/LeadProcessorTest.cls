@isTest
public with sharing class LeadProcessorTest {
   
    @TestSetup
    static void makeData(){ 
        List<Lead> leads = new List<Lead>();
        for (Integer i = 1; i <= 200; i++) {
            Lead l = new Lead(LastName='Lead '+i, 
            Company='Lead', Status='Open - Not Contacted');
            leads.add(l);
        }
        insert leads;
    }

    @isTest
    private static void testTestCase() {
        // Test data setup
    
        // Actual test
        Test.startTest();
        LeadProcessor processor = new LeadProcessor();
        Database.executeBatch(processor, 200);
        Test.stopTest();
    
        // Asserts
    }
}