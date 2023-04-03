const mongoose = require('mongoose');
const validator = require('validator');
const bcriptyjs = require('bcryptjs');
const { use } = require('../../routes');

// configurando o model da base de dados 
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }

});

// retorna uma promese
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) { 
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login(){ 
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(!this.user){ 
      this.errors.push('Usuario não existe');
      return;
    }
    if(!bcriptyjs.compareSync(this.body.password, this.user.password)){ 
      this.errors.push('Senha incorreta');
      this.user = null;
      return;
    }
  }


  async register(){ 
    this.valida();
    if(this.errors.length > 0) return;

    await this.userExists();
    if(this.errors.length > 0) return;
    const salt = bcriptyjs.genSaltSync();
    this.body.password = bcriptyjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
 
  }


  async userExists(){ 
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push('Usuario ja existe');
  }
  
  valida(){ 
    this.cleanUp();
    // validacao dos campos
    // o email precisa ser valido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
    // a senha precisa ter entre 3 e 50
    if(this.body.password.length < 3 || this.body.password.length > 50){
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
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
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;