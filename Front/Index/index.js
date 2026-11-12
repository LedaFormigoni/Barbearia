const api = "http://localhost:3000";
const select_cliente = document.querySelector("#id_cliente");
const select_servico = document.querySelector("#id_servico");
const vazia = document.querySelector("#vazia");
const buscar = document.querySelector("#buscar");
const procurar = document.querySelector("#procurar");

const sair = document.querySelector("#sair");
nome_usuario.innerHTML = localStorage.getItem("nome_usuario");
//Logout
sair.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../Login/login.html";
});
//Cadastrar clientes
document
  .querySelector("#enviar_cliente")
  .addEventListener("click", async () => {
    const datas = {
      nome_cliente: document.querySelector("#nome").value,
      CPF: document.querySelector("#cpf").value,
    };
    const resposta = await fetch(`${api}/cadastro`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(datas),
    });
    if (resposta.status != 201) {
      return alert("usuário ou senha incorretos");
    } else {
      alert("Cadastro realizado com sucesso");
      return window.location.reload();
    }
  });
//Cadastrar servico
document
  .querySelector("#enviar_servico")
  .addEventListener("click", async () => {
    const datas = {
      nome_servico: document.querySelector("#nome_servico").value,
      valor_servico: document.querySelector("#valor_servico").value,
    };
    const resposta = await fetch(`${api}/cadServico`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(datas),
    });
    if (resposta.status != 201) {
      return alert("Cadastro de serviço deu errado");
    } else {
      alert("Cadastro de serviço realizado com sucesso");
      return window.location.reload();
    }
  });
//Cadastrar agendamento
document.querySelector("#enviar_agend").addEventListener("click", async () => {
  const datas = {
    data_agendamento: document.querySelector("#data_agend").value,
    id_cliente: document.querySelector("#id_cliente").value,
    id_servico: document.querySelector("#id_servico").value,
  };
  const resposta = await fetch(`${api}/cadAgendamento`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });
  if (resposta.status != 201) {
    return alert("usuário ou senha incorretos");
  } else {
    alert("Cadastro realizado com sucesso");
    return window.location.reload();
  }
});
//Para listar os agendamentos, com botões de excluir e editar
window.addEventListener("load", async () => {
  const resposta = await fetch(`${api}/preenchimento`);
  const lista = await resposta.json();
  const resposta_agenda = await fetch(`${api}/agendamentos`);
  const lista_agenda = await resposta_agenda.json();
  if (resposta_agenda.status == 200) {
    lista_agenda.forEach((element) => {
      vazia.innerHTML += `
            <div class='card'>
            <p>${element.nome_cliente}</p>
            <p>${element.data_agendamento.slice(0, 16)}</p>
            <button class="deletar" onclick="deletar(${element.id_agendamento})">Deletar</button>
            <button class="editar" onclick="editar(${element.id_agendamento})">Editar</button>
            </div>
            `;
    });
  }
  //Para listar no select os nomes dos clientes e nome dos serviços
  if (resposta.status == 200) {
    select_cliente.innerHTML = "";
    select_servico.innerHTML = "";
    lista.forEach((element) => {
      select_cliente.innerHTML += `
       <option value="${element.id_cliente}">${element.nome_cliente}</option>
      `;
      select_servico.innerHTML += `
       <option value="${element.id_servico}">${element.nome_servico}</option>
      `;
    });
  }
});
//Procurar um agendamento
buscar.addEventListener("click", async () => {
  if (procurar.value == "") return alert("Digite um valor");
  let texto = procurar.value;
  const resposta = await fetch(
    `${api}/agendamentos?search=${texto}`,
  );
  const lista = await resposta.json();
  vazia.innerHTML = "";
  if (resposta.status == 200) {
    lista.forEach((element) => {
      vazia.innerHTML += `
            <div class='card'>
            <p>${element.nome_cliente}</p>
            <p>${element.data_agendamento.slice(0, 16)}</p>
            </div>
            `;
    });
  }
});
//Para deletar o agendamento
async function deletar(id) {
  const resposta = await fetch(`${api}/deletar/${id}`,{
    method: "delete",
  });
  if(resposta.status == 204){
    alert("Agendamento deletado");
    return window.location.reload();
  }
  alert("Erro ao deletar");
}
//Para editar um agendamento
async function editar(id) {
  const respota = await fetch(`${api}/agendamentos/${id}`);
  const lista = await respota.json();
  let dados = {
    data_agendamento: prompt('Data do Agendamento', lista.data_agendamento),
  };
  const resposta = await fetch(`${api}/editar/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados),
  });
  if(resposta.status==201){
    alert('editado com sucesso')
    return window.location.reload()
  }
  alert('erro ao editar')
}
