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

//função para inserir registros
const insertBebida = async function (bebida) {

    try {

        let sql = `insert into tbl_produto(
                                           nome,
                                           preco,
                                           foto,
                                           id_categoria
                                           )
                                           values
                                           (
                                               '${bebida.nome}',
                                               '${bebida.preco}',
                                               '${bebida.foto}',
                                               '${bebida.id_categoria}'
                                           );

                   insert into tbl_bebida(peso_liquido, id_produto) values(${bebida.peso_liquido}, ${bebida.id_produto});`;

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

//função para atualizar um registro no BD
const updateBebida = async function (bebida) {

    try {

        let sql = `update tbl_produto set nome = '${bebida.nome}',
                                          preco = '${bebida.preco}',
                                          foto = '${bebida.foto}',
                                          id_categoria = '${bebida.id_categoria}'
                                          where id = ${bebida.id};`;

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
const deleteBebida = async function (id) {

    let sql = `delete from tbl_bebida where id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

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

//funçao para retornar todos os registros do BD
const selectAllBebidas = async function () {

    try {

        let sql = `select tbl_produto.id as id_produto, tbl_produto.nome, tbl_produto.preco, tbl_produto.foto, tbl_produto.id_categoria as id_categoria,
                   tbl_bebida.peso_liquido,
                   tbl_categoria.nome as nome_categoria
                   from tbl_produto
                       inner join tbl_categoria
                           on tbl_categoria.id = tbl_produto.id_categoria
                       inner join tbl_bebida
                           on tbl_produto.id = tbl_bebida.id_produto;`;
                        
        const rsBebidas = await prisma.$queryRawUnsafe(sql);

        if (rsBebidas.length > 0) {

            return rsContato;

        } else {

            return false;

        }

    } catch (error) {

        return false;   

    }
}

module.exports = {

    insertBebida,
    updateBebida,
    deleteBebida,
    selectBebida,
    selectAllBebidas

}