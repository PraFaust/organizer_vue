// function checkLang() {
// 	var language = window.navigator ? (window.navigator.language ||
// 					window.navigator.systemLanguage ||
// 					window.navigator.userLanguage) : "ru";
// 	language = language.substr(0, 2).toLowerCase();
// 	console.log(`language is ${language}`);

// 	var objSel = document.getElementById('language-picker-select').options;
// 	for(id in objSel){
// 		if(objSel[id].value === language){
// 			console.log(`We are select on start language ${objSel[id].value}`);
// 			objSel[id].selected = true;
// 		}
// 	}
// 	return language;
// }

// function chooseLang(){
// 	var objSel = document.getElementById("language-picker-select").selectedIndex;
// 	var options=document.getElementById('language-picker-select').options;
// 	console.log(`Выбрана опция ${options[objSel].text}, ${options[objSel].value}`);
// 	if(siteLang != options[objSel].value){
// 		siteLang = options[objSel].value;
// 		pageTranslate();
// 	}
// }

// function pageTranslate(){
// 	$.getJSON( "../translate.json", function( data ) {
// 		var textPwd, textName, textOpenNet, textSafetyNet, indexLang;

// 		if(siteLang == "ru"){indexLang = 0;}
// 		else if(siteLang == "en"){indexLang = 1;}
// 		else if(siteLang == "zh"){indexLang = 2;}
// 		textPwd = data['text'][0]['txt_password'][indexLang][siteLang];
// 		textName = data['text'][0]['txt_network_name'][indexLang][siteLang];
// 		textOpenNet = data['text'][0]['txt_open_network'][indexLang][siteLang];
// 		textSafetyNet = data['text'][0]['txt_wpa2_network'][indexLang][siteLang];

// 		var jsonObj, jsonObj2, jsonObj3, jsonObj4;
// 		jsonObj = data['text'];
// 		for(var field in jsonObj){
// 			jsonObj2 = jsonObj[field];
// 			for (var key in jsonObj2) {
// 			  //console.log(`jObj key: ${key}, value: ${jsonObj2[key]}`);
// 			  jsonObj3 = jsonObj2[key];
// 			  console.dir(jsonObj3);
// 			  for(var id in jsonObj3){
// 				jsonObj4 = jsonObj3[id];
// 				for(var lang in jsonObj4){
// 					if(lang === siteLang){
// 						console.log(`string ${lang}: ${jsonObj4[lang]}`);
// 						var divs_container = document.getElementsByClassName(key);
// 						for(id in divs_container){
// 							divs_container[id].textContent = jsonObj4[lang];
// 						}
// 					}
// 				}
// 			  }
// 			}
// 		}
// 		$('.manual_pwd').attr('placeholder',textPwd);
// 		$('.manual_ssid').attr('placeholder',textName);
// 		var x=document.getElementById("manual_security")
// 		x.options[0].text=textOpenNet;
// 		x.options[1].text=textSafetyNet;
// 	});
// }

//import $ from 'jquery'

// TODO - так лучше
// var txtJSON = new Object();

// $.getJSON( "../../src/translate.json", function( data ) {
//     txtJSON = data;
// });

const translate_txt = require('../utils/translate_obj.js');

function translate_get_string(json_name, lang){
    $.getJSON( "../../src/translate.json", function( data ) {
        var indexLang;

        if(lang == "ru"){indexLang = 0;}
        else if(lang == "en"){indexLang = 1;}

        return data['text'][0][json_name][indexLang][lang];
    });
}


function translate_get_string_js(json_name, lang){

    var indexLang;
    var data = translate_txt.lang_obj;
    if(lang == "ru"){indexLang = 0;}
    else if(lang == "en"){indexLang = 1;}

    return data['text'][0][json_name][indexLang][lang];

}

export {translate_get_string, translate_get_string_js}
