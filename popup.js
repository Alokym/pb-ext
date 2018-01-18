

function closePopup() {
    window.close();
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('close').addEventListener('click', closePopup);

    TunnelUtils.performTunneling();
});
