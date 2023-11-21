public class CustomIterable implements Iterable<Account> {
    public Iterator<Account> iterator(){
       List<Account> accounts =
       [SELECT Id, Name,
        NumberOfEmployees 
        FROM Account
        LIMIT 10];
       return new CustomIterator(accounts);
    }
 }