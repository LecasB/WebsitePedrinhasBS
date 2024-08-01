import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://lfgxpcrwtpzmaswdwvpi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3hwY3J3dHB6bWFzd2R3dnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNzc3MTcsImV4cCI6MjAzNzk1MzcxN30.lF1lVs4yvs_rsxXpo-mN91AWSzNPYWdQUeihM_B8pFk";
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

    const fitaDiv = document.createElement("div");
    const randomNumber = Math.floor(Math.random() * 2) + 1; // Gera um número aleatório entre 1 e 2
    fitaDiv.classList.add(`fita-${randomNumber}`);

    const conteudoDiv = document.createElement("div");
    conteudoDiv.classList.add("conteudo");

    const pDe = document.createElement("p");
    pDe.innerHTML = `De: <b>${mensagem.nome}</b>`; // Assuming 'nome' is a field in your 'mensagens' table

    const pMensagem = document.createElement("p");
    pMensagem.textContent = mensagem.texto; // Assuming 'texto' is a field in your 'mensagens' table

    conteudoDiv.appendChild(pDe);
    conteudoDiv.appendChild(pMensagem);

    mensagemDiv.appendChild(fitaDiv);
    mensagemDiv.appendChild(conteudoDiv);

    mensagensContainer.appendChild(mensagemDiv);
  });

  currentPage++;
}

function color() {}

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
