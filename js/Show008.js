function view008() {
	//輸出008段
	var displayBook = document.getElementById('GroupBook').style.display;
	var displayPeri = document.getElementById('GroupPeri').style.display;
	var displayeBook = document.getElementById('GroupeBook').style.display;
	var displayAudio = document.getElementById('GroupAudio').style.display;
	var displayDVDs = document.getElementById('GroupDVDs').style.display;
	var displayToys = document.getElementById('GroupToys').style.display;
	var strToday = new Date();
	var strYear = strToday.getFullYear().toString();
	var strMonth = strToday.getMonth()+1;
	strMonth = strMonth < 10 ? '0'+strMonth : strMonth;
	var strDay = strToday.getDate();
	strDay = strDay < 10 ? '0'+strDay : strDay;
	var getToday = strYear.substr(-2,2) + strMonth + strDay;
	var str260c = box260c.value.replace('[','');
	str260c = str260c.replace(']','');
	str260c = str260c.replace('u','');
	str260c = str260c.split('.')[0];
	if (str260c.length > 3) {
		if (str260c > strYear) {
			alert('您在260段輸入的年份大於' + strYear + ' 年，變成未來出版物了，請查明後重新輸入！');
		}
	}
	var strYear1 = '####';
	var strYear2 = '####';
	if (box260cC.value === '') var strYearTemp = box260c.value;
	if (box260cC.value !== '') var strYearTemp = box260cC.value;
	strYearTemp = strYearTemp.replace(/\[/g,'');
	strYearTemp = strYearTemp.replace(/\]/g,'');
	strYearTemp = strYearTemp.replace(/\./g,'');
	strYearTemp = strYearTemp.replace(/\?/g,'u');
	strYearTemp = strYearTemp.split('.')[0];
	strYear1 = strYearTemp.length < 4 ? '####' : strYearTemp.substr(0,4);
	var str008view = "008 "+ getToday;
	var str008a06First = box008a06.value;
	if (str008a06First === 'm') {
		var strYears = box260c.value.split('-');
		if (strYears.length > 1) {
			if (strYears[1].length === 2) {
				strYear2 = '####';
				document.querySelector('#box008a06').value = 's';
			} else if (strYears[1].length === 4) {
				strYear2 = strYears[1].substr(0,4);
			} else if (strYears[1].length === 7) {
				strYear2 = strYears[1].substr(0,4);
				strYear2 = '####' + strYear2;
				strYear2 = strYear2.slice(-4);
			} else if (strYears[1].length === 0) {
				strYear2 = '9999';
			}
		}
	} else if (str008a06First === 't') {
		strYear2 = box260cC.value.substr(0,4);
	}
	var strbib008a15 = bib008a15.value.substr(0,3) + '###';
	str008view = str008view + box008a06.value + strYear1 + strYear2 +
		strbib008a15.substr(0,3);

	if (displayBook !== 'none') {
		// 圖書類型
		str008view = '00000nam#a2200000#i#450#' + '\n' + str008view;
		str008view = str008view + 
			bib008aIll1.value + bib008aIll2.value +
			bib008aIll3.value + bib008aIll4.value +
			bib008a22.value + 
			bib008a23.value + bib008a24.value +
			bib008a25.value + bib008a26.value +
			bib008a27.value + bib008a28.value +
			bib008a29.value + bib008a30.value +
			bib008a31.value + '#' +
			bib008a33.value + bib008a34.value;

		//判斷變色欄位
		check504();
	} else if (displayPeri !== 'none') {
		// 期刊類型
		str008view = '00000nas#a0000000#i#450#' + '\n' + str008view;
		str008view = str008view + 
			box008s18.value + box008s19.value + '#' +
			box008s21.value + box008s22.value +
			box008s23.value + box008s24.value +
			box008s25.value + box008s26.value +
			box008s27.value + box008s28.value +
			box008s29.value + '###' +
			box008s33.value + box008s34.value
	} else if (displayeBook !== 'none') {
		// 電子書類型
		str008view = '00000nma#a0000000#i#450#' + '\n' + str008view;
		str008view = str008view + '####' +
			box008e05.value + '###' +
			box008e09.value + '#' +
			box008e11.value + '######';
	} else if (displayAudio !== 'none') {
		// 錄音資料類型
		str008view = '00000njm#a2200181#i#450#' + '\n' + 
			'007 sd fsngnnuuueu' + '\n' + str008view;
		str008view = str008view +
			box008f19.value +
			box008f21.value + box008f22.value +
			box008f23.value + box008f24.value +
			box008f25.value + box008f26.value +
			box008f27.value + box008f28.value +
			box008f29.value + box008f30.value +
			box008f31.value + box008f32.value;
		var strAudiomin = '000';
		strAudiomin = '000' + lblCDmin.innerHTML;
		strAudiomin = Number(strAudiomin) > 999 ? '000' : strAudiomin.slice(-3);
		str008view = str008view + strAudiomin;
	} else if (displayDVDs !== 'none') {
		// 視聽資料類型
		var str007 = '007#';
		str007 = str007 +
			box007v01.value + box007v02.value + '#' +
			box007v04.value + box007v05.value +
			box007v06.value + box007v07.value +
			box007v08.value + box007v09.value;
		str008view = '00000ngm#a0000000#i#450#' + '\n' + str007 + '\n' + str008view;
		var strDVDmin = '000';
		strDVDmin = '000' + lblDVDmin.innerHTML;
		strDVDmin = Number(strDVDmin) > 999 ? '000' : strDVDmin.slice(-3);
		str008view = str008view +
			strDVDmin + '#' +
			box008v05.value + '#####' +
			box008v11.value +
			box008v12.value + '###' +
			box008v16.value + box008v17.value;
	} else if (displayToys !== 'none') {
		// 遊戲類型
		str008view = '00000nrm#a0000169#i#450#' + '\n' + str008view;
		var strToymin = '000';
		strToymin = '000' + lblToyMin.innerHTML;
		strToymin = Number(strToymin) > 999 ? '000' : strToymin.slice(-3);
		str008view = str008view + strToymin + '#' +
			box008t05.value + '#####' +
			box008t11.value +
			box008t12.value + '###' +
			box008t16.value + box008t17.value;
	}
	strbib008a15 = bib008a35.value.substr(0,3) + '###';
	str008view = str008view +
		strbib008a15.substr(0,3) + bib00838.value +
		bib00839.value;
	// box300b圖表
	str008view = str008view.replace(/#/g,' ');
	lbl008.value = str008view;
}

function AV_CD_mins(strFromCDAV) {
	//計算片長
	if (strFromCDAV === 'Audio') {
		var intHR = Number(boxCDhr.value);
		var intMIN = Number(boxCDmin.value);
		intHR = isNaN(intHR) ? 0 : intHR;
		intMIN = isNaN(intMIN) ? 0 : intMIN;
		var intAVCD = intHR * 60 + intMIN;
		lblCDmin.innerHTML = intAVCD;
	} else if (strFromCDAV === 'DVDs') {
		var intHR = Number(box008v01.value);
		var intMIN = Number(box008v01b.value);
		intHR = isNaN(intHR) ? 0 : intHR;
		intMIN = isNaN(intMIN) ? 0 : intMIN;
		var intAVCD = intHR * 60 + intMIN;
		lblDVDmin.innerHTML = intAVCD;
	} else if (strFromCDAV === 'Toys') {
		var intHR = Number(box008t01.value);
		var intMIN = Number(box008t01b.value);
		intHR = isNaN(intHR) ? 0 : intHR;
		intMIN = isNaN(intMIN) ? 0 : intMIN;
		var intAVCD = intHR * 60 + intMIN;
		lblToyMin.innerHTML = intAVCD;
	}
	view008();
}

function chkColors(strTemp) {
	//切換全彩或部份彩色
	if (strTemp === 'A1') {
		boxIllchk1b.checked = boxIllchk1a.checked ? false : boxIllchk1b.checked;
	} else if (strTemp === 'A2') {
		boxIllchk1a.checked = boxIllchk1b.checked ? false : boxIllchk1a.checked;
	} else if (strTemp === 'B1') {
		boxIllchk2b.checked = boxIllchk2a.checked ? false : boxIllchk2b.checked;
	} else if (strTemp === 'B2') {
		boxIllchk2a.checked = boxIllchk2b.checked ? false : boxIllchk2a.checked;
	} else if (strTemp === 'C1') {
		boxIllchk3b.checked = boxIllchk3a.checked ? false : boxIllchk3b.checked;
	} else if (strTemp === 'C2') {
		boxIllchk3a.checked = boxIllchk3b.checked ? false : boxIllchk3a.checked;
	} else if (strTemp === 'D1') {
		boxIllchk4b.checked = boxIllchk4a.checked ? false : boxIllchk4b.checked;
	} else if (strTemp === 'D2') {
		boxIllchk4a.checked = boxIllchk4b.checked ? false : boxIllchk4a.checked;
	}

	change300c();
}

function change300c() {
	//依選取內容變更300$b
	var str300b = '';
	var strIllvalue = document.querySelector('#bib008aIll1').value;
	if (strIllvalue !== '#') {
		str300b = select300b(strIllvalue, boxIllchk1a.checked, boxIllchk1b.checked);
	}
	strIllvalue = document.querySelector('#bib008aIll2').value;
	if (strIllvalue !== '#') {
		str300b = str300b + ', ' + select300b(strIllvalue, boxIllchk2a.checked, boxIllchk2b.checked);
	}
	strIllvalue = document.querySelector('#bib008aIll3').value;
	if (strIllvalue !== '#') {
		str300b = str300b + ', ' + select300b(strIllvalue, boxIllchk3a.checked, boxIllchk3b.checked);
	}
	strIllvalue = document.querySelector('#bib008aIll4').value;
	if (strIllvalue !== '#') {
		str300b = str300b + ', ' + select300b(strIllvalue, boxIllchk4a.checked, boxIllchk4b.checked);
	}

	box300b.value = str300b;
	check504();
}

function select300b(strTemp1, ifTemp1, ifTemp2) {
	var aryIllvalue = [];
	aryIllvalue.push(['a','圖']);
	aryIllvalue.push(['b','地圖']);
	aryIllvalue.push(['c','像']);
	aryIllvalue.push(['d','圖表']);
	aryIllvalue.push(['e','設計圖']);
	aryIllvalue.push(['f','圖版']);
	aryIllvalue.push(['g','樂諎']);
	aryIllvalue.push(['h','影鈔']);
	aryIllvalue.push(['h','書影']);
	aryIllvalue.push(['i','盾徽']);
	aryIllvalue.push(['i','徽章']);
	aryIllvalue.push(['j','譜系表']);
	aryIllvalue.push(['k','表']);
	aryIllvalue.push(['l','樣品']);
	aryIllvalue.push(['l','樣本']);
	aryIllvalue.push(['m','錄音資料']);
	aryIllvalue.push(['o','相片']);
	aryIllvalue.push(['p','文稿上的修飾圖案']);
	var strReturn = '';
	var imax = aryIllvalue.length;
	for (i=0;i<imax;i++) {
		if (strTemp1 === aryIllvalue[i][0]) {
			switch (aryIllvalue[i][0]) {
				case 'a':
					strReturn = ifTemp1 ? '彩' : strReturn;
					strReturn = ifTemp2 ? '部份彩' : strReturn;
					strReturn = strReturn + aryIllvalue[i][1];
					break;
				case 'b':
					strReturn = ifTemp1 ? '彩' : strReturn;
					strReturn = ifTemp2 ? '部份彩' : strReturn;
					strReturn = strReturn + aryIllvalue[i][1];
					break;
				case 'c':
					strReturn = ifTemp1 ? '彩' : strReturn;
					strReturn = ifTemp2 ? '部份彩' : strReturn;
					strReturn = strReturn + aryIllvalue[i][1];
					break;
				default:
					strReturn = aryIllvalue[i][1];
					break;
			}
		}
	}
	return strReturn;
}

function changeCountry(){
	//依出版地區變更語言
	var aryCountry = []; 
	aryCountry.push(['ch 臺灣','chi 中文']);
	aryCountry.push(['cc 中國','chi 簡體中文']);
	aryCountry.push(['cc 香港','chi 中文']);
	aryCountry.push(['ja 日本','jpn 日語']);
	aryCountry.push(['fr 法國','fre 法語']);
	aryCountry.push(['nyu 美國紐約','eng 英語']);
	aryCountry.push(['wau 美國華盛頓','eng 英語']);
	aryCountry.push(['enk 英國','eng 英語']);
	aryCountry.push(['ko 韓國(南韓)','kor 韓語']);
	aryCountry.push(['kn 朝鮮(北韓)','kor 韓語']);
	aryCountry.push(['vm 越南','vie 越南文']);
	aryCountry.push(['gw 德國','ger 德語']);
	aryCountry.push(['it 義大利','ita 義大利文']);
	aryCountry.push(['sp 西班牙','spa 西班牙文']);
	aryCountry.push(['hu 匈牙利','hun 匈牙利文']);
	aryCountry.push(['po 葡萄牙','por 葡萄牙文']);
	aryCountry.push(['ne 荷蘭','dut 荷蘭文']);
	aryCountry.push(['be 比利時','fre 法語']);
	aryCountry.push(['no 挪威','nor 挪威文']);
	aryCountry.push(['xr 捷克','ces 捷克文']);
	aryCountry.push(['ru 俄羅斯','rus 俄文']);
	aryCountry.push(['sw 瑞典','swe 瑞典文']);
	aryCountry.push(['fi 芬蘭','fin 芬蘭文']);
	aryCountry.push(['dk 丹麥','dan 丹麥文']);
	aryCountry.push(['rm 羅馬尼亞','rum 羅馬尼亞文']);
	aryCountry.push(['th 泰國','tha 泰文']);
	aryCountry.push(['my 馬來西亞','mas 馬來文']);
	aryCountry.push(['io 印尼','idn 印尼文']);
	aryCountry.push(['ii 印度','ind 印文']);
	aryCountry.push(['br 緬甸','bur 緬甸文']);
	aryCountry.push(['ph 菲律賓','phi 菲律賓文']);
	aryCountry.push(['cb 柬埔寨','cam 柬埔寨文']);
	aryCountry.push(['ts 阿拉伯聯合大公國','ara 阿拉伯文']);
	aryCountry.push(['ls 寮國','lao 寮語']);
	var strCountry = bib008a15.value;
	let imax = aryCountry.length;
	for(i=0;i<imax;i++) {
		bib008a35.value = aryCountry[i][0] === strCountry ? aryCountry[i][1] : bib008a35.value;
	}
	view008();
}

function tollMulLangCheck() {
	if (chkMulLang.checked === true) {
		lbl040a.innerHTML = '雙語對照：' + bib041b.value;
		if (box546a.value === '' || box546a.value.indexOf('對照',0) !== 0-1) {
			var strTemp1 = bib008a35.value.slice(bib008a35.value.indexOf(' ',0));
			var strTemp2 = bib041b.value.slice(bib041b.value.indexOf(' ',0));
			box546a.value = strTemp1.substr(1,1) + strTemp2.substr(1,1) + '對照';
		}
	} else if (chkMulLang.checked === false) {
		lbl040a.innerHTML = '&nbsp;';
		if (box546a.value.indexOf('對照',0) !== 0-1) box546a.value = '';
	}
}

function check504() {
	//判斷變色欄位
	let strCheck = box500a.value + box504a.value;
	let strbib008a2427 = document.querySelector('#bib008a24').value +
		document.querySelector('#bib008a25').value +
		document.querySelector('#bib008a26').value +
		document.querySelector('#bib008a27').value;
	let if008a2427 = 0; // 判斷008/24-27是否含b 書目
	if008a2427 = strbib008a2427.indexOf('b',0) === 0-1 ? 0 : 1;

	let if500bib = 0; // 判斷500/504段是否含參考書目
	if500bib = strCheck.indexOf('參考',0) === 0-1 ? 0 : 1;
	if500bib = strCheck.indexOf('bibliog',0) === 0-1 ? if500bib : 1;

	let if008a31 = 0; // 判斷008/31是否為1 含索引
	if008a31 = document.querySelector('#bib008a31').value === '0' ? 0 : 1;

	let if500index = 0; // 判斷500/504段是否含索引
	if500index = strCheck.indexOf('索引',0) === 0-1 ? 0 : 1;
	if500index = strCheck.indexOf('index',0) === 0-1 ? if500index : 1;

	if (if008a2427 + if500bib !== 1 && if008a31 + if500index !== 1) {
		document.getElementById('bib008a24').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('bib008a25').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('bib008a26').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('bib008a27').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('box500a').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('sel500a').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('box504a').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('sel504a').style.backgroundColor = 'var(--bg-color)';
	}
	if (if008a2427 + if500bib === 1) {
		document.getElementById('bib008a24').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('bib008a25').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('bib008a26').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('bib008a27').style.backgroundColor = 'var(--lightpink-bg)';
	}
	if (if008a31 + if500index === 1) {
		document.getElementById('box500a').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('sel500a').style.backgroundColor = 'var(--lightpink-bg)';
	}
	if (if008a2427 + if500bib === 1 || if008a31 + if500index === 1) {
		document.getElementById('box504a').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('sel504a').style.backgroundColor = 'var(--lightpink-bg)';
	}

	if (if008a31 + if500index === 1) {
		document.getElementById('bib008a31').style.backgroundColor = 'var(--lightpink-bg)';
	}
	if (if008a31 + if500index !== 1) {
		document.getElementById('bib008a31').style.backgroundColor = 'var(--bg-color)';
	}

	let strbib008aIll = document.querySelector('#bib008aIll1').value +
		document.querySelector('#bib008aIll2').value +
		document.querySelector('#bib008aIll3').value +
		document.querySelector('#bib008aIll4').value;
	let if008aIll = 0; // 判斷008Ill是否為####
	if008aIll = strbib008aIll === '####' ? 0 : 1;
	let if300b = 0; // 判斷300$b是否有內容
	if300b = box300b.value === '' ? 0 : 1;

	if (if008aIll + if300b === 1) {
		document.getElementById('bib008aIll1').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('bib008aIll2').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('bib008aIll3').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('bib008aIll4').style.backgroundColor = 'var(--lightpink-bg)';
		document.getElementById('box300b').style.backgroundColor = 'var(--lightpink-bg)';
	} else if (if008aIll + if300b !== 1) {
		document.getElementById('bib008aIll1').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('bib008aIll2').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('bib008aIll3').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('bib008aIll4').style.backgroundColor = 'var(--bg-color)';
		document.getElementById('box300b').style.backgroundColor = 'var(--bg-color)';
	}

	let if084b = 0; // 判斷作者號是否含?
	if084b = box084b.value.indexOf('?',0) === 0-1 ? 0 : 1;
	if (if084b === 1) {
		document.getElementById('box084b').style.backgroundColor = 'var(--lightpink-bg)';
	} else if (if084b !== 1) {
		document.getElementById('box084b').style.backgroundColor = 'var(--bg-color)';
	}
}

function switch653() {
	//圖書類型
	if (document.getElementById('GroupBook').style.display !== 'none') {
		var strBib22 = document.querySelector('#bib008a22').value;
		var strBib35 = bib008a35.value.substr(0,3);
		if (strBib35 === 'chi') {
			if (strBib22 === 'e') document.querySelector('#cbx653a').value = 'Book';
			if (strBib22 === 'a') document.querySelector('#cbx653a').value = 'KB';
			if (strBib22 === 'b') document.querySelector('#cbx653a').value = 'K';
			if (strBib22 === 'c') document.querySelector('#cbx653a').value = 'K';
			if (strBib22 === 'd') document.querySelector('#cbx653a').value = 'Y';
			if (bib008a35.value.trim() === 'chi 簡體中文') document.querySelector('#cbx653a').value = 'SC';
		} else if (strBib35 === 'eng') {
			if (strBib22 === 'e') document.querySelector('#cbx653a').value = 'F';
			if (strBib22 === 'a') document.querySelector('#cbx653a').value = 'KF';
			if (strBib22 === 'b') document.querySelector('#cbx653a').value = 'KF';
			if (strBib22 === 'c') document.querySelector('#cbx653a').value = 'KF';
			if (strBib22 === 'd') document.querySelector('#cbx653a').value = 'F';
		} else if (strBib35 !== 'eng') {
			var strAdu = strBib35.toUpperCase();
			var strEul = 'JPN|THA|MAS|KOR|IND|VIE|BUR|FRE|GER|HIN|SPA|HUN|PHI|CAM|LAO|ARA|POR|DUT|CZE|';
			var intFind = strEul.indexOf(strAdu,0);
			if (intFind === 0-1) strAdu = 'F';
			if (strBib22 === 'e') document.querySelector('#cbx653a').value = strAdu;
			if (strBib22 === 'a') document.querySelector('#cbx653a').value = 'K' + strAdu;
			if (strBib22 === 'b') document.querySelector('#cbx653a').value = 'K' + strAdu;
			if (strBib22 === 'c') document.querySelector('#cbx653a').value = 'K' + strAdu;
			if (strBib22 === 'd') document.querySelector('#cbx653a').value = strAdu;
		}
	}
	// 期刊類型
	if (document.getElementById('GroupPeri').style.display !== 'none') document.querySelector('#cbx653a').value = 'P';
	// 電子書類型
	if (document.getElementById('GroupeBook').style.display !== 'none') document.querySelector('#cbx653a').value = 'EBook';
	// 錄音資料類型
	if (document.getElementById('GroupAudio').style.display !== 'none') {
		let str653Temp = document.querySelector('#cbx020DVD').value;
		document.querySelector('#cbx653a').value = str653Temp;
		cbx300c.value = '4 3/4吋';
		if (str653Temp === 'CD') box300b.value = '數位, 立體聲'; //表現方式
		if (str653Temp === 'SB') box300b.value = '數位, 立體聲'; //表現方式
		if (str653Temp === 'LP') {
			box300b.value = '類比, 立體聲'; //表現方式
			cbx300c.value = '12吋';
		}
	}
	// 視聽資料類型
	if (document.getElementById('GroupDVDs').style.display !== 'none') {
		let str653Temp = document.querySelector('#cbx020DVD').value;
		document.querySelector('#cbx653a').value = 'AV';
		cbx300c.value = '4 3/4吋';
		if (str653Temp === 'DVD') box300b.value = '有聲, 彩色'; //表現方式
		if (str653Temp === 'VCD') box300b.value = '有聲, 彩色'; //表現方式
		if (str653Temp === 'BD') box300b.value = '有聲, 彩色'; //表現方式
	}
	// 遊戲類型
	if (document.getElementById('GroupToys').style.display !== 'none') document.querySelector('#cbx653a').value = 'TOY';
	toolRenewLocal('box653a');
}

function switch260a() {
	let strTemp = bib008a15.value.substr(0,3);
	let stsrReturn = '';
	let aryTemp = [];
	aryTemp.push(['ch ','']);
	aryTemp.push(['cc ','']);
	aryTemp.push(['jp ','']);
	aryTemp.push(['fr ','France']);
	aryTemp.push(['nyu','United States']);
	aryTemp.push(['wau','United States']);
	aryTemp.push(['enk','United Kingdom']);
	aryTemp.push(['ko ','Korea (South)']);
	aryTemp.push(['kn ','Korea (North)']);
	aryTemp.push(['vm ','Vietnam']);
	aryTemp.push(['gw ','Germany']);
	aryTemp.push(['it ','Italy']);
	aryTemp.push(['sp ','Spain']);
	aryTemp.push(['hu ','Hungary']);
	aryTemp.push(['po ','Portugal']);
	aryTemp.push(['ne ','Netherlands']);
	aryTemp.push(['be ','Belgium']);
	aryTemp.push(['no ','Norway']);
	aryTemp.push(['xr ','Czech Republic']);
	aryTemp.push(['ru ','Russia']);
	aryTemp.push(['sw ','Sweden']);
	aryTemp.push(['fi ','Finland']);
	aryTemp.push(['dk ','Belgium']);
	aryTemp.push(['rm ','Romania']);
	aryTemp.push(['th ','Thailand']);
	aryTemp.push(['my ','Malaysia']);
	aryTemp.push(['io ','Indonesia']);
	aryTemp.push(['ii ','India']);
	aryTemp.push(['br ','Burma']);
	aryTemp.push(['ph ','Philippines']);
	aryTemp.push(['cb ','Cambodia']);
	aryTemp.push(['ts ','United Arab Emirates']);
	aryTemp.push(['ls ','Laos']);
	let imax = aryTemp.length;
	for (i=0;i<imax;i++) {
		if (strTemp === aryTemp[i][0]) strReturn = aryTemp[i][1];
	}
	box260a.value = strReturn;
}

function switch546() {
	let strTemp = bib008a35.value.substr(0,3);
	let strReturn = '';
	let aryTemp = [];
	aryTemp.push(['chi','']);
	aryTemp.push(['jpn','內容為日文']);
	aryTemp.push(['eng','']);
	aryTemp.push(['fre','In French']);
	aryTemp.push(['kor','In Korean']);
	aryTemp.push(['bur','In Burmese']);
	aryTemp.push(['vie','In Vietnamese']);
	aryTemp.push(['ind','In Indonesian']);
	aryTemp.push(['tha','In Thai']);
	aryTemp.push(['ara','In Arabic']);
	aryTemp.push(['phi','In Filipino']);
	aryTemp.push(['mas','In Malay']);
	aryTemp.push(['spa','In Spanish']);
	aryTemp.push(['hun','In Hungarian']);
	aryTemp.push(['hin','In Indian']);
	aryTemp.push(['cam','In Cambodian']);
	aryTemp.push(['lao','In Lao']);
	aryTemp.push(['ara','In Arabic']);
	aryTemp.push(['por','In Portuguese']);
	aryTemp.push(['dut','In Dutch']);
	aryTemp.push(['cze','In Czech']);
	aryTemp.push(['gre','In German']);
	aryTemp.push(['zxx','']);
	aryTemp.push(['###','']);
	aryTemp.push(['mul','']);
	aryTemp.push(['sgn','']);
	aryTemp.push(['und','']);
	let imax = aryTemp.length;
	for (i=0;i<imax;i++) {
		if (strTemp === aryTemp[i][0]) strReturn = aryTemp[i][1];
	}
	if (box546a.value.substr(0,3) !== 'In ' && box546a.value !== '') {
		if (box546a.value !== '內容為日文' && box546a.value !== '簡體字本') strReturn = box546a.value.trim();
	}
	if (strTemp === 'chi' && bib008a15.value === 'cc 中國') strReturn = '簡體字本'
	box546a.value = strReturn;
	// 同時變更240l
	box240l.value = strReturn.replace(/In /g,'');
	if (strTemp === 'chi') box240l.value = '中文';
	if (strTemp === 'chi' && bib008a15.value === 'cc 中國') box240l.value = '簡體中文';
	if (strTemp === 'jpn') box240l.value = '日文';
	if (strTemp === 'eng') box240l.value = 'English';
	switch260a();
}