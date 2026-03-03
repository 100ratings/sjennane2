// Função idêntica à do dicionariodenomes para envio e redirecionamento
async function handleAction(idField, path) {
    const input = document.getElementById(idField);
    if (input && input.value.trim()) {
        const val = input.value.trim();
        
        // 1. Cópia e Envio (usa a função global definida no index.html)
        if (window.copyToClipboard) {
            await window.copyToClipboard(val);
        }

        // 2. Redirecionamento substituindo o histórico
        window.location.replace(`https://meilleursprenoms.com/${path}/${val}`);
    }
}

// Funções globais chamadas pelos botões originais do sjennane
window.redirectMeaning = (id) => handleAction(id, 'prenom');
window.redirectPopularity = (id) => handleAction(id, 'popularite-prenom');

// Listener para a tecla Enter nos campos de busca
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['searchBothInput', 'meaningSearchInput', 'meaningSearchInput2', 'statSearchInput'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keypress', (evt) => {
                if (evt.keyCode === 13) {
                    const path = (id === 'statSearchInput') ? 'popularite-prenom' : 'prenom';
                    handleAction(id, path);
                }
            });
        }
    });
});
