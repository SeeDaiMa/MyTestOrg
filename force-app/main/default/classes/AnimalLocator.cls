public with sharing class AnimalLocator {

    public static String getAnimalNameById(Integer id){

        String site = 'https://th-apex-http-callout.herokuapp.com/animals/'+id;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(site);
        request.setMethod('GET');
        HttpResponse respose = http.send(request);
        if(respose.getStatusCode() == 200){
            Map<String,Object> results = ( Map<String,Object>) JSON.deserializeUntyped(respose.getBody());
            System.debug('animal####'+results);
            Map<String,Object> animal = (Map<String,Object>)results.get('animal');
            return (String)animal.get('name');
        }
        return 'error';
    }


   



}