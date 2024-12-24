let thbAmounts = '';
let FB1Texts = '';
let FB5Texts = '';
let FB6Texts = '';

async function calculate4P() {
    const FB1Float = parseFloat(document.getElementById("fb1").value);
    const FB2Float = parseFloat(document.getElementById("fb2").value);
    const Mbank = 0.50;

    if (isNaN(FB1Float) || isNaN(FB2Float)) {
        alert('กรุณาใส่ค่าที่ถูกต้องสำหรับ FB1 และ FB2');
        return;
    }

    const calculations = {
        FB1Text: ((FB1Float * FB2Float / 100) + FB1Float).toFixed(2),
        FB2Text: (FB2Float - Mbank).toFixed(2),
        FB3Text: (FB1Float * ((FB2Float - Mbank) / 100)).toFixed(2),
        FB4Text: (((FB1Float * ((FB2Float - Mbank) / 100)).toFixed(2)) / 2).toFixed(2),
        FB5Text: (((FB1Float * FB2Float / 100) + FB1Float).toFixed(2)) - ((((FB1Float * ((FB2Float - Mbank) / 100)).toFixed(2)) / 2).toFixed(2)),
        FB6Text: ''
    };

    // Convert FB5Text (BUSD) to THB
    // calculations.FB6Text = await convertBUSDToTHB(calculations.FB1Text);
    calculations.FB6Text = (await convertBUSDToTHB(1))* calculations.FB1Text;
    FB1Texts = calculations.FB1Text;
    FB5Texts = calculations.FB5Text;
    FB6Texts = parseFloat(calculations.FB6Text).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    const format = num => parseFloat(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    Object.keys(calculations).forEach(id => {
        let symbol = "$ ";
        let formattedText = `${symbol}${format(calculations[id])}`;

        // Add % symbol after FB2Text
        if (id === "FB2Text") {
            formattedText = `${format(calculations[id])} %`;
        }

        // Add THB symbol for FB6Text
        if (id === "FB6Text") {
            formattedText = `฿ ${format(calculations[id])}`;
        }

        // Display the calculated values
        document.getElementById(id).innerText = formattedText;
    });
}

async function convertBUSDToTHB(BUSD) {
    const busdAmount = parseFloat(BUSD);
    let usdToThbRate, busdToUsdRate;

    try {
        const coinbaseResponse = await fetch('https://api.coinbase.com/v2/prices/BUSD-USD/spot');
        const coinbaseData = await coinbaseResponse.json();
        busdToUsdRate = parseFloat(coinbaseData.data.amount);


        const coingeckoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=thb');
        const coingeckoData = await coingeckoResponse.json();
        usdToThbRate = parseFloat((coingeckoData.usd.thb).toFixed(2))+0.5;

        const thbAmount = ((busdAmount * busdToUsdRate * usdToThbRate)).toFixed(2);
        thbAmounts = thbAmount;
        return thbAmount;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        alert('Error fetching exchange rate');
        return 0;
    }
}

// async function convertBUSDToTHB(BUSD) {
//     const busdAmount = parseFloat(BUSD); // Convert BUSD to a number

//     try {
//         const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binance-usd&vs_currencies=thb');
//         const data = await response.json();
//         const rate = data['binance-usd']['thb'];
//         const thbAmount = (busdAmount * rate).toFixed(2);
//         return thbAmount; // Return only THB amount
//     } catch (error) {
//         console.error('Error fetching exchange rate:', error);
//         alert('Error fetching exchange rate');
//         return 0;
//     }
// }


function copyToClipboard(id) {
    let text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text.replace('$ ', '').replace('฿ ', '').replace(/,/g, ''))
}

function copyToClipboardALL() {
    const totalDataElement = document.getElementById("totalDataFB1");
    const textElements = totalDataElement.querySelectorAll('p');
    let textToCopy = '';

    textElements.forEach((elem) => {
        textToCopy += elem.innerText + '\n';
    });

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy)
}

function copyToClipboardPattern() {
    // const totalDataElement = document.getElementById("totalDataFB1");
    // const textElements = totalDataElement.querySelectorAll('p');
    const FB1Float = parseFloat(document.getElementById("fb1").value);
    const FB2Float = parseFloat(document.getElementById("fb2").value);
    // const FB2Float = parseFloat(document.getElementById("fb2").value);
    let textToCopy = '';
    let patternNLM = `ลูกค้าจะได้รับเงินในบัญชีโฆษณา ${FB1Float} USD
${FB1Float}$ + ${(FB1Float * FB2Float / 100)}$(ค่าบริการ) = ${FB1Texts}$
ยอดชำระ ${FB6Texts} บาทค่ะ`;

    // textElements.forEach((elem) => {
    //     textToCopy += elem.innerText + '\n';
    // });

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(patternNLM)
}

// Example copy functions
function copyToFB1() {
    copyToClipboard("FB1Text");
}

function copyToFB2() {
    copyToClipboard("FB2Text");
}

function copyToFB3() {
    copyToClipboard("FB3Text");
}

function copyToFB4() {
    copyToClipboard("FB4Text");
}

function copyToFB5() {
    copyToClipboard("FB5Text");
}

function copyToFB6() {
    copyToClipboard("FB6Text");
}

async function Money() {
    try {
        const thb = await convertBUSDToTHB(1); // รอผลลัพธ์จากฟังก์ชัน asynchronous
        document.getElementById("money").innerText = `$1 = ${thb}฿`;
    } catch (error) {
        console.error('Error during conversion:', error);
    }
}
Money()
