public with sharing class FileUploadUsingInputController {
    @AuraEnabled
    public static String saveFile(Id recordId, String fileName, String base64Data) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        Blob contentBlob = EncodingUtil.base64Decode(base64Data);
        String content = bitToString(contentBlob, 'UTF-8');
        content = content.replaceAll('\r\n', '\n');
        content = content.replaceAll('\r', '\n');
        String[] fileLines = content.split('\n');
        System.debug('*** ' + JSON.serialize(fileLines));
        for(Integer i = 1; i < fileLines.size(); i++) {
            //TODO 遍历操作
            system.debug('execute');
        }

        // inserting file
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = '/' + fileName;
        cv.FirstPublishLocationId = recordId;
        cv.VersionData = EncodingUtil.base64Decode(base64Data);
        cv.IsMajorVersion = true;
        Insert cv;
        return 'successfully';
    }

    public static String bitToString(Blob input, String inCharset){
        //转换成16进制
        String hex = EncodingUtil.convertToHex(input);
        //一个String类型两个字节 32位（bit）,则一个String长度应该为两个16进制的长度，所以此处向右平移一个单位，即除以2
        //向右平移一个单位在正数情况下等同于除以2，负数情况下不等
        //eg 9  00001001  >>1 00000100   结果为4
        final Integer bytesCount = hex.length() >> 1;
        //声明String数组，长度为16进制转换成字符串的长度
        String[] bytes = new String[bytesCount];
        for(Integer i = 0; i < bytesCount; ++i) {
            //将相邻两位的16进制字符串放在一个String中
            bytes[i] =  hex.mid(i << 1, 2);
        }
        //解码成指定charset的字符串
        return EncodingUtil.urlDecode('%' + String.join(bytes, '%'), inCharset);
    }
}