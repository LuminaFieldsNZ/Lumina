let conditions = [
    { keyword: 'systemic', action: () => { updateModule(3); document.getElementById('module4xx').style.display = 'block'; } },
    { keyword: 'start', action: () => { displayQuestion(); document.getElementById('module4xx').style.display = 'block'; } },
    { keyword: 'woke up', action: () => displayQuestion() },
    { keyword: 'time of day', action: () => displayQuestion() },
    { keyword: 'i see', action: () => displayQuestion() },
    { keyword: 'from me', action: () => displayQuestion() }
];
    