public class ContactSearch {
    public static List<Contact> searchForContacts(String s1,String s2){
       List<Contact> contacts = [select id,name from contact where LastName = :s1 and MailingPostalCode = :s2];
     	return contacts;
    }
}