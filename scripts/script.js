// Define o ano atual automaticamente no rodapé
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Carregar Artigos Recentes
fetch("artigos-index.json")
  .then(res => res.json())
  .then(artigos => {
    const recentes = artigos
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 3);

    const container = document.querySelector(".cards");
    if (!container) return;

    container.innerHTML = ""; // Limpa os cards fixos

    recentes.forEach(artigo => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="image clickable" style="background-image: url('${artigo.imagem}'); background-size: cover; background-position: center;"></div>
        <div class="content">
          <h3>${artigo.titulo}</h3>
          <p>${artigo.descricao}</p>
        </div>
        <div class="card-footer">
          <span><i class="fa-regular fa-clock"></i> ${artigo.tempo}</span>
          <span><i class="fa-solid fa-tag"></i> ${artigo.categoria}</span>
        </div>
      `;

      // Clicável só na imagem
      const imagem = card.querySelector(".image");
      imagem.addEventListener("click", () => {
        window.location.href = `pages/artigo.html?slug=${artigo.slug}`;
      });

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Erro ao carregar artigos recentes:", err);
  });

// Carregar Categorias
const iconesCategorias = {
  "Desenvolvimento": "fas fa-code",
  "IA": "fas fa-robot",
  "Dados": "fas fa-database",
  "Web": "fas fa-globe",
  "Segurança": "fas fa-lock",
  "Mobile": "fas fa-mobile-alt",
  "Performance": "fas fa-bolt",
  "Back-end": "fas fa-server",
  "Front-end": "fas fa-desktop",
  "Fundamentos": "fas fa-microchip",
  "Gestão de Projetos": "fas fa-tasks",
  "DevOps": "fas fa-cogs"
};

fetch("artigos-index.json")
  .then(res => res.json())
  .then(artigos => {
    const categorias = {};

    artigos.forEach(artigo => {
      const cat = artigo.categoria;
      categorias[cat] = (categorias[cat] || 0) + 1;
    });

    const container = document.getElementById("categorias-container");
    container.innerHTML = "";

    Object.entries(categorias).forEach(([nome, quantidade]) => {
      const icone = iconesCategorias[nome] || "fas fa-folder";

      const div = document.createElement("div");
      div.className = "categoria";
      div.innerHTML = `
        <i class="${icone} icon"></i>
        <h3>${nome}</h3>
        <p>${quantidade} artigo${quantidade > 1 ? "s" : ""}</p>
      `;

      div.addEventListener("click", () => {
        window.location.href = `pages/categoria.html?categoria=${encodeURIComponent(nome)}`;
      });

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Erro ao carregar categorias:", err));
