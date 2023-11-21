public class AccountHandler {

    public static Account insertNewAccount(String accountName){
        Account a= new Account(name = accountName); 
        try{
       		insert a;
        }catch(DmlException e){
            if(accountName == ''){
                return null;
            }
   
        }
                   return a;
    }
    
}