/**
 * @description       : 
 * @author            : shihuang.zhou
 * @group             : 
 * @last modified on  : 04-06-2023
 * @last modified by  : shihuang.zhou
**/
public with sharing class GoodsController {
    public GoodsController() {

    }

    @AuraEnabled()
    public static List<Goods__c> getGoods(){
        return [select id,GoodsName__c,GoodsBrands__c from Goods__c ];
    }
}