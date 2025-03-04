let resultBtn = document.querySelector('.btn-result');
let textNode = resultBtn.firstChild;
let returnBtn = document.querySelector('.btn-return');
let resultText = document.querySelector('.result-text');
let bmiList = document.querySelector('.bmi-list');
let bmiData = [];

//點擊“看結果”按鈕時
resultBtn.addEventListener('click', checkData, false);

//點擊“重新”按鈕時
returnBtn.addEventListener('click', removeBtn, false);

//初始化，檢查localStorage
function initData(){
    let bmiDataItem = JSON.parse(localStorage.getItem('bmi'));
    if (!bmiDataItem) {
        return;
    } else {
        bmiData = bmiDataItem;
        showData();
    }
}
initData();

//更新陣列資料
function updateData(color, title, bmi, weight, height) {

    //重組陣列資料
    let bmiDataItem = {};
    bmiDataItem.color = color;
    bmiDataItem.title = title;
    bmiDataItem.num = bmi;
    bmiDataItem.weight = weight;
    bmiDataItem.height = height * 100;

    //抓取現在的時間
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0'); 
    let date = yyyy + '/' + mm + '/' + dd;
    bmiDataItem.date = date;

    //新增到陣列
    bmiData.unshift(bmiDataItem);
    let bmiDataStr = JSON.stringify(bmiData);
    localStorage.setItem('bmi', bmiDataStr);
    showData();
}

//判斷輸入的值
function checkData(e) {

    let heightInput = document.querySelector('.input-height');
    let weightInput = document.querySelector('.input-weight');
    let heightValue = heightInput.value;
    let weightValue = weightInput.value;
    let heightNum = parseInt(heightValue.trim());
    let weightNum = parseInt(weightValue.trim());

    let height = heightNum / 100;
    let weight = weightNum;
    let bmi = Math.ceil((weight / (height * height)) * 10) / 10;
    if (e.target.textContent.trim() !== '看結果') {
        return;
    } else if (!heightNum || heightNum > 210 || heightNum < 120) {
        alert('請輸入正確身高(範圍：120~210)');
    } else if (!weightNum || weightNum > 200 || weightNum < 30) {
        alert('請輸入正確體重(範圍：30~200)');
    } else {
        if (bmi >= 40) {
            let title = '嚴重肥胖';
            let color = 'bmi-obese-2';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 40 && bmi >= 35) {
            let title = '中度肥胖';
            let color = 'bmi-obese-1';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 35 && bmi >= 30) {
            let title = '輕度肥胖';
            let color = 'bmi-obese-1';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 30 && bmi >= 25) {
            let title = '微胖';
            let color = 'bmi-underweight';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 25 && bmi >= 18.5) {
            let title = '正常';
            let color = 'bmi-ideal';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 18.5 && bmi >= 16) {
            let title = '輕度消瘦';
            let color = 'bmi-overweight';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 16 && bmi >= 15) {
            let title = '中度消瘦';
            let color = 'bmi-obese-1';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        } else if (bmi < 15) {
            let title = '嚴重消瘦';
            let color = 'bmi-obese-2';
            updateData(color, title, bmi, weight, height);
            changeBtn(color, bmi, title);
        }
        heightInput.value = '';
        weightInput.value = '';
    }
}

//將陣列裡的資料顯示出來
function showData() {
    let str = '';
    for (let i = 0; i < bmiData.length; i++) {
        let dataYear = bmiData[i].date.slice(0, 4);
        let dataMonth = bmiData[i].date.slice(5, 7);
        let dataDate = bmiData[i].date.slice(8, 10);
        str += `
                <li class="bmi-item">
                    <div class="bmi-result-container">
                        <div class="bmi-result-color ${bmiData[i].color}"></div>
                        <div class="bmi-result-title text-gray">${bmiData[i].title}</div>
                    </div>
                    <div class="bmi-num-container">
                        <div class="bmi-num-title text-dark-gray">BMI</div>
                        <div class="bmi-num text-gray">${bmiData[i].num}</div>
                    </div>
                    <div class="bmi-weight-container">
                        <div class="bmi-weight-title text-dark-gray">weight</div>
                        <div class="bmi-weight text-gray">${bmiData[i].weight}<span>kg</span></div>
                    </div>
                    <div class="bmi-height-container">
                        <div class="bmi-height-title text-dark-gray">height</div>
                        <div class="bmi-height text-gray">${bmiData[i].height}<span>cm</span></div>
                    </div>
                    <div class="bmi-date-container text-gray">
                        <span class="bmi-dd">${dataYear}</span>
                        <span>-</span>
                        <span class="bmi-mm">${dataMonth}</span>
                        <span>-</span>
                        <span class="bmi-yyyy">${dataDate}</span>
                    </div>
                </li>
            `;
        bmiList.innerHTML = str;
    }
}

//改變按鈕樣式
function changeBtn(color, bmi, title) {
    switch (title) {
        case '嚴重肥胖':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '中度肥胖':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '輕度肥胖':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '微胖':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '正常':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '輕度消瘦':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '中度消瘦':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
        case '嚴重消瘦':
            resultBtn.className = '';
            resultText.className = '';
            returnBtn.className = '';
            textNode.textContent = bmi;
            resultBtn.classList.add('btn-result', color);
            resultText.textContent = title;
            resultText.classList.add('result-text', color);
            returnBtn.classList.add('btn-return', color);
            returnBtn.innerHTML = `<i class="fas fa-redo-alt"></i>`;
            break;
    }
}

//當我點擊右下角按鈕時
function removeBtn(){
    if (textNode.textContent == "看結果"){
        const clearData = confirm('是否要清除紀錄？');
        if(clearData){
            bmiData = [];
            localStorage.removeItem('bmi');
            bmiList.innerHTML = `<p class="text-center text-secondary">無資料</p>`;
        }else{
            return;
        }
    } else{
        resultBtn.className = '';
        resultText.className = '';
        returnBtn.className = '';
        textNode.textContent = '看結果';
        resultBtn.classList.add('btn-result');
        resultText.textContent = '';
        resultText.classList.add('result-text');
        returnBtn.classList.add('btn-return');
        returnBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    }
}