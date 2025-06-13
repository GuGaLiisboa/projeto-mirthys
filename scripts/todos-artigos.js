fetch("../artigos-index.json")
    .then(res => res.json())
    .then(artigos => {
        const container = document.getElementById("todos-artigos");

        artigos
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .forEach(artigo => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                <div class="artigo-retangulo">
                    <img src="${artigo.imagem}" alt="Imagem do artigo" class="artigo-img">
                    <div class="artigo-conteudo">
                    <h3 class="artigo-titulo">${artigo.titulo}</h3>
                    <p class="artigo-descricao">${artigo.descricao}</p>
                    <div class="card-footer">
                        <span><i class="fa-regular fa-clock"></i> ${artigo.tempo}</span>
                        <span><i class="fa-solid fa-tag"></i> ${artigo.categoria}</span>
                    </div>
                    </div>
                </div>
                `;

                const img = card.querySelector("img.artigo-img");
                img.addEventListener("click", () => {
                    window.location.href = `artigo.html?slug=${artigo.slug}`;
                });

                container.appendChild(card);
            });
    })
    .catch(err => {
        console.error("Erro ao carregar os artigos:", err);
        document.getElementById("todos-artigos").innerHTML = "<p>Erro ao carregar os artigos.</p>";
    });
