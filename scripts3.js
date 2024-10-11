let thbAmounts = '';
let Gem1Texts = '';
let FB5Texts = '';
let FB6Texts = '';

async function calculate4P() {
    const Gem1Float = parseFloat(document.getElementById("gem1").value);
    const Gem2Float = parseFloat(document.getElementById("gem2").value);
    const Mbank = 0.50;

    if (isNaN(Gem1Float)) {
        alert('กรุณาใส่ค่าที่ถูกต้องสำหรับ GEM1');
        return;
    }

    const conversionValue = !isNaN(Gem2Float) ? Gem2Float : await convertBUSDToTHB(1);
    const Total = (parseFloat(conversionValue) + Mbank) * Gem1Float;
    
    console.log(typeof conversionValue);
    console.log(Total);
    document.getElementById("Gem1Text").innerText = Total.toFixed(2) + " ฿";
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
        usdToThbRate = parseFloat((coingeckoData.usd.thb).toFixed(2));

        const thbAmount = ((busdAmount * busdToUsdRate * usdToThbRate)).toFixed(2);
        thbAmounts = thbAmount;
        return thbAmount;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        alert('Error fetching exchange rate');
        return 0;
    }
}

function copyToClipboard(id) {
    let text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text.replace('$ ', '').replace('฿ ', '').replace(/,/g, '')).then(() => {
        alert('ข้อมูลถูกคัดลอกเรียบร้อยแล้ว');
    }).catch((err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}

function copyToClipboardALL() {
    const totalDataElement = document.getElementById("totalDataFB1");
    const textElements = totalDataElement.querySelectorAll('p');
    let textToCopy = '';

    textElements.forEach((elem) => {
        textToCopy += elem.innerText + '\n';
    });

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('ข้อมูลยอดที่ต้องชำระถูกคัดลอกไปยังคลิปบอร์ด');
    }, (err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}

function copyToClipboardPattern() {
    // const totalDataElement = document.getElementById("totalDataFB1");
    // const textElements = totalDataElement.querySelectorAll('p');
    const FB1Float = parseFloat(document.getElementById("fb1").value);
    const FB2Float = parseFloat(document.getElementById("fb2").value);
    // const FB2Float = parseFloat(document.getElementById("fb2").value);
    let textToCopy = '';
    let patternNLM = `ลูกค้าจะได้รับเงินในบัญชีโฆษณา ${FB1Float} USD
${FB1Float}$ + ${(FB1Float * FB2Float / 100)}$(ค่าบริการ) = ${Gem1Texts}$
ยอดชำระ ${FB6Texts} บาทค่ะ`;

    // textElements.forEach((elem) => {
    //     textToCopy += elem.innerText + '\n';
    // });

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(patternNLM).then(() => {
        alert('ข้อมูลยอดที่ต้องชำระถูกคัดลอกไปยังคลิปบอร์ด');
    }, (err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}

// Example copy functions
function copyToGem1() {
    copyToClipboard("Gem1Text");
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
