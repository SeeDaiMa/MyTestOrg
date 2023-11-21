public class AccountService {
    public Account createAccount(String accountName){
        Account newAcct = new Account(
        Name  = accountName
        );
        return newAcct;
    }
}