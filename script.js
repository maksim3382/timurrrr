document.addEventListener("DOMContentLoaded", () => {
  const memoriesGrid = document.getElementById("memoriesGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeLightbox = document.getElementById("closeLightbox");

  if (memoriesGrid && typeof memories !== 'undefined') {
    memories.forEach(item => {
      const card = document.createElement("div");
      card.className = "memory-card reveal";
      card.innerHTML = `
        <div style="width:100%; border-radius:16px; overflow:hidden; cursor:pointer; margin-bottom:15px;">
          <img src="${item.src}" alt="${item.title}" style="width:100%; height:280px; object-fit:cover; display:block; transition: 0.4s;">
        </div>
        <h3>${item.title}</h3>
        <p style="color:#666; margin-top:8px;">${item.description}</p>
      `;
      card.addEventListener("click", () => {
        lightboxImage.src = item.src;
        lightboxCaption.textContent = item.description;
        lightbox.showModal();
      });
      memoriesGrid.appendChild(card);
    });
  }

  closeLightbox?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});