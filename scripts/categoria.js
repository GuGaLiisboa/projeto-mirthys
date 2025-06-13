const urlParams = new URLSearchParams(window.location.search);
const categoriaParam = urlParams.get("categoria");
const tituloEl = document.getElementById("categoria-titulo");
const container = document.getElementById("todas-categorias");

if (!categoriaParam) {
  tituloEl.textContent = "Categoria não informada.";
  container.innerHTML = "<p>Categoria inválida.</p>";
  throw new Error("Categoria ausente");
}

tituloEl.textContent = categoriaParam;

fetch("../artigos-index.json")
  .then(res => res.json())
  .then(artigos => {
    const filtrados = artigos.filter(a => a.categoria === categoriaParam);

    if (filtrados.length === 0) {
      container.innerHTML = "<p>Nenhum artigo encontrado para esta categoria.</p>";
      return;
    }

    filtrados
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .forEach(artigo => {
        const card = document.createElement("div");
        card.className = "artigo-retangulo";

        card.innerHTML = `
          <img src="${artigo.imagem}" alt="${artigo.titulo}" class="artigo-img" />
          <div class="artigo-conteudo">
            <h3 class="artigo-titulo">${artigo.titulo}</h3>
            <p class="artigo-descricao">${artigo.descricao}</p>
            <div class="card-footer">
              <span><i class="fa-regular fa-clock"></i> ${artigo.tempo}</span>
              <span><i class="fa-solid fa-tag"></i> ${artigo.categoria}</span>
            </div>
          </div>
        `;

        card.addEventListener("click", () => {
          window.location.href = `artigo.html?slug=${artigo.slug}`;
        });

        container.appendChild(card);
      });
  })
  .catch(err => {
    console.error("Erro ao carregar artigos:", err);
    container.innerHTML = "<p>Erro ao carregar os artigos.</p>";
  });
