window.addEventListener('load', function() {

  var bubbleBath = document.querySelector('#bubble-bath');
  var words = ['day', 'night', 'elephant', 'car', 'earth', 'tranquility', 'ozone', 'speed', 'computer', 'not me', 'desk', 'street', 'office', 'tetrahedron', 'dodecahedron', 'dinosaur', 'jackass'];


  // On click on the bubble, the bubble will be removed
  // Previous event handlers are removed and a new one is added to animate the bubble popping
  bubbleBath.addEventListener('click', function(e) {
    var target = e.target;
    if ( target.classList.contains('bubble') ) {
      target.removeEventListener('transitionend', popBubble);
      target.addEventListener('transitionend', popBubble);
      target.style.transform = 'scale(1.8)';
      target.style.transitionDuration = '0.2s';
      target.style.opacity = 0;
    }
  });

  // Create a bubble element and add styles and events
  function formBubble() {
    var bubble = document.createElement('div');
    textContent = words[Math.floor(Math.random() * words.length)];
    bubble.textContent = textContent;
    bubble.setAttribute('data-word', textContent);
    bubble.classList.add('bubble');
    bubbleBath.appendChild(bubble);
    bubble.addEventListener('transitionend', popBubble);
    styleBubble(bubble);
  }

  // Handler for removing of the bubble
  function popBubble() {
    removeBubble(this);
  }

  // Bubble removal function
  function removeBubble(bubble) {
    bubble.removeEventListener('transitionend', popBubble);
    bubble.parentElement.removeChild(bubble);
  }

  // Randomly return a RGB component for the color
  function colorIntensity() {
    return Math.floor(Math.random() * 265);
  }

  // Style the bubble with random styles
  function styleBubble(bubble) {
    var minSize = 7,
        size = (Math.random() * 100 + minSize).toFixed(0),
        left = Math.random() * 100;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.lineHeight = size + 'px';
    bubble.style.backgroundColor = 'rgb(' + colorIntensity() + ', ' + colorIntensity() + ', ' + colorIntensity() + ')';
    bubble.style.left = 'calc(' + left + '% - ' + size / 2 + 'px)';
    bubble.style.transitionDuration = 1500 / size + 's';
    var bubbleUp = window.setTimeout(function() {
      bubble.style.bottom = '130vh';
      bubble.style.transform = 'scale(1.6)';
      window.clearTimeout(bubbleUp);
    }, 20);
  }

  // On a random time delay create a new bubble
  function bubbleTrouble() {
    var delay = (3000 + Math.random() * 1000).toFixed(0); // minimum delay is 3000ms

    var startBubbling = window.setTimeout(function () {
      formBubble();
      window.clearTimeout(startBubbling);
      bubbleTrouble();
    }, delay);

  }

  bubbleTrouble();

  /**********************/
  /* SPEECH RECOGNITION */
  /**********************/

  // WORKS ONLY IN CHROME :(

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results).map(result => result[0])
                                            .map(result => result.transcript)
                                            .join('').toLowerCase();
    const whatYouSaid = document.querySelector('#transcript');

    if ( e.results[0].isFinal ) {
      whatYouSaid.textContent = transcript;
    }

    if ( e.results[0].isFinal && words.indexOf(transcript) !== -1 ) {
      const bubble = document.querySelector(`[data-word="${transcript}"`);
      console.log(transcript);

      if ( transcript === 'not me' && bubble && bubble.dataset.word === 'not me' ) {
        document.write('<h1 style="color: red;">You blew it!</h1><p>Reload the page to start again</p>');
      } else if ( bubble ) {
        bubble.style.transform = '';
        removeBubble(bubble);
      }
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();

});
