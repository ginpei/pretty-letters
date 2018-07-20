{
  const elInput = document.querySelector('#input');
  const elOutput = document.querySelector('#output');
  const elClipboard = document.querySelector('#clipboard');
  const charCodes = {
    A: 65,
    Z: 90,
    a: 97,
    z: 122,
  };
  const prefix = String.fromCharCode(0xd835);
  const charDefs = [
    {
      name: 'Mathematical Bold',
      offset: 0xdc00,
    },
    {
      name: 'Mathematical Italic',
      offset: 0xdc34,
    },
    {
      name: 'Mathematical Bold Italic',
      offset: 0xdc68,
    },
    {
      name: 'Mathematical Script',
      offset: 0xdc9c,
    },
    {
      name: 'Mathematical Bold Script',
      offset: 0xdcd0,
    },
    {
      name: 'Mathematical Double-struck',
      offset: 0xdd38,
    },
    {
      name: 'Mathematical Bold Fraktur',
      offset: 0xdd6c,
    },
    {
      name: 'Mathematical Sans-serif',
      offset: 0xdda0,
    },
    {
      name: 'Mathematical Sans-serif Bold',
      offset: 0xddd4,
    },
    {
      name: 'Mathematical Sans-serif Italic',
      offset: 0xde08,
    },
    {
      name: 'Mathematical Sans-serif Bold Italic',
      offset: 0xde3c,
    },
    {
      name: 'Mathematical Monospace',
      offset: 0xde70,
    },
  ];

  function renderText(inputCodes, def) {
    const result = inputCodes
      .map((code) => {
        const isUpper = (charCodes.A <= code && code <= charCodes.Z);
        const isLower = (charCodes.a <= code && code <= charCodes.z);

        if (!isUpper && !isLower) {
          return String.fromCharCode(code);
        }

        const charIndex = code - (isUpper ? charCodes.A : (charCodes.a - 26));
        return prefix + String.fromCharCode(def.offset + charIndex);
      })
      .join('');
    return result;
  }

  function render (inputText) {
    elOutput.innerHTML = '';

    const codes = [];
    for (let i = 0; i < inputText.length; i++) {
      codes.push(inputText.charCodeAt(i));
    }

    charDefs.forEach((def) => {
      const result = renderText(codes, def);

      const el = document.createElement('li');
      el.classList.add('output');
      el.innerHTML = `
        <span class="output-text"></span>
        <span class="output-name"></span>
      `;
      el.querySelector('.output-text').textContent = result;
      el.querySelector('.output-name').textContent = def.name;

      elOutput.appendChild(el);
    });
  }

  function copy (text) {
    elClipboard.value = text;
    elClipboard.select();
    document.execCommand('copy');
  }

  function start () {
    elInput.addEventListener('input', (event) => {
      render(elInput.value);
    });

    elOutput.addEventListener('click', (event) => {
      const elOutput = event.target.closest('.output');
      if (!elOutput) {
        return;
      }

      const text = elOutput.querySelector('.output-text').textContent;
      copy(text);
      alert('Copied to clipboard.');

      elInput.focus();
      elInput.select();
    });

    elInput.value = 'Hello World!';
    render(elInput.value);
  }

  start();
}
