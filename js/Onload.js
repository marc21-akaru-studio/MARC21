var firstFlag = true; //初次加載
var systemRatioOld = window.devicePixelRatio; //初始系統乘瀏覽器的縮放比
var systemRatioNew = window.devicePixelRatio; //加載後系統乘瀏覽器的縮放比
var defaultRatio = 1.15; //預設縮放比
var fullScreenRatio = 1.15; //全螢幕縮放比
var setZoom = defaultRatio/systemRatioNew; //默認zoom
const setTheme = theme => document.documentElement.className = theme;
//document.getElementById('theme-select').addeventListener('change');
window.onload = function startup() {

	systemRatioNew = window.devicePixelRatio; //系統乘瀏覽器的縮放比

	if(systemRatioOld != systemRatioNew || firstFlag){
	firstFlag = false;
		systemRatioOld = systemRatioNew;
		document.body.style.zoom = fullScreenRatio/systemRatioNew;//初次加載或者改變縮放後修改成全螢幕縮放比
	}

	var preferredTheme;
	try {
		preferredTheme = localStorage.getItem('theme');
		setTheme(preferredTheme);
	} catch (err) {}

	autoZoom();
	if (this.box008a06) {
		loadSelect('Main');
		toolErase('Yes');
	}
	if (this.BoxDataType) {
		loadSelect('Materials');
		toolClearStacks();
		toolSwitchBK();
	}
	if (localStorage.getItem('pp')) {
		if (localStorage.getItem('pp') === atob('VHBoY2MyOTMzNzAzMA==')) {
			try {document.getElementById('divpass').style.display = 'none';
			document.getElementById('divmain').style.display = '';
			document.getElementById('divmain').style.height = window.innerHeight;
			} catch(err) {}
		}
	}
}

function autoZoom(){
	systemRatioNew = window.devicePixelRatio; //系統乘瀏覽器的縮放比

	setZoom = defaultRatio/systemRatioNew; //默認zoom

	setZoom = setZoom.toFixed(6); //四捨五入保留小數點後6位
	setZoom = parseFloat(setZoom); //去掉小數點後的0
	if(setZoom != document.body.style.zoom){
		document.body.style.zoom = setZoom;
	}
}

function loadSelect(strID) {
	//從comboBox.txt讀取每個下拉式選單的內容
	var strComboBox = readTextFile('comboBox.txt');
	var arySelectbox = [];
	if (strID === 'Main') {
		arySelectbox = ['box008a06','sel008a15','bib008aIll1','bib008aIll2','bib008aIll3',
		'bib008aIll4','bib008a22','bib008a23','bib008a24','bib008a25',
		'bib008a26','bib008a27','bib008a28','bib008a29','bib008a30',
		'bib008a31','bib008a33','bib008a34','sel008a35','sel041b',
		'sel041h','bib00838','bib00839','sel020q','sel020Hvl',
		'sel020Nvl','sel100a','sel700D','sel700T','selAV700',
		'cbx041aAV','cbx041j','sel240l','sel246i','box246A',
		'box246B','sel250a','sel250b','sel260a','sel260b',
		'sel260a2','sel260b2','sel260cb','cbxYearT','sel300a',
		'sel300c','sel300e','cbxCDs','cbx336','cbx337',
		'cbx338','cbx336b','cbx337b','cbx338b','sel650a',
		'sel651a','cbx653a','selNRRC653','sel500a','sel504a',
		'sel521a','sel546a','cbx594a1','cbx594a3','cbx594a4',
		'box008s18','box008s19','box008s21','box008s22',
		'box008s23','box008s24','box008s25','box008s26','box008s27',
		'box008s28','box008s29','box008s33','box008s34','box008e05',
		'box008e09','box008e11','box008f19','box008f21','box008f22',
		'box008f23','box008f24','box008f25','box008f26','box008f27',
		'box008f28','box008f29','box008f30','box008f31','box008f32',
		'box007v01','box007v02','box007v04','box007v05','box007v06',
		'box007v07','box007v08','box007v09','box008v05','box008v11',
		'box008v12','box008v16','box008v17','box008t05','box008t11',
		'box008t12','box008t16','box008t17','sel260a3','sel260b3',
		'sel538a'];
	}
	if (strID === 'Materials') {
		arySelectbox = ['BoxDataType','BoxBroType','BoxForC','BoxArea'];
	}

	let imax = arySelectbox.length;
	for(i=0; i<imax; i++) {
		if (arySelectbox[i]) WriteSelectBox(arySelectbox[i], strComboBox, 'selectbox');
	}
	if (strID === 'Main') {
		var selbox = document.getElementById('cbx594a2');
		selbox.options.length = 0;
		var strToday = new Date();
		var intYear = strToday.getFullYear();
		for(j = -2; j<3; j++) {
			var strSelectValue = intYear - 1911 + j;
			selbox.options.add(new Option(strSelectValue));
		}
		document.querySelector('#cbx594a2').value = intYear - 1911;
		view008();
	}
	if (strID === 'Materials') {
		WriteSelectBox('BoxLibrary', strComboBox, 'materials');
	}
}

function WriteSelectBox(strTemp3, strCBX, strID) {
	//strTemp3 = arySelectbox[i]
	var strFindString = '##' + strTemp3;
	var strFindEnd = '##' + strTemp3 + '.End';
	var intStrIndexStart = strCBX.indexOf(strFindString,0);
	var intStrIndexEnd = 0;
	intStrIndexEnd = intStrIndexStart === 0 ? 0 : strCBX.indexOf(strFindEnd,intStrIndexStart+1);

	var intStrDefStart = strCBX.indexOf(strFindEnd + '||',0);
	intStrDefStart = intStrDefStart === 0 ? 0 : intStrDefStart + strFindEnd.length + 2;
	var intStrDefEnd = strCBX.indexOf('||',intStrDefStart);
	if (intStrIndexStart !== 0) {
		intStrIndexStart = intStrIndexStart + strFindString.length + 2;
		intStrIndexEnd = intStrIndexEnd - 2;
		var strFromCB = strCBX.slice(intStrIndexStart,intStrIndexEnd);
		var strSelDef = strCBX.slice(intStrDefStart,intStrDefEnd);
		var arySelectItems = strFromCB.split('\n');

		if (strID === 'selectbox') {
			//清空內容
			var select01 = document.getElementById(strTemp3);
			select01.options.length = 0;
			//新增項目
			for(j = 0; j<arySelectItems.length; j++) {
				var strSelectValue = arySelectItems[j].slice(0, arySelectItems[j].indexOf(' ', 0));
				select01.options.add(new Option(arySelectItems[j], strSelectValue));
			}
			var strTemp2 = '#'+strTemp3;
			if (intStrDefStart !== 0) {
				document.querySelector(strTemp2).value = strSelDef;
			}
		}
		if (strID === 'materials') {
			if (txt001) {
				for (j=0;j<arySelectItems.length;j++) {
					if (j < 113) {
						let strMater = arySelectItems[j] + '　　　　　';
						strMater = strMater.slice(0,9);
						var strNo = '';
						strNo = '000' + (j+1);
						strNo = strNo.slice(-3);
						document.getElementById('txt' + strNo).innerHTML = strMater;
					}
				}
			}
		}
	}
}

