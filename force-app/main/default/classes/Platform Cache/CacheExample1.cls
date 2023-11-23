public with sharing class CacheExample1 implements Cache.CacheBuilder {


    public Object doLoad(String key) {
        Account[] accounts = [SELECT Id, Name FROM Account WITH USER_MODE];
        return accounts;
    }

    
}