/***************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
* Autor: Eduardo Moreira Machado
* Data de criação: 30/11/2022
* Versão: 1.0
***************************************************************************************************/

//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para retornar um registro
const selectBebida = async function (id) {

    let sql = `select tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
               tbl_bebida.peso_liquido,
               tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria
                   inner join tbl_bebida
                       on tbl_produto.id = tbl_bebida.id_produto
               where tbl_produto.id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

module.exports = {

    selectBebida

}