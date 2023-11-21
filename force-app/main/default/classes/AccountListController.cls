public without sharing class AccountListController {
    public static final Integer DEFAULT_PAGE_SIZE = 100;
    @AuraEnabled(cacheable=false)
    public static List<Account> fetchAccountList(String serializedAccount){

        Account account = (Account)JSON.deserialize(serializedAccount,Account.class);
        String fetchAccountSQL = 'SELECT Id,Name,Industry,AccountSource,Owner.Name FROM Account WHERE IsDeleted = false ';

        if(String.isNotBlank(account.name)) {
            fetchAccountSQL += 'AND Name like' +  '\'%' + account.name + '%\'';
        }

        if(String.isNotBlank(account.industry)) {
            fetchAccountSQL += ' AND industry = \'' + account.industry + '\'';
        }

        if(String.isNotBlank(account.AccountSource)) {
            fetchAccountSQL += ' AND AccountSource = \'' + account.AccountSource + '\'';
        }

        Integer accountSize = DEFAULT_PAGE_SIZE;


        fetchAccountSQL += ' LIMIT ' + accountSize;
        List<Account> accountList = Database.query(fetchAccountSQL);
        return accountList;
    }
}