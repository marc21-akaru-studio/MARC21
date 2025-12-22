const bookList = [];

// 處理文件上傳及拖放
const uploadArea = document.getElementById('uploadArea');

let coverReplaceRank = null; // 儲存需要替換書封的書籍排名

// 設置替換模式
function setCoverReplaceTarget(rank) {
    coverReplaceRank = rank;
    
    // 視覺提示：高亮顯示 #uploadArea
    uploadArea.style.border = '4px dashed #ffc107'; // 更改邊框顏色
    uploadArea.innerHTML = `請貼上或拖放 **第 ${rank} 名** 的新書封圖片...`;
    
    // 清空單冊上傳的輸入框 (避免混淆)
    document.getElementById('rank').value = '';
    document.getElementById('title').value = '';
    document.getElementById('link').value = '';

    // alert(`已選擇第 ${rank} 名，請在下方的上傳書封區貼上或拖放新圖片！`);
}
// 拖放事件
uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageSrc = e.target.result;
            if (coverReplaceRank !== null) {
                replaceBookCover(imageSrc);
            } else {
                addBook(imageSrc);
            }
            displayImage(imageSrc); // 顯示在預覽區
        };
        reader.readAsDataURL(file);
    }
});

// 處理剪貼簿貼上的圖片
uploadArea.addEventListener('paste', (event) => {
    const items = (event.clipboardData || window.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageSrc = e.target.result;
                if (coverReplaceRank !== null) {
                    replaceBookCover(imageSrc);
                } else {
                    addBook(imageSrc);
                }
                displayImage(imageSrc); // 顯示在預覽區
            };
            reader.readAsDataURL(file);
            break;
        }
    }
});

// 顯示圖片
function displayImage(imageSrc) {
    uploadArea.innerHTML = '';
    const img = document.createElement('img');
    img.src = imageSrc;
    uploadArea.appendChild(img);
}

// 添加書籍
function addBook(coverImage) {
    const rank = document.getElementById('rank').value;
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;

    if (rank && link && title) {
        const book = {
            rank: parseInt(rank),
            title: title,
            link: link,
            cover: coverImage,
            qrCode: generateQRCode(link),
        };

        bookList.push(book);
        bookList.sort((a, b) => a.rank - b.rank);
        renderBookList();
        document.getElementById('rank').value = Number(document.getElementById('rank').value) + 1;
        document.getElementById('title').value = '';
        document.getElementById('link').value = '';
        uploadArea.innerHTML = '拖放圖片或在此粘貼圖片'; 
        } else {
        alert('資料還沒填完哦！');
    }
}

document.getElementById('importExcel').addEventListener('click', () => {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(worksheet);

            json.forEach((row) => {
                if (row['排名'] && row['書封URL'] && row['電子資源連結'] && row['書名']) {
                    bookList.push({
                        rank: row['排名'],
                        title: row['書名'],
                        cover: row['書封URL'],
                        link: row['電子資源連結'],
                        qrCode: generateQRCode(row['電子資源連結'].trim())
                    });
                }
            });

            bookList.sort((a, b) => a.rank - b.rank); // 按排名排序
            renderBookList();
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('請上傳Excel文件！');
    }
});

function generateQRCode(link) {
    const qr = new QRious({
        value: link,
        size: 200,
    });
    return qr.toDataURL();
}

function renderBookList() {
    const bookListDiv = document.getElementById('bookList');
    bookListDiv.innerHTML = '';

    bookList.forEach(book => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'book-item';
        // 為 itemDiv 添加一個資料屬性，用於唯一識別
        itemDiv.dataset.rank = book.rank; 

        // 排名 (新增點擊事件)
        const newSpan = document.createElement('span');
        newSpan.textContent = `第 ${book.rank} 名`;
        
        // 關鍵修改：讓排名標籤變成可點擊的按鈕
        newSpan.style.cursor = 'pointer'; 
        newSpan.style.textDecoration = 'underline'; // 視覺提示可點擊
        
        // 點擊後呼叫 setCoverReplaceTarget 函式，並傳入該書的 rank
        newSpan.addEventListener('click', () => {
            setCoverReplaceTarget(book.rank);
        });

        itemDiv.appendChild(newSpan);

        const newSpanTitle = document.createElement('title');
        newSpanTitle.textContent = book.title;
        newSpanTitle.className = 'my-span';
        itemDiv.appendChild(newSpanTitle);

        const img = document.createElement('img');
        img.src = book.cover;
        img.className = 'book-cover';
        itemDiv.appendChild(img);

        const qrImg = document.createElement('img');
        qrImg.src = book.qrCode;
        qrImg.className = 'qr-code';
        itemDiv.appendChild(qrImg);

        const linkElement = document.createElement('a');
        linkElement.href = book.link;
        linkElement.target = '_blank';
        linkElement.innerText = `電子資源連結`;
        itemDiv.appendChild(linkElement);

        bookListDiv.appendChild(itemDiv);
    });
}

document.getElementById('generateHtml').addEventListener('click', () => {
    let htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>新北市立圖書館電子資源借閱排行榜</title></head><body><h1>新北市立圖書館電子資源借閱排行榜</h1>
<style>
body {text-align: center;}

.ranking {display: flex;flex-direction: row;flex-wrap: wrap;align-items: center;align-content: center;justify-content: center;margin: 0px;width: 100%;padding: 0px;}

.book-item {display: flex;flex-direction: row;flex-wrap: wrap;align-items: center;align-content: center;justify-content: center;margin: 5px;height: auto;width: 360px;background-color: #FFF;padding:0.2em;border: 2px solid #c2de81;border-radius: 5px;page-break-inside: avoid;break-inside: avoid;}

.book-cover {height: 140pt;width: auto;margin: 7px 0px 7px 0px;}

.qr-code {height: 70pt;margin: auto;}

.item {text-align: center;margin: 5pt;display: flex;flex-direction: column;align-items: center;align-content: center;justify-content: center;}

.TitleSpan {display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;line-height: 1.2em;height: 3.6em;width: 14em;text-overflow: ellipsis;align: left;}
</style><body><div class="ranking">
`;

    bookList.forEach(book => {
        htmlContent += `    <div class="book-item">
        <div class="item">
        <span>第 ${book.rank} 名</span><img src="${book.cover}" alt="封面" class="book-cover"><br>
        <span class="TitleSpan">${book.title}</span></div>
        <div class="item"><img src="${book.qrCode}" alt="QRcode" class="qr-code"><br>
        <a href="${book.link}" target="_blank">電子資源連結</a></div>
    </div>
`
;
    });

    htmlContent += '</div></body></html>';

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    if (chkDWHTML.checked) {
    // 完成後下載產生的HTML
    const filename = `${year}年${month}月電子資源借閱排行榜.html`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    };

    if (chkDWPDF.checked) {
    // 設定 html2pdf 選項
    const filename = `${year}年${month}月電子資源借閱排行榜.pdf`;
    const options = {
        margin: [1, 1, 1, 1], // 上右下左邊距 (mm)
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            logging: false, 
            dpi: 192, 
            letterRendering: true,
            scrollY: 0, 
            windowHeight: document.documentElement.offsetHeight 
        },
        jsPDF: { 
            unit: 'px', 
            format: [794,3400], 
            orientation: 'portrait' 
        }
    };

    // 使用 html2pdf 轉換並儲存檔案
    html2pdf()
        .set(options)
        .from(htmlContent)
        .save()
        .then(() => {
            // 下載完成後，恢復原始樣式
            element.style.display = originalDisplay; 
        });
    }

    // 在新分頁打開產生的HTML
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();

});

function setBibAs(strTemp) {
    document.getElementById('btn000Excel').style.display = strTemp === 'Excel' ? 'none' : '';
    document.getElementById('btn000ExcelNow').style.display = strTemp === 'Excel' ? '' : 'none';
    document.getElementById('GroupExcel').style.display = strTemp === 'Excel' ? '' : 'none';
    document.getElementById('btn000Book').style.display = strTemp === 'Book' ? 'none' : '';
    document.getElementById('btn000BookNow').style.display = strTemp === 'Book' ? '' : 'none';
    document.getElementById('GroupBook').style.display = strTemp === 'Book' ? '' : 'none';
}

// 替換指定排名的書封圖片
function replaceBookCover(newCoverImage) {
    if (coverReplaceRank === null) return; // 不在替換模式

    const index = bookList.findIndex(book => book.rank === coverReplaceRank);

    if (index !== -1) {
        // 1. 更新書封圖片
        bookList[index].cover = newCoverImage;
        
        // 2. 重置狀態
        coverReplaceRank = null;
        uploadArea.style.border = '2px dashed #007bff'; // 恢復邊框顏色
        uploadArea.innerHTML = '拖放圖片或在此粘貼圖片';
        
        // 3. 重新渲染清單
        renderBookList();
        
        // alert(`第 ${bookList[index].rank} 名的書封已成功替換！`);
    }
}