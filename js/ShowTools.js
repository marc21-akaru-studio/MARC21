function toolDisplay(strTemp) {
	if (strTemp !== 'toolCloseboth' && strTemp !== 'toolCloseStack' && strTemp !== 'toolCloseCutter') {
		var isitDisplay = document.getElementById(strTemp).style.display;
		document.getElementById(strTemp).style.display = isitDisplay === 'none' ? '' : 'none';
		if (strTemp !== 'toolMadeISO') {
			isitDisplay = document.getElementById(strTemp).style.display;
			//顯示匯入來源 : toolMARCFrom
			document.getElementById('toolMARCFrom').style.display = strTemp === 'toolMARCFrom' ? isitDisplay : 'none';
			//顯示字母表 : toolEuroWord
			document.getElementById('toolEuroWord').style.display = strTemp === 'toolEuroWord' ? isitDisplay : 'none';
			//顯示匯率換算 : toolMoney
			document.getElementById('toolMoney').style.display = strTemp === 'toolMoney' ? isitDisplay : 'none';
			//顯示書目檔案處理 : toolSaveMARC
			document.getElementById('toolSaveMARC').style.display = strTemp === 'toolSaveMARC' ? isitDisplay : 'none';
			//顯示可更換主題 : toolThemeColor
			document.getElementById('toolThemeColor').style.display = strTemp === 'toolThemeColor' ? isitDisplay : 'none';
			//詢問是否清除 : toolToolMARCClear
			document.getElementById('toolToolMARCClear').style.display = strTemp === 'toolToolMARCClear' ? isitDisplay : 'none';
			//顯示ISBN換算
			document.getElementById('toolISBN').style.display = strTemp === 'toolISBN' ? isitDisplay : 'none';
			if (strTemp === 'toolISBN') {
				if (box020a.value.length === 10) {
					ISBN10.value = box020a.value;
					ISBN13.value = '';
				}
			}
			//顯示書目檔編輯視窗
			if (strTemp === 'toolMadeISO') localStorage.setItem('Book594a', box594a.value.trim()); //批次號
			document.getElementById('toolMadeISO').style.display = strTemp === 'toolMadeISO' ? isitDisplay : 'none';
			//顯示館藏 : toolAddStack
			document.getElementById('toolAddStack').style.display = strTemp === 'toolAddStack' ? isitDisplay : 'none';
		}
	}
	//關閉書目檔視窗
	if (strTemp === 'toolCloseboth') {
		document.getElementById('toolMadeISO').style.display = 'none';
		document.getElementById('toolSaveMARC').style.display = 'none';
	}
	//關閉館藏視窗
	if (strTemp === 'toolCloseStack') {
		document.getElementById('toolAddStack').style.display = 'none';
	}
	//關閉克特號視窗
	if (strTemp === 'toolCloseCutter') {
		document.getElementById('toolCutterTable').style.display = 'none';
	}
}

//切換主題
function switchTo(strThemeTemp) {
	setTheme(strThemeTemp);
	document.getElementById('toolThemeColor').style.display='none';
	localStorage.setItem('theme', strThemeTemp);
}

//變更字體大小
function switchFontSize(strTemp) {
	const root = document.documentElement;
	var strOldSize = root.style.getPropertyValue('--fontbigsize');
	var intFontBigSize = 1.2;
	var intFontSize = 1.0;
	intFontBigSize = strOldSize === '' ? intFontBigSize : Number(strOldSize.replace('em',''))
	if (strTemp === 'Big') {
		intFontBigSize = intFontBigSize + 0.2
		root.style.setProperty('--fontbigsize', intFontBigSize + 'em');
		root.style.setProperty('--fontsize', intFontSize + 'em');
	} else if (strTemp === 'Small') {
		intFontBigSize = intFontBigSize - 0.2
		root.style.setProperty('--fontbigsize', intFontBigSize + 'em');
		root.style.setProperty('--fontsize', intFontSize + 'em');
	}
}

//切換書目資料來源
function toolRead() {
	var strBibFrom = document.querySelector('#selMARCFrom').value;
	toolGetBib(strBibFrom);
}

//抓取書目資枓
function toolGetBib(strTemp) {
	if (peastBib.value !== '') {
		var strBibtext = peastBib.value;
		strBibtext = HarfSing(strBibtext, 0);
		box020q.value = '';
		box250a.value = '';
		if (strTemp === 'Z39CMARC') {
			//自Z39.50資料庫 C-MARC格式
			strBibtext = strBibtext.replace(/ /g,' ');
			strBibtext = strBibtext.replace(/\s\t/g,'\t');
			strBibtext = strBibtext.replace(/\s\t/g,'\t');
			strBibtext = strBibtext.replace(/ \t/g,'\n');
			strBibtext = strBibtext.replace(/\t/g,'');
			strBibtext = strBibtext.replace(/NT\$/g,'');
			strBibtext = strBibtext.replace(/HK\$/g,'');
			strBibtext = strBibtext.replace(/USD\$/g,'');
			fillCMARC(strBibtext,2,'100a');
		}
		if (strTemp === 'Z39MARC21') {
			//自Z39.50資料庫 MARC21格式
			strBibtext = strBibtext.replace(/ /g,' ');
			strBibtext = strBibtext.replace(/\s\t/g,'\t');
			strBibtext = strBibtext.replace(/\s\t/g,'\t');
			strBibtext = strBibtext.replace(/ \t/g,'\n');
			strBibtext = strBibtext.replace(/\t/g,'');
			strBibtext = strBibtext.replace(/NT\$/g,'');
			strBibtext = strBibtext.replace(/HK\$/g,'');
			strBibtext = strBibtext.replace(/USD\$/g,'');
			fillMARC21(strBibtext,2,'260c');
		}
		if (strTemp === 'NBICMARC') {
			//自NBInet C-MARC格式
			strBibtext = strBibtext.replace(/\n\s\s\s\s\s\s\s/g,'');
			var aryBibtext = strBibtext.split('\n');
			var strNewBib = '';
			var kmax = aryBibtext.length;
			for (k=0;k<kmax;k++) {
				var intFind = aryBibtext[k].indexOf('|',0);
				if (intFind > 6 || intFind === 0-1) {
					var strTemp1 = aryBibtext[k].substr(0,7);
					var strTemp2 = aryBibtext[k].slice(7);
					aryBibtext[k] = strTemp1 + '|a' + strTemp2;
				}
				if (strNewBib !== '') strNewBib = strNewBib + '\n';
				strNewBib = strNewBib + aryBibtext[k];
			}
			strBibtext = strNewBib.replace(/\|/g,'\$');
			fillCMARC(strBibtext,1,'210d',);
		}
		if (strTemp === 'NBIMARC21') {
			//自NBInet MARC21格式
			strBibtext = strBibtext.replace(/\n\s\s\s\s\s\s\s/g,'');
			var aryBibtext = strBibtext.split('\n');
			var strNewBib = '';
			var kmax = aryBibtext.length;
			for (k=0;k<kmax;k++) {
				var intFind = aryBibtext[k].indexOf('|',0);
				if (intFind > 6 || intFind === 0-1) {
					var strTemp1 = aryBibtext[k].substr(0,7);
					var strTemp2 = aryBibtext[k].slice(7);
					aryBibtext[k] = strTemp1 + '|a' + strTemp2;
				}
				if (strNewBib !== '') strNewBib = strNewBib + '\n';
				strNewBib = strNewBib + aryBibtext[k];
			}
			strBibtext = strNewBib.replace(/\|/g,'\$');
			strBibtext = strBibtext.trim();
			fillMARC21(strBibtext,1,'260c');
		}
		if (strTemp === 'CIP') {
			//自CIP C-MARC格式
			if (strBibtext.substr(0,7) === '000    ') {
				strBibtext = strBibtext.replace(/NT\$/g,'');
				strBibtext = strBibtext.replace(/HK\$/g,'');
				strBibtext = strBibtext.replace(/USD\$/g,'');
				strBibtext = strBibtext.replace(/¥/g,'');
				fillCMARC(strBibtext,1,'210d');
			}
		}
		if (strTemp === '103-B') {
			//103-B
			gotfromWeb(strBibtext,'Books');
		}
		if (strTemp === '104-S') {
			//104-S
			gotfromWeb(strBibtext,'Sanmin');
		}
		if (strTemp === 'Toys') {
			//玩具書目(自Google表單)
			var aryTemp = [];
			aryTemp.push(['時間戳記','']);
			aryTemp.push(['分館名稱','toy594a']);
			aryTemp.push(['製造地區(008/15-17)','toy00815']);
			aryTemp.push(['適用對象(008/22)','toy00822']);
			aryTemp.push(['適用對象註(521,a)','toy521a']);
			aryTemp.push(['政府出版品(008/28)','toy00828']);
			aryTemp.push(['實體語文(008/35)','toy00835']);
			aryTemp.push(['雙語對照','toyisMuti']);
			aryTemp.push(['雙語對照語文','toyMutiLang']);
			aryTemp.push(['翻譯作品(041,h)','041h']);
			aryTemp.push(['ISBN(020,a)','020a']);
			aryTemp.push(['UPC(024,a)','024a']);
			aryTemp.push(['經濟部商品檢驗碼','024a']);
			aryTemp.push(['ST安全玩具代碼','024a']);
			aryTemp.push(['裝訂方式(020,a)','020q']);
			aryTemp.push(['定價(020,c)','020c']);
			aryTemp.push(['遊戲分類(090,a、245,h)','toy090a']);
			aryTemp.push(['認證類別(246,a)','toy246a']);
			aryTemp.push(['遊戲名稱(245,a)','toy245a']);
			aryTemp.push(['副題名(245,b)','245b']);
			aryTemp.push(['編次(245,n)','245n']);
			aryTemp.push(['編次名稱(245,p)','245p']);
			aryTemp.push(['生產公司(260,b)','260b']);
			aryTemp.push(['經銷、代理公司 (260,b)','260b']);
			aryTemp.push(['經銷公司所在地 (260,a)','260a']);
			aryTemp.push(['出廠日期(260,c)','260c']);
			aryTemp.push(['附件(500, a)','toy500a']);
			aryTemp.push(['遊戲說明(520, a)','520a']);
			aryTemp.push(['得獎註(586,a)','586a']);
			aryTemp.push(['照片檔名','']);
			aryTemp.push(['遊戲時間(008/19-21)','toy00819']);
			var aryTemp2 = strBibtext.split('\t');
			if (aryTemp.length === aryTemp2.length) {
				var imax = aryTemp.length;
				for (j=0;j<imax;j++) {
					if (aryTemp2[j] !== '') toolFill(aryTemp[j][1],aryTemp2[j],'Toy',false);
				}
			}
			box084b.value = '　　';
			if (box260c.value === '') box260c.value = '202u';
			view008();
		}
		if (strTemp === 'humanlibrary') {
			//真人圖書書目(自真人圖書官網)
			var aryTemp = [];
			aryTemp.push(['館藏類別','490a']);
			aryTemp.push(['空行','']);
			aryTemp.push(['頭銜','245b']);
			aryTemp.push(['空行','']);
			aryTemp.push(['姓名','245a']);
			aryTemp.push(['空行','']);
			aryTemp.push(['簡介','520a']);
			
			var aryTemp2 = strBibtext.split('\n');
			if (aryTemp.length === aryTemp2.length) {
				aryTemp2[0] = '新北市立圖書館真人圖書館. \|p' + aryTemp2[0].replace(/館藏類別\-/g,'');
				aryTemp2[4] = '真人圖書' + aryTemp2[4].replace(/先生/g,'').replace(/小姐/g,'').trim();
				document.getElementById('box856u').disabled = true;
				box856u.value = 'https:\/\/docs.google.com\/forms\/d\/e\/1FAIpQLSeUDhwqayYiEh3NY4D-1WeGRZ1GlzoCf8R2SesRShWg2qvHcw/viewform'; //預約表單
				document.querySelector('#cbx336').value = 'xxx';
				document.querySelector('#cbx337').value = 'n';
				document.querySelector('#cbx338').value = 'nz';
				box008t01b.value = 45;
				document.querySelector('#box008t05').value = 'e';
				document.querySelector('#box008t16').value = 'z';
				document.querySelector('#cbx653a').value = 'Book';
				let strToday = new Date();
				let strYear = strToday.getFullYear().toString();
				box260c.value = strYear;
				let imax = aryTemp.length;
				for (j=0;j<imax;j++) {
					if (aryTemp2[j] !== '') toolFill(aryTemp[j][1],aryTemp2[j],'humanlibrary',false);
				}
			}
			view008();
		}
		if (strTemp === 'bot') {
			//MARC21書目(自bot)
			strBibtext = strBibtext.replace(/\n\s\s\s\s\s\s\s/g,'');
			var aryBibtext = strBibtext.split('\n');
			var strNewBib = '';
			var kmax = aryBibtext.length;
			for (k=0;k<kmax;k++) {
				var intFind = aryBibtext[k].indexOf('|',0);
				if (intFind > 6 || intFind === 0-1) {
					var strTemp1 = aryBibtext[k].substr(0,7);
					var strTemp2 = aryBibtext[k].slice(7);
					aryBibtext[k] = strTemp1 + '|a' + strTemp2;
				}
				if (strNewBib !== '') strNewBib = strNewBib + '\n';
				strNewBib = strNewBib + aryBibtext[k];
			}
			strBibtext = strNewBib.replace(/\|/g,'\$');
			strBibtext = strBibtext.trim();
			fillMARC21(strBibtext,2,'260c');
		}
		if (strTemp === 'catalog') {
			//MARC21書目(自catalog)
			box260a.value = '';
			bib008a35.value = 'eng 英文';
			document.querySelector('#sel008a35').value = 'eng';
			strBibtext = strBibtext.replace(/\n\s\s\s\s/g,'\n');
			var aryBibtext = strBibtext.split('\n');
			var strNewBib = '';
			var kmax = aryBibtext.length;
			for (k=0;k<kmax;k++) {
				var intFind = aryBibtext[k].indexOf('|',0);
				if (intFind > 6 || intFind === 0-1) {
					var strTemp1 = aryBibtext[k].substr(0,7);
					var strTemp2 = aryBibtext[k].slice(7);
					aryBibtext[k] = strTemp1 + '|a' + strTemp2;
				}
				if (strNewBib !== '') strNewBib = strNewBib + '\n';
				strNewBib = strNewBib + aryBibtext[k];
			}
			strBibtext = strNewBib.replace(/\|/g,'\$');
			strBibtext = strBibtext.trim();
			fillMARC21(strBibtext,2,'260c');
		}
		peastBib.value = '';
		document.getElementById('toolMARCFrom').style.display='none';
		if (box084b.value === '' && strTemp !== 'humanlibrary') ButtFiveCode();
		//更新localStorage
		localStorage.setItem('Book020c', box020c.value.trim());
		localStorage.setItem('Book084a', box084a.value.trim());
		localStorage.setItem('Book084b', box084b.value.trim());
		localStorage.setItem('Book594a', box594a.value.trim());
		if (box300e.value !== '') localStorage.setItem('HadCD', 'Yes');
		if (box300e.value === '') localStorage.setItem('HadCD', 'No');
		check504();
		toolPublish('260b');
		sel041hChange();
		//更新作者職責
		switchRDArd('cbx100a');
		switchRDArd('cbx700D');
		switchRDArd('cbx700T');
		switchRDArd('cbxAV700');
		//判斷是否顯示245n、245p
		if (box245n.value + box245p.value !== '') {
			if (document.getElementById('btn245Down').innerHTML === '編次▼') {
				showGroupDown('Group245np','btn245Down');
			}
		}
	}
}

function fillCMARC(strBibtext,intCutOf,strDate) {
	var strEachLine = strBibtext.split('\n');
	var jmax = strEachLine.length;
	for (j=0; j<jmax; j++) {
		var strGetData = '010|011|200|205|210|215|225|300|320|333|454|606|607|681|710|711|712|';
		if (strDate === '100a') strGetData = strGetData + '100|'; //出版日期來自100$a
		var strHead = strEachLine[j].substr(0,3);
		var intFind = strGetData.indexOf(strHead + '|',0);
		if (intFind !== -1) {
			if (strHead === '010') {
				if (box020a.value + box020c.value !== '') {tool020Add('fillCMARC');}
			}
			if (strHead === '225') {
				if (box490a.value + box490v.value !== '') {toolAdd490s();}
			}
			var aryThisLine = strEachLine[j].split('$');
			var kmax = aryThisLine.length;
			for (k=1;k<kmax;k++) {
				var strF = aryThisLine[k].substr(0,1);
				var strData = aryThisLine[k].slice(intCutOf);
				if (strHead + strF === '100a' && strData.substr(9,4) === 'y ch') strDate = '210d';
				if (strHead + strF !== '200f') {
					if (!(strHead + strF === '100a' && strDate === '210d')) toolFill(strHead+strF,strData,strDate,true);
					}
				if (strHead + strF === '200f') {
					if (strData.indexOf(';',0) === 0-1) {
						toolFill(strHead+strF,strData,strDate,true);
					}
					if (strData.indexOf(';',0) !== 0-1) {
						var ary200f = strData.split(';');
						var lmax = ary200f.length;
						for (l=0;l<lmax;l++) {
							if (l > 0) strF = 'g';
							toolFill(strHead+strF,ary200f[l],strDate,true)
						}
					}
				}
			}
		}
		if (strHead === '010') {
			if (box020a.value + box020c.value !== '') {
				if (box020ALL.value !== '') tool020Add('fillCMARC');}
		}
		if (strHead === '225') {
			if (box490a.value + box490v.value !== '') {
				if (box490s.value !== '') toolAdd490s();}
		}
	}
	if (box240a.value !== '') {
		if (box500a.value.indexOf('譯自',0) === -1) {
			if (box500a.value !== '') box500a.value = box500a.value + '\n';
			box500a.value = box500a.value + '譯自 : ' + box240a.value;
		}
	}
}

function fillMARC21(strBibtext,intCutOf,strDate) {
	var strEachLine = strBibtext.split('\n');
	var jmax = strEachLine.length;
	var strGroup = '';
	for (j=0; j<jmax; j++) {
		var strGetData = '017|020|022|024|035|037|041|082|084|090|110|240|245|246|250|260|264|300|490|500|504|505|511|520|521|538|546|586|600|610|650|651|653|710|830|';
		var strHead = strEachLine[j].substr(0,3);
		var intFind = strGetData.indexOf(strHead + '|',0);
		if (intFind !== -1) {
			if (strHead === '020') {
				if (box020a.value + box020c.value !== '') {tool020Add('fillMARC21');}
			}
			if (strHead === '490') {
				if (box490a.value + box490v.value !== '') {toolAdd490s();}
			}
			if (strHead === '600') {
				strEachLine[j] = strEachLine[j].replace(/  \$c /g,'');
				strEachLine[j] = strEachLine[j].replace(/  \$d /g,'');
			}
			if (strHead === '610') {
				strEachLine[j] = strEachLine[j].replace(/  \$c /g,'');
			}
			var aryThisLine = strEachLine[j].split('$');
			var kmax = aryThisLine.length;
			for (k=1;k<kmax;k++) {
				var strF = aryThisLine[k].substr(0,1);
				var strData = aryThisLine[k].slice(intCutOf);
				if (strHead + strF !== '245c') {
					if (strHead === '110') strGroup = strData;
					toolFill(strHead+strF,strData,strDate,false);
				}
				if (strHead + strF === '245c') {
					if (strData.indexOf(';',0) === 0-1) {
						strHead = '100';
						strF = 'a';
						toolFill(strHead+strF,strData,strDate,false);
					}
					if (strData.indexOf(';',0) !== 0-1) {
					var ary100a = strData.split(';');
						var lmax = ary100a.length;
						for (l=0;l<lmax;l++) {
							if (l > 0) {
								strHead = '700';
								strF = 'd';
							} else if (l === 0) {
								strHead = '100';
								strF = 'a';
							}
							toolFill(strHead+strF,ary100a[l],strDate,false);
							}
					}
				}
			}
		}
		if (strHead === '020') {
			if (box020a.value + box020c.value !== '') {
				if (box020ALL.value !== '') tool020Add('fillMARC21');}
		}
		if (strHead === '490') {
			if (box490a.value + box490v.value !== '') {
				if (box490s.value !== '') toolAdd490s();}
		}
	}
	// if (box240a.value !== '') {
		// var str240a = '譯自 : ' + box240a.value;
		// if (box500a.value !== '') box500a.value = box500a.value + '\n';
		// box500a.value = box500a.value + str240a;
	// }
	if (strGroup !== '') toolFill('Group',strGroup,strDate,false);
}

function HarfSing(strTemp1, strTemp2) {
	if (strTemp2 === 0) {
		var strLarge = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９';
		strLarge = strLarge + '～！＠＃＄％︿＊（）－＿＝＋［］｛｝｜；：，．／・⋅’＂';
		strLarge = strLarge + '╳×Ｘｘ黄册ˋ';
		var strSmall = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		strSmall = strSmall + '~!@#$%^*()-_=+[]{}|;:,./..' + '\'' + '\"';
		strSmall = strSmall + 'xxxx黃冊、';
		var imax = strLarge.length;
		for (i=0; i<imax; i++) {
			var regex = new RegExp(strLarge[i], 'g');
			strTemp1 = strTemp1.replace(regex, strSmall[i]);
		}
		strTemp1 = strTemp1.replace(/？/g, '?');
		strTemp1 = strTemp1.replace(/　/g, ' ');
		// strTemp1 = strTemp1.replace(/\s\s/g, ' ');
		// strTemp1 = strTemp1.replace(/\s\s/g, ' ');
		strTemp1 = strTemp1.replace(/＼/g, '\\');
		strTemp1 = strTemp1.replace(/＜/g, '\<');
		strTemp1 = strTemp1.replace(/＞/g, '\>');
		strTemp1 = strTemp1.replace(/＆/g, '\&');
		strTemp1 = strTemp1.replace(/＂/g, '\"');
		strTemp1 = strTemp1.replace(/《/g, '\<\<');
		strTemp1 = strTemp1.replace(/》/g, '\>\>');
		strTemp1 = strTemp1.replace(/≪/g, '\<\<');
		strTemp1 = strTemp1.replace(/≫/g, '\>\>');
		strTemp1 = strTemp1.replace(/〞/g, '\"');
		strTemp1 = strTemp1.replace(/〝/g, '\"');
		strTemp1 = strTemp1.replace(/Ⅰ/g, 'I');
		strTemp1 = strTemp1.replace(/Ⅱ/g, 'II');
		strTemp1 = strTemp1.replace(/Ⅲ/g, 'III');
		strTemp1 = strTemp1.replace(/Ⅳ/g, 'IV');
		strTemp1 = strTemp1.replace(/Ⅴ/g, 'V');
		strTemp1 = strTemp1.replace(/Ⅵ/g, 'VI');
		strTemp1 = strTemp1.replace(/Ⅶ/g, 'VII');
		strTemp1 = strTemp1.replace(/Ⅷ/g, 'VIII');
		strTemp1 = strTemp1.replace(/Ⅸ/g, 'IX');
		strTemp1 = strTemp1.replace(/Ⅹ/g, 'X');
		strTemp1 = strTemp1.replace(/…/g, '...');
	}
	if (strTemp2 === 1) {
		var strLarge = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９';
		strLarge = strLarge + '～！＠＃＄％︿＊（）－＿＝＋［］｛｝｜；：．，。／’＂黄册';
		var strSmall = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		strSmall = strSmall + '~!@#$%^*()-_=+[]{}|;:.,./' + '\'' + '\"黃冊';
		var imax = strLarge.length;
		for (i=0; i<imax; i++) {
			var regex = new RegExp(strLarge[i], 'g');
			strTemp1 = strTemp1.replace(regex, strSmall[i]);
		}
		strTemp1 = strTemp1.replace(/,/g, ', ');
		strTemp1 = strTemp1.replace(/\./g, '. ');
		strTemp1 = strTemp1.replace(/\. \. \. /g, '...');
		strTemp1 = strTemp1.replace(/\. \. \./g, '...');
		strTemp1 = strTemp1.replace(/:/g, ' : ');
		strTemp1 = strTemp1.replace(/;/g, ' ; ');
		strTemp1 = strTemp1.replace(/？/g, '?');
		strTemp1 = strTemp1.replace(/\!/g, '! ');
		strTemp1 = strTemp1.replace(/\?/g, '? ');
		strTemp1 = strTemp1.replace(/　/g, ' ');
		//strTemp1 = strTemp1.replace(/\.{3}/g, '');
		strTemp1 = strTemp1.replace(/\s\s/g, ' ');
		strTemp1 = strTemp1.replace(/\s\s/g, ' ');
		strTemp1 = strTemp1.replace(/\s\s/g, ' ');
		strTemp1 = strTemp1.replace(/\s\s/g, ' ');
		strTemp1 = strTemp1.replace(/＼/g, '\\');
		strTemp1 = strTemp1.replace(/＜/g, '\<');
		strTemp1 = strTemp1.replace(/＞/g, '\>');
		strTemp1 = strTemp1.replace(/＆/g, '\&');
		strTemp1 = strTemp1.replace(/＂/g, '\"');
		strTemp1 = strTemp1.replace(/《/g, '\<\<');
		strTemp1 = strTemp1.replace(/》/g, '\>\>');
		strTemp1 = strTemp1.replace(/〞/g, '\"');
		strTemp1 = strTemp1.replace(/〝/g, '\"');
		strTemp1 = strTemp1.replace(/Ⅰ/g, 'I');
		strTemp1 = strTemp1.replace(/Ⅱ/g, 'II');
		strTemp1 = strTemp1.replace(/Ⅲ/g, 'III');
		strTemp1 = strTemp1.replace(/Ⅳ/g, 'IV');
		strTemp1 = strTemp1.replace(/Ⅴ/g, 'V');
		strTemp1 = strTemp1.replace(/Ⅵ/g, 'VI');
		strTemp1 = strTemp1.replace(/Ⅶ/g, 'VII');
		strTemp1 = strTemp1.replace(/Ⅷ/g, 'VIII');
		strTemp1 = strTemp1.replace(/Ⅸ/g, 'IX');
		strTemp1 = strTemp1.replace(/Ⅹ/g, 'X');
		strTemp1 = strTemp1.replace(/…/g, '...');
		strTemp1 = strTemp1.replace(/\~/g, '-');
		strTemp1 = strTemp1.replace(/「 /g, '「');
		strTemp1 = strTemp1.replace(/ 「/g, '「');
		strTemp1 = strTemp1.replace(/」 /g, '」');
		strTemp1 = strTemp1.replace(/ 」/g, '」');
		strTemp1 = strTemp1.replace(/『 /g, '『');
		strTemp1 = strTemp1.replace(/ 『/g, '『');
		strTemp1 = strTemp1.replace(/』 /g, '』');
		strTemp1 = strTemp1.replace(/ 』/g, '』');
	}
	return strTemp1;
}

function toolErase(strTemp) {
	//清除已輸入資料
	if (strTemp === 'No') {
		document.getElementById('toolToolMARCClear').style.display='none';
	} else if (strTemp === 'Yes') {
		document.getElementById('toolToolMARCClear').style.display='none';

		//Tools
		peastBib.value = ''; //從…匯入
		threewords.value = '978'; //ISBN 10→13碼: 前置3碼
		ISBN10.value = ''; //ISBN 10→13碼: 10碼
		ISBN13.value = ''; //ISBN 10→13碼: 13碼
		boxMID.value = ''; //書目檔案處理→MID

		//008
		document.querySelector('#box008a06').value = 's';  //出版情況
		bib008a15.value = 'ch 臺灣';  //出版地區
		document.querySelector('#sel008a15').value = 'ch';  //出版地區
		document.querySelector('#bib008aIll1').value = '#';  //插圖
		boxIllchk1a.checked = false;
		boxIllchk1b.checked = false;
		document.querySelector('#bib008aIll2').value = '#';  //插圖
		boxIllchk2a.checked = false;
		boxIllchk2b.checked = false;
		document.querySelector('#bib008aIll3').value = '#';  //插圖
		boxIllchk3a.checked = false;
		boxIllchk3b.checked = false;
		document.querySelector('#bib008aIll4').value = '#';  //插圖
		boxIllchk4a.checked = false;
		boxIllchk4b.checked = false;
		document.querySelector('#bib008a22').value = 'e';  //適用對象
		document.querySelector('#bib008a23').value = '#';  //載體形式
		document.querySelector('#bib008a24').value = '#';  //內容特性
		document.querySelector('#bib008a25').value = '#';  //內容特性
		document.querySelector('#bib008a26').value = '#';  //內容特性
		document.querySelector('#bib008a27').value = '#';  //內容特性
		document.querySelector('#bib008a28').value = '#';  //政府出版品
		document.querySelector('#bib008a29').value = '0';  //會議出版品
		document.querySelector('#bib008a30').value = '0';  //紀念文集
		document.querySelector('#bib008a31').value = '0';  //索引
		document.querySelector('#bib008a33').value = '0';  //文學體裁
		document.querySelector('#bib008a34').value = '#';  //傳記
		bib008a35.value = 'chi 中文';  //作品語文
		document.querySelector('#sel008a35').value = 'chi';  //作品語文
		chkMulLang.checked = false;
		bib041b.value = 'eng 英語';  //雙語對照
		document.querySelector('#sel041b').value = 'eng';  //雙語對照
		document.querySelector('#bib00838').value = '#';  //修正記錄代碼
		document.querySelector('#bib00839').value = 'd';  //編目來源

		document.querySelector('#box008s18').value = 'm';  //刊期
		document.querySelector('#box008s19').value = 'r';  //規則性
		document.querySelector('#box008s21').value = 'p';  //連續性出版品類型
		document.querySelector('#box008s22').value = '#';  //原件載體型式
		document.querySelector('#box008s23').value = '#';  //載體形式
		document.querySelector('#box008s24').value = '#';  //整部性質
		document.querySelector('#box008s25').value = '#';  //內容特性
		document.querySelector('#box008s26').value = '#';  //內容特性
		document.querySelector('#box008s27').value = '#';  //內容特性
		document.querySelector('#box008s28').value = '#';  //政府出版品
		document.querySelector('#box008s29').value = '0';  //會議出版品
		document.querySelector('#box008s33').value = 'e';  //題名語文
		document.querySelector('#box008s34').value = '0';  //著錄形式

		document.querySelector('#box008e05').value = 'e';  //適用對象
		document.querySelector('#box008e09').value = 'd';  //電子資源類型
		document.querySelector('#box008e11').value = '#';  //政府出版品

		document.querySelector('#box008f19').value = 'zz';  //作曲形式代碼
		document.querySelector('#box008f21').value = 'z';  //樂譜形式代碼
		document.querySelector('#box008f22').value = '#';  //音樂部份
		document.querySelector('#box008f23').value = 'e';  //適用對象代碼
		document.querySelector('#box008f24').value = '#';  //形式特性代碼
		document.querySelector('#box008f25').value = '#';  //文字附件1
		document.querySelector('#box008f26').value = '#';  //文字附件2
		document.querySelector('#box008f27').value = '#';  //文字附件3
		document.querySelector('#box008f28').value = '#';  //文字附件4
		document.querySelector('#box008f29').value = '#';  //文字附件5
		document.querySelector('#box008f30').value = '#';  //文字附件6
		document.querySelector('#box008f31').value = '#';  //錄音資料代碼
		document.querySelector('#box008f32').value = '#';  //移調和排列
		boxCDhr.value = '';  //片長(時)
		boxCDmin.value = '';  //片長(分)
		lblCDmin.innerHTML = 0;  //片長(計算後)

		document.querySelector('#box007v01').value = 'v';  //資料類型代碼
		document.querySelector('#box007v02').value = 'd';  //資料特殊類型標示
		document.querySelector('#box007v04').value = 'c';  //色彩
		document.querySelector('#box007v05').value = 'v';  //錄影資料規格
		document.querySelector('#box007v06').value = 'a';  //聲音
		document.querySelector('#box007v07').value = 'i';  //發聲媒體
		document.querySelector('#box007v08').value = 'z';  //尺寸大小
		document.querySelector('#box007v09').value = 'q';  //聲道種類
		box008v01.value = '';  //片長(時)
		box008v01b.value = '';  //片長(分)
		lblDVDmin.innerHTML = 0;  //片長(計算後)
		document.querySelector('#box008v05').value = 'e';  //適用對象
		document.querySelector('#box008v11').value = '#';  //政府出版品
		document.querySelector('#box008v12').value = '#';  //載體形式
		document.querySelector('#box008v16').value = 'v';  //錄影資料類型
		document.querySelector('#box008v17').value = 'l';  //影片運行技術

		box008t01.value = '';  //片長(時)
		box008t01b.value = '';  //片長(分)
		lblToyMin.innerHTML = 0;  //片長(計算後)
		document.querySelector('#box008t05').value = 'b';  //適用對象
		document.querySelector('#box008t11').value = '#';  //政府出版品
		document.querySelector('#box008t12').value = '#';  //載體形式
		document.querySelector('#box008t16').value = 'g';  //錄影資料類型
		document.querySelector('#box008t17').value = 'n';  //影片運行技術

		lbl008.value = '';  //008段預覽

		//017.020.022.024
		document.querySelector('#cbx020Head').value = 'ISBN';  //ISBN/EAN/ISSN
		box020a.value = '' ;  //020a
		box020q.value = '平裝' ;  //020q
		document.querySelector('#sel020q').value = '平裝';  //020q
		box020c.value = '' ;  //020c
		box017a.value = '' ;  //017a

		document.getElementById('Group020set').style.display = 'none';
		document.getElementById('btn020Down').innerHTML = '多筆ISBN▼';

		box020Hvl.value = '' ;  //分冊方式
		document.querySelector('#sel020Hvl').value = '第?冊';  //分冊方式
		box020Nvl.value = '' ;  //冊次
		document.querySelector('#sel020Nvl').value = '上';  //冊次
		lbl020qvl.innerHTML = '第?冊' ;  //第?冊
		chkN2CTA.checked = false;  //冊次轉壹貳參
		chkN2CTB.checked = false;  //冊次轉一二三
		box020ALL.value = '';  //所有ISBN

		//041

		boxAV024a.value = '';  //產品條碼
		document.querySelector('#cbx020DVD').value = document.getElementById('btn000AudioNow').style.display === '' ? 'CD' : 'DVD';  //光碟格式
		boxAV020c.value = '';  //定價
		boxAV017a.value = '';  //政府出版品代碼
		boxAV028a.value = '';  //出版者編號
		boxAV028b.value = '';  //來源
		
		box041h.value = '';  //翻譯作品
		lbl040a.innerHTML = '';  //雙語對照
		box041aAV.value = '';  //發音
		box041aAVb.value = '';  //發音
		document.querySelector('#cbx041aAV').value = '';  //發音
		box041j.value = '';  //字幕
		box041jb.value = '';  //字幕
		document.querySelector('#cbx041j').value = '';  //字幕

		//084[082]
		box084a.value = '';  //分類號
		box084b.value = '';  //作者號
		box084bPeo.value = '';  //被傳者
		document.getElementById('box084b').style.backgroundColor = 'var(--bg-color)';

		//100.700
		box100a.value = '';  //主要著者
		chk100a.checked = false;
		box700D.value = '';  //次要著者
		chk700D.checked = false;
		box700T.value = '';  //第3著者
		chk700T.checked = false;
		boxAV700.value = '';  //[視聽]主演
		chkAV700.checked = false;

		var displayBook = document.getElementById('GroupBook').style.display;
		var displayPeri = document.getElementById('GroupPeri').style.display;
		var displayeBook = document.getElementById('GroupeBook').style.display;
		var displayAudio = document.getElementById('GroupAudio').style.display;
		var displayDVDs = document.getElementById('GroupDVDs').style.display;
		var displayToys = document.getElementById('GroupToys').style.display;
		// 其他類型
		cbx100a.value = '著';  //主要著作方式
		cbx700D.value = '繪';  //次要著作方式
		cbx700T.value = '譯';  //第3著作方式
		cbxAV700.value = '';  //[視聽]職務
		document.querySelector('#sel100a').value = '著';  //主要著者
		document.querySelector('#sel700D').value = '繪';  //次要著者
		document.querySelector('#sel700T').value = '譯';  //第3著者
		document.querySelector('#selAV700').value = ' ';  //[視聽]主演
		if (displayAudio !== 'none') {
			// 錄音資料類型--
			cbx100a.value = '演唱' ; //主要著作方式
			cbx700D.value = '作曲' ; //次要著作方式
			cbx700T.value = '作詞' ; //第3著作方式
			cbxAV700.value = '' ; //[視聽]職務
			document.querySelector('#sel100a').value = '演唱';  //主要著者
			document.querySelector('#sel700D').value = '作曲';  //次要著者
			document.querySelector('#sel700T').value = '作詞';  //第3著者
			document.querySelector('#selAV700').value = '';  //[視聽]主演
		} else if (displayDVDs !== 'none') {
			// 視聽資料類型--
			cbx100a.value = '導演' ; //主要著作方式
			cbx700D.value = '監製' ; //次要著作方式
			cbx700T.value = '編劇' ; //第3著作方式
			cbxAV700.value = '主演' ; //[視聽]職務
			document.querySelector('#sel100a').value = '導演';  //主要著者
			document.querySelector('#sel700D').value = '監製';  //次要著者
			document.querySelector('#sel700T').value = '編劇';  //第3著者
			document.querySelector('#selAV700').value = '主演';  //[視聽]主演
		}
		switchRDArd('cbx100a');
		switchRDArd('cbx700D');
		switchRDArd('cbx700T');
		switchRDArd('cbxAV700');

		//240.245
		box240a.value = '';  //原文題名
		document.getElementById('box240a').disabled = true;
		box240l.value = '中文';  //翻譯作語言
		document.querySelector('#sel240l').value = '中文';  //
		box245a.value = '';  //正題名
		btn245Down.innerHTML = '編次▼'; //切換編次顯示/隱藏
		document.getElementById('Group245np').style.display = 'none';
		box245n.value = '';  //編次
		box245p.value = '';  //編次名稱

		//245,b.246
		box245b.value = '';  //副題名
		box246s.value = '';  //其他題名
		btn246Down.innerHTML = '多筆246段▼'; //切換多筆246段顯示/隱藏
		document.getElementById('Group246s').style.display = 'none';
		document.querySelector('#box246A').value = '';  //246段指標1
		document.querySelector('#box246B').value = '';  //246段指標2
		box246i.value = '';  //246, i
		document.querySelector('#sel246i').value = '';  //246段指標2
		box246all.value = '';  //多筆246段

		//250
		box250a.value = '初版';  //版次
		document.querySelector('#sel250a').value = '初版';  //版次
		box250b.value = '';  //版本其他
		document.querySelector('#sel250a').value = '';  //版本其他

		//264[260]
		box260a.value = '';  //出版地
		document.querySelector('#sel260a').value = '';  //出版地
		box260b.value = '';  //出版者
		document.querySelector('#sel260b').value = '';  //出版者
		box260a2.value = '';  //經銷地
		document.querySelector('#sel260a2').value = '';  //經銷地
		box260b2.value = '';  //經銷者
		document.querySelector('#sel260b2').value = '';  //經銷者
		box260c.value = '';  //出版日期
		document.querySelector('#cbxYearT').value = '西元年';  //年號轉西元
		box260cb.value = '';  //刷次
		document.querySelector('#sel260cb').value = '';  //刷次
		box260cC.value = '';  //版權年

		//300
		box300a.value = '';  //數量
		document.querySelector('#sel300a').value = ' ';  //數量
		box300b.value = '';  //圖表
		cbx300c.value = '';  //尺寸
		document.querySelector('#sel300c').value = ' ';  //尺寸
		box300e.value = '';  //附件
		document.querySelector('#sel300e').value = ' ';  //附件
		if (displayAudio !== 'none') {
			// 錄音資料類型--
			box300b.value = '數位, 立體聲';
			cbx300c.value = '4 3/4吋';
		}
		if (displayDVDs !== 'none') {
			// 視聽資料類型--
			box300b.value = '有聲, 彩色';
			cbx300c.value = '4 3/4吋';
		}

		//336.337.338
		// document.querySelector('#cbx336').value = 'txt';  //336段
		// document.querySelector('#cbx337').value = 'n';  //337段
		// document.querySelector('#cbx338').value = 'nc';  //338段
		switch008336();
		document.querySelector('#cbxCDs').value = ' ';  //附件類型
		btnCDs.innerHTML = '▼'; //切換附件336顯示/隱藏
		document.getElementById('Group336CD').style.display = 'none';
		document.querySelector('#cbx336b').value = ' ';  //附件336段
		document.querySelector('#cbx337b').value = ' ';  //附件337段
		switch338('cbx337b', 'cbx338b');
		document.querySelector('#cbx338b').value = ' ';  //附件338段

		//490.830
		box490a.value = '';  //集叢名
		box490v.value = '';  //集叢號
		btnShow490s.innerHTML = '多筆490段▼'; //切換多筆490顯示/隱藏
		document.getElementById('Group490s').style.display = 'none';
		box490s.value = '';  //多筆490
		box830s.value = '';  //多筆830

		//600-653
		box600a.value = '';  //傳記人物或團體
		chk600a.value = '';  //團體
		box650a.value = '';  //主題(逗號分隔)
		document.querySelector('#sel650a').value = ' ';  //主題(逗號分隔)
		box651a.value = '';  //地理附加款目
		document.querySelector('#sel651a').value = ' ';  //地理附加款目
		document.querySelector('#cbx653a').value = 'Book';  //資料類型(委外加館藏專用)
		switch653();

		//NRRC 035.037.090.653
		btnShowNRRC.innerHTML = '▼'; //切換NRRC顯示/隱藏
		document.getElementById('GroupNRRC2').style.display = 'none';
		txtNRRC035.value = 'NO';  //035段
		txtNRRC037.value = '公共圖書館新北分區資源中心';  //037段
		txtNRRC090.value = '新北市立圖書館';  //090段
		txtNRRC653.value = '';  //653段
		document.querySelector('#selNRRC653').value = ' ';  //653段

		//5xx
		box500a.value = '';  //一般註
		document.querySelector('#sel500a').value = ' ';  //一般註
		box504a.value = '';  //書目註
		document.querySelector('#sel504a').value = ' ';  //書目註
		box505a.value = '';  //內容註
		box520a.value = '';  //提要註
		box521a.value = '';  //適用對象
		document.querySelector('#sel521a').value = ' ';  //適用對象
		box546a.value = '';  //語文註
		document.querySelector('#sel546a').value = ' ';  //語文註
		box586a.value = '';  //得獎註
		box260a3.value = '';  //電子資源製造地
		document.querySelector('#sel260a3').value = '';  //電子資源製造地
		box260b3.value = '';  //電子資源製造者
		document.querySelector('#sel260b3').value = '';  //電子資源製造者
		box538a.value = '';  //系統細節註
		document.querySelector('#sel538a').value = '';  //系統細節註
		box856u.value = '';  //電子資源

		//權威檔工具[待修]

		//輸出資料
		showMARC.value = '';  //輸出資料

		//清除Local Storage
		localStorage.setItem('BookStacks', ''); //館藏段
		localStorage.setItem('Book020c', ''); //價格
		localStorage.setItem('Book020cAll', ''); //套書價格
		localStorage.setItem('Book084a', ''); //分類號
		localStorage.setItem('Book084b', ''); //作者號
		localStorage.setItem('Book653a', 'Book'); //資料類型
		localStorage.setItem('Book594a', box594a.value.trim()); //批次號
		localStorage.setItem('HadCD', ''); //是否有附件

		//還原顏色
		document.getElementById('box020c').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box084a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box084b').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box100a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box245a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box260a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('sel260a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box260b').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('sel260b').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box260c').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box300a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('sel300a').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('box300b').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('cbx300c').style.backgroundColor = 'var(--bg-color)';
	document.getElementById('sel300c').style.backgroundColor = 'var(--bg-color)';

	view008();
	check504();
	}
}

function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	var allText = '';
	rawFile.open("GET", file, false);
	rawFile.overrideMimeType("text/html");
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === 4) {
				if(rawFile.status === 200 || rawFile.status == 0) {
					allText = rawFile.responseText;
				}
		}
	}
	rawFile.send(null);
	return allText;
}

function toolCopy(strID) {
	var copyText = document.getElementById(strID);
	copyText.select();
	copyText.setSelectionRange(0, 9999);
	document.execCommand('copy');
	//copyText.setSelectionRange(9999, 0);
}

function toolSC() {
	var strReturn = '';
	//作者姓名
	if (box100a.value !== '') toolSCAuthor(box100a.value,'box100a');
	if (box700D.value !== '') toolSCAuthor(box700D.value,'box700D');
	if (box700T.value !== '') toolSCAuthor(box700T.value,'box700T');

	//245段
	strReturn = '246 33 |a' + box245a.value.trim();
	if (box245n.value !== '') strReturn = strReturn + '. |n' + toSimp(box245n.value);
	if (box245p.value !== '') {
		if (box245n.value !== '') strReturn = strReturn + ', |p'
		if (box245n.value === '') strReturn = strReturn + '. |p'
		strReturn = strReturn + toSimp(box245p.value);
	}
	if (box245b.value !== '') {
		var aryTemp = box245b.value.split(' = ');
		strReturn = strReturn + ' : |b' + toSimp(aryTemp[0]);
	}
	if (box246all.value !== '') box246all.value = box246all.value + '\n';
	box246all.value = box246all.value + strReturn;
	box245a.value = toSimp(box245a.value);
	box245b.value = toSimp(box245b.value);
	box245n.value = toSimp(box245n.value);
	box245p.value = toSimp(box245p.value);

	//490段
	if (box490a.value + box490v.value + box490s.value !== '') {
		strReturn = '';
		if (box490a.value + box490v.value !== '') toolAdd490s();
		strReturn = toSimp(box490s.value);
		if (box490s.value !== strReturn) {
			box490s.value = box490s.value + '\n' + strReturn;
			strReturn = toSimp(box830s.value);
			box830s.value = box830s.value + '\n' + strReturn;
		}
	}
}

function toolSCAuthor(strTemp,strID) {
	var strReturn = '';
	var aryTemp = strTemp.split(',');
	var imax = aryTemp.length;
	for (i=0;i<imax;i++) {
		var aryTemp2 = aryTemp[i].split('{');
		aryTemp[i] = toSimp(aryTemp2[0]);
		if (aryTemp2.length > 1) aryTemp[i] = aryTemp[i] + '{' + aryTemp2[1];
		if (aryTemp2.length === 1) aryTemp[i] = aryTemp[i] + '{' + aryTemp2[0] + '}';
		if (strReturn !== '') strReturn = strReturn + ',';
		strReturn = strReturn + aryTemp[i];
	}
	document.getElementById(strID).value = strReturn;
}

function toolShowEuro(strTemp) {
	var strReturn = readTextFile('letters.txt'); // 外語字母
	var aryTemp = [];
	aryTemp.push(['Latin','拉丁字母']);
	aryTemp.push(['VIE','越文']);
	aryTemp.push(['JPN','日文']);
	aryTemp.push(['KOR','韓文']);
	aryTemp.push(['THA','泰文']);
	aryTemp.push(['RUS','俄文']);
	aryTemp.push(['IND','印尼文']);
	aryTemp.push(['Other','其他符號']);
	var imax = aryTemp.length;
	var strView = '';
	for (i=0;i<imax;i++) {
		if (strTemp === aryTemp[i][0]) {
			var strStart = '##' + aryTemp[i][1] + '##';
			var strEnd = '##' + aryTemp[i][1] + '.End##';
			var intStart = strReturn.indexOf(strStart) + strStart.length;
			var intEnd =  strReturn.indexOf(strEnd);
			if (intStart !== strStart.length-1) {
				strView = strReturn.slice(intStart+2,intEnd);
			}
		}
	}
	if (strView !== '') letterView.value = strView;
}

function toolExchange(strID) {
	var intReturn = box020c.value;
	var intReturn2 = boxAV020c.value;
	var intMoney = document.getElementById(strID).value;
	var flag = true;
	if (intReturn === 0 && intReturn2 === 0) flag = false;
	if (intReturn === '' && intReturn2 === '') flag = false;
	if (intMoney === 0) flag = false;
	if (intMoney === '') flag = false;
	if (flag) {
		if (box020c.value !== '') box020c.value = Math.round(intReturn * intMoney);
		if (boxAV020c.value !== '') boxAV020c.value = Math.round(intReturn2 * intMoney);
	}
}

function toolClearStacks() {
		BoxBarcodeStart.value = ''; //起始條碼
		//BoxBarcodeCount.value = ''; //分館數
		//BoxBarcodeEnd.value = ''; //結尾條碼
		BoxVlNo.value = ''; //冊次號
		//LblVlCount.innerHTML = '共 0 冊';
		BoxLibMemo.value = localStorage.getItem('Book594a'); //館員備註
		// if (Book095d) Book095d.value = localStorage.getItem('Book084a');
		// if (Book095e) Book095e.value = localStorage.getItem('Book084b');
		// if (Book095m) Book095m.value = localStorage.getItem('Book020c');

		if (localStorage.getItem('Book653a') !== '' && localStorage.getItem('Book653a') !== ' ') document.querySelector('#BoxDataType').value = localStorage.getItem('Book653a');
		if (localStorage.getItem('Book653a') === '' || localStorage.getItem('Book653a') === ' ') document.querySelector('#BoxDataType').value = 'Book';
		document.querySelector('#BoxBroType').value = 'L30';
		document.querySelector('#BoxForC').value = '中文書';
		document.querySelector('#BoxArea').value = 'BK';
		showISO.value = '';
		localStorage.setItem('BookStacks','');
		chkStocken.checked = true;
		BoxChk.value = '';
		//LabelCount.innerHTML = '已選取 0 館；還有 0 館';
		LabelCount.innerHTML = '已選取 0 館';

		for (i=1;i<113;i++) {
			var strID = '000' + String(i).trim();
			strID = strID.slice(-3);
			if ('Chk' + strID) document.getElementById('Chk' + strID).checked = false;
			if ('int' + strID) document.getElementById('int' + strID).value = '';
		}
		toolSwitchBK();
		toolChangeBookStacks();
}

function toolRunStack() {
	//產生ISO檔
	if (BoxBarcodeStart.value !== '') {
		var strBarcode = BoxBarcodeStart.value.trim().toUpperCase();
		var strNo = strBarcode.replace(/\D/g,'');
		var strWord = strBarcode.replace(strNo,'');
		var aryTemp = []; // 冊次號
		var aryPrice = []; // 單價
		if (BoxVlNo.value + BoxYear.value === '') {
			aryTemp.push('');
			aryPrice.push('');
		}
		if (BoxVlNo.value + BoxYear.value !== '') {
			let strVlYear = BoxVlNo.value + BoxYear.value;
			var aryTemp2 = strVlYear.split(',');
			let ary020cEachLine = localStorage.getItem('Book020cAll').split('\n');
			for (i=0;i<aryTemp2.length;i++) {
				var intFind = aryTemp2[i].indexOf('-',0);
				if (intFind === 0-1) {
					aryTemp.push(aryTemp2[i]);
					let strVolume = aryTemp2[i] + '\t';
					let strFindPrice = '';
					for (k=0;k<ary020cEachLine.length;k++) {
						if (ary020cEachLine[k].startsWith(strVolume)) {
							strFindPrice = ary020cEachLine[k].split('\t')[1];
							aryPrice.push(strFindPrice);
						}
					}
					if (strFindPrice === '') aryPrice.push(localStorage.getItem('Book020c'));
				}
				if (intFind !== 0-1) {
					var intStart = aryTemp2[i].substr(0,intFind);
					var intEnd = aryTemp2[i].slice(intFind+1);
					for (j=intStart;j<=intEnd;j++) {
						aryTemp.push(j);
						let strVolume = j + '\t';
						let strFindPrice = '';
						for (k=0;k<ary020cEachLine.length;k++) {
							if (ary020cEachLine[k].startsWith(strVolume)) {
								strFindPrice = ary020cEachLine[k].split('\t')[1];
								strFindPrice = (strFindPrice === undefined) ? localStorage.getItem('Book020c') : strFindPrice;
								aryPrice.push(strFindPrice);
							}
						}
						if (strFindPrice === '') aryPrice.push(localStorage.getItem('Book020c'));
					}
				}
			}
		}
		var aryTemp3 = []; // 年代號
		if (BoxYear.value === '') {
			aryTemp3.push('');
		}
		if (BoxYear.value !== '') {
			var aryTemp4 = BoxYear.value.split(',');
			for (i=0;i<aryTemp4.length;i++) {
				var intFind = aryTemp4[i].indexOf('-',0);
				if (intFind === 0-1) aryTemp3.push(aryTemp4[i]);
				if (intFind !== 0-1) {
					var intStart = aryTemp4[i].substr(0,intFind);
					var intEnd = aryTemp4[i].slice(intFind+1);
					for (j=intStart;j<=intEnd;j++) {
						aryTemp3.push(j);
					}
					
				}
			}
		} 

		var aryLibrary = [];
		for (i=1;i<113;i++) {
			var strID = '000' + String(i).trim();
			strID = strID.slice(-3);
			if (document.getElementById('Chk' + strID).checked) {
				var strLibrary = document.getElementById('txt' + strID).innerHTML;
				strLibrary = strLibrary.substr(0,strLibrary.indexOf(' ',0));
				var jmax=document.getElementById('int' + strID).value;
				for (j=0;j<jmax;j++) {
					aryLibrary.push(strLibrary);
				}
			}
		}
		if (aryLibrary.length > 0) {
			var strAll095 = '';
			var strAll096 = '';
			var strThisLine = '';
			var str095d = '|d' + localStorage.getItem('Book084a');
			var str095e = '|e' + localStorage.getItem('Book084b');
			var str095m = '|m' + localStorage.getItem('Book020c');
			var str095n = '|n' + BoxLibMemo.value.trim();
			var str095p = '|p' + document.querySelector('#BoxDataType').value;
			var str096a = '|a' + document.querySelector('#BoxBroType').value;
			var str096x = '|x';
			var str095s = '';
			var str095z = '';
			if (chkMairacle.checked) {
				str095s = '|s' + document.querySelector('#sel095s').value;
				str095z = '|z' + document.querySelector('#sel095z').value;
				// str095n = '|h' + BoxLibMemo.value.trim(); //暫緩 2025/09/18
			}
			if (document.querySelector('#BoxForC').value === '中文書') str096x = str096x + 'Five strokes';
			if (document.querySelector('#BoxForC').value === '西文書') str096x = str096x + 'Cutter';
			var str095t = '|t';
			if (document.querySelector('#BoxForC').value === '中文書') str095t = str095t + 'CCL';
			if (document.querySelector('#BoxForC').value === '西文書') str095t = str095t + 'DDC';
			for (i=0;i<aryLibrary.length;i++) {
				var str095b = '|b' + aryLibrary[i];
				var strArea = toolGetArea(aryLibrary[i],document.querySelector('#BoxArea').value);
				str095b = str095b + strArea;
				var str095ly = '|lv.';
				var aryThisLine = aryTemp;
				if (aryTemp3.length > 0 && aryTemp3[0] !== '') {
					str095ly = '|l'; //2025.04 年代號改列於卷次號
					aryThisLine = aryTemp3;
				}
				//console.log(aryPrice);
				//console.log(aryTemp);
				for (j=0;j<aryThisLine.length;j++) {
					var str095c = '|c' + strWord + strNo;
					var str0958 = '|8' + strWord + strNo;
					var str095l = '';
					if (aryThisLine[j] !== '') {
						str095l = str095ly + aryThisLine[j];
						str095m = 'USEaryPrice';
			//console.log(str095m);
					}
					strThisLine = '095    |aNTCL' + str095b + str095c +
						str095d + str095e + str095l + '|kc.1' + str095n;
					if (str095m !== 'USEaryPrice') strThisLine += str095m;
					if (str095m === 'USEaryPrice') strThisLine += '|m' + aryPrice[j];
					strThisLine += str095p + str095s + str095t + str095z + str0958;
					if (strAll095 !== '') strAll095 = strAll095 + '\n';
					strAll095 = strAll095 + strThisLine;
					strThisLine = '096    ' + str0958 + str096a + str096x;
					if (strAll096 !== '') strAll096 = strAll096 + '\n';
					strAll096 = strAll096 + strThisLine;
					strNo = '0000000' + (Number(strNo) + 1);
					strNo = strNo.slice(-7);
				}
			}
		}
		showISO.value = strAll095 + '\n' + strAll096;
		localStorage.setItem('BookStacks', strAll095 + '\n' + strAll096); //館藏段
	}
	if (BoxBarcodeStart.value === '') {
		showISO.value = '';
		localStorage.setItem('BookStacks', ''); //館藏段
	}
}

function toolGetArea(strLibrary,strArea) {
	var strFindText = '';
	var strDataType = document.querySelector('#BoxDataType').value;
	var strBook084a = localStorage.getItem('Book084a');
	if (strArea === 'BK') {
		if (strLibrary === 'TB') {
			if (strDataType === 'Book') {
				if (strBook084a.substr(0,1) === 9 || 8) strArea = 'BK6';
				if (strBook084a.substr(0,1) <= 7 && strBook084a.substr(0,1) >= 4) strArea = 'BK7';
				if (strBook084a.substr(0,1) <= 3 && strBook084a.substr(0,1) >= 0) strArea = 'BK8';
			}
			if (strDataType === 'L') strArea = 'BB';
			if (strDataType === 'BB') strArea = 'VS';
			if (strDataType === 'TAI') strArea = 'NAT';
			if (strDataType === 'HAK') strArea = 'NAT';
			strFindText = '|S|T|VS|CB|ABO|G|RP|SC|';
			if (strFindText.indexOf('|'+strDataType+'|',0) !== 0-1) strArea = strDataType;
		}
	}
	if (strArea === 'JUN') {
		if (strLibrary === 'TE') {
			strFindText = '|KJPN|KGER|KFRE|KVIE|KIND|KKOR|KVIE|KIND|KTHA|KMAS|KBUR|KHIN|KSPA|KHUN|KPHI|KCAM|KLAO|KAFR|KARA|KPOR|KDUT|KCZE|';
			if (strFindText.indexOf('|'+strDataType+'|',0) !== 0-1) strArea = 'MUL2';
			if (strDataType === 'KF') strArea = 'FJ2';
			if (strDataType === 'KRF') strArea = 'REF';
			if (strDataType === 'KB') strArea = 'JA';
			if (strDataType === 'KI') strArea = 'JCA';
		}
		if (strLibrary === 'RA') {
			strFindText = '|KF|KRF|KJPN|KGER|KFRE|KVIE|KIND|KKOR|KVIE|KIND|KTHA|KMAS|KBUR|KHIN|KSPA|KHUN|KPHI|KCAM|KLAO|KAFR|KARA|KPOR|KDUT|KCZE|';
			if (strFindText.indexOf('|'+strDataType+'|',0) !== 0-1) strArea = 'BK';
		}
	}
	if (strArea === 'MUL') {
		strFindText = '|TB|TE|';
		if (strFindText.indexOf('|'+strLibrary+'|',0) === 0-1) {
			strArea = 'BK';
		}
		if (strLibrary === 'TB') {
			
		}
		if (strLibrary === 'TE') {
			if (strDataType === 'F') strArea = 'FJ3';
		}
	}
	if (strArea === 'NAT') {
		strFindText = '|TB|';
		if (strFindText.indexOf('|'+strLibrary+'|',0) === 0-1) strArea = 'BK';
		strFindText = '|KTAI|KHAK|';
		if (strFindText.indexOf('|'+strDataType+'|',0) !== 0-1) strArea = 'JUN';
	}
	if (strArea === 'AV') {
		if (strLibrary === 'HF') {
			if (strDataType === 'LP') strArea = 'SP';
		}
	}
	if (strArea === 'REF') {
		if (strLibrary === 'TB') {
			if (strDataType === 'RF') strArea = 'MUL';
		}
	}
	strFindText = '|TW|OD|UD|TT|TK|HH|UU|BASRT|';
	if (strFindText.indexOf('|'+strLibrary+'|',0) !== 0-1) strArea = '';
	if (strLibrary === 'TU') strArea = 'BK1';
	if (strLibrary === 'IH') strArea = 'BK';
	if (strLibrary === 'KF') {
		if (strArea === 'JUN') strArea = 'BK';
		if (strDataType === 'BK') strArea = 'JA';
	}
	return strArea;
}

function toolSwitchTemp() {
	//判斷應存在哪個書目檔
	if (showMARC.value !== '') {
		let strFind = `095    |a`;
		let strFind2 = `=095  \\$a`;
		if (showMARC.value.indexOf(strFind,0) === 0-1 && showMARC.value.indexOf(strFind2,0) === 0-1) {
			if (boxMID.value === '') {
				chkMID2.checked = false;
				chkMID3.checked = false;
				chkMID4.checked = false;
				chkMID1.checked = true;
			}
			if (boxMID.value !== '') {
				chkMID1.checked = false;
				chkMID3.checked = false;
				chkMID4.checked = false;
				chkMID2.checked = true;
			}
		}
		if (showMARC.value.indexOf(strFind,0) !== 0-1 || showMARC.value.indexOf(strFind2,0) !== 0-1) {
			if (boxMID.value !== '') {
				chkMID1.checked = false;
				chkMID2.checked = false;
				chkMID3.checked = false;
				chkMID4.checked = true;
			}
			if (boxMID.value === '') {
				chkMID1.checked = false;
				chkMID2.checked = false;
				chkMID4.checked = false;
				chkMID3.checked = true;
			}
		}
	}
	if (showMARC.value === '') {
		chkMID1.checked = false;
		chkMID2.checked = false;
		chkMID3.checked = false;
		chkMID4.checked = false;
	}
}

function toolSaveMID() {
	//儲存書目檔
	if (showMARC.value !== '') {
		let strshowMARC = showMARC.value;
		if (document.querySelector('#selOutput').value === 'MARCEdit') strshowMARC = toolCov2Miracle(strshowMARC);
		let strTemp = document.querySelector('input[name="exampleRadios"]:checked').value;
		if (strshowMARC.substr(0,5) !== '<LDR>') strshowMARC = '<LDR>' + strshowMARC;
		if (boxMID.value === '') {
		}
		if (boxMID.value !== '') {
			let strThisLine = '';
			let aryThisLine = strshowMARC.split('\n');
			let str001 = '001 ' + boxMID.value.trim();
			strThisLine = aryThisLine[0] + '\n';
			if (aryThisLine[1].substr(0,3) === '001') strThisLine = strThisLine + '001 ' + boxMID.value.trim() + '\n';
			if (aryThisLine[1].substr(0,3) !== '001') strThisLine = strThisLine + '001 ' + boxMID.value.trim() + '\n' + aryThisLine[1] + '\n';
			for (i=2;i<aryThisLine.length;i++) {
				if (aryThisLine[i] !== '') strThisLine = strThisLine + aryThisLine[i] + '\n';
			}
			strshowMARC = strThisLine;
		}
		strThisLine = strshowMARC;
		if (localStorage.getItem(strTemp)) strThisLine = localStorage.getItem(strTemp) + strThisLine;
		localStorage.setItem(strTemp, strThisLine);
		document.getElementById('toolSaveMARC').style.display = 'none';
		toolAlert('Alert','書目已存至暫存檔' + strTemp.slice(-1) + '！');
		if (document.querySelector('#selOutput').value === 'MARCEdit') strshowMARC = toolCov2MARCEdit(strshowMARC);
		showMARC.value = strshowMARC;
	}
	if (showMARC.value === '') {
		toolAlert('Alert','尚未產生書目，無法存檔哦！');
	}
}

function toolAlert(strID,strTemp) {
	if (strID === 'Yes') {document.getElementById('GroupAlert').style.display = 'none';}
	if (strID === 'Alert') {
		boxAlert.innerHTML = strTemp;
		document.getElementById('GroupAlert').style.display = '';
	}
}

function toolPass(strReturn) {
	sk = 'abcjklmnopqrstuvwxyzABCDEFGHIJKLMdefghiNOPQRSTUVWXYZ';
	var aryWord = strReturn.split('');
	var aryKey1 = key.split('');
	var aryKey2 = sk.split('');
	var aryPass = [];
	if (aryKey1.length == aryKey2.length) {
		for (var i=0;i<aryKey1.length;i++) {
			aryPass.push([aryKey1[i],aryKey2[i]]);
		}
	}
	var strReturn = '';
	for (var i=0;i<aryWord.length;i++) {
		var strMach = '';
		for (var j=0;j<aryKey1.length;j++) {
			strMach = aryWord[i] === aryPass[j][0] ? aryPass[j][1] : strMach;
		}
		strReturn = strMach === '' ? strReturn + aryWord[i] : strReturn + strMach;
	}
	strReturn = atob(strReturn);
	if (strReturn === inputPP.value) {
		document.getElementById('divpass').style.display = 'none';
		document.getElementById('divmain').style.display = '';
	}
	localStorage.setItem('pp',atob('VHBoY2MyOTMzNzAzMA=='));
}

function toolHideMARC(strSwitch) {
	var strTemp = btnHideMARC.innerHTML;
	if (strSwitch === '0') {
		if (strTemp === '收合輸出頁框') {
			document.getElementById('GroupOut').style.display = 'none';
			document.getElementById('GroupBib').style.width = '96%';
			document.getElementById('GroupBib').style.maxWidth = '1080px';
			btnHideMARC.innerHTML = '展開輸出頁框';
		}
		if (strTemp === '展開輸出頁框') {
			document.getElementById('GroupOut').style.display = '';
			document.getElementById('GroupBib').style.width = '55%';
			document.getElementById('GroupBib').style.maxWidth = '650px';
			btnHideMARC.innerHTML = '收合輸出頁框';
		}
	}
	if (strSwitch === '1') {
		document.getElementById('GroupOut').style.display = '';
		document.getElementById('GroupBib').style.width = '55%';
		document.getElementById('GroupBib').style.maxWidth = '650px';
		btnHideMARC.innerHTML = '收合輸出頁框';
	}
}

function AuthorSet(strID) {
	document.getElementById('toolAuthor').style.display = '';
	localStorage.setItem('Fillto', strID);
	var intFocusStart = document.getElementById(strID).selectionStart;
	var intFocusEnd = document.getElementById(strID).selectionEnd;
	var selectedText = document.getElementById(strID).value.substring(intFocusStart, intFocusEnd);
	var aryDate = selectedText.split('\|d');
	boxAuthor100d.value = aryDate.length > 1 ? aryDate[1] : '';
	var aryEnName = aryDate[0].split('\(');
	boxAuthor245c_en.value = aryEnName.length > 1 ? aryEnName[1] : '';
	boxAuthor245c_en.value = boxAuthor245c_en.value.replace(/\)/g,'');
	boxAuthor245c_ch.value = aryEnName[0];
}

function toolFillAuthor(strTemp) {
	if (strTemp === 'fillAuthor') {
		toolAuthor();
	}
	boxAuthor245c_ch.value = '';
	boxAuthor245c_en.value = '';
	boxAuthor100d.value = '';
	boxAuthor400a.value = '';
	boxAuthor400b.value = '';
	boxAuthor100b.value = '';
	boxAuthorKor.value = '';
	document.getElementById('toolAuthor').style.display = 'none';
}

function EntrySet(strID) {
	document.getElementById('toolEntry').style.display = '';
	window.localStorage.setItem('650ID', strID);
	let strCODE = bib008a35.value.substr(0,3);
	if (strCODE === 'jpn') strCODE = 'chi';
	let regex = strCODE === 'chi' ? new RegExp('\,', 'g') : new RegExp('\\|\\|', 'g');
	peastEntry.value = document.getElementById(strID).value.replace(regex, '\n');
}

function toolFillEntry(strTemp) {
	if (strTemp === 'fillEntry') {
		toolEntry('fillEntry');
	}
	if (strTemp === 'fillFromBot') {
		toolEntry('fillFromBot');
	}
	if (strTemp === 'fillEntry' || strTemp === 'Cancel') {
		peastEntry.value = '';
		document.getElementById('toolEntry').style.display = 'none';
	}
}

function toolOpenCutter() {
	if (bib008a35.value.substr(0,3) !== 'chi' && bib008a35.value.substr(0,3) !== 'jpn') {
		if (document.getElementById('btn000BookNow').style.display === '' || document.getElementById('btn000PeriNow').style.display === '') document.getElementById('toolCutterTable').style.display = '';
	}
}