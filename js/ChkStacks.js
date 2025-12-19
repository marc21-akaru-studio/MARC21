function ChangeStocks() {
	boxInDatabase.innerHTML = '\<pre style\=\"white\-space\:pre\-wrap\;word\-wrap\:break\-word\;\"\>' + '&nbsp;' + '\<\/pre\>';
}

function ButtCheckStocks() {
	boxInDatabase.innerHTML = '\<pre style\=\"white\-space\:pre\-wrap\;word\-wrap\:break\-word\;\"\>' + '\<font color\=\"blue\"\>' + '比對中...' + '\<\/font\>' + '\<\/pre\>';
	let strGetData = document.getElementById("lblPeast").value;
	let intCols = 10;
	let intWhitchCol = 1;
	if (chkFromB.checked) {
		intCols = 7;
		intWhitchCol = 3;
	}
	if (chkFromC.checked) {
		intCols = 10;
		intWhitchCol = 5;
	}
	if (chkFromM.checked) {
		intCols = 13;
		intWhitchCol = 2;
		strGetData = strGetData.replace(/\$/g,'\t');
	}
	strGetData = strGetData.replace(/ /g,' ');
	strGetData = strGetData.replace(/\s\t/g,'\t');
	strGetData = strGetData.replace(/\s\t/g,'\t');
	let aryLines = strGetData.split('\n');
	let imax = aryLines.length;
	let aryStacks = [];
	for (i=0;i<imax;i++) {
		let aryThisLine = aryLines[i].split('\t');
		if (aryThisLine.length >= intCols) {
			if (chkFromM.checked) {
				let strFind = aryThisLine[intWhitchCol].slice(1,5);
				if (strFind !== 'BASRT') strFind = strFind.slice(0,3) != 'PAL' ? strFind.slice(0,2) : 'PAL';
				if (strFind === 'BASRT') strFind = 'BASRT';
				aryStacks.push([strFind,false]);
			}
			if (! chkFromM.checked) {
				let strFind = aryThisLine[intWhitchCol].slice(0,5);
				aryStacks.push([toolReturnCode(strFind),false]);
			}
		}
	}
	let strData = '\<pre style\=\"white\-space\:pre\-wrap\;word\-wrap\:break\-word\;\"\>';
	let aryOrder = boxStocks.value.split(',');
	imax = aryOrder.length;
	let jmax = aryStacks.length;
	for (i=0;i<imax;i++) {
		for (j=0;j<jmax;j++) {
			if (aryOrder[i] === aryStacks[j][0]) aryStacks[j][1] = true;
		}
	}
	let aryOrdernew = [];
	for (i=0;i<imax;i++) {
		let strFindAry = false;
		for (j=0;j<jmax;j++) {
			if (aryOrder[i] === aryStacks[j][0]) strFindAry = true;
		}
		if (aryOrder[i] !== '') aryOrdernew.push([aryOrder[i], strFindAry]);
	}
	imax = aryOrdernew.length;
	for (i=0;i<imax;i++) {
		if (strData !== '\<pre style\=\"white\-space\:pre\-wrap\;word\-wrap\:break\-word\;\"\>') strData = strData + ',';
		strData = aryOrdernew[i][1] ? strData + aryOrdernew[i][0] : strData + '\<font color\=\"red\"\>' + aryOrdernew[i][0] + '\<\/font\>';
	}
	strData = strData + '\<br\>';
	jmax = aryStacks.length;
	for (j=0;j<jmax;j++) {
		if (strData.slice(-4) !== '\<br\>') strData = strData + ',';
		strData = aryStacks[j][1] ? strData + aryStacks[j][0] : strData + '\<font color\=\"red\"\>' + aryStacks[j][0] + '\<\/font\>';
	}
	strData = strData + '\<\/pre\>';
	boxInDatabase.innerHTML = strData;
	//console.log(strData);
}

function toolReturnCode(strTemp) {
	let strReturn = '';
	let strStacks = readTextFile('Stacks.txt');
	//console.log(strTemp);
	let intFind = strStacks.indexOf(strTemp + '\t',0);
	let intWord = strTemp.length + 1;
	if (intFind > 0-1) {
		strReturn = strReturn + strStacks.substr(intFind + intWord, 3);
		strReturn = strReturn.replace(/\n/g, '');
		strReturn = strReturn.replace(/\s/g, '');
		if (strReturn === 'BAS') {
			strReturn = strStacks.substr(intFind + intWord, 5) === 'BASRT' ? 'BASRT' : strReturn;
		}
	} else if (intFind === 0-1) {
		strReturn = strReturn + '?';
	}
	return strReturn;
}

function ButtFillAll() {
	let strAllStacks = 'TB,BA,BASRT,BB,BC,BD,BE,CA,CB,DA,EA,EB,FA,FC,FD,FE,GA,GC,GD,HA,HB,HC,HD,HE,HF,HG,HI,IA,IC,ID,IE,IF,IG,IH,JA,JB,JC,JD,JE,KA,KC,KD,KE,KF,KG,LA,LB,LC,MA,NA,NB,NC,ND,NE,NG,NH,OA,OB,OC,PAL,PB,QA,QB,QC,QJ,QM,QN,QD,QE,QH,QK,QO,QP,RA,SA,TA,TC,TD,TE,TF,TG,TH,TI,TJ,TW,TK,UA,UB,UC,UU,VA,WA,XA,YA,YC,YD,YE,YF,YG,YH,YI,ZA,ZB,ZC,ZD,ZG';
	boxStocks.value = strAllStacks;
}