/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

* Objetivo:         Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
 * Autor:           Marina Santello
 * Data de criação: 23/11/2022
 * Versão:          1.0

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client')

//instância da classe prismaClient
const prisma = new PrismaClient()

// Função para inserir um novo contato no banco de dados
const insertContato = async function(contato) {
    try {
        let dadosContato = contato

        let scriptSQL = `insert into tbl_contato (
                                                nome,
                                                email,
                                                telefone,
                                                celular,
                                                mensagem,
                                                tbl_opcao_id 
                                                )
                                        values (
                                                '${dadosContato.nome}',
                                                '${dadosContato.email}',
                                                '${dadosContato.telefone}',
                                                '${dadosContato.celular}',
                                                '${dadosContato.mensagem}',
                                                '${dadosContato.tbl_opcao_id}'
                                                );`
                                                
        //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
        const result = await prisma.$executeRawUnsafe(scriptSQL)

        if (result)
            return true
        
        else
            return false
    }

    catch (error) {
        return false
    }
}

// Função para consultar uma mensagem no banco de dados
const selectContatoByID = async function(id) {
    try {
        let idContato = id

        let scriptSQL = `select tbl_contato.nome as nome_contato, tbl_contato.email, tbl_contato.telefone, tbl_contato.celular, tbl_contato.mensagem,
                                tbl_opcao.nome as nome_opcao

                         from   tbl_contato
                                inner join tbl_opcao
                                on		   tbl_contato.tbl_opcao_id = tbl_opcao.id
                         
                         where tbl_contato.id = ${idContato}`

        // Criação de objeto do tipo 'RecordSet' (rsAlunos), para receber os dados do DB, através do script SQL (select)
        const rsContato = await prisma.$queryRawUnsafe(scriptSQL)

        if (rsContato.length > 0)
            return rsContato
        
        else
            return false
    }

    catch(error) {
        return false
    }
}

// Função para consultar todas as mensagens do banco de dados
const selectAllContatos = async function() {
    try {
        let scriptSQL = `select tbl_contato.nome as nome_contato, tbl_contato.email, tbl_contato.telefone, tbl_contato.celular, tbl_contato.mensagem,
                                tbl_opcao.nome as nome_opcao

                         from   tbl_contato
                                inner join tbl_opcao
                                on		   tbl_contato.tbl_opcao_id = tbl_opcao.id
                                
                         order by tbl_contato.id desc`
                        
        const rsContato = await prisma.$queryRawUnsafe(scriptSQL)

        if (rsContato.length > 0)
            return rsContato
        
        else
            return false
    } 
    
    catch (error) {
        return false        
    }
}

// Função para retornar o

module.exports = {
    insertContato,
    selectContatoByID,
    selectAllContatos
}
