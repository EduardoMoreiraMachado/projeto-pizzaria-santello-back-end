/***************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
* Autor: Eduardo Moreira Machado
* Data de criação: 27/11/2022
* Versão: 1.0
***************************************************************************************************/

//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para inserir um novo registro no BD
const insertIngrediente = async function(ingrediente) {

    try {

        let sql = `insert into tbl_ingrediente(nome) values(${ingrediente.nome})`;

        //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
        const result = await prisma.$executeRawUnsafe(sql);

        if (result) {

            return true;

        } else {

            return false;

        }

    } catch (error) {

        return false;

    }

}

//função para remover um registro no BD
const deleteIngrediente = async function (id) {

    let sql = `delete from tbl_ingrediente where id = ${id};`;

    //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

//função para retornar todos os registros do BD 
const selectAllIngredientes = async function () {

    //objeto do tipo RecordSet (rsIngredientes) para receber os dados do BD
    const rsIngredientes = await prisma.$queryRaw`select * from tbl_ingrediente order by id desc`;

    if (rsIngredientes.length > 0) {

        return rsIngredientes;

    } else {

        return false;

    }

}

module.exports = {

    insertIngrediente,
    deleteIngrediente,
    selectAllIngredientes

}