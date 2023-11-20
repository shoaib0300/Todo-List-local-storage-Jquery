$(document).ready(function () {
    loadItemsFromLocalStorage();
});

function addItem() {
    let newItem = $('#item').val().trim();

    if (newItem !== '') {
        let li = $('<li>');

        let checkbox = $('<input type="checkbox">');
        checkbox.on('change', function () {
            toggleItemStatus(li);
        });

        let span = $('<span>').text(newItem);

        let deleteButton = $('<button>').text('DELETE').on('click', function () {
            deleteItem(li);
        });

        li.append(checkbox);
        li.append(span);
        li.append(deleteButton);

        $('#todoList').append(li);

        saveItemsToLocalStorage();

        $('#item').val('');
    }
}

function toggleItemStatus(li) {

    li.toggleClass('completed');

    saveItemsToLocalStorage();
}

function deleteItem(li) {

    li.remove();

    saveItemsToLocalStorage();
}

function clearAll() {

    $('#todoList').empty();

    localStorage.removeItem('todoItems');
}

function saveItemsToLocalStorage() {
    let items = [];

    $('#todoList li').each(function () {
        items.push({
            text: $(this).find('span').text(),
            completed: $(this).hasClass('completed')
        });
    });

    localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadItemsFromLocalStorage() {

    let storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
        let items = JSON.parse(storedItems);

        let todoList = $('#todoList');
        $.each(items, function (index, item) {
            let li = $('<li>');

            let checkbox = $('<input type="checkbox">');
            checkbox.prop('checked', item.completed);
            checkbox.on('change', function () {
                toggleItemStatus(li);
            });

            let span = $('<span>').text(item.text);

            let deleteButton = $('<button>').text('DELETE').on('click', function () {
                deleteItem(li);
            });

            li.append(checkbox);
            li.append(span);
            li.append(deleteButton);

            todoList.append(li);

            if (item.completed) {
                li.addClass('completed');
            }
        });
    }
}