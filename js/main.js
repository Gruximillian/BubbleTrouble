window.addEventListener('load', function() {

  var bubbleBath = document.querySelector('#bubble-bath');

  bubbleBath.addEventListener('click', function(e) {
    if ( e.target.classList.contains('bubble') ) {
      popBubble(e.target);
    }
  });

  function formBubble() {
    var bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubbleBath.appendChild(bubble);

    bubble.addEventListener('transitionend', removeBubble);

    styleBubble(bubble);

  }

  function removeBubble() {
    popBubble(this);
  }

  function styleBubble(bubble) {
    var minSize = 7,
        size = (Math.random() * 100 + minSize).toFixed(0),
        left = Math.random() * 100;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = 'calc(' + left + '% - ' + size / 2 + 'px)';
    bubble.style.transition = 'bottom ' + 300 / size + 's 0s ease-in';
    var bubbleUp = window.setTimeout(function() {
      bubble.style.bottom = '130vh';
      window.clearTimeout(bubbleUp);
    }, 20);
  }

  function popBubble(bubble) {
    bubble.removeEventListener('transitionend', removeBubble);
    bubble.parentElement.removeChild(bubble);
  }

  function bubbleTrouble() {
    var delay = (Math.random() * 1000).toFixed(0);

    var startBubbling = window.setTimeout(function () {

      formBubble();
      window.clearTimeout(startBubbling);
      bubbleTrouble();
    }, delay);

  }

  bubbleTrouble();

});
