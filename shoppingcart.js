$(document).ready(function () {
    // Funció per actualitzar el preu d'un producte
    function actualitzarPreu(input) {
        const fila = $(input).closest('.row');
        const quantitat = parseFloat($(input).val());
        const preu = parseFloat(fila.find('.preu-unitari').text().replace('€', ''));
        const preuTotal = quantitat * preu;

        // Actualitzar preu total
        fila.find('.preu-producte').text(preuTotal.toFixed(0) + '€');

        // Actualitzar totals del carrito
        actualitzarTotals();
    }

    // Funció per actualitzar els totals del carrito
    function actualitzarTotals() {
        let subtotal = 0;

        // Calcular el subtotal
        $('.preu-producte').each(function () {
            subtotal += parseFloat($(this).text().replace('€', ''));
        });

        // Actualitzar el subtotal
        $('.list-group-item:first .text-muted').text(subtotal.toFixed(0) + '€');

        // Calcular el tax (5%)
        const tax = subtotal * 0.05;

        // Calcular el total
        const shipping = 7;
        const total = subtotal + tax + shipping;

        // Actualitzar el total
        $('.list-group-item:last strong').text(total.toFixed(2) + '€');
    }

    // Escoltem per canvis en els inputs de tipus number
    $('input[type="number"]').on('change', function () {
        actualitzarPreu(this);
    });


    //Funció per esborrar el producte
    function borrarProducte() {
        // Agafem el número de productes actual
        let numProductes = parseInt($('.badge-secondary').text());

        // Borrem la fila del producte amb efecte slideUp
        $(this).closest('.row').slideUp(400, function () {
            $(this).remove();
            // Actualitzem el contador
            numProductes--;
            $('.badge-secondary').text(numProductes);
            // Actualitzem els totals
            actualitzarTotals();
        });
    }

    // Escoltem per clics en els botons de borrar
    $('.btn-outline-danger').on('click', borrarProducte);

    // Variable per controlar si el descompte està aplicat
    let promoAplicat = false;

    // Funció per gestionar el codi promocional
    function gestionarCodiPromocional() {
        const codiEntrat = $('input[type="text"]').val();
        const filaPromo = $('.no-apply');

        if (codiEntrat == 'PROMO1000' && !promoAplicat) {
            // Mostrar fila de promo amb efecte slideDown
            filaPromo.slideDown(400);
            promoAplicat = true;

            // Actualitzar totals amb descompte
            actualitzarTotalsAmbDescompte();
        } else if (codiEntrat == 'PROMO1000' && promoAplicat) {
            // No fer res si el mateix codi ja està aplicat
            $('input[type="text"]').val('');
        } else if (promoAplicat) {
            // Si el codi és incorrecte i ja hi havia un descompte, eliminar-lo
            filaPromo.slideUp(400);
            promoAplicat = false;
            actualitzarTotals();
        }

        // Netejar l'input
        $('input[type="text"]').val('');
    }

    // Funció per actualitzar totals amb descompte
    function actualitzarTotalsAmbDescompte() {
        let subtotal = 0;

        // Calcular subtotal
        $('.preu-producte').each(function () {
            subtotal += parseFloat($(this).text().replace('€', ''));
        });

        // Aplicar descompte de 5€
        const descompte = 5;
        const subtotalAmbDescompte = subtotal - descompte;

        // Actualitzar subtotal
        $('.list-group-item:first .text-muted').text(subtotalAmbDescompte.toFixed(2) + '€');

        // Calcular IVA (5%)
        const iva = subtotalAmbDescompte * 0.05;

        // Calcular total
        const enviament = 7;
        const total = subtotalAmbDescompte + iva + enviament;

        // Actualitzar total
        $('.list-group-item:last strong').text(total.toFixed(2) + '€');
    }

    // Escoltar el clic al botó 
    $('.btn-secondary').on('click', gestionarCodiPromocional);

    // Funció per mostrar el resum de la compra al modal
    function mostrarResumCompra() {
        // Obtenir els valors actuals
        const subtotal = $('.list-group-item:first .text-muted').text();
        const tax = $('.list-group-item:nth-child(2) .text-muted').text();
        const shipping = $('.list-group-item:nth-child(3) .text-muted').text();
        const total = $('.list-group-item:last strong').text();

        // Si no hi han productes no es pordà accedir al apartat de compra
        if (subtotal == "0€") {
            alert("No hi han productes per comprar");
        } else {

            // Crear el contingut HTML pel modal
            let contingutModal = `
            <p><strong>Resum de la seva compra:</strong></p>
            <p>Subtotal: ${subtotal}</p>
            <p>IVA (${tax}): ${parseFloat(subtotal) * 0.05}€</p>
            <p>Enviament: ${shipping}</p>
        `;

            // Afegir línia de descompte si està aplicat
            if (promoAplicat) {
                contingutModal += `<p class="text-success">Descompte aplicat: -5€</p>`;
            }

            contingutModal += `<p><strong>Total: ${total}</strong></p>`;

            // Actualitzar el contingut del modal
            $('.modal-body').html(contingutModal);

            // Mostrar el modal
            $('#payment_modal').modal('show');
        }
    }

    // Escoltar el clic 
    $('.btn-success').on('click', mostrarResumCompra);


});