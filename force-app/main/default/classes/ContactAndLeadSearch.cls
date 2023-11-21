public class ContactAndLeadSearch {
    public static List<List<Sobject>> searchContactsAndLeads(String str){
        List<List<Sobject>> objects = [find :str in name fields returning Lead(name),contact(name)];
        return objects;
    }
}