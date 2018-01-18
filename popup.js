

function closePopup() {
    window.close();
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('close').addEventListener('click', closePopup);

    TunnelUtils.searchForItemId()
        .then((results) => {
            document.getElementById('item-id').innerText = results.itemId;
            document.getElementById('environment').innerText = results.environment;

        });
});
