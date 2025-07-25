document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card').forEach(function(card) {
    // Crear botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'card__button card__button--delete';
    deleteBtn.textContent = 'Eliminar tarjeta';
    deleteBtn.onclick = function() {
          card.remove();
    };
    // Insertar después del botón de cambiar estilos
    const styleBtn = card.querySelector('.card__button--style');
    styleBtn.insertAdjacentElement('afterend', deleteBtn);
});
});