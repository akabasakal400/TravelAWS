export default function({ app, redirect, $alert  }) {
  if(!JSON.parse(sessionStorage.getItem('usuario'))){

    $alert.warning("Para tener acceso a esta página primero debes iniciar sesión",
      "Sesión Incorrecta")

    return redirect('/')

  }
}
