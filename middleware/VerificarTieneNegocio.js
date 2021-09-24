export default function({ app, redirect, $alert, $api  }) {
  if(JSON.parse(sessionStorage.getItem('usuario'))) {
    $api.post('/negocios/usuario',
      { usuarioId: JSON.parse(sessionStorage.getItem('usuario')).id })
      .then( data => {
        if(data.length <= 0){
          $alert.warning("Para tener acceso a esta página primero debes tener a cargo un negocio",
            "Sesión Incorrecta")
          return redirect('/negocios/login')
        }

      } )
  }
  else{
    $alert.warning("Para tener acceso a esta página primero debes iniciar sesión",
      "Sesión Incorrecta")

    return redirect('/negocios/login')
  }
}
