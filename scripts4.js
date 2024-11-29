function calculateDay() {
    let textTheoadv = document.getElementById("textTheoadv").value;
    let theoadv1 = document.getElementById("theoadv1").value;
    let theoadv2 = document.getElementById("theoadv2").value;
    // console.log(`สวัสดีครับ แจ้งเรื่องโดเมน ${textTheoadv} หมดอายุวันที่ ${theoadv1} กรุณาแจ้งชำระเงินเพื่อต่ออายุ`);

    let domains = textTheoadv.split('\n');
    let date = [];

    date += ` <p id="Theoadv1Title" class="text-md sm:text-lg font-semibold mb-3">แจ้งต่ออายุโดเมน</p>`
    domains.forEach(element => {
        if (theoadv1 == "domain") {
            date += `<p>สวัสดีครับ แจ้งเรื่องโดเมน ${element.trim()} หมดอายุวันที่ ${theoadv2} กรุณาแจ้งชำระเงินเพื่อต่ออายุ</p><br>`
        } else if (theoadv1 == "api") {
            date += `<p>สวัสดีครับ แจ้งเรื่อง API Gateway โดเมน ${element.trim()} หมดอายุวันที่ ${theoadv2} กรุณาแจ้งชำระเงินเพื่อต่ออายุ</p><br>`
        }
    });

    document.getElementById('totalDataTheoadv1').innerHTML = date;

}

function copyToClipboard(id) {
    let text = document.getElementById('totalDataTheoadv1');
    let textElements = text.querySelectorAll('p');
    let textToCopy = '';

    textElements.forEach((elem) => {
        textToCopy += elem.innerText + '\n' +'\n';
    });

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('ข้อมูลยอดที่ต้องชำระถูกคัดลอกไปยังคลิปบอร์ด');
    }, (err) => {
        console.error('Error copying text to clipboard: ', err);
    });
}

function copyToTheo() {
    copyToClipboard("Theoadv1Text");
}
