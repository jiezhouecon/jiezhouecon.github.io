// Decorative butterfly that wanders across the viewport.
// Markup: _includes/butterfly.liquid   Styles: _sass/_butterfly.scss
//
// Flight is a wander steering behaviour: the heading drifts a little every
// frame, with the occasional sharper turn, and a soft force steers it back
// whenever it approaches an edge. That reads as aimless fluttering while
// keeping it on screen, which bouncing off the edges would not.
(function () {
  "use strict";

  var el = document.getElementById("butterfly");
  if (!el) return;

  // Motion across the screen is the case this media query exists for.
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    el.parentNode.removeChild(el);
    return;
  }

  var TAU = Math.PI * 2;
  var TOP_INSET = 78; // stay clear of the fixed navbar
  var MARGIN = 70; // distance at which the turn-back force begins
  var HALF_W = el.offsetWidth / 2 || 19;
  var HALF_H = el.offsetHeight / 2 || 16;

  var MIN_SPEED = 0.35; // px per 60fps frame
  var MAX_SPEED = 1.7;
  var DRIFT = 0.05; // per-frame heading jitter, radians
  var SHARP_TURN_CHANCE = 0.006;

  var x, y, heading, speed, targetSpeed;
  var lastFrame = 0;
  var running = false;

  function bounds() {
    return {
      left: HALF_W,
      right: Math.max(HALF_W + 1, window.innerWidth - HALF_W),
      top: TOP_INSET,
      bottom: Math.max(TOP_INSET + 1, window.innerHeight - HALF_H),
    };
  }

  function wrapAngle(a) {
    return ((a % TAU) + TAU) % TAU;
  }

  // Shortest signed distance between two angles, so turns never take the long
  // way round when the heading crosses zero.
  function angleDelta(from, to) {
    var d = wrapAngle(to - from);
    return d > Math.PI ? d - TAU : d;
  }

  // The home page marks the butterfly in its tagline as a perch. Starting
  // there makes the flyer look like it peels off the text and leaves. Other
  // pages have no perch, so they start somewhere at random.
  function perchPoint() {
    var perch = document.getElementById("butterfly-perch");
    if (!perch) return null;
    var r = perch.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function reset() {
    var b = bounds();
    var from = perchPoint();

    if (from) {
      x = Math.min(Math.max(from.x, b.left), b.right);
      y = Math.min(Math.max(from.y, b.top), b.bottom);
      // Leave roughly upward, and let the speed easing do the accelerating so
      // it drifts off the text rather than darting away from it.
      heading = -Math.PI / 2 + (Math.random() - 0.5);
      speed = 0.05;
    } else {
      x = b.left + Math.random() * (b.right - b.left);
      y = b.top + Math.random() * (b.bottom - b.top);
      heading = Math.random() * TAU;
      speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    }
    targetSpeed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
  }

  function step(dt) {
    var b = bounds();

    // Aimless drift, plus an occasional decisive change of direction.
    heading += (Math.random() - 0.5) * DRIFT * dt;
    if (Math.random() < SHARP_TURN_CHANCE * dt) {
      heading += (Math.random() - 0.5) * 1.6;
    }

    // Butterflies do not hold a steady pace; ease toward a new one now and then.
    if (Math.random() < 0.012 * dt) {
      targetSpeed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    }
    speed += (targetSpeed - speed) * Math.min(1, 0.04 * dt);

    // Soft containment: the closer to an edge, the harder it turns inward.
    var pull = 0;
    if (x < b.left + MARGIN) pull = Math.max(pull, (b.left + MARGIN - x) / MARGIN);
    if (x > b.right - MARGIN) pull = Math.max(pull, (x - (b.right - MARGIN)) / MARGIN);
    if (y < b.top + MARGIN) pull = Math.max(pull, (b.top + MARGIN - y) / MARGIN);
    if (y > b.bottom - MARGIN) pull = Math.max(pull, (y - (b.bottom - MARGIN)) / MARGIN);

    if (pull > 0) {
      var inward = Math.atan2((b.top + b.bottom) / 2 - y, (b.left + b.right) / 2 - x);
      heading += angleDelta(heading, inward) * Math.min(0.5, 0.05 * pull * dt);
    }

    x += Math.cos(heading) * speed * dt;
    y += Math.sin(heading) * speed * dt;

    // A hard clamp in case a resize leaves it outside the new viewport.
    x = Math.min(Math.max(x, b.left), b.right);
    y = Math.min(Math.max(y, b.top), b.bottom);

    // The artwork points up, so a heading of -90 degrees needs no rotation.
    var degrees = (heading * 180) / Math.PI + 90;
    el.style.transform = "translate3d(" + (x - HALF_W).toFixed(1) + "px," + (y - HALF_H).toFixed(1) + "px,0) rotate(" + degrees.toFixed(1) + "deg)";
  }

  function frame(now) {
    if (!running) return;
    // Normalise to 60fps steps and cap the jump after a background tab wakes.
    var dt = Math.min(3, (now - lastFrame) / 16.667) || 1;
    lastFrame = now;
    step(dt);
    window.requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    lastFrame = performance.now();
    window.requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
  }

  // No point animating a tab nobody is looking at.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  // Honour the preference if it is changed while the page is open.
  var onPreferenceChange = function (e) {
    if (e.matches) {
      stop();
      el.style.display = "none";
    } else {
      el.style.display = "";
      start();
    }
  };
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", onPreferenceChange);
  else if (reduceMotion.addListener) reduceMotion.addListener(onPreferenceChange);

  window.addEventListener("resize", function () {
    HALF_W = el.offsetWidth / 2 || HALF_W;
    HALF_H = el.offsetHeight / 2 || HALF_H;
  });

  function init() {
    reset();
    step(0);
    // Add the class on the next frame so the opacity transition actually runs
    // instead of being collapsed into the initial paint.
    window.requestAnimationFrame(function () {
      el.classList.add("is-visible");
    });
    start();
  }

  // Wait for load: the profile photo above the tagline settles the layout, and
  // measuring the perch before that would launch from the wrong place.
  if (document.readyState === "complete") init();
  else window.addEventListener("load", init, { once: true });
})();
