// ---- Element references ----
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const diatomGuy = document.getElementById('diatom-guy');
const hat = document.getElementById('hat');
const door = document.getElementById('door');
const diatomGuyScene2 = document.getElementById('diatom-guy-scene2');
const car = document.getElementById('car');
const happyEmoji = document.getElementById('happy-emoji');

// ---- Scene 1: Hat click ----
hat.addEventListener('click', () => {
  // Swap diatom-guy to diatom-guy-with-hat
  diatomGuy.src = 'assets/diatom-guy-with-hat.png';
  diatomGuy.id = 'diatom-guy'; // keep the same id for positioning

  // Hide the hat
  hat.style.display = 'none';

  // Show the door
  door.style.display = 'block';

  // Start bobbing on diatom-guy-with-hat
  diatomGuy.classList.add('bob');

  // Make diatom-guy draggable
  enableDrag(diatomGuy);
});

// ---- Scene 1: Drag diatom-guy-with-hat to door ----
function enableDrag(element) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  function onPointerDown(e) {
    isDragging = true;
    element.classList.add('dragging');
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Switch to fixed positioning for free dragging
    element.style.position = 'fixed';
    element.style.left = rect.left + 'px';
    element.style.top = rect.top + 'px';
    element.style.bottom = 'auto';
    element.style.right = 'auto';

    element.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    element.style.left = (e.clientX - offsetX) + 'px';
    element.style.top = (e.clientY - offsetY) + 'px';
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    element.classList.remove('dragging');

    // Check overlap with the door
    const elRect = element.getBoundingClientRect();
    const doorRect = door.getBoundingClientRect();

    if (rectsOverlap(elRect, doorRect)) {
      startScene2();
    } else {
      // Snap back to original position
      element.style.position = 'absolute';
      element.style.left = '8%';
      element.style.bottom = '5%';
      element.style.top = '';
      element.style.right = '';
    }
  }

  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('pointermove', onPointerMove);
  element.addEventListener('pointerup', onPointerUp);
}

function rectsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

// ---- Scene transition ----
function startScene2() {
  scene1.classList.remove('active');
  scene2.classList.add('active');
}

// ---- Scene 2: Car click ----
car.addEventListener('click', () => {
  // Hide diatom-guy-with-hat
  diatomGuyScene2.style.display = 'none';

  // Swap car to car-with-driver
  car.src = 'assets/car-with-driver.png';
  car.style.cursor = 'default';

  // Shake for 1 second, then drive off
  car.classList.add('shake');

  setTimeout(() => {
    car.classList.remove('shake');
    car.classList.add('drive-off');

    // Show happy emoji after drive-off animation finishes (2s)
    setTimeout(() => {
      happyEmoji.style.display = 'block';
    }, 2000);
  }, 1000);
});
