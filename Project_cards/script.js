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

    function addStyleButtonEvent(card) {
        const styleBtn = card.querySelector('.card__button--style');
        styleBtn.onclick = function () {
            // Paleta de colores posibles
            const colors = ['#1186fa', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#16a085', '#f39c12'];
            // Elige un color aleatorio diferente al actual
            let currentColor = card.style.backgroundColor || window.getComputedStyle(card).backgroundColor;
            let newColor;
            do {
                newColor = colors[Math.floor(Math.random() * colors.length)];
            } while (newColor === currentColor);
            card.style.backgroundColor = newColor;
        };
    }

    // Añadir botón eliminar y evento de cambiar estilo a las tarjetas existentes
    document.querySelectorAll('.card').forEach(card => {
        addDeleteButton(card);
        addStyleButtonEvent(card);
    });

    // Lógica para agregar nuevas tarjetas
    document.querySelector('.add-card__button').addEventListener('click', function () {
        const cardsContainer = document.querySelector('.cards');
        // Usa la plantilla guardada para crear una nueva tarjeta
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector('.card__header').textContent = 'Nuevo Usuario';
        addDeleteButton(newCard);
        addStyleButtonEvent(newCard);
        cardsContainer.appendChild(newCard);
    });
});