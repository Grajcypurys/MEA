$(function (){
    
    var $orders = $("#orders");
    var $name = $("#name");
    var $drink = $("#drink");
    
    
    $.ajax({
        type: 'GET',
        url: '/orders',
        success: function (orders) {
            $.each(orders, function (i, order) {
                $orders.append('<li>Name: ' + order.name + ', Drink: ' + order.drink + '</li>');
            });
        },
        error: function () {
            alert('error loading orders');
        }
    });
    
    $('#add-order').on('click', function () {
        
        var order = {
            name: $name.val(),
            drink: $drink.val()
        };
        
        $.ajax({
            type: 'POST',
            url: '/orders',
            data: order,
            success: function () {
                $orders.append('<li>Name: ' + order.name + ', Drink: ' + order.drink + '</li>');
            },
            error: function () {
                alert('error posting');
            }
        });
        
    });
    
});