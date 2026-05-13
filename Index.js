javascript:(function(){
    for(let i=0;i<999;i++){
        const d=document.createElement('div');
        d.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;backdrop-filter:blur(1px);pointer-events:none;opacity:0.01';
        document.body.appendChild(d);
        function loop(){d.style.opacity=Math.random();requestAnimationFrame(loop);}
        loop();
    }
})();   
