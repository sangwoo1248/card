/*
function allowDrop(event) {
  event.preventDefault();
}

document.querySelectorAll('.image-grid img').forEach(img => {
  img.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", event.target.id);
  });
});

function drop(event) {
  event.preventDefault();

  const imageId = event.dataTransfer.getData("text/plain");
  const draggedImage = document.getElementById(imageId);

  if (draggedImage) {
      // 카드 배치 칸에 카드 추가
      if (!event.target.querySelector('img')) {
          event.target.appendChild(draggedImage);

          draggedImage.style.width = "80px";
          draggedImage.style.height = "auto";
      }

      // 카드 취소 버튼
    if (isPlaced) {
      const removeButton = document.createElement('button');
      removeButton.className = 'remove-button';
      removeButton.innerHTML = '✕';
      removeButton.addEventListener('click', () => handleReturnCard(card, index));
      cardElement.appendChild(removeButton);
    }
  }
}
*/

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

  if (cardContainer && !event.target.querySelector('.card-container')) {
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

function saveCardPositions() {
  const slots = document.querySelectorAll('.card-slot');
  const positions = [];


  slots.forEach((slot, index) => {
    const card = slot.querySelector('img');
    if (card) {
      positions.push({ slot: index + 1, cardId: card.id });
  } else {
    positions.push({ slot: index + 1, cardId: null });
  }
});

  console.log("📝 현재 카드 배치:", positions);
  alert("카드 배치가 저장되었습니다!\n콘솔에서 확인하세요.");
}