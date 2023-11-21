@isTest
public with sharing class DailyLeadProcessorTest {

    public static String CRON_EXP = '0 33 * * * ?';

    @testSetup
    private static void testSetup() {

        // DandBCompany dbc = new DandBCompany();
        // insert dbc;
        List<Lead> leads = new List<Lead>();
        for (Integer i = 0; i < 200; i++) {
            Lead l = new Lead();
            l.LastName = 'name'+i;
            l.Company = 'Company'+i;
            leads.add(l);
        }
        INSERT leads;
    }


    @isTest
    private static void testTestCase() {
        // Test data setup
    
        // Actual test
        Test.startTest();
        DailyLeadProcessor dlp = new DailyLeadProcessor();
        System.schedule('Test schedule', CRON_EXP, dlp);
        Test.stopTest();
    
        // Asserts
    }
}