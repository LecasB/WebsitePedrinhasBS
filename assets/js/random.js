import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://lfgxpcrwtpzmaswdwvpi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3hwY3J3dHB6bWFzd2R3dnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNzc3MTcsImV4cCI6MjAzNzk1MzcxN30.lF1lVs4yvs_rsxXpo-mN91AWSzNPYWdQUeihM_B8pFk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function random_mens() {
  const { count, erro } = await supabase
    .from("mensagens")
    .select("*", { count: "exact" });
  let total = count;
  console.log(total);
  let mensagem = null;

  const mensagensContainer = document.getElementById("random-mensagem");
  do {
    const num = Math.floor(Math.random() * total) + 1;

    const { data, error } = await supabase
      .from("mensagens")
      .select()
      .eq("id", num);

    mensagem = data;
  } while (mensagem[0].nome == null || mensagem[0].nome == undefined);

  console.log(mensagem);
  console.log(mensagem.nome);
  console.log(mensagem.texto);

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
  pDe.innerHTML = `From: <b>${mensagem[0].nome}</b>`;

  const pDe2 = document.createElement("p");
  pDe2.setAttribute("data-lang", "pt");
  pDe2.innerHTML = `De: <b>${mensagem[0].nome}</b>`;

  const pMensagem = document.createElement("p");
  pMensagem.textContent = mensagem[0].texto;

  conteudoDiv.appendChild(pDe);
  conteudoDiv.appendChild(pDe2);
  conteudoDiv.appendChild(pMensagem);

  mensagemDiv.appendChild(fitaDiv);
  mensagemDiv.appendChild(conteudoDiv);

  mensagensContainer.appendChild(mensagemDiv);
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

random_mens();
