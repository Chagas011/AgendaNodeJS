import validator from "validator";

export default class Login  { 
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init(){ 
        this.events();
    }

    events() { 
        if(!this.form) return;
        this.form.addEventListener('submit', e => { 
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) { 
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        for(let errorText of this.form.querySelectorAll('.text-danger')){
            errorText.remove();
        }

        if(!validator.isEmail(emailInput.value)){ 
            this.fieldError(emailInput, 'Email invalido');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){ 
            this.fieldError(passwordInput, 'Sua senha precisa ter entre 3 e 50 caracteres');
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