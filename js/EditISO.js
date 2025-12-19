function toolReadMID(strTemp) {
	//載入暫存書目
	if (localStorage.getItem(strTemp)) {
		showISO.value = localStorage.getItem(strTemp);
		saveBib.innerHTML = '儲存書目檔' + strTemp.slice(-1);
	}
	if (! localStorage.getItem(strTemp)) toolISOAlert('Alert','這個暫存檔沒有內容哦！');
	document.getElementById('GroupOpen').style.display ='none';
}

function toolShowGroup(strID) {
	var strTemp = document.getElementById(strID).style.display;
	if (strTemp === '') document.getElementById(strID).style.display = 'none';
	if (strTemp === 'none') document.getElementById(strID).style.display = '';
}

function toolSaveBib(strTemp) {
	//書目存檔
	if (strTemp === '') {
		if (saveBib.innerHTML !== '書目檔存檔') {
			var strID = 'MID' + saveBib.innerHTML.slice(-1);
			if (localStorage.getItem(strID)) localStorage.setItem(strID, showISO.value);
			toolISOAlert('Alert',saveBib.innerHTML.slice(-4)+'已存檔！');
		}
		if (saveBib.innerHTML === '書目檔存檔') {
			toolShowGroup('GroupSave');
		}
	}
	if (strTemp !== '') {
		localStorage.setItem(strTemp, showISO.value);
		saveBib.innerHTML = '儲存書目檔' + strTemp.slice(-1);
		toolISOAlert('Alert',saveBib.innerHTML.slice(-4) + '已存檔！');
		document.getElementById('GroupSave').style.display = 'none';
	}
}

function toolTxt2Excel(strTemp) {
	//書目檔轉為Excel清冊
	document.getElementById('GroupExcel').style.display = 'none';
	var strExcel = "ISBN(020a)" + '\t' + "UPC(024a)" + '\t' + "系統識別號(001)" + '\t' + "資料類型(095p)" + '\t' + "分類號(095d)" + '\t' + "著者號(095e)" + '\t' + "卷次號(095l)" + '\t' + "年代號(095y)" + '\t' + "適用對象(521a)" + '\t' + "價格(095m)" + '\t' + "批次號(095n)" + '\t' + "題名段(245a)" + '\t' + "附件(300e)" + '\t' + "出版者(260b)" + '\t' + "出版年月(260c)" + '\t' + "版次(250a)";
	if (boxFolder.value !== '') strExcel = strExcel + '\t'+ '其他(' + boxFolder.value + ')' + '\n';
	if (boxFolder.value === '') strExcel = strExcel + '\n';
	var aryMarc = showISO.value.split('<LDR>');
	for (i=1;i<aryMarc.length;i++) {
		var aryAll020 = [];
		var aryAll024 = [];
		var str001 = '';
		var str653a = '';
		var str084a = '';
		var str084b = '';
		var str084bv = '';
		var str084by = '';
		var str521a = '';
		var str245ab = '';
		var str300e = '';
		var str264b = '';
		var str264c = '';
		var str250a = '';
		var strOther = '';
		var aryEachLine = aryMarc[i].split('\n');
		for (j=0;j<aryEachLine.length;j++) {
			var strHead = aryEachLine[j].substr(0,3);
			var strFind = '|001|020|024|082|084|245|250|264|300|521|653|' + boxFolder.value.substr(0,3) + '|';
			var intFind = strFind.indexOf(strHead,0);
			if (intFind !== 0-1) {
				if (strHead === '001') {
					str001 = aryEachLine[j].slice(4);
				}
				if (strHead === '020') {
					aryEachLine[j] = aryEachLine[j].replace(/NT\$/g,'');
					aryEachLine[j] = aryEachLine[j].replace(/新臺幣/g,'');
					aryEachLine[j] = aryEachLine[j].replace(/新台幣/g,'');
					aryEachLine[j] = aryEachLine[j].replace(/元/g,'');
					aryAll020.push(aryEachLine[j]);
				}
				if (strHead === '024') {
					aryAll024.push(aryEachLine[j]);
				}
				var aryData = aryEachLine[j].split('|');
				for (k=1;k<aryData.length;k++) {
					if (strHead !== '001') {
						var strFolder = strHead + aryData[k].substr(0,1);
						var strData = aryData[k].slice(1);
						if (strFolder === '084a' || strFolder === '082a') {
							str084a = strData;
						}
						if (strFolder === '084b' || strFolder === '082b') {
							if (strData.indexOf(' ',0) !== 0-1) {
								str084b = strData.substr(0,strData.indexOf(' ',0));
								str084bv = strData.slice(strData.indexOf(' ',0));
								str084by = '';
							}
							if (strData.indexOf(' ',0) === 0-1) {
								str084b = strData;
								str084bv = '';
								str084by = '';
							}
						}
						if (strFolder === '521a') {
							if (strData.indexOf('限制',0) !== 0-1) str521a = strData;
						}
						if (strFolder === '245a') {
							str245ab = strData;
						}
						if (strFolder === '245n') {
							str245ab = str245ab + strData;
						}
						if (strFolder === '245p') {
							str245ab = str245ab + strData;
						}
						if (strFolder === '245b') {
							str245ab = str245ab + strData;
						}
						if (strFolder === '300e') {
							str300e = strData;
						}
						if (strFolder === '264b') {
							strData = strData.replace('有限公司','');
							strData = strData.replace('股份','');
							strData = strData.replace('圖書館','[!keep0]');
							strData = strData.replace('圖書','');
							strData = strData.replace('[!keep0]','圖書館');
							strData = strData.replace('文化局','[!keep1]');
							strData = strData.replace('文化部','[!keep2]');
							strData = strData.replace('文化中心','[!keep3]');
							strData = strData.replace('文化','');
							strData = strData.replace('[!keep1]','文化局');
							strData = strData.replace('[!keep2]','文化部');
							strData = strData.replace('[!keep3]','文化中心');
							strData = strData.replace('大和書報','[!keep4]');
							strData = strData.replace('書報','');
							strData = strData.replace('[!keep4]','大和書報');
							strData = strData.replace('聯合發行','[!keep5]');
							strData = strData.replace('發行','');
							strData = strData.replace('[!keep5]','聯合發行');
							strData = strData.replace('事業','');
							strData = strData.replace('實業','');
							strData = strData.replace('企業','');
							strData = strData.replace('出版社','');
							strData = strData.replace('出版','');
							strData = strData.replace('工作室','');
							strData = strData.replace('財團法人','');
							strData = strData.replace('社會法人','');
							strData = strData.replace('書版','');
							strData = strData.replace('國際','');
							strData = strData.replace('(股)公司','');
							strData = strData.replace('(股)','');
							strData = strData.replace('英屬蓋曼群島商','');
							strData = strData.replace('英屬蓋曼群島','');
							strData = strData.replace('英屬維京群島商','');
							strData = strData.replace('英屬維京群島','');
							strData = strData.replace(', ','');
							if (str264b === '') str264b = strData;
						}
						if (strFolder === '264c') {
							if (strData.indexOf('\[',0) !== 0-1) strData = strData.substr(0,strData.indexOf('\[',0));
							strData = strData.replace('©','');
							strData = strData.replace('Ⓟ','');
							strData = strData.replace('.','/');
							str264c = strData;
						}
						if (strFolder === '250a') {
							str250a = strData;
						}
						if (strFolder === '653a') {
							var strNRRC = '|知識性|青少年|人文藝術|多元學習|科技創新|樂活環保|文化創意|文創|地方創生|English Learning|';
							if (strNRRC.indexOf(strData,0) === 0-1) str653a = strData;
						}
						if (strFolder === boxFolder.value) {
							if (strOther !== '') strOther = strOther + '||';
							strOther = strOther + strData;
						}
					}
				}
			}
		}
		
		if (str245ab.slice(-3) === ' / ') str245ab = str245ab.slice(0,-3);
		if (str264c.slice(-1) === '/') str264c = str264c.slice(0,-1);
		var str020a = '';
		var str020c = '';
		var str020q = '';
		var str020v = '';
		var ary020Cut = [];
		if (aryAll020[0]) {
			for (var l=0;l<aryAll020.length;l++) {
				aryThisLine = aryAll020[l].split('|');
				for (var m=1;m<aryThisLine.length;m++) {
					aryThisLine[m] = aryThisLine[m].replace('(','');
					aryThisLine[m] = aryThisLine[m].replace(')','');
					aryThisLine[m] = aryThisLine[m].replace(' : ','');
					aryThisLine[m] = aryThisLine[m].replace(' ; ','');
					strFolder = aryThisLine[0].substr(0,3) + aryThisLine[m].substr(0,1);
					if (strFolder === '020a') {
						str020a = aryThisLine[m].slice(1);
					}
					if (strFolder === '020c') {
						str020c = aryThisLine[m].slice(1);
					}
					if (strFolder === '020q') {
						if (str020q !== '') {
							str020v = str020q;
							str020q = aryThisLine[m].slice(1);
						}
						if (str020q === '') str020q = aryThisLine[m].slice(1);
					}
				}
				if (str020a + str020v + str020c !== '') ary020Cut.push([str020a,str020v,str020c]);
				str020a = '';
				str020v = '';
				str020c = '';
				str020q = '';
			}
		}
		var str024a = '';
		var str024q = '';
		var ary024Cut = [];
		if (aryAll024[0]) {
			for (var l=0;l<aryAll024.length;l++) {
				aryThisLine = aryAll024[l].split('|');
				for (var m=1;m<aryThisLine.length;m++) {
					aryThisLine[m] = aryThisLine[m].replace('(','');
					aryThisLine[m] = aryThisLine[m].replace(')','');
					strFolder = aryThisLine[0].substr(0,3) + aryThisLine[m].substr(0,1);
					if (strFolder === '024a') {
						str024a = aryThisLine[m].slice(1);
					}
					if (strFolder === '024q') {
						str024q = aryThisLine[m].slice(1);
					}
				}
				ary024Cut.push([str024a,str024q]);
				str024a = '';
				str024q = '';
			}
		}
		var strThisLine = '';
		if (aryAll020[0]) {
			for (var m=0;m<ary020Cut.length;m++) {
				strThisLine = ary020Cut[m][0] + '\t' + str024a + '\t' + str001 + '\t' + str653a + '\t' + str084a + '\t' + str084b + '\t' + ary020Cut[m][1] + '\t' + str084by + '\t' + str521a + '\t' + ary020Cut[m][2] + '\t' + '' + '\t' + str245ab + '\t' + str300e + '\t' + str264b + '\t' + str264c + '\t' + str250a + '\t' + strOther + '\n';
				strExcel = strExcel + strThisLine;
			}
		}
		if (aryAll024[0]) {
			for (var m=0;m<ary024Cut.length;m++) {
				strThisLine = '' + '\t' + ary024Cut[m][0] + '\t' + str001 + '\t' + str653a + '\t' + str084a + '\t' + str084b + '\t' + ary024Cut[m][1] + '\t' + str084by + '\t' + str521a + '\t' + str020c + '\t' + '' + '\t' + str245ab + '\t' + str300e + '\t' + str264b + '\t' + str264c + '\t' + str250a + '\t' + strOther + '\n';
				strExcel = strExcel + strThisLine;
			}
		}
	}
	boxXML.value = strExcel;
}

function toolFindBib() {
	//尋找書目檔內容
	var strFind = ISOFindText.value.toUpperCase().trim();
	var strISO = showISO.value.toUpperCase();
	if (strISO !== '') {
		if (strFind !== '') {
			var intFindStart = 0;
			if (chkISOFindStart.checked !== true) intFindStart = document.getElementById('showISO').selectionEnd;
			var intFind = strISO.indexOf(strFind,intFindStart);
			if (intFind !== 0-1) {
				var intFindEnd = intFind + strFind.length;
				document.getElementById('showISO').select();
				document.getElementById('showISO').setSelectionRange(intFind, intFindEnd);
			}
			if (intFind === 0-1) toolISOAlert('Alert','找不到『' + strFind + '』哦！');
		}
	}
}

function toolSimpleXML() {
	//將書目篩減為館藏段XML
	if (showISO.value !== '') {
		var strReturn = '';
		var aryEachLine = showISO.value.split('\n');
		for (i=0;i<aryEachLine.length;i++) {
			var strHead = aryEachLine[i].substr(0,3);
			if (aryEachLine[i] !== '') {
				if (strHead === '245') {
					var find245c = aryEachLine[i].indexOf('|c',10);
					if (find245c !== 0-1) aryEachLine[i] = aryEachLine[i].substr(0,find245c);
				}
				var intFind = '|<LD|000|001|017|020|024|084|095|096|245|653|'.indexOf(strHead,0);
				if (intFind !== 0-1) strReturn = strReturn + aryEachLine[i] + '\n';
				if (strHead === '300') {
					var find300e = aryEachLine[i].indexOf('|e',0);
					if (find300e !== 0-1) {
						aryEachLine[i] = '300    ' + aryEachLine[i].slice(find300e);
						strReturn = strReturn + aryEachLine[i] + '\n';
					}
				}
				if (strHead === '521') {
					if  (aryEachLine[i].indexOf('限制',0) !== 0-1) strReturn = strReturn + aryEachLine[i] + '\n';
				}
			}
		}
		showISO.value = strReturn;
		toolTxt2XML();
	}
}

function toolTxt2XML() {
	//將書目檔轉為XML
	if (showISO.value !== '') {
		var strOutXML = '';
		
		strOutXML = strOutXML + atob('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Y29sbGVjdGlvbiB4bWxucz0iaHR0cDovL3d3dy5sb2MuZ292L01BUkMyMS9zbGltIj4=') + '\n';
		strOutXML = strOutXML + '  <record>';
		var aryEachLine = showISO.value.split('\n');
		strOutXML = strOutXML + '<leader>' + aryEachLine[0].replace('<LDR>', '') + '</leader>' + '\n';
		for (i=1;i<aryEachLine.length;i++) {
			if (aryEachLine[i] !== '') {
				var strHead = aryEachLine[i].substr(0,3);
				if (strHead === '<LD') {
					strOutXML = strOutXML + '  </record>' + '\n';
					strOutXML = strOutXML + '  <record>';
					strOutXML = strOutXML + '<leader>' + aryEachLine[i].replace('<LDR>', '') + '</leader>' + '\n';
				}
				if (strHead === '001') {
					strOutXML = strOutXML + '    <controlfield tag=\"001\">' +
						aryEachLine[i].slice(4) + '</controlfield>' + '\n';
				}
				if ('|006|007|008|'.indexOf(strHead,0) !== 0-1) strOutXML = strOutXML + '    <controlfield tag=\"' + aryEachLine[i].substr(0,3) + '\">' + aryEachLine[i].slice(4) + '</controlfield>' + '\n';
				if ('|<LD|001|006|007|008|'.indexOf(strHead,0) === 0-1) {
					if (aryEachLine[i] !== '') {
						var aryCutLine = aryEachLine[i].split('|');
						strOutXML = strOutXML + '    <datafield tag=\"' +
							aryCutLine[0].substr(0, 3) +
							'\" ind1=\"' + aryCutLine[0].substr(4, 1) +
							'\" ind2=\"' + aryCutLine[0].substr(5, 1) +
							'">' + '\n'
						for (k=1;k<aryCutLine.length;k++) {
							if (aryCutLine[k].substr(0,1) === 'e' && strHead === '095') {
								var intFind = aryCutLine[k].indexOf(' v.',0);
								if (intFind !== 0-1) {
									aryCutLine[k] = aryCutLine[k].substr(0,intFind);
								}
							}
							strOutXML = strOutXML + '      <subfield code=\"' +
								aryCutLine[k].substr(0, 1) + '\">' +
								setHTMLcode(aryCutLine[k].slice(1)) + '</subfield>' + '\n';
						}
					}
					strOutXML = strOutXML + '    </datafield>' + '\n';
				}
			}
		}
		strOutXML = strOutXML + '  </record>' + '\n';
		strOutXML = strOutXML + '</collection>';
		boxXML.value = strOutXML;
	}
}

function setHTMLcode(strReturn) {
	//strReturn = strReturn.replace(/\&quot;/g,'"');
	strReturn = strReturn.replace(/\&/g, '&amp;');
	strReturn = strReturn.replace(/\'/g, '&apos;');
	strReturn = strReturn.replace(/\</g, '&lt;');
	strReturn = strReturn.replace(/\>/g, '&gt;');
	strReturn = strReturn.replace(/\"/g, '&quot;');
	return strReturn;
}

function toolXML2Txt() {
	// XML轉為txt
	if (boxXML.value !== '') {
		var strOutXML = setHTMLUncode(boxXML.value);
		strOutXML = strOutXML.replace(/marc:/g, '');
		strOutXML = strOutXML.replace(/\n\s\s\s\s\s\s/g, '\n');
		strOutXML = strOutXML.replace(/\n\s\s\s\s/g, '\n');
		strOutXML = strOutXML.replace(/\n\s\s/g, '\n');
		strOutXML = strOutXML.replace(/\<record\>\n/g, '');
		strOutXML = strOutXML.replace(/\<\/record\>\n/g, '');
		strOutXML = strOutXML.replace(/\<\/collection\>/g, '');
		strOutXML = strOutXML.replace(atob('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Y29sbGVjdGlvbiB4bWxucz0iaHR0cDovL3d3dy5sb2MuZ292L01BUkMyMS9zbGltIj4=') + '\n', '');
		strOutXML = strOutXML.replace(atob('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Y29sbGVjdGlvbiB4bWxucz0iaHR0cDovL3d3dy5sb2MuZ292L01BUkMyMS9zbGltIj4=') + ' ' + '\n', '');
		var aryEachLine = strOutXML.split('\n');
		var strReturn = '';
		for (i=0;i<aryEachLine.length;i++) {
			var strTemp = aryEachLine[i];
			var intStart = strTemp.indexOf('\<',0);
			var intEnd = strTemp.length;
			var strFind = strTemp.substr(intStart,8);
			if (strFind === '<record>') {
				if (strTemp.substr(0,16) === '<record><leader>') {
					strTemp = strTemp.replace('<record>', '');
					intStart = strTemp.indexOf('<leader>',0) + '<leader>'.length;
					intEnd = strTemp.indexOf('</leader>',0);
					strTemp = strTemp.slice(intStart,intEnd);
					strTemp = '<LDR>' + strTemp;
					// strTemp = strTemp.replace('  <leader>', '<LDR>');
					// strTemp = strTemp.replace('<leader>', '<LDR>');
					// strTemp = strTemp.replace('</leader>0', '\n0');
					// strTemp = strTemp.replace('\s</leader>', '\s');
					// strTemp = strTemp.replace('</leader>', '');
					// strTemp = strTemp + '\n';
				}
				if (strTemp.substr(0,16) !== '<record><leader>') {
					strTemp = strTemp.replace('<record>', '');
					strTemp = strTemp + '\n';
				}
			}
			if (strFind === '<leader>') {
				strTemp = strTemp.replace('<leader>', '<LDR>');
				strTemp = strTemp.replace('</leader>0', '\n0');
				strTemp = strTemp.replace(' </leader>', '\s');
				strTemp = strTemp.replace('</leader>', '');
				strTemp = strTemp + '\n';
			}
            if (strFind === '<control') {
				strTemp = strTemp.replace('<controlfield tag="', '');
				strTemp = strTemp.replace('</controlfield>', '');
				strTemp = strTemp.replace('">', ' ');
				strTemp = strTemp + '\n'
			}
			if (strFind === '<datafie') {
				strTemp = strTemp.replace('<datafield tag="', '');
				strTemp = strTemp.replace('" ind1=' + '"', ' ');
				strTemp = strTemp.replace('" ind2=' + '"', '');
				strTemp = strTemp.replace('\"' + '\>', ' ');
			}
			if (strFind === '<subfiel') {
				strTemp = strTemp.replace('<subfield code="', '|');
				strTemp = strTemp.replace('">', '');
				strTemp = strTemp.replace(' </subfield>', ' ');
				strTemp = strTemp.replace('</subfield>', '');
			}
			if (strFind === '</datafi') {
				strTemp = '\n';
			}
			strReturn = strReturn + strTemp;
		}
		showISO.value = setHTMLUncode(strReturn);
		//showISO.value = strReturn;
		saveBib.innerHTML = '書目檔存檔';
	}
}

function setHTMLUncode(strReturn) {
	strReturn = strReturn.replace(/\&amp;/g, '&');
	strReturn = strReturn.replace(/\&apos;/g, '\'');
	strReturn = strReturn.replace(/\&lt;/g, '\<');
	strReturn = strReturn.replace(/\&gt;/g, '\>');
	strReturn = strReturn.replace(/\&quot;/g, '"');
	// strReturn = strReturn.replace(/:\|/g, ': |');
	// strReturn = strReturn.replace(/=\|/g, '= |');
	// strReturn = strReturn.replace(/\/\|/g, '/ |');
	// strReturn = strReturn.replace(/,\|/g, ', |');
	// strReturn = strReturn.replace(/\.\|/g, '. |');
	// strReturn = strReturn.replace(/;\|/g, '; |');
	return strReturn;
}

function toolSaveXML() {
	//將XML以txt格式下載
	if (boxXML.value !== '') {
		var fileName = '.xml';
		var strToday = new Date();
		var strYear = strToday.getFullYear().toString();
		var strMonth = strToday.getMonth()+1;
		strMonth = strMonth < 10 ? '0'+strMonth : strMonth;
		var strDay = strToday.getDate();
		strDay = strDay < 10 ? '0'+strDay : strDay;
		var getToday = strYear + strMonth + strDay;
		if (localStorage.getItem('Book594a')) {
			if (localStorage.getItem('Book594a') !== '') fileName = localStorage.getItem('Book594a') + '-' + getToday + fileName;
			if (localStorage.getItem('Book594a') === '') fileName = getToday + fileName;
		}
		if (! localStorage.getItem('Book594a')) {
			fileName = getToday + fileName;
		}
		downloadTxtFile(fileName);
	}
}

function downloadTxtFile(fileName) {
	var data = toolReplaceText(boxXML.value);
	let a = document.createElement('a');
	a.href = 'data:text/plain;charset=utf-8,' + data;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function toolReplaceText(strReturn) {
	strReturn = strReturn.replace(/\n/g,'\r\n');
	strReturn = encodeURIComponent(strReturn);
	return strReturn;
}

function toolISOAlert(strID,strTemp) {
	//顯示Alert
	if (strID === 'Yes') {document.getElementById('GroupAlert').style.display = 'none';}
	if (strID === 'Alert') {
		boxAlert.innerHTML = strTemp;
		document.getElementById('GroupAlert').style.display = '';
	}
}
