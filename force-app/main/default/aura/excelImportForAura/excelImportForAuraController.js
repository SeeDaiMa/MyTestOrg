({
    excelFileToJson: function(component, event, helper) {
        event.preventDefault();
        let files = event.getSource().get("v.files");
        let fileReader = new FileReader();
        let datas = []; // 存储获取到的数据
        let workbook;
        fileReader.onload = function(event) {
            try {
                let data = event.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                });
                for (let sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        datas = datas.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    }
                }
                console.log(JSON.stringify(datas));
            } catch (e) {
                console.log('解析失败' + e);
                return;
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }
})