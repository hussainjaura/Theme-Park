let wheel = document.querySelector(".wheel");
let spinButton = document.querySelector(".wheel-spin-button");
let popup = document.getElementById("popup");
let popupText = document.getElementById("popup-text");

let value = 0;

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

    const couponCode = generateCouponCode();
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
  popupText.textContent = `You won: ${offer}! 🎉`;
  popup.style.display = 'flex';
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
