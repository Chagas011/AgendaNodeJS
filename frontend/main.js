import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/validaLogin';
import Contato from './modules/ValidaContato';
import './assets/css/style.css';

// validando o front end dos formularios 

// form Login/Cadastro
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();


// Form Contato
const contatoRegister = new Contato('.form-contatoRegister');
contatoRegister.init();

const contatoEdit = new Contato('.form-contatoEdit');
contatoEdit.init();
