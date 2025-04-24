function allowDrop(event) {
  event.preventDefault();
}

// card 이동
function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.parentElement.id);  
}

// 슬롯에 저장
function drop(event) {
  event.preventDefault();
  const containerId = event.dataTransfer.getData("text/plain");
  const cardContainer = document.getElementById(containerId);
  
  if (cardContainer && !event.target.querySelector(".card-container")) {
    event.target.appendChild(cardContainer);
  }
}

// X버튼 클릭 시 원래 자리로 이동
function returnToOriginal(containerId) {
  const cardContainer = document.getElementById(containerId);
  const originalArea = document.getElementById("return");
  
  if (cardContainer) {
    originalArea.appendChild(cardContainer);
  }
}

// 저장
function saveCard() {
  const slots = document.querySelectorAll('.card-slot');
  const data = [];

  slots.forEach((slot, index) => {
    const card = slot.querySelector('img');
    if (card) {
      data.push({ slot: index + 1, cardName: card.alt });
    } else {
      data.push({ slot: index + 1, cardName: null });
    }
  });

  fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbx5aGa2kWRs1bV6h7u3S21guveH4geM6aP8-HRVAa7ue4KTFoemnzMqNy3VIJrBUGrm/exec/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    //alert("✅ 카드 배치가 Google 시트에 저장되었습니다!");
    console.log("✅ 시트 저장 결과:", msg);
  })
  .catch(err => {
    //alert("❌ 저장 실패! 콘솔을 확인하세요.");
    console.error(err);
  });
}

let touchedCardId = null;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-container').forEach(container => {
    container.addEventListener('touchstart', (e) => {
      touchedCardId = container.id;
    }, { passive: true });
  });

  document.querySelectorAll('.card-slot').forEach(slot => {
    slot.addEventListener('touchend', (e) => {
      if (touchedCardId) {
        const card = document.getElementById(touchedCardId);
        if (card && !slot.querySelector('.card-container')) {
          slot.appendChild(card);
        }
        touchedCardId = null;
      }
    });
  });
});