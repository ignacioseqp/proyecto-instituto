'use strict';

//INSTRUCTORES
const formInstr = document.querySelector('.formulario-instr');
const contFormInstr = document.querySelector('.cont-formulario-instructor');
const btnGuardar = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnActualizar = document.getElementById('actInstructor');
const checkEstado = document.getElementById('switch');
const checkLabel = document.querySelector('.form-check-label');

//Instructor Datos Vista
const ideInstr = document.getElementById('ide').textContent;
const nombresInstr = document.getElementById('nombres').textContent;
const apellidosInstr = document.getElementById('apellidos').textContent;
const profTitInstr = document.getElementById('profTitulo').textContent;
const cursosInstr = document.getElementById('cursos').textContent;
const domicilioInstr = document.getElementById('domicilio').textContent;
const telefonoInstr = document.getElementById('telefono').textContent;
const emailInstr = document.getElementById('email').textContent;

//Instructor Datos Formulario
const nombresForm = document.getElementById('instrNombres');
const apellidosForm = document.getElementById('instrApellidos');
const profTitForm = document.getElementById('instrProfTit');
const cursosForm = document.getElementById('instrCursos');
const domicilioForm = document.getElementById('instrDomicilio');
const telefonoForm = document.getElementById('instrTelefono');
const emailForm = document.getElementById('instrEmail');

let estadoInstr;

nombresForm.value = nombresInstr;
apellidosForm.value = apellidosInstr;
profTitForm.value = profTitInstr;
cursosForm.value = cursosInstr;
domicilioForm.value = domicilioInstr;
telefonoForm.value = telefonoInstr;
emailForm.value = emailInstr;

checkEstado.addEventListener('click', function () {
  if (checkLabel.textContent == 'Inactivo') {
    estadoInstr = true;
    checkLabel.textContent = 'Activo';
  } else {
    estadoInstr = false;
    checkLabel.textContent = 'Inactivo';
  }
});
btnGuardar.addEventListener('click', async function () {
  console.log('Hola');
  await actualizarInstr();
  window.location.reload();
});
btnActualizar.addEventListener('click', function () {
  contFormInstr.classList.toggle('d-none');
  emailForm.scrollIntoView(true, {
    behavior: 'smooth',
  });
  nombresForm.focus();
});
btnCancelar.addEventListener('click', function () {
  contFormInstr.classList.add('d-none');
});

const actualizarInstr = async function () {
  try {
    // construir el objeto
    let data = {
      estado: estadoInstr,
      apellidos: apellidosForm.value,
      nombres: nombresForm.value,
      cursos: [cursosForm.value],
      profTitulo: profTitForm.value,
      email: emailForm.value,
      domicilio: domicilioForm.value,
      telefono: telefonoForm.value,
    };
    console.log(data);
    let response = await fetch(`/instructores/${ideInstr}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'x-token': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  // location.reload();
};
