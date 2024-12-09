document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.querySelector('.text-field-2.w-input');

    phoneNumberInput.addEventListener('keypress', function (event) {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    });

    phoneNumberInput.addEventListener('input', function (event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
        if (!value.startsWith('38')) {
            value = '38' + value;
        }

        if (value.length <= 3) {
            value = '+38 ' + value.substring(2);
        } else if (value.length <= 6) {
            value = '+38 ' + value.substring(2, 5) + ' ' + value.substring(5);
        } else if (value.length <= 9) {
            value = '+38 ' + value.substring(2, 5) + ' ' + value.substring(5, 8) + ' ' + value.substring(8);
        } else {
            value = '+38 ' + value.substring(2, 5) + ' ' + value.substring(5, 8) + ' ' + value.substring(8, 10) + ' ' + value.substring(10, 12);
        }

        input.value = value;
    });

    document.getElementById('wf-form-PhoneNumber-3').addEventListener('submit', function (event) {
        const phoneNumber = phoneNumberInput.value.trim();
        const uaPhoneNumberPattern = /^\+38 \d{3} \d{3} \d{2} \d{2}$/;

        if (!uaPhoneNumberPattern.test(phoneNumber)) {
            event.preventDefault();
            alert('Please enter a valid Ukrainian phone number in the format +38 097 777 77 77');
        }
    });
});