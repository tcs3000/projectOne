const customerName = document.getElementById('customerName');
const customerPhone = document.getElementById('customerPhone');
const submitButton = document.getElementById('submit');

const modal = document.getElementById('messageModal');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const customerInfo = {
        name: customerName.value,
        phone: customerPhone.value
    };

    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    renderMessage();
});

//post Submit Modal render messages
function renderMessage() {
    const customerInfo = JSON.parse(localStorage.getItem('customerInfo'));
    const modalContent = document.getElementById('postSubmitModal');
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;

    if (customerInfo) {
        const isValidName = nameRegex.test(customerInfo.name);
        const isValidPhone = phoneRegex.test(customerInfo.phone);

        if (isValidName && isValidPhone) {
            const formattedPhone = `(${customerInfo.phone.slice(0, 3)}) ${customerInfo.phone.slice(3, 6)}-${customerInfo.phone.slice(6)}`;
            const messageAccept = `Thank you for joining our Wait List! We will contact you at ${formattedPhone} when your table is ready!`;
            modalContent.textContent = messageAccept;
        } else {
            const messageDeny = `Please enter a valid name and phone number to join the waitlist!`;
            modalContent.textContent = messageDeny;
        }
        modal.style.display = 'block';
    } else {
        const messageDeny = `Please enter your name and phone number to join the waitlist!`;
        modalContent.textContent = messageDeny;
        modal.style.display = 'block';
    }
}


// evemt listener for closing the modal upon clicking out
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}