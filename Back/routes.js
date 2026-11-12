import express from "express";
import sql from "./database.js";
const routes = express.Router();
//Login do usuario 
routes.post("/login", async (req, res) => {
  try {
    const { nome_usuario, senha_usuario } = req.body;
    const resposta = await sql`select * from Usuario where nome_usuario = ${nome_usuario} AND senha_usuario = ${senha_usuario}`;
    if (senha_usuario == resposta[0].senha_usuario) {
      return res.status(200).json(resposta[0]);
    }
    return res.status(401).json("erro ao logar");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});
//Cadastro do cliente
routes.post("/cadastro", async (req, res) => {
  try {
    const { nome_cliente ,CPF } = req.body;
    await sql`INSERT INTO Clientes(nome_cliente ,CPF)
	VALUES (${nome_cliente},${CPF})`;
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar cliente",
    });
  }
});
//Cadastro do serviço
routes.post("/cadServico", async (req, res) => {
  try {
    const { nome_servico, valor_servico } = req.body;
    await sql`insert into Servicos(nome_servico, valor_servico)values 
    (${nome_servico},${valor_servico})`;
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar servico",
    });
  }
});

//Cadastro do agendamento
routes.post("/cadAgendamento", async (req, res) => {
  try {
    const { data_agendamento, id_servico, id_cliente } = req.body;
    await sql`insert into Agendamentos(data_agendamento, id_servico, id_cliente)values
    (${data_agendamento},${id_servico},${id_cliente} )`;
    return res.status(201).json("Agendado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});
//Editar o agendamento
routes.put("/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data_agendamento } = req.body;
    const resposta =
      await sql`update Agendamentos set data_agendamento = ${data_agendamento} where id_agendamento=${id}`;
    return res.status(201).json("atualizado");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
});
//Deletar o agendamento
routes.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const resposta = await sql`delete from Agendamentos where id_agendamento=${id}`;
    return res.status(204).json("Excluído");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
});
//rota com consulta
routes.get("/agendamentos", async (req, res) => {
  const { search } = req.query;
  let rows;
  if (search) {
    rows = await sql`
        select * from Clientes as  c inner join Agendamentos as a on a.id_cliente = c.id_cliente
        WHERE c.nome_cliente ILIKE ${"%" + search + "%"}`;
  } else {
    rows = await sql`
    select * from Clientes as c inner join Agendamentos as a on a.id_cliente = c.id_cliente;
      `;
  }
  return res.status(200).json(rows);
});
routes.get("/preenchimento", async (req, res) => {
  let rows = await sql`
    select * from Clientes as  c full outer join Servicos as a on a.id_servico = c.id_cliente;
      `;
  return res.status(200).json(rows);
});

routes.get('/agendamentos/:id', async (req,res) => {
  const {id}= req.params;
  const resposta = await sql `select * from Agendamentos where id_agendamento=${id}`
   return res.status(200).json(resposta[0]);
})

routes.get("/usuarios", async (req, res) => {
  const resposta = await sql`select * from Usuario`;
  return res.status(200).json(resposta);
});

export default routes;
