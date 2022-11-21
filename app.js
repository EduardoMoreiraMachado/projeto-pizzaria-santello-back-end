/******************************************************************************************
* Objetivo: API responsável pela manipulação de dados do back-end (get, post, put e delete)
* Autor: Eduardo Moreira Machado
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

//ativa o servidor para receber requisições HTTP
app.listen(8080, function() {

    console.log('Servidor aguardando requisições...');

});