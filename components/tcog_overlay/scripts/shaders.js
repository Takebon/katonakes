export default {
  vertexShader(){
    return `
attribute vec2 a_position;

void main() {
gl_Position = vec4( a_position, 0, 1 );
}
`
  },
  fragmentShader(){
    return `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 resolution;
uniform float time;
uniform float pixelRatio;
uniform sampler2D image0;
uniform sampler2D image1;
uniform float progress;


float strength = 0.1;

vec4 transition(vec2 p) {
vec4 ca = texture2D(image0, p);
vec4 cb = texture2D(image1, p);

vec2 oa = (((ca.rg+ca.b)*0.5)*2.0-1.0);
vec2 ob = (((cb.rg+cb.b)*0.5)*2.0-1.0);
vec2 oc = mix(oa,ob,0.5)*strength;

float w0 = progress;
float w1 = 1.0-w0;
return mix(texture2D( image0, p+oc*w0), texture2D( image1,p-oc*w1), progress);
}

void main() {
vec2 uv = pixelRatio*gl_FragCoord.xy / resolution.xy ;
vec2 vUv = (uv - vec2(0.5))*resolution.zw + vec2(0.5);
vUv.y = 1. - vUv.y;  
gl_FragColor = transition(vUv);  
}
`
  }
}