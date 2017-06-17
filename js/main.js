window.addEventListener('load', function() {

  var bubbleBath = document.querySelector('#bubble-bath');


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
    bubble.style.backgroundColor = 'rgb(' + colorIntensity() + ', ' + colorIntensity() + ', ' + colorIntensity() + ')';
    bubble.style.left = 'calc(' + left + '% - ' + size / 2 + 'px)';
    bubble.style.transitionDuration = 500 / size + 's';
    var bubbleUp = window.setTimeout(function() {
      bubble.style.bottom = '130vh';
      bubble.style.transform = 'scale(1.6)';
      window.clearTimeout(bubbleUp);
    }, 20);
  }

  // On a random time delay create a new bubble
  function bubbleTrouble() {
    var delay = (100 + Math.random() * 1000).toFixed(0); // minimum delay is 100ms

    var startBubbling = window.setTimeout(function () {
      formBubble();
      window.clearTimeout(startBubbling);
      bubbleTrouble();
    }, delay);

  }

  bubbleTrouble();

});
