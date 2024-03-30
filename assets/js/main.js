document.querySelectorAll(".content a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const scrollContainer = document.getElementById("scrollContainer");
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      let targetLeftRelativeToContainer = targetRect.left - containerRect.left;
      let targetRightRelativeToContainer =
        targetRect.right - containerRect.left;

      if (targetRightRelativeToContainer > containerRect.width) {
        // Si el elemento objetivo está fuera de la vista a la derecha, centrarlo en la vista
        const scrollAmount =
          targetRightRelativeToContainer -
          containerRect.width +
          scrollContainer.scrollLeft;
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else if (targetLeftRelativeToContainer < 0) {
        // Si el elemento objetivo está fuera de la vista a la izquierda, centrarlo en la vista
        const scrollAmount =
          targetLeftRelativeToContainer + scrollContainer.scrollLeft;
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  });
});

const scrollContainer = document.querySelector(".scroll-horizontal");

scrollContainer.addEventListener("scroll", () => {
  const scrollPercentage =
    (scrollContainer.scrollLeft /
      (scrollContainer.scrollWidth - scrollContainer.clientWidth)) *
    100;
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = `${scrollPercentage}%`;
});
