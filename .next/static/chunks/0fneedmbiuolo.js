(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,71368,e=>{"use strict";var t=e.i(43476),r=e.i(71645),o=e.i(75056),i=e.i(94800),a=e.i(70950),a=a,n=e.i(90072);let l=parseInt(n.REVISION.replace(/\D+/g,""));class s extends n.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${l>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}let c=e=>new n.Vector3().setFromSpherical(new n.Spherical(e,Math.acos(1-2*Math.random()),2*Math.random()*Math.PI)),u=r.forwardRef(({radius:e=100,depth:t=50,count:o=5e3,saturation:a=0,factor:l=4,fade:u=!1,speed:m=1},f)=>{let p=r.useRef(null),[d,v,g]=r.useMemo(()=>{let r=[],i=[],s=Array.from({length:o},()=>(.5+.5*Math.random())*l),u=new n.Color,m=e+t,f=t/o;for(let e=0;e<o;e++)m-=f*Math.random(),r.push(...c(m).toArray()),u.setHSL(e/o,a,.9),i.push(u.r,u.g,u.b);return[new Float32Array(r),new Float32Array(i),new Float32Array(s)]},[o,t,l,e,a]);(0,i.useFrame)(e=>p.current&&(p.current.uniforms.time.value=e.clock.elapsedTime*m));let[h]=r.useState(()=>new s);return r.createElement("points",{ref:f},r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[d,3]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[v,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[g,1]})),r.createElement("primitive",{ref:p,object:h,attach:"material",blending:n.AdditiveBlending,"uniforms-fade-value":u,depthWrite:!1,transparent:!0,vertexColors:!0}))});function m(){return(m=Object.assign.bind()).apply(null,arguments)}var f=n,p=a,a=a;class d extends f.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${l>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}}let v=e=>e&&e.constructor===Float32Array,g=e=>e instanceof f.Vector2||e instanceof f.Vector3||e instanceof f.Vector4,h=e=>Array.isArray(e)?e:g(e)?e.toArray():[e,e,e];function y(e,t,o){return r.useMemo(()=>{if(void 0!==t)if(v(t))return t;else{if(t instanceof f.Color){let r=Array.from({length:3*e},()=>[t.r,t.g,t.b]).flat();return Float32Array.from(r)}if(g(t)||Array.isArray(t)){let r=Array.from({length:3*e},()=>h(t)).flat();return Float32Array.from(r)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},o)},[t])}let b=r.forwardRef(({noise:e=1,count:t=100,speed:o=1,opacity:n=1,scale:l=1,size:s,color:c,children:u,...g},b)=>{r.useMemo(()=>(0,p.e)({SparklesImplMaterial:d}),[]);let x=r.useRef(null),A=(0,a.C)(e=>e.viewport.dpr),P=h(l),M=r.useMemo(()=>Float32Array.from(Array.from({length:t},()=>P.map(f.MathUtils.randFloatSpread)).flat()),[t,...P]),C=y(t,s,Math.random),w=y(t,n),j=y(t,o),F=y(3*t,e),S=y(void 0===c?3*t:t,v(c)?c:new f.Color(c),()=>1);return(0,i.useFrame)(e=>{x.current&&x.current.material&&(x.current.material.time=e.clock.elapsedTime)}),r.useImperativeHandle(b,()=>x.current,[]),r.createElement("points",m({key:`particle-${t}-${JSON.stringify(l)}`},g,{ref:x}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[M,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[C,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[w,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[j,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[S,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[F,3]})),u||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:A,depthWrite:!1}))});function x(){let{camera:e,pointer:t}=(0,a.C)(),o=(0,r.useRef)({x:0,y:0});return(0,i.useFrame)((r,i)=>{o.current.x+=(1.4*t.x-o.current.x)*Math.min(1.2*i,1),o.current.y+=(.9*t.y-o.current.y)*Math.min(1.2*i,1),e.position.x+=(o.current.x-e.position.x)*.03,e.position.y+=(o.current.y-e.position.y)*.03,e.lookAt(0,0,0)}),null}function A(){let{size:e}=(0,a.C)(),o=Math.max(e.width/1100,1.4),l=(0,r.useMemo)(()=>[{pos:[-34,18,-60],color:"#8b5cf6",r:16,o:.16},{pos:[30,-14,-70],color:"#06b6d4",r:20,o:.13},{pos:[8,30,-80],color:"#ec4899",r:13,o:.12},{pos:[-18,-26,-50],color:"#3b82f6",r:14,o:.15},{pos:[44,26,-90],color:"#a855f7",r:18,o:.1}],[]),s=(0,r.useRef)(null);return(0,i.useFrame)((e,t)=>{s.current&&(s.current.rotation.z+=.01*t)}),(0,t.jsx)("group",{ref:s,scale:o,children:l.map((e,r)=>(0,t.jsxs)("mesh",{position:e.pos,children:[(0,t.jsx)("sphereGeometry",{args:[e.r,24,24]}),(0,t.jsx)("meshBasicMaterial",{color:e.color,transparent:!0,opacity:e.o,blending:n.AdditiveBlending,depthWrite:!1})]},r))})}function P(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(x,{}),(0,t.jsx)(u,{radius:120,depth:60,count:4500,factor:4,saturation:0,fade:!0,speed:.6}),(0,t.jsx)(b,{count:220,scale:[40,22,30],size:2.2,speed:.25,opacity:.6,color:"#bfdbfe"}),(0,t.jsx)(A,{})]})}e.s(["default",0,function(){return(0,t.jsx)(o.Canvas,{dpr:[1,1.5],camera:{position:[0,0,6],fov:60},gl:{antialias:!1,alpha:!0,powerPreference:"low-power",stencil:!1,depth:!1},style:{position:"absolute",inset:0},"aria-hidden":!0,frameloop:"demand",performance:{min:.5},children:(0,t.jsx)(r.Suspense,{fallback:null,children:(0,t.jsx)(P,{})})})}],71368)},90938,function(e){e.n(e.i(71368))}]);