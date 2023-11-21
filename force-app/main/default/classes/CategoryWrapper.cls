public class CategoryWrapper {
    public Boolean checked{ get; set; }
    public GOODS__c goods { get; set;}

    public CategoryWrapper(){
        goods = new GOODS__c();
        checked = false;
    }

    public CategoryWrapper(GOODS__c goods){
        this.goods = goods;
        checked = false;
    }
}