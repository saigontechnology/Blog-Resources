function logLanguage() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    Logger.log(data[i][1]);
    Logger.log(data[i][2]);
  }
}

function localizeIOS(screens, keys, values) {
  var currentScreen = screens[0];
  var result = '';
  for (var i = 0; i < values.length; i++) {
    if (keys[i] != "") {
      if (screens[i] != "") {
        currentScreen = screens[i]
        result = result + '\r// Screen ' + currentScreen + '\r';
      }
      var value = values[i].toString().replace(/%s/g, "%@").replace(/"/g, "\\\"")
      result = result + '"' + keys[i] + '" = "' + value + '";\r';
    }
  }
  return result;
}

function localizeANDROID(screens, keys, values) {
  var currentScreen = screens[0];
  var result = '<resources>\r';
  for (var i = 0; i < values.length; i++) {
    if (keys[i] != "") {
      if (screens[i] != "") {
        currentScreen = screens[i]
        result = result + '\r    <!-- Screen ' + currentScreen + ' -->\r';
      }
      var value = values[i].toString().replace(/\'/g,"\\'");
      value = value.replace("&","&amp;");
      result = result + '    <string name="' + keys[i].toString().toLowerCase() + '">' + value + '</string>\r';
    }
  }
  result = result + '</resources>';
  return result;
}

function localizeFlutter(screens, keys, values) {
  var currentScreen = screens[0];
  var screenCount = 0;
  var result = '{\r';
  for (var i = 0; i < values.length; i++) {
    if (keys[i] != "") {
      if (screens[i] != "") {
        currentScreen = screens[i]
        screenCount += 1;
        result = result + '\r  "___SCREEN_NAME_'+screenCount+'___": "' + currentScreen + '",\r';
      }
      result = result + '  "'+keys[i].toString().toLowerCase()+'": "' + values[i] + '",\r';
    }
  }
  result = result.slice(0, -2);
  result = result + '\r}';
  return result;
}

function localizeREACT(screens, keys, values) {
  var currentScreen = screens[0];
  var result = '{\r';
  for (var i = 0; i < values.length; i++) {
    if (screens[i] != "") {
      currentScreen = screens[i]
      //result = result + '\r\r "screen_'+i+'": '+i+' ,\r\r';
      result = result + '\r\r';
    }
    if (keys[i] != "") {
      
      result = result + ' "'+keys[i].toString().toLowerCase()+'": "' + values[i] + '",\r';
    }
  }
  result = result + '}';
  return result;
}

function localizeBE(errorCodes, keys, english, chinese) {
  var result = '[\r';
  for (var i = 0; i < errorCodes.length; i++) {
    result += '//' + errorCodes[i] + '\r{\r"errorCode": ' + errorCodes[i] + ',\r"key": "' + keys[i] + '",\r"code": "en",\r"message": "' + english[i] + '"\r},\r{\r';
    result += '"errorCode": ' + errorCodes[i] + ',\r"key": "' + keys[i] + '",\r"code": "zh",\r"message": "' + chinese[i] + '"\r},\r';
  }
  result = result + ']';
  return result;
}