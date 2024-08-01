import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://lfgxpcrwtpzmaswdwvpi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3hwY3J3dHB6bWFzd2R3dnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNzc3MTcsImV4cCI6MjAzNzk1MzcxN30.lF1lVs4yvs_rsxXpo-mN91AWSzNPYWdQUeihM_B8pFk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document
  .getElementById("mensagemForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const nomeInput = document.getElementById("nome").value.trim();
    const mensagemInput = document.getElementById("mensagem").value.trim();
    const feedbackElement = document.getElementById("feedback");

    // Inserir a mensagem na base de dados
    const { data, error } = await supabase
      .from("mensagens")
      .insert([{ nome: nomeInput || "pessoa", texto: mensagemInput }])
      .select();

    if (error) {
      feedbackElement.className = "error";
      console.error("Erro ao inserir dados:", error);
      feedbackElement.textContent = "Erro ao inserir a mensagem.";
      feedbackElement.style.color = "red";
      return;
    }

    // Obter o ID da mensagem inserida
    const insertedId = data[0].id;

    // Atualizar o nome com "pessoa" e o ID autoincrementado se o nome não foi fornecido
    if (!nomeInput) {
      const { error: updateError } = await supabase
        .from("mensagens")
        .update({ nome: `pessoa${insertedId}` })
        .eq("id", insertedId);

      if (updateError) {
        feedbackElement.className = "error";
        console.error("Erro ao atualizar nome:", updateError);
        feedbackElement.textContent = "Erro ao atualizar o nome.";
        feedbackElement.style.color = "red";
        return;
      }
    }

    console.log("Mensagem inserida com sucesso:", data);
    feedbackElement.className = "insert";
    feedbackElement.textContent = "Mensagem inserida com sucesso!";
    feedbackElement.style.color = "green";
    document.getElementById("mensagemForm").reset();
  });
