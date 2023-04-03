const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel'); 

exports.index = (req, res) => { 
    res.render('contato', { 
        contat: {}
    });
}

exports.register = async (req, res) => { 

try {
    
    const contato = new Contato(req.body);
    await contato.register();

    if(contato.errors.length > 0 ){ 
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    }

    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(function(){ 
        return res.redirect(`/contato/index/${contato.contato._id}`);
    });

} catch (e) {
    console.log(e);
    return res.render('404');
}

}

exports.editContato = async (req, res) => { 
    const contato = new Contato(req.body);
    if(!req.params.id) return res.render('404');
    const contat = await contato.contatoId(req.params.id);
    if(!contat) return res.render('404');

    res.render('contato', {contat});
}

exports.edit = async(req, res) => { 
    try {
        
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if(contato.errors.length > 0 ){ 
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    }

    req.flash('success', 'Contato atualizado com sucesso');
    req.session.save(function(){ 
        return res.redirect(`/contato/index/${contato.contato._id}`);
    });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
    

}


exports.delete = async (req, res) => { 
    const contato = new Contato(req.body);
    if(!req.params.id) return res.render('404');
    const contatoDeletado = await contato.delete(req.params.id);
    if(!contatoDeletado) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso');
    req.session.save(() => res.redirect(req.get('referer')));;
    return;

}