const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true},
  sobrenome: { type: String, required: false, default: ''},
  email: { type: String, required: false, default: ''},
  telefone: { type: String, required: false, default: ''},
  criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {

  constructor(body){ 
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() { 
    this.valida();
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
  }


  valida() { 
    this.cleanUp();
    // validacao dos campos
    // o email precisa ser valido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
    if(!this.body.nome) this.errors.push('Nome é um Campo obrigatorio');
    if(!this.body.email && !this.body.telefone){ 
      this.errors.push('Pelo menos um tipo de contato é necessario');
    }

  }

  // garantindo que todos os dados do formulario tenha tipo string 
  cleanUp() { 
    for(const key in this.body){ 
      if(typeof this.body[key] !== 'string') { 
        this.body[key] = '';
      }
    }
    // garantindo que o objeto body so tenha os campos corretos do formulario
    this.body = { 
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone
    };
  }
  async contatoId(id){ 
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id); 
    return user;
  }

  async buscaContatos(){ 
    const contatos = await ContatoModel.find().sort({criadoEm: -1}); 
    return contatos;
  }

  async edit(id) { 
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato =  await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
  }

  async delete(id) { 
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id:id}); 
    return contato;
  }
  
}

module.exports = Contato;