// ตั้งค่าบัญชีผู้ใช้ที่ถูกต้อง
let correctUsername;
let correctPassword;

fetch('user.json')
  .then(response => response.json())
  .then(data => {
    correctUsername = data[0].username;
    correctPassword = data[0].password;
  })
  .catch(error => {
    console.error('Error loading user data:', error);
  });

// ฟังก์ชันตรวจสอบการล็อกอิน
const loginForm = document.querySelector('form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        if (username === correctUsername && password === correctPassword) {
            // บันทึกสถานะการล็อกอินใน sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            alert('Login Successful!');
            window.location.href = 'index.html'; // เปลี่ยนไปหน้า index.html
        } else {
            alert('Invalid Username or Password!');
        }
    });
}

// ตรวจสอบการล็อกอินเมื่อเข้าหน้าต่างๆ
const protectedPages = [
    'index.html',
    'ipv4.html', 
    'gemlogin.html',
    'ipv6.html',
    'no-limit-new-tiktok.html',
    'no-limit-new.html',
    'no-limit.html',
    'proxy-all.html',
    'proxy-ipv4-dark.html',
    'proxy-ipv6.html',
    'theoadv.html',
    '/'
];

// เพิ่มการตรวจสอบว่าหน้าปัจจุบันเป็นหน้า login หรือไม่
const currentPath = window.location.pathname;
const isLoginPage = currentPath.includes('login.html');

// ตรวจสอบเฉพาะเมื่อไม่ได้อยู่ในหน้า login
if (!isLoginPage) {
    if (protectedPages.some(page => currentPath === page || currentPath.includes(page))) {
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            window.location.replace('login.html');
        }
    }
}

// ฟังก์ชัน Logout
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}
