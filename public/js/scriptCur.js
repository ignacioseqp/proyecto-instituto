'use strict';

const estado = document.querySelector('.curso-estado');

if (estado.textContent == 'Activo') {
  estado.classList.remove('bg-danger');
  estado.classList.add('bg-success');
}
