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
        const symbol = id === "FB2Text" ? " %" : "$ ";
        document.getElementById(id).innerText = `${symbol}${format(calculations[id])}`;
    });
}

function copyToFB1() {
    let FB1Text = document.getElementById("FB1Text").innerText;
    navigator.clipboard.writeText(FB1Text.replace('$ ', '').replace(/,/g, '')).then(() => {
        alert('ข้อมูลถูกคัดลอกเรียบร้อยแล้ว');
    }).catch((err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}
