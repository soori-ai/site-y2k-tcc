// 2000STARS — interações do site

document.addEventListener("DOMContentLoaded", () => {
  // Contador local: aumenta a cada visita no navegador.
  const counter = document.getElementById("counter");
  if (counter) {
    let visits = Number(localStorage.getItem("2000starsVisits") || "1337");
    visits += 1;
    localStorage.setItem("2000starsVisits", visits);
    counter.textContent = String(visits).padStart(6, "0");
  }

  // Guestbook: salva mensagens apenas neste navegador.
  const guestForm = document.getElementById("guestForm");
  const guestList = document.getElementById("guestList");

  function renderGuests() {
    if (!guestList) return;
    const guests = JSON.parse(localStorage.getItem("2000starsGuests") || "[]");
    guestList.innerHTML = guests.slice(-5).reverse().map(g =>
      `<div class="guest"><b>♥ ${escapeHtml(g.name)}</b>: ${escapeHtml(g.message)}</div>`
    ).join("");
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, char => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
    }[char]));
  }

  if (guestForm) {
    renderGuests();
    guestForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("guestName").value.trim();
      const message = document.getElementById("guestMessage").value.trim();
      if (!name || !message) return;
      const guests = JSON.parse(localStorage.getItem("2000starsGuests") || "[]");
      guests.push({name, message});
      localStorage.setItem("2000starsGuests", JSON.stringify(guests));
      guestForm.reset();
      renderGuests();
    });
  }

  // Quiz Y2K
  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");

  if (quizForm && quizResult) {
    quizForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(quizForm);
      const scores = {pink: 0, denim: 0, glam: 0, cyber: 0};

      for (const value of data.values()) {
        if (scores[value] !== undefined) scores[value]++;
      }

      const winner = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];

      const results = {
        pink: {
          title: "PINK PRINCESS 🎀",
          text: "Você ama rosa, peças fofas e uma estética pop. Seu look ideal tem baby tee, mini bag, gloss e MUITO pink!"
        },
        denim: {
          title: "DENIM GIRL 👖",
          text: "Você é a cool girl do grupo. Jeans, cargo, tênis e acessórios statement são a sua combinação perfeita."
        },
        glam: {
          title: "GLAM QUEEN ✨",
          text: "Brilho nunca é demais para você. Metalizados, glitter, gloss e acessórios chamativos fazem parte do seu universo."
        },
        cyber: {
          title: "CYBER CUTIE 🦋",
          text: "Você tem uma vibe futurista e divertida. Óculos coloridos, estrelas, detalhes diferentes e referências de internet são sua cara."
        }
      };

      quizResult.innerHTML = `<h2>${results[winner].title}</h2><p>${results[winner].text}</p><p>★ Seu resultado foi calculado com base nas suas escolhas! ★</p>`;
      quizResult.classList.remove("hidden");
      quizResult.scrollIntoView({behavior: "smooth", block: "center"});
    });
  }
});
