(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/RotatingEarth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RotatingEarth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function RotatingEarth() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RotatingEarth.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Set canvas size
            const size = 288; // 72 * 4 for retina
            canvas.width = size;
            canvas.height = size;
            // Create Earth texture
            const earthImg = new Image();
            earthImg.crossOrigin = "anonymous";
            earthImg.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg";
            let rotation = 0;
            let animationId;
            const animate = {
                "RotatingEarth.useEffect.animate": ()=>{
                    if (!ctx) return;
                    // Clear canvas with transparency
                    ctx.clearRect(0, 0, size, size);
                    // Save context
                    ctx.save();
                    // Apply 3D rotation based on mouse position
                    ctx.translate(size / 2, size / 2);
                    // Create circular clipping path
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.clip();
                    ctx.translate(-size / 2, -size / 2);
                    // Draw rotating Earth texture
                    if (earthImg.complete) {
                        const textureWidth = earthImg.width;
                        const offsetX = rotation % textureWidth;
                        // Adjust texture offset based on mouse tilt
                        const tiltOffset = tilt.x * 100;
                        const finalOffset = (offsetX + tiltOffset) % textureWidth;
                        // Draw first section
                        if (finalOffset >= 0) {
                            ctx.drawImage(earthImg, finalOffset, 0, textureWidth - finalOffset, earthImg.height, 0, 0, size * ((textureWidth - finalOffset) / textureWidth), size);
                            // Draw wrapped section
                            ctx.drawImage(earthImg, 0, 0, finalOffset, earthImg.height, size * ((textureWidth - finalOffset) / textureWidth), 0, size * (finalOffset / textureWidth), size);
                        }
                    }
                    ctx.restore();
                    // Add sphere shading with darker edges to blend with space
                    const shadowGradient = ctx.createRadialGradient(size * 0.3 + tilt.x * 50, size * 0.3 + tilt.y * 50, size * 0.05, size / 2, size / 2, size / 2);
                    shadowGradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
                    shadowGradient.addColorStop(0.4, "rgba(0, 0, 0, 0)");
                    shadowGradient.addColorStop(0.85, "rgba(0, 0, 0, 0.5)");
                    shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                    ctx.fillStyle = shadowGradient;
                    ctx.fill();
                    // Update rotation
                    rotation += 0.75;
                    animationId = requestAnimationFrame(animate);
                }
            }["RotatingEarth.useEffect.animate"];
            earthImg.onload = ({
                "RotatingEarth.useEffect": ()=>{
                    animate();
                }
            })["RotatingEarth.useEffect"];
            // Fallback if image doesn't load
            const fallbackTimer = setTimeout({
                "RotatingEarth.useEffect.fallbackTimer": ()=>{
                    if (!earthImg.complete) {
                        animate();
                    }
                }
            }["RotatingEarth.useEffect.fallbackTimer"], 1000);
            return ({
                "RotatingEarth.useEffect": ()=>{
                    cancelAnimationFrame(animationId);
                    clearTimeout(fallbackTimer);
                }
            })["RotatingEarth.useEffect"];
        }
    }["RotatingEarth.useEffect"], [
        tilt
    ]);
    const handleMouseMove = (e)=>{
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        // Normalize to -1 to 1 range
        const tiltX = mouseX / (rect.width / 2);
        const tiltY = mouseY / (rect.height / 2);
        setTilt({
            x: tiltX * 0.3,
            y: tiltY * 0.3
        }); // Reduce intensity
    };
    const handleMouseLeave = ()=>{
        setTilt({
            x: 0,
            y: 0
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: "inline-block cursor-pointer",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "h-72 w-72",
            style: {
                filter: "drop-shadow(0 0 50px rgba(74, 158, 255, 0.25)) drop-shadow(0 0 100px rgba(74, 158, 255, 0.15))",
                transform: `rotate(-23.5deg) perspective(1000px) rotateX(${tilt.y * 20}deg) rotateY(${tilt.x * 20}deg)`,
                transition: "transform 0.2s ease-out"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/RotatingEarth.tsx",
            lineNumber: 144,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/RotatingEarth.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(RotatingEarth, "cXqj26lnRc/qTtFrcs95x1Y8hlw=");
_c = RotatingEarth;
var _c;
__turbopack_context__.k.register(_c, "RotatingEarth");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RotatingEarth.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/RotatingEarth.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_RotatingEarth_tsx_00uumdj._.js.map