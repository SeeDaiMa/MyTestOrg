public with sharing class ContactController {
    public ContactController() {


    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> contacts = [SELECT FirstName,
                       LastName,
                       Email
                FROM Contact];
        throw new AuraHandledException('Forced error');
        // return contacts;
        
    }
}