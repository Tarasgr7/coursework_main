// Коли HTML-документ готовий (намальований)
$(document).ready(function () {
    // Беремо в змінну елемент розмітки з id jq-notification для сповіщень від ajax
    var successMessage = $("#jq-notification");

    // Ловимо подію кліку по кнопці додати до кошика
    $(document).on("click", ".add-to-cart", function (e) {
        // Блокуємо її базову дію
        e.preventDefault();

        // Беремо елемент лічильника в значку кошика і беремо звідти значення
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // Отримуємо id товару з атрибута data-product-id
        var product_id = $(this).data("product-id");

        // З атрибута href беремо посилання на контролер django
        var add_to_cart_url = $(this).attr("href");

        // Робимо POST-запит через ajax без перезавантаження сторінки
        $.ajax({
            type: "POST",
            url: add_to_cart_url,
            data: {
                product_id: product_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Повідомлення
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // Через 7 сек. прибираємо повідомлення
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Збільшуємо кількість товарів у кошику (відображення в шаблоні)
                cartCount++;
                goodsInCartCount.text(cartCount);

                // Змінюємо вміст кошика на відповідь від django (новий намальований фрагмент розмітки кошика)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Помилка при додаванні товару до кошика");
            },
        });
    });

    // Ловимо подію кліку по кнопці видалити товар з кошика
    $(document).on("click", ".remove-from-cart", function (e) {
        // Блокуємо її базову дію
        e.preventDefault();

        // Беремо елемент лічильника в значку кошика і беремо звідти значення
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // Отримуємо id кошика з атрибута data-cart-id
        var cart_id = $(this).data("cart-id");
        // З атрибута href беремо посилання на контролер django
        var remove_from_cart = $(this).attr("href");

        // Робимо POST-запит через ajax без перезавантаження сторінки
        $.ajax({
            type: "POST",
            url: remove_from_cart,
            data: {
                cart_id: cart_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Повідомлення
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // Через 7 сек. прибираємо повідомлення
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Зменшуємо кількість товарів у кошику (відображення)
                cartCount -= data.quantity_deleted;
                goodsInCartCount.text(cartCount);

                // Змінюємо вміст кошика на відповідь від django (новий намальований фрагмент розмітки кошика)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Помилка при видаленні товару з кошика");
            },
        });
    });

    // Обробка + та - кількості товару
    $(document).on("click", ".decrement", function () {
        var url = $(this).data("cart-change-url");
        var cartID = $(this).data("cart-id");
        var $input = $(this).closest('.input-group').find('.number');
        var currentValue = parseInt($input.val());
        if (currentValue > 1) {
            $input.val(currentValue - 1);
            updateCart(cartID, currentValue - 1, -1, url);
        }
    });

    // Обробник події для збільшення значення
    $(document).on("click", ".increment", function () {
        var url = $(this).data("cart-change-url");
        var cartID = $(this).data("cart-id");
        var $input = $(this).closest('.input-group').find('.number');
        var currentValue = parseInt($input.val());
        $input.val(currentValue + 1);
        updateCart(cartID, currentValue + 1, 1, url);
    });

    function updateCart(cartID, quantity, change, url) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                cart_id: cartID,
                quantity: quantity,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                var goodsInCartCount = $("#goods-in-cart-count");
                var cartCount = parseInt(goodsInCartCount.text() || 0);
                cartCount += change;
                goodsInCartCount.text(cartCount);

                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },
            error: function (data) {
                console.log("Помилка при додаванні в корзину");
            },
        });
    }

    // Беремо елемент повідомлення за id та через 7 сек. прибираємо
    var notification = $('#notification');
    if (notification.length > 0) {
        setTimeout(function () {
            notification.alert('close');
        }, 7000);
    }

    // При натисканні на значок кошика відкриваємо модальне вікно
    $('#modalButton').click(function () {
        $('#exampleModal').appendTo('body');
        $('#exampleModal').modal('show');
    });

    // Подія кліку на кнопку закриття модального вікна
    $('#exampleModal .btn-close').click(function () {
        $('#exampleModal').modal('hide');
    });

    // Обробник події радіокнопки вибору способу доставки
    $("input[name='requires_delivery']").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue === "1") {
            $("#deliveryAddressField").show();
        } else {
            $("#deliveryAddressField").hide();
        }
    });
});
