function Show020vol() {
	var strOutput = lbl020qvl.innerHTML;
	var strHvl = box020Hvl.value;
	var strNvl = box020Nvl.value;
	if (!(strHvl === "") && !(strNvl === "")) {
		strOutput = strHvl.replace('?', strNvl);
	}
	lbl020qvl.innerHTML = strOutput;
}

function tool020Add(strFrom) {
	let str020cAll = '';
	let strVolume = ' ';
	if (window.localStorage.getItem('Book020cAll') !== '') str020cAll = window.localStorage.getItem('Book020cAll');
	if (box020a.value + box020c.value + box020q.value !== '') {
		if (btn020Down.innerHTML.indexOf('▼',0) !== 0-1) {
			document.getElementById('btn020Down').click();
		}
		var strThisLine = '';
		var strNumber = box020Nvl.value;

		if (strNumber !== '') {
			if (chkN2CTA.checked) {
				strNumber = GetNum(strNumber, 'A');
			} else if (chkN2CTB.checked) {
				strNumber = GetNum(strNumber, 'B');
			}
		}

		if (cbx020Head.value === 'ISBN') {
			strThisLine = '020    ';
			strThisLine = box020a.value === '' ? strThisLine : strThisLine + '|a' + box020a.value;
			strThisLine = box020q.value === '' ? strThisLine : strThisLine + '|q(' + box020q.value + ')';
			if (strFrom === 'fillCMARC' || strFrom === 'fillMARC21') {
				strVolume = box020q.value.split(' ; |q')[0];
				strVolume = strVolume.replace(/第/g, '');
				strVolume = strVolume.replace(/冊/g, '');
				strVolume = strVolume.replace(/卷/g, '');
				strVolume = strVolume.replace(/編/g, '');
				strVolume = strVolume.replace(/集/g, '');
				strVolume = strVolume.replace(/套/g, '');
				strVolume = strVolume.replace(/年/g, '');
				//console.log(strVolume);
			}
			if (strFrom === 'input') strVolume = box020Nvl.value;
			strThisLine = strNumber === '' ? strThisLine : strThisLine.replace('|q(', '|q(' + box020Hvl.value.replace('?', strNumber) + ' ; |q');
			strThisLine = box020c.value === '' ? strThisLine : strThisLine + ' : |cNT$' + box020c.value;
		} else if (cbx020Head.value === 'EAN') {
			if (box020q.value + box020c.value !== '') {
				strThisLine = '020    ';
				strThisLine = box020q.value === '' ? strThisLine : strThisLine + '|q(' + box020q.value + ')';
				strThisLine = strNumber === '' ? strThisLine : strThisLine.replace('|q(', '|q(' + box020Hvl.value.replace('?', strNumber) + ' ; |q');
				strThisLine = box020c.value === '' ? strThisLine : strThisLine + ' : |cNT$' + box020c.value;
			}
			if (strThisLine !== '') strThisLine += '\n';
			strThisLine += '024 3  |a' + box020a.value.trim();
		} else if (cbx020Head.value === 'ISSN') {
			if (box020a.value !== '') strThisLine = '022    |a' + box020a.value.trim() + '\n';
			if (box020c.value + box020q.value !== '') strThisLine += '037    '
			if (box020c.value !== '') {
				strThisLine += '|cNT$' + box020c.value;
				localStorage.setItem('Book020c', box020c.value.trim());
			}
			if (box020q.value !== '') strThisLine += ' (' + box020q.value + ')';
		}
		var strOut020all = box020ALL.value;
		strOut020all = strOut020all === '' ? strThisLine : strOut020all + '\n' + strThisLine;
		box020ALL.value = strOut020all;
		if (str020cAll !== '') str020cAll += '\n';
		str020cAll += strVolume + '\t' + box020c.value.trim();
		box020Nvl.value = (isNaN(box020Nvl.value) || box020Nvl.value === '') ? box020Nvl.value : Number(box020Nvl.value) + 1
	}
	box020a.value = '';
	if (strFrom !== 'input') box020q.value = '';
	if (strFrom !== 'input') box020c.value = '';
	Show020vol();
	window.localStorage.setItem('Book020cAll', str020cAll);
}

function GetNum(numTmp, strTmp) {
    var w = new Array(10);
    var z = new Array(10);
    var r = new Array(10);
    var Result = "";

    if (parseFloat(numTmp) > 0) {
        Result = numTmp.trim();
        switch (strTmp) {
            case "A":
                for (var i = 1; i <= numTmp.length; i++) {
                    w[i] = numTmp.charAt(i - 1);
                    if (w[i] == "0") r[i] = "零";
                    if (w[i] == "1") r[i] = "壹";
                    if (w[i] == "2") r[i] = "貳";
                    if (w[i] == "3") r[i] = "參";
                    if (w[i] == "4") r[i] = "肆";
                    if (w[i] == "5") r[i] = "伍";
                    if (w[i] == "6") r[i] = "陸";
                    if (w[i] == "7") r[i] = "柒";
                    if (w[i] == "8") r[i] = "捌";
                    if (w[i] == "9") r[i] = "玖";
                }
                z[8] = "千萬";
                z[7] = "百萬";
                z[6] = "拾萬";
                z[5] = "萬";
                z[4] = "千";
                z[3] = "百";
                z[2] = "拾";
                Result = "";
                var L = numTmp.length;
                for (var i = 1; i <= numTmp.length; i++) {
                    Result = Result + r[i] + z[L];
                    L = L - 1;
                }
                Result = Result.replace(/拾拾/g, "拾");
                Result = Result.replace(/拾零/g, "拾");
                break;
            case "B":
                for (var i = 1; i <= numTmp.length; i++) {
                    w[i] = numTmp.charAt(i - 1);
                    if (w[i] == "0") r[i] = "○";
                    if (w[i] == "1") r[i] = "一";
                    if (w[i] == "2") r[i] = "二";
                    if (w[i] == "3") r[i] = "三";
                    if (w[i] == "4") r[i] = "四";
                    if (w[i] == "5") r[i] = "五";
                    if (w[i] == "6") r[i] = "六";
                    if (w[i] == "7") r[i] = "七";
                    if (w[i] == "8") r[i] = "八";
                    if (w[i] == "9") r[i] = "九";
                }
                z[8] = "千萬";
                z[7] = "百萬";
                z[6] = "拾萬";
                z[5] = "萬";
                z[4] = "千";
                z[3] = "百";
                z[2] = "十";
                Result = "";
                var L = numTmp.length;
                for (var i = 1; i <= numTmp.length; i++) {
                    Result = Result + r[i] + z[L];
                    L = L - 1;
                }
                break;
        }
    } else {
        Result = numTmp.trim();
    }

    Result = Result.replace(/十十/g, "十");
    Result = Result.replace(/十○/g, "十");
    Result = Result.replace(/一十/g, "十");
    Result = Result.replace(/undefined/g, "");

    return Result;
}

function toolEntry(strTemp) {
	let strCODE = bib008a35.value.substr(0,3);
	let strID = localStorage.getItem('650ID') || '650a';
	if (strCODE === 'jpn') strCODE = 'chi';
	let regex = strCODE === 'chi' ? ',' : '\|\|';
	let strReturn = '';
	if (strTemp === 'fillEntry') {
		strReturn = peastEntry.value.replace(/\n/g, regex);
		document.getElementById(strID).value = strReturn;
	}
	if (strTemp === 'fillFromBot') {
		let strFromBot = peastEntry.value.replace(/\=650\s\s\\0/g,'');
		let aryTemp = strFromBot.split('\n');
		for (var i=0;i<aryTemp.length;i++) {
			aryTemp[i] = aryTemp[i].trim();
			aryTemp[i] = aryTemp[i].replace(/\s*\$/g,'$');
			aryTemp[i] = aryTemp[i].replace(/\=650/g,'');
			aryTemp[i] = aryTemp[i].replace(/650\_0/g,'');
			aryTemp[i] = aryTemp[i].replace(/650\_1/g,'');
			aryTemp[i] = aryTemp[i].replace(/\s*\|/g,'|');
			aryTemp[i] = aryTemp[i].replace(/\$a/g,'');
			aryTemp[i] = aryTemp[i].replace(/\|a\s/g,'');
			aryTemp[i] = aryTemp[i].replace(/\|a/g,'');
			aryTemp[i] = aryTemp[i].replace(/\$z/g,'|z');
			aryTemp[i] = aryTemp[i].replace(/\$x/g,'|x');
			aryTemp[i] = aryTemp[i].replace(/\$v/g,'|v');
			aryTemp[i] = aryTemp[i].replace(/\$y/g,'|y');
			aryTemp[i] = aryTemp[i].replace(/\$d/g,'|d');
			aryTemp[i] = aryTemp[i].replace(/\|z\s/g,'|z');
			aryTemp[i] = aryTemp[i].replace(/\|x\s/g,'|x');
			aryTemp[i] = aryTemp[i].replace(/\|v\s/g,'|v');
			aryTemp[i] = aryTemp[i].replace(/\|y\s/g,'|y');
			aryTemp[i] = aryTemp[i].replace(/\|d\s/g,'|d');
			aryTemp[i] = aryTemp[i].replace('650   0 ','');
			if (aryTemp[i].slice(-1) === '.') aryTemp[i] = aryTemp[i].slice(0,-1);
			if (strReturn !== '') strReturn += '\n';
			strReturn += aryTemp[i];
		}
		peastEntry.value = strReturn;
	}

}

function toolAuthor() {
	var strInputName = boxAuthor245c_ch.value.trim().split('|d')[0];
	var str245c = '';
	var strFillto = localStorage.getItem('Fillto');
	var intFocusStart = document.getElementById(strFillto).selectionStart;
	var intFocusEnd = document.getElementById(strFillto).selectionEnd;
	if (boxAuthor245c_ch.value !== '' && boxAuthor245c_en.value !== '') strInputName = boxAuthor245c_ch.value.split('|d')[0] + '(' + boxAuthor245c_en.value + ')';
	if (boxAuthor245c_ch.value === '' && boxAuthor245c_en.value !== '') strInputName = boxAuthor245c_en.value;
	// if (boxAuthor245c_en.value !== '') {
		// strInputName = strInputName + '(' + boxAuthor245c_en.value.trim() + ')';
	// }
	str245c = strInputName;
	if (boxAuthor100d.value !== '') {
		str245c += '\|d' + boxAuthor100d.value.trim();
	}
	var aryInputName = [];
	var strThisLine = '';
	
	if (boxAuthorKor.value !== '') {
		//韓國名英譯
		var aryKor = boxAuthorKor.value.split(' ');
			var jmax = aryKor.length - 1;
			strThisLine = `${boxAuthor245c_ch.value.trim()}(${aryKor[jmax]}`;
			for (j=0;j<jmax;j++) {
				if (strThisLine !== '') strThisLine += ' ';
				strThisLine += aryKor[j].trim();
			}
			strThisLine += `)`;
			aryInputName.push(strThisLine);
	}
	if (boxAuthor100b.value !== '') {
		//另譯為
		strThisLine = boxAuthor100b.value.trim();
		if (boxAuthor245c_en.value !== '') strThisLine += '(' + boxAuthor245c_en.value.trim() + ')';
		if (boxAuthor100d.value !== '') strThisLine += '\|d' + boxAuthor100d.value.trim();
		aryInputName.push(strThisLine);
	}
	if (boxAuthor400a.value + boxAuthor400b.value !== '') aryInputName.push(str245c);
	if (boxAuthor400a.value !== '') {
		//本名
		var ary400a = boxAuthor400a.value.split(',');
			var imax = ary400a.length;
			for (i=0;i<imax;i++) {
			strThisLine = ary400a[i].trim();
			if (boxAuthor245c_en.value !== '') strThisLine += '(' + boxAuthor245c_en.value.trim() + ')';
			if (boxAuthor100d.value !== '') strThisLine += '\|d' + boxAuthor100d.value.trim();
			aryInputName.push(strThisLine);
		}
	}
	if (boxAuthor400b.value !== '') {
		//筆名|別名
		var ary400b = boxAuthor400b.value.split(',');
			var jmax = ary400b.length;
			for (j=0;j<jmax;j++) {
			strThisLine = ary400b[j].trim();
			if (boxAuthor245c_en.value !== '') strThisLine += '(' + boxAuthor245c_en.value.trim() + ')';
			if (boxAuthor100d.value !== '') strThisLine += '\|d' + boxAuthor100d.value.trim();
			aryInputName.push(strThisLine);
		}
	}
	
	var strAuthorNames = '';
	for (k=0;k<aryInputName.length;k++) {
		strAuthorNames = strAuthorNames === '' ? '\{' + aryInputName[k] : strAuthorNames + '\|\|' + aryInputName[k];
	}
	strAuthorNames = strAuthorNames === '' ? '' : strAuthorNames + '\}';
	strInputName += strAuthorNames;
	//填入作者名
	if (aryInputName.length === 0) {
		strThisLine = boxAuthor245c_ch.value.trim();
		if (boxAuthor100d.value !== '') {
			strThisLine += '\|d' + boxAuthor100d.value.trim();
			strInputName = strThisLine;
		}
	}
	if (intFocusStart === intFocusEnd) {
		document.getElementById(strFillto).value = document.getElementById(strFillto).value === '' ? strInputName : document.getElementById(strFillto).value + ',' + strInputName;}
	if (intFocusStart !== intFocusEnd) {
		document.getElementById(strFillto).focus(); 
		document.getElementById(strFillto).setRangeText(strInputName, intFocusStart, intFocusEnd, 'select');
	}
	//填入500段
	if (boxAuthor100b.value + boxAuthor400a.value + boxAuthor400b.value !== '') {
		var str500a = '';
		var ary245cCH = boxAuthor245c_ch.value.split('.');
		str500a = ary245cCH[ary245cCH.length - 1];
		if (str500a === '' && boxAuthor245c_en.value !=='') str500a = boxAuthor245c_en.value.trim();
		str500a = boxAuthor100b.value !== '' ? str500a + '另譯為' + boxAuthor100b.value : str500a;
		str500a = boxAuthor400a.value !== '' ? str500a + '本名' + boxAuthor400a.value : str500a;
		str500a = boxAuthor400b.value !== '' ? str500a + '筆名' + boxAuthor400b.value : str500a;
		str500a = str500a.replace(/\,/g,', ');
		str500a = str500a.replace(/\s\s/g,' ');
		box500a.value = box500a.value === '' ? str500a : box500a.value + '\n' + str500a;
	}
	if (strFillto === 'box100a') ButtFiveCode();
}

function selBxChange(strTemp1, strTemp2, strTemp3) {
	var mySelect = document.getElementById(strTemp2);
	var myIndex = document.getElementById(strTemp2).selectedIndex;
	if (myIndex === -1) myIndex = 0;
	if (strTemp3 === 0) {
		//複合式選單改變內容
		document.getElementById(strTemp1).value = document.getElementById(strTemp2).options[myIndex].text;
	}
	if (strTemp3 === 1) {
		//複合式選單插入內容
		var intFocusStart = document.getElementById(strTemp1).selectionStart;
		var intFocusEnd = document.getElementById(strTemp1).selectionEnd;
		var strRange = document.getElementById(strTemp2).options[myIndex].text;
		document.getElementById(strTemp1).focus(); 
		document.getElementById(strTemp1).setRangeText(strRange, intFocusStart, intFocusEnd, 'select');
	}
	if (strTemp3 === 2) {
		//複合式選單附加內容(以逗號分隔)
		var strGot65x = document.getElementById(strTemp1).value;
		document.getElementById(strTemp1).value = strGot65x === '' ? document.getElementById(strTemp2).options[myIndex].text : strGot65x + ',' + document.getElementById(strTemp2).options[myIndex].text;
	}
	if (strTemp3 === 3) {
		//複合式選單附加內容(以分行符號分隔)
		var strGot500 = document.getElementById(strTemp1).value;
		var strOut500 = document.getElementById(strTemp2).options[myIndex].text;
		strOut500 = strOut500 === '譯自 : [自動帶入]' ? strOut500.replace('[自動帶入]', box240a.value) : strOut500;
		if (strOut500 === '作者號取自[第1作者]') {
			var strC100a = cbx100a.value;
			if (strC100a.length === 1) strC100a = strC100a + '者';
			strOut500 = strOut500.replace('[第1作者]', strC100a);
		}
		if (strOut500 === '作者號取自[第2作者]') {
			var strC700D = cbx700D.value;
			if (strC700D.length === 1) strC700D = strC700D + '者';
			strOut500 = strOut500.replace('[第2作者]', strC700D);
		}
		if (strOut500 === '作者號取自[第3作者]') {
			var strC700T = cbx700T.value;
			if (strC700T.length === 1) strC700T = strC700T + '者';
			strOut500 = strOut500.replace('[第3作者]', strC700T);
		}
		document.getElementById(strTemp1).value = strGot500 === '' ? strOut500 : strGot500 + '\n' + strOut500;
	}
	if (strTemp3 === 4) {
		//複合式選單改變value
		document.getElementById(strTemp1).value = document.getElementById(strTemp2).value;
	}
}

function sel041hChange() {
	if (box041h.value !== '') document.getElementById('box240a').disabled = false;
	if (box041h.value === '') document.getElementById('box240a').disabled = true;
}

function showYearT() {
	//換算年號為西元年
	var str264c = box260c.value;
	if (str264c !== '') {
		//計算出版年
		var aryDate1 = str264c.split('.');
		if (Number(aryDate1[0]) < 1725) {
			Nen2Year('box260c');
		}
	}

	//計算版權年
	var str264cC = box260cC.value;
	if (str264cC !== '') {
		var aryDate2 = str264cC.split('.');
		if (Number(aryDate2[0]) < 1725) {
			Nen2Year('box260cC');
		}
	}
	document.querySelector('#cbxYearT').value = '西元年';
	view008();
}

function Nen2Year(strTemp) {
	//將年號換算為西元年
	var aryDate3 = document.getElementById(strTemp).value.split('.');
	var intNen = Number(aryDate3[0]);
	var aryYears = [];
	aryYears[0] = ['民國年','999','民國','1911'];
	aryYears[1] = ['令和','999','日本','2018'];
	aryYears[2] = ['平成','31','日本','1988'];
	aryYears[3] = ['昭和','64','日本','1925'];
	aryYears[4] = ['大正','15','日本','1911'];
	aryYears[5] = ['明治','45','日本','1867'];
	aryYears[6] = ['主體曆','999','韓國','1911'];
	aryYears[7] = ['宣統','3','清朝','1908'];
	aryYears[8] = ['光緒','34','清朝','1874'];
	aryYears[9] = ['同治','13','清朝','1861'];
	aryYears[10] = ['咸豐','11','清朝','1850'];
	aryYears[11] = ['道光','30','清朝','1820'];
	aryYears[12] = ['嘉慶','25','清朝','1794'];
	aryYears[13] = ['乾隆','64','清朝','1735'];
	var strCountry = document.querySelector('#cbxYearT').value;
	var imax = 14;
	for(i=0; i<imax; i++) {
		if (strCountry === aryYears[i][0]) {
			if (intNen > aryYears[i][1]) {
				var strTemp2 = aryYears[i][0] + '只有' + aryYears[i][1] + '年，請查明後重新輸入！';
				alert(strTemp2);
			} else if (intNen <= aryYears[i][1]) {
				intNen = intNen + Number(aryYears[i][3]);
				var strToday = new Date();
				var strYear = strToday.getFullYear().toString();
				if (intNen > Number(strYear)) {
					strTemp2 = '計算結果：西元' + intNen + '年，您輸入的年號變成未來出版物了，請查明後重新輸入！'
					alert(strTemp2);
				} else if (intNen <= Number(strYear)) {
					if (aryDate3.length === 1) {
						document.getElementById(strTemp).value = intNen;
					} else if (aryDate3.length === 2) {
						document.getElementById(strTemp).value = intNen + '.' + aryDate3[1];
					}
				}
			}
		}
	}
}

function switch338(strItem1, strItem2) {
	//依337內容切換338
	var str337 = document.querySelector('#'+strItem1).value;
	var aryOptionItems = [];
	if (str337 === 's') {
		aryOptionItems.push(['sg audio cartridge/匣式錄音帶','sg',false]);
		aryOptionItems.push(['se audio cylinder/圓形錄音筒','se',false]);
		aryOptionItems.push(['sd audio disc/唱片','sd',true]);
		aryOptionItems.push(['si sound track reel/盤式音軌帶','si',false]);
		aryOptionItems.push(['sq audio roll/錄音捲帶','sq',false]);
		aryOptionItems.push(['sw audio wire reel/[國圖未譯]','sw',false]);
		aryOptionItems.push(['ss audiocassette/卡式錄音帶','ss',false]);
		aryOptionItems.push(['st audiotape reel/盤式錄音帶','st',false]);
		aryOptionItems.push(['sz other/其他','sz',false]);
	}
	if (str337 === 'c') {
		aryOptionItems.push(['ck computer card/電腦卡','ck',false]);
		aryOptionItems.push(['cb computer chip cartridge/電腦晶片匣','cb',false]);
		aryOptionItems.push(['cd computer disc/電腦磁片','cd',true]);
		aryOptionItems.push(['ce computer disc cartridge/電腦磁片匣','ce',false]);
		aryOptionItems.push(['ca computer tape cartridge/電腦磁帶匣','ca',false]);
		aryOptionItems.push(['cf computer tape cassette/電腦卡式磁帶','cf',false]);
		aryOptionItems.push(['ch computer tape reel/電腦盤式磁帶','ch',false]);
		aryOptionItems.push(['cr online resource/線上資源','cr',false]);
		aryOptionItems.push(['cz other/其他','cz',false]);
	}
	if (str337 === 'h') {
		aryOptionItems.push(['ha aperture card/孔卡','ha',false]);
		aryOptionItems.push(['he microfiche/微縮單片','he',true]);
		aryOptionItems.push(['hf microfiche cassette/卡式微縮單片','hf',false]);
		aryOptionItems.push(['hb microfilm cartridge/匣式微縮單片','hb',false]);
		aryOptionItems.push(['hc microfilm cassette/卡式微縮捲片','hc',false]);
		aryOptionItems.push(['hd microfilm reel/盤式微縮捲片','hd',false]);
		aryOptionItems.push(['hj microfilm roll/圓筒式微縮捲片','hj',false]);
		aryOptionItems.push(['hh microfilm slip/長條微縮片','hh',false]);
		aryOptionItems.push(['hg microopaque/不透明微縮片','hg',false]);
		aryOptionItems.push(['hz other/其他','hz',false]);
	}
	if (str337 === 'p') {
		aryOptionItems.push(['pp microscope slide/顯微幻燈片','pp',true]);
		aryOptionItems.push(['pz other/其他','pz',false]);
	}
	if (str337 === 'g') {
		aryOptionItems.push(['mc film cartridge/匣式電影片','mc',false]);
		aryOptionItems.push( ['mf film cassette/卡式電影片','mf',false]);
		aryOptionItems.push(['mr film reel/盤式電影片','mr',false]);
		aryOptionItems.push(['mo film roll/圓筒式電影片','mo',false]);
		aryOptionItems.push(['gd filmslip/條狀電影片','gd',false]);
		aryOptionItems.push(['gf filmstrip/幻燈捲片','gf',false]);
		aryOptionItems.push(['gc filmstrip cartridge/匣式幻燈捲片','gc',false]);
		aryOptionItems.push(['gt overhead transparency/投影片','gt',true]);
		aryOptionItems.push(['gc filmstrip cartridge/匣式幻燈捲片','gc',false]);
		aryOptionItems.push(['gt overhead transparency/投影片','gt',false]);
		aryOptionItems.push(['gs slide/幻燈單片','gs',false]);
		aryOptionItems.push(['mz other/其他','mz',false]);
	}
	if (str337 === 'e') {
		aryOptionItems.push(['eh stereograph card/立體呈像卡','eh',true]);
		aryOptionItems.push(['es stereograph disc/立體呈像碟片','es',false]);
		aryOptionItems.push(['ez other/其他','ez',false]);
	}
	if (str337 === 'v') {
		aryOptionItems.push(['vc video cartridge/匣式錄影帶','vc',false]);
		aryOptionItems.push(['vf videocassette/卡式錄影帶','vf',false]);
		aryOptionItems.push(['vd videodisc/影碟','vd',true]);
		aryOptionItems.push(['vr videotape reel/盤式錄影帶','vr',false]);
		aryOptionItems.push(['vz other/其他','vz',false]);
	}
	if (str337 === 'x') {
		aryOptionItems.push(['zu unspecified/未定','zu',true]);
	}
	if (str337 === 'z') {
		aryOptionItems.push(['zu unspecified/未定','zu',true]);
	}
	if (str337 === 'n') {
		aryOptionItems.push(['no card/卡片','no',false]);
		aryOptionItems.push(['nn flipchart/掛圖','nn',false]);
		aryOptionItems.push(['na roll/捲軸','na',false]);
		aryOptionItems.push(['nb sheet/單張','nb',false]);
		aryOptionItems.push(['nc volume/成冊','nc',true]);
		aryOptionItems.push(['nr object/實物','nr',false]);
		aryOptionItems.push(['nz other/其他','nz',false]);
	}
	//清空內容
	var select01 = document.getElementById(strItem2);
	select01.options.length = 0;
	//新增項目
	var jmax = aryOptionItems.length
	for(j = 0; j<jmax; j++) {
		select01.options.add(new Option(aryOptionItems[j][0], aryOptionItems[j][1], aryOptionItems[j][2]));
	}
}

function switch336CD() {
	//依附件類型切換附件336|337|338
	btnCDs.innerHTML = '▲';
	document.getElementById('Group336CD').style.display = '';
	var strCDs = document.querySelector('#cbxCDs').value;
	var ary336s = [];
	ary336s.push(['CD(演講、語言)/片','spw','s','sd','片','CD','光碟']);
	ary336s.push(['CD(音樂、歌曲)/片','prm','s','sd','片','CD','光碟']);
	ary336s.push(['MP3(演講、語言)/片','spw','c','cd','片','MP3','光碟']);
	ary336s.push(['MP3(音樂、歌曲)/片','prm','c','cd','片','MP3','光碟']);
	ary336s.push(['VCD/片','tdi','v','vd','片','VCD','光碟']);
	ary336s.push(['DVD/片','tdi','v','vd','片','DVD','光碟']);
	ary336s.push(['CD-ROM(CD、MP3混合)/片','spw','c','cd','片','CD-ROM','光碟']);
	ary336s.push(['CD-ROM(程式)/片','cop','c','cd','片','CD-ROM','光碟']);
	ary336s.push(['CD-ROM(PDF電子書)/片','txt','c','cd','片','CD-ROM','光碟']);
	ary336s.push(['紙型/張','sti','n','nb','張','紙型','紙型']);
	ary336s.push(['地圖/本','cri','n','nc','本','地圖','地圖']);
	ary336s.push(['地圖/張','cri','n','nb','張','地圖','地圖']);
	ary336s.push(['手冊/本','txt','n','nc','本','手冊','手冊']);
	ary336s.push(['捲軸/張','sti','n','na','張','捲軸','捲軸']);
	ary336s.push(['歌詞本/本','txt','n','nc','本','歌詞本','歌詞']);
	ary336s.push(['歌詞/張','txt','n','nb','張','歌詞','歌詞']);
	ary336s.push(['點讀筆/支','cop','e','ez','支','點讀筆','點讀筆']);
	ary336s.push(['卡片/張','txt','n','nb','張','卡片','卡片']);
	ary336s.push(['隨身碟(程式)/個','cop','c','cz','個','隨身碟','隨身碟']);
	ary336s.push(['隨身碟(PDF電子書)/個','txt','c','cz','個','隨身碟','隨身碟']);
	ary336s.push(['隨身碟(影片)/個','tdi','v','vz','個','隨身碟','隨身碟']);
	ary336s.push(['',' ',' ',' ','','','']);
	var imax = ary336s.length;
	for(i = 0; i<imax; i++) {
		if (ary336s[i][0] === strCDs) {
			document.querySelector('#cbx336b').value = ary336s[i][1];  //附件336段
			document.querySelector('#cbx337b').value = ary336s[i][2];  //附件337段
			switch338('cbx337b', 'cbx338b');
			document.querySelector('#cbx338b').value = ary336s[i][3];  //附件338段
			if (strCDs !== '') {
				box300e.value = '1' + ary336s[i][4] + ary336s[i][5]; //附件
				var strCut020q = box020q.value.split('附');
				if (ary336s[i][6] === '') box020q.value = strCut020q[0];
				if (ary336s[i][6] !== '') box020q.value = strCut020q[0] + '附' + ary336s[i][6]; //裝訂方式
			} else if (strCDs === '') {
				box300e.value = ''; //附件
				var strCut020q = box020q.value.split('附');
				box020q.value = strCut020q[0]; //裝訂方式
			}
		}
	}
}

function switch008336() {
	//依館藏類型切換附件336|337|338
	var ary336s = [];
	ary336s.push(['Book','txt','n','nc']);
	ary336s.push(['Peri','txt','n','nc']);
	ary336s.push(['eBook','txt','c','cr']);
	ary336s.push(['Audio','prm','s','sd']);
	ary336s.push(['DVDs','tdi','v','vd']);
	ary336s.push(['Toys','tdf','n','nr']);
	var strType = '';
	var displayBook = document.getElementById('GroupBook').style.display;
	var displayPeri = document.getElementById('GroupPeri').style.display;
	var displayeBook = document.getElementById('GroupeBook').style.display;
	var displayAudio = document.getElementById('GroupAudio').style.display;
	var displayDVDs = document.getElementById('GroupDVDs').style.display;
	var displayToys = document.getElementById('GroupToys').style.display;
	strType = displayBook !== 'none' ? 'Book' : strType;  // 圖書類型
	strType = displayPeri !== 'none' ? 'Peri' : strType;  // 期刊類型
	strType = displayeBook !== 'none' ? 'eBook' : strType;  // 電子書類型
	strType = displayAudio !== 'none' ? 'Audio' : strType;  // 錄音資料類型
	strType = displayDVDs !== 'none' ? 'DVDs' : strType;  // 視聽資料類型
	strType = displayToys !== 'none' ? 'Toys' : strType;  // 遊戲類型

	var imax = ary336s.length;
	for (i=0; i<imax; i++) {
		if (ary336s[i][0] === strType) {
			document.querySelector('#cbx336').value = ary336s[i][1];  //336段
			document.querySelector('#cbx337').value = ary336s[i][2];  //337段
			switch338('cbx337','cbx338');
			document.querySelector('#cbx338').value = ary336s[i][3];  //338段
		}
	}
}

function show594() {
	//取批次號
	var str594a1 = document.querySelector('#cbx594a1').value.split(' ');
	var str594a2 = document.querySelector('#cbx594a2').value;
	var str594a3 = document.querySelector('#cbx594a3').value.split(' ');
	var str594a4 = document.querySelector('#cbx594a4').value;
	var strToday = new Date();
	var strMonth = strToday.getMonth() + 1;
	strMonth = '0' + strMonth;
	strMonth = strMonth.slice(-2);
	var strA134 = str594a1[0] + str594a3[0] + str594a4;
	if (strA134 === 'DB') {
		box594a.value = str594a1[0] + '-' + str594a2 + '-AC-' + strMonth;
	} else if (strA134 !== 'DB') {
		box594a.value = str594a1[0] + '-' + str594a2 + '-' + str594a3[0] + '-' + str594a4;
	}
	localStorage.setItem('Book594a', box594a.value.trim());
}

function toolRenewLocal(strID) {
	if (strID === 'box020c') localStorage.setItem('Book020c', box020c.value.trim());
	if (strID === 'boxAV020c') localStorage.setItem('Book020c', boxAV020c.value.trim());
	if (strID === 'box084a') localStorage.setItem('Book084a', box084a.value.trim());
	if (strID === 'box084b') {
		var strTemp = box084b.value.trim();
		strTemp = strTemp.split('v.')[0].trim();
		localStorage.setItem('Book084b', strTemp);
	}
	if (strID === 'box594a') localStorage.setItem('Book594a', box594a.value.trim());
	if (strID === 'box653a') {
		var strTemp = document.querySelector('#cbx653a').value;
		if (strTemp !== '') localStorage.setItem('Book653a', strTemp);
		if (strTemp === '' || strTemp === ' ') localStorage.setItem('Book653a', 'Book');
	}
	if (strID === 'box300e') {
		if (box300e.value !== '') localStorage.setItem('HadCD', 'Yes');
		if (box300e.value === '') localStorage.setItem('HadCD', 'No');
	}
}

function ButtFiveCode() {
	//五筆取號
	if ('chi 中文|chi 簡體中文|jpn 日語'.indexOf(bib008a35.value,0) !== 0-1) {
		var strTemp = box100a.value;
		if (strTemp !== '') strTemp = strTemp + ',';
		strTemp = strTemp + box700D.value;
		if (strTemp !== '') strTemp = strTemp + ',';
		strTemp = strTemp + box700T.value;
		if (strTemp === '') strTemp = box245a.value.trim();
		var strAuthors = strTemp.split(',');
		var strFiveCode = '';
		var intFind = strAuthors[0].indexOf('{',0);
		if (intFind !== 0-1) strAuthors[0] = strAuthors[0].slice(intFind);
		strFiveCode = GotIsEng(strAuthors[0]) !== 0 ? returnFiveCode(strAuthors[0]) : '';
		box084b.value = strFiveCode;
		check504();
	}
	if ('chi 中文|chi 簡體中文|jpn 日語'.indexOf(bib008a35.value,0) === 0-1) {
		var str653Temp = document.querySelector('#cbx653a').value;
		if ('AV|CD|SB|LP|'.indexOf(str653Temp,0) !== -1) {
			var strTemp = box100a.value;
			if (strTemp !== '') strTemp = strTemp + ',';
			strTemp = strTemp + box700D.value;
			if (strTemp !== '') strTemp = strTemp + ',';
			strTemp = strTemp + box700T.value;
			if (strTemp === '') strTemp = box245a.value.trim();
			var strAuthors = strTemp.split(',');
			var strFiveCode = '';
			var intFind = strAuthors[0].indexOf('{',0);
			if (intFind !== 0-1) strAuthors[0] = strAuthors[0].slice(intFind);
			strFiveCode = GotIsEng(strAuthors[0]) !== 0 ? returnFiveCode(strAuthors[0]) : '';
			box084b.value = strFiveCode;
			check504();
		}
	}
}

function ButtGetPeo() {
	//顯示傳記取號tool
	var ifDisplay = document.getElementById('toolToolGetPeo').style.display;
	document.getElementById('toolToolGetPeo').style.display = ifDisplay === 'none' ? '' : 'none';
	if (box600a.value === '') {
		box084bPeo.value = '';
	} else if (box600a.value !== '') {
		var strTemp = box600a.value.split(',');
		box084bPeo.value = strTemp[0];
	}
}

function toolToolGetPeo(strYesNo) {
	//傳記取號
	document.getElementById('toolToolGetPeo').style.display='none';
	if(strYesNo === 'Yes') {
		if ('chi 中文|chi 簡體中文|jpn 日語'.indexOf(bib008a35.value,0) !== 0-1) {
			var strAuthors = box100a.value.split(',');
			var strPeo = box084bPeo.value;
			var strFiveCode = '';
			var intFind = strAuthors[0].indexOf('{',0);
			if (intFind !== 0-1) strAuthors[0] = strAuthors[0].slice(intFind);
			if (GotIsEng(strPeo) !== 0) {
				strFiveCode = returnFiveCode(strPeo) + ' ' + returnFiveCode(strAuthors[0]);
			}
			box084b.value = strFiveCode;
			check504();
		}
	}
}

function returnFiveCode(strTemp) {
	var strFive = readTextFile('5CODE.txt'); // 五筆資料庫
	strTemp = strTemp.replace(/\|D/g,'\|d');
	strTemp = strTemp.replace(/\{/g,'');
	var intFind = strTemp.indexOf('\|\|',0);
	var strKeep = strTemp;
	if (intFind !== 0-1) strKeep = strTemp.substr(0,intFind);
	intFind = strKeep.indexOf('(',0);
	if (intFind !== 0-1) strKeep = strKeep.substr(0,intFind);
	var aryNames = strKeep.split('|d')[0].split('.');
	intFind = aryNames.length - 1;
	if (aryNames[intFind].length === 1 && aryNames.length > 1) aryNames[intFind] = aryNames[intFind] + aryNames[intFind - 1];
	var aryAuthor = aryNames[intFind].split(''); // 作者名依字分割
	var strReturn = '8';
	var strLang = box041h.value.substr(0,3);
	strLang = strLang === '' ? bib008a35.value.substr(0,3) : strLang;
	// 判斷年代號
	strReturn = strLang === 'jpn' ? '7' : strReturn;
	strReturn = strLang === 'kor' ? '7' : strReturn;
	var aryTemp = strKeep.split('|d');
	if (aryTemp.length !== 1) {
		var aryTemp2 = aryTemp[1].split('-');
		if (aryTemp2[1] !== '') {
			if (aryTemp2[1].indexOf('B',0) !== 0-1) {
				aryTemp2[1] = aryTemp2[1].replace(/b/g,'');
				aryTemp2[1] = aryTemp2[1].replace(/B/g,'');
				aryTemp2[1] = aryTemp2[1].replace(/c/g,'');
				aryTemp2[1] = aryTemp2[1].replace(/C/g,'');
				aryTemp2[1] = aryTemp2[1].replace(/\./g,'');
				aryTemp2[1] = aryTemp2[1].replace(/ /g,'');
				aryTemp2[1] = 0 - Number(aryTemp2[1]);
			}
			var aryYears = [];
			switch (strLang) {
				case '':
					aryYears.push([-999,'1']);
					aryYears.push([-206,'2']);
					aryYears.push([265,'3']);
					aryYears.push([618,'4']);
					aryYears.push([960,'5']);
					aryYears.push([1368,'6']);
					aryYears.push([1644,'7']);
					aryYears.push([1912,'8']);
					aryYears.push([9999,'8']);
					break;
				case 'chi':
					aryYears.push([-999,'1']);
					aryYears.push([-206,'2']);
					aryYears.push([265,'3']);
					aryYears.push([618,'4']);
					aryYears.push([960,'5']);
					aryYears.push([1368,'6']);
					aryYears.push([1644,'7']);
					aryYears.push([1912,'8']);
					aryYears.push([9999,'8']);
					break;
				case 'jpn':
					aryYears.push([1,'1']);
					aryYears.push([645,'2']);
					aryYears.push([784,'3']);
					aryYears.push([1192,'4']);
					aryYears.push([1392,'5']);
					aryYears.push([1600,'6']);
					aryYears.push([1868,'7']);
					aryYears.push([9999,'7']);
					break;
				default:
					aryYears.push([-800,'1']);
					aryYears.push([-753,'2']);
					aryYears.push([476,'3']);
					aryYears.push([1453,'4']);
					aryYears.push([1601,'5']);
					aryYears.push([1701,'6']);
					aryYears.push([1801,'7']);
					aryYears.push([1901,'8']);
					aryYears.push([9999,'8']);
					break;
			}
			var jmax = aryYears.length;
			for (j=0;j<jmax;j++) {
				if (aryTemp2[1] >= aryYears[j][0]) strReturn = aryYears[j][1];
			}
		}
	}

	var strEnglish = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=[]{}|,./<>;:' + '\'' + '\"';
	var imax = aryAuthor.length;
	for (i=0;i<imax;i++) {
		var intFindEnglish = strEnglish.indexOf(aryAuthor[i],0);
		if (intFindEnglish === 0-1) {
			var intFind = strFive.indexOf(aryAuthor[i] + '\t',0);
			if (intFind > 0-1) {
				strReturn = strReturn + strFive.substr(intFind + 2, 1);
			} else if (intFind === 0-1) {
				strReturn = strReturn + '?';
			}
		}
	}
	strFive = '';
	return strReturn.substr(0,4);
}

function toolAdd246s() {
	//新增多筆246段
	if (btn246Down.innerHTML.indexOf('▼',0) !== 0-1) {
		showGroupDown('Group246s','btn246Down');
	}
	var strThisLine = '246 ';
	if (box246i.value === '') {
		strThisLine += 
			document.querySelector('#box246A').value +
			document.querySelector('#box246B').value + ' ';
	} else if (box246i.value !== '') {
		strThisLine += 
			'1#' + ' |i' + box246i.value.trim() + ' : ';
	}
	strThisLine += '|a' + box246s.value.trim();
	if (box246all.value !== '') box246all.value = box246all.value + '\n' + strThisLine;
	if (box246all.value === '') box246all.value = strThisLine;
}

function toolAdd490s() {
	//新增多筆490|830段
	if (btnShow490s.innerHTML.indexOf('▼',0) !== 0-1) {
		document.getElementById('btnShow490s').click();
	}
	var strThisLine = '';
	if (box490a.value !== '') {
		var strTemp = box490a.value.trim();
		strTemp = strTemp.replace('.|n','. ');
		strTemp = strTemp.replace(',|p',', ');
		strTemp = strTemp.replace('.|p','. ');
		strTemp = strTemp.replace('. |n','. ');
		strTemp = strTemp.replace(', |p',', ');
		strTemp = strTemp.replace('. |p','. ');
		strTemp = strTemp.replace('|n','. ');
		if (box490a.value.indexOf('|n',0) !== 0-1) strTemp = strTemp.replace('|p',', ');
		if (box490a.value.indexOf('|n',0) === 0-1) strTemp = strTemp.replace('|p','. ');
		strThisLine = '490 1  |a' + strTemp;
		if (box490v.value !== '') strThisLine += ' ; |v' + box490v.value.trim();
		box490s.value = box490s.value === '' ? strThisLine : box490s.value + '\n' + strThisLine;

		strTemp = box490a.value.trim();
		strTemp = strTemp.replace('.|n','. |n');
		strTemp = strTemp.replace(',|p',', |p');
		strTemp = strTemp.replace('.|p','. |p');
		strTemp = strTemp.replace('|n','. |n');
		if (box490a.value.indexOf('|n',0) !== 0-1) strTemp = strTemp.replace('|p',', |p');
		if (box490a.value.indexOf('|n',0) === 0-1) strTemp = strTemp.replace('|p','. |p');
		strTemp = strTemp.replace('. . |n','. |n');
		strTemp = strTemp.replace('. . |p','. |p');
		strTemp = strTemp.replace(', , |p',', |p');
		strThisLine = '830  ' + toolGetSkip(strTemp) + ' |a' + strTemp;
		box830s.value = box830s.value === '' ? strThisLine : box830s.value + '\n' + strThisLine;

	}
	box490a.value = '';
	box490v.value = '';
}

function toolFill(strTemp,strData,strDate,isC2M) {
	var strReturn = strData;
	strReturn = strReturn.trim();
	if (isC2M === true) {
		var aryCMARC = 
		['010a','010b','010d','100a','200a','200e','200d','200f','200g','205a','210a',
		'210c','210d','215a','215c','215d','300a','454a','454e','606a','681a',
		'225a','225v','200h','200i','333a','710a','711a','712a','011a','011b',
		'011d','225i','225h','607a','320a'];
		var aryMARC21 = 
		['020a','020q','020c','260c','245a','245b','245b','100a','700d','250a','260a',
		'260b','260c','300a','300b','300c','500a','240a','240a','650a','084a',
		'490a','490v','245n','245p','586a','Group','Group','Group','022a','020q',
		'020c','830p','490v','651a','504a'];
		var strNewTemp = strTemp;
		var imax = aryCMARC.length;
		for (i=0;i<imax;i++) {
			if (strTemp === aryCMARC[i]) strNewTemp = aryMARC21[i];
		}
		strTemp = strNewTemp;
	}
	if (isC2M === false) {
		var aryCMARC = ['110a','710a'];
		var aryMARC21 = ['Group','Group'];
		var strNewTemp = strTemp;
		var imax = aryCMARC.length;
		for (i=0;i<imax;i++) {
			if (strTemp === aryCMARC[i]) strNewTemp = aryMARC21[i];
		}
		strTemp = strNewTemp;
	}
	if (strTemp === '020a') {
		strReturn = strReturn.replace(/-/g,'');
		strReturn = strReturn.replace(/\s/g,'');
		box020a.value = strReturn;
	}
	if (strTemp === '020q') {
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		strReturn = strReturn.replace(/ : /g,' ; |q');
		strReturn = strReturn.replace(/:/g,' ; |q');
		strReturn = strReturn.replace(/;/g,' ; |q');
		strReturn = strReturn.replace(/\s\s/g,' ');
		strReturn = strReturn.replace(/\(/g,'');
		strReturn = strReturn.replace(/\)/g,'');
		strReturn = strReturn.replace('|q|q','|q');
		strReturn = strReturn.replace('|q |q','|q');
		if (strReturn.indexOf('|q',0) === 0-1) {
			if (box020q.value !== '') box020q.value = box020q.value + '|q';
		box020q.value = box020q.value.replace('|q|q','|q');
		}
		box020q.value = box020q.value + strReturn;
	}
	if (strTemp === '020c') {
		strReturn = strReturn.replace(/NT\$/g,'');
		strReturn = strReturn.replace(/HK\$/g,'');
		strReturn = strReturn.replace(/USD\$/g,'');
		strReturn = strReturn.replace(/NT/g,'');
		strReturn = strReturn.replace(/¥/g,'');
		strReturn = strReturn.replace(/非賣品/g,'');
		strReturn = strReturn.replace(/贈閱/g,'');
		strReturn = strReturn.replace(/新台幣/g,'');
		strReturn = strReturn.replace(/新臺幣/g,'');
		strReturn = strReturn.replace(/元/g,'');
		strReturn = strReturn.replace(/基價/g,'');
		box020c.value = strReturn;
		boxAV020c.value = strReturn;
		if (box020c.value !== '') localStorage.setItem('Book020c', box020c.value.trim());
	}
	if (strTemp === '017a') {
		if (box017a.value === '') box017a.value = strReturn;
		if (boxAV017a.value === '') boxAV017a.value = strReturn;
	}
	if (strTemp === '024a') {
		//if ('非視聽')
		if (box020a.value === '') box020a.value = strReturn;
		document.querySelector('#cbx020Head').value = 'EAN';
		//if ('視聽資料')
		if (boxAV024a.value === '') boxAV024a.value = strReturn;
	}
	if (strTemp === '022a') {
		strReturn = strReturn.replace(/-/g,'');
		strReturn = strReturn.replace(/\s/g,'');
		document.querySelector('#cbx020Head').value = 'ISSN';
		if (box020a.value === '') box020a.value = strReturn;
	}
	if (strTemp === '028a') {
		if (box028a.value === '') box028a.value = strReturn;
	}
	if (strTemp === '028b') {
		if (box028b.value === '') box028b.value = strReturn;
	}
	if (strTemp === '041a') {
		if (box041aAV.value !== '') box041aAV.value = box041aAV.value + ',';
		box041aAV.value = box041aAV.value + strReturn;
	}
	if (strTemp === '041j') {
		if (strReturn !== 'mul') {
			if (box041j.value !== '') box041j.value = box041j.value + ',';
			box041j.value = box041j.value + strReturn;
		}
	}
	if (strTemp === '041h') {
		if (box041h.value === '') box041h.value = strReturn;
	}
	if (strTemp === '082a') {
		if (box084a.value === '') box084a.value = strReturn;
	}
	if (strTemp === '082b') {
		if (box084b.value === '') box084b.value = strReturn;
	}
	if (strTemp === '084a') {
		if (box084a.value === '') box084a.value = strReturn;
	}
	if (strTemp === '100a') {
		tool100700(strReturn,'100a');
	}
	if (strTemp === '700d') {
		if (box700D.value !== '') {
			tool100700(strReturn,'700t');
		}
		if (box700D.value === '') {
			if (strReturn.split(' ; ').length > 1) {
				tool100700(strReturn.split(' ; ')[0],'700d');
				tool100700(strReturn.split(' ; ')[1],'700t');
			}
			if (strReturn.split(' ; ').length === 1) {
				tool100700(strReturn,'700d');
			}
		}
	}
	if (strTemp === '240a') {
		if (box240a.value !== '') box240a.value = box240a.value + ' : ';
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		box240a.value = box240a.value + strReturn;
	}
	if (strTemp === '245a') {
		strReturn = strReturn.replace(/,/g,', ');
		strReturn = strReturn.replace(/,  /g,', ');
		strReturn = strReturn.replace(/╳/g,'x');
		strReturn = strReturn.replace(/×/g,'x');
		strReturn = strReturn.replace(/Ｘ/g,'x');
		strReturn = strReturn.replace(/ｘ/g,'x');
		strReturn = strReturn.replace(/×/g,'x');
		strReturn = strReturn.replace(/ x /g,'x');
		strReturn = strReturn.replace(/ X /g,'x');
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' =') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		if (strReturn.slice(-1) === ',') strReturn = strReturn.slice(0,-1);
		if (strReturn.slice(-2) === ' /') strReturn = strReturn.slice(0,-2);
		// strReturn = capitalizeSentences(strReturn);
		box245a.value = strReturn;
	}
	if (strTemp === '245n') {
		if (box245n.value !== '') box245n.value = box245n.value + ' ';
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' =') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-1) === ',') strReturn = strReturn.slice(0,-1);
		if (strReturn.slice(-2) === ' /') strReturn = strReturn.slice(0,-2);
		box245n.value = box245n.value + strReturn;
	}
	if (strTemp === '245p') {
		if (box245p.value !== '') box245p.value = box245p.value + ' : ';
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' =') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' /') strReturn = strReturn.slice(0,-2);
		box245p.value = box245p.value + strReturn;
	}
	if (strTemp === '245b') {
		strReturn = strReturn.replace(/,/g,', ');
		strReturn = strReturn.replace(/,  /g,', ');
		strReturn = strReturn.replace(/╳/g,'x');
		strReturn = strReturn.replace(/×/g,'x');
		strReturn = strReturn.replace(/Ｘ/g,'x');
		strReturn = strReturn.replace(/ｘ/g,'x');
		strReturn = strReturn.replace(/×/g,'x');
		strReturn = strReturn.replace(/ x /g,'x');
		strReturn = strReturn.replace(/ X /g,'x');
		if (strReturn.slice(-2) === ' =') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' /') strReturn = strReturn.slice(0,-2);
		if (box245b.value !== '') box245b.value = box245b.value + ' = ';
		// strReturn = capitalizeSentences(strReturn);
		box245b.value = box245b.value + strReturn;
	}
	if (strTemp === '246all') {
		
	}
	if (strTemp === '250a') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		box250a.value = strReturn;
	}
	if (strTemp === '250b') {
		if (box250b.value === '') box250b.value = strReturn;
	}
	if (strTemp === '260a' || strTemp === '264a') {
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		if (box260a.value !== '') box260a2.value = toolPubCity(strReturn);
		if (box260a.value === '') box260a.value = toolPubCity(strReturn);
	}
	if (strTemp === '260b' || strTemp === '264b') {
		if (strReturn.slice(-2) === ' ;') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-1) === ',') strReturn = strReturn.slice(0,-1);
		if (box260b.value !== '') {
			box260b2.value = strReturn;
			if (box260a2.value === '') box260a2.value = box260a.value;
		}
		if (box260b.value === '') box260b.value = strReturn;
	}
	if (strTemp === '260c' || strTemp === '264c') {
		if (strDate === '100a') {
			if (box260c.value === '') {
				var strDateTmp = strReturn.substr(9,4);
				if (Number(strDateTmp) >= 1900 && strDateTmp !== 'y ch') {
					box260c.value = Number(strDateTmp);
				}
			}
		}
		if (box260c.value === '') {
			strReturn = strReturn.replace('民','');
			strReturn = strReturn.replace('國','');
			strReturn = strReturn.replace('年','');
			strReturn = strReturn.replace('月','');
			strReturn = strReturn.replace('©','');
			strReturn = strReturn.replace('C','');
			var intFind = strReturn.indexOf('[',0);
			if (intFind === 0-1) {
				if (Number(strReturn) >= 1900) strReturn = strReturn.trim();
				if (Number(strReturn) < 1900 || isNaN(Number(strReturn))) {
					var intMing = strReturn.indexOf('民',0);
					if (intMing !== 0-1) {
						// strReturn = strReturn.replace('民','');
						// strReturn = strReturn.replace('國','');
						// strReturn = strReturn.replace('年','');
						if (Number(strReturn) > 1) strReturn = Number(strReturn) + 1911;
					}
				}
			}
			if (intFind !== 0-1) {
				if (strDate === '210d') {
					strReturn = strReturn.replace('\]','');
					var aryTemp = strReturn.split('\[');
					if (Number(aryTemp[1].substr(0,4)) >= 1900) {
						strReturn = aryTemp[1];
					}
					if (Number(aryTemp[0].substr(0,4)) >= 1900) {
						strReturn = aryTemp[0];
					}
				}
				if (strDate === '260c') {
					str260Print = strReturn.slice(intFind);
					str260Print = str260Print.replace(/\[/g,'');
					str260Print = str260Print.replace(/\]/g,'');
					// str260Print = str260Print.replace(/民/g,'');
					// str260Print = str260Print.replace(/國/g,'');
					// str260Print = str260Print.replace(/年/g,'');
					str260Print = str260Print.replace(/刷/g,'');
					box260cb.value = str260Print;
					strReturn = strReturn.split('\[')[0];
				}
			}
			if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
			if (strReturn.indexOf('/',0) !== 0-1) {
				var aryTemp = strReturn.split('/');
				strReturn = aryTemp[0] + '.' + aryTemp[1];
			}
			box260c.value = strReturn;
		}
	}
	if (strTemp === '300a') {
		strReturn = strReturn.replace('面','');
		if (strReturn.slice(-2) === ' ;') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-1) === ',') strReturn = strReturn.slice(0,-1);
		if (strReturn.slice(-2) === ' +') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-6) === ' pages') strReturn = strReturn.slice(0,-6);
		//strReturn = strReturn.replace(/\s/g,'');
		box300a.value = strReturn;
	}
	if (strTemp === '300b') {
		if (strReturn.slice(-2) === ' ;') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-2) === ' :') strReturn = strReturn.slice(0,-2);
		if (strReturn.slice(-1) === ',') strReturn = strReturn.slice(0,-1);
		if (strReturn.slice(-2) === ' +') strReturn = strReturn.slice(0,-2);
		box300b.value = strReturn;
	}
	if (strTemp === '300c') {
		if (strReturn.slice(-2) === ' +') strReturn = strReturn.slice(0,-2);
		strReturn = strReturn.replace(/\s/g,'');
		strReturn = strReturn.replace('公分','');
		strReturn = strReturn.replace(' cm','');
		strReturn = strReturn.replace('cm','');
		strReturn = strReturn.replace(/X/g,'x');
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		if (strReturn === '43/4吋') strReturn = '4 3/4吋';
		cbx300c.value = strReturn;
	}
	if (strTemp === '300e') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		box300e.value = strReturn;
	}
	if (strTemp === '490a') {
		if (strReturn.slice(-2) === ' ;') strReturn = strReturn.slice(0,-2);
		// strReturn = capitalizeSentences(strReturn);
		box490a.value = strReturn;
	}
	if (strTemp === '490v') {
		box490v.value = strReturn;
	}
	if (strTemp === '830p') {
		// strReturn = capitalizeSentences(strReturn);
		if (box490a.value !== '') box490a.value = box490a.value + '. |p' + strReturn;
	}
	if (strTemp === '500a') {
		if (strReturn === '國語注音' || strReturn === '注音版') box546a.value = '國語注音';
		if (strReturn !== '國語注音' && strReturn !== '注音版') {
			if (box500a.value !== '') box500a.value = box500a.value + '\n';
			strReturn = strReturn.replace('譯自:','譯自 :');
			if (strReturn.substr(0,4) === '譯自 :') {
				if (box240a.value === '') box240a.value = strReturn.slice(5).trim();
			}
			box500a.value = box500a.value + strReturn;
			}
	}
	if (strTemp === '504a') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		if (box504a.value === '') box504a.value = strReturn;
	}
	if (strTemp === '505a') {
		strReturn = strReturn.replace(/\|t/g, '');
		strReturn = strReturn.replace(/\|t/g, '');
		strReturn = strReturn.replace(/\|r/g, '');
		strReturn = strReturn.replace(/ -- /g, '\n');
		strReturn = strReturn.replace(/--/g, '\n');
		box505a.value = strReturn;
	}
	if (strTemp === '511a') {
		var aryTemp = strReturn.split(':');
		if (aryTemp.length >1) {
			cbxAV700.value = aryTemp[0].trim();
			boxAV700.value = aryTemp[1].trim();
		}
		if (aryTemp.length === 1) boxAV700.value = aryTemp[0].trim();
	}
	if (strTemp === '520a') {
		if (strDate === 'Toy') strReturn = '遊戲說明 : ' + HarfSing(strReturn, 1);
		if (box520a.value === '') box520a.value = strReturn;
	}
	if (strTemp === '520c') {
		if (box520a.value !== '') box520a.value += '|c' + strReturn;
	}
	if (strTemp === '521a') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		if (box521a.value === '') box521a.value = strReturn;
	}
	if (strTemp === '538a') {
		var str538a = '|DVD|VCD|CD|SP|LP|';
		if (str538a.indexOf(strReturn + '|',0) !== 0-1) document.querySelector('#cbx020DVD').value = strReturn;
		if (str538a.indexOf(strReturn + '|',0) === 0-1) {
			if (strReturn === 'Blu-ray disc') document.querySelector('#cbx020DVD').value = 'BD'
		}
	}
	if (strTemp === '546a') {
		if (box546a.value === '') box546a.value = strReturn;
	}
	if (strTemp === '586a') {
		if (box586a.value !== '') box586a.value = box586a.value + '\n';
		box586a.value = box586a.value + strReturn;
	}
	if (strTemp === '600a') {
		if (box600a.value !== '') box600a.value = box600a.value + ',';
		if (strDate === '260c') {
			var strTemp1 = strReturn.substr(0,strReturn.indexOf('(',0));
			var strTemp2 = strReturn.substr(strReturn.indexOf('(',0),strReturn.indexOf(')',0)-1);
			if (strTemp2.indexOf(', ',0) !== 0-1) {
				var strTemp2a = strTemp2.substr(0,strTemp2.indexOf(', ',0));
				strTemp2a = strTemp2a.replace('(','');
				var strTemp2b = strTemp2.slice(strTemp2.indexOf(', ',0));
				strTemp2b = strTemp2b.replace(', ','');
				strTemp2b = strTemp2b.replace(')','');
				strTemp2 = '(' + strTemp2b + ' ' + strTemp2a + ')'
			}
			var strTemp3 = strReturn.slice(strReturn.indexOf(')',0)+1);
			if (strTemp3.substr(0,2) === ', ') strTemp3 = '|d' + strTemp3.slice(2);
			if (strTemp1 + strTemp2 === '') {
				if (strTemp3.indexOf('-',0) !== 0-1) {
					strTemp2 = '|d' + strTemp3.slice(strTemp3.indexOf('-',0)-4);
					strTemp1 = strTemp3.substr(0,strTemp3.indexOf('-',0)-4);
					strTemp3 = '';
				}
			}
			strReturn = strTemp1 + strTemp2 + strTemp3;
		}
		box600a.value += strReturn;
	}
	if (strTemp === '610a') {
		chk600a.checked = true;
		if (box600a.value !== '') box600a.value = box600a.value + ',';
		box600a.value += strReturn;
	}
	if (strTemp === '650a') {
		let str650Temp = '\|\|';
		if (bib008a35.value.substr(0,3) === 'chi' || bib008a35.value.substr(0,3) === 'jpn') str650Temp = ',';
		if (box650a.value !== '') box650a.value += str650Temp;
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box650a.value += strReturn;
		box650a.value = box650a.value.replace(/\,\,/g,'\,');
	}
	if (strTemp === '650x') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box650a.value += '|x' + strReturn;
	}
	if (strTemp === '650z') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box650a.value += '|z' + strReturn;
	}
	if (strTemp === '650y') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box650a.value += '|y' + strReturn;
	}
	if (strTemp === '650d') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box650a.value += '|d' + strReturn;
	}
	if (strTemp === '650v') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box650a.value += '|v' + strReturn;
	}
	box650a.value = box650a.value.replace(/\|\|\|\|/g,'\|\|');
	if (strTemp === '651a') {
		let str651Temp = '\|\|';
		if (bib008a35.value.substr(0,3) === 'chi' || bib008a35.value.substr(0,3) === 'jpn') str651Temp = ',';
		if (box651a.value !== '') box651a.value = box651a.value + str651Temp;
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box651a.value += strReturn;
	}
	if (strTemp === '651x') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box651a.value += '|x' + strReturn;
	}
	if (strTemp === '651v') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box651a.value += '|v' + strReturn;
	}
	if (strTemp === '651d') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box651a.value += '|d' + strReturn;
	}
	if (strTemp === '651y') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box651a.value += '|y' + strReturn;
	}
	if (strTemp === '651z') {
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0, -1);
		box651a.value += '|z' + strReturn;
	}
	box651a.value = box651a.value.replace(/\|\|\|\|/g,'\|\|');
	if (strTemp === '653a') {
		var strNRRC653 = '知識性|青少年|人文藝術|多元學習|科技創新|樂活環保|文化創意|文創|地方創生|English Learning';
		if (strNRRC653.indexOf(strReturn,0) === 0-1) document.querySelector('#cbx653a').value = strReturn;
		if (strNRRC653.indexOf(strReturn,0) !== 0-1) strTemp = 'txtNRRC653'
	}
	if (strTemp === 'txtNRRC035' || strTemp === '035a') {
		if (strReturn.substr(0,2) === 'NO') {
			if (btnShowNRRC.innerHTML === '▼') showGroupDown('GroupNRRC2','btnShowNRRC');
			txtNRRC035.value = strReturn;
		}
	}
	if (strTemp === 'txtNRRC037' || strTemp === '037b') {
		if (strReturn === '公共圖書館新北分區資源中心') {
			if (btnShowNRRC.innerHTML === '▼') showGroupDown('GroupNRRC2','btnShowNRRC');
			txtNRRC037.value = strReturn;
		}
	}
	if (strTemp === 'txtNRRC090' || strTemp === '090a') {
		//090    |a新北市立圖書館
		if (strReturn === '新北市立圖書館') {
			if (btnShowNRRC.innerHTML === '▼') showGroupDown('GroupNRRC2','btnShowNRRC');
			txtNRRC090.value = strReturn;
		}
	}
	if (strTemp === 'txtNRRC653') {
		//653 ## |a知識性
		if (txtNRRC653.value !== '') txtNRRC653.value = txtNRRC653.value + ',';
		if (btnShowNRRC.innerHTML === '▼') showGroupDown('GroupNRRC2','btnShowNRRC');
		txtNRRC653.value = txtNRRC653.value + strReturn;
	}
	if (strTemp === 'toy00815') {
		//'製造地區(008/15-17)','toy008-15'
		strReturn = strReturn.slice(strReturn.indexOf(' ')+1);
		box260a.value = strReturn;
	}
	if (strTemp === 'toy00822') {
		//'適用對象(008/22)','toy008-22'
		document.querySelector('#box008t05').value = strReturn.substr(0,1);
		box521a.value = '適用年齡 : ' + strReturn.slice(2);
	}
	if (strTemp === 'toy521a') {
		//'適用對象註(521,a)','toy521a'
		box521a.value = '適用年齡 : ' + strReturn;
	}
	if (strTemp === 'toy00828') {
		//'政府出版品(008/28)','toy008-28'
		document.querySelector('#box008t11').value = strReturn.substr(0,1);
	}
	if (strTemp === 'toy00835') {
		//'實體語文(008/35)','toy008-35'
		document.querySelector('#bib008a35').value = strReturn;
	}
	if (strTemp === 'toyisMuti') {
		//'雙語對照','toyisMuti'
		if (strReturn !== '') chkMulLang.checked = true;
	}
	if (strTemp === 'toyMutiLang') {
		//'雙語對照語文','toyMutiLang'
		if (strReturn !== '') {
			document.querySelector('#bib041b').value = strReturn;
			tollMulLangCheck();
		}
	}
	if (strTemp === 'toy090a') {
		//'遊戲分類(090,a|245,h)','toy090a'
		if (strReturn !== '') {
			var str090a = strReturn.substr(0,strReturn.indexOf(' ',0));
			var str245h = strReturn.slice(strReturn.indexOf(' ',0)+1);
			box084a.value = str090a;
			box245a.value = '[' + str245h + ']';
		}
	}
	if (strTemp === 'toy246a') {
		//'認證類別(246,a)','toy246a'
		if (strReturn !== '') {
			if (btn246Down.innerHTML === '多筆246段▼') showGroupDown('Group246s','btn246Down');
			box246s.value = strReturn;
			box246i.value = '遊戲認證';
			toolAdd246s();
		}
	}
	if (strTemp === 'toy00819') {
		//'遊戲時間(008/19-21)','toy008-19'
		box008t01b.value = strReturn;
		AV_CD_mins('Toys');
	}
	if (strTemp === 'toy594a') {
		strReturn = strReturn.substr(0,strReturn.indexOf(' ',0));
		box594a.value = strReturn + '-TOY';
	}
	if (strTemp === 'toy245a') {
		//  = capitalizeSentences(strReturn);
		if (box245a.value !== '') box245a.value = strReturn + box245a.value;
		if (box245a.value === '') box245a.value = strReturn;
	}
	if (strTemp === 'toy500a') {
		if (box500a.value !== '') box500a.value = box500a.value + '\n' + '附件 : ' + strReturn;
		if (box500a.value === '') box500a.value = '附件 : ' + strReturn;
	}
	if (strTemp === 'Group') {
		//依110段|710段選取團體核取方塊
		var aryTemp = strReturn.split(',');
		var imax = aryTemp.length;
		for (i=0;i<imax;i++) {
			var str110a = aryTemp[i];
			var intFind = str110a.indexOf('|');
			if (intFind !== 0-1) str110a = str110a.substr(0,intFind);
			intFind = str110a.indexOf('{');
			if (intFind !== 0-1) str110a = str110a.substr(0,intFind);
			if (str110a.length > 6) str110a = str110a.substr(0,2);
			if (box100a.value.indexOf(str110a,0) !== 0-1) {
				chk100a.checked = true;
				}
			if (box700D.value.indexOf(str110a,0) !== 0-1) {
				chk700D.checked = true;
			}
			if (box700T.value.indexOf(str110a,0) !== 0-1) {
				chkAV700.checked = true;
			}
		}
	}
	// return strReturn;
}

function toolPubCity(strReturn) {
	strReturn = strReturn.replace(/台北縣/g,'新北市');
	strReturn = strReturn.replace(/臺北縣/g,'新北市');
	strReturn = strReturn.replace(/北縣/g,'新北市');
	strReturn = strReturn.replace(/台北市/g,'臺北市');
	strReturn = strReturn.replace(/台中縣/g,'臺中市');
	strReturn = strReturn.replace(/臺中縣/g,'臺中市');
	strReturn = strReturn.replace(/中縣/g,'臺中市');
	strReturn = strReturn.replace(/桃園縣/g,'桃園市');
	strReturn = strReturn.replace(/台南縣/g,'臺南市');
	strReturn = strReturn.replace(/臺南縣/g,'臺南市');
	strReturn = strReturn.replace(/高雄縣/g,'高雄市');
	let strTemp = '|臺北市|新北市|桃園市|臺中市|臺南市|高雄市|';
	if (strTemp.indexOf(strReturn.substr(1,3),0) !== 0-1 && strReturn.substr(0,1) === '\[') strReturn = `[${strReturn.substr(1,3)}]`;
	if (strTemp.indexOf(strReturn.substr(0,3),0) !== 0-1) strReturn = strReturn.substr(0,3);
	return strReturn;
}

function toolISBNto13(strID) {
	number = /[0-9]/;
	var flag = true;
	var objISBN10 = ISBN10.value;
	var objthreewords= threewords.value;
	if (objISBN10.value === '') {
		flag = false;
	}
	ISBN13.value = '計算中';
	if (objthreewords.value === '') {
		threewords.value = "978";
		objthreewords = threewords.value;
	}
	var showISBN13 = objthreewords + objISBN10.substring(0,9);
	if (flag) {
		var aryTemp = showISBN13.split('');

		var numCount01 = Number(aryTemp[0]) + Number(aryTemp[2]) + Number(aryTemp[4]) + Number(aryTemp[6]) + Number(aryTemp[8]) + Number(aryTemp[10]) + (Number(aryTemp[1]) + Number(aryTemp[3]) + Number(aryTemp[5]) + Number(aryTemp[7]) + Number(aryTemp[9]) + Number(aryTemp[11])) *3;
		var numCount02 = numCount01 % 10;
		numCount02 = 10 - numCount02;
		numCount02 = numCount02 % 10;
		showISBN13 = showISBN13.substr(0,12) + numCount02.toString();

		ISBN13.value = showISBN13;
		if (strID === 'box020a') document.getElementById(strID).value = showISBN13;

	}
}

function tool041AV(strTemp1,strTemp2,strTemp3) {
	var strSelected = document.querySelector('#'+strTemp1).value;
	var str041a = document.getElementById(strTemp2).value;
	if (str041a !== '') str041a = str041a + ',';
	str041a = str041a + strSelected;
	document.getElementById(strTemp2).value = str041a;

	var str041b = document.getElementById(strTemp3).value;
	if (str041b !== '') str041b = str041b.slice(0,-3);
	var myIndex = document.getElementById(strTemp1).selectedIndex;
	var strSeltext = document.getElementById(strTemp1).options[myIndex].text;
	strSeltext = strSeltext.substr(0,5);
	var aryTemp = [];
	aryTemp.push(['chi 中','中','國']);
	aryTemp.push(['chi 簡','簡中','國']);
	aryTemp.push(['eng 英','英','英']);
	aryTemp.push(['fre 法','法','法']);
	aryTemp.push(['ger 德','德','德']);
	aryTemp.push(['kor 韓','韓','韓']);
	aryTemp.push(['jpn 日','日','日']);
	aryTemp.push(['ita 義','義','義']);
	aryTemp.push(['spa 西','西','西']);
	aryTemp.push(['hun 匈','匈','匈']);
	aryTemp.push(['por 葡','葡','葡']);
	aryTemp.push(['dut 荷','荷','荷']);
	aryTemp.push(['nor 挪','挪','挪威']);
	aryTemp.push(['ces 捷','捷','捷克']);
	aryTemp.push(['rus 俄','俄','俄']);
	aryTemp.push(['swe 瑞','瑞','瑞典']);
	aryTemp.push(['dan 丹','丹麥','丹麥']);
	aryTemp.push(['rum 羅','羅','羅馬尼亞']);
	aryTemp.push(['tha 泰','泰','泰']);
	aryTemp.push(['mas 馬','馬','馬來']);
	aryTemp.push(['ind 印','印尼','印尼']);
	aryTemp.push(['vie 越','越','越']);
	aryTemp.push(['bur 緬','緬','緬']);
	aryTemp.push(['hin 印','印度','印度']);
	aryTemp.push(['phi 菲','菲','菲']);
	aryTemp.push(['cam 柬','柬','柬']);
	aryTemp.push(['ara 阿','阿','阿']);
	aryTemp.push(['lao 寮','寮','寮']);
	aryTemp.push(['### 未','','']);
	aryTemp.push(['zxx 非','','']);
	aryTemp.push(['mul 多','','']);
	aryTemp.push(['sgn 手','','']);
	aryTemp.push(['und 未','','']);
	var imax = aryTemp.length;
	var strReturn = '';
	for (i=0;i<imax;i++) {
		if (strSeltext === aryTemp[i][0]) {
			if (strTemp3 === 'box041aAVb') strReturn = aryTemp[i][2];
			if (strTemp3 === 'box041jb') strReturn = aryTemp[i][1];
		}
	}

	if (strReturn !== '') {
		if (strTemp3 === 'box041aAVb') str041b = str041b + strReturn + '語發音';
		if (strTemp3 === 'box041jb') str041b = str041b + strReturn + '文字幕';
		
	}
	document.getElementById(strTemp3).value = str041b;
	box546a.value = box041aAVb.value;
	if (box041jb.value !== '') box546a.value = box546a.value + ', ';
	box546a.value = box546a.value + box041jb.value;
}

function gotfromWeb(strTemp,strWitchSite) {
	var strEachLine = strTemp.split('\n');
	var strReturn = '';
	if (strWitchSite === 'Books') {
		strReturn = strEachLine[0] !== '' ? strEachLine[0] : strEachLine[1];
		toolFill('245a',strReturn,strWitchSite,false);
		for (var i = 2; i < strEachLine.length; i++) {
		if (strEachLine[i].trim().startsWith('ISBN:') || strEachLine[i].trim().startsWith('    ISBN:') || strEachLine[i].trim().startsWith('ISBN:') || strEachLine[i].trim().startsWith('    ISBN:')) {
				strReturn = gotTexts(strEachLine[i], 'N:', '');
				toolFill('020a',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('出版社:') || strEachLine[i].trim().startsWith('    出版社:')) {
				strReturn = gotTexts(strEachLine[i], '社:', '');
				toolFill('260b',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('作者: ') || strEachLine[i].trim().startsWith('    作者: ')) {
				strReturn = gotTexts(strEachLine[i], '者:', '');
				toolFill('100a',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('出版日期:') || strEachLine[i].trim().startsWith('    出版日期:')) {
				strReturn = gotTexts(strEachLine[i], '期:', '');
				toolFill('260c',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('定價:') || strEachLine[i].trim().startsWith('    定價:')) {
				strReturn = gotTexts(strEachLine[i], '價:', '');
				strReturn = strReturn.replace('NT$ ', '').replace('NT$', '').replace(' 元', '').replace('元', '');
				toolFill('020c',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('規格:') || strEachLine[i].trim().startsWith('    規格:')) {
				strReturn = gotTexts(strEachLine[i], '格:', '/');
				toolFill('020q',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('本書分類:') || strEachLine[i].trim().startsWith('    本書分類:')) {
				strReturn = strReturn === '' ? gotTexts(strEachLine[i], '類:', '') : strReturn + ',' + gotTexts(strEachLine[i], '類:', '');}
		}
	} else if (strWitchSite === 'Sanmin') {
		strReturn = strEachLine[0] !== '' ? strEachLine[0] : strEachLine[1];
		toolFill('245a',strReturn,strWitchSite,false);
		for (var i = 2; i < strEachLine.length; i++) {
			if (strEachLine[i].trim().startsWith('ISBN13:') || strEachLine[i].trim().startsWith('    ISBN13:')) {
				strReturn = gotTexts(strEachLine[i], '3:', '');
				toolFill('020a',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('出版社:') || strEachLine[i].trim().startsWith('    出版社:')) {
				strReturn = gotTexts(strEachLine[i], '社:', '');
				toolFill('260b',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('作者:') || strEachLine[i].trim().startsWith('    作者:')) {
				strReturn = gotTexts(strEachLine[i], '者:', '');
				toolFill('100a',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('出版日:') || strEachLine[i].trim().startsWith('    出版日:')) {
				strReturn = gotTexts(strEachLine[i], '日:', '');
				toolFill('260c',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('定 價:') || strEachLine[i].trim().startsWith('定  價:')) {
				strReturn = gotTexts(strEachLine[i], '價:', '');
				strReturn = strReturn.replace('NT$ ', '').replace('NT$', '').replace(' 元', '').replace('元', '');
				toolFill('020c',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('裝訂/頁數:') || strEachLine[i].trim().startsWith('    裝訂/頁數:')) {
				strReturn = gotTexts(strEachLine[i], '數:', '/');
				toolFill('020q',strReturn,strWitchSite,false);
			} else if (strEachLine[i].trim().startsWith('中文圖書分類:')) {
				strEachLine[i] = strEachLine[i].replace('類: ', '類:');
				strReturn = gotTexts(strEachLine[i], '類:', '');
			}
		}
	}
}

function gotTexts(strGetEachLine, strFindText, strEndText) {
	if (strEndText === '') {
		var startIndex = strGetEachLine.indexOf(strFindText) + 2;
		var endIndex = strGetEachLine.length;
		var strReturnText = strGetEachLine.substring(startIndex, endIndex).trim();
	} else if (strEndText !== '') {
		var firstIndex = strGetEachLine.indexOf(strFindText) + 2;
		var secondIndex = strGetEachLine.indexOf(strEndText, firstIndex);
		var endIndex = secondIndex !== -1 ? secondIndex : strGetEachLine.length;

		var strReturnText = strGetEachLine.substring(firstIndex, endIndex).trim()
	}
	return strReturnText;
}

function toolSwitchBK() {
	//切換館藏地是否可核取
	if (chkStocken.checked) {
		const strNoAdu = '|FB|JE|KF|LC|QC|'; //不收成人書
		const strNoAduUncheck = '|Book|CB|R|G|T|L|BOX|E|Y|S|M|SC|TAI|HAK|ABO|BB|VS|RF|F|JPN|KOR|THA|MAS|BUR|IND|VIE|FRE|GER|HIN|SPA|HUN|PHI|CAM|AFR|ARA|POR|DUT|CZE|LAO|P|RP|J|';
		const strNoKid = '|QG|'; //不收童書
		const strNoKidUncheck = '|K|KB|KG|KR|KT|KI|KF|KCB|KABO|KJPN|KKOR|KTHA|KIND|KBUR|KMAS|KIND|KBUR|KVIE|KFRE|KGER|KHIN|KSPA|KHUN|KPHI|KCAM|KAFR|KARA|KPOR|KDUT|KCZE|KLAO|KTAI|KHAK|';
		const strMonCh = '|TJ|'; //只收兒童及親職教育
		const strMonChUncheck = '|Book|R|G|T|BOX|CB|Y|S|M|SC|TAI|HAK|ABO|BB|VS|RF|F|JPN|THA|MAS|KOR|IND|VIE|FRE|GER|HIN|SPA|HUN|PHI|CAM|LAO|AFR|ARA|POR|DUT|CZE|P|RP|J|';
		const strOnBus = '|OD|UD|TW|TU||'; //行動書車
		const strOnBusUncheck = '|KR|R|RF|';
		const strNoCD = '|TU|IH|KG|'; //不收附件
		const strAVStock = '|ZA|WA|TA|TB|TC|TD|TE|TF|TG|TH|TI|TJ|YB|YC|YD|YE|YF|YG|YH|YI|RA|SA|ZC|ZG|MA|XA|ZD|QA|QB|QC|QD|QE|QF|QG|QH|QI|QJ|QK|QM|QN|QO|QP|ZB|FA|FB|FC|FD|FE|OA|OB|OC|JA|JB|JC|JE|CA|CB|NA|NB|NC|ND|NE|NF|NG|NH|EA|EB|HA|HB|HC|HD|HE|HF|HG|HI|IA|IC|ID|IE|IF|IG|LA|LB|LC|GA|GC|GD|KA|KC|KD|KE|KF|BA|BB|BC|BD|BE|PAL|PB|UA|UB|UC|DA|VA|BASRT|'; //有視聽室
		const strAVStockUncheck = '|AV|CD|SB|LP|';

		const checkConditions = (strTemp, strFindText, strID) => {
			const conditions = [
				{ check: strNoAdu.indexOf(strTemp) !== -1, uncheck: strNoAduUncheck.indexOf(strFindText) !== -1 },
				{ check: strNoKid.indexOf(strTemp) !== -1, uncheck: strNoKidUncheck.indexOf(strFindText) !== -1 },
				{ check: strMonCh.indexOf(strTemp) !== -1, uncheck: strMonChUncheck.indexOf(strFindText) !== -1 },
				{ check: strOnBus.indexOf(strTemp) !== -1, uncheck: strOnBusUncheck.indexOf(strFindText) !== -1 },
				{ check: strNoCD.indexOf(strTemp) !== -1 && localStorage.getItem('HadCD') === 'Yes', uncheck: true },
				{ check: strAVStock.indexOf(strTemp) === -1, uncheck: strAVStockUncheck.indexOf(strFindText) !== -1 }
			];

			conditions.forEach(condition => {
				if (condition.check && condition.uncheck) {
					document.getElementById('Chk' + strID).disabled = true;
					document.getElementById('int' + strID).disabled = true;
				}
			});
		};

		for (let i = 1; i < 113; i++) {
			let strID = String(i).padStart(3, '0'); // 生成館藏地ID
			if (document.getElementById('Chk' + strID)) {
				document.getElementById('Chk' + strID).disabled = false;
				document.getElementById('int' + strID).disabled = false;

				let strTemp = document.getElementById('txt' + strID).innerHTML.split(' ')[0]; // 取得館藏地
				const strDataType = document.querySelector('#BoxDataType').value;
				const strFindText = '|' + strDataType + '|';

				if (strTemp) {
					strTemp = '|' + strTemp + '|';
					checkConditions(strTemp, strFindText, strID);
				} else {
					document.getElementById('Chk' + strID).disabled = true;
					document.getElementById('int' + strID).disabled = true;
				}
			}
		}
	}
	if (! chkStocken.checked) {
		for (i=1;i<113;i++) {
			strID = '000' + i;
			strID = strID.slice(-3);
			if ('Chk' + strID) {
				if (document.getElementById('txt' + strID).innerHTML !== '') document.getElementById('Chk' + strID).disabled = false;
				if (document.getElementById('txt' + strID).innerHTML === '') document.getElementById('Chk' + strID).disabled = true;
			}
			if ('int' + strID) {
				if (document.getElementById('txt' + strID).innerHTML !== '') document.getElementById('int' + strID).disabled = false;
				if (document.getElementById('txt' + strID).innerHTML === '') document.getElementById('int' + strID).disabled = true;
			}
		}
	}
}

function toolChangeStack(strTemp) {
	//更改館藏數
	//strTemp = 'intxxx'
	var intTemp = 0;
	for (i=1;i<113;i++) {
		var strID = '000' + i;
		strID = strID.slice(-3);
		intTemp = Number(intTemp) + Number(document.getElementById('int' + strID).value);
	}
	if (strTemp.substr(0,3) === 'Chk') {
		if (document.getElementById('int' + strID).value !== '') {
			if (! document.getElementById(strTemp).checked) document.getElementById(strTemp).checked = true;
		}
	}
	//LabelCount.innerHTML = '已選取 ' + intTemp + ' 館；還有 ' + (BoxBarcodeCount.value - intTemp) + ' 館';
	LabelCount.innerHTML = '已選取 ' + intTemp + ' 館';
}

function toolCheckMer() {
	//勾選分館
	toolCheckAll('No');
	var intTemp = 0;
	var strTemp = BoxChk.value.trim();
	strTemp = strTemp.replace(/ /g,'');
	strTemp = strTemp.toUpperCase();
	var aryTemp = strTemp.split(',');
	for (i=0;i<aryTemp.length;i++) {
		var strID = aryTemp[i] + ' ';
		for (j=1;j<113;j++) {
			var intLen = strID.length;
			var strNo = '000' + j;
			strNo = strNo.slice(-3);
			if (document.getElementById('txt' + strNo).innerHTML.substr(0,intLen) === strID) {
				if (document.getElementById('int' + strNo).value !== '') document.getElementById('int' + strNo).value = Number(document.getElementById('int' + strNo).value) + 1;
				intTemp = intTemp + 1;
				if (document.getElementById('int' + strNo).value === '') document.getElementById('int' + strNo).value =1;
				document.getElementById('Chk' + strNo).checked = true;
			}
		}
	}
	//LabelCount.innerHTML = '已選取 ' + intTemp + ' 館；還有 0 館';
	LabelCount.innerHTML = '已選取 ' + intTemp + ' 館';
	//BoxBarcodeCount.value = intTemp;
}

function toolCheckStacks(strTemp) {
	//勾選時將館藏量填入1
	var strTemp2 = 'int' + strTemp.substr(3,3);
	if (strTemp2) {
		if (document.getElementById(strTemp).checked) {
			if (document.getElementById(strTemp2).value === '') document.getElementById(strTemp2).value = 1;
		}
		if (! document.getElementById(strTemp).checked) document.getElementById(strTemp2).value = '';
	}
	toolChangeStack(strTemp);
}

function toolCheckAll(strTemp) {
	//全選='Yes' ; 全不選='No'
	var intTemp = 0;
	for (i=1;i<113;i++) {
		var strID = '000' + i;
		// console.log(i);
		strID = strID.slice(-3);
		if ('Chk' + strID) {
			if (document.getElementById('Chk' + strID).disabled === false) {
				if (strTemp === 'Yes') {
					document.getElementById('Chk' + strID).checked = true;
					if (document.getElementById('int' + strID).value === '') document.getElementById('int' + strID).value = 1;
				}
				if (strTemp === 'No') {
					document.getElementById('Chk' + strID).checked = false;
					document.getElementById('int' + strID).value = '';
				}
			}
		}
	}
	toolChangeStack('CheckAll');
}

function toolChangeBookStacks() {
	//依資料類型變更流通類型
	var strTemp = document.querySelector('#BoxDataType').value;
	strTemp = '|' + strTemp + '|';
	//可借30天
	var strFindText = '|Book|KCB|K|KB|KT|KI|KF|L|G|T|E|Y|S|M|SC|TAI|HAK|ABO|KABO|BB|VS|F|JPN|KJPN|THA|KTHA|MAS|KMAS|KOR|KKOR|IND|KIND|VIE|KVIE|BUR|KBUR|FRE|KFRE|GER|KGER|HIN|KHIN|SPA|KSPA|HUN|KHUN|PHI|KPHI|CAM|KCAM|LAO|KLAO|AFR|KAFR|ARA|KARA|POR|KPOR|DUT|KDUT|CZE|KCZE|';
	document.querySelector('#BoxBroType').value = 'L30';
	//不外借
	strFindText = '|R|KR|RF|RP|J|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxBroType').value = 'R';
	//可借7天
	strFindText = '|CB|P|EBook|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxBroType').value = 'L7';
	//視聽資料可借7天
	strFindText = '|AV|CD|SB|LP|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxBroType').value = 'AVL7';

	//依資料類型變更取碼方式
	//中文|日文資料
	strFindText = '|Book|KCB|K|KB|KT|KI|L|G|T|E|Y|S|M|SC|TAI|HAK|ABO|KABO|BB|VS|JPN|KJPN|R|KR|RF|RP|J|CB|P|EBook|AV|CD|SB|LP|';
	document.querySelector('#BoxForC').value = '中文書';
	//西文資料
	strFindText = '|F|KF|THA|KTHA|MAS|KMAS|KOR|KKOR|IND|KIND|VIE|KVIE|BUR|KBUR|FRE|KFRE|GER|KGER|HIN|KHIN|SPA|KSPA|HUN|KHUN|PHI|KPHI|CAM|KCAM|LAO|KLAO|AFR|KAFR|ARA|KARA|POR|KPOR|DUT|KDUT|CZE|KCZE|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxForC').value = '西文書';

	//依資料類型變更典藏地
	//BK 開架閱覽
	strFindText = '|Book|L|E|Y|S|M|T|TAI|HAK|BB|VS|CB|ABO|G|RP|SC|';
	document.querySelector('#BoxArea').value = 'BK';
	//JUN 兒童室
	strFindText = '|KCB|K|KB|KT|KI|KABO|KF|KJPN|KTHA|KMAS|KKOR|KIND|KVIE|KBUR|KFRE|KGER|KHIN|KSPA|KHUN|KPHI|KCAM|KLAO|KAFR|KARA|KPOR|KDUT|KCZE|KR|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'JUN';
	//AV 視聽室
	strFindText = '|EBook|AV|CD|SB|LP|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'AV';
	//MUL 多元文化專區
	strFindText = '|JPN|F|THA|MAS|KOR|IND|VIE|BUR|FRE|GER|HIN|SPA|HUN|PHI|CAM|LAO|AFR|ARA|POR|DUT|CZE|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'MUL';
	//NAT 本土語言專區
	strFindText = '|TAI|KTAI|HAK|KHAK|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'NAT';
	//PER 期刊室
	strFindText = '|J|P|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'PER';
	//REF 參考書區
	strFindText = '|R|RF|';
	if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'REF';
	//X 限制級
	// strFindText = '||';
	// if (strFindText.indexOf(strTemp,0) !== 0-1) document.querySelector('#BoxArea').value = 'X';

	toolSwitchBK();
}

function toolPublish(strTemp) {
	//[待修]依出版者切換出版地|經銷者|經銷地
	if (strTemp === '260b') {
		var strReturn = box260b.value.trim();
		if (strReturn !== '') {
			strReturn = toolCutPub(strReturn);
			toolGetDealer(strReturn);
			toolGetCity('box260a',strReturn);
		}
	}
	if (strTemp === '260b2') {
		var strReturn = box260b2.value.trim();
		if (strReturn !== '') {
			strReturn = toolCutPub(strReturn);
			toolGetCity('box260a2',strReturn);
		}
	}
}

function toolGetDealer(strPublisher) {
	var aryDealer = []; //經銷商,經銷地,2字,3字,4字,5字
	aryDealer.push(['遠足文化事業股份有限公司','新北市','|木馬|左岸|繆思|大家|野人|幸福|奇光|大牌|八旗|方舟|小熊|廣場|衛城|字畝|步步|月熊|光現|奇点|奇點|','|一起來|小貓流|星出版|','|小樹文化|自由之丘|快樂文化|','']);
	aryDealer.push(['時報文化出版企業股份有限公司','臺北市','|香海|傳神|雅言|協和|瀛舟|東森|閣林|宏範|時廣|富邦|中觀|三陽|寬和|印刻|曠宇|寫樂|欣然|信昌|貝塔|萬人|新雅|方寸|山邊|翰吉|黃山|福智|有方|正好|春山|明天|獨売|知田|福報|山頂|一頁|趨勢|','|CnC|知本家|文建會|知識流|藝術家|創造力|新經典|蝴蝶蘭|廖效詮|宇達特|張修蓉|洪偉仁|劉益宏|錦聿豐|創詠堂|郭菉猗|壯世代|一爐香|','|閱讀地球|時周文化|商訊文化|工商財經|民眾日報|東觀文化|東華書局|馥林文化|標案書系|華滋文化|數位創意|開啟文化|飛天手作|香港中和|全球防務|華晟圖書|華冠文創|大好世紀|景觀工程|優秀設計|邁可里歐|中國信託|先知資訊|伊林娛樂|馬克吐溫|偉門智威|人文社群|','|中國經濟研|國家電影資|國家表演藝|新生命資訊|楊文標才能|全民大劇團|統一夢公園|Hall1|']);
	aryDealer.push(['家庭傳媒股份有限公司城邦分公司','臺北市','|墨刻|商周|布克|原水|性林|霹靂|春光|啟示|水滴|華雲|臉譜|麥田|獨步|積木|智富|儂儂|','|流行風|電腦人|新電子|網管人|麥浩斯|設計家|易博士|紅樹林|貓頭鷹|橡樹林|','|電腦家庭|國際名錶|遊戲出版|奇幻基地|新手父母|馬可孛羅|城邦原創|商業周刊|高爾夫球|媽媽寶寶|美麗佳人|','|Smart|經濟新潮社|']);
	aryDealer.push(['大和書報圖書股份有限公司','新北市','|大石|商智|大塊|本事|雅言|智園|東觀|朗文|茉莉|','|知識流|今週刊','|天下文化|天下雜誌|天下遠見|華品文創|早安財經|心靈工坊|朗文字典|遠見天下|親子天下|','']);
	aryDealer.push(['聯合發行股份有限公司','新北市','|一人|人人|人類|八方|日月|四季|目川|水靈|再生|好的|好優|宏碩||東販|非凡|哈林|唐代|桂氏|桂冠|財訊|啟示|捷幼|笛藤|麥田|凱特|智庫|慈濟|楊桃|業強|墨刻|黎明|繁星|聯經|繪虹|蘭亭|巩玥|','|紅通通|欣燦連|戚嘉林|麥浩斯|黃金屋|新潮社|貓頭鷹|聯合報|楓葉社|楓樹林|楓書坊|釀出版|','|人類智庫|日日幸福|台灣東販|生活品味|秀威資訊|城邦發行|博思智庫|幸福綠光|經典雜誌|經濟日報|臺灣東販|聯合文學|商業周刊|郭良蕙新|暖暖書屋|','|中國生產力|城邦印書館|麥格羅希爾|新自然主義|']);
	aryDealer.push(['永續圖書有限公司','新北市','|五觀|培育|棋茵|讀品|大拓|智品|手藝家|雅典|璞珅|','|知音人|智學堂|語言鳥|','','|得昇多媒體|']);
	aryDealer.push(['大雁文化事業股份有限公司','臺北市','|如果|橡實|原點|大寫|啟動|日出|大宴|本事|果力|豐富|','|漫遊者|新星球|地平線|','','']);
	aryDealer.push(['成陽事業股份有限公司','桃園市','|李敖|正典|理得|桂冠|','|阿布拉|','|科技圖書|','|統一夢公園|']);
	aryDealer.push(['知遠文化事業有限公司','新北市','|漢思|立京|狗屋|種籽|民視|喬木|','|大樹林|優百科|檸檬樹|蘋果屋|知識家|綠柚林|資料夾|帕斯頓|','|完美日子|語研學院|紙印良品|財經傳訊|國際學村|台灣廣廈|臺灣廣廈|瑞麗美人|美藝學苑|','']);
	aryDealer.push(['眾悅圖書出版股份有限公司','臺北市','|新陸|','','','']);
	aryDealer.push(['知己圖書股份有限公司','臺北市','|十色|上羊|大田|大穎|奧林|太雅|日初|好讀|高談|晨星|華成|華杏|','|愛米粒|','|彩虹種子|逗點文創|','']);
	aryDealer.push(['叩應股份有限公司','新北市','|如何|究竟|圓神|先覺|方智|寂寞|','|螢火蟲|','','']);
	aryDealer.push(['邦聯文化事業有限公司','臺北市','|發現|睿其|','','','']);
	aryDealer.push(['幼福文化事業股份有限公司','新北市','|漢宇|漢皇|漢湘|翰宇|','|心經典|','','|高伊姿漢湘|']);
	aryDealer.push(['昶景文化事業有限公司','新北市','|西北|和平|','','|策馬入林|','']);
	aryDealer.push(['旭昇圖書有限公司','新北市','|大元|大斯|大翼|可橙|弘智|永然|匠心|旭昇|百善|亞洲|冠學|前景|前衛|茉莉|倚天|海洋|曼尼|笙易|羚羊|野火|普天|晶冠|智林|華志|雅音|漢湘|','|代表作|尼羅河|金大鼎|昭文社|狠角舍|新潮社|洪建全|風向球|','|臺灣先智|','|世界商業文|智典新潮社|']);
	aryDealer.push(['吳氏圖書有限公司','新北市','|大康|女書|成嘉|宏欣|宏道|我我|河中|采薇|保羅|姿霓|倉璧|原笙|草根|健康|常民|野鵝|集合|新地|經綸|解碼|達觀|旗林|臺原|臺源|蒼壁|齊飛|德威|賽斯|','|水雲齋|曲嘉綠|老戰友|知兵堂|食為天|吳三連|海寧格|楓葉社|實學社|琉璃光|','|一方山水|山家清供|生命潛能|自然因館|金色次元|健康世界|現代學術|創易書活|喜悅之路|智慧大學|黃裳元吉|旗林萬里|','|健康新聞社|董氏基金會|國際系統排|']);
	aryDealer.push(['朝日文化事業有限公司','新北市','|心田|采竹|俊嘉|紅印|雪域|舜恕|雅事|暖流|綜美|德芳||誼凡|養沛|藝群|驛站|','|手作族|王慶津|台經院|良品館|邱逸愷|莊壽美|養沛館|諾奕思|','|十字星球|台灣書房|美日文本|敎育之友|莫亞拼布|臺灣書房|','|Crafts|達逸智慧家|德芳亞太研|']);
	aryDealer.push(['高寶書版集團','臺北市','|大方|大藝|大鴻|紅桌|推文|推守|富田|樂木|','|小南風|合作社|新經典|三日月|','|飛鳥季社|','']);
	aryDealer.push(['聯寶國際文化事業有限公司','新北市','|文豪|四也|正義|向上|東西|青林|科寶|書泉|推守|奧修|道聲|維綺|閣林|','|小光點|小典藏|陳澄波|螢火蟲|龍少年|龍圖騰|藝術家|','|小螢火蟲|典藏藝術|音樂向上|神奇塔羅|','|愛孩子愛自|臺灣英文新|台灣英文新|']);
	aryDealer.push(['永續圖書有限公司','新北市','|大拓|大億|可道|培育|得昇|頂天|棋茵|雅典|達觀|璞申|讀品|逹観|','|語言鳥|手藝家|知音人|智學堂|','|五觀藝術|風雲時代|','']);
	aryDealer.push(['楨德圖書事業有限公司','新北市','|春天|','','','']);
	aryDealer.push(['紅螞蟻圖書有限公司','臺北市','|人智|三藝|上林|上堤|上優|久周|大日|大默|中衛|丹陽|文訊|文興|主流|正中|立得|立緒|知青|宇河|安立|有鹿|宏津|杜克|所以|明人|明智|東佑|知靑|前衛|南瓜|威秀|威智|洪葉|紅葉|風格|原色|師德|書林|中衛|啟明|基本|梅霖|雪謙|寒玉|晴易|智寬|開學|愛家|瑞雀|旗開|樂果|學習|臻品|賽尚|簡單|','|11街|十一街|一一街|上澤社|王振漢|吳如明|吳素霞|奇異果|易林堂|林玉寶|洪明標|洪春柳|紅蕃薯|風向球|風格司|翁維璐|褚林貴|起案塾|御書房|陳新民|渤海堂|萬卷樓|薄伽梵|鴻儒堂|瀚林苑|攝影家|鑫富樂|','|大開資訊|小小書房|宅宅文創|汎亞人力|老樹創意|法治時報|拾光雪松|軍事連線|基本書坊|報導文學|臺灣培生|台灣培生|覺性地球|','|中衛發展中|台灣網路資|臺灣網路資|婦女與生活|開放智慧引|臺灣展翅協|台灣展翅協|臺灣鄉村旅|台灣鄉村旅|']);
	aryDealer.push(['易可數位行銷股份有限公司','新北市','|大智|大肅|大橋|大邁|大億|水星|也是|巴巴|元華|双美|秋雨|意象|新意|順達|樂友|樂幼|海鴿|海雁|雅各|震撼|達人|冠橙|良品|悅智|柏樂|','|心版圖|不求人|要有光|知書房|維他命|新文創|貝斯特|奇盟子|龍時代|龍少年|點製作|雅書堂|','|上揚開發|大大創意|大鵬展翅|光的課程|悅讀名品|希望星球|南十字星|藍鯨出海|景深空間|策馬天下|華文精典|麥禾陽光|','|明日工作室|']);
	aryDealer.push(['三友圖書有限公司','臺北市','|橘子|','','','']);
	aryDealer.push(['采舍國際有限公司','臺北市','|捷徑|','','','']);
	aryDealer.push(['宇林文化事業股份有限公司','高雄市','|耕林|東雨|','','','']);
	aryDealer.push(['九歌出版社有限公司','臺北市','|天培|健行|','','','']);
	aryDealer.push(['功倍實業有限公司','新北市','|藍海|新月|花園|邀月|','','','']);

	aryDealer.push(['秀威資訊科技股份有限公司','臺北市','','','|獨立作家|','']);
	var imax = aryDealer.length;
	for (var i=0;i<imax;i++) {
		if (box260b2.value === '') {
			var strFindText = '|' + strPublisher.substr(0,2) + '|';
			if (aryDealer[i][2].indexOf(strFindText,0) !== 0-1) {
				box260a2.value = aryDealer[i][1];
				box260b2.value = aryDealer[i][0];
			}
			strFindText = '|' + strPublisher.substr(0,3) + '|';
			if (aryDealer[i][3].indexOf(strFindText,0) !== 0-1) {
				box260a2.value = aryDealer[i][1];
				box260b2.value = aryDealer[i][0];
			}
			strFindText = '|' + strPublisher.substr(0,4) + '|';
			if (aryDealer[i][4].indexOf(strFindText,0) !== 0-1) {
				box260a2.value = aryDealer[i][1];
				box260b2.value = aryDealer[i][0];
			}
			strFindText = '|' + strPublisher.substr(0,5) + '|';
			if (aryDealer[i][5].indexOf(strFindText,0) !== 0-1) {
				box260a2.value = aryDealer[i][1];
				box260b2.value = aryDealer[i][0];
			}
		}
	}
}

function toolGetCity(strID,strPublisher) {
	var aryCity = [];
	aryCity.push(['臺北市','|一品|九州|九星|九章|九歌|二魚|人人|人間|八方|八正|力大|力得|三民|三采|上奇|上林|上旗|上誼|久石|大元|大日|大田|大石|大立|大地|大是|大展|大秦|大康|大陸|大雁|大塊|大境|大旗|大辣|大寫|大學|大穎|大翼|大輿|大鴻|小兵|小魯|小樹|中技|中衛|丹陽|五南|允晨|元華|元照|及幼|友善|天下|天使|天音|天恩|天培|天衛|天龍|太雅|五南|心理|文化|文津|文訊|文笙|文華|文房|文經|文魁|文橋|文鶴|方智|方廣|日月|日出|日僑|日毅|水牛|水滴|水靈|世界|仕格|加珈|台視|史記|四季|布克|平安|幼獅|本事|正因|正智|民聲|永大|永中|永然|禾馬|禾楓|立村|立德|亦安|先覺|光采|光啟|全力|再生|吉美|名人|名山|向上|好優|如何|如果|宇河|尖端|成智|旭采|有鹿|朱雀|朵琳|考用|書泉|行人|何嘉|佛陀|作家|希代|志遠|杜葳|沐風|秀威|究竟|育林|角川|言鼎|貝果|貝塔|邦聯|佳音|佳魁|初光|和南|宜新|幸福|悅知|所以|拓墣|明日|易富|東大|東立|東佑|東華|東觀|松合|松崗|松祿|松慧|果禾|果樹|河中|河馬|河圖|法界|法鼓|狗屋|知英|花園|采禾|采實|金星|長昇|雨禾|青文|青林|非凡|保銷|信實|信誼|前衛|南天|南門|南與|品冠|品度|城邦|建弘|建宏|建業|思行|恆兆|政大|春天|春光|柿子|洪葉|活石|皇冠|秋雨|美樂|致良|致知|致悅|風行|飛寶|首席|凌零|原水|原富|唐山|唐莊|展新|師德|恩亞|時兆|時英|時報|書虫|書林|核果|格林|海學|海鴿|益群|索卡|航貿|茵山|財信|高士|高手|高宇|高遠|高點|高寶|偉明|偉碩|健行|商周|商訊|商鼎|啟示|啟芳|啟動|國度|國家|基本|基泰|寂天|御璽|捷幼|捷徑|犁齋|笛藤|陳偉|雪山|雪嶺|麥田|麥書|傑森|凱信|創價|勝文|博大|博文|博揚|博雅|博識|喬木|尊彩|揚智|晴天|晴空|智言|智庫|智勝|智富|智優|智藤|渡假|渱海|華成|華杏|華岡|華品|華泰|華都|華滋|華逵|華雲|華興|華藝|華騰|証業|超邁|進源|開學|陽銘|雄獅|雅各|雅言|雅宴|雅墨|集文|傾向|勤宣|匯華|圓神|奧林|奧修|意識|愛家|慈濟|新月|新來|新苗|新陸|新意|新銳|楊桃|瑞蘭|碁峰|經濟|群星|聖嚴|詹氏|誠品|道聲|達人|達觀|電腦|鼎文|鼎茂|實力|旗立|旗林|旗標|滾石|漢思|漢網|爾雅|睿其|碩英|福地|種籽|精英|維京|臺大|臺虹|臺灣|蒼璧|蓋亞|誌成|豪霆|遠東|遠流|鳴嵐|劉驊|墨刻|墨客|寫樂|廣達|德威|慧炬|樂果|樂活|樂韻|盤逸|蔚藍|鄭媛|黎明|學習|學識|寰宇|憲業|橘子|獨立|獨步|積木|翰蘆|親親|頤蓁|環輿|聯輔|聯豐|臉譜|薪橋|邀月|簡單|藍海|藏新|雙月|雙向|雙葉|藝術|寶瓶|寶鼎|馨園|魔豆|讀享|驛站|體面|聯灃|如果|橡實|原點|大寫|啟動|日出|大宴|本事|果力|豐富|大雁|茉莉|新陸|眾悅|金楓|問學|三友|游擊|巩玥|','|CAA|九兆元|三之三|大峽谷|大都會|大龍海|小天下|小東西|小麥田|山田社|不求人|今周刊|天性道|巴比倫|文史哲|文經閣|方言文|水雲齋|以斯拉|出版菊|四塊玉|尼普利|平裝本|民生報|玉山社|宇宙光|行天宮|西遊記|希伯崙|希望地|改革宗|奇異果|季節風|帕斯頓|易博士|欣傳媒|知本家|知兵堂|知書房|知識流|邱再興|阿布拉|阿克屋|哈佛人|施明德|流行風|紅樹林|美麗殿|英特發|要有光|風向球|倍斯特|原動力|勒巴克|國防部|常春藤|張老師|張榮發|得勝者|御女王|麥浩斯|凱撒琳|博客思|智趣王|曾仕強|費邊社|開創家|黑眼睛|愛尼曼|愛生活|愛米粒|新文豐|新保成|新星球|新新聞|新經典|新學林|萬世紀|萬卷樓|資策會|遊目族|達人館|電腦人|漫遊者|數位人|歐萊禮|潮客風|學易齋|橡樹林|羲之堂|貓頭鷹|龍少年|龍時代|龍視界|龍圖騰|優百科|禪天下|薄伽梵|鴻儒堂|豐年社|騎士堡|藝風堂|藝術家|寶之藝|釀出版|紅螞蟻|漫遊者|新星球|地平線|三日月|資料夾|','|遠見天下|早安財經|天下雜誌|天下生活|親子天下|人本自然|三聯書店|大大創意|大未來耿|大好書屋|大新書局|大家健康|大鵬展翅|中華電視|中興工程|天佑智訊|心靈工坊|戶外生活|文景書局|日日幸福|牛津大學|世界文物|世界民航|世界書局|以琳書房|台灣角川|台灣東方|台灣東華|台灣麥克|平安有聲|未來書城|正一善書|生命潛能|田園城市|光電科技|全音樂譜|宇宙花園|安卓藝術|早安財經|米奇巴克|自轉星球|我視整合|秀威資訊|里仁書局|卓瑪央金|奇幻基地|奇異果子|幸福提案|幸福綠光|空中美語|近代中國|金色蓮花|南方家園|哈佛英語|建築情報|盈記唐人|科技圖書|英美語言|風雲時代|夏日書屋|師大書苑|師範大學|氣機導引|泰電電業|祖師禪林|財政學會|馬可孛羅|馬跡庫比|高等教育|健康產業|商業周刊|國策智庫|國語日報|婦幼家庭|理財文化|第一人稱|郭良蕙新|創意市集|博思智庫|富蘭克林|敦煌書局|智庫雲端|無限可能|策馬入林|華人版圖|華文創意|華文精典|華嚴蓮社|進源書局|逸文武術|開拓動漫|傳真文創|勤業眾信|奧林匹克|愛思唯爾|慈濟傳播|新手父母|經典雜誌|聖智學習|電腦家庭|滾石寰宇|漂亮家居|福智佛教|精神健康|網奕資訊|網路與書|臺商資源|臺灣大學|臺灣女性|臺灣角川|臺灣東方|臺灣東華|臺灣金融|臺灣麥克|臺灣經濟|臺灣聖經|遠見天下|遠見雜誌|銘傳大學|德明大學|德明財經|學生書局|寰宇知識|諾森貝登|靜思人文|彌勒皇教|聯合文學|聯合百科|麋研筆墨|雙語週報|麗緻菁華|靈活文化|家庭傳媒|深石數位|清文華泉|','|滾石不生苔|LaVie|Smart|Trend|大未來林舍|大考通訊社|中央通訊社|中國主日學|中華文化總|中華民國外|中華民國兒|中華民國電|中華民國對|中華民國學|中華民國證|中華原始佛|中華氣機導|中華財政學|中華奧林匹|中華經濟研|中華徵信所|天主教臺灣|文化基金會|台北市進出|台灣國際角|台灣學生書|外銷企業協|民間公民與|生活讀書新|先天救教道|全國藥品年|佛教正覺同|希代多媒體|希伯崙異象|亞太政治哲|兒童福利聯|典藏藝術家|法界佛教總|青年日報社|保險事業發|英文小魔女|原始佛教會|商業發展研|國立臺灣大|國立臺灣師|國際溝通管|基督教中國|基督教以琳|基督教宇宙|婦女與生活|麥格羅希爾|進出口商業|順益臺灣原|新台灣國策|新自然主義|新臺灣國策|經濟研究院|經濟新潮社|聖保祿孝女|董氏基金會|資訊工業策|電腦稽核協|寧瑪巴喇榮|對外貿易發|臺北市中國|臺北市文化|臺北市華嚴|臺北市進出|臺北市福智|臺北生活讀|臺北靈糧堂|臺灣知識庫|臺灣師範大|臺灣集中保|臺灣愛思唯|臺灣福音書|臺灣學生書|臺灣議事學|臺灣護理學|學校護理人|蕙風堂筆墨|貓咪予花兒|繁星多媒體|證券暨期貨|大家健康雜|臺灣凌速姊|']);
	aryCity.push(['桃園市','|成陽|目川|廣智|','|富瑞奇|','|中央大學|奇蹟資訊|奇蹟課程|','|國立中央大|']);
	aryCity.push(['臺中市','|酷派|康德|光慧|晨星|滄海|廣懋|暢談|白象|瑞成|東展|華碩|人智|及第|好讀|明倫|長晉|悅翔|浸宣|朝陽|森淼|源中|瑞華|說頻|銘顯|摩西|箱子|錦囊|寶德|銘顯|梅林|飛燕|','|華格那|瑪利亞|壹零壹|腓利門|豐兆乾|一中心|','|大象藝術|中國醫藥|中國醫大|天空數位|東海大學|逢甲大學|維特外語|學習工場|靜宜大學|','|專業全民英|臺中市佛教|']);
	aryCity.push(['高雄市','|河洛|巨流|東雨|金蘋|春暉|佛光|麗文|河畔|晟景|耕林|上鋐|旭營|百駿|林廷|玩美|前程|核心|文殊|愛智|簡一|天心|第一|于天|皮球|宇林|','|大憨蓮|清涼音|胖胖熊|佛光山|新裕豐|','|臺灣綠色|格子外面|金屬工業|高雄復文|拾光雪松|','|千佛山白雲|聖光神學院|臺大數位科|臺灣艾瑪文|成龍健康禮|新紀元圖書|']);
	aryCity.push(['新北市','|漢宇|双美|曼尼|晶冠|菩天|和平|三悅|上人|千華|大千|大紅|大喜|水星|五洲|世樺|巧育|幼福|印刻|光佑|百善|良辰|明天|明名|明德|松根|泛亞|空庭|金名|哈福|威翰|建興|飛天|曼尼|統一|創見|喬福|智寬|菁品|華立|華威|進源|雅事|瑞昇|漢湘|碩亞|聚財|閣林|廣文|樂幼|橄欖|親哲|龍岡|優美|鴻漸|鶴立|商流|朝日|旭昇|吳氏|采舍|','|大樹林|小牛津|代表作|花木蘭|喜樂亞|紫宸社|華文網|集夢坊|新一代|新文京|新文創|維他命|膳書房|蘋果屋|美藝學|綠柚林|檸檬樹|斑馬線|語樂多|','|台灣廣廈|紙印良品|美藝學苑|中華福音|台灣明名|時空膠囊|國際學村|教育之友|瑞麗美人|聖經資源|臺灣明名|臺灣廣廈|貿騰發賣|','|INK印刻|中華國際供|城邦印書館|愛孩子愛自|3Q寶貝館|']); //新北市中和區
	aryCity.push(['新北市','|凱特|西北|再生|全華|元將|昶景|幼福|創智|','|養生堂','|紡織產業','']); //新北市土城區
	aryCity.push(['新北市','|全威|易習|高立|康熹|經瑋|學齡|萬人|繁星|','','|瀚宇彩晶|普林斯頓|','|繁星多媒體|']); //新北市五股區
	aryCity.push(['新北市','|北星|永恩|木更|宏典|尚昂|狗狗|紅狐|韋伯|智力|華藝|誠品|稻田|龍溪|','|靈鷲山|','|小小書房|草原文創|','|中國學園傳|基督教晨曦|']); //新北市永和區
	aryCity.push(['新北市','|大拓|上河|生物|禾風|禾流|合記|永續|指南|科正|風車|凌雲|培育|野火|博悅|博誌|博碩|普天|雅典|廣毅|讀品|聯寶|我識|聯經|','|相對論|得昇多|智學堂|語言鳥|','|世界日報|經濟日報|聯合晚報|聯合線上|','|美國世界日|']); //新北市汐止區
	aryCity.push(['新北市','|大眾|大樂|化育|良品|東岱|浯舍|眾生|新手|聖環|遠景|噴泉|稻鄉|養沛|晴光|拾光|漢欣|','|金時代|飛行貓|雅書堂|楓書坊|楓葉社|楓樹林|滿天星|螢火蟲|','','']); //新北市板橋區
	aryCity.push(['新北市' ,'|玄奘|狂龍|采葒|醒吾|','|零極限|','|醒吾大學|','']); //新北市林口區
	aryCity.push(['新北市','|元麓|立村|非馬|揚智|葉子|生智|華志|知遠|','|新潮社|布拉格|','|21世紀|','|二十一世紀|']); //新北市深坑區
	aryCity.push(['新北市','|九印|八旗|大家|大智|大牌|大邁|小熊|小樹|小果|方舟|木馬|世茂|出色|立緒|左岸|宇畝|全佛|好的|好優|自由|宏碩|也是|巴巴|春山|我們|李茲|幸福|東村|哈林|洛特|飛田|啟英|眾文|康軒|繆思|幸福|野人|智富|無限|開拓|新地|暖暖|楨德|群英|群學|漢欣|漢威|漫步|遠足|廣場|廣智|歐亞|衛城|繆思|賽斯|藍海|源樺|繪虹|藝軒|蘊藏|魔酒|讀癮|字畝|步步|月熊|光現|奇点|奇點|奇光|易可|柏樂|啟得|永盈|叩應|','|一起來|小貓流|生之美|吉的堡|紅通通|周大觀|旺文社|星出版|釀出版|鸚鵡螺|','|自由之丘|悅讀名品|依揚想亮|人類文化|人類智庫|大光傳播|正中書局|行遍天下|校園書房|培生教育|台灣培生|臺灣培生|聯合發行|暖暖書屋|台灣商務|臺灣商務|快樂文化|','|巴帝維丹達|臺灣建築中|台灣建築中|心理出版社|']); //新北市新店區
	aryCity.push(['新北市','|上優|金塊|','|台科大|','|九藏喵窩|自轉星球|經史子集|輔大書坊|大和圖書|大和書報|','']); //新北市新莊區
	aryCity.push(['新北市','|平心|威向|高見|','|欣燦連|聿書館|','','']); //新北市樹林區
	aryCity.push(['新北市','|香海|新雨|前程|泰宇|新頁|大燈|功倍|','','','|臺灣中國信|']); //新北市三重區
	aryCity.push(['新北市','|大於|','','','']); //新北市三峽區
	aryCity.push(['新北市','|明智|','','','']); //新北市泰山區
	aryCity.push(['新北市','|九童|典絃|啟思|淡大|','|元氣齋|','|淡江大學|','']); //新北市淡水區
	aryCity.push(['新北市','|易利|','','','']); //新北市蘆洲區
	aryCity.push(['日本東京都','|角川|','|小学館|文響社|幻冬舎|講談社|','|文藝春秋|カンゼン|イースト|朝日新聞|ライツ社|','|学研プラス|主婦と生活|エクスナレ|KADOK|']);
	aryCity.push(['日本神戸市','','','|BL出版|','']);
	aryCity.push(['臺南市','|王家|長鴻|翰林|','','|海峽兩岸|','']);
	var imax = aryCity.length;
	for (var i=0;i<imax;i++) {
		var strFindText = '|' + strPublisher.substr(0,2) + '|';
		if (aryCity[i][1].indexOf(strFindText,0) !== 0-1) {
			document.getElementById(strID).value = aryCity[i][0];
		}
		strFindText = '|' + strPublisher.substr(0,3) + '|';
		if (aryCity[i][2].indexOf(strFindText,0) !== 0-1) {
			document.getElementById(strID).value = aryCity[i][0];
		}
		strFindText = '|' + strPublisher.substr(0,4) + '|';
		if (aryCity[i][3].indexOf(strFindText,0) !== 0-1) {
			document.getElementById(strID).value = aryCity[i][0];
		}
		strFindText = '|' + strPublisher.substr(0,5) + '|';
		if (aryCity[i][4].indexOf(strFindText,0) !== 0-1) {
			document.getElementById(strID).value = aryCity[i][0];
		}
	}

}

function toolCutPub(strReturn) {
	strReturn.replace('財團法人', '');
	strReturn.replace('英屬蓋曼群島商', '');
	strReturn.replace('英屬維京群島商', '');
	strReturn.replace('中華民國', '');
	strReturn.replace('臺閩地區', '');
	strReturn.replace('臺灣地區', '');
	strReturn.replace('社團法人', '');
	strReturn.replace('有限責任', '');
	strReturn.replace('株式会社', '');
	return strReturn;
}

function toolChkMairacle() {
	if (chkMairacle.checked) {
		sel095s.disabled = false;
		sel095z.disabled = false;
	}
	if (!chkMairacle.checked) {
		sel095s.disabled = true;
		sel095z.disabled = true;
	}
}

function tool100700(strReturn,strID) {
		var aryTemp = strReturn.split(',');
		var intLast = aryTemp.length-1;
		var intFind = aryTemp[intLast].indexOf(')',0);
		var strWrite = '';
		if (intFind !== 0-1) {
			strWrite = aryTemp[intLast].slice(intFind+1);
			strReturn = strReturn.replace(')'+strWrite,')');
		}
		
		if (intFind === 0-1) {
			var strLastWord = strReturn.slice(-4);
			var strAllWrite = '|文. 圖|文/攝影|文.攝影|文. 攝|責任編輯|執行編輯|文字編輯|纂修拾遺|指導教授|音樂總監|文. 攝影|計畫主持|';
			if (strAllWrite.indexOf(strLastWord + '|',0) !== -1) {
				strWrite = strLastWord;
				strReturn = strReturn.slice(0,-4);
			}
			if (strWrite === '') {
				strLastWord = strReturn.slice(-3);
				strAllWrite = '|文/圖|文.圖|文/攝|文.攝|評述者|刻書者|主持人|指揮家|評論者|演奏者|旁白者|與談人|操作者|演講者|出品人|經銷者|';
				if (strAllWrite.indexOf(strLastWord + '|',0) !== -1) {
					strWrite = strLastWord;
					strReturn = strReturn.slice(0,-3);
				}
			}
			if (strWrite === '') {
				strLastWord = strReturn.slice(-2);
				strAllWrite = '|文圖|編譯|原著|撰者|撰著|撰寫|撰述|撰錄|敕撰|撰文|作者|';
				strAllWrite += '|寫者|口述|述者|講述|主講|筆述|執筆|擬者|模擬|草擬|擬作|';
				strAllWrite += '|擬議|改寫|改編|編劇|著作|審訂|審定|編撰|編著|編寫|編述|';
				strAllWrite += '|纂修|編修|作詞|主編|敕編|編輯|編集|編次|編選|編錄|續編|';
				strAllWrite += '|彙編|編注|編註|編訂|補輯|特輯|輯錄|輯要|輯鈔|輯註|輯注|';
				strAllWrite += '|纂輯|編纂|纂修|協修|總纂|選集|選輯|選錄|選編|選次|選注|';
				strAllWrite += '|鈔纂|彙鈔|整理|記錄|筆記|筆述|監修|訪問|繪畫|繪者|插畫|';
				strAllWrite += '|插圖|圖畫|攝影|撮影|写真|譯述|口譯|重譯|翻譯|刪訂|修訂|';
				strAllWrite += '|續修|重修|刪補|補輯|補刊|補遺|纂補|删纂|解題|導讀|索隱|';
				strAllWrite += '|題記|評者|批評|評定|評閱|評改|選評|輯評|講義|參疏|述疏|';
				strAllWrite += '|疏證|疏解|補疏|注釋|釋文|箋釋|集解|講解|箋會|箋註|考注|';
				strAllWrite += '|補註|標註|訓譯|音義|音註|音注|音釋|注音|校訂|校定|校閱|';
				strAllWrite += '|箋校|校讀|校注|校點|校錄|校補|校記|校正|校刊|重校|點校|';
				strAllWrite += '|編校|勘誤|補正|訂譜|標點|點次|句讀|批點|評點|訓點|圖說|';
				strAllWrite += '|節錄|節縮|刪節|設計|素描|書寫|雕塑|主持|導演|製作|監製|';
				strAllWrite += '|演員|主演|指揮|舞者|演奏|旁白|與談|操作|操偶|作曲|編曲|';
				strAllWrite += '|演唱|演講|講者|經銷|代理|譯注|繪圖|';
				if (strAllWrite.indexOf(strLastWord + '|',0) !== -1) {
					strWrite = strLastWord;
					strReturn = strReturn.slice(0,-2);
				}
			}
			if (strWrite === '') {
				strLastWord = strReturn.slice(-1);
				strAllWrite = '|著|作|繪|譯|文|圖|編|輯|纂|選|攝|画|絵|抄|述|撰|';
				if (strAllWrite.indexOf(strLastWord + '|',0) !== -1) {
					strWrite = strLastWord;
					strReturn = strReturn.slice(0,-1);
				}
			}
		}
		if (strReturn.slice(-1) === '.') strReturn = strReturn.slice(0,-1);
		strReturn = strReturn.replace(/,\s/g,',');
		if (strID === '100a') {
			box100a.value = strReturn;
			if (strWrite !== '') cbx100a.value = strWrite;
			//switchRDArd('cbx100a');
		}
		if (strID === '700d') {
			box700D.value = strReturn;
			if (strWrite !== '') cbx700D.value = strWrite;
			//switchRDArd('cbx700D');
		}
		if (strID === '700t') {
			box700T.value = strReturn;
			if (strWrite !== '') cbx700T.value = strWrite;
			//switchRDArd('cbx700T');
		}
}

function switchRDArd(strID) {
	//依作者職責切換代碼
	let strTemp = '\|' + document.getElementById(strID).value + '\|';
	let strReturn = '';
	let strFind = '';
	let strFindAll = '';
	let intFind = 0;
	let aryFillSel = [];

	const findMappings = {
		'|文|述|筆|ぶん|written by|': {
			returnValue: 'aut',
			options: [['aut author/文字作者', 'aut', true]]
		},
		'|撰|': {
			returnValue: 'rsp',
			options: [
				['aut author/文字作者', 'aut', true],
				['rsp respondent/學位論文答辯者', 'rsp', false],
				['chr choreographer/編舞者', 'chr', false]
			]
		},
		'|編譯|': {
			returnValue: 'trl,edt',
			options: [['trl 譯者,edt 編者', 'trl,edt', true]]
		},
		'|譯注|': {
			returnValue: 'trl,wac',
			options: [['trl 譯者,wac 評論者', 'trl,wac', true]]
		},
		'|文圖|文/圖|文.圖|文. 圖|': {
			returnValue: 'aut',
			options: [
				['aut author/文字作者', 'aut', true],
				['aut 文字作者,ill 插圖者', 'aut,ill', false]
			]
		},
		'|文/攝影|文.攝影|文. 攝影|文/攝|文.攝|文. 攝|': {
			returnValue: 'aut',
			options: [
				['aut author/文字作者','aut',true],
				['aut 文字作者,pht 攝影者','aut,pht',false]
			]
		},
		'|著|著者|': {
			returnValue: 'aut',
			options: [
				['aut author/文字作者','aut',true],
				['aus screenwriter/影片編劇','aus',false],
				['dsr designer/設計者','dsr',false],
				['ivr interviewer/訪問者','ivr',false],
				['pht photographer/攝影者','pht',false],
				['prg programmer/程式設計師','prg',false],
				['ill illustrator/插圖者','ill',false],
				['cll calligrapher/書法家','cll',false],
				['scl sculptor/雕塑創作者','scl',false],
				['chr choreographer/編舞者','chr',false],
				['cmp composer/作曲者','cmp',false]
			]
		},
		'|作|作者|': {
			returnValue: 'aut',
			options: [
				['aut author/文字作者','aut',true],
				['ill illustrator/插圖者','ill',false],
				['pht photographer/攝影者','pht',false],
				['prg programmer/程式設計師','prg',false],
				['arc architect/建築師','arc',false],
				['lsa landscape architect/景觀設計師','lsa',false],
				['art artist/藝術創作者','art',false],
				['cll calligrapher/書法家','cll',false],
				['scl sculptor/雕塑創作者','scl',false],
				['chr choreographer/編舞者','chr',false],
				['cmp composer/作曲者','cmp',false]
			]
		},
		'|原著|撰者|撰著|撰寫|撰述|撰錄|敕撰|撰文|寫者|口述|述者|講述|主講|筆述|執筆|擬者|模擬|草擬|擬作|擬議|改寫|改編|': {
			returnValue: 'aut',
			options: [
				['aut author/文字作者','aut',true]
			]
		},
		'|詞|作詞|': {
			returnValue: 'lbt',
			options: [
				['lbt librettist/劇詞作者','lbt',true],
				['lyr lyricist/歌詞作者','lyr',false]
			]
		},
		'|編劇|著作|': {
			returnValue: 'aus',
			options: [
				['aus screenwriter/影片編劇','aus',true]
			]
		},
		'|審訂|審定|': {
			returnValue: 'cns',
			options: [
				['cns censor/審查者','cns',true]
			]
		},
		'|編撰|編著|編寫|編述|纂修|編修|': {
			returnValue: 'com',
			options: [
				['com compiler/編著者','com',true]
			]
		},
		'|責任編輯|主編|敕編|編輯|編集|編次|編選|編錄|續編|彙編|執行編輯|編注|編註|編訂|輯|補輯|特輯|輯錄|輯要|輯鈔|輯註|輯注|纂|纂輯|編纂|纂修|纂修拾遺|協修|總纂|選|選集|選輯|選錄|選編|選次|選注|鈔|抄|鈔纂|彙鈔|整理|記|記錄|筆記|筆述|': {
			returnValue: 'edt',
			options: [
				['edt editor/編輯','edt',true]
			]
		},
		'|總編|總編輯|': {
			returnValue: 'edt',
			options: [
				['edt editor/編輯','edt',true],
				['edd editorial director/總編輯','edd',false]
			]
		},
		'|監修|': {
			returnValue: 'edt',
			options: [
				['edt editor/編輯','edt',true],
				['aut author/文字作者','aut',false]
			]
		},
		'|編|': {
			returnValue: 'edt',
			options: [
				['edt editor/編輯','edt',true],
				['ivr interviewer/訪問者','ivr',false]
			]
		},
		'|訪問|': {
			returnValue: 'ive',
			options: [
				['ive interviewee/受訪者','ive',true],
				['ivr interviewer/訪問者','ivr',false]
			]
		},
		'|繪|畫|繪畫|': {
			returnValue: 'ill',
			options: [
				['ill illustrator/插圖者','ill',true],
				['art artist/藝術創作者','art',false]
			]
		},
		'|創辦|創辦者|': {
			returnValue: 'fon',
			options: [
				['fon founder of work/創辦者','fon',true]
			]
		},
		'|繪者|插畫|插圖|圖|圖畫|繪圖|画|絵|え|イラスト|': {
			returnValue: 'ill',
			options: [
				['ill illustrator/插圖者','ill',true]
			]
		},
		'|攝|攝影|撮影|写真|': {
			returnValue: 'pht',
			options: [
				['pht photographer/攝影者','pht',true]
			]
		},
		'|譯|訳|譯述|口譯|重譯|翻譯|譯者|': {
			returnValue: 'trl',
			options: [
				['trl translator/譯者','trl',true]
			]
		},
		'|刪訂|修訂|續修|重修|刪補|補輯|補刊|補遺|纂補|删纂|解題|導讀|索隱|題記|': {
			returnValue: 'wst',
			options: [
				['wst writer of supplementary textual content/補充文本者','wst',true]
			]
		},
		'|評者|評述者|批評|評定|評閱|評改|選評|輯評|講義|參疏|述疏|疏證|疏解|補疏|注釋|釋文|箋釋|集解|解|講解|箋會|箋註|考注|補註|標註|訓譯|音義|音註|音注|音釋|注音|校訂|校定|校閱|箋校|校讀|校注|校點|校錄|校補|校記|校正|校刊|重校|點校|編校|勘誤|補正|訂譜|標點|點次|句讀|批點|評點|訓點|': {
			returnValue: 'wac',
			options: [
				['wac writer of added commentary /評論者','wac',true]
			]
		},
		'|圖說|': {
			returnValue: 'wat',
			options: [
				['wat writer of added text/文字說明者','wat',true]
			]
		},
		'|節錄|節縮|刪節|': {
			returnValue: 'abr',
			options: [
				['abridger/節縮者','abr',true]
			]
		},
		'|設計|': {
			returnValue: 'arc',
			options: [
				['arc architect/建築師','arc',true],
				['art artist/藝術創作者','art',false]
			]
		},
		'|素描|': {
			returnValue: 'art',
			options: [
				['art artist/藝術創作者','art',true]
			]
		},
		'|書寫|': {
			returnValue: 'cll',
			options: [
				['cll calligrapher/書法家','cll',true]
			]
		},
		'|雕塑|': {
			returnValue: 'scl',
			options: [
				['scl sculptor/雕塑創作者','scl',true]
			]
		},
		'|刻書者|': {
			returnValue: 'egr',
			options: [
				['egr engraver/雕刻者','egr',true]
			]
		},
		'|主持|主持人|': {
			returnValue: 'pra',
			options: [
				['pra praeses/學術審議主持人','pra',true],
				['hst host/節目主持人','hst',false],
				['mod moderator/談話性節目主持人','mod',false]
			]
		},
		'|計畫主持|': {
			returnValue: 'pra',
			options: [
				['pra praeses/學術審議主持人','pra',true]
			]
		},
		'|指導教授|': {
			returnValue: 'dgs',
			options: [
				['dgs degree supervisor/指導教授','dgs',true]
			]
		},
		'|導演|': {
			returnValue: 'drt',
			options: [
				['drt director/導演','drt',true],
				['fmd film director/電影導演','fmd',false],
				['rdd radio director/電台導播','rdd',false],
				['tld television director/電視導播','tld',false],
				['sgd stage director/舞台導演','sgd',false]
			]
		},
		'|製作|監製|': {
			returnValue: 'pro',
			options: [
				['pro producer/製作者','pro',true],
				['fmp film producer/電影製作者','fmp',false],
				['rpc radio producer/電台製作者','rpc',false],
				['tlp television producer/電視製作者','tlp',false],
				['anm animator/動畫製作者','anm',false]
			]
		},
		'|音樂總監|': {
			returnValue: 'msd',
			options: [
				['musical director/音樂總監','msd',true]
			]
		},
		'|演員|主演|': {
			returnValue: 'act',
			options: [
				['act actor/演員','act',true]
			]
		},
		'|指揮家|指揮|': {
			returnValue: 'cnd',
			options: [
				['cnd conductor/指揮家','cnd',true]
			]
		},
		'|評論者|': {
			returnValue: 'cmm',
			options: [
				['cmm commentator/評論者','cmm',true]
			]
		},
		'|舞者|': {
			returnValue: 'dnc',
			options: [
				['dnc dancer/舞者','dnc',true]
			]
		},
		'|演奏者|演奏|': {
			returnValue: 'itr',
			options: [
				['itr instrumentalist/樂器演奏者','itr',true]
			]
		},
		'|旁白者|旁白|': {
			returnValue: 'nrt',
			options: [
				['nrt narrator/旁白者','nrt',true]
			]
		},
		'|與談人|與談|': {
			returnValue: 'pan',
			options: [
				['pan panelist/節目與談人','pan',true]
			]
		},
		'|操作者|操作|操偶|': {
			returnValue: 'ppt',
			options: [
				['ppt puppeteer/木偶操作者','ppt',true]
			]
		},
		'|作曲|編曲|': {
			returnValue: 'cmp',
			options: [
				['cmp composer/作曲者','cmp',true]
			]
		},
		'|演唱|唱|': {
			returnValue: 'sng',
			options: [
				['sng singer/演唱者','sng',true]
			]
		},
		'|演講者|演講|講者|': {
			returnValue: 'spk',
			options: [
				['spk speaker/演講者','spk',true]
			]
		},
		'|出品人|': {
			returnValue: 'pre',
			options: [
				['pre presenter/出品人','pre',true]
			]
		},
		'|配音|配音員|': {
			returnValue: 'vac',
			options: [
				['vac voice actor/配音員','vac',true]
			]
		},
		'|經銷者|經銷|代理|': {
			returnValue: 'fds',
			options: [
				['fds film distributor/電影經銷者','fds',true]
			]
		}
	};

	let found = false; // 用於追蹤是否找到匹配項

	for (const strFind in findMappings) {
		strFindAll += strFind;
		const { returnValue, options } = findMappings[strFind];
		const intFind = strFind.indexOf(strTemp, 0);
		
		if (intFind !== -1) { // 修改這裡的條件
			strReturn = returnValue;
			aryFillSel.push(...options);
			found = true; // 標記為已找到
			break; // 找到後可以提前退出循環
		}
	}

	// 如果沒有找到任何匹配項，則回傳預設 options
	if (!found) {
		strReturn = '',
		aryFillSel.push(['aut author/文字作者','aut',false]);
		aryFillSel.push(['ill illustrator/插圖者','ill',false]);
		aryFillSel.push(['pht photographer/攝影者','pht',false]);
		aryFillSel.push(['trl translator/譯者','trl',false]);
		aryFillSel.push(['com compiler/編著者','com',false]);
		aryFillSel.push(['edt editor/編輯','edt',false]);
		aryFillSel.push(['edd editorial director/總編輯','edd',false]);
		aryFillSel.push(['ive interviewee/受訪者','ive',false]);
		aryFillSel.push(['ivr interviewer/訪問者','ivr',false]);
		aryFillSel.push(['wst writer of supplementary textual content/補充文本者','wst',false]);
		aryFillSel.push(['wac writer of added commentary /評論者','wac',false]);
		aryFillSel.push(['wat writer of added text/文字說明者','wat',false]);
		aryFillSel.push(['rcp addressee 收件者','rcp',false]);
		aryFillSel.push(['wal writer of added lyrics/填詞者','wal',false]);
		aryFillSel.push(['win writer of introduction/簡介作者','win',false]);
		aryFillSel.push(['wpr writer of preface/前言作者','wpr',false]);
		aryFillSel.push(['abridger/節縮者','abr',false]);
		aryFillSel.push(['fon founder of work/創辦者','fon',false]);
		aryFillSel.push(['prg programmer/程式設計師','prg',false]);
		aryFillSel.push(['pra praeses/學術審議主持人','pra',false]);
		aryFillSel.push(['dgs degree supervisor/指導教授','dgs',false]);
		aryFillSel.push(['rsp respondent/學位論文答辯者','rsp',false]);
		aryFillSel.push(['dgg degree granting institution/學位授予機構','dgg',false]);
		aryFillSel.push(['res researcher/研究者','res',false]);
		aryFillSel.push(['cns censor/審查者','cns',false]);
		aryFillSel.push(['dsr designer/設計者','dsr',false]);
		aryFillSel.push(['art artist/藝術創作者','art',false]);
		aryFillSel.push(['cll calligrapher/書法家','cll',false]);
		aryFillSel.push(['scl sculptor/雕塑創作者','scl',false]);
		aryFillSel.push(['egr engraver/雕刻者','egr',false]);
		aryFillSel.push(['arc architect/建築師','arc',false]);
		aryFillSel.push(['drt director/導演','drt',false]);
		aryFillSel.push(['fmd film director/電影導演','fmd',false]);
		aryFillSel.push(['act actor/演員','act',false]);
		aryFillSel.push(['vac voice actor/配音員','vac',false]);
		aryFillSel.push(['rdd radio director/電台導播','rdd',false]);
		aryFillSel.push(['tld television director/電視導播','tld',false]);
		aryFillSel.push(['sgd stage director/舞台導演','sgd',false]);
		aryFillSel.push(['chr choreographer/編舞者','chr',false]);
		aryFillSel.push(['aus screenwriter/影片編劇','aus',false]);
		aryFillSel.push(['pro producer/製作者','pro',false]);
		aryFillSel.push(['fmp film producer/電影製作者','fmp',false]);
		aryFillSel.push(['rpc radio producer/電台製作者','rpc',false]);
		aryFillSel.push(['tlp television producer/電視製作者','tlp',false]);
		aryFillSel.push(['anm animator/動畫製作者','anm',false]);
		aryFillSel.push(['musical director/音樂總監','msd',false]);
		aryFillSel.push(['prn production company/出資者','prn',false]);
		aryFillSel.push(['rce recording engineer/錄音師','rce',false]);
		aryFillSel.push(['cst costume designer/服裝設計者','cst',false]);
		aryFillSel.push(['edm editor of moving image work/動態影像作品編輯','edm',false]);
		aryFillSel.push(['msd musical director/音樂總監','msd',false]);
		aryFillSel.push(['cmm commentator/評論者','cmm',false]);
		aryFillSel.push(['osp on-screen presenter/節目說明人','osp',false]);
		aryFillSel.push(['pan panelist/節目與談人','pan',false]);
		aryFillSel.push(['stl storyteller/說故事者','stl',false]);
		aryFillSel.push(['tch instructor/表演指導者','tch',false]);
		aryFillSel.push(['hst host/節目主持人','hst',false]);
		aryFillSel.push(['mod moderator/談話性節目主持人','mod',false]);
		aryFillSel.push(['dnc dancer/舞者','dnc',false]);
		aryFillSel.push(['nrt narrator/旁白者','nrt',false]);
		aryFillSel.push(['prs production designer/產品設計者','prs',false]);
		aryFillSel.push(['rcd recordist/錄音者','rcd',false]);
		aryFillSel.push(['sds sound designer/音響設計師','sds',false]);
		aryFillSel.push(['trc transcriber/轉錄者','trc',false]);
		aryFillSel.push(['brd broadcaster/播放員','brd',false]);
		aryFillSel.push(['pan panelist/節目與談人','pan',false]);
		aryFillSel.push(['ppt puppeteer/木偶操作者','ppt',false]);
		aryFillSel.push(['lbt librettist/劇詞作者','lbt',false]);
		aryFillSel.push(['lyr lyricist/歌詞作者','lyr',false]);
		aryFillSel.push(['cmp composer/作曲者','cmp',false]);
		aryFillSel.push(['sng singer/演唱者','sng',false]);
		aryFillSel.push(['itr instrumentalist/樂器演奏者','itr',false]);
		aryFillSel.push(['cnd conductor/指揮家','cnd',false]);
		aryFillSel.push(['spk speaker/演講者','spk',false]);
		aryFillSel.push(['pre presenter/出品人','pre',false]);
		aryFillSel.push(['fds film distributor/電影經銷者','fds',false]);
		aryFillSel.push(['cmm commentator/評論者','cmm',false]);
		aryFillSel.push(['isb issuing body 發行者','isb',false]);
		aryFillSel.push(['med medium 中介者','med',false]);
		aryFillSel.push(['enj enacting jurisdiction/法定管轄單位','enj',false]);
		aryFillSel.push(['ptf plaintiff/原告','ptf',false]);
		aryFillSel.push(['dfd defendant/被告','dfd',false]);
		aryFillSel.push(['apl appellant/上訴者','apl',false]);
		aryFillSel.push(['ape appellee/被上訴者','ape',false]);
		aryFillSel.push(['cou court governed/管轄法院','cou',false]);
		aryFillSel.push(['jud judge/法官','jud',false]);
		aryFillSel.push(['jug jurisdiction governed/司法管轄單位','jug',false]);
		aryFillSel.push(['crt court reporter/法庭書記','crt',false]);
		aryFillSel.push(['his host institution/主辦機構','his',false]);
		aryFillSel.push(['orm organizer/主辦單位','orm',false]);
		aryFillSel.push(['hnr honouree/致敬對象','hnr',false]);
		aryFillSel.push(['inv inventor/發明者','inv',false]);
		aryFillSel.push(['csl consultant/諮詢顧問','csl',false]);
		aryFillSel.push(['dte dedicatee/致獻對象','dte',false]);
		aryFillSel.push(['dto dedicator/奉獻者','dto',false]);
		aryFillSel.push(['srv surveyor/地圖測量者','srv',false]);
		aryFillSel.push(['drm draftsman/草圖繪製者','drm',false]);
		aryFillSel.push(['adi art director/藝術總監','adi',false]);
		aryFillSel.push(['clr colourist/配色者','clr',false]);
		aryFillSel.push(['rsr restorationist (expression)/修復者','rsr',false]);
		aryFillSel.push(['bkd book designer/圖書設計者','bkd',false]);
		aryFillSel.push(['cas caster/鑄造者','cas',false]);
		aryFillSel.push(['clt collotyper/珂羅版印者','clt',false]);
		aryFillSel.push(['etr etcher/蝕刻者','etr',false]);
		aryFillSel.push(['ltg lithographer/平版印刷者','ltg',false]);
		aryFillSel.push(['ppm papermaker/造紙者','ppm',false]);
		aryFillSel.push(['plt platemaker/製版者','plt',false]);
		aryFillSel.push(['prt printer/印刷者','prt',false]);
		aryFillSel.push(['prm printmaker/版畫製作者','prm',false]);
		aryFillSel.push(['cur curator/策展人','cur',false]);
		aryFillSel.push(['cor collection registrar/藏品登錄者','cor',false]);
		aryFillSel.push(['col collector/徵集者','col',false]);
		aryFillSel.push(['mtk minute taker/會議紀要者','mtk',false]);
		aryFillSel.push(['brl braille embosser/點字製作者','brl',false]);
		aryFillSel.push(['own current owner/目前持有者','own',false]);
		aryFillSel.push(['dpt depositor/寄存者','dpt',false]);
		aryFillSel.push(['fmo former owner/先前持有者','fmo',false]);
		aryFillSel.push(['dnr donor/捐贈者','dnr',false]);
		aryFillSel.push(['sll seller/賣方','sll',false]);
		aryFillSel.push(['ann annotator/手寫註解者','ann',false]);
		aryFillSel.push(['ato autographer/親筆簽名者','ato',false]);
		aryFillSel.push(['bnd binder/裝訂者','bnd',false]);
		aryFillSel.push(['dte dedicate (item)/致獻對象(單件)','dte',false]);
		aryFillSel.push(['hnr honouree (item)/致敬對象(單件)','hnr',false]);
		aryFillSel.push(['ilu illuminator/裝飾者','ilu',false]);
		aryFillSel.push(['ins inscriber/獻詞作者','ins',false]);
		aryFillSel.push(['rsr restorationist (item)/修復者(單件)','rsr',false]);
}

	document.getElementById(strID + '4').value = strReturn;
	//清空內容
	let strID2 = 'sel' + strID.slice(3) + '4';
	let select01 = document.getElementById(strID2);
	select01.options.length = 0;
	//新增項目
	var jmax = aryFillSel.length
	for(j = 0; j<jmax; j++) {
		select01.options.add(new Option(aryFillSel[j][0], aryFillSel[j][1], aryFillSel[j][2]));
	}
}

function capitalizeSentences(text) {
	const properNouns = ['Chinese','China', 'English', 'JavaScript','Taiwan','New Taipei','Taipei','African','American','America','Caucasian','Asia'];

	const sentences = text.split(/[\.\?!]/);

	const capitalizedSentences = sentences.map(sentence => {
		const trimmedSentence = sentence.trim();
		if (trimmedSentence.length === 0) {
			return '';
		}

		const words = trimmedSentence.split(' ');

		const capitalizedWords = words.map((word, index) => {
			if (index === 0) {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			}
			if (properNouns.includes(word)) {
				return word;
			}
			return word.toLowerCase();
		});

		return capitalizedWords.join(' ');
	});

	return capitalizedSentences.filter(Boolean).join(' ').trim();
}