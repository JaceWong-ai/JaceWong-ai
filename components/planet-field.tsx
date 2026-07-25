"use client";

import { useEffect, useRef, useState } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;

  #define PI 3.14159265359

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float hash31(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(
        mix(hash31(i), hash31(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash31(i + vec3(0.0, 1.0, 0.0)), hash31(i + vec3(1.0, 1.0, 0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash31(i + vec3(0.0, 0.0, 1.0)), hash31(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash31(i + vec3(0.0, 1.0, 1.0)), hash31(i + vec3(1.0, 1.0, 1.0)), f.x),
        f.y
      ),
      f.z
    );
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise3(p);
      p = p * 2.03 + vec3(13.1, 7.7, 5.3);
      amplitude *= 0.5;
    }
    return value;
  }

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  vec3 rotateY(vec3 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  }

  void main() {
    vec2 frag = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = frag - 0.5;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 pointer = (u_pointer - 0.5) * 2.0;
    float time = u_time * 0.12;

    vec3 color = mix(
      vec3(0.004, 0.006, 0.012),
      vec3(0.009, 0.018, 0.038),
      smoothstep(-0.55, 0.5, uv.y)
    );

    float nebula = fbm(vec3(uv * 1.55 + vec2(time * 0.018, 0.0), time * 0.025));
    float nebulaMask = smoothstep(0.48, 0.86, nebula) * smoothstep(0.8, -0.25, length(uv));
    color += vec3(0.055, 0.07, 0.16) * nebulaMask * 0.55;

    vec2 starGrid = (uv + vec2(4.0)) * vec2(190.0, 135.0);
    vec2 starCell = floor(starGrid);
    vec2 starPoint = fract(starGrid) - 0.5;
    float starRandom = hash21(starCell);
    float star = smoothstep(0.048, 0.0, length(starPoint));
    star *= smoothstep(0.992, 1.0, starRandom);
    star *= 0.62 + 0.38 * sin(time * 2.0 + starRandom * 20.0);
    color += vec3(0.72, 0.8, 1.0) * star;

    vec2 center = vec2(pointer.x * 0.017, 0.115 + pointer.y * 0.012);
    float radius = min(0.245, (u_resolution.x / u_resolution.y) * 0.47);
    vec2 fromCenter = uv - center;
    float sphereDistance = length(fromCenter) / radius;

    vec2 ringSpace = rotate2d(-0.08 + pointer.x * 0.015) * fromCenter;
    float ringRadius = length(ringSpace / vec2(1.82, 0.32)) / radius;
    float broadRing = smoothstep(1.76, 1.67, ringRadius) * smoothstep(1.12, 1.2, ringRadius);
    float ringTexture = 0.52 + 0.48 * sin(ringRadius * 116.0 + noise3(vec3(ringSpace * 26.0, time)) * 7.0);
    float ringAlpha = broadRing * (0.18 + ringTexture * 0.24);
    float rearRing = ringAlpha * step(0.0, ringSpace.y);
    color = mix(color, vec3(0.33, 0.48, 0.72), rearRing * smoothstep(0.92, 1.08, sphereDistance));

    float outerAtmosphere = exp(-max(sphereDistance - 1.0, 0.0) * 18.0);
    outerAtmosphere *= smoothstep(1.35, 1.0, sphereDistance);
    vec3 atmosphereColor = mix(
      vec3(0.20, 0.38, 0.95),
      vec3(0.49, 0.92, 0.98),
      clamp(fromCenter.y / radius + 0.45, 0.0, 1.0)
    );
    color += atmosphereColor * outerAtmosphere * 0.22 * step(1.0, sphereDistance);

    if (sphereDistance < 1.0) {
      vec2 sphereXY = fromCenter / radius;
      float sphereZ = sqrt(max(0.0, 1.0 - dot(sphereXY, sphereXY)));
      vec3 normal = normalize(vec3(sphereXY, sphereZ));

      normal = rotateY(normal, time * 0.23 + pointer.x * 0.12);
      normal.xy = rotate2d(-pointer.y * 0.045) * normal.xy;

      float largeCloud = fbm(normal * 2.15 + vec3(time * 0.045, 0.0, 0.0));
      float detailCloud = fbm(normal * 6.4 - vec3(time * 0.028, 0.0, 0.0));
      float terrain = smoothstep(0.44, 0.68, largeCloud * 0.72 + detailCloud * 0.34);
      float oceanVein = smoothstep(0.42, 0.72, fbm(normal * 4.1 + vec3(4.0, 1.0, time * 0.025)));
      float polar = smoothstep(0.52, 0.88, abs(normal.y));

      vec3 deepOcean = vec3(0.014, 0.026, 0.095);
      vec3 litOcean = vec3(0.035, 0.19, 0.40);
      vec3 mineral = vec3(0.22, 0.16, 0.48);
      vec3 cloud = vec3(0.50, 0.78, 0.96);

      vec3 albedo = mix(deepOcean, litOcean, oceanVein * 0.68);
      albedo = mix(albedo, mineral, terrain * 0.78);
      albedo = mix(albedo, cloud, smoothstep(0.62, 0.82, detailCloud) * 0.48);
      albedo = mix(albedo, vec3(0.58, 0.78, 0.93), polar * 0.28);

      vec3 lightDirection = normalize(vec3(-0.62, 0.48, 0.72));
      float diffuse = max(dot(normal, lightDirection), 0.0);
      float softLight = smoothstep(-0.20, 0.68, dot(normal, lightDirection));
      float fresnel = pow(1.0 - sphereZ, 2.7);
      float specular = pow(max(dot(reflect(-lightDirection, normal), vec3(0.0, 0.0, 1.0)), 0.0), 34.0);

      vec3 planetColor = albedo * (0.075 + diffuse * 0.88);
      planetColor *= 0.42 + softLight * 0.72;
      planetColor += atmosphereColor * fresnel * (0.34 + softLight * 0.5);
      planetColor += vec3(0.65, 0.84, 1.0) * specular * 0.48;

      float cityNoise = hash31(floor(normal * 180.0));
      float city = step(0.985, cityNoise) * terrain * smoothstep(0.48, -0.08, diffuse);
      planetColor += vec3(1.0, 0.62, 0.24) * city * 0.9;

      float edge = smoothstep(1.0, 0.985, sphereDistance);
      color = mix(color, planetColor, edge);

      float frontRing = ringAlpha * step(ringSpace.y, 0.0);
      color = mix(color, vec3(0.44, 0.62, 0.88), frontRing * 0.34);
    }

    float vignette = smoothstep(0.92, 0.18, length(uv * vec2(0.78, 1.0)));
    color *= 0.64 + vignette * 0.48;
    color = pow(color, vec3(0.88));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function PlanetField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const targetCanvas = canvasRef.current;
    if (!targetCanvas) return;
    const canvas: HTMLCanvasElement = targetCanvas;

    const targetContext = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    if (!targetContext) {
      setFallback(true);
      return;
    }
    const gl: WebGLRenderingContext = targetContext;

    const compiledVertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource,
    );
    const compiledFragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!compiledVertexShader || !compiledFragmentShader) {
      setFallback(true);
      return;
    }
    const vertexShader: WebGLShader = compiledVertexShader;
    const fragmentShader: WebGLShader = compiledFragmentShader;

    const targetProgram = gl.createProgram();
    if (!targetProgram) return;
    const program: WebGLProgram = targetProgram;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const pointerLocation = gl.getUniformLocation(program, "u_pointer");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    const startTime = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      const width = Math.max(1, Math.floor(bounds.width * ratio));
      const height = Math.max(1, Math.floor(bounds.height * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = (event.clientX - bounds.left) / bounds.width;
      pointer.targetY = 1 - (event.clientY - bounds.top) / bounds.height;
    }

    function render(now: number) {
      resize();
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(pointerLocation, pointer.x, pointer.y);
      gl.uniform1f(
        timeLocation,
        reducedMotion ? 12 : (now - startTime) / 1000,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    }

    canvas.addEventListener("pointermove", onPointerMove);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", onPointerMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className={fallback ? "planet-field is-fallback" : "planet-field"}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="planet-fallback" aria-hidden="true" />
    </div>
  );
}
