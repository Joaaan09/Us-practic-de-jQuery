$(document).ready(function() {
    // Funció per actualitzar el preu d'un producte
    function updatePrice(input) {
        const row = $(input).closest('.row');
        const quantity = ($(input).val());
        const unitPrice = (row.find('.preu-unitari').text().replace('€', ''));
        const totalPrice = quantity * unitPrice;
        
        // Actualitzar preu total
        row.find('.preu-producte').text(totalPrice + '€');
        
        // Actualitzar totals del carrito
        updateCartTotals();
    }

    // Funció per actualitzar els totals del carrito
    function updateCartTotals() {
        let subtotal = 0;
        
        // Calcular el subtotal
        $('.preu-producte').each(function() {
            subtotal += ($(this).text().replace('€', ''));
        });

        // Actualitzar el subtotal
        $('.list-group-item:first .text-muted').text(subtotal + '€');

        // Calcular el tax (5%)
        const tax = subtotal * 0.05;
        
        // Actualutzar el tax
        const shipping = 7;

        // Calcular el total
        const total = subtotal + tax + shipping;

        // Actualitzar el total
        $('.list-group-item:last strong').text(total.toFixed(0) + '€');
    }

    // Escoltem per canvis en els inputs de tipus number
    $('input[type="number"]').on('change', function() {
        updatePrice(this);
    });
});