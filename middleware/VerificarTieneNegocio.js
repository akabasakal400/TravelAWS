export default function({ app, redirect, $alert  }) {
  if(JSON.parse(sessionStorage.getItem('usuario'))) {
    if(!JSON.parse(sessionStorage.getItem('usuario')).negocios.length > 0){
      $alert.warning("Para tener acceso a esta página primero debes tener a cargo un negocio",
        "Sesión Incorrecta")
      return redirect('/negocios/login')
    }
  }
  else{
    $alert.warning("Para tener acceso a esta página primero debes iniciar sesión",
      "Sesión Incorrecta")

    return redirect('/negocios/login')
  }
}
