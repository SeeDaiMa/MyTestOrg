public with sharing class AddPrimaryContact implements Queueable{
    
    public Contact contact;

    public String state;

    public AddPrimaryContact(Contact contact,String state){
        this.contact = contact;
        this.state = state;
    }

    public void execute(QueueableContext context) {
        List<Account> accs =[SELECT id,
                                    (SELECT id
                                    FROM Contacts)
                            FROM Account
                            WHERE billingState = :state
                            LIMIT 200];
        
        List<Contact> contacts = new List<Contact>();
        for (Account acc : accs) {
            Contact cont = contact.clone(false, false, false, false);
            cont.AccountId =  acc.id;
            contacts.add( cont );
        }

        if(contacts.size() >0 )
        {
             INSERT contacts;
        }
        // System.enqueueJob(new SecondJob());
    }
}