

function closePopup() {
    window.close();
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('close').addEventListener('click', closePopup);

    TunnelUtils.searchForItemId()
        .then((itemId) => {
            document.getElementById('item-id').innerText = itemId;
        });
});
