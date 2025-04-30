let wheel = document.querySelector(".wheel");
let spinButton = document.querySelector(".wheel-spin-button");
let popup = document.getElementById("popup");
let popupText = document.getElementById("popup-text");

// to track the rotation value
let value = 0;

// this is here to add a spin animation transition
wheel.style.transition = "transform 4s ease-out";

// to handle the spin click functionality
spinButton.onclick = () => {
  // this is to generate a random spin degree
  let spinDegrees = Math.ceil(Math.random() * 3600) + 360;
  value += spinDegrees;

  // to apply rotation to the wheel
  wheel.style.transform = "rotate(" + value + "deg)";

  // this is so that we wait for animation to finish then show results
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

// this will generate a random coupon code of 8 characters
function generateCouponCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
// this will display the popup with winning offer
function showPopup(offer) {
  popupText.textContent = `You won: ${offer}! 🎉`;
  popup.style.display = 'flex';
}

// function to generate a detailed congratulations method
function displayCongrats(offer, couponCode) {
  const congratsText = document.querySelector('.congrats-text');
  const congratsContainer = document.querySelector('.congrats-container');

  congratsContainer.style.display = 'block';
  // render content in html
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
// this would close the popup
function closePopup() {
  popup.style.display = 'none';
}
