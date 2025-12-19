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

function toolChangeCountry() {
	let aryTemp = [];
	if (chkCountryCH.checked) {
		// 中國作者
		aryTemp.push(['8','8 現代作者',true]);
		aryTemp.push(['7','7 清；近代 (1644年-1912年)',false]);
		aryTemp.push(['6','6 明 (1368年-1644年)',false]);
		aryTemp.push(['5','5 宋遼金元 (960年-1368年)',false]);
		aryTemp.push(['4','4 隋唐五代 (589年-960年)',false]);
		aryTemp.push(['3','3 晉南北朝 (281年-589年)',false]);
		aryTemp.push(['2','2 秦漢三國 (前219年-280年)',false]);
		aryTemp.push(['1','1 先秦 (前1555年-',false]);
	}
	if (chkCountryER.checked) {
		// 西洋作者
		aryTemp.push(['8','8 西洋現代作者',true]);
		aryTemp.push(['7','7 19世紀 (1801年-1900年)',false]);
		aryTemp.push(['6','6 18世紀 (1701年-1800年)',false]);
		aryTemp.push(['5','5 17世紀 (1601年-1700年)',false]);
		aryTemp.push(['4','4 近代 (1453年-1800年)',false]);
		aryTemp.push(['3','3 中世紀 (476年-1453年)',false]);
		aryTemp.push(['2','2 古羅馬 (前753年-476年)',false]);
		aryTemp.push(['1','1 古希臘 (前800年-1453年)',false]);
	}
	if (chkCountryJP.checked) {
		// 日本作者
		aryTemp.push(['7','7 現代：明治時代及其後(1868- )',true]);
		aryTemp.push(['6','6 近世：江戶「德川」時代(1600-1868)',false]);
		aryTemp.push(['5','5 室町及安土桃山時代(1392-1600)',false]);
		aryTemp.push(['4','4 近古：鎌倉－桃山(1192-1600)',false]);
		aryTemp.push(['3','3 平安時代(784-1192)',false]);
		aryTemp.push(['2','2 中古：大化－平安(645-1192)',false]);
		aryTemp.push(['1','1 太古及上古：神代(to 645)',false]);
	}
	if (chkCountryKR.checked) {
		// 韓國作者
		aryTemp.push(['7','7 現代：大韓民國(1945- )',true]);
		aryTemp.push(['6','6 日本統治時期(1910-1945)',false]);
		aryTemp.push(['5','5 朝鮮時代(1392-1910)',false]);
		aryTemp.push(['4','4 高麗時代(918-1392)',false]);
		aryTemp.push(['3','3 中古(313-918)',false]);
		aryTemp.push(['2','2 上古(to 313)',false]);
		aryTemp.push(['1','1 太古；原始時代',false]);
	}
	//清空內容
	let select01 = document.getElementById('selAuthorYear');
	select01.options.length = 0;
	//新增項目
	let jmax = aryTemp.length
	for(j = 0; j<jmax; j++) {
		select01.options.add(new Option(aryTemp[j][1], aryTemp[j][0], aryTemp[j][2]));
	}
	if (boxAuthor5.value !== '') toolYears();
}

function toolYears() {
	// 判斷年代號
	let strReturn = '8';
	if (chkCountryJP.checked || chkCountryKR.checked) strReturn = '7';
	if (boxAuthor5.value !== '') {
		if (boxAuthor5.value.indexOf('|d',0) !== -1) {
			let aryTemp2 = boxAuthor5.value.split('|d')[1].split('-');
			if (aryTemp2.length > 1) {
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
						if (chkCountryCH.checked) {
							//中國作者
							aryYears.push([-999,'1']);
							aryYears.push([-206,'2']);
							aryYears.push([265,'3']);
							aryYears.push([618,'4']);
							aryYears.push([960,'5']);
							aryYears.push([1368,'6']);
							aryYears.push([1644,'7']);
							aryYears.push([1912,'8']);
							aryYears.push([9999,'8']);
						}
						if (chkCountryER.checked) {
							//西洋作者
							aryYears.push([-800,'1']);
							aryYears.push([-753,'2']);
							aryYears.push([476,'3']);
							aryYears.push([1453,'4']);
							aryYears.push([1601,'5']);
							aryYears.push([1701,'6']);
							aryYears.push([1801,'7']);
							aryYears.push([1901,'8']);
							aryYears.push([9999,'8']);
						}
						if (chkCountryJP.checked) {
							//日本作者
							aryYears.push([1,'1']);
							aryYears.push([645,'2']);
							aryYears.push([784,'3']);
							aryYears.push([1192,'4']);
							aryYears.push([1392,'5']);
							aryYears.push([1600,'6']);
							aryYears.push([1868,'7']);
							aryYears.push([9999,'7']);
						}
						if (chkCountryKR.checked) {
							//韓國作者
							aryYears.push([-999,'1']);
							aryYears.push([0,'2']);
							aryYears.push([313,'3']);
							aryYears.push([918,'4']);
							aryYears.push([1392,'5']);
							aryYears.push([1910,'6']);
							aryYears.push([1945,'7']);
							aryYears.push([9999,'7']);
						}
					let jmax = aryYears.length;
					for (j=0;j<jmax;j++) {
						if (aryTemp2[1] >= aryYears[j][0]) strReturn = aryYears[j][1];
					}
				}
			}
		}
	}
	document.querySelector('#selAuthorYear').value = strReturn;
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

function return5Code(strTemp) {
	var str5Code = readTextFile('5CODE.txt'); // 五筆資料庫
	strTemp = strTemp.replace(/\|D/g,'\|d');
	strTemp = strTemp.replace(/\{/g,'');
	var intFind = strTemp.indexOf('\|\|',0);
	var strKeep = strTemp;
	if (intFind !== 0-1) strKeep = strTemp.substr(0,intFind);
	intFind = strKeep.indexOf('(',0);
	if (intFind !== 0-1) strKeep = strKeep.substr(0,intFind);
	var aryNames = strKeep.split('|d')[0].split('.');
	intFind = aryNames.length - 1;
	var aryAuthor = aryNames[intFind].split(''); // 作者名依字分割
	var strReturn = document.querySelector('#selAuthorYear').value.slice(-1);
	var strEnglish = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=[]{}|,./<>;:' + '\'' + '\"';
	var imax = aryAuthor.length;
	for (i=0;i<imax;i++) {
		var intFindEnglish = strEnglish.indexOf(aryAuthor[i],0);
		if (intFindEnglish === 0-1) {
			var intFind = str5Code.indexOf(aryAuthor[i] + '\t',0);
			if (intFind > 0-1) {
				strReturn = strReturn + str5Code.substr(intFind + 2, 1);
			} else if (intFind === 0-1) {
				strReturn = strReturn + '?';
			}
		}
	}
	str5Code = '';
	return strReturn.substr(0,4);
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