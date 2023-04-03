import validator from "validator";

export default class Contato { 
    constructor(formClass) {
        this.formContato = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() { 
        if(!this.formContato) return; 
        this.formContato.addEventListener('submit', e => { 
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) { 
        const el = e.target;
        const nome = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefone = el.querySelector('input[name="telefone"]');
        
        let error = false;

        for(let errorText of this.formContato.querySelectorAll('.text-danger')){
            errorText.remove();
        }

        if(!nome.value){ 
            this.fieldError(nome, 'Este campo nao pode estar vazio');
            error = true;
        }

        if(!emailInput.value && !telefone.value){ 
            this.fieldError(emailInput, 'Pelo menos um tipo de contato é necessario');
            this.fieldError(telefone, 'Pelo menos um tipo de contato é necessario');
        
        if(!telefone.value && emailInput.value){
            if(!validator.isEmail(emailInput.value)){ 
                this.fieldError(emailInput, 'Email invalido');
            }
        }
            error = true;
        }
        
        if(!error) el.submit();
    }

    fieldError(campo, msg) { 
        const divELement = document.createElement('div');
        divELement.innerHTML = msg;
        divELement.classList.add('text-danger');
        campo.insertAdjacentElement('afterend', divELement);
    }
}