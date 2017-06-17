window.addEventListener('load', function() {

  var bubbleBath = document.querySelector('#bubble-bath');

  function formBubble() {
    var bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubbleBath.appendChild(bubble);

    bubble.addEventListener('transitionend', function() {
      popBubble(this);
    });

    bubble.addEventListener('click', function() {
      popBubble(this);
    });

    styleBubble(bubble);

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
