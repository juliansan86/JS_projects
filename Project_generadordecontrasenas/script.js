
document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.password-generator__input');
    const copyBtn = document.querySelector('.password-generator__copy');
    const lengthSlider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    const lowercase = document.getElementById('lowercase');
    const uppercase = document.getElementById('uppercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');
    const form = document.querySelector('.password-generator__form');

    // Actualiza el valor visual de la longitud
    lengthSlider.addEventListener('input', function () {
        lengthValue.textContent = lengthSlider.value;
    });

    // Copiar contraseña al portapapeles
    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(input.value);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 800);
    });

    // Genera la contraseña según los parámetros
    function generatePassword() {
        let chars = '';
        if (lowercase.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (uppercase.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers.checked) chars += '0123456789';
        if (symbols.checked) chars += '!@#$%^&*()_+-={}[]:;<>,.?/';
        if (!chars) return '';
        let password = '';
        for (let i = 0; i < lengthSlider.value; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Evento para crear la contraseña
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        input.value = generatePassword();
    });

    // Inicializa la contraseña al cargar
    input.value = generatePassword();
});
