document.addEventListener('DOMContentLoaded', function () {
    let draggedBox = null;

    // Permite activar/desactivar el arrastre de una caja
    function setBoxDraggable(box, enable) {
        box.draggable = enable;
        box.style.cursor = enable ? 'grab' : 'default';
    }

    // Añade los eventos de drag & drop a una caja
    function addDragEvents(box) {
        box.addEventListener('dragstart', function (e) {
            draggedBox = box;
            setTimeout(() => box.style.display = 'none', 0);
        });
        box.addEventListener('dragend', function (e) {
            box.style.display = '';
        });
    }

    // Inicializar drag para todas las cajas al cargar la página
    document.querySelectorAll('.box').forEach(box => {
        setBoxDraggable(box, true);
        addDragEvents(box);
    });

    // Eventos para los huecos del almacén (slots)
    document.querySelectorAll('.warehouse__slot').forEach(slot => {
        // Permite arrastrar una caja sobre el hueco si está libre
        slot.addEventListener('dragover', function (e) {
            e.preventDefault();
            if (!slot.classList.contains('occupied')) {
                slot.style.boxShadow = '0 0 12px #1186fa';
            }
        });
        // Quita el efecto visual al salir del hueco
        slot.addEventListener('dragleave', function (e) {
            slot.style.boxShadow = '';
        });
        // Al soltar la caja en el hueco, la coloca si está libre
        slot.addEventListener('drop', function (e) {
            e.preventDefault();
            slot.style.boxShadow = '';
            if (!slot.classList.contains('occupied') && draggedBox) {
                // Si el slot ya tiene una caja, no permitir
                if (slot.querySelector('.box')) return;
                slot.appendChild(draggedBox);
                slot.classList.add('occupied');
                setBoxDraggable(draggedBox, true); // Permitir mover la caja nuevamente
                draggedBox = null;
                checkBoxesLeft();
            }
        });
    });

    // Permitir mover cajas desde el almacén a otro hueco
    document.querySelectorAll('.warehouse__slot').forEach(slot => {
        slot.addEventListener('dragstart', function (e) {
            // Si el slot tiene una caja, la prepara para mover
            const box = slot.querySelector('.box');
            if (box) {
                draggedBox = box;
                setTimeout(() => box.style.display = 'none', 0);
                slot.classList.remove('occupied');
            }
        });
    });

    // Verifica si quedan cajas fuera del almacén y muestra alerta si no hay más
    function checkBoxesLeft() {
        const boxesLeft = document.querySelectorAll('.warehouse__boxes .box').length;
        if (boxesLeft === 0) {
            setTimeout(() => alert('¡No hay más cajas que mover!'), 200);
        }
    }
});
