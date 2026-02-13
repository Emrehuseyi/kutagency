(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      const sel = el.getAttribute("data-scroll");
      const t = document.querySelector(sel);
      if (t) t.scrollIntoView({ behavior: "smooth" });
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const phone = (fd.get("phone") || "").toString().trim();
      const topic = (fd.get("topic") || "").toString().trim();
      const msg = (fd.get("message") || "").toString().trim();

      const subject = encodeURIComponent(`KUT AGENCY | ${topic} | ${name}`);
      const body = encodeURIComponent(
        `Ad Soyad: ${name}\nTelefon: ${phone}\nKonu: ${topic}\n\nMesaj:\n${msg}\n\n— kutagency.com`
      );

      window.location.href =
        `mailto:kutajansdanismanlik@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
