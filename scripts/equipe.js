fetch("../data/membros/membros.json")
  .then(res => res.json())
  .then(membros => {
    const equipeContainer = document.getElementById("equipe-container");
    if (!equipeContainer) return;

    equipeContainer.innerHTML = "";

    membros.forEach(membro => {
      const card = document.createElement("div");
      card.classList.add("membro-card");

      card.innerHTML = `
        <div class="membro-avatar">
          <img src="${membro.autor.imagem}" alt="${membro.autor.nome}" onerror="this.src='https://via.placeholder.com/150'" />
        </div>
        <h3>${membro.autor.nome}</h3>
        <p class="membro-role">${membro.especialidade}</p>
        <p class="membro-bio">${membro.autor.bio}</p>
      `;

      equipeContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Erro ao carregar membros:", err);
    const equipeContainer = document.getElementById("equipe-container");
    if (equipeContainer) {
      equipeContainer.innerHTML = "<p>Erro ao carregar os membros da equipe.</p>";
    }
  });
