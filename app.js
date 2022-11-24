/******************************************************************************************
* Objetivo: API responsável pela manipulação de dados do back-end (get, post, put e delete)
* Autor: Eduardo Moreira Machado e Marina Santello Pimentel
* Data de criação: 21/11/2022
* Versão: 1.0
******************************************************************************************/

//import dsa bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('./module/config.js');

//configuração do cors para liberar o acesso a API
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    app.use(cors());

    next();

});

//objeto que permite receber um JSON no body das requisições
const jsonParser = bodyParser.json();

/* * * * * * * * * * * * * * * * * * * * *
    rotas para CRUD de cliente (Create, Read, Update e Delete)
    data: 23/11/2022
* * * * * * * * * * * * * * * * * * * * */

//Endpoint para inserir um novo cliente
app.post('/v1/cliente', cors(), jsonParser, async function(request, response) {

    let statusCode;
    let message;
    let headerContentType;

    //recebe o tipo de content-type que foi enviado no header da requisição
    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        
        //recebe do corpo da mensagem o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar o JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {

            //import do arquivo da controller de cliente
            const controllerCliente = require('./controller/controllerCliente.js');
            //chama a função novo aluno da controller e encaminha os dados do body
            console.log(dadosBody)
            const novoCliente = await controllerCliente.novoCliente(dadosBody);

            statusCode = novoCliente.status;
            message = novoCliente.message;    

        } else {

            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;

        }

    } else {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;

    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para atualizar registros de um cliente 
app.put('/v1/cliente/:id', cors(), jsonParser, async function(request, response) {

    let statusCode;
    let message;
    let headerContentType;

    //recebe o tipo de content-type que foi enviado no header da requisição
    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        
        //recebe do corpo da mensagem o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar o JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {
            
            //recebe o id enviado por parâmetro na requisição
            let id = request.params.id;

            //validação do ID na requisição
            if (id != '' && id != undefined) {

                //adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //import do arquivo da controller de cliente
                const controllerCliente = require('./controller/controllerCliente.js');
                //chama a função para atualizar um cliente da controller e encaminha os dados do body
                const novoCliente = await controllerCliente.atualizarCliente(dadosBody);

                statusCode = novoCliente.status;
                message = novoCliente.message; 

            } else {

                statusCode = 400; 
                message = MESSAGE_ERROR.REQUIRED_ID

            }

        } else {

            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;

        }

    } else {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;

    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para excluir um cliente
app.delete('/v1/cliente/:id', cors(), jsonParser, async function(request, response) {

    //recebe o id enviado por parâmetro na requisição
    let id = request.params.id;
    let statusCode;
    let message;

    //validação do ID na requisição
    if (id != '' && id != undefined) {

        //import do arquivo da controller de cliente
        const controllerCliente = require('./controller/controllerCliente.js');
        //chama a função para exlcuir um cliente da controller
        const deleteCliente = await controllerCliente.excluirCliente(id);

        statusCode = deleteCliente.status;
        message = deleteCliente.message;    

    } else {

        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;

    }

    response.status(statusCode);
    response.json(message);

});

//EnPoint para buscar um cliente pelo email e senha
app.post('/v1/loginCliente', cors(), jsonParser, async function(request, response) {

    let statusCode;
    let message;
    let headerContentType;

    //recebe o tipo de content-type que foi enviado no header da requisição
    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {

        //recebe o corpo da mensagem o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar o JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {

            //import do arquivo da controller de cliente
            const controllerCliente = require('./controller/controllerCliente.js');
            //chama a funcão validar cliente da controller e encaminha os dados do body
            const validarCliente = await controllerCliente.validarCliente(dadosBody);

            statusCode = validarCliente.status;
            message = validarCliente.message;

        } else {

            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;

        }

    } else {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE

    }

    response.status(statusCode);
    response.json(message);

});

/* * * * * * * * * * * * * * * * * * * * *
    rotas para CRUD de serviços (Create, Read, Update e Delete)
    data: 23/11/2022
* * * * * * * * * * * * * * * * * * * * */

//EndPoint para listar todos os servicos
app.get('/v1/servicos', cors(), async function(request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerServico
    const controllerServico = require('./controller/controllerServico.js');

    //retorna todos os servicos existentes no BD
    const dadosServicos = await controllerServico.listarServicos();

    //valida se existe retorno de dados
    if (dadosServicos) {

        //status 200
        statusCode = 200;
        message = dadosServicos;

    } else {

        //status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;

    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

//EndPoint para inserir um novo serviço
app.post('/v1/servico', cors(), jsonParser, async function(request, response) {

    let statusCode;
    let message;
    let headerContentType;

    //recebe o tipo de content-type que foi enviado no header da requisição
    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        
        //recebe do corpo da mensagem o conteúdo
        let dadosBody = request.body;
        console.log(dadosBody)

        //realiza um processo de conversão de dados para conseguir comparar o JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {

            //import do arquivo da controller de serviço
            const controllerServico = require('./controller/controllerServico.js');
            //chama a função novo aluno da controller e encaminha os dados do body
            const novoServico = await controllerServico.novoServico(dadosBody);

            statusCode = novoServico.status;
            message = novoServico.message;    

        } else {

            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;

        }

    } else {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;

    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para atualizar registros de um serviço 
app.put('/v1/servico/:id', cors(), jsonParser, async function(request, response) {

    let statusCode;
    let message;
    let headerContentType;

    //recebe o tipo de content-type que foi enviado no header da requisição
    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        
        //recebe do corpo da mensagem o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar o JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {
            
            //recebe o id enviado por parâmetro na requisição
            let id = request.params.id;

            //validação do ID na requisição
            if (id != '' && id != undefined) {

                //adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //import do arquivo da controller de serviço
                const controllerServico = require('./controller/controllerServico.js');
                //chama a função para atualizar um aluno da controller e encaminha os dados do body
                const novoServico = await controllerServico.atualizarServico(dadosBody);

                statusCode = novoServico.status;
                message = novoServico.message; 

            } else {

                statusCode = 400; 
                message = MESSAGE_ERROR.REQUIRED_ID

            }

        } else {

            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;

        }

    } else {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;

    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para excluir um serviço
app.delete('/v1/servico/:id', cors(), jsonParser, async function(request, response) {

    //recebe o id enviado por parâmetro na requisição
    let id = request.params.id;
    let statusCode;
    let message;

    //validação do ID na requisição
    if (id != '' && id != undefined) {

        //import do arquivo da controller de serviço
        const controllerServico = require('./controller/controllerServico.js');
        //chama a função para exlcuir um aluno da controller
        const deleteServico = await controllerServico.excluirServico(id);

        statusCode = deleteServico.status;
        message = deleteServico.message;    

    } else {

        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;

    }

    response.status(statusCode);
    response.json(message);

});

//EnPoint para buscar um serviço pelo ID
app.get('/v1/servico/:id', cors(), async function(request, response) {

    let statusCode;
    let message;
    let id = request.params.id

    //validação do ID na requisição
    if (id != '' && id != undefined) {

        //import do arquivo controllerServico
        const controllerServico = require('./controller/controllerServico.js');

        //retorna todos os alunos existentes no BD
        const dadosServico = await controllerServico.buscarServico(id);

        //valida se existe retorno de dados
        if (dadosServico) {

            //status 200
            statusCode = 200;
            message = dadosServico;

        } else {

            //status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB;

        }

    } else {

        statusCode = 400; 
        message = MESSAGE_ERROR.REQUIRED_ID

    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

/* * * * * * * * * * * * * * * * * * * * *
    rotas para CRUD de contatos (Create, Read, Update e Delete)
    data: 24/11/2022
* * * * * * * * * * * * * * * * * * * * */

// Import da Controller de Contato
const controllerContato = require('./controller/controllerContato.js');

//EndPoint para listar todos os contatos
app.get('/v1/contatos', cors(), async function(request, response) {
    let statusCode
    let message

    //retorna todos os contatos existentes no BD
    const dadosContatos = await controllerContato.getAllContatos()

    //valida se existe retorno de dados
    if (dadosServicos) {
        //status 200
        statusCode = dadosContatos.statusCode
        message = dadosContatos.message
    } else {
        //status 404: não foi encontrado dados no banco
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);
})

//EnPoint para buscar um contato pelo ID
app.get('/v1/contato/:id', cors(), async function(request, response) {
    let statusCode
    let message
    let idContato = request.params.id

    //validação do ID na requisição
    if (idContato != '' && idContato != undefined) {
        //retorna os dados do contato existentes no BD
        const dadosContato = await controllerContato.getContatoByID(idContato)

        //valida se existe retorno de dados
        if (dadosContato) {
            //status 200
            statusCode = dadosContato.statusCode
            message = dadosContato.message

        } else {
            //status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

    } else {
        statusCode = 400; 
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    //retorna os dados da API
    response.status(statusCode)
    response.json(message)
})

app.post('/v1/contato', cors(), jsonParser, async function(request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //recebe o tipo de content-type que foi enviado no header da requisição
    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        
        //recebe do corpo da mensagem o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar o JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //chama a função novo aluno da controller e encaminha os dados do body
            const novoContato = await controllerContato.newContato(dadosBody)

            statusCode = novoServico.status;
            message = novoServico.message;    

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
})

//ativa o servidor para receber requisições HTTP
app.listen(8080, function() {

    console.log('Servidor aguardando requisições...');

});