document.addEventListener('DOMContentLoaded', function () {
    // Guarda una plantilla de tarjeta al cargar la página
    const firstCard = document.querySelector('.card');
    const cardTemplate = firstCard.cloneNode(true);

    function addDeleteButton(card) {
        // Elimina cualquier botón de eliminar previo para evitar duplicados
        const oldDelete = card.querySelector('.card__button--delete');
        if (oldDelete) oldDelete.remove();

        // Crear botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'card__button card__button--delete';
        deleteBtn.textContent = 'Eliminar tarjeta';
        deleteBtn.onclick = function () {
            card.remove();
        };
        // Insertar después del botón de cambiar estilos
        const styleBtn = card.querySelector('.card__button--style');
        styleBtn.insertAdjacentElement('afterend', deleteBtn);
    }

    // Añadir botón eliminar a las tarjetas existentes
    document.querySelectorAll('.card').forEach(addDeleteButton);

    // Lógica para agregar nuevas tarjetas
    document.querySelector('.add-card__button').addEventListener('click', function () {
        const cardsContainer = document.querySelector('.cards');
        // Usa la plantilla guardada para crear una nueva tarjeta
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector('.card__header').textContent = 'Nuevo Usuario';
        addDeleteButton(newCard);
        cardsContainer.appendChild(newCard);
    });
});