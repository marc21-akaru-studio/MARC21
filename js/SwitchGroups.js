function setBibAs(setGroup) {
	document.getElementById('btn000Book').style.display = setGroup === 'Book' ? 'none' : '';
	document.getElementById('btn000BookNow').style.display = setGroup === 'Book' ? '' : 'none';
	document.getElementById('GroupBook').style.display = setGroup === 'Book' ? '' : 'none';

	document.getElementById('btn000Peri').style.display = setGroup === 'Peri' ? 'none' : '';
	document.getElementById('btn000PeriNow').style.display = setGroup === 'Peri' ? '' : 'none';
	document.getElementById('GroupPeri').style.display = setGroup === 'Peri' ? '' : 'none';

	document.getElementById('btn000eBook').style.display = setGroup === 'eBook' ? 'none' : '';
	document.getElementById('btn000eBookNow').style.display = setGroup === 'eBook' ? '' : 'none';
	document.getElementById('GroupeBook').style.display = setGroup === 'eBook' ? '' : 'none';
	
	document.getElementById('box856u').disabled = setGroup === 'eBook' ? false : true;
	document.getElementById('GroupeBook260').style.display = setGroup === 'eBook' ? '' : 'none';
	document.getElementById('GroupeBook538').style.display = setGroup === 'eBook' ? '' : 'none';

	document.getElementById('btn000Audio').style.display = setGroup === 'Audio' ? 'none' : '';
	document.getElementById('btn000AudioNow').style.display = setGroup === 'Audio' ? '' : 'none';
	document.getElementById('GroupAudio').style.display = setGroup === 'Audio' ? '' : 'none';

	document.getElementById('btn000DVDs').style.display = setGroup === 'DVDs' ? 'none' : '';
	document.getElementById('btn000DVDsNow').style.display = setGroup === 'DVDs' ? '' : 'none';
	document.getElementById('GroupDVDs').style.display = setGroup === 'DVDs' ? '' : 'none';

	document.getElementById('btn000Toys').style.display = setGroup === 'Toys' ? 'none' : '';
	document.getElementById('btn000ToysNow').style.display = setGroup === 'Toys' ? '' : 'none';
	document.getElementById('GroupToys').style.display = setGroup === 'Toys' ? '' : 'none';
	if (setGroup === 'Book') {
		//圖書
		document.getElementById('Group020').style.display = '';
		document.getElementById('GroupAV020').style.display = 'none';
		document.getElementById('GroupAV041a').style.display = 'none';
		document.getElementById('GroupAV041b').style.display = 'none';
		document.getElementById('Group700AV').style.display = 'none';
		cbx100a.value = '著' ; //主要著作方式
		box250a.value = '初版';
		cbx700D.value = '繪' ; //次要著作方式
		cbx700T.value = '譯' ; //第3著作方式
		cbxAV700.value = '' ; //[視聽]職務
	} else if (setGroup === 'Peri') {
		//連續出版品
		document.getElementById('Group020').style.display = '';
		document.getElementById('GroupAV020').style.display = 'none';
		document.getElementById('GroupAV041a').style.display = 'none';
		document.getElementById('GroupAV041b').style.display = 'none';
		document.getElementById('Group700AV').style.display = 'none';
		cbx100a.value = '著' ; //主要著作方式
		box250a.value = '';
		cbx700D.value = '繪' ; //次要著作方式
		cbx700T.value = '譯' ; //第3著作方式
		cbxAV700.value = '' ; //[視聽]職務
	} else if (setGroup === 'eBook') {
		//電子資源
		document.getElementById('Group020').style.display = '';
		document.getElementById('GroupAV020').style.display = 'none';
		document.getElementById('GroupAV041a').style.display = 'none';
		document.getElementById('GroupAV041b').style.display = 'none';
		document.getElementById('Group700AV').style.display = 'none';
		cbx100a.value = '著' ; //主要著作方式
		box250a.value = '';
		cbx700D.value = '繪' ; //次要著作方式
		cbx700T.value = '譯' ; //第3著作方式
		cbxAV700.value = '' ; //[視聽]職務
	} else if (setGroup === 'Audio') {
		//錄音資料
		document.getElementById('Group020').style.display = 'none';
		document.getElementById('GroupAV020').style.display = '';
		document.querySelector('#cbx020DVD').value = 'CD';  //光碟格式
		document.getElementById('GroupAV041a').style.display = '';
		document.getElementById('GroupAV041b').style.display = 'none';
		document.getElementById('Group700AV').style.display = 'none';
		cbx100a.value = '演唱' ; //主要著作方式
		box250a.value = '家用版';
		cbx700D.value = '作曲' ; //次要著作方式
		cbx700T.value = '作詞' ; //第3著作方式
		cbxAV700.value = '' ; //[視聽]職務
		box300b.value = '數位, 立體聲'; //表現方式
		cbx300c.value = '4 3/4吋';
	} else if (setGroup === 'DVDs') {
		//視聽資料
		document.getElementById('Group020').style.display = 'none';
		document.getElementById('GroupAV020').style.display = '';
		document.querySelector('#cbx020DVD').value = 'DVD';  //光碟格式
		document.getElementById('GroupAV041a').style.display = '';
		document.getElementById('GroupAV041b').style.display = '';
		document.getElementById('Group700AV').style.display = '';
		cbx100a.value = '導演' ; //主要著作方式
		cbx700D.value = '監製' ; //次要著作方式
		cbx700T.value = '編劇' ; //第3著作方式
		cbxAV700.value = '主演' ; //[視聽]職務
		box250a.value = '家用版';
		box300b.value = '有聲, 彩色'; //表現方式
		cbx300c.value = '4 3/4吋';
	} else if (setGroup === 'Toys') {
		//遊戲
		document.getElementById('Group020').style.display = '';
		document.getElementById('GroupAV020').style.display = 'none';
		document.getElementById('GroupAV041a').style.display = 'none';
		document.getElementById('GroupAV041b').style.display = 'none';
		document.getElementById('Group700AV').style.display = 'none';
		cbx100a.value = '著' ; //主要著作方式
		box250a.value = '';
		cbx700D.value = '繪' ; //次要著作方式
		cbx700T.value = '譯' ; //第3著作方式
		cbxAV700.value = '' ; //[視聽]職務
	}
	switch008336();
	switch653();
	view008();
	switchRDArd('cbx100a');
	switchRDArd('cbx700D');
	switchRDArd('cbx700T');
	switchRDArd('cbxAV700');
}

function showGroupDown(strGroup, strButton) {
	//切換Group顯示/隱藏
	var strBtnText = document.getElementById(strButton).innerHTML;
	var intArrowDown = strBtnText.indexOf('▼', 0);
	if (intArrowDown !== 0-1) {
		strBtnText = strBtnText.replace(/▼/g, '▲');
		document.getElementById(strGroup).style.display = '';
		document.getElementById(strButton).innerHTML = strBtnText;
	} else if (intArrowDown === 0-1) {
		strBtnText = strBtnText.replace(/▲/g, '▼');
		document.getElementById(strGroup).style.display = 'none';
		document.getElementById(strButton).innerHTML = strBtnText;
	}
}

