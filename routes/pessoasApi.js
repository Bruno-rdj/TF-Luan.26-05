import { Router } from 'express';
import ListPessoaApiController from '../app/Controller/PessoaApi/ListPessoaApiController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/api/pessoas', ListPessoaApiController);

    return router;

})();