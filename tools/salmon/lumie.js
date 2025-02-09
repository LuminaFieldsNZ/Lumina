

const emoteClasses = ['sad', 'neutral', 'fine'];
const EMOTE_LIFETIME_MS = 7800;

function getRandomEmote() {
  const randomIndex = Math.floor(Math.random() * emoteClasses.length);
  return emoteClasses[randomIndex];
}

function createEmotes(x, y) {
  for (let i = 0; i < emoteClasses.length; i++) {
    const emoteContainer = document.createElement('div');
    emoteContainer.classList.add('svg-container2');
    
    const emote = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    emote.classList.add('emote', getRandomEmote());
    emote.setAttribute('viewBox', '0 0 44 44');

    const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
square.setAttribute('x', '0');
square.setAttribute('y', '0');
square.setAttribute('width', '44');
square.setAttribute('height', '44');
square.setAttribute('fill', '#f8db82');
emote.appendChild(square);


    const faceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    faceGroup.classList.add('face');

    switch (emote.classList[1]) {
      case 'sad':
        faceGroup.innerHTML = `
        <g class="sad" id="sad" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 0)">
      <g id="face" transform="translate(13.000000, 20.000000)">
        <g class="face">
          <path d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4" class="mouth" stroke="#2C0E0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000)"></path>
          <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
          <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
        </g>
      </g>
    </g>
      `;        break;
      case 'neutral':
        faceGroup.innerHTML = `
        <g>
      <g class="neutral">
        <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
          <g class="mouth">
            <g transform="translate(9, 5)">
              <rect x="-2" y="0" width="4" height="2" rx="2"></rect>
            </g>
          </g>
          <ellipse class="right-eye" cx="16.0941176" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
          <ellipse class="left-eye" cx="1.90588235" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
        </g>
      </g>
    </g>
      `;        break;
      case 'fine':
        faceGroup.innerHTML = `
        <g class="fine" id="fine-emotion" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="fine">
  <g class="matrix" transform="translate(22.000000, 32.000000)">
    <g class="face-container">
      <g class="face" transform="translate(-9, -12)">
        <g class="eyes">
          <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
          <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
        </g>
        <path d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997" id="mouth" stroke="#2C0E0F" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    </g>
  </g>
</g>
</g>
`;        break;
    }

    emote.appendChild(faceGroup);
    emoteContainer.appendChild(emote);

    emoteContainer.style.top = `${y}px`;
    emoteContainer.style.left = `${x}px`;

    const horizontalDistance = (Math.random() * 500 - 250);
    const fallDuration = Math.random() * 10 + 5;

    emoteContainer.style.setProperty('--horizontal-distance', `${horizontalDistance}px`);
    emoteContainer.style.setProperty('--animation-duration', `${fallDuration}s`);

    emoteContainer.classList.add('falling');

    setTimeout(() => {
      emoteContainer.remove();
    }, EMOTE_LIFETIME_MS);

    document.body.appendChild(emoteContainer);
  }
}

document.addEventListener('click', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  createEmotes(x, y);
});
