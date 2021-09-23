export default function({ app, redirect, $alert  }) {
  if(JSON.parse(sessionStorage.getItem('usuario'))) {
    if(JSON.parse(sessionStorage.getItem('usuario')).negocios != null){
      return redirect('/negocios/dashboard')
    }
    else{
      $alert.warning("Para tener acceso a esta página primero debes tener a cargo un negocio",
        "Sesión Incorrecta")
    }
  }
}
