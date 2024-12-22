function calculateDatedIPv4() {
    // const numTotalVatInput = document.getElementById("totalIPv4");
    // const numIPsInput = document.getElementById("totalVat");
    const numDayInput = document.getElementById("quantityDay");
    // const numIPs = numIPsInput.value;
    const numDay = parseInt(numDayInput.value, 10); // Ensure the input is an integer
    // const numTotalVat = parseInt(numTotalVatInput.value, 10);
    const currentDate = new Date();
    const futureDate = new Date();

    futureDate.setDate(currentDate.getDate() + numDay);

    const currentYear = String(currentDate.getFullYear());
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const currentDay = ('0' + currentDate.getDate()).slice(-2);
    const currentDated = currentYear + currentMonth + currentDay;
    const futureYear = String(futureDate.getFullYear());
    const futureMonth = ('0' + (futureDate.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const futureDay = ('0' + futureDate.getDate()).slice(-2);
    const futureDated = futureYear + futureMonth + futureDay

    // const formattedTotalPrice = (numTotalVat / numIPs).toFixed(2)
    const exp = currentDated + "=>" + futureDated;

    // document.getElementById("totalVatText").innerText = `ราคารวม: ${numTotalVat}฿`;
    // document.getElementById("IPPriceText").innerText = `ราคาแต่ละIP: ${formattedTotalPrice}฿`;
    document.getElementById("vatText1").innerText = `${exp}`;
}

function calculatePriceIPv6() {
    const numIPsInput = document.getElementById("numIPv6");
    const numPriceIPsInput = document.getElementById("numPriceIPv6");
    const numIPs = numIPsInput.value;
    let pricePerIP;

    console.log('Price: ', numPriceIPsInput.value);
    if (numPriceIPsInput.value == "") {
        if (numIPs >= 1 && numIPs <= 99) {
            pricePerIP = 40;
        } else if (numIPs >= 100 && numIPs <= 199) {
            pricePerIP = 35;
        } else if (numIPs >= 200) {
            pricePerIP = 30;
        }
    } else {
        console.log("Price else if:", numPriceIPsInput.value);
        pricePerIP = numPriceIPsInput.value
    }



    const totalPrice = pricePerIP * numIPs;
    const vat = totalPrice * 0.07;
    const totalPriceWithVAT = totalPrice + vat;
    const formattedTotalPrice = totalPrice.toLocaleString();
    const formattedVat = vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedTotalPriceWithVAT = totalPriceWithVAT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById("numIPv6Text").innerText = `แจ้งยอดชำระ ${numIPs} IPs`;
    document.getElementById("priceIPv6Text").innerText = `ราคา IP = ${formattedTotalPrice}฿`;
    document.getElementById("vatIPv6Text").innerText = `VAT 7% = ${formattedVat}฿`;
    document.getElementById("totalIPv6Text").innerText = `ราคารวม VAT = ${formattedTotalPriceWithVAT}฿`;
}

function GenerateIPv4() {
    const TextDataIPsInput = document.getElementById("textIPv4");
    const lines = TextDataIPsInput.value.split('\n').map(line => line.trim()).filter(line => line);
    const ipAddresses = lines.filter(line => line.match(/^\d+\.\d+\.\d+\.\d+$/));

    let outputPatternIPv4 = `
    <div>
        <p>Pattern: </p>
        <p>Server:Port:Username:Password</p>
    </div>
    `;

    let output = '';
    output += `<p>HTTP(s): </p>`;
    ipAddresses.forEach(ip => {
        output += `<p>${ip}:51523:116wuyrj:xDWTrp3Z44</p>`;
    });

    output += `<p>SOCKS5: </p>`;
    ipAddresses.forEach(ip => {
        output += `<p>${ip}:51524:116wuyrj:xDWTrp3Z44</p>`;
    });

    document.getElementById("informationIPv4").innerHTML = output;
    document.getElementById("patternIPv4").innerHTML = outputPatternIPv4;
}

function GenerateIPv4Custom() {
    const usernameElement = document.getElementById("username");
    const passwordElement = document.getElementById("password");
    const TextDataIPsInput = document.getElementById("textIPv4");

    // ตรวจสอบว่า elements มีอยู่จริง
    if (!usernameElement || !passwordElement) {
        console.error("Cannot find username or password input elements");
        return;
    }

    const username = usernameElement.value;
    const password = passwordElement.value;
    
    const lines = TextDataIPsInput.value.split('\n').map(line => line.trim()).filter(line => line);
    const ipAddresses = lines.filter(line => line.match(/^\d+\.\d+\.\d+\.\d+$/));

    let outputPatternIPv4 = `
    <div>
        <p>Pattern: </p>
        <p>Server:Port:Username:Password</p>
    </div>
    `;

    let output = '';
    output += `<p>HTTP(s): </p>`;
    ipAddresses.forEach(ip => {
        output += `<p>${ip}:51523:${username}:${password}</p>`;
    });

    output += `<p>SOCKS5: </p>`;
    ipAddresses.forEach(ip => {
        output += `<p>${ip}:51524:${username}:${password}</p>`;
    });

    document.getElementById("informationIPv4").innerHTML = output;
    document.getElementById("patternIPv4").innerHTML = outputPatternIPv4;
}

function calculateIPv4() {
    let inputFormat = document.getElementById('customBtn').classList.contains('bg-[#8c52ff]') ? 'custom' : 'default';
    
    console.log("inputFormat: ", inputFormat);
    if (inputFormat == 'default') {
        GenerateIPv4()
    } else if (inputFormat == 'custom') {
        GenerateIPv4Custom()
    }
    calculateDatedIPv4()
}

function copyToClipboard() {
    const totalDataElement = document.getElementById("totalData");
    const textElements = totalDataElement.querySelectorAll('span');
    let textToCopy = '';

    textElements.forEach((elem) => {
        // textToCopy += elem.innerText + '\n';
        textToCopy += elem.innerText;
    });

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('ข้อมูลยอดที่ต้องชำระถูกคัดลอกไปยังคลิปบอร์ด');
    }, (err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}

function copyToClipboardIPv6() {
    const totalDataElement = document.getElementById("totalDataIPv6");
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

function copyToClipboardGenerateIPv4() {
    const totalDataElement = document.getElementById("informationIPv4Full");
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

function selectFormat(format) {
    if (format == 'default') {
        document.getElementById('defaultBtn').classList.add('bg-[#8c52ff]');
        document.getElementById('customBtn').classList.remove('bg-[#8c52ff]');
        document.getElementById('inputFormat').style.display = 'none';
        document.getElementById('textFormatTitle').style.display = 'none';
        return 'default'
    } else if (format == 'custom') {
        document.getElementById('customBtn').classList.add('bg-[#8c52ff]');
        document.getElementById('inputFormat').style.display = 'flex';
        document.getElementById('textFormatTitle').style.display = 'flex';
        document.getElementById('inputFormat').style.flexDirection = 'row';
        document.getElementById('textFormatTitle').style.flexDirection = 'row';
        return 'custom'
    }
}
selectFormat('default')