function ouputMARC() {
	toolHideMARC('1');
	// 檢查必填欄位
	document.getElementById('box020c').style.backgroundColor = box020c.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box084a').style.backgroundColor = box084a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	var ifbox084b = 0; //判斷084$b
	ifbox084b = box084b.value.length < 3 ? ifbox084b + 1 : ifbox084b + 0;
	ifbox084b = box084b.value.indexOf('?',0) !== 0-1 ? ifbox084b + 1 : ifbox084b + 0;
	document.getElementById('box084b').style.backgroundColor = ifbox084b !== 0 ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box100a').style.backgroundColor = box100a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box245a').style.backgroundColor = box245a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box260a').style.backgroundColor = box260a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('sel260a').style.backgroundColor = box260a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box260b').style.backgroundColor = box260b.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('sel260b').style.backgroundColor = box260b.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box260c').style.backgroundColor = box260c.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box300a').style.backgroundColor = box300a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('sel300a').style.backgroundColor = box300a.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('box300b').style.backgroundColor = box300b.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('cbx300c').style.backgroundColor = cbx300c.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';
	document.getElementById('sel300c').style.backgroundColor = cbx300c.value === '' ? 'var(--lightyellow-bg)' : 'var(--bg-color)';

	// 輸出MARC

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

	var ifRDA = document.getElementById('chkRDA').checked;  // 輸出為RDA
	var ifNRRC = false; // 判斷是否為NRRC
	ifNRRC = btnShowNRRC.innerHTML === '▼' ? false : true;
	var strCODE = 'chi'; //判斷為中編或英編
	if (bib008a35.value.substr(0,3) !== 'chi' && bib008a35.value.substr(0,3) !== 'jpn') strCODE = 'eng';
	if ('Audio|DVDs|Toys'.indexOf(strType,0) !== 0-1) strCODE = 'chi';

	var strMARC = lbl008.value + '\n';  // 待輸出
	var strThisLine = ''; // 待輸出本段

	// 017.020.022.024.037段[一般資料]
	box020a.value = box020a.value.trim();
	box020q.value = box020q.value.trim();
	box020c.value = box020c.value.trim();
	if (strType !== 'Audio' && strType !== 'DVDs') {
		if (box017a.value !== '') strThisLine = '017 #8 |a' + box017a.value.trim() + '|2rocgpt';
		if (strThisLine !== '') strThisLine += '\n';
		if (box020ALL.value === '') {
			// if (boxAV024a.value + boxAV020c.value === '') {
				box020q.value = box020q.value.replace(' : ',' ; |q');
				box020q.value = box020q.value.replace(' ; ',' ; |q');
				box020q.value = box020q.value.replace('|q|q','|q');
				var str020Head = document.querySelector('#cbx020Head').value;
				if (str020Head === 'ISBN') {
					strThisLine += '020    ';
					if (box020a.value !== '') strThisLine += '|a' + box020a.value;
					if (box020q.value !== '') strThisLine += '|q(' + GotChi2Eng(box020q.value,'020q',strCODE) +')';
					if (box020c.value !== '') strThisLine += ' : |cNT$' + box020c.value;
				}
				if (str020Head === 'ISSN') {
					if (box020a.value !== '') strThisLine += '022    |a' + box020a.value+ '\n';
					strThisLine += '037    |cNT$' + box020c.value +
						' (' + GotChi2Eng(box020q.value,'020q',strCODE) + ')'
				}
				if (str020Head === 'EAN') {
					strThisLine += '020    |q(' + GotChi2Eng(box020q.value,'020q',strCODE) + ')';
					if (box020c.value !== '') strThisLine += '|cNT$' + box020c.value;
					if (box020a.value !== '') {
						if (strType !== 'Toys') strThisLine += '\n' + '024 3# |a' + box020a.value;
						if (strType === 'Toys') {
							if (box020a.value.length === 13) strThisLine += '\n' + '024 3# |a' + box020a.value;
							if (box020a.value.length < 13) strThisLine += '\n' + '024 8# |a' + box020a.value;
						}
					}
				}
			// }
		} else if (box020ALL.value !== '') {
			strThisLine += GotChi2Eng(box020ALL.value,'020q',strCODE);
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 017.020.024.028段[視聽資料]
	if (strType === 'Audio' || strType === 'DVDs') {
		if (boxAV017a.value !== '') strThisLine = '017 #8 |a' + boxAV017a.value.trim() + '|2rocgpt';
		if (strThisLine !== '') strThisLine += '\n';
		strThisLine += '020    |cNT$' + boxAV020c.value;
		if (boxAV024a.value !== '') strThisLine += '\n' + '024 3# |a' + boxAV024a.value;
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 028段[視聽資料]
	if (strType === 'Audio' || strType === 'DVDs') {
		if (boxAV028a.value + boxAV028b.value !== '') {
			strThisLine = '028 42 ';
			if (boxAV028a.value !== '') strThisLine += '|a' + boxAV028a.value.trim();
			if (boxAV028b.value !== '') strThisLine += '|b' + boxAV028b.value.trim();
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 035.037段[NRRC]
	if (ifNRRC) {
		if (txtNRRC035.value !== 'NO' ) {
			if (txtNRRC035.value !== '') strThisLine = '035    |a' + txtNRRC035.value.trim() + '\n';
		}
		if (txtNRRC037.value !== '') strThisLine += '037    |b' + txtNRRC037.value.trim();
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 040段
	if (strCODE === 'chi') strThisLine = chkRDA.checked ? '040    |aTWTCL|bchi|cTWTCL|erda' : '040    |aTWTCL|bchi|cTWTCL|eccr';
	if (strCODE === 'eng') strThisLine = chkRDA.checked ? '040    |aTWTCL|beng|cTWTCL|erda' : '040    |aTWTCL|beng|cTWTCL|eaacr';
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 041段[一般資料]
	if (strType !== 'Audio' && strType !== 'DVDs' && strType !== 'Toys') {
		if (box041h.value === '') strThisLine = '041 0  |a' + bib008a35.value.substr(0,3);
		if (box041h.value !== '') strThisLine = '041 1  |a' + bib008a35.value.substr(0,3);
		if (chkMulLang.checked === true) strThisLine += '|a' + bib041b.value.substr(0,3);
		if (box041h.value !== '') strThisLine += '|h' + box041h.value.substr(0,3);
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 041段[視聽資料]
	if (strType === 'Audio' || strType === 'DVDs') {
		strThisLine = '041 ';
		if (box041h.value === '') strThisLine += '0# |a';
		if (box041h.value !== '') strThisLine += '1# |a';
		var strTemp = box041aAV.value.replace(/,/g,'|a');
		strThisLine += strTemp;
		if (box041h.value !== '') strThisLine += '|h' + box041h.value.substr(0,3);
		if (box041j.value !== '') {
			strTemp = box041j.value.trim();
			var aryTemp = strTemp.split(',');
			if (aryTemp.length <= 2) strTemp = strTemp.replace(/,/g,'|j');
			if (aryTemp.length > 2) strTemp = aryTemp[0] + '|j' + aryTemp[1] + '|jmul';
			strThisLine += '|j' + strTemp;
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 041段[玩具]
	if (strType === 'Toys') {
		let strToyLang = bib008a35.value.substr(0,3);
		if (strToyLang === 'zxx') strToyLang = 'chi';
		if (box041h.value === '') strThisLine = '041 0  |a' + strToyLang;
		if (box041h.value !== '') strThisLine = '041 1  |a' + strToyLang;
		if (chkMulLang.checked === true) strThisLine += '|a' + bib041b.value.substr(0,3);
		if (box041h.value !== '') strThisLine += '|h' + box041h.value.substr(0,3);
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 082.084段
	if (strCODE === 'chi') strThisLine = '084    |a' + box084a.value.trim();
	if (strCODE === 'eng') strThisLine = '082    |a' + box084a.value.trim();
	if (strType !== 'Toys') {
		if(box084b.value !== '') strThisLine += '|b' + box084b.value.trim();
		if (strCODE === 'chi') strThisLine += '|2ncsclt';
		if (strCODE === 'eng') strThisLine += '|223';
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 090段[NRRC]
	if (ifNRRC) {
		if (txtNRRC090.value !== '') strThisLine = '090    |a' + txtNRRC090.value.trim();
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 095.096段[於Local Storage]
	if (localStorage.getItem('BookStacks')) strThisLine = localStorage.getItem('BookStacks');
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 100.110.130段
	if (box100a.value + box700D.value + box700T.value === '') {
		//無作者，著錄130段
		strThisLine = '130 1' + toolGetSkip(box245a.value) + ' |a' + box245a.value.trim() +
			'|l' + box240l.value.trim();
	}
	if (box100a.value !== '') {
		box100a.value = toolNoSpace(box100a.value);
		box700D.value = toolNoSpace(box700D.value);
		box700T.value = toolNoSpace(box700T.value);
		let str100Temp = box100a.value.split(',');
		let str1004Temp = strCODE === 'eng' ? `.|4` : `|4`;
		if (chk100a.checked === false) {
			strThisLine = '100 1  |a' + toolGetAuthor(str100Temp[0],'100');
			if (chkRDA.checked) strThisLine += str1004Temp + cbx100a4.value.replace(/\,/g,`|4`);
		}
		if (chk100a.checked === true) {
			strThisLine = '110 2  |a' + toolGetAuthor(str100Temp[0],'110');
			if (chkRDA.checked) strThisLine += str1004Temp + cbx100a4.value.replace(/\,/g,`|4`);
		}
	}
	if (box100a.value === '' && box100a.value + box700D.value + box700T.value !== '') {
		let str100Temp = box700D.value.split(',');
		if (chk700D.checked === false) strThisLine = '100 1  |a' + toolGetAuthor(str100Temp[0],'100') + str1004Temp + cbx100a4.value.replace(/\,/g,`|4`);
		if (chk700D.checked === true) strThisLine = '110 2  |a' + toolGetAuthor(str100Temp[0],'110') + str1004Temp + cbx100a4.value.replace(/\,/g,`|4`);
	}
	strThisLine = strThisLine.replace(/\.\.\|/g, '\.|');
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 240段
	if (box240a.value !== '') {
		var strTemp = box240a.value;
		strTemp = strTemp.replace(/:/g, ' : ');
		strTemp = strTemp.replace(/  /g, ' ');
		box240a.value = strTemp;
		var str240Temp = box240a.value.split(' : ');
		strThisLine = '240 1' + toolGetSkip(str240Temp[0]) + ' |a' + str240Temp[0].trim() + '. |l' + box240l.value.trim();
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 245段
	strThisLine = '245 ';
	if (box100a.value + box700D.value + box700T.value === '') strThisLine += '0';
	if (box100a.value + box700D.value + box700T.value !== '') strThisLine += '1';
	if (box245a.value !== '') strThisLine += toolGetSkip(box245a.value.trim()) + ' |a' + box245a.value.trim();

	if (box245n.value + box245p.value !== '') {
		if (box245n.value !== '') {
			strThisLine += '. |n' + box245n.value.trim();
			if (box245p.value !=='') strThisLine += ', |p' + box245p.value.trim();
		} else if (box245n.value === '') {
			if (box245p.value !=='') strThisLine += '. |p' + box245p.value.trim();
		}
	}
	if (box245b.value !== '') {
		var str245b = box245b.value.trim();
		if (strCODE === 'chi') {
			var intIsEnglish = GotIsEng(str245b);
			if (intIsEnglish !== 0) strThisLine += ' : |b' + str245b.trim();
			if (intIsEnglish === 0) strThisLine += ' = |b' + str245b.trim();
		}
		if (strCODE === 'eng') {
			strThisLine += ' : |b' + str245b.trim();
		}
	}
	if (box100a.value + box700D.value + box700T.value !== '') {
		strThisLine += ' / |c';
		if (box100a.value !== '') strThisLine += GotMutiAuthors(box100a.value,cbx100a.value,strCODE);
		if (box700D.value !== '') strThisLine += ' ; ' +GotMutiAuthors(box700D.value,cbx700D.value,strCODE);
		if (box700T.value !== '') strThisLine += ' ; ' +GotMutiAuthors(box700T.value,cbx700T.value,strCODE);
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 246段
	if (box245b.value !== '') {
		if (strCODE === 'chi') {
			var ary245b = box245b.value.split(' = ');
			var int245b = ary245b.length;
			if (int245b === 1) {
				var intIsEnglish = GotIsEng(ary245b[0]);
				if (intIsEnglish === 0) {
					let str246bTemp = ary245b[0].trim().charAt(0).toUpperCase() + ary245b[0].trim().slice(1);
					strThisLine = '246 31 |a' + str246bTemp;
				}
				if (intIsEnglish !== 0) strThisLine = '246 30 |a' + ary245b[0].trim();
			} else if (int245b !== 1) {
				strThisLine = '246 30 |a' + ary245b[0].trim() +'\n';
				let str246bTemp = ary245b[1].trim().charAt(0).toUpperCase() + ary245b[1].trim().slice(1);
				strThisLine += '246 31 |a' + str246bTemp;
			}
		} else if (strCODE === 'eng') {
			let str246bTemp = box245b.value.trim().charAt(0).toUpperCase() + box245b.value.trim().slice(1);
			strThisLine = '246 30 |a' + str246bTemp;
		}
	}
	if (strType !== 'Toys') Set246s(strCODE);
	if (box245p.value !== '') {
		if (strThisLine !== '') strThisLine += '\n';
		strThisLine += '246 30 |a' + box245p.value.trim();
	}
	if (box240a.value.indexOf(':',0) !== 0-1) {
		var str264i = box240a.value.slice(box240a.value.indexOf(':',0)+1);
		str264i = str264i.trim();
		var intFind = box246all.value.indexOf(str264i,0);
		if (intFind === 0-1) {
			box246s.value = str264i;
			document.querySelector('#box246A').value = '1';
			document.querySelector('#box246B').value = '#';
			box246i.value = '原文副題名';
			toolAdd246s();
		}
	}
	if (box246all.value !== '') {
		var str246all = GotChi2Eng(box246all.value,'246i',strCODE);
		if (strThisLine !== '') strThisLine += '\n';
		strThisLine += str246all;
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 250段
	if (box250a.value + box250b.value !== '') {
		let str250a = box250a.value.trim();
		str250a = GotChi2Eng(str250a,'250a',strCODE);
		let str250b = box250b.value.trim();
		str250b = GotChi2Eng(str250b,'250b',strCODE);
		strThisLine = '250    ';
		if (box250a.value !== '') strThisLine += '|a' + str250a;
		if (box250b.value !== '') strThisLine += '|b' + str250b;
		if (strCODE === 'eng') strThisLine += '.'
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 260段[RDA為264]
	if (ifRDA) {
		var str264b = '';
		if (box250a.value.substr(0,2) === '公播') str264b = '公播發行';
		strThisLine = '264 #1 |a' +
			GotChi2Eng(box260a.value.trim(),'264a',strCODE) + 
			' : |b' + GotChi2Eng(box260b.value.trim(),'264b',strCODE);
		if (box250a.value.substr(0,2) === '公播' && box260b2.value === '') strThisLine += str264b;
		strThisLine += ', |c' + box260c.value.trim().replace(/u/g,'\?');
		if (box260cb.value !== '') {
			strThisLine += '[' + box260cb.value.trim();
			if (strCODE === 'chi') strThisLine += '刷]';
			if (strCODE === 'eng') strThisLine += ']';
		}
		if (strCODE === 'eng') strThisLine += '.';
		if (box260b2.value !== '') {
			strThisLine += '\n' +
				'264 #2 |a' + box260a2.value.trim() + 
				' : |b' + box260b2.value.trim() + str264b + 
				', |c' + box260c.value.trim().replace(/u/g,'\?');
			if (box260cb.value !== '') {
				strThisLine += '[' + box260cb.value.trim();
				if (strCODE === 'chi') strThisLine += '刷]';
				if (strCODE === 'eng') strThisLine += ']';
			}
		if (strCODE === 'eng') strThisLine += '.';
		}
		if (box260cC.value !== '') strThisLine += '\n' + '264 #4 |c©' + box260cC.value.trim();
	} 
	if (!ifRDA) {
		var strNotRDA260b = box260b.value.trim();
		
		strNotRDA260b = gotPublisher(strNotRDA260b,strCODE);
		strThisLine = '260    |a' + box260a.value.trim() + 
			' : |b' + strNotRDA260b + 
			', |c' + box260c.value.trim().replace(/u/g,'\?');
		if (strCODE === 'eng') strThisLine += '.';
		if (box260b2.value !== '') {
			strNotRDA260b = gotPublisher(box260b2.value.trim(),strCODE);
			strThisLine += '\n' + 
				'260    |a' + box260a2.value.trim() + 
				' : |b' + strNotRDA260b + 
				', |c' + box260c.value.trim().replace(/u/g,'\?');
		if (strCODE === 'eng') strThisLine += '.';
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 300段
	if (box300a.value + box300b.value + cbx300c.value !== '') {
		strThisLine = '300    ';
		if (box300a.value !== '') {
			strThisLine += '|a';
			var str300a = box300a.value.trim();
			str300a = str300a.replace(/,/g, ', ');
			str300a = str300a.replace(/,  /g, ', ');
			box300a.value = str300a;
			var str300Temp = str300a.slice(-1);
			var str300Page = '0123456789]';
			var intFind = str300Page.indexOf(str300Temp,0);
			if (intFind !== -1) {
				if (strCODE === 'chi') {
					if (strType === 'Book') strThisLine += str300a + '面';
					if (strType === 'eBook') strThisLine += '1種線上資源(' + str300a + '面)';
				}
				if (strCODE === 'eng') {
					if (strType === 'Book') strThisLine += GotChi2Eng(str300a,'300a',strCODE);
					if (strType === 'eBook') strThisLine += '1 online resource(' + GotChi2Eng(str300a,'300a',strCODE) + ')';
				}
				
				if (strType === 'DVDs') {
					let strcbx020DVD = document.querySelector('#cbx020DVD').value;
					let strCDCHI = '數位影音光碟';
					if (strcbx020DVD === 'VCD') strCDCHI = '影音光碟';
					if (strcbx020DVD === 'BD') strCDCHI = '藍光影音光碟';
					if (strcbx020DVD === 'LP') strCDCHI = '黑膠唱片';
					strThisLine += str300a + '張' +strCDCHI  + '(' + document.getElementById('lblDVDmin').textContent + '分)';
				}
				if (strType === 'Audio') strThisLine += str300a + '張錄音光碟(' + document.getElementById('lblCDmin').textContent + '分)';
			}
			if (intFind === -1) {
				str300a = GotChi2Eng(str300a,'300a',strCODE);
				strThisLine += str300a.trim();
			}
		}
		if (box300b.value !== '') {
			var str300b = box300b.value.trim();
			str300b = GotChi2Eng(str300b,'300b',strCODE);
			strThisLine += ' : |b';
			strThisLine += str300b;
		}
		if (cbx300c.value !== '') {
			var str300c = cbx300c.value.trim();
			str300c = str300c.replace(/x/g, ' x ');
			str300c = str300c.replace(/\s\s/g, ' ');
			cbx300c.value = str300c;
			strThisLine += ' ; |c' + str300c;
			if (strCODE === 'chi') {
				if (strThisLine.slice(-1) !== '吋') strThisLine += '公分';
			}
			if (strCODE === 'eng') {
				if (strThisLine.slice(-1) !== '吋') strThisLine += ' cm';
				if (strThisLine.slice(-1) !== '吋') strThisLine = strThisLine.replace('吋', ' inch');
			}
		}
		if (box300e.value !== '') {
			var str300e = box300e.value.trim();
			str300e = GotChi2Eng(str300e,'300e',strCODE);
			strThisLine += ' + |e' + str300e
		}
		if (strCODE === 'eng') strThisLine += '.';
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 336-338段
	if (ifRDA) {
		var myIndex = document.getElementById('cbxCDs').selectedIndex;
		var strSelectedText = '';
		if (myIndex > 0) strSelectedText = document.getElementById('cbxCDs').options[myIndex].text;
		var strAppe = got336CD(strSelectedText);
		if (box300e.value + strSelectedText === '') {
			myIndex = document.getElementById('cbx336').selectedIndex;
			strSelectedText = document.getElementById('cbx336').options[myIndex].text;
			strThisLine = '336    ' + got336Text(strSelectedText,'336','',strCODE);
			myIndex = document.getElementById('cbx337').selectedIndex;
			strSelectedText = document.getElementById('cbx337').options[myIndex].text;
			strThisLine += '\n' + '337    ' + got336Text(strSelectedText,'337','',strCODE);
			myIndex = document.getElementById('cbx338').selectedIndex;
			strSelectedText = document.getElementById('cbx338').options[myIndex].text;
			strThisLine += '\n' + '338    ' + got336Text(strSelectedText,'338','',strCODE);
		} else if (box300e.value + strSelectedText !== '') {
			var strBook = strType;
			if (strBook === 'Audio') strBook = document.querySelector('#cbx020DVD').value;
			if (strBook === 'DVDs') strBook = document.querySelector('#cbx020DVD').value;
			strBook = strBook.replace('Peri','periodica');
			strBook = strBook.replace('Toys','Toy');

			myIndex = document.getElementById('cbx336').selectedIndex;
			strSelectedText = document.getElementById('cbx336').options[myIndex].text;
			strThisLine = '336    ' + got336Text(strSelectedText,'336',strBook,strCODE);
			myIndex = document.getElementById('cbx336b').selectedIndex;
			if (myIndex !== 0-1) {
				strSelectedText = document.getElementById('cbx336b').options[myIndex].text;
				strThisLine += '\n' + '336    ' + got336Text(strSelectedText,'336',strAppe,strCODE);
			}
			myIndex = document.getElementById('cbx337').selectedIndex;
			strSelectedText = document.getElementById('cbx337').options[myIndex].text;
			strThisLine += '\n' + '337    ' + got336Text(strSelectedText,'337',strBook,strCODE);
			myIndex = document.getElementById('cbx337b').selectedIndex;
			if (myIndex !== 0-1) {
				strSelectedText = document.getElementById('cbx337b').options[myIndex].text;
				strThisLine += '\n' + '337    ' + got336Text(strSelectedText,'337',strAppe,strCODE);
			}
			myIndex = document.getElementById('cbx338').selectedIndex;
			strSelectedText = document.getElementById('cbx338').options[myIndex].text;
			strThisLine += '\n' + '338    ' + got336Text(strSelectedText,'338',strBook,strCODE);
			myIndex = document.getElementById('cbx338b').selectedIndex;
			if (myIndex !== 0-1) {
				strSelectedText = document.getElementById('cbx338b').options[myIndex].text;
				strThisLine += '\n' + '338    ' + got336Text(strSelectedText,'338',strAppe,strCODE);
			}
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 490段
	if (box490s.value !== '') {
		strThisLine = box490s.value.trim();
		box490a.value = '';
		box490v.value = '';
	} else if (box490a.value !== '') {
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
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 500段
	if (strType === 'eBook') {
		if (box500a.value.indexOf('系統需求',0) === 0-1) strThisLine = '500 ## |a系統需求 : 網頁瀏覽器IE7以上或iRead eBook';
	}
	if (box500a.value !== '') {
		var str500a = box500a.value.trim();
		str500a = GotChi2Eng(str500a,'500a',strCODE);
		if (strThisLine !== '') strThisLine += '\n';
		strThisLine += '500    |a' + str500a.replace(/\n/g, '\n' + '500    |a');
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 504段
	if (box504a.value !== '') {
		var str504a = box504a.value.trim();
		str504a = GotChi2Eng(str504a,'504a',strCODE);
		strThisLine = '504    |a' + str504a;
		if (strCODE === 'eng') strThisLine += '.';
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 505段
	if (box505a.value !== '') {
		box505a.value = box505a.value.replace(/，/g, ', ');
		var str505a = box505a.value;
		var ifSpace = false;
		ifSpace = str505a.indexOf(', ',0) === 0-1 ? false : true;
		if (ifSpace === false) {
			str505a = str505a.replace(/\n/g, '--');
			strThisLine = '505 0# |a' + str505a;
		}
		if (ifSpace === true) {
			str505a = str505a.replace(/, /g, ', |t');
			str505a = str505a.replace(/\s\/\s/g, ' / |r');
			str505a = str505a.replace(/\n/g, ' -- |g');
			strThisLine = '505 00 |g' + str505a;
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 508段[視聽資料][待修]
	// if (strType === 'Audio' || strType === 'DVDs') {
		// strThisLine = '508    |a製作 : ';
	// }
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 511段[視聽資料]
	if (strType === 'Audio' || strType === 'DVDs') {
		if (boxAV700.value !== '') {
			strThisLine = '511 1# |a' + cbxAV700.value.trim() + ' : ';
			strThisLine += GotMutiAuthors(boxAV700.value,'',strCODE);
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 516段[電子資源]
	if (strType === 'eBook') strThisLine = '516 ## |a電子書';
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 520段
	if (box520a.value !== '') {
		var str520a = HarfSing(box520a.value.trim(),1);
		strThisLine = '520    |a' + str520a.trim();
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 521段
	if (box521a.value !== '') {
		var str521a = box521a.value.trim();
		str521a = GotChi2Eng(str521a,'521a',strCODE);
		strThisLine = '521    |a' + str521a;
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 530.533段[電子資源]
	if (strType === 'eBook') {
		strThisLine += '530 ## |a另發行中文紙本' + '\n';
		if (box260a3.value + box260b3.value !== '') strThisLine += '533 ## |a電子版本製作. |b' + box260a3.value.trim() + ' : |c' + box260b3.value.trim();
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 538段[視聽資料][電子資源]
	if (strType === 'Audio' || strType === 'DVDs') {
		var str538a = document.querySelector('#cbx020DVD').value;
		strThisLine = '538 ## |a';
		if (str538a !== 'BD') strThisLine += str538a;
		if (str538a === 'BD') strThisLine += 'Blu-ray disc' + '\n' + '538 ## |a須使用藍光播放器'
	}
	if (strType === 'eBook') {
		if (box538a.value !== '') strThisLine += '538 ## |a' + box538a.value.trim();
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 546段
	if (box546a.value !== '') strThisLine = '546    |a' + box546a.value.trim();
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 586段
	if (box586a.value !== '') {
		strThisLine = '586    |a' + box586a.value.replace(/\n/g, '\n' + '586    |a');
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 594段
	if (box594a.value !== '') strThisLine = '594    |a' + box594a.value.trim();
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 600.610.630段
	if (box600a.value !== '') {
		box600a.value = toolNoSpace(box600a.value);
		var ary600Temp = box600a.value.split(',');
		var imax = ary600Temp.length;
		let str600indicator2 = strCODE === 'chi' ? '4' : '0';
		for (i=0;i<imax;i++) {
			if (strThisLine !== '') strThisLine += '\n';
			if (chk600a.checked === false) strThisLine += '600 1' + str600indicator2 + ' |a' + toolGetAuthor(ary600Temp[i],'600');
			if (chk600a.checked === true) strThisLine += '610 2' + str600indicator2 + ' |a' + toolGetAuthor(ary600Temp[i],'610');
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 650段
	if (box650a.value !== '') {
		let str650 = box650a.value.trim();
		if (strCODE === 'chi') strThisLine = '650 #7 |a' + toolNoSpace(str650).replace(/,/g, '|2lcstt' + '\n' + '650 #7 |a') + '|2lcstt';
		if (strCODE === 'eng') strThisLine = '650 #0 |a' + str650.replace(/\|\|/g, '.' + '\n' + '650 #0 |a') + '.';
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 651段
	if (box651a.value !== '') {
		let str651 = box651a.value.trim();
		if (strCODE === 'chi') strThisLine = '651 #7 |a' + toolNoSpace(str651).replace(/,/g, '|2lcstt' + '\n' + '651 #7 |a') + '|2lcstt';
		if (strCODE === 'eng') strThisLine = '651 #0 |a' + str651.replace(/\|\|/g, '.' + '\n' + '651 #0 |a') + '.';
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 653段
	if (cbx653a.value !== '') {
		if (cbx653a.value !== 'Book') strThisLine = '653 ## |a' + cbx653a.value;
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 653段[NRRC]
	if (ifNRRC) {
		if (txtNRRC653.value !== '') {
			let str653 = txtNRRC653.value.replace(/,/g,'\n653 ## |a');
			strThisLine = '653 ## |a' + str653;
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 700.710段
	if (box100a.value + box700D.value + box700T.value !== '') {
		let str700All = '';
		let str710All = '';
		let ary700All = [];
		let ary710All = [];
		let str1004Temp = `|4`;
		if (strCODE === 'eng') str1004Temp = `.|4`;
		if (chk100a.checked === true) {
			let strAut = str1004Temp + cbx100a4.value.replace(/\,/g,'\|4');
			if (chkRDA.checked) {
				// str710All = box100a.value.trim().replace(/\,/g,strAut + '\,') + strAut;
				box100a.value.trim().split(',').forEach(item => {
					ary710All.push([item.trim(), strAut]);
				});
			}
			if (!chkRDA.checked) str710All = box100a.value.trim();
		}
		if (chk100a.checked === false) {
			let strAut = str1004Temp + cbx100a4.value.replace(/\,/g,'\|4');
			if (chkRDA.checked) {
				// str700All = box100a.value.trim().replace(/\,/g,strAut + '\,') + strAut;
				box100a.value.trim().split(',').forEach(item => {
					ary700All.push([item.trim(), strAut]);
				});
			}
			if (! chkRDA.checked) str700All = box100a.value.trim();
		}
		if (box700D.value !== '') {
			let strAut = str1004Temp + cbx700D4.value.replace(/\,/g,'\|4');
			if (chk700D.checked === true) {
				if (str710All !== '') str710All = str710All + ',';
				if (chkRDA.checked) {
					// str710All = str710All + box700D.value.trim().replace(/\,/g,strAut + '\,') + strAut;
					box700D.value.trim().split(',').forEach(item => {
					ary710All.push([item.trim(), strAut]);
				});
				}
				if (! chkRDA.checked) str710All = str710All + box700D.value.trim();
			}
			if (chk700D.checked === false) {
				if (str700All !== '') str700All = str700All + ',';
				if (chkRDA.checked) {
					// str700All = str700All + box700D.value.trim().replace(/\,/g,strAut + '\,') + strAut;
					box700D.value.trim().split(',').forEach(item => {
					ary700All.push([item.trim(), strAut]);
				});
				}
				if (! chkRDA.checked) str700All = str700All + box700D.value.trim();
			}
		}
		if (box700T.value !== '') {
			let strAut = str1004Temp + cbx700T4.value.replace(/\,/g,'\|4');
			if (chk700T.checked === true) {
				if (str710All !== '') str710All = str710All + ',';
				if (chkRDA.checked) {
					// str710All = str710All + box700T.value.trim().replace(/\,/g,strAut + '\,') + strAut;
					box700T.value.trim().split(',').forEach(item => {
					ary710All.push([item.trim(), strAut]);
				});
				}
				if (! chkRDA.checked) str710All = str710All + box700T.value.trim();
			}
			if (chk700T.checked === false) {
				if (str700All !== '') str700All = str700All + ',';
				if (chkRDA.checked) {
					// str700All = str700All + box700T.value.trim().replace(/\,/g,strAut + '\,') + strAut;
					box700T.value.trim().split(',').forEach(item => {
					ary700All.push([item.trim(), strAut]);
				});
				}
				if (! chkRDA.checked) str700All = str700All + box700T.value.trim();
			}
		}
		if (boxAV700.value !== '') {
			let strAut = str1004Temp + cbxAV7004.value.replace(/\,/g,'\|4');
			if (chkAV700.checked === true) {
				if (str710All !== '') str710All = str710All + ',';
				if (chkRDA.checked) {
					// str710All = str710All + boxAV700.value.trim().replace(/\,/g,strAut + '\,') + strAut;
					boxAV700.value.trim().split(',').forEach(item => {
					ary710All.push([item.trim(), strAut]);
				});
				}
				if (! chkRDA.checked) str710All = str710All + boxAV700.value.trim();
			}
			if (chkAV700.checked === false) {
				if (str700All !== '') str700All = str700All + ',';
				if (chkRDA.checked) {
					// str700All = str700All + boxAV700.value.trim().replace(/\,/g,strAut + '\,') + strAut;
					boxAV700.value.trim().split(',').forEach(item => {
					ary700All.push([item.trim(), strAut]);
				});
				}
				if (! chkRDA.checked) str700All = str700All + boxAV700.value.trim();
			}
		}
		var strAuthorTemp = '';
		if (str700All !== '') {
			if (! chkRDA.checked) {
				let ary700Temp = str700All.split(',');
				let imax = ary700Temp.length;
				for (i=0;i<imax;i++) {
					strAuthorTemp = toolGetAuthor(ary700Temp[i],'700');
					let aryFindTemp = strAuthorTemp.split('\n');
					for (k=0;k<aryFindTemp.length;k++) {
						let intFind = (strMARC + strThisLine).indexOf('00 1  |a' + aryFindTemp[k].split('|4')[0] , 0);
						if (intFind === 0-1) {
							if (strThisLine !== '') strThisLine += '\n';
							strThisLine += '700 1  |a' + aryFindTemp[k];
						}
					}
				}
			}
		}
		if (ary700All.length > 0 && chkRDA.checked) {
			for (i=0;i<ary700All.length;i++) {
				strAuthorTemp = toolGetAuthor(ary700All[i][0],'700');
				let ary700Temp = strAuthorTemp.split('\n');
				for (j=0;j<ary700Temp.length;j++) {
					let intFind = (strMARC + strThisLine).indexOf('00 1  |a' + ary700Temp[j], 0);
					if (intFind === 0-1) {
						if (strThisLine !== '') strThisLine += '\n';
						strThisLine += '700 1  |a' + ary700Temp[j] + ary700All[i][1];
					}
				}
			}
		}
		if (str710All !== '') {
			if (! chkRDA.checked) {
				let ary710Temp = str710All.split(',');
				imax = ary710Temp.length;
				for (i=0;i<imax;i++) {
					strAuthorTemp = toolGetAuthor(ary710Temp[i],'710');
					let aryFIndTemp = strAuthorTemp.split('\n');
					for (k=0;k<aryFIndTemp.length;k++) {
						let intFind = (strMARC + strThisLine).indexOf('10 2  |a' + aryFIndTemp[k].split('|4')[0]+'|' , 0);
						if (intFind === 0-1) {
							if (strThisLine !== '') strThisLine += '\n';
							strThisLine += '710 2  |a' + aryFIndTemp[k];
						}
					}
				}
			}
		}
		if (ary710All.length > 0 && chkRDA.checked) {
			for (i=0;i<ary710All.length;i++) {
				strAuthorTemp = toolGetAuthor(ary710All[i][0],'710');
				let ary710Temp = strAuthorTemp.split('\n');
				for (j=0;j<ary710Temp.length;j++) {
					let intFind = (strMARC + strThisLine).indexOf('10 2  |a' + ary710Temp[j], 0);
					if (intFind === 0-1) {
						if (strThisLine !== '') strThisLine += '\n';
						strThisLine += '710 2  |a' + ary710Temp[j] + ary710All[i][1];
					}
				}
			}
		}
	}
	strThisLine = strThisLine.replace(/\.\.\|/g, '\.|');
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 710段[電子資源]
	if (strType === 'eBook' && box260b3.value !== '') strThisLine += '710 2  |a' + box260b3.value.trim();
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 740段
	if (box505a.value !=='') {
		var ary740 = box505a.value.split('\n');
		var imax = ary740.length;
		for (i=0;i<imax;i++) {
			var ary740a = ary740[i].split(', ');
			var jmax = ary740a.length - 1;
			if(strThisLine !== '') strThisLine += '\n' + '740 ' + toolGetSkip(ary740a[jmax].trim()) + '0 |a' + ary740a[jmax];
			if(strThisLine === '') strThisLine = '740 ' + toolGetSkip(ary740a[jmax].trim()) + '0 |a' + ary740a[jmax];
		}
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 830段
	if (box830s.value !== '') {
		strThisLine = box830s.value.trim();
	} else if (box490a.value !== '') {
		var strTemp = box490a.value.trim();
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
	}
	if (strThisLine !== '') strMARC += strThisLine + '\n';
	strThisLine = '';

	// 856段[電子資源]
	if (strType === 'eBook') {
		if (box856u.value !== '') strThisLine = '856 40 |u' + box856u.value.trim() + '|z點擊此處查看電子書全文';
		if (strThisLine !== '') strMARC += strThisLine + '\n';
		strThisLine = '';
	}
	

	if (document.querySelector('#selOutput').value === 'Miracle') showMARC.value = strMARC;
	if (document.querySelector('#selOutput').value === 'MARCEdit') showMARC.value = toolCov2MARCEdit(strMARC);
}

function toolNoSpace(strTemp) {
	let strReturn = strTemp.trim();
	strReturn = strReturn.replace(/\s\s/g, ' ');
	strReturn = strReturn.replace(/\,\,/g, ',');
	strReturn = strReturn.replace(/，/g, ',');
	strReturn = strReturn.replace(/\s\,/g, ',');
	strReturn = strReturn.replace(/\,\s/g, ',');
	strReturn = strReturn.replace(/·/g, '.');
	strReturn = strReturn.replace(/‧/g, '.');
	strReturn = strReturn.replace(/．/g, '.');
	strReturn = strReturn.replace(/﹒/g, '.');
	return strReturn;
}

function toolGetSkip(strTemp) {
	//回傳不排序字元
	var str1Skip = ',<.>/?;:[{]}|=+-_`~!@#$%^&*()，＜。＞／？‧；：’［｛‘“〝～！＠＃＄％︿＆＊（）－＿＝＋＼｜「『' + '\'' + '\\';
	var str2Skip = 'A |O |Y |<<|';
	var str3Skip = 'La |An |Ho |He |To |Ta |Ka |Ke |Na |Az |Il |Lo |Le |De |Os |As |Li |Lu |El |La |Lo |De |Yr |L' + '\'' + ' |';
	var str4Skip = 'The |Den |Det |Het |Les |Der |Die |Das |Hoi |Hai |Hin |Dei |Lou |Lis |Los |Las |';
	var str5Skip = 'Hinn |';
	var str6Skip = 'Hinir |Hinar |';
	var str7Skip = '';
	var str8Skip = '';
	var str9Skip = '';
	var strReturn = '0';
	var strFind = strTemp.substr(0,1)
	if (str1Skip.indexOf(strFind,0) !== 0-1) strReturn = '1';
	strFind = strTemp.substr(0,2) + '|'
	if (str2Skip.indexOf(strFind,0) !== 0-1) strReturn = '2';
	strFind = strTemp.substr(0,3) + '|'
	if (str3Skip.indexOf(strFind,0) !== 0-1) strReturn = '3';
	strFind = strTemp.substr(0,4) + '|'
	if (str4Skip.indexOf(strFind,0) !== 0-1) strReturn = '4';
	strFind = strTemp.substr(0,5) + '|'
	if (str5Skip.indexOf(strFind,0) !== 0-1) strReturn = '5';
	strFind = strTemp.substr(0,6) + '|'
	if (str6Skip.indexOf(strFind,0) !== 0-1) strReturn = '6';
	return strReturn;
}

function toolGetAuthor(strAuthorName,strWho) {
	//回傳100.110
	var strReturn = '';
	var intBigStart = strAuthorName.indexOf('{',0);
	var intBigEnd = strAuthorName.indexOf('}',0);
	var strLC = '';
	var intFind4 = strAuthorName.indexOf('\|4',0);
	if (intFind4 !== 0-1) {
		let aryTemp = strAuthorName.split('\|4');
		for (x=1;x<aryTemp.length;x++) {
			strLC += '|4' + aryTemp[x];
		}
	}
	strAuthorName = strAuthorName.replace(/\|D/g, '|d');
	if (intBigStart !== 0-1) {
		strAuthorName = strAuthorName.slice(intBigStart+1,intBigEnd);
	}
	var aryAuthorName = strAuthorName.split('||');
	var jmax = aryAuthorName.length;
	for (j=0;j<jmax;j++) {
		if (strWho === '100') {
			if (strReturn === '') strReturn = toolCutAuthor(aryAuthorName[j]);
			if (strLC !== '') {
				strReturn += strLC;
				strReturn = strReturn.replace(strLC + strLC, strLC);
			}
		} else if (strWho === '700') {
			strReturn = strReturn === '' ? toolCutAuthor(aryAuthorName[j]) : strReturn + '\n' + toolCutAuthor(aryAuthorName[j]);
			if (strLC !== '') {
				strReturn += strLC;
				strReturn = strReturn.replace(strLC + strLC, strLC);
			}
		} else if (strWho === '600') {
			strReturn = strReturn === '' ? toolCutAuthor(aryAuthorName[j]) : strReturn + '\n' + '600 14 |a' + toolCutAuthor(aryAuthorName[j]);
		} else if (strWho === '110') {
			if (strReturn === '') strReturn = aryAuthorName[j];
			if (strLC !== '') {
				strReturn += strLC;
				strReturn = strReturn.replace(strLC + strLC, strLC);
			}
		} else if (strWho === '610') {
			strReturn = strReturn === '' ? aryAuthorName[j] : strReturn + '\n' + '610 24 |a' + aryAuthorName[j];
		} else if (strWho === '710') {
			strReturn = strReturn === '' ? aryAuthorName[j] : strReturn + '\n' + aryAuthorName[j];
			if (strLC !== '') {
				strReturn += strLC;
				strReturn = strReturn.replace(strLC + strLC, strLC);
			}
		}
	}
	//if (strLC !== '') strReturn += strLC;
	return strReturn;
}

function toolCutAuthor(strAuthor) {
	//回傳轉置過的100$a.$c.$d
	var strReturn;
	var str100a = '';
	var str100c = '';
	var str100d = '';
	strAuthor = strAuthor.split('|4')[0];
	strAuthor = strAuthor.replace(/\.\s/g, `[[dot]] `);
	var intSmallStart = strAuthor.indexOf('(',0);
	var intSmallEnd = strAuthor.indexOf(')',0);
	var intTemp = 0;
	if (intSmallStart !== 0-1) {
		str100a = strAuthor.slice(0,intSmallStart);
		str100c = strAuthor.slice(intSmallStart+1,intSmallEnd);
	} else if (intSmallStart === 0-1) {
		intTemp = strAuthor.indexOf('|d',0);
		if (intTemp !== 0-1) str100a = strAuthor.slice(0,intTemp);
		if (intTemp === 0-1) str100a = strAuthor;
	}
	intTemp = strAuthor.indexOf('|d',0);
	if (intTemp !== 0-1) str100d = strAuthor.slice(intTemp+2);
	intTemp = str100a.indexOf('.',0);
	if (intTemp !== 0-1) {
		// if (GotIsEng(str100a) !== 0) {
			let ary100a = str100a.split('.');
			str100a = ary100a[ary100a.length-1];
		// }
	}
	intTemp = str100a.indexOf(' ',0);
	if (intTemp !== 0-1) {
		var ary100a = str100a.split(' ');
		var kmax = ary100a.length-1;
		str100a = ary100a[kmax] + ',';
		for (k=0;k<kmax;k++) {
			str100a += ' ' + ary100a[k];
		}
	}
	intTemp = str100c.indexOf(' ',0);
	if (intTemp !== 0-1) {
		var ary100c = str100c.split(' ');
		var kmax = ary100c.length-1;
		str100c = ary100c[kmax] + ',';
		for (k=0;k<kmax;k++) {
			str100c += ' ' + ary100c[k];
		}
	}
	if (str100a !== '') strReturn = str100a;
	if (str100c !== '') strReturn += '|c(' + str100c + ')';
	if (str100d !== '') strReturn += ', |d' + str100d;
	strReturn = strReturn.replace(/\[\[dot\]\]/g,'\.');
	return strReturn;
}

function GotChi2Eng(strWords,strWhLine,strLang) {
	//書目內容中譯英
	var strReturn = strWords;
	if (strLang === 'eng') {
		if (strWhLine === '020q') {
			let nameMappings = {
				'平裝': 'paperback',
				'平裝': 'paperback',
				'軟精裝': 'hardcover',
				'精裝': 'hardcover',
				'線裝': 'sewing',
				'線圈裝': 'wire binding',
				'經摺裝': 'accordion-fold book',
				'合訂本': 'composite volume',
				'硬頁書': 'board book',
				'附點讀筆': ' with talking pen',
				'附光碟': ' with CD',
				'附紙型': ' with paper pattern',
				'附地圖': ' with maps',
				'附手冊': ' with pamphlets',
				'附捲軸': ' with reel',
				'附歌詞本': ' with lyrics',
				'一套': 'set',
				'1套': 'set',
				'全套': 'set'
			};

			// 使用正則表達式進行替換
			for (const [oldName, newName] of Object.entries(nameMappings)) {
				const regex = new RegExp(oldName, 'g'); // 'g' 標誌表示全局替換
				strReturn = strReturn.replace(regex, newName);
			}
		}
		if (strWhLine === '245c') {
			var aryPosition = [];
			aryPosition.push(['著','by']);
			aryPosition.push(['著者','by']);
			aryPosition.push(['作"','by']);
			aryPosition.push(['作者','by']);
			aryPosition.push(['文字','by']);
			aryPosition.push(['撰文','by']);
			aryPosition.push(['文','written by']);
			aryPosition.push(['文. 圖','written and illustrated by']);
			aryPosition.push(['文/圖','written and illustrated by']);
			aryPosition.push(['插圖','illustrated by']);
			aryPosition.push(['圖','illustrated by']);
			aryPosition.push(['繪者','illustrated by']);
			aryPosition.push(['繪','illustrated by']);
			aryPosition.push(['改寫','adaptation by']);
			aryPosition.push(['譯者','translated by']);
			aryPosition.push(['翻譯','translated by']);
			aryPosition.push(['譯','translated by']);
			aryPosition.push(['總編輯','editor-in-chief']);
			aryPosition.push(['主編','editor-in-chief']);
			aryPosition.push(['編著','text and edited by']);
			aryPosition.push(['執行編輯','text editor by']);
			aryPosition.push(['編輯','edited by']);
			aryPosition.push(['攝影','photo by']);
			aryPosition.push(['導演','directed by']);
			aryPosition.push(['編劇','written by']);
			aryPosition.push(['主演','acted by']);
			aryPosition.push(['演唱','by']);
			aryPosition.push(['製作','produced by']);
			aryPosition.push(['編曲','by']);
			aryPosition.push(['指揮','conductor by']);
			aryPosition.push(['文.圖','written and illustrated by']);
			var imax = aryPosition.length;
			for (i=0;i<imax;i++) {
				if (strReturn === aryPosition[i][0]) strReturn = aryPosition[i][1];
			}
		}
		if (strWhLine === '246i') {
			strReturn = strReturn.replace('|i封面其他題名 : ','|iOther titles on the cover : ');
			strReturn = strReturn.replace('|i封面副題名 : ','|iSubtitle on cover : ');
			strReturn = strReturn.replace('|i版權頁英文題名 : ','|iEnglish title from copyright page : ');
			strReturn = strReturn.replace('|i版權頁題名 : ','|iTitle from copyright page : ');
			strReturn = strReturn.replace('|i書名頁題名 : ','|iTitle from title page : ');
			strReturn = strReturn.replace('|i原書名 : ','|iOriginal title : ');
			strReturn = strReturn.replace('|i原文副題名 : ','|iOriginal subtitle : ');
			strReturn = strReturn.replace('|i封面其他題名 : ','|iOther titles on the cover : ');
			strReturn = strReturn.replace('|i另有譯名 : ','|iOther translated title : ');
			strReturn = strReturn.replace('|i題名誤印 : ','|iIncorrect title printing : ');
			strReturn = strReturn.replace('|i書背題名 : ','|iTitle from spine : ');
			strReturn = strReturn.replace('|i部份題名 : ','|iPartial title : ');
			strReturn = strReturn.replace('|i並列題名 : ','|iParallel title : ');
			strReturn = strReturn.replace('|i合訂本一題名 : ','|iTitle of collected work one : ');
			strReturn = strReturn.replace('|i合訂本二題名 : ','|iTitle of collected work two : ');
			strReturn = strReturn.replace('|i合訂本三題名 : ','|iTitle of collected work three : ');
		}
		if (strWhLine === '264a') {
			strReturn = strReturn.replace('\[出版地不詳\]', '\[Place of publication not identified\]');
		}
		if (strWhLine === '264b') {
			strReturn = strReturn.replace('\[出版者不詳\]', '\[Publisher not identified\]');
		}
		if (strWhLine === '250a') {
			strReturn = strReturn.replace('初版', 'First edition');
			strReturn = strReturn.replace('第一版', 'First edition');
			strReturn = strReturn.replace('再版', 'Second edition');
			strReturn = strReturn.replace('第二版', 'Second edition');
			strReturn = strReturn.replace('二版', 'Second edition');
			strReturn = strReturn.replace('公播版', 'Public performance rights granted');
			strReturn = strReturn.replace('家用版', 'Family performance rights granted');
		}
		if (strWhLine === '250b') {
			strReturn = strReturn.replace('藍光版', 'Blu-ray disc');
			strReturn = strReturn.replace('[含光碟]', '[with CD]');
			strReturn = strReturn.replace('[精裝]', '[hardcover]');
			strReturn = strReturn.replace('[立體書]', '[pop-up book]');
			strReturn = strReturn.replace('[指偶書]', '[finger puppet book]');
		}
		if (strWhLine === '300a') {
			var intFind = strReturn.indexOf('圖版',0);
			if (intFind !== 0-1) {
				strReturn = strReturn.replace(/圖版\[/g, '');
				strReturn = strReturn.replace(/\]/g, ' unnumbered pages of plates');
			}
			strReturn = strReturn.replace('面',' pages');
			strReturn = strReturn.replace('冊',' volume \(unpaged\)');
			strReturn = strReturn.replace('片',' disc');
			if (intFind === -1 && strReturn.indexOf('unpaged',0) === -1) strReturn += ' pages';
		}
		if (strWhLine === '300b') {
			var strIllTemp = document.querySelector('#bib008aIll1').value;
			var bolColor = boxIllchk1a.checked;
			var bolChiefly = boxIllchk1b.checked;
			if (strIllTemp !== '#') strReturn = GotIllEnglish(strIllTemp,bolColor,bolChiefly);

			strIllTemp = document.querySelector('#bib008aIll2').value;
			bolColor = boxIllchk2a.checked;
			bolChiefly = boxIllchk2b.checked;
			if (strIllTemp !== '#') strReturn += ', ' + GotIllEnglish(strIllTemp,bolColor,bolChiefly);

			strIllTemp = document.querySelector('#bib008aIll3').value;
			bolColor = boxIllchk3a.checked;
			bolChiefly = boxIllchk3b.checked;
			if (strIllTemp !== '#') strReturn += ', ' + GotIllEnglish(strIllTemp,bolColor,bolChiefly);

			strIllTemp = document.querySelector('#bib008aIll4').value;
			bolColor = boxIllchk4a.checked;
			bolChiefly = boxIllchk4b.checked;
			if (strIllTemp !== '#') strReturn += ', ' + GotIllEnglish(strIllTemp,bolColor,bolChiefly);
		}
		if (strWhLine === '300e') {
			strReturn = strReturn.replace('光碟', 'CD');
			strReturn = strReturn.replace('紙型', 'paper pattern');
			strReturn = strReturn.replace('地圖', 'maps');
			strReturn = strReturn.replace('手冊', 'pamphlets');
			strReturn = strReturn.replace('捲軸', 'reel');
			strReturn = strReturn.replace('歌詞本', 'lyrics');
			strReturn = strReturn.replace('點讀筆', 'talking pen');
			strReturn = strReturn.replace('支', ' ');
			strReturn = strReturn.replace('片', ' ');
			strReturn = strReturn.replace('本', ' ');
			strReturn = strReturn.replace('張', ' ');
		}
		if (strWhLine === '500a') {
			strReturn = strReturn.replace('題名取自封面', 'Cover title.');
			strReturn = strReturn.replace('題名取自外盒', 'Title from container.');
			strReturn = strReturn.replace('作者號取自編輯', 'Author number taken from editor.');
			strReturn = strReturn.replace('作者號取自題名', 'Author number taken from title.');
			strReturn = strReturn.replace('著者本名', 'Real name of author, ');
			strReturn = strReturn.replace('本名', '\'s real name is ');
			strReturn = strReturn.replace('譯自 : ', 'Translated of : ');
			strReturn = strReturn.replace('含索引', 'Includes index.');
			strReturn = strReturn.replace('試題本, 解析本合訂為一冊', 'The A and B are bound together into one volume.');
		}
		if (strWhLine === '504a') {
			strReturn = strReturn.replace('含參考書目及索引', 'Includes bibliographical references and indexes');
			strReturn = strReturn.replace('含參考書目', 'Includes bibliographical references');
			var intFind = strReturn.indexOf('參考書目 : 面',0);
			if (intFind !== 0-1) {
				strReturn = strReturn.replace('參考書目 : 面', 'Includes bibliographical references (p. ');
				strReturn += ')';
			}
			
		}
		if (strWhLine === '521a') {
			strReturn = strReturn.replace('適讀年齡 : ', 'Ages ');
			strReturn = strReturn.replace('歲', '');
			strReturn = strReturn.replace('以上', '\+');
			strReturn = strReturn.replace('限制級', 'Restricted : under 18 not allowed.');
			strReturn += '.';
		}
	}

	return strReturn;
}

function GotIllEnglish(strIllTemp,bolColor,bolChiefly) {
	//依定長欄回傳英文300$b
	var strReturn = '';
	var strIsColor = 'abc';
	var intFind = strIsColor.indexOf(strIllTemp,0);
	if (intFind !== 0-1) {
		if (bolColor) strReturn = 'color ';
		if (bolChiefly) strReturn = 'chiefly color ';
	}
	var aryIllTemp = [];
	aryIllTemp.push(['a', 'illustration']);
	aryIllTemp.push(['b', 'maps']);
	aryIllTemp.push(['c', 'ports']);
	aryIllTemp.push(['d', 'charts']);
	aryIllTemp.push(['e', 'plans']);
	aryIllTemp.push(['f', 'plates']);
	aryIllTemp.push(['g', 'music']);
	aryIllTemp.push(['h', 'facsimiles']);
	aryIllTemp.push(['i', 'coats']);
	aryIllTemp.push(['j', 'gen.']);
	aryIllTemp.push(['k', 'forms']);
	aryIllTemp.push(['l', 'samples']);
	aryIllTemp.push(['m', 'phonodiscs']);
	aryIllTemp.push(['o', 'photos']);
	aryIllTemp.push(['p', 'illuminations']);
	aryIllTemp.push(['|', '']);
	var imax = aryIllTemp.length;
	for (i=0;i<imax;i++) {
		if (aryIllTemp[i][0] === strIllTemp) strReturn += aryIllTemp[i][1];
	}

	return strReturn;
}

function GotIsEng(strTitles) {
	//回傳標題是否為純英文
	var intReturn = 0;
	var aryWords = strTitles.split('');
	var imax = aryWords.length;
	var strEng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=[]{}\|;:,./<>?' + '\'' + '\"' + ' ';
	for (i=0;i<imax;i++) {
		if (strEng.indexOf(aryWords[i],0) === 0-1) intReturn = intReturn + 1;
	}

	return intReturn;
}

function Set246s(strLang) {
	//將無標點題名加入246all
	toolAddNoDot(box245a.value.trim(),strLang);
	var intFind = box245b.value.indexOf(' = ',0);
	if (intFind !== 0-1) {
		toolAddNoDot(box245b.value.substr(0,intFind),strLang);
		intFind = box245b.value.indexOf(' = ',0);
		var intLengh = box245b.value.length - intFind - 3;
		if (GotIsEng(box245b.value.substr(intFind + 3,intLengh)) > 0) toolAddNoDot(box245b.value.substr(intFind + 3,intLengh),strLang);
	} else if (intFind === 0-1) {
		if (GotIsEng(box245b.value.trim()) > 0) toolAddNoDot(box245b.value.trim(),strLang);
	}
}

function toolAddNoDot(strOldTitle,strLang) {
	//將無標點題名加入246all
	strTitNoDot = GotNoDots(strOldTitle,strLang);
	if (strTitNoDot !== strOldTitle.substr(0,strTitNoDot.length)) {
		intFind = box246all.value.indexOf(strTitNoDot,0);
		if (intFind === 0-1) {
			box246s.value = strTitNoDot;
			document.querySelector('#box246A').value = '3';
			document.querySelector('#box246B').value = '3';
			box246i.value = '';
			toolAdd246s();
		}
	}
}

function GotNoDots(strTitles,strLang) {
	//回傳無標點題名
	var strReturn = strTitles;
	if (strLang === 'chi') {
		strReturn = strReturn.replace(/! /g, '');
		strReturn = strReturn.replace(/!/g, '');
		strReturn = strReturn.replace(/, /g, '');
		strReturn = strReturn.replace(/,/g, '');
		strReturn = strReturn.replace(/、/g, '');
		strReturn = strReturn.replace(/、/g, '');
		strReturn = strReturn.replace(/「/g, '');
		strReturn = strReturn.replace(/」/g, '');
		strReturn = strReturn.replace(/『/g, '');
		strReturn = strReturn.replace(/』/g, '');
		strReturn = strReturn.replace(/\(/g, '');
		strReturn = strReturn.replace(/\)/g, '');
		strReturn = strReturn.replace(/\[/g, '');
		strReturn = strReturn.replace(/]/g, '');
		strReturn = strReturn.replace(/\</g, '');
		strReturn = strReturn.replace(/\>/g, '');
		strReturn = strReturn.replace(/\.{3}/g, '');
		strReturn = strReturn.replace(/\. /g, '');
		strReturn = strReturn.replace(/\?\s/g, '');
		strReturn = strReturn.replace(/\?/g, '');
		strReturn = strReturn.replace(/ x /g, 'x');
		strReturn = strReturn.replace(/ & /g, '&');
		strReturn = strReturn.replace(/ x /g, 'x');
		strReturn = strReturn.replace(/ & /g, '&');
		if (GotIsEng(strReturn) > 0) {
			strReturn = strReturn.replace(/\"/g, '');
			strReturn = strReturn.replace(/\'/g, '');
			strReturn = strReturn.replace(/ : /g, '');
		}
	}
	return strReturn;
}

function GotMutiAuthors(strNames,strPosition,strLang) {
	//回傳245$c
	var strReturn = '';
	var aryAuthors = strNames.split(',');
	var intAuthors = aryAuthors.length;
	if (strLang === 'chi') {
		if (intAuthors > 3) {
			strReturn = gotNoPenNameAndDate(aryAuthors[0]) + '[及其他' + (intAuthors-1) + '位]' + strPosition;
		} else if (intAuthors === 3) {
			strReturn = gotNoPenNameAndDate(aryAuthors[0]) + ', ' + gotNoPenNameAndDate(aryAuthors[1]) + ', ' + gotNoPenNameAndDate(aryAuthors[2]) + strPosition;
		} else if (intAuthors === 2) {
			strReturn = gotNoPenNameAndDate(aryAuthors[0]) + ', ' + gotNoPenNameAndDate(aryAuthors[1]) + strPosition;
		} else if (intAuthors === 1) {
			strReturn = gotNoPenNameAndDate(aryAuthors[0]) + strPosition;
		}
	}

	if (strLang === 'eng') {
		strReturn = GotChi2Eng(strPosition,'245c',strLang) + ' ';
		if (intAuthors > 3) {
			if (intAuthors < 32) {
				var aryNumbers = [];
				aryNumbers[0] = [3,'[and three others].'];
				aryNumbers[1] = [4,'[and four others].'];
				aryNumbers[2] = [5,'[and five others].'];
				aryNumbers[3] = [6,'[and six others].'];
				aryNumbers[4] = [7,'[and seven others].'];
				aryNumbers[5] = [8,'[and eight others].'];
				aryNumbers[6] = [9,'[and nine others].'];
				aryNumbers[7] = [10,'[and ten others].'];
				aryNumbers[8] = [11,'[and eleven others].'];
				aryNumbers[9] = [12,'[and twelve others].'];
				aryNumbers[10] = [13,'[and thirteen others].'];
				aryNumbers[11] = [14,'[and fourteen others].'];
				aryNumbers[12] = [15,'[and fifteen others].'];
				aryNumbers[13] = [16,'[and sixteen others].'];
				aryNumbers[14] = [17,'[and seventeen others].'];
				aryNumbers[15] = [18,'[and eighteen others].'];
				aryNumbers[16] = [19,'[and nineteen others].'];
				aryNumbers[17] = [20,'[and twenty others].'];
				aryNumbers[18] = [21,'[and twenty-one others].'];
				aryNumbers[19] = [22,'[and twenty-two others].'];
				aryNumbers[20] = [23,'[and twenty-three others].'];
				aryNumbers[21] = [24,'[and twenty-four others].'];
				aryNumbers[22] = [25,'[and twenty-five others].'];
				aryNumbers[23] = [26,'[and twenty-six others].'];
				aryNumbers[24] = [27,'[and twenty-seven others].'];
				aryNumbers[25] = [28,'[and twenty-eight others].'];
				aryNumbers[26] = [29,'[and twenty-nine others].'];
				aryNumbers[27] = [30,'[and thirty others].'];
				strReturn += gotNoPenNameAndDate(aryAuthors[0]) + aryNumbers[intAuthors-4][1];
			} else if (intAuthors >= 31) {
				strReturn += gotNoPenNameAndDate(aryAuthors[0]) + '[and ' + (intAuthors-1) + ' others].';
			}
		} else if (intAuthors === 3) {
			strReturn += gotNoPenNameAndDate(aryAuthors[0]) + ', '  + gotNoPenNameAndDate(aryAuthors[1]) + ', '  + gotNoPenNameAndDate(aryAuthors[2]) + '.';
			
		} else if (intAuthors === 2) {
			strReturn += gotNoPenNameAndDate(aryAuthors[0]) + ', '  + gotNoPenNameAndDate(aryAuthors[1]) + '.';
		} else if (intAuthors === 1) {
			strReturn += gotNoPenNameAndDate(aryAuthors[0]) + '.';
		}
	}
	return strReturn;
}

function gotNoPenNameAndDate(strNames) {
	//忽略作者筆名及生卒年給245$c
	var strReturn = strNames.replace('|b','');
	var intFind = strReturn.indexOf('{',0);
	if (intFind !== 0-1) strReturn = strReturn.substr(0,intFind);intFind = strReturn.indexOf('|',0);
	if (intFind !== 0-1) strReturn = strReturn.substr(0,intFind);

	return strReturn;
}

function gotPublisher(strPublisher,strLang) {
	//回傳簡略出版社名稱
	var strReturn = strPublisher;
	if (strLang === 'chi') {
		strReturn = strReturn.replace('圖書館', '[!keep0]');
		strReturn = strReturn.replace('圖書', '');
		strReturn = strReturn.replace('[!keep0]', '圖書館');
		strReturn = strReturn.replace('文化局', '[!keep1]');
		strReturn = strReturn.replace('文化部', '[!keep2]');
		strReturn = strReturn.replace('文化中心', '[!keep3]');
		strReturn = strReturn.replace('文化', '');
		strReturn = strReturn.replace('[!keep1]', '文化局');
		strReturn = strReturn.replace('[!keep2]', '文化部');
		strReturn = strReturn.replace('[!keep3]', '文化中心');
		strReturn = strReturn.replace('大和書報', '[!keep4]');
		strReturn = strReturn.replace('書報', '');
		strReturn = strReturn.replace('[!keep4]', '大和書報');
		strReturn = strReturn.replace('聯合發行', '[!keep5]');
		strReturn = strReturn.replace('發行', '');
		strReturn = strReturn.replace('[!keep5]', '聯合發行');
		strReturn = strReturn.replace('有限公司', '');
		strReturn = strReturn.replace('股份', '');
		strReturn = strReturn.replace('事業', '');
		strReturn = strReturn.replace('實業', '');
		strReturn = strReturn.replace('出版社', '');
		strReturn = strReturn.replace('工作室', '');
		strReturn = strReturn.replace('財團法人', '');
		strReturn = strReturn.replace('社團法人', '');
		strReturn = strReturn.replace('書版', '');
		strReturn = strReturn.replace('國際', '');
		strReturn = strReturn.replace('(股)公司', '');
		strReturn = strReturn.replace('英屬蓋曼群島商', '');
		strReturn = strReturn.replace('出版', '');
	}
	return strReturn;
}

function got336Text(str336Text,strWhLine,strBook,strLang) {
	//輸出336-338內容
	var strReturn = '';
	var intCut = 3;
	if (strWhLine === '337') intCut = 1;
	if (strWhLine === '338') intCut = 2;
	var str336b = str336Text.substr(0,intCut);
	var strTemp = str336Text.slice(intCut+1);

	if (strBook !== '') strReturn = '|3' + strBook;
	var ary336a = strTemp.split('/');
	if (strLang === 'eng') strReturn += '|a' + ary336a[0];
	if (strLang === 'chi') strReturn += '|a' + ary336a[1];
	strReturn += '|b' + str336b;
	if (strWhLine === '336') strReturn += '|2rdacontent';
	if (strWhLine === '337') strReturn += '|2rdamedia';
	if (strWhLine === '338') strReturn += '|2rdacarrier';

	return strReturn;
}

function got336CD(strCD) {
	//回傳附件類型
	var aryTemp1 = strCD.split('/');
	var aryTemp2 = aryTemp1[0].split('(');
	return aryTemp2[0];
}

function switchOutput() {
	if (showMARC.value !== '') {
		if (document.querySelector('#selOutput').value === 'Miracle' && showMARC.value.substr(0,4) === '=LDR') showMARC.value = toolCov2Miracle(showMARC.value);
		if (document.querySelector('#selOutput').value === 'MARCEdit' && showMARC.value.substr(0,4) !== '=LDR') showMARC.value = toolCov2MARCEdit(showMARC.value);
	}
}

function toolCov2MARCEdit(strTemp) {
	//將輸出資料轉為MARCEdit格式
	let aryTemp = strTemp.split('\n');
	let strReturn = '';
	let strThisLine = '';
	strReturn = '=LDR  ' + aryTemp[0].replace(/\<LDR\>/g, '') + '\n';
	for (i=1;i<aryTemp.length;i++) {
		let strFindText = aryTemp[i].substr(0,3);
		let str008 = '001|002|003|004|005|006|007|008';
		if (strFindText !== '') {
			if (str008.indexOf(strFindText,0) !== 0-1) {
				let strData = aryTemp[i].slice(4).replace(/\s/g, '\\');
				strThisLine = `=${strFindText}  ${strData}`;
			}
			if (str008.indexOf(strFindText,0) === 0-1) {
				let strData = aryTemp[i].slice(7).replace(/\$/g, '\{dollar\}');
				strData = strData.replace(/\|/g, '\$');
				let strSign = aryTemp[i].substr(4,2).replace(/\s/g, '\\');
				strSign = strSign.replace(/\#/g, '\\');
				strThisLine = `=${strFindText}  ${strSign}${strData}`;
			}
		strReturn += strThisLine.trim() !== '' ? strThisLine + '\n' : '';
		}
	}

	return strReturn;
}

function toolCov2Miracle(strTemp) {
	//將輸出資料轉為Miracle格式
	let aryTemp = strTemp.split('\n');
	let strReturn = '';
	let strThisLine = '';
	strReturn = aryTemp[0].slice(6).replace(/\\/g, ' ') + '\n';
	for (i=1;i<aryTemp.length;i++) {
		let strFindText = aryTemp[i].substr(1,3);
		let str008 = '001|002|003|004|005|006|007|008';
		if (strFindText !== '') {
			if (str008.indexOf(strFindText,0) !== 0-1) {
				let strData = aryTemp[i].slice(6).replace(/\\/g, ' ');
				strThisLine = `${strFindText} ${strData}`;
			}
			if (str008.indexOf(strFindText,0) === 0-1) {
				let strData = aryTemp[i].slice(8).replace(/\$/g, '\|');
				strData = strData.replace(/\{dollar\}/g, '\$');
				let strSign = aryTemp[i].substr(6,2).replace(/\\/g, ' ');
				strThisLine = `${strFindText} ${strSign} ${strData}`;
			}
		strReturn += strThisLine.trim() !== '=' ? strThisLine + '\n' : '';
		}
	}

	return strReturn;
}