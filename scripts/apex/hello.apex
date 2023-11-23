// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents
Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.CanTheUser');
OBject obj = sessionPart.get('user');
// Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.CurrencyCache');
System.debug(obj);



Schema.DescribeFieldResult dfr = Schema.SObjectType.Account.fields.Name;


System.assert(dfr.getSObjectField() == Account.Name);




String s = '\'Hello Jason\'';
system.debug(s); // Outputs 'Hello Jason'
String escapedStr = String.escapeSingleQuotes(s);
// Outputs \'Hello Jason\'
system.debug(escapedStr); 
// Escapes the string \\\' to string \'
system.assertEquals('\\\'Hello Jason\\\'', escapedStr);


string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);