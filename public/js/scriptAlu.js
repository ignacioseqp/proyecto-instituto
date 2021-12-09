'use strict';

//ALUMNOS
const formAlu = document.querySelector('.formulario-alu');
const contFormAlu = document.querySelector('.cont-formulario-alumno');
const btnGuardar = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnActualizar = document.getElementById('actAlumno');
const checkEstado = document.getElementById('switch');
const checkLabel = document.querySelector('.form-check-label');

//Alumno Datos Vista
const ideAlu = document.getElementById('ide').textContent;
const nombresAlu = document.getElementById('nombres').textContent;
const apellidosAlu = document.getElementById('apellidos').textContent;
const docTipoAlu = document.getElementById('docTipo').textContent;
const docNroAlu = document.getElementById('docNro').textContent;
const cursosAlu = document.getElementById('cursos').textContent;
const domicilioAlu = document.getElementById('domicilio').textContent;
const telefonoAlu = document.getElementById('telefono').textContent;
const emailAlu = document.getElementById('email').textContent;

//Alumno Datos Formulario
const nombresForm = document.getElementById('aluNombres');
const apellidosForm = document.getElementById('aluApellidos');
const docTipoForm = document.getElementById('documentoTipo');
const docNroForm = document.getElementById('documentoNro');
const cursosForm = document.getElementById('aluCursos');
const domicilioForm = document.getElementById('aluDomicilio');
const telefonoForm = document.getElementById('aluTelefono');
const emailForm = document.getElementById('aluEmail');

let estadoAlu;

nombresForm.value = nombresAlu;
apellidosForm.value = apellidosAlu;
docTipoForm.value = docTipoAlu;
docNroForm.value = docNroAlu;
cursosForm.value = cursosAlu;
domicilioForm.value = domicilioAlu;
telefonoForm.value = telefonoAlu;
emailForm.value = emailAlu;

checkEstado.addEventListener('click', function () {
  if (checkLabel.textContent == 'Inactivo') {
    estadoAlu = true;
    checkLabel.textContent = 'Activo';
  } else {
    estadoAlu = false;
    checkLabel.textContent = 'Inactivo';
  }
});
btnGuardar.addEventListener('click', async function () {
  console.log('Hola');
  await actualizarAlu();
  window.location.reload();
});
btnActualizar.addEventListener('click', function () {
  contFormAlu.classList.toggle('d-none');
  emailForm.scrollIntoView(true, {
    behavior: 'smooth',
  });
  nombresForm.focus();
});
btnCancelar.addEventListener('click', function () {
  contFormAlu.classList.add('d-none');
});

const actualizarAlu = async function () {
  try {
    // construir el objeto
    let data = {
      estado: estadoAlu,
      apellidos: apellidosForm.value,
      nombres: nombresForm.value,
      documentoTipo: docTipoForm.value,
      documentoNro: docNroForm.value,
      cursos: [cursosForm.value],
      email: emailForm.value,
      domicilio: domicilioForm.value,
      telefono: telefonoForm.value,
    };
    console.log(data);
    let response = await fetch(`/alumnos/${ideAlu}`, {
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
