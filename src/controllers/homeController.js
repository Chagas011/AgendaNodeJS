const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contato = new Contato(req.body);
    const contatos = await contato.buscaContatos();
    res.render('index', {contatos});
    return;
  };
 