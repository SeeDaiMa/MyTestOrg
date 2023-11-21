@isTest
public with sharing class AnimalLocatorTest {
    public AnimalLocatorTest() {

    }

    @isTest
    private static void testTestCase() {
        // Test data setup
        AnimalLocatorMock mock = new AnimalLocatorMock();
        mock.setBody('{"animal": {"id": 1,"name": "chicken","eats": "chicken food","says": "cluck cluck"}}');
        mock.setStatusCode(200);
        // mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
        Test.setMock(HttpCalloutMock.class, mock);
        // Actual test
        Test.startTest();

        String  name = AnimalLocator.getAnimalNameById(1);
        Test.stopTest();
    
        // Asserts
    }


    @isTest
    private static void testTestCase2() {
        // Test data setup
        AnimalsHttpCalloutMock mock = new AnimalsHttpCalloutMock();
        mock.setBody('{"animal": {"id": 1,"name": "chicken","eats": "chicken food","says": "cluck cluck"}}');
        mock.setStatusCode(201);
        // mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
        Test.setMock(HttpCalloutMock.class, mock);
        // Actual test
        Test.startTest();
        String  name = AnimalLocator.getAnimalNameById(1);
        Test.stopTest();
        // Asserts
    }
}