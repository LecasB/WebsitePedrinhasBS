import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = data.SUPABASE_URL;
const SUPABASE_ANON_KEY = data.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentPage = 0;
const pageSize = 10;
let isLoading = false;

async function loadData() {
  if (isLoading) return;
  isLoading = true;

  const { data, error } = await supabase
    .from("mensagens")
    .select()
    .order("id", { ascending: false })
    .range(currentPage * pageSize, (currentPage + 1) * pageSize - 1);

  isLoading = false;

  if (error) {
    console.error(error);
    return;
  }

  const mensagensContainer = document.getElementById("mensagens-container");

  data.forEach((mensagem) => {
    const mensagemDiv = document.createElement("div");
    mensagemDiv.classList.add("mensagem");
    mensagemDiv.style.background = color();

    const fitaDiv = document.createElement("div");
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    fitaDiv.classList.add(`fita-${randomNumber}`);

    const conteudoDiv = document.createElement("div");
    conteudoDiv.classList.add("conteudo");

    const pDe = document.createElement("p");
    pDe.setAttribute("data-lang", "en");
    pDe.className = "active";
    pDe.innerHTML = `From: <b>${mensagem.nome}</b>`;

    const pDe2 = document.createElement("p");
    pDe2.setAttribute("data-lang", "pt");
    pDe2.innerHTML = `De: <b>${mensagem.nome}</b>`;

    const pMensagem = document.createElement("p");
    pMensagem.textContent = mensagem.texto;

    conteudoDiv.appendChild(pDe);
    conteudoDiv.appendChild(pDe2);
    conteudoDiv.appendChild(pMensagem);

    mensagemDiv.appendChild(fitaDiv);
    mensagemDiv.appendChild(conteudoDiv);

    mensagensContainer.appendChild(mensagemDiv);
  });

  currentPage++;
}

function color() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  switch (randomNumber) {
    case 1:
      return "blanchedalmond";
      break;
    case 2:
      return "#dcf5fc";
      break;
    case 3:
      return "#e2b552";
      break;
    case 4:
      return "#b5da44";
      break;
    case 5:
      return "#a0a6f3";
      break;
    case 6:
      return "#d97971";
      break;

    default:
      return "blanchedalmond";
      break;
  }
}

// Load initial data
loadData();

// Add scroll event listener to load more data when reaching the end of the page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    document.body.offsetHeight > 0
  ) {
    loadData();
  }
});
