trigger AccountTrigger on Account (before insert,before update,after insert,after update) {

    if(Trigger.isBefore){
        System.debug(LoggingLevel.DEBUG,' 进入到AccountTrigger 的before trigger !');
    }
}