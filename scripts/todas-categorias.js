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

fetch("../artigos-index.json")
  .then(res => res.json())
  .then(artigos => {
    const categoriasComQtd = {};

    // Conta os artigos por categoria
    artigos.forEach(artigo => {
      const categoria = artigo.categoria;
      categoriasComQtd[categoria] = (categoriasComQtd[categoria] || 0) + 1;
    });

    const container = document.getElementById("categorias-container");
    if (!container) return;

    container.innerHTML = "";

    // Agora usamos TODAS as categorias fixas
    Object.entries(iconesCategorias).forEach(([nome, icone]) => {
      const quantidade = categoriasComQtd[nome] || 0;

      const div = document.createElement("div");
      div.className = "categoria" + (quantidade === 0 ? " categoria-inativa" : "");

      div.innerHTML = `
        <i class="${icone} icon"></i>
        <h3>${nome}</h3>
        <p>${quantidade} artigo${quantidade !== 1 ? "s" : ""}</p>
      `;

      if (quantidade > 0) {
        div.addEventListener("click", () => {
          window.location.href = `categoria.html?categoria=${encodeURIComponent(nome)}`;
        });
      }

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Erro ao carregar categorias:", err);
    const container = document.getElementById("categorias-container");
    if (container) {
      container.innerHTML = "<p>Erro ao carregar as categorias.</p>";
    }
  });
