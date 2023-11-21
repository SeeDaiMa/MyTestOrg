public with sharing class BusScheduleCache {
    
    private Cache.OrgPartition part;

    public BusScheduleCache(){
        part  = Cache.Org.getPartition('local.BusSchedule');
    }


    public void putSchedule(String busLine, Time[] schedule){
        part.put(busLine, schedule);
    }

    public Time[] getSchedule(String busLine){
        Time[] schedule = (Time[])part.get(busLine);
        // Check the cache value that the get() call returned.
        if (schedule == null) {
            // Display this exchange rate 
            schedule = new List<Time>();
            Time t1 = Time.newInstance(8, 0, 0, 0);
            Time t2 = Time.newInstance(17, 0, 0, 0);
            schedule.add(t1);
            schedule.add(t2);
        } 
        return schedule;
    }
}