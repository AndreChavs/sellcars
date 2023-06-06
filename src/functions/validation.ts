interface LoginTypes {
  password?: string;
  email?: string;
}

interface RegisterTypes {
  password?: string;
  email?: string;
  firstname?:string;
  lastname?:string;
  cpassword?:string;
}


export const loginValidation = (values:LoginTypes) => {
  const errors: LoginTypes = {}
  if (!values.password) {    
    errors.password = '*'
  } else if (values.password.length < 5) {
    errors.password = 'no mínimo 8 caracteres'
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalide password'
  }

  if (!values.email) {
    errors.email = '*'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email de endereço inválido'
  }
  return errors
}

export const registerValidation = (values:RegisterTypes) => {
  const errors:RegisterTypes = {}
  if (!values.firstname) {
    errors.firstname = '*'
  } else if (values.firstname.length < 3) {
    errors.firstname = 'no mínimo 3 caracteres'
  }

  if (!values.lastname) {
    errors.lastname = '*'
  } else if (values.lastname.length < 3) {
    errors.lastname = 'no mínimo 3 caracteres'
  }

  if (!values.email) {
    errors.email = '*'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email de endereço inválido'
  }

  if (!values.password) {
    errors.password = '*'
  } else if (values.password.length < 8) {
    errors.password = 'no mínimo 8 caracteres'
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalide password'
  }

  if (!values.cpassword) {
    errors.cpassword = '*'
  } else if (values.cpassword.length < 8) {
    errors.cpassword = 'no mínimo 8 caracteres'
  } else if (values.cpassword.includes(' ')) {
    errors.cpassword = 'Invalide password'
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'confirmação de senha inválida'
  }

  return errors
}
