@RestResource(urlMapping='/Accounts/*')
global with sharing class AccountManager {

    @HttpGet
    global static Account getAccount(){
        RestRequest request = RestContext.request;
        List<String> lst = request.requestURI.split('/');                
        System.debug('lst##'+lst);
        String strAccId = lst[lst.size() - 2];
        // ResponseWrapper objResp = new ResponseWrapper();
        Account a =  [SELECT id,
                            name,
                            (SELECT id,
                                    Name
                            FROM Contacts)
                        FROM Account
                        WHERE Id=:strAccId
                        LIMIT 1];
        return a;
    }
}