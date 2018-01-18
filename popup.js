document.addEventListener('DOMContentLoaded', () => {
  TunnelUtils.searchForItemId()
    .then((itemId) => {
      document.getElementById('item-id').innerText = itemId;
    });
});
