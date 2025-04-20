let wheel = document.querySelector(".wheel");
let spinButton = document.querySelector(".spin-button");
let popup = document.getElementById("popup");
let popupMessage = document.getElementById("popup-message");

let value = 0;

// Set smooth spin animation
wheel.style.transition = "transform 4s ease-out";

spinButton.onclick = () => {
  let spinDegrees = Math.ceil(Math.random() * 3600) + 360;
  value += spinDegrees;

  wheel.style.transform = "rotate(" + value + "deg)";

  setTimeout(() => {
    let rotationDegree = value % 360;
    let fixedDegree = (360 - rotationDegree + 22.5) % 360;
    let offerIndex = Math.floor(fixedDegree / 45);

    let offers = document.querySelectorAll('.number');
    let span = offers[offerIndex].querySelector('.wheel-span');
    let activeOffer = span.textContent;

    const couponCode = generateCouponCode(); // Generate ONCE
    showPopup(activeOffer, couponCode);
    displayCongrats(activeOffer, couponCode);
  }, 4000);
};

function generateCouponCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function showPopup(offer, couponCode) {
  popupMessage.innerHTML = `You won: ${offer}! 🎉<br>Your Coupon: ${couponCode}`;
  popup.style.display = 'block';
}

function displayCongrats(offer, couponCode) {
  const congratsText = document.querySelector('.congrats-text');
  const congratsContainer = document.querySelector('.congrats-container');

  congratsContainer.style.display = 'block';

  congratsText.innerHTML = `
    <strong>🎉 Congratulations!</strong><br>
    You were lucky enough to win <strong>${offer}</strong> from <em>Jaura's Theme Park</em>!<br>
    <br>
    <span style="font-weight: bold; color: #2196F3;">Your Coupon Code:</span>
    <span style="display: inline-block; margin-top: 5px; font-size: 1.2rem; background: #f1f1f1; padding: 8px 12px; border-radius: 5px;">
      ${couponCode}
    </span><br>
    <br>
    Use this code on your next visit — we can't wait to see you! 🎢🎠
  `;
}

function closePopup() {
  popup.style.display = 'none';
}
