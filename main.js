/* Portfolio interactions: scroll reveals, nav state, hero background
   parallax, and the constellation dot field.
   All motion respects prefers-reduced-motion. */
(function () {
    'use strict';

    // Mark JS as available so CSS can safely hide pre-reveal content.
    document.documentElement.classList.add('js');

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Nav: solid background after scrolling past the hero top ---
    var nav = document.getElementById('nav');
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Scroll reveals ---
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    } else {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { observer.observe(el); });
    }

    // --- Selected work: progressive disclosure ---
    var workToggle = document.getElementById('work-toggle');
    var workList = document.getElementById('worklist');
    if (workToggle && workList) {
        workToggle.addEventListener('click', function () {
            var expanded = workToggle.getAttribute('aria-expanded') === 'true';
            var hidden = workList.querySelectorAll('.work.is-hidden, .work.was-hidden');
            hidden.forEach(function (el) {
                if (expanded) {
                    el.classList.add('is-hidden');
                    el.classList.remove('was-hidden');
                } else {
                    el.classList.remove('is-hidden');
                    el.classList.add('was-hidden', 'in-view');
                }
            });
            workToggle.setAttribute('aria-expanded', String(!expanded));
            workToggle.textContent = expanded ? 'Show all work' : 'Show less';
        });
    }

    // --- Constellation: dot field with proximity links ---
    var canvas = document.getElementById('dots-canvas');
    var ctx = canvas ? canvas.getContext('2d') : null;
    var particles = [];
    var mouse = { x: -9999, y: -9999 };

    function sizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var count = Math.floor(canvas.width * canvas.height / 22000);
        particles = [];
        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                r: Math.random() * 1.4 + 0.6
            });
        }
    }

    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var col = '124, 140, 255';
        var linkDist = 110;

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            if (!reducedMotion) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + col + ', 0.35)';
            ctx.fill();

            for (var j = i + 1; j < particles.length; j++) {
                var q = particles[j];
                var dx = p.x - q.x, dy = p.y - q.y;
                var d2 = dx * dx + dy * dy;
                if (d2 < linkDist * linkDist) {
                    var alpha = 0.12 * (1 - Math.sqrt(d2) / linkDist);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = 'rgba(' + col + ', ' + alpha.toFixed(3) + ')';
                    ctx.stroke();
                }
            }

            var mdx = p.x - mouse.x, mdy = p.y - mouse.y;
            var md2 = mdx * mdx + mdy * mdy;
            if (md2 < 140 * 140) {
                var malpha = 0.25 * (1 - Math.sqrt(md2) / 140);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = 'rgba(' + col + ', ' + malpha.toFixed(3) + ')';
                ctx.stroke();
            }
        }
        if (!reducedMotion) requestAnimationFrame(drawFrame);
    }

    if (ctx) {
        sizeCanvas();
        window.addEventListener('resize', sizeCanvas);
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX; mouse.y = e.clientY;
        }, { passive: true });
    }

    if (ctx) drawFrame();

    // --- Hero parallax: orbs follow the pointer gently (desktop only) ---
    var orbs = document.getElementById('bg-orbs');
    var finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!reducedMotion && finePointer && orbs) {
        var targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;

        function animate() {
            curX += (targetX - curX) * 0.06;
            curY += (targetY - curY) * 0.06;
            orbs.style.transform = 'translate(' + curX.toFixed(2) + 'px, ' + curY.toFixed(2) + 'px)';
            if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
                rafId = requestAnimationFrame(animate);
            } else {
                rafId = null;
            }
        }

        window.addEventListener('mousemove', function (e) {
            targetX = (e.clientX / window.innerWidth - 0.5) * 36;
            targetY = (e.clientY / window.innerHeight - 0.5) * 36;
            if (rafId === null) rafId = requestAnimationFrame(animate);
        }, { passive: true });
    }
})();
