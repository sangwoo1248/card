/*function allowDrop(event) {
  event.preventDefault();  // 드롭
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
      event.target.appendChild(draggedImage);

      draggedImage.style.width = "80px";
      draggedImage.style.height = "auto";
      draggedImage.style.margin = "5px";
  }
}*/

// 드롭
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

