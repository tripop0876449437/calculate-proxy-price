let thbAmounts = '';

async function convertBUSDToTHB(BUSD) {
    const busdAmount = parseFloat(BUSD);
    let usdToThbRate, busdToUsdRate;

    try {
        const coinbaseResponse = await fetch('https://api.coinbase.com/v2/prices/BUSD-USD/spot');
        const coinbaseData = await coinbaseResponse.json();
        busdToUsdRate = parseFloat(coinbaseData.data.amount);


        const coingeckoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=thb');
        const coingeckoData = await coingeckoResponse.json();
        usdToThbRate = parseFloat((coingeckoData.usd.thb).toFixed(2))+0.50;
        console.log('bt: ', parseFloat((coingeckoData.usd.thb).toFixed(2))+0.50);

        const thbAmount = ((busdAmount * busdToUsdRate * usdToThbRate)).toFixed(2);
        thbAmounts = thbAmount;
        console.log('the: ', thbAmount);
        return thbAmount;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        alert('Error fetching exchange rate');
        return 0;
    }
}

async function Money() {
    try {
        const thb = await convertBUSDToTHB(1); // รอผลลัพธ์จากฟังก์ชัน asynchronous
        const thbPlus = parseFloat(await convertBUSDToTHB(1)); // รอผลลัพธ์จากฟังก์ชัน asynchronous
        document.getElementById("money").innerText = `$1 = ${thb}฿`;
        document.getElementById("moneyPlus").innerText = `$1 = ${thbPlus}฿`;
    } catch (error) {
        console.error('Error during conversion:', error);
    }
}
Money()

function toggleCalculation() {
    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');
    const toggleContainer = document.getElementById('toggleContainer');
    const parent = container1.parentNode;
    
    // ตรวจสอบลำดับปัจจุบัน
    if (container1.nextElementSibling === toggleContainer) {
        // จาก: container1, toggle, container2
        // เป็น: container2, toggle, container1
        parent.insertBefore(container2, toggleContainer);
        parent.appendChild(container1);
    } else {
        // จาก: container2, toggle, container1
        // เป็น: container1, toggle, container2
        parent.insertBefore(container1, toggleContainer);
        parent.appendChild(container2);
    }
    
    // สลับทิศทางลูกศร
    const button = document.getElementById('toggleButton');
    button.style.transform = button.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
}

function setupBidirectionalInput(){
    const input1 = document.getElementById('tt1');
    const input2 = document.getElementById('tt2');

    input1.addEventListener('input', async () => {
        const rate = await convertBUSDToTHB(1);
        input2.value = (input1.value / rate).toFixed(2);
    });

    input2.addEventListener('input', async () => {
        const rate = await convertBUSDToTHB(1);
        input1.value = (input2.value * rate).toFixed(2);
    });
}
setupBidirectionalInput();

async function calculateTT(){
    const input1 = document.getElementById('tt1');
    const output1 = document.getElementById('TT1Text');
    const output2 = document.getElementById('TT2Text');
    const output3 = document.getElementById('TT3Text');
    const output4 = document.getElementById('TT4Text');
    const calIP1 = input1.value * await convertBUSDToTHB(1);
    const calIP2 = input1.value / await convertBUSDToTHB(1);
    const calIP3 = calIP1 * 0.06;
    const calIP4 = calIP1 + calIP3;
    output1.innerText = `฿ ${calIP1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    output2.innerText = `$ ${calIP2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    output3.innerText = `฿ ${calIP3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    output4.innerText = `฿ ${calIP4.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function copyToTT1() {
    const totalDataElement = document.getElementById("totalDataTT1");
    const textElements = totalDataElement.querySelectorAll('p');
    let textToCopy = '';

    textElements.forEach((elem) => {
        textToCopy += elem.innerText + '\n';
    });
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('ข้อมูลยอดที่ต้องชำระถูกคัดลอกไปยังคลิปบอร์ด');
    }, (err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}