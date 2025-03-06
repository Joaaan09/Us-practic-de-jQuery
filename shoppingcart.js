$(document).ready(function() {
    // Funció per actualitzar el preu d'un producte
    function actualitzarPreu(input) {
        const fila = $(input).closest('.row');
        const quantitat = parseFloat($(input).val());
        const preu = parseFloat(fila.find('.preu-unitari').text().replace('€', ''));
        const preuTotal = quantitat * preu;
        
        // Actualitzar preu total
        fila.find('.preu-producte').text(preuTotal.toFixed(2) + '€');
        
        // Actualitzar totals del carrito
        actualitzarTotals();
    }

    // Funció per actualitzar els totals del carrito
    function actualitzarTotals() {
        let subtotal = 0;
        
        // Calcular el subtotal
        $('.preu-producte').each(function() {
            subtotal += parseFloat($(this).text().replace('€', ''));
        });

        // Actualitzar el subtotal
        $('.list-group-item:first .text-muted').text(subtotal.toFixed(2) + '€');

        // Calcular el tax (5%)
        const tax = subtotal * 0.05;
        
        // Actualitzar el tax
        $('.list-group-item:nth-child(2) .text-muted').text(tax.toFixed(2) + '€');

        // Calcular el total
        const shipping = 7;
        const total = subtotal + tax + shipping;

        // Actualitzar el total
        $('.list-group-item:last strong').text(total.toFixed(2) + '€');
    }

    // Escoltem per canvis en els inputs de tipus number
    $('input[type="number"]').on('change', function() {
        actualitzarPreu(this);
    });
});