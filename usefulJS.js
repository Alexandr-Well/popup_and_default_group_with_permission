    function excludeOutObserver(func) {
        // декоратор для отмены слежения за изменением списка 
        // (нужен для того чтоб outOrder не регистрировал изменение списка при сортировки)
        return function () {
            outOrder.disconnect()
            func.apply(this, arguments)
            outOrder.observe(document.getElementById('sortable1'), config);
        }
    }
    
    var sortUlAlphabetSwitch = false
    var sortUlAlphabet = function () {
        // фу-я сортировки списка, сортирует по алфовиту
        let items = $('#sortable1 > li').get();
        items.sort(function (a, b) {
            var keyA = $(a).text();
            var extraConditionA = ($(a).data('status') === 'True')
            var keyB = $(b).text();
            var extraConditionB = ($(b).data('status') === 'True')
            if (sortUlAlphabetSwitch) {
                if (extraConditionA && !extraConditionB) {
                    return -1;
                } else if (extraConditionA && extraConditionB) {
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                } else if (!extraConditionA && extraConditionB) {
                    return 1;
                } else {
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                }
            } else {
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;

            }
            return 0;
        });
        let ul = $('#sortable1');
        $.each(items, function (i, li) {
            ul.append(li); /* This removes li from the old spot and moves it */
        });
        sortUlAlphabetSwitch = !sortUlAlphabetSwitch
    }
    //декорирование ф-ии
    sortUlAlphabet = excludeOutObserver(sortUlAlphabet)

    //начальная сортировка
    var items = $('#sortable1 > li').get();
    items.sort(function (a, b) {
        var keyA = $(a).text();
        var extraConditionA = ($(a).data('status') === 'True')
        var keyB = $(b).text();
        var extraConditionB = ($(b).data('status') === 'True')
        if (extraConditionA && !extraConditionB) {
            return -1;
        } else if (extraConditionA && extraConditionB) {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        } else if (!extraConditionA && extraConditionB) {
            return 1;
        } else {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        }
        return 0;
    });
    var ul = $('#sortable1');
    $.each(items, function (i, li) {
        ul.append(li); /* This removes li from the old spot and moves it */
    });
    //начальная сортировка (конец)

    //отслеживание перехода одного элемента списка в другой
    var config = {
        childList: true,
        subtree: true
    };
    var inOrderCallback = function (mutations, observer) {
        mutations.forEach(({
                               addedNodes
                           }) => {

            const li = addedNodes[0];

            if (li) {
                if ($(li).attr('id')) {
                    console.log('in', $(li).attr('id'))
                    //ajax to add in order
                }
            }
        });
    };
    var outOrderCallback = function (mutations, observer) {
        mutations.forEach(({
                               addedNodes
                           }) => {
            const li = addedNodes[0];
            if (li) {
                if ($(li).attr('id')) {
                    console.log('out', $(li).attr('id'))
                    //ajax to exclude from order
                }
            }
        });
    };
    var idOrder = new MutationObserver(inOrderCallback);
    idOrder.observe(document.getElementById('sortable2'), config);
    var outOrder = new MutationObserver(outOrderCallback);
    outOrder.observe(document.getElementById('sortable1'), config);
    // конец отслеживания
    
    // от библиотеки jquery
    $(function () {
        $("#sortable1, #sortable2").sortable({
            connectWith: ".connectedSortable"
        }).disableSelection;
    });
