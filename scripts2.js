function calculate4P() {
    const FB1Float = parseFloat(document.getElementById("fb1").value);
    const FB2Float = parseFloat(document.getElementById("fb2").value);
    const calculations = {
        FB1Text: ((FB1Float * 4 / 100) + FB1Float).toFixed(2),
        FB2Text: (FB2Float - 0.50).toFixed(2),
        FB3Text: (FB1Float * ((FB2Float - 0.50) / 100)).toFixed(2),
        FB4Text: ((FB2Float - 0.50) / 2).toFixed(2),
        FB5Text: (((FB1Float * 4 / 100) + FB1Float) - ((FB2Float - 0.50) / 2)).toFixed(2)
    };

    const format = num => parseFloat(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    Object.keys(calculations).forEach(id => {
        let symbol = "$ ";
        let formattedText = `${symbol}${format(calculations[id])}`;

        // Check if it's the FB2Text to put the % symbol after the value
        if (id === "FB2Text") {
            symbol = ""; // No symbol before the number
            formattedText = `${format(calculations[id])} %`;
        }
        document.getElementById(id).innerText = formattedText;
    });
}

function copyToClipboard(id) {
    let text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text.replace('$ ', '').replace(/,/g, '')).then(() => {
        alert('ข้อมูลถูกคัดลอกเรียบร้อยแล้ว');
    }).catch((err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}

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
