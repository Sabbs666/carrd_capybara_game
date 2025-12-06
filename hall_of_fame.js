(function() {
    const STORAGE_KEY = 'kapibara_hof_v1';
    const MAX_ENTRIES = 10;

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const data = JSON.parse(raw);
            if (!Array.isArray(data)) return [];
            return data;
        } catch (e) {
            console.error('Błąd odczytu Hall of Fame:', e);
            return [];
        }
    }

    function save(list) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (e) {
            console.error('Błąd zapisu Hall of Fame:', e);
        }
    }

    function addScore(name, score) {
        const list = load();
        const entry = {
            name: name,
            score: score,
            date: new Date().toISOString()
        };
        list.push(entry);
        list.sort((a, b) => b.score - a.score);
        const trimmed = list.slice(0, MAX_ENTRIES);
        save(trimmed);
    }

    function render(container) {
        if (!container) return;
        const list = load();

        if (!list.length) {
            container.innerHTML = '<p>Brak wyników. Bądź pierwszy!</p>';
            return;
        }

        let html = '<table><thead><tr><th>#</th><th>Imię</th><th>Wynik</th></tr></thead><tbody>';
        list.forEach((entry, index) => {
            html += `<tr>
                        <td>${index + 1}</td>
                        <td>${entry.name}</td>
                        <td>${entry.score}</td>
                     </tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.hof = {
        addScore,
        render
    };
})();
