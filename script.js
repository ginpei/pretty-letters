{
  const elInput = document.querySelector('#input');
  const elOutput = document.querySelector('#output');
  const elClipboard = document.querySelector('#clipboard');
  const elMessage = document.querySelector('#message');
  const charCodes = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
    a: 'a'.charCodeAt(0),
    z: 'z'.charCodeAt(0),
    0: '0'.charCodeAt(0),
    9: '9'.charCodeAt(0),
  };
  const charDefs = [
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
    {
      name: 'Mathematical Bold',
      upperCharacters: Array.from('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'),
      lowerCharacters: Array.from('𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'),
    },
    {
      name: 'Mathematical Italic',
      upperCharacters: Array.from('𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'),
      lowerCharacters: Array.from('𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'),
    },
    {
      name: 'Mathematical Bold Italic',
      upperCharacters: Array.from('𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'),
      lowerCharacters: Array.from('𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'),
    },
    {
      name: 'Mathematical Script',
      upperCharacters: Array.from('𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'),
      lowerCharacters: Array.from('𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'),
    },
    {
      name: 'Mathematical Bold Script',
      upperCharacters: Array.from('𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'),
      lowerCharacters: Array.from('𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'),
    },
    {
      name: 'Mathematical Double-struck',
      upperCharacters: Array.from('𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'),
      lowerCharacters: Array.from('𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'),
    },
    {
      name: 'Mathematical Bold Fraktur',
      upperCharacters: Array.from('𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'),
      lowerCharacters: Array.from('𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'),
    },
    {
      name: 'Mathematical Sans-serif',
      upperCharacters: Array.from('𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'),
      lowerCharacters: Array.from('𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'),
    },
    {
      name: 'Mathematical Sans-serif Bold',
      upperCharacters: Array.from('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'),
      lowerCharacters: Array.from('𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'),
    },
    {
      name: 'Mathematical Sans-serif Italic',
      upperCharacters: Array.from('𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'),
      lowerCharacters: Array.from('𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'),
    },
    {
      name: 'Mathematical Sans-serif Bold Italic',
      upperCharacters: Array.from('𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'),
      lowerCharacters: Array.from('𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'),
    },
    {
      name: 'Mathematical Monospace',
      upperCharacters: Array.from('𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉'),
      lowerCharacters: Array.from('𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'),
    },
    {
      name: 'Superscript',
      upperCharacters: 'ᴬᴮ�ᴰᴱ�ᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾ�ᴿ�ᵀᵁⱽᵂ���',
      lowerCharacters: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖ�ʳˢᵗᵘᵛʷˣʸᶻ',
      numberCharacters: '⁰¹²³⁴⁵⁶⁷⁸⁹',
    },
  ];

  function renderText(inputCodes, def) {
    const result = inputCodes
      .map((code) => {
        const isUpper = (charCodes.A <= code && code <= charCodes.Z);
        const isLower = (charCodes.a <= code && code <= charCodes.z);
        const isNumber = (charCodes[0] <= code && code <= charCodes[9]);

        if (isUpper && def.upperCharacters) {
          return def.upperCharacters[code - charCodes.A];
        } else if (isLower && def.lowerCharacters) {
          return def.lowerCharacters[code - charCodes.a];
        } else if (isNumber && def.numberCharacters) {
          return def.numberCharacters[code - charCodes[0]];
        }
        return String.fromCharCode(code);
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

  let tmShowMessage = 0;
  function showMessage (text) {
    elMessage.textContent = text;

    clearTimeout(tmShowMessage);
    elMessage.setAttribute('data-visible', 'true');
    tmShowMessage = setTimeout(() => {
      elMessage.setAttribute('data-visible', 'false');
    }, 3000);
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
      showMessage('Copied to clipboard');

      elInput.focus();
      elInput.select();
    });

    elInput.value = 'Hello World!';
    render(elInput.value);

    showMessage('Click to copy');
  }

  start();
}
