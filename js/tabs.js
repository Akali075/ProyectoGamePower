// Agregar este código en un archivo tabs.js
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function switchTab(oldTab, newTab) {
        newTab.focus();
        newTab.setAttribute('aria-selected', 'true');
        oldTab.setAttribute('aria-selected', 'false');
        oldTab.classList.remove('active');
        newTab.classList.add('active');
        
        let newPanelId = newTab.getAttribute('aria-controls');
        let oldPanelId = oldTab.getAttribute('aria-controls');
        
        document.getElementById(newPanelId).hidden = false;
        document.getElementById(oldPanelId).hidden = true;
        
        document.getElementById(newPanelId).classList.add('active');
        document.getElementById(oldPanelId).classList.remove('active');
    }

    tabButtons.forEach(tabButton => {
        tabButton.addEventListener('click', e => {
            let currentTab = document.querySelector('[aria-selected="true"]');
            if (e.currentTarget !== currentTab) {
                switchTab(currentTab, e.currentTarget);
            }
        });

        tabButton.addEventListener('keydown', e => {
            let targetTab = e.currentTarget;
            let currentTab = document.querySelector('[aria-selected="true"]');

            let nextTab = targetTab.nextElementSibling;
            let previousTab = targetTab.previousElementSibling;

            // Handle arrow keys
            switch(e.key) {
                case 'ArrowLeft':
                    if (previousTab) {
                        switchTab(currentTab, previousTab);
                    }
                    break;
                case 'ArrowRight':
                    if (nextTab) {
                        switchTab(currentTab, nextTab);
                    }
                    break;
                case 'Home':
                    switchTab(currentTab, tabButtons[0]);
                    break;
                case 'End':
                    switchTab(currentTab, tabButtons[tabButtons.length - 1]);
                    break;
            }
        });
    });
});