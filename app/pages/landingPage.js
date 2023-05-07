export let isVisitor
export function initLandingPage() {
  const joinAsVisitor = document.querySelector("#joinAsVisitor");

  joinAsVisitor.addEventListener("click", function () {
    location.hash = "#visitorHomePage";
  });
}
