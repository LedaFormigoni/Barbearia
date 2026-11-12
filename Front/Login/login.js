const api = "http://localhost:3000";
document.querySelector("#enviar").addEventListener("click", async () => {
  const datas = {
    nome_usuario: document.querySelector("#nome").value,
    senha_usuario: document.querySelector("#senha").value,
  };
  const resposta = await fetch(`${api}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });
  if (resposta.status == 200) {
    const usuario = await resposta.json();
    localStorage.setItem("id_usuario", usuario.id_usuario);
    localStorage.setItem("nome_usuario", usuario.nome_usuario);
    return (window.location.href = "../Index/index.html");
  }
  alert("Erro ao logar");
});
