import Swal from "sweetalert2";

export default ({ app }, inject) => {
  const alert = {
    confirm: (message, title = 'Pregunta') => {
      return new Promise((resolve) => {
        Swal.fire({
          title: title,
          text: message,
          showCancelButton: true,
          confirmButtonColor:'#29307F',
          confirmButtonText:'Confirmar',
          cancelButtonColor:'#de1010',
          cancelButtonText:'Cancelar'
        }).then((result)=>{
          if(result.value && resolve){
            resolve();
          }
        })
      })
    },
    input(message, title = 'Ingreso de Datos'){
      return new Promise((resolve) => {
        Swal.fire({
          title: title,
          text: message,
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if(result.value)
            resolve(result.value)
        })
      })
    },
    error(message, title){
      return new Promise((resolve) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: title,
          text: message,
          showConfirmButton: false,
          width: '400px',
          toast: false,
          timer: 2000
        })
      })
    },
    warning(message, title){
      return new Promise((resolve) => {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: title,
          text: message,
          showConfirmButton: false,
          width: '400px',
          toast: false,
          timer: 2000
        })
      })
    },
    exito(message, title){
      return new Promise((resolve) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: title,
          text: message,
          showConfirmButton: false,
          width: '400px',
          toast: false,
          timer: 2000
        })
      })
    },
    registro_exitoso(){
      return new Promise((resolve) => {
        Swal.fire({
          title: '¡Bienvenido a Antigua Travel!',
          text: 'Pronto se te estará enviando a tu correo electrónico información para la activación de ' +
            'tu cuenta de negocio.',
          imageUrl: '/logo-no-texto.png',
          imageHeight: 128,
          imageAlt: 'Successful Registration',
          confirmButtonColor: "#29307F"
        })
      })
    },
  }

  inject('alert',alert)
}
