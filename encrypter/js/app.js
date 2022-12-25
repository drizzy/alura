
/* Ocultar la etiqueta label al hacer click en el textarea */
(

  dom = () => {

    /* Etiqueta <textarea> */
    const textarea = document.getElementById('text-encrypt');

    /* Etiqueta <label> */
    const label = document.querySelector('.encrypter-textarea_label');

    /* Al hacer click en el textarea ocultara la etiqueta <label> */
    textarea.addEventListener('focus', () => {
      label.style.display = 'none';
    });

    /* Al hacer click fuera del textarea mostrara la etiqueta <label> de nuevo*/
    textarea.addEventListener('blur', (event) => {
      if (!textarea.contains(event.currentTarget) || !textarea.value) {
        label.style.display = 'block';
      }
    })

  }

)();


/* Encriptar texto cambiando las vocales: a, e, i, o, u, por: ai, enter, ime, ober, ufat */
(

  encrypt = () => {

    /* <Button> encriptar */
    const encrypt = document.getElementById('btn-encrypt');

    /* <Aside> */
    const aside = document.querySelector('.encrypter_aside');

    /* <div> donde esta la Imagen y mensaje por default */
    const asieRemove = document.querySelector('.encrypter-aside_info');

    /* <div> donde se creara el button de copiar */
    const asideButton = document.querySelector('.encrypter-aside_button');

    /* Crando una etiqueta <p> donde se implementara el resultado de la encriptacion */
    const result = document.createElement('p');

          /* Agregandole un id a la etiqueta creada recientemente para trabajar con ese id mas adelante*/
          result.setAttribute('id', 'result');

          /* Agrgandole una clase que ya esta definidad en el file main.css con estilos personalizados */
          result.classList.add('encrypter-aside_result');

          /* Agregando la etiqueta <p> al elemento <aside> */
          aside.appendChild(result);
          
   /* Creando la etiqueta <button> que funcionara para copiar el resultado */
   const  button = document.createElement('button');

         /* Agregandole un id a la etiqueta creada recientemente para trabajar con ese id mas adelante*/
          button.setAttribute('id', 'btn-copy');

          /* Agrgandole una clase que ya esta definidad en el file main.css con estilos personalizados */
          button.classList.add('encrypter-aside-button_copy');

          /* El texto que mostrara el <button> */
          button.textContent = 'Copiar';

           /* Agregando la etiqueta <button> al <div> encrypter-aside_button */
          asideButton.appendChild(button);

          /* El <button< permanecera oculto hasta que se haga click en el <button> de encriptar */
          button.style.display = 'none'
    
    /* Evento al hacer click en el <button> encriptar */
    encrypt.addEventListener('click', () => {

      /* Captura de los datos ingresado en el <textarea> */
      const text = document.getElementById('text-encrypt').value;

      /* Mensaje de advertencia */
      const warning = document.getElementById('warning');
    
      /* Validar que el textarea no este vacio, que no contenga caracteres y que no contenga letras mayusculas */
      if ( !/^[a-z]\s*[a-z\s]*$/.test(text) ) {

        /* Eliminar el color gris de advertencia */
        warning.classList.remove('encrypter-priority-warning_p');

        /* Agregarle una nueva clase con un color rojo */
        warning.classList.add('warning');

        /* Despues de 3 segundos volver agregarle los estilos anteriores */
        setTimeout( () => {

          /* Remover la clase warning con el color rojo */
          warning.classList.remove('warning');

          /* Agregar la clase por default con el color gris */
          warning.classList.add('encrypter-priority-warning_p');

        }, 3000)

        return;
      }
      
      /* Variable para guardar las palabras claves de encriptacion */
      let encryptedText = "";

      /* Recorrer el texto del textarea y cambiar las vocales por las palabras claves de encriptacion */
      for (let i = 0; i < text.length; i++) {
          if (text[i] === "a") {
              encryptedText += "ai";
          } else if (text[i] === "e") {
              encryptedText += "enter";
          } else if (text[i] === "i") {
              encryptedText += "ime";
          } else if (text[i] === "o") {
              encryptedText += "ober";
          } else if (text[i] === "u") {
              encryptedText += "ufat";
          } else {
              encryptedText += text[i];
          }
      }
  
      /* Comprobar si exite el mensaje que esta por default, en caso de que si, lo eliminara */
      if (asieRemove) {
        asieRemove.remove();
      }

      /* Habilitar el button copiar */
      button.style.display = 'block';

      /* Guardar el resultado de la encriptacion en la etiqueta <p> creada anteriormente */
      result.textContent = encryptedText;

    });

  }

)();


/* Desencriptar texto cambiando las palabras: ai, enter, ime, ober, ufat, por: a, e, i, o, u */
(

  decrypt = () => {

    /* <button> desencriptar */
    const decrypt = document.getElementById('btn-decrypt');

    /* <div> donde esta la Imagen y mensaje por default */
    const asieRemove = document.querySelector('.encrypter-aside_info');


    /* Creando la etiqueta <button> que funcionara para copiar el resultado */
    const  button = document.getElementById('btn-copy');

    /* Evento al hacer click en el <button> desencriptar */
    decrypt.addEventListener('click', () => {

      /* Captura de los datos ingresado en el <textarea> */
      const result = document.getElementById('text-encrypt').value;

      /* Guardar el resultado final de la desencriptacion */
      const value = document.getElementById('result');

      /* Mensaje de advertencia */
      const warning = document.getElementById('warning');
       
      /* Validar que el textarea no este vacio, que no contenga caracteres y que no contenga letras mayusculas */
      if ( !/^[a-z]\s*[a-z\s]*$/.test(result) ) {

        /* Eliminar el color gris de advertencia */
        warning.classList.remove('encrypter-priority-warning_p');

        /* Agregarle una nueva clase con un color rojo */
        warning.classList.add('warning');

        /* Despues de 3 segundos volver agregarle los estilos anteriores */
        setTimeout( () => {

          /* Remover la clase warning con el color rojo  */
          warning.classList.remove('warning');

          /* Agregar la clase por default con el color gris */
          warning.classList.add('encrypter-priority-warning_p');

        }, 3000)

        return;
      }

      /* Variable para guardar el texto desencriptado */
      let text = '';

      /* Recorrer el texto del textarea y cambiar las palabras claves de encriptacion  por las vocales */
      for (let i = 0; i < result.length; i++) {
          if (result.substring(i, i + 2) === 'ai') {
              text += 'a';
              i++;
          } else if (result.substring(i, i + 5) === 'enter') {
              text += 'e';
              i += 4;
          } else if (result.substring(i, i + 3) === 'ime') {
              text += 'i';
              i += 2;
          } else if (result.substring(i, i + 4) === 'ober') {
              text += 'o';
              i += 3;
          } else if (result.substring(i, i + 4) === 'ufat') {
              text += 'u';
              i += 3;
          } else {
              text += result[i];
          }
      }

      /* Comprobar si exite el mensaje que esta por default, en caso de que si, lo eliminara */
      if (asieRemove) {
        asieRemove.remove();
      }

      /* Habilitar el button copiar */
      button.style.display = 'block';

      /* Guardar el resultado de la desencriptacion en la etiqueta <p>*/
      value.textContent = text;

    });

  }
  
)();


/* Copiar el resultado del texto encryptado o desencriptado*/
(

  copy = () => {

    /* <button> copiar */
    const copy = document.getElementById('btn-copy');

    /* <aside> */
    const aside = document.querySelector('.encrypter_aside');

    /* creando un elemento <div> para crear la notificacion o mensaje de texto copiado*/
    const message = document.createElement('div');

          /* Agregandole una clase ya definidad con estilos en el file main.css */
          message.classList.add('message');

          /* Mensaje de la notificacion */
          message.textContent = 'texto copiado en el porta papeles';

          /* Agregando la etiqueta <div> en el aside */
          aside.appendChild(message);

    /* Evento al hacer click en el <button> copiar  */
    copy.addEventListener('click', () => {

      /* Etiqueta donde esta el resltado de la encriptacion o desencriptacion */
      const result = document.getElementById('result');
      
      /* Copiar el texto en el porta papeles */
      navigator.clipboard.writeText(result.textContent).then( () => {

        /* Despues de 1 milisegundo agregara la clase visible */
        setTimeout( () => {

          /* Agregando la clase visible con estilos ya definidos en el file main.css */
          message.classList.add('visible');

        }, 100);
                
        /* Despues de 3 segundos removera la clase visible */
        setTimeout( () => {

          /* Removiendo la clase visible con estilos ya definidos en el file main.css */
          message.classList.remove('visible');

        }, 2000);

      });

    });

  }

)();


/* Dark Mode / modo oscuro */
(

  darkMode = () => {

    /* <button> dark  */
    const dark = document.getElementById('btn-dark');

    /* Icono svg de la luna */
    const sun = 'assets/svg/sun.svg';

    /* Icono svg del sol */
    const moon = 'assets/svg/moon.svg';

    /* Evento al hacer click en el svg del sol o la luna */
    dark.addEventListener('click', () => {

      /* Agraga la clase dark */
      document.body.classList.toggle('dark');

      /* Agrega la clase active */
      dark.classList.toggle('active');
        
      /* Comprobar si existe la clase dark en el body */
      if (document.body.classList.contains('dark')) {
        
        /* Guardando los datos en el localstorage */
        localStorage.setItem('dark-mode', 'true');

        /* Cambiar el icono a el sol */
        dark.src = sun;

      }else {

        /* Guardando los datos en el localstorage */
        localStorage.setItem('dark-mode', 'false');

        /* Cambiar el icono a la luna */
        dark.src = moon;

      }
     
    });
    
    /* Comprabar si dark-mode es verdadero para activar el modo-dark */
    if (localStorage.getItem('dark-mode') === 'true') {

      /* Agregando la clase dark */
      document.body.classList.add('dark');
      
      /* Agregando el estado activo */
      dark.classList.add('active');

       /* Cambiar el icono a la luna */
       dark.src = sun;
           
    }else {
      
      /* Removiendo la clase dark*/
      document.body.classList.remove('dark');
      
      /* Removiendo el estado activo */
      dark.classList.remove('active');
      
       /* Cambiar el icono a la luna */
       dark.src = moon;
      
    }
  
  }

)();