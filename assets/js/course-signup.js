// Submits a course page's email sign-up form (_includes/course_signup.liquid)
// in place and reports the outcome in its status line, instead of leaving the
// page for the backend's own confirmation page. Google Forms answers without
// CORS headers, so the request goes out in no-cors mode: the opaque response
// counts as delivered, and only a network failure is reported as an error.
document.querySelectorAll("form.course-signup").forEach(function (form) {
  var input = form.querySelector("input[type=email]");
  var button = form.querySelector("button[type=submit]");
  var status = form.querySelector(".course-signup-status");

  function show(message, isError) {
    status.textContent = message;
    status.classList.toggle("course-signup-status-error", Boolean(isError));
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Read the fields before disabling them: disabled controls are left out of FormData.
    var body = new URLSearchParams(new FormData(form));
    var email = input.value;
    input.disabled = true;
    button.disabled = true;
    show("Signing up…");
    fetch(form.action, { method: "POST", mode: "no-cors", body: body })
      .then(function () {
        form.classList.add("course-signup-done");
        show("Thanks! Course announcements will go to " + email + ".");
      })
      .catch(function () {
        input.disabled = false;
        button.disabled = false;
        show("The sign-up form could not be reached. Please try again in a moment.", true);
      });
  });
});
