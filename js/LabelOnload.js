const setTheme = theme => document.documentElement.className = theme;
//document.getElementById('theme-select').addeventListener('change');
window.onload = function startup() {
	var preferredTheme;
	try {
		preferredTheme = localStorage.getItem('theme');
		setTheme(preferredTheme);
	} catch (err) {}

}

function Butt5Code() {
	if (boxAuthor5.value.trim() !== '') {
		box084b5.value = return5Code(boxAuthor5.value.trim());
		let intFind = lblHistory.value.indexOf(boxAuthor5.value.trim(),0);
		if (intFind === 0-1) {
			let aryHistory = lblHistory.value.split('\n');
			let strHistory = boxAuthor5.value.trim();
			let imax = aryHistory.length;
			imax = imax > 19 ? 19 : imax;
			for(i=0;i<imax;i++) {
				strHistory = strHistory + '\n' + aryHistory[i];
			}
			lblHistory.value = strHistory;
		}
		
	}
}

function toolDisplay(strTemp) {
	var isitDisplay = document.getElementById(strTemp).style.display;
	//顯示可更換主題 : toolThemeColor
	document.getElementById('toolTheme5').style.display = '';
}

//切換主題
function switchTo(strThemeTemp) {
	setTheme(strThemeTemp);
	document.getElementById('toolTheme5').style.display='none';
	localStorage.setItem('theme', strThemeTemp);
}

function ButtLabel() {
	//開始轉置
	let intCols = Number(boxCols.value);
	let intRaws = Number(document.querySelector('#boxRaws').value);
	let strInput = document.getElementById("lblCollections").value;
	
	strInput = strInput.replace(/ /g,' ');
	strInput = strInput.replace(/\s\t/g,'\t');
	strInput = strInput.replace(/\s\t/g,'\t');
	
	let aryLines = strInput.split('\n');
	// let intPerLine = 3;
	let intWitchCol = 1;
	let intMaxCol = 4; //8
	if (chkBrowserFX.checked) {
		// intPerLine = 2;
		intWitchCol = 3;
		intMaxCol = 4; //10
	}
	if (chkBrowserFXM.checked) {
		// intPerLine = 2;
		intWitchCol = 2;
		intMaxCol = 4; //9
	}
	let aryCalls = [];
	let imax = aryLines.length;
	for (i=0;i<imax;i++) {
		let aryThisLine = aryLines[i].split('\t');
		if (aryThisLine.length >= intMaxCol) aryCalls.push(aryThisLine[intWitchCol]);
	}
	let strReturn = '\<table class\=\"labTable\" \>\<tr\>';
	let jmax = aryCalls.length;
	let intPages = 1;
	for (j=0;j<jmax;j++) {
		if (j % intCols !== intCols - 1) {
			strReturn = strReturn + '\<td\>' + toolGotCall(aryCalls[j]) + '\<\/td\>';
		}
		if (j % intCols === intCols - 1) {
			strReturn = strReturn + '\<td\>' + toolGotCall(aryCalls[j]) + '\<\/td\>' + '\n\<\/tr\>\<tr\>';
		}
		if ((j + 1) % (intCols * intRaws) === 0 && j > 1) {
			intPages = intPages + 1;
			strReturn = strReturn + '\n\<\/tr\>\<\/table\>\<br\>';
			strReturn = strReturn + '\<table class\=\"labTable\" \>\<tr\>';
		}
	}
	if (jmax % intCols !== 0) {
		let strTemp = '\<td\>&nbsp;\<\/td\>';
		let intTimes = intCols - (jmax % intCols);
		if (intTimes !== 0) strReturn = strReturn + strTemp.repeat(intTimes);
	}
	strReturn = strReturn + '\n\<\/tr\>\<\/table\>';
	divOutput.innerHTML = strReturn;
	//console.log(strReturn);
}

function toolGotCall(strTemp) {
	let strReturn = '';
	let intWords = Number(boxWords.value);
	let aryCutCall = strTemp.split(' ');
	let intMaxWords = 0;
	let imax = aryCutCall.length;
	if (imax <= 4) var aryCutCallnew = aryCutCall;
	if (imax === 5) {
		let strInsert = aryCutCall[2] + ' ' + aryCutCall[3];
		var aryCutCallnew = [];
		aryCutCallnew.push(aryCutCall[0]);
		aryCutCallnew.push(aryCutCall[1]);
		aryCutCallnew.push(strInsert);
		aryCutCallnew.push(aryCutCall[4]);
	}
	imax = aryCutCallnew.length;
	for (i=0;i<imax;i++) {
		if (intMaxWords < aryCutCallnew[i].length) intMaxWords = aryCutCallnew[i].length;
	}
	let strLeftSpace = '&nbsp;';
	let intTimes = Math.floor((intWords - intMaxWords) / 2) + 1;
	if (intWords > 11) intTimes = 0;
	if (intTimes <= 0) intTimes = 0;
	strLeftSpace = strLeftSpace.repeat(intTimes);
	for (i=0;i<imax;i++) {
		strReturn = strReturn + strLeftSpace + aryCutCallnew[i];
		if (i < imax) strReturn = strReturn + '\<br\>';
	}
	return strReturn;
}

function toolChangeBrowser() {
	//切換瀏覽器
}