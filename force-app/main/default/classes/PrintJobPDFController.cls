public with sharing class PrintJobPDFController {
    
    public PrintJobPDFController() {

    }

    @AuraEnabled
    public static List<String> getPDFPrint(String recordId){
        try {
            List<String> pageStrings = new List<String>();
            Pagereference pdfPage = new Pagereference('/apex/generatePdf?Id'+recordId);
            Blob pdfBlob = pdfPage.getContent();
            String downloadURL = EncodingUtil.base64Encode(pdfBlob);

            pageStrings.add(downloadURL);
            pageStrings.add(pdfPage.getURL());
            // System.debug('getPDFPrint pageStrings :'+JSON.serialize(pdfPage));
            return pageStrings; 
        } catch (Exception e) {
            throw new AuraHandledException('getPDFPrint :'+e.getMessage());
        }
    }



    @AuraEnabled
    public static void savePDF(String recordId){//将数据存储到pdf保存到files中
        try{
            Case c =  [select Id,CaseNumber from Case where Id = :recordId limit 1];
            PageReference pdf = Page.generatePdf ;
            pdf.getParameters().put('caseId', recordId);
            ContentVersion cv = new ContentVersion();
            if (Test.IsRunningTest()){
                cv.VersionData=Blob.valueOf('UNIT.TEST');
            }else{
                cv.VersionData = pdf.getContent();
            }
            DateTime datetime1 = DateTime.now();
            String datetimeStr = datetime1.format();
            cv.Title =c.CaseNumber+'_'+datetimeStr+ '.PDF';
                  //cv.Title += cv.Title;
            cv.PathOnClient =c.CaseNumber+'_'+datetimeStr+ '.PDF';

            insert cv;

            ContentVersion  contentVersion = [SELECT Id
                                                , ContentDocumentId
                                                FROM ContentVersion
                                                WHERE Id = : cv.Id];

            String documentId = contentVersion.ContentDocumentId;
                
            ContentDocumentLink contentDocumentLink = new ContentDocumentLink();
            contentDocumentLink.ContentDocumentId = documentId;
            contentDocumentLink.LinkedEntityId = recordId;
                
            insert contentDocumentLink;
        }catch(Exception e){
            System.debug(LoggingLevel.INFO, '*** e: ' + e.getMessage());
        }
        
    }




    @AuraEnabled
    public static void sharePdf(String recordId) {
        try {
            Case c =  [select Id,ContactEmail from Case where Id = :recordId limit 1];
            PageReference pdf = Page.generatePdf ;
            pdf.getParameters().put('caseId', recordId);
            if (c != null && c.ContactEmail != null) {

                Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
                attachment.setFileName('attachment.pdf');
                attachment.setBody(pdf.getContent());

                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setToAddresses(new List<String> { c.ContactEmail });
                email.setSubject('PDF Attachment');
                email.setPlainTextBody('Please find attached the PDF document.');
                email.setFileAttachments(new Messaging.EmailFileAttachment[] { attachment });

                Messaging.SendEmailResult[] sendResults = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
                for (Messaging.SendEmailResult result : sendResults) {
                    if (!result.isSuccess()) {
                        for (Messaging.SendEmailError error : result.getErrors()) {
                            System.debug('Failed to send email: ' + error.getMessage());
                        }
                    }
                }
            } else {
                System.debug('Invalid account or email address not found.');
            }
        } catch (Exception e) {
            System.debug('An error occurred: ' + e.getMessage());
        }
    }

}