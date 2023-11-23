/**
 * @description       : 
 * @author            : Shihuang.Zhou
 * @group             : 
 * @last modified on  : 07-19-2023
 * @last modified by  : Shihuang.Zhou
**/
public with sharing class Util {
    

    
    
    /**
    * @description 测试类中可以使用此方法，拿到当前的简档的用户，以当前用户去运行代码。
    * @author Shihuang.Zhou | 07-18-2023 
    * @param profileName 简档的名字
    * @return User 用户
    **/
    public static User getUser(ACTIVE_PROFILE_NAME profileName) {
        Profile p = [SELECT Id FROM Profile WHERE Name = : getUserProfileNames.get(profileName) limit 1];
        String testemail = 'atest@test.demo';
        User pu = new User(profileId = p.Id, username = testemail, email = testemail,
                            emailencodingkey = 'UTF-8', localesidkey = 'en_US', 
                            languagelocalekey = 'en_US', timezonesidkey = 'America/Los_Angeles', 
                            alias='cspu', lastname='lastname');
        return pu;
    }

   
    /**
    * @description  获取对象的picklist的列表信息
    * @author Shihuang.Zhou | 07-17-2023 
    * @param objectName 对象的api Name
    * @param fieldName field 的Api名
    * @return List<PicklistValue> 
    **/
    public static List<PicklistValue> getPicklistValues(
        String objectName,
        String fieldName
    ) {
        List<Schema.PicklistEntry> entries = new List<Schema.PicklistEntry>();
        Schema.DescribeSobjectResult objDescription = Schema.describeSObjects(
            new List<String>{ objectName }
        )[0];
        Schema.SObjectField field = objDescription.fields.getMap()
            .get(fieldName);

        entries = field.getDescribe().getPickListValues();
        entries = getActivePicklistEntries(entries);

        List<PicklistValue> picklistValues = new List<PicklistValue>();

        for (Schema.PicklistEntry pvalue : entries) {
            picklistValues.add(
                new PicklistValue(pvalue.getLabel(), pvalue.getValue())
            );
        }

        return picklistValues;
    }


    /**
    * @description 
    * @author Shihuang.Zhou | 07-19-2023 
    * @param objectName 
    * @param fieldName 
    * @return List<SelectOption> SelectOption getValue() getLabel()
    **/
    public static List<SelectOption> getPicklistValuesBySelectOption(
        String objectName,
        String fieldName
    ) {
        List<Schema.PicklistEntry> entries = new List<Schema.PicklistEntry>();
        Schema.DescribeSobjectResult objDescription = Schema.describeSObjects(
            new List<String>{ objectName }
        )[0];
        Schema.SObjectField field = objDescription.fields.getMap()
            .get(fieldName);

        entries = field.getDescribe().getPickListValues();
        return getActivePicklistEntriesBySelectOption(entries);
    } 

	//锁定记录
	/**
	 * @method      lockRecordBaseonId
	 * @Author      ke
	 * @DateTime    2020-09-23
	 * @description [加锁记录]
	 * @param       record             [加锁记录Id]
	 * @return      [是否加锁成功]
	 */
	public static Boolean lockRecordBaseonId(Id record) {
		if (!Approval.isLocked(record)) {
			Approval.LockResult result = Approval.lock(record);
			if (result.isSuccess()) {
				return true;
			}
		}
		return false;
	}


	//解锁记录
	/**
	 * @method      unlockRecordBaseonId
	 * @Author      wangxinke
	 * @DateTime    2020-09-23
	 * @description [解锁记录]
	 * @param       record               [解锁记录Id]
	 * @return      [是否解锁成功]
	 */
	public static Boolean unlockRecordBaseonId(Id record) {
		if (Approval.isLocked(record)) {
			Approval.UnlockResult result = Approval.unlock(record);
			if (result.isSuccess()) {
				return true;
			}
		}
		return false;
	}


    public class PicklistValue {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;

        public PicklistValue(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    public static List<Schema.PicklistEntry> getActivePicklistEntries(
        List<Schema.PicklistEntry> entries
    ) {
        List<Schema.PicklistEntry> activeEntries = new List<Schema.PicklistEntry>();
        for (Schema.PicklistEntry entry : entries) {
            if (entry.isActive()) {
                activeEntries.add(entry);
            }
        }
        return activeEntries;
    }

    public static List<SelectOption> getActivePicklistEntriesBySelectOption(
        List<Schema.PicklistEntry> entries
    ) {
        List<SelectOption> activeEntries = new List<SelectOption>();
        for (Schema.PicklistEntry entry : entries) {
            if (entry.isActive()) {
                activeEntries.add(new SelectOption(entry.value,entry.label,true));
            }
        }
        return activeEntries;
    }
    // 在下面获取User可用的简档的名字
    public enum ACTIVE_PROFILE_NAME {
        SYSTEM_ADMINISTRATOR,
        STANDARD_USER
    }

    private static Map<ACTIVE_PROFILE_NAME,String> getUserProfileNames = new Map<ACTIVE_PROFILE_NAME,String>{
        ACTIVE_PROFILE_NAME.SYSTEM_ADMINISTRATOR => 'System Administrator',
        ACTIVE_PROFILE_NAME.STANDARD_USER => 'Standard User'
    };

    

}