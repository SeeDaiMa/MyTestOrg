@isTest
public with sharing class LWCObjectTest {


    @IsTest(SeeAllData = true)
    static void test1(){
        lwc__c lwc = [select Test_Feild__c from lwc__c  limit 1];
        lwc.Test_Feild__c = '2345678';
        Test.startTest();
        UPDATE lwc;
        Test.stopTest();
    }
}