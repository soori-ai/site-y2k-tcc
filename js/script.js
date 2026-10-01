// 2000STARS — interações do site

document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // CONTADOR DE VISITAS
  // =========================================================

  const counter = document.getElementById("counter");

  if (counter) {
    let visits = Number(localStorage.getItem("2000starsVisits") || "1337");
    visits += 1;

    localStorage.setItem("2000starsVisits", visits);
    counter.textContent = String(visits).padStart(6, "0");
  }


  // =========================================================
  // GUESTBOOK
  // =========================================================

  const guestForm = document.getElementById("guestForm");
  const guestList = document.getElementById("guestList");

  function renderGuests() {

    if (!guestList) return;

    const guests = JSON.parse(
      localStorage.getItem("2000starsGuests") || "[]"
    );

    guestList.innerHTML = guests
      .slice(-5)
      .reverse()
      .map(g =>
        `<div class="guest"><b>♥ ${escapeHtml(g.name)}</b>: ${escapeHtml(g.message)}</div>`
      )
      .join("");
  }


  function escapeHtml(text) {

    return String(text).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));

  }


  if (guestForm) {

    renderGuests();

    guestForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const name = document
        .getElementById("guestName")
        .value
        .trim();

      const message = document
        .getElementById("guestMessage")
        .value
        .trim();

      if (!name || !message) return;

      const guests = JSON.parse(
        localStorage.getItem("2000starsGuests") || "[]"
      );

      guests.push({
        name,
        message
      });

      localStorage.setItem(
        "2000starsGuests",
        JSON.stringify(guests)
      );

      guestForm.reset();

      renderGuests();

    });

  }


  // =========================================================
  // QUIZ Y2K
  // =========================================================

  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");


  if (quizForm && quizResult) {

    quizForm.addEventListener("submit", (event) => {

      event.preventDefault();


      const data = new FormData(quizForm);

      const scores = {
        pink: 0,
        denim: 0,
        glam: 0,
        cyber: 0
      };


      for (const value of data.values()) {

        if (scores[value] !== undefined) {
          scores[value]++;
        }

      }


      const winner = Object.keys(scores).sort(
        (a, b) => scores[b] - scores[a]
      )[0];


      const results = {

        pink: {
          title: "PINK PRINCESS 🎀",
          text: "Você ama rosa, peças fofas e uma estética pop. Seu look ideal tem baby tee, mini bag, gloss e MUITO pink!",
          image: "imagens/pink-princess.jpeg"
        },

        denim: {
          title: "DENIM GIRL 👖",
          text: "Você é a cool girl do grupo. Jeans, cargo, tênis e acessórios statement são a sua combinação perfeita.",
          image: "imagens/denim-girl.jpeg"
        },

        glam: {
          title: "GLAM QUEEN ✨",
          text: "Brilho nunca é demais para você. Metalizados, glitter, gloss e acessórios chamativos fazem parte do seu universo.",
          image: "imagens/glam-queen.jpeg"
        },

        cyber: {
          title: "CYBER CUTIE 🦋",
          text: "Você tem uma vibe futurista e divertida. Óculos coloridos, estrelas, detalhes diferentes e referências de internet são sua cara.",
          image: "imagens/cyber-cutie.jpeg"
        }

      };


      quizResult.innerHTML = `
        <h2>${results[winner].title}</h2>

        <img
          src="${results[winner].image}"
          alt="${results[winner].title}"
        >

        <p>${results[winner].text}</p>

        <p>★ Seu resultado foi calculado com base nas suas escolhas! ★</p>
      `;


      quizResult.classList.remove("hidden");


      quizResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    });

  }


  // =========================================================
  // 2000STARS — SISTEMA DE COMPRA
  // =========================================================

  const buyButtons = document.querySelectorAll(".buy-button");


  // Cria a área de e-mail automaticamente na página Moda
  const shopIntro = document.querySelector(".shop-intro");

  if (shopIntro && document.querySelector(".buy-button")) {

    const emailBox = document.createElement("div");

    emailBox.id = "customerEmailBox";

    emailBox.innerHTML = `
      <div style="
        margin-top: 18px;
        padding: 15px;
        border: 2px dashed #ff69b4;
        background: #fff;
        box-shadow: 3px 3px 0 #ffc7e5;
      ">

        <strong>💌 Antes de comprar...</strong>

        <p style="margin: 8px 0;">
          Adicione seu e-mail para receber a confirmação da sua compra! ♡
        </p>

        <input
          type="email"
          id="customerEmail"
          placeholder="seuemail@email.com"
          autocomplete="email"
          style="
            padding: 9px;
            width: min(90%, 350px);
            border: 2px solid #222;
            font-family: inherit;
          "
        >

        <button
          type="button"
          id="saveEmailButton"
          style="
            margin-left: 5px;
            padding: 9px 14px;
            border: 2px solid #222;
            background: #ff8dcc;
            font-family: inherit;
            font-weight: bold;
            cursor: pointer;
          "
        >
          SALVAR E-MAIL ♥
        </button>

        <div
          id="emailStatus"
          style="margin-top: 8px; font-weight: bold;"
        ></div>

      </div>
    `;

    shopIntro.appendChild(emailBox);


    // Recupera e-mail salvo anteriormente
    const savedEmail = localStorage.getItem("2000starsCustomerEmail");

    const emailInput = document.getElementById("customerEmail");
    const saveEmailButton = document.getElementById("saveEmailButton");
    const emailStatus = document.getElementById("emailStatus");


    if (savedEmail) {

      emailInput.value = savedEmail;

      emailStatus.textContent = "♥ E-mail cadastrado!";
      emailStatus.style.color = "#d63384";

    }


    // Salvar e-mail
    saveEmailButton.addEventListener("click", () => {

      const email = emailInput.value.trim();

      if (!email || !emailInput.checkValidity()) {

        emailStatus.textContent =
          "💌 Digite um e-mail válido para continuar!";

        emailStatus.style.color = "#c00000";

        emailInput.focus();

        return;
      }


      localStorage.setItem(
        "2000starsCustomerEmail",
        email
      );


      emailStatus.textContent =
        "♥ E-mail salvo! Agora você já pode comprar.";

      emailStatus.style.color = "#d63384";

    });

  }


  // =========================================================
  // NOTIFICAÇÃO DA COMPRA
  // =========================================================

  function showShopNotification(message, type = "success") {

    const oldNotification =
      document.getElementById("shopNotification");

    if (oldNotification) {
      oldNotification.remove();
    }


    const notification = document.createElement("div");

    notification.id = "shopNotification";

    notification.innerHTML = message;

    notification.style.position = "fixed";
    notification.style.top = "25px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.zIndex = "99999";
    notification.style.width = "min(90%, 450px)";
    notification.style.padding = "18px";
    notification.style.textAlign = "center";
    notification.style.fontWeight = "bold";
    notification.style.border = "3px solid #222";
    notification.style.boxShadow = "5px 5px 0 #222";
    notification.style.background =
      type === "error" ? "#ffd6e8" : "#fff5fc";


    document.body.appendChild(notification);


    setTimeout(() => {

      notification.remove();

    }, 5000);

  }


  // =========================================================
  // BOTÃO COMPRAR
  // =========================================================

  buyButtons.forEach(button => {

    button.addEventListener("click", async (event) => {

      event.preventDefault();


      const emailInput =
        document.getElementById("customerEmail");


      const email =
        emailInput?.value.trim() ||
        localStorage.getItem("2000starsCustomerEmail");


      // -----------------------------------------------------
      // SEM E-MAIL
      // -----------------------------------------------------

      if (!email || !emailInput?.checkValidity()) {

        showShopNotification(
          "💌 Para concluir sua compra, você precisa adicionar um e-mail! ♡",
          "error"
        );


        if (emailInput) {

          emailInput.focus();

          emailInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

        return;

      }


      // Salva o e-mail
      localStorage.setItem(
        "2000starsCustomerEmail",
        email
      );


      // -----------------------------------------------------
      // PEGA AS INFORMAÇÕES DO PRODUTO
      // -----------------------------------------------------

      const productCard =
        button.closest(".product-card");


      const productName =
        productCard?.querySelector("h2")?.textContent.trim()
        || "Produto 2000STARS";


      const productPrice =
        productCard?.querySelector(".price")?.textContent.trim()
        || "";


      // -----------------------------------------------------
      // CONFIRMAÇÃO VISUAL
      // -----------------------------------------------------

      showShopNotification(`
        💖 <strong>Compra realizada!</strong><br><br>
        ${productName} — ${productPrice}<br>
        Seu pedido será entregue em até <strong>1 semana</strong>. ♡
      `);


      // -----------------------------------------------------
      // ENVIO DO E-MAIL
      // -----------------------------------------------------
      //
      // Esta parte será ativada depois que configurarmos
      // o EmailJS com o e-mail da 2000STARS.
      //
      // -----------------------------------------------------

      if (typeof emailjs !== "undefined") {

        try {

          await emailjs.send(
            "SEU_SERVICE_ID",
            "SEU_TEMPLATE_ID",
            {
              customer_email: email,
              product_name: productName,
              product_price: productPrice
            }
          );

          console.log(
            "E-mail de confirmação enviado com sucesso!"
          );

        } catch (error) {

          console.error(
            "Erro ao enviar e-mail:",
            error
          );

        }

      }

    });

  });

});
