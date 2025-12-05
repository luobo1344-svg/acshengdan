/**
    * @license
    * Copyright 2020 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS-IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@tensorflow/tfjs-core")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs-core"],e):e((t=t||self).tf={},t.tf)})(this,function(t,e){"use strict";
/** @license See the LICENSE file. */class s{constructor(t,e){this.backend=t,this.texShape=e,this.texShape,this.usage=1,this.isPacked=e.length>2}isDisposed=false;dispose(){this.isDisposed||(this.usage--,0===this.usage&&(this.backend.releaseGPUTexture(this),this.isDisposed=!0))}incRef(){this.usage++}isReady(){return true}equals(t){return t!=null&&(t.isPacked===this.isPacked&&e.util.arraysEqual(t.texShape,this.texShape))}}class i{constructor(t){this.values=t,this.refCount=1}dispose(){0==--this.refCount&&e.util.freeTypedArray(this.values)}ref(){this.refCount++}}class a{constructor(t,e,s,i){this.backend=t,this.dtype=e,this.shape=s,this.texData=i,this.id=a.nextDataId++,t.incRef()}size=e.util.sizeFromShape(this.shape);isDisposed=!1;dispose(){this.isDisposed||(this.texData.dispose(),this.backend.removeData(this.id),this.isDisposed=!0)}static nextDataId=0}var r=new Map,n=0;function o(t,e){const s=t.getContextAttributes();return(e||s&&s.powerPreference==="low-power"||typeof navigator!="undefined"&&/Mobi|Android/i.test(navigator.userAgent))?"low-power":"high-performance"}function l(t,e){let s;try{s=t.getContext("webgl",e)||t.getContext("experimental-webgl",e)}catch(t){s=null}return s}class h{constructor(t){this.disposed=!1;const{canvas:e,context:s}=t||{};this.canvas=e,s&&s.canvas!==e&&(this.canvas=s.canvas),this.canvas||(this.canvas=typeof OffscreenCanvas!="undefined"?new OffscreenCanvas(1,1):document.createElement("canvas")),this.canvas.addEventListener("webglcontextlost",t=>{this.contextLost=!0,console.warn("WebGL context lost."),t.preventDefault()},!1);const i=o(this.canvas,this.isPowerPreferenceLowForMobile());this.gl=l(this.canvas,{"alpha":!1,"antialias":!1,"depth":!1,"stencil":!1,"premultipliedAlpha":!1,"powerPreference":i}),this.contextLost=!1,this.gl.disable(this.gl.DEPTH_TEST),this.gl.disable(this.gl.STENCIL_TEST),this.gl.disable(this.gl.BLEND),this.gl.disable(this.gl.DITHER),this.gl.disable(this.gl.POLYGON_OFFSET_FILL),this.gl.disable(this.gl.SAMPLE_COVERAGE);const a=e=>{const t=this.gl.getExtension(e);if(!t)throw new Error(`This browser does not support ${e}.`);return t};if(e.env().getBool("IS_WEBGL_CONFORMANCE_TEST")){const t=a("EXT_disjoint_timer_query");this.disjointQueryTimerExtension={"beginQueryEXT":t.beginQueryEXT.bind(t),"endQueryEXT":t.endQueryEXT.bind(t),"createQuestionEXT":t.createQueryEXT.bind(t),"deleteQuestionEXT":t.deleteQueryEXT.bind(t),"getQueryObjectEXT":t.getQueryObjectEXT.bind(t),"QUERY_RESULT_AVAILABLE_EXT":t.QUERY_RESULT_AVAILABLE_EXT,"TIME_ELAPSED_EXT":t.TIME_ELAPSED_EXT,"GPU_DISJOINT_EXT":t.GPU_DISJOINT_EXT}}else if(e.env().getBool("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED")){const t=a("EXT_disjoint_timer_query_webgl2");t&&(this.disjointQueryTimerExtension={createQuery:this.gl.createQuery.bind(this.gl),deleteQuery:this.gl.deleteQuery.bind(this.gl),beginQuery:this.gl.beginQuery.bind(this.gl),endQuery:this.gl.endQuery.bind(this.gl),getQueryParameter:this.gl.getQueryParameter.bind(this.gl),"QUERY_RESULT_AVAILABLE":this.gl.QUERY_RESULT_AVAILABLE,"QUERY_RESULT":this.gl.QUERY_RESULT,"TIME_ELAPSED":t.TIME_ELAPSED_EXT,"GPU_DISJOINT":this.gl.GPU_DISJOINT})}this.textureFloatExtension=a("OES_texture_float"),this.textureHalfFloatExtension=a("OES_texture_half_float"),e.env().get("WEBGL_RENDER_FLOAT32_ENABLED")&&(this.colorBufferFloatExtension=a("WEBGL_color_buffer_float")),this.getAndSaveColorBufferFloatExtension(e),e.env().get("WEBGL_PROVOKING_VERTEX")&&(this.provokingVertexExtension=a("WEBGL_provoking_vertex")),e.env().get("WEBGL_depth_texture")&&(this.depthTextureExtension=a("WEBGL_depth_texture")),this.loseContextExtension=a("WEBGL_lose_context")}isPowerPreferenceLowForMobile(){return e.env().getBool("WEBGL_FORCE_POWER_PREFERENCE_LOW_POWER_FOR_MOBILE")?!0:!1}getAndSaveColorBufferFloatExtension(t){if(!t.env().get("WEBGL_RENDER_FLOAT32_ENABLED"))return;const e=this.gl.getExtension("EXT_color_buffer_float");e&&(this.colorBufferFloatExtension=e)}dispose(){this.throwIfDisposed(),this.loseContextExtension&&this.loseContextExtension.loseContext(),this.disposed=!0}throwIfDisposed(){if(this.disposed)throw new Error("WebGL context disposed.")}}class c{constructor(t,e,s){this.isPacked=s,this.source=t,this.internalFormat=e.internalFormat,this.textureFormat=e.textureFormat}bind(t){t.activeTexture(t.TEXTURE0+this.textureUnit),t.bindTexture(t.TEXTURE_2D,this.texture)}unbind(t){this.textureUnit&&(t.activeTexture(t.TEXTURE0+this.textureUnit),t.bindTexture(t.TEXTURE_2D,null))}upload(t,e){this.texture=e,this.textureUnit=t.activeTextureUnit,t.bind(this)}}}class d{constructor(t,e){this.texture=t,this.logicalShape=e}static nextId=0}var u=function(t,e){return`
    precision highp float;
    varying vec2 UV;
    `+t+`
    void main() {
      `+(e=`
      `+e+`
    `)+`
    }
  `},f=function(t,e,s){if(s&&"complex64"===t)return"vec4";if(s&&"int32"!==t){if("float32"===t)return"vec2"}return"float"},g=function(t,e,s){return s&&"complex64"===t?"return c;":s&&"int32"===t?"return vec4(outputValue, 0., 0., 0.);":s&&"float32"===t?"return outputValue;":"gl_FragColor = outputValue;"},p=function(t,e){const s=t.rank,i=function(t,e){const s="coords["+(t-1)+"]",i=t>1?`coords[${t-2}]`:"0.0";let a="";return 2===t&&(a+="if(vPos < "+e+`){
        `+s+" = vPos; "+i+"= 0.0; } else { "+s+" = mod(vPos, "+e+"); "+i+" = floor(vPos / "+e+"); }"),3===t&&(a+="float a = mod(vPos, "+e[0]*e[1]+`);
        `+s+" = mod(vPos, "+e[0]+"); coords[1] = floor(a / "+e[0]+"); coords[0] = floor(vPos / "+e[0]*e[1]+");"),4===t&&(a+="float a = mod(vPos, "+e[0]*e[1]*e[2]+`);
        float b = mod(a, `+e[0]*e[1]+`);
        `+s+" = mod(vPos, "+e[0]+`); coords[2] = floor(b / "+e[0]+`); coords[1] = floor(a / ("+e[0]*e[1]+")); coords[0] = floor(vPos / ("+e[0]*e[1]*e[2]+"));"),a}(s,e),a=`void main() {
  int id = int(vPos);
  `+i+`
  setOutput(get());
}
`;return u(t,a)},m=function(t){return`
  float get(int i) {
    vec4 texel = texture2D(source, getUV(i));
    int b = int(mod(float(i), 2.0));
    return b == 0 ? texel.r : texel.g;
  }
`},v=function(t){return`
  float get(int i) {
    vec4 texel = texture2D(source, getUV(i));
    return texel.r;
  }
`},y=function(t){return`
  vec2 getUV(int i) {
    float r = mod(float(i), texShape.y);
    float c = floor(float(i) / texShape.y);
    return (vec2(c,r) + halfCR) / texShape;
  }
`};function b(t){const e=t.rank;let s="";for(let t=0;t<e;t++)s+=`float ${"xyzw"[t]}=round(res.vTexcoord.${"xyzw"[t]}*res.outShape.${"xyzw"[t]});`;return s}function _(t){const e=t.rank;return"coords="+`${"xyzw"[0]}${1<e?"y":""}${2<e?"z":""}${3<e?"w":""}`.substr(0,e)+";"}function w(t){const e=t.rank,s=t.customUniforms;let i="";for(let t=0;t<s.length;t++){const{name:e,type:a}=s[t];i+=`uniform ${a} ${e};`}const a=(t,e,s,i,a,r,n=""){const o="out";return`
    precision highp float;
    `+t+`
    uniform sampler2D `+e+`;
    `+(i?`uniform sampler2D ${i};`:"")+`
    varying vec2 vTexcoord;
    `+s+`
    `+r+`
    void main() {
      `+(n?`int memoryOffset=${n};`:"")+`
      vec4 `+o+` = `+a+`
      `+o+"."+("float32"===t.dtype?"rgba":"r")+` = `+o+"."+("float32"===t.dtype?"rgba":"r")+`;
      gl_FragColor = `+o+`;
    }
  `},k=function(t,e,s){if("complex64"===s)return`vec4 ${t}=${e};`;if("int32"===s)return`float ${t}=${e}.r;`;const i=e=>e.startsWith("texture2D")?`(${e})`:`${e}`;return`vec2 ${t}=${i(e)}.rg;`},S=function(t,e,s){if("complex64"===s)return`return ${t};`;if("int32"===s)return`return vec4(${t},0,0,0);`;{const s=e;return`return ${t};
    `+s}},D=function(t,e,s){if("complex64"===s)return`vec4 ${t}=get${e}AtOutCoords();`;if("int32"===s)return`float ${t}=get${e}AtOutCoords().r;`;{const s=`get${e}AtOutCoords()`;return`vec2 ${t}=`+s+".rg;"}};function E(t){return"int32"===t.dtype?"ivec4":"vec4"}function C(t){return"int32"===t.dtype?"int":"float"}function O(t,e,s){const i=E(t.dtype),a="texel"+e,r="int32"===t.dtype?"round(res.outShape)":"res.outShape",n="int32"===t.dtype?`
    ivec4 outTexel = ivec4(round(texel.${s}));`:``;return`
  `+i+` `+a+` = getOutputTexel();
  float `+t.name+` = get`+t.name.charAt(0).toUpperCase()+t.name.slice(1)+`ByOutputTexel(`+a+`);
  `}function j(t,e){const s=`${t}Shape`;if(1===e.rank)return`int get${t}FlatOffset(int coord) {
      return coord;
    }
    `;if(1===e.rank)return`int get${t}FlatOffset(int[] coords) {
      return coords[0];
    }
    `;const i=["d0","d1","d2","d3"].slice(0,e.rank);let a="",r="";for(let t=0;t<e.rank;t++){r+=`
      + ${i[t]} * ${s}[${t+1}]`,a+=`int ${i[t]}=coords[${t}];`}return`
    int get${t}FlatOffset(int[] coords) {
      ${a}
      return ${i[e.rank-1]}${r.slice(0,r.length-`${s}[${e.rank}]`.length-3)};
    }
  `}function P(t,e){const s=`${t}Shape`;let i=`int ${i=1===e.rank?"coord":"coords[0]"};`;for(let t=e.rank-1;t>0;t--){const a=e.strides[t-1];i+=` + coords[${t}] * ${a}`}return`
    int get${t}FlatOffset(int[] coords) {
      return ${i};
    }
    `}function T(t,e){const s=`${t}Shape`;return 2===e.rank?`
    vec2 get${t}UVFromFlat(int flatOffset) {
      int texR = flatOffset / ${s}[1];
      int texC = flatOffset % ${s}[1];
      return (vec2(texC, texR) + halfCR) / vec2(${s}[1], ${s}[0]);
    }
    `:3===e.rank?`
    vec2 get${t}UVFromFlat(int flatOffset) {
      int texR = flatOffset / ${s}[2];
      int texC = flatOffset % ${s}[2];
      return (vec2(texC, texR) + halfCR) / vec2(${s}[2], ${s}[1] * ${s}[0]);
    }
  `:4===e.rank?`
  vec2 get${t}UVFromFlat(int flatOffset) {
    int texR = flatOffset / ${s}[3];
    int texC = flatOffset % ${s}[3];
    return (vec2(texC, texR) + halfCR) /
           vec2(${s}[3], ${s}[2] * ${s}[1] * ${s}[0]);
  }
`:""}function A(t,e,s,i){return i&&"complex64"===s?`vec4 ${t}=texture2D(${e},uv);`:i&&"int32"===s?`float ${t}=texture2D(${e},uv).r;`:i&&"float32"===s?`vec2 ${t}=texture2D(${e},uv).rg;`:`vec4 ${t}=texture2D(${e},uv);`}function I(t,e,s){if("complex64"===s)return`return ${t};`;if("int32"===s)return`return vec4(${t},0,0,0);`;{const s=e;return`return ${t};
  `+s}}function R(t,e){let s=t.rank;const i=`const int ${t.name.toUpperCase()}_RANK = ${s};`,a=`uniform int ${t.name}Shape[${s}];`,r=`uniform int ${t.name}Strides[${s-1}];`;return`
    ${i}
    ${a}
    ${r}
    `+P(t.name,e)+T(t.name,e)+`
    float get`+t.name.charAt(0).toUpperCase()+t.name.slice(1)+`(int[] coords) {
      return texture2D(
          `+t.name+",get"+t.name+"UVFromFlat(get"+t.name+"FlatOffset(coords))).r;"+`
    }
  `}function L(t,e){const s=t.map((t,s)=>{const i=e.find(e=>e.name===t.name);return R(t,i)}).join("\n");return`
  vec2 halfCR = vec2(0.5, 0.5);
  `+s}function M(t,e,s){return s&&"complex64"===e?`
      vec4 ${t}(int[] coords) {
        return texture2D(source, uv);
      }
    `:s&&"int32"===e?`
      float ${t}(int[] coords) {
        return texture2D(source, uv).r;
      }
    `:s&&"float32"===e?`
      vec2 ${t}(int[] coords) {
        return texture2D(source, uv).rg;
      }
    `:`
      vec4 ${t}(int[] coords) {
        return texture2D(source, uv);
      }
    `}function F(t,e){const s=E(e.dtype),i="int32"===e.dtype?`
    ivec4 getOutputTexel() {
      return ivec4(round(gl_FragCoord.xy), 0, 0);
    }`:`
    vec4 getOutputTexel() {
      return vec4(gl_FragCoord.xy, 0, 0);
    }
    `;return`
  `+s+" outTexel;"+`
  `+i+`
  void setOutput(float val) {
    gl_FragColor = vec4(val, 0, 0, 0);
  }
  void setOutput(vec2 val) {
    gl_FragColor = vec4(val, 0, 0);
  }
  void setOutput(vec4 val) {
    gl_FragColor = val;
  }
  `+t}function U(t,e){const s="int32"===t.dtype,i=E(t.dtype),a="texel"+e,r=s?"round(res.outShape)":"res.outShape",n=s?`
    ivec4 outTexel = ivec4(round(texel.${"xyzw".substr(0,t.rank)}));`:``;return`
  `+i+` `+a+` = getOutputTexel();
  float `+t.name+` = get`+t.name.charAt(0).toUpperCase()+t.name.slice(1)+`ByOutputTexel(`+a+`);
  `}function N(t,e){return`
  const int ${t.name.toUpperCase()}_RANK = ${t.rank};
  uniform ivec2 ${t.name}Size;
  uniform ivec${e.rank>1?e.rank:2} ${t.name}Shape;
  uniform ivec${e.rank>1?e.rank:2} ${t.name}TexShape;
  `}function B(t,e){return"int32"===e.dtype?`
      int get${t.name}AtOutCoords() {
        ivec2 resTexRC = ivec2(gl_FragCoord.xy) - ivec2(0, 0);
        int index = resTexRC.y * ${e.name}TexShape[1] + resTexRC.x;
        int r = index / ${e.name}Shape[1];
        int c = index % ${e.name}Shape[1];
        return get${t.name}(r, c);
      }
    `:`
    float get${t.name}AtOutCoords() {
      ivec2 resTexRC = ivec2(gl_FragCoord.xy) - ivec2(0, 0);
      int index = resTexRC.y * ${e.name}TexShape[1] + resTexRC.x;
      int r = index / ${e.name}Shape[1];
      int c = index % ${e.name}Shape[1];
      return get${t.name}(r, c);
    }
  `}function V(t,e){return"int32"===e.dtype?`int get${t.name}(int r, int c) {
        return ivec2(r, c) == ${e.name}Size - 1 ?
            0 : round(texture2D(${t.name},
              (vec2(c, r) + halfCR) / vec2(${e.name}Size)).r);
      }`:`float get${t.name}(int r, int c) {
        return texture2D(${t.name},
          (vec2(c, r) + halfCR) / vec2(${e.name}Size)).r;
      }`}function G(t,e){const s=`
  uniform sampler2D ${t.name};
  `+N(e,t)+`
  vec2 halfCR = vec2(0.5, 0.5);
  `+V(e,t)+B(e,t);return"int32"===e.dtype?"":s}var x=new class{build(t,e){const s=`uniform sampler2D source;
uniform vec2 texShape;
`+t,i=`${f(e.dtype,0,true)} get() {
  vec2 coords = floor(gl_FragCoord.xy);
  float R = coords.y;
  float C = coords.x;
  float vPos = R * texShape.y + C;
  `+("complex64"===e.dtype?`vec4 `+e.name+` = `+e.name+"(vPos);":e.dtype.startsWith("int")?`float `+e.name+` = `+e.name+"(vPos);":`vec2 `+e.name+` = `+e.name+"(vPos);")+`
  return `+e.name+`;
}
`,a="gl_FragColor=setOutput(get());";return u(s,i,a)}};var q=new class{build(t,e,s){const i=f(e.dtype,1,true),a=`vec4 result;
  `+t+`
  void main() {
    result = `+s+`;
    `+g(0,0,true)+`
  }
`;return u("",i+" "+e.name+"("+("int"===i?"int":"float")+" v) { "+a+" }",a)}};var z=new class{constructor(){}build(t,e){const s=t.map(t=>t.name),i=t.map(t=>{const e=t.rank;if(1===e)return"int "+t.name+";";let s="[${e}]";return"int "+t.name+s});return`
      `+t.map(t=>R(t.name,t.rank)).join("\n")+`
      void main() {
        `+i.join("\n")+`
        `+s.map(t=>`get${t.charAt(0).toUpperCase()+t.slice(1)}CoordsFromFlatIndex(size);`).join("\n")+`
        `+e+`
      }
    `}};var W=new class{constructor(){}build(t,e){const s=t.map(t=>{const e=t.rank,s="coords";return`
    void get${t.name.charAt(0).toUpperCase()+t.name.slice(1)}CoordsFromFlatIndex(
        in int flatIndex, out int ${s}[${e}]) {
      `+function(t,e){if(1===t.rank)return`${e}[0] = flatIndex;`;let s=`const int `+t.name+`Strides[${t.rank-1}] = `+t.strides.join(",")+";";return s+" "+function(t,e){const s="index",i=t.rank,a=`${e}[${i-1}] = mod(flatIndex, ${t.shape[i-1]});
int ${s} = flatIndex / ${t.shape[i-1]};`;let r="";for(let n=i-2;n>=0;n--)r+=" "+`${e}[${n}] = mod(${s}, ${t.shape[n]});
${s} = ${s} / ${t.shape[n]};`;return a+r}(t,e)}(t,s)+`
    }
    `}).join("\n"),i=`int size = int(gl_FragCoord.x);
    `+e,a=`
  precision highp float;
  const vec2 halfCR = vec2(0.5, 0.5);
  uniform int texSize;
  `+L(t,"")+s+`
  void main() {
    for (int i = 0; i < texSize; ++i) {
      if (i > texSize) {
        break;
      }
      `+i+`
    }
  }
`;return a}};function K(t,e){return`vec4 sample(sampler2D texture, vec2 uv) {
  return texture2D(texture, uv);
}

vec2 UVfromST(vec2 st) {
  return vec2(st.x, 1.0 - st.y);
}

vec4 getValue(vec2 st, vec2 uniforms[4]) {
  vec2 TextureSize = uniforms[0];
  vec2 OutShape = uniforms[1];
  vec2 HalfPixel = vec2(0.5, 0.5);
  vec2 st_clamp = clamp(st, vec2(0.0, 0.0), vec2(1.0, 1.0) - HalfPixel / TextureSize);
  vec2 uv = UVfromST(st_clamp);
  return sample(source, uv);
}`}function H(t,e){return`
vec4 bilinear(
  vec4 V11,
  vec4 V12,
  vec4 V21,
  vec4 V22,
  vec2 C
) {
  vec4 v1 = mix(V11, V12, C.x);
  vec4 v2 = mix(V21, V22, C.x);
  return mix(v1, v2, C.y);
}

vec4 getValue(vec2 st, vec2 uniforms[4]) {
  vec2 TextureSize = uniforms[0];
  vec2 TexelSize = vec2(1.0, 1.0) / TextureSize;
  vec2 HalfPixel = vec2(0.5, 0.5);

  vec2 st_floor = floor(st * TextureSize - HalfPixel) / TextureSize;
  vec2 st_ceil = ceil(st * TextureSize - HalfPixel) / TextureSize;
  vec2 C = fract(st * TextureSize - HalfPixel);

  vec4 V11 = sample(source, UVfromST(st_floor));
  vec4 V12 = sample(source, UVfromST(vec2(st_ceil.x, st_floor.y)));
  vec4 V21 = sample(source, UVfromST(vec2(st_floor.x, st_ceil.y)));
  vec4 V22 = sample(source, UVfromST(st_ceil));

  return bilinear(V11, V12, V21, V22, C);
}

vec4 getValue(vec2 st, vec2 uniforms[4]) {
  vec2 TextureSize = uniforms[0];
  vec2 TexelSize = vec2(1.0, 1.0) / TextureSize;
  vec2 HalfPixel = vec2(0.5, 0.5);

  vec2 st_floor = floor(st * TextureSize - HalfPixel) / TextureSize;
  vec2 st_ceil = ceil(st * TextureSize - HalfPixel) / TextureSize;
  vec2 C = fract(st * TextureSize - HalfPixel);

  vec4 V11 = sample(source, UVfromST(st_floor));
  vec4 V12 = sample(source, UVfromST(vec2(st_ceil.x, st_floor.y)));
  vec4 V21 = sample(source, UVfromST(vec2(st_floor.x, st_ceil.y)));
  vec4 V22 = sample(source, UVfromST(st_ceil));

  return bilinear(V11, V12, V21, V22, C);
}
`}class J{constructor(t,e,s,i,a,r,n){this.source=t,this.program=e,this.location=s,this.uniforms=i,this.customUniforms=a,this.sourceShape=r,this.sourceTexShape=n,this.customUniforms=this.customUniforms||[]}populate(t,e){t.bind(this.source),t.useProgram(this.program);for(const s of this.uniforms){const i=`return vec2(${this.sourceShape[0]}, ${this.sourceShape[1]});`,a=`return vec2(${e.shape[0]}, ${e.shape[1]});`,r=`return vec2(${this.sourceTexShape[0]}, ${this.sourceTexShape[1]});`,n=new Function(i)(),o=new Function(a)(),l=new Function(r)();t.setUniform(s,[[n.x,n.y],[o.x,o.y],[l.x,l.y]])}for(const s of this.customUniforms)t.setUniform(s.location,s.value);t.bindTextureToUnit(this.source,0,this.location)}}var Y=new class{constructor(){}build(t,e){return`
  precision highp float;
  `+e+`
  uniform sampler2D source;
  uniform vec2 uniforms[4][1];
  varying vec2 ST;
  `+t+`
  void main() {
    gl_FragColor = getValue(ST, uniforms[0]);
  }
`}};class Z{constructor(t,e,s,i,a){this.source=t,this.program=e,this.location=s,this.uniforms=i,this.customUniforms=a||[]}populate(t){t.bind(this.source),t.useProgram(this.program),t.bindTextureToUnit(this.source,0,this.location);for(const e of this.uniforms){const s=e.valueFn();t.setUniform(e.location,s)}for(const e of this.customUniforms)t.setUniform(e.location,e.value)}}class Q{constructor(t,e){this.program=t,this.uniformLocations=e,this.customUniformLocations=new Map}bind(t,e){t.useProgram(this.program);for(let s=0;s<this.uniformLocations.length;s++){const i=this.uniformLocations[s];t.setUniform(i,e[s])}}}var X,tt;class et{constructor(t,e,s,i,a,r){this.program=t,this.uniformLocations=e,this.variableNames=s,this.customUniformLocations=new Map,this.enableShapeUniforms=r,this.numInputs=i,this.numOutputs=a}bind(t,e){t.useProgram(this.program);for(let s=0;s<this.numInputs;s++)t.bindTextureToUnit(e[s],s);if(this.enableShapeUniforms)for(let t=0;t<this.variableNames.length;t++){const s=this.variableNames[t],i=this.uniformLocations.get(s+"Shape"),a=this.uniformLocations.get(s+"TexShape");i&&a||e_("Variable "+s+" shape uniforms not found.");const r=e[t];t.uploadShapeUniform(i,r.shape),t.uploadShapeUniform(a,r.texData.texShape)}}}var nt,rt,ot,it,st,at,ut,lt,ct,ht,pt;function dt(){const t=X;return X=null,t}class ft{constructor(t,e,s,i,a){this.source=t,this.program=e,this.location=s,this.texShape=i,this.texShape,this.isPacked=a,this.customUniforms=[]}populate(t){t.bind(this.source),t.useProgram(this.program),t.bindTextureToUnit(this.source,0,this.location);for(const e of this.customUniforms)t.setUniform(e.location,e.value)}}!function(t){t[t.REGULAR=0]="REGULAR",t[t.PACKED=1]="PACKED"}(X||(X={})),function(t){t.LINEAR="linear",t.NEAREST="nearest"}(tt||(tt={})),function(t){t.MAX="max",t.MIN="min"}(nt||(nt={})),function(t){t.RGBA32F="rgba32f",t.RGBA16F="rgba16f",t.RGBA8="rgba8"}(rt||(rt={})),function(t){t[t.TEXTURE_2D=3553]="TEXTURE_2D"}(ot||(ot={})),function(t){t[t.MAX_TEXTURE_SIZE=3379]="MAX_TEXTURE_SIZE",t[t.MAX_TEXTURE_IMAGE_UNITS=34930]="MAX_TEXTURE_IMAGE_UNITS"}(it||(it={})),function(t){t[t.FLOAT=5126]="FLOAT",t[t.HALF_FLOAT=36193]="HALF_FLOAT",t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE"}(st||(st={})),function(t){t[t.NEAREST=9728]="NEAREST",t[t.LINEAR=9729]="LINEAR"}(at||(at={})),function(t){t[t.CLAMP_TO_EDGE=33071]="CLAMP_TO_EDGE",t[t.REPEAT=10497]="REPEAT",t[t.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT"}(ut||(ut={})),function(t){t[t.RGBA=6408]="RGBA"}(lt||(lt={})),function(t){t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",t[t.FLOAT=5126]="FLOAT"}(ct||(ct={})),function(t){t[t.FRAMEBUFFER=36160]="FRAMEBUFFER"}(ht||(ht={})),function(t){t[t.COLOR_ATTACHMENT0=36064]="COLOR_ATTACHMENT0"}(pt||(pt={}));var gt=function(t,e){const s=`
    vec4 `+t+`;
    `+e+`
    return `+t+`;
  `;return`
  vec4 process(ivec2 pos) {
    `+s+`
  }
`};function mt(t,e,s,i){const a=`
    precision highp float;
    varying ivec2 ipos;
    uniform sampler2D source;
    uniform ivec2 sourceSize;
    `+s+`
    `+gt(t,e)+`
    void main() {
      gl_FragColor = process(ipos);
    }
  `,r=`
    precision highp float;
    attribute vec2 pos;
    attribute ivec2 ipos;
    uniform vec2形成了size;
    varying ivec2 v_ipos;
    void main() {
      v_ipos = ipos;
      gl_Position = vec4(2.0 * pos, 0, 1);
    }
  `;return{frag:a,vert:r}}var vt=new class{constructor(){}build(t,e){return`
  precision highp float;
  `+e+`
  uniform sampler2D source;
  uniform ivec2 sourceSize;
  varying vec2 uv;
  `+t+`
  void main() {
    gl_FragColor = sampleTexture(source, uv);
  }
`}},yt=new class{constructor(){}build(t,e){return`
  precision highp float;
  attribute vec2 pos;
  attribute vec2 uv;
  `+e+`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(2.0 * pos - 1.0, 0, 1);
  }
`}};function bt(t){if(null!=t.shape)return t.shape;const e=t.length,s=e>0&&null!=t[0].shape?t[0].shape:t[0].length,i=e>0&&s>0&&null!=t[0][0].shape?t[0][0].shape:t[0][0].length;return e>0&&s>0&&i>0&&null!=t[0][0][0].shape?t[0][0][0].shape:[e,s,i]}var _t=e.env().get("WEBGL_VERSION"),wt="webgl"+(t=>1===t?"":" "+t)(_t),kt="WebGL "+_t;var St=new Map;function Dt(t,e,s){const i=function(t,e,s){if(s&&e.rank>4)return W.build(e.inputs,e.shader);if(e.usesPackedTextures)return`
        `+function(t,e,s){const i=E(t.dtype),a="texel"+e,r="int32"===t.dtype?"round(res.outShape)":"res.outShape",n="int32"===t.dtype?`
    ivec4 outTexel = ivec4(round(texel.${s}));`:``;return`
  `+i+` `+a+` = getOutputTexel();
  float `+t.name+` = get`+t.name.charAt(0).toUpperCase()+t.name.slice(1)+`ByOutputTexel(`+a+`);
  `}(s.program.outputShape,"");const a=`void main() {
    `+b(s.program.outputShape)+`
    `+s.program.userCode+`
  }`,r=F("",s.program.outputShape),n=L(s.program.inputs,"");return"precision highp float;\n"+s.program.uniforms+"\n"+n+"\n"+r+"\n"+a}(e,0,s);const a=s.program;if(1===a.variableNames.length)return p(function(t,e,s){return`
    const ivec2 texShape = ivec2(${e[0]}, ${e[1]});
    `+y()+("int32"===s.program.outputShape.dtype||"float32"===s.program.outputShape.dtype?v():m())+" "+`
      `+function(t,e,s){const i=`
      `+t.userCode;let a;return"complex64"===e.dtype?a=`
      vec4 `+t.variableNames[0]+`(float v) {
        `+i+`
      }
      `:a="int32"===e.dtype?`
      float `+t.variableNames[0]+`(float v) {
        `+i+`
      }
      `:`
      vec2 `+t.variableNames[0]+`(float v) {
        `+i+`
      }
      `,a}(s.program,s.program.outputShape,"")}(0,t,s),s.program.outputShape);if(!s.program.packedInputs&&!s.program.packedOutput){const t=s.program.inputs.map(t=>R(t.name,t.rank)).join("\n");return`
      precision highp float;
      `+L(s.program.inputs,s.program.outputShape)+`
      void main() {
        `+function(t,e,s){const i=`
        `+t.userCode;let a;return"complex64"===e.dtype?a=`
        vec4 `+t.variableNames[0]+`(float v) {
          `+i+`
        }
        `:a="int32"===e.dtype?`
        float `+t.variableNames[0]+`(float v) {
          `+i+`
        }
        `:`
        vec2 `+t.variableNames[0]+`(float v) {
          `+i+`
        }
        `,a}(s.program,s.program.outputShape,"")+`
      }
    `}const r=`
    precision highp float;
    `+function(t,e){const s=t.variableNames.length,i=t.customUniforms;let a="";for(let t=0;t<i.length;t++){const{name:e,type:s}=i[t];a+=`uniform ${s} ${e};`}const r=t.variableNames.map(e=>t.inputs.find(t=>t.name===e));return a+r.map(t=>N(t,t.shape)).join("\n")+`
    vec2 halfCR = vec2(0.5, 0.5);
    `+r.map(t=>V(t,t.shape)).join("\n")+r.map(t=>B(t,t.shape)).join("\n")+`
      `+function(t,e){const s=`
        `+t.userCode;let i;return"complex64"===e.dtype?i=`
        vec4 `+t.variableNames[0]+`(float v) {
          `+s+`
        }
        `:i="int32"===e.dtype?`
        float `+t.variableNames[0]+`(float v) {
          `+s+`
        }
        `:`
        vec2 `+t.variableNames[0]+`(float v) {
          `+s+`
        }
        `,i}(s.program,s.program.outputShape,"")}(s.program,t,0);return r}(t,s.program,true),o=function(t,e,s){if(s)return`
        varying vec2 res_vTexcoord;
        void main() {
          res_vTexcoord = gl_Position.xy * 0.5 + 0.5;
          gl_Position = vec4(gl_Position.xy, 0.0, 1.0);
        }
        `;const i=e.rank;return`
      attribute vec4 res_position;
      varying vec2 res_vTexcoord;
      `+("int32"===e.dtype?"uniform ivec4 res_outShape;":"uniform vec4 res_outShape;")+`
      `+("int32"===e.dtype?"uniform ivec4 res_outTexShape;":"uniform vec4 res_outTexShape;")+`
      void main() {
        res_vTexcoord.xy = (res_position.xy + 1.0) * 0.5;
        gl_Position = res_position;
      }
    `}(0,s.program.outputShape,!0),l=dt();St.set(e,l),s.program,new et(l.program,l.uniformLocations,s.program.variableNames,s.program.inputs.length,1,s.program.enableShapeUniforms)},Et=new Map;function Ct(t){if(null==r.get(t)){let e;e=typeof OffscreenCanvas!="undefined"&&t instanceof OffscreenCanvas?new OffscreenCanvas(1,1).getContext("webgl"):document.createElement("canvas").getContext("webgl"),r.set(t,e),n++}return r.get(t)}class Ot{constructor(t,e,s){this.isPacked=s,this.gpgmu=t,this.program=e}updateOutput(t,e,s,i){this.output=new c(t,e,this.isPacked),this.output.internalFormat=s,this.output.textureFormat=i}updateInput(t,e,s,i){this.input=new c(t,e,this.isPacked),this.input.internalFormat=s,this.input.textureFormat=i}execute(t,e,s,i){this.gpgmu.setProgram(this.program),this.gpgmu.setInputMatrixTexture(this.input.texture,this.input.internalFormat,this.input.textureFormat,0),this.gpgmu.setOutputMatrixTexture(this.output.texture,e,s,i),this.gpgmu.executeProgram()}}var jt=new Map;class Pt{constructor(t){this.gpus=new Map,this.contexts=new Map;const e=Ct(t);this.contexts.set(t,new h(t,e)),this.gpus.set(t,new Ot(e,false)),this.programs=new Map}get(t){if(!this.contexts.has(t)){const e=Ct(t);this.contexts.set(t,new h(e,false)),this.gpus.set(t,new Ot(e,false))}return this.contexts.get(t)}compile(t,e,s){this.programs.has(e)||this.programs.set(e,this.gpus.get(t).compileProgram(s))}run(t){const{inputs:e,outputs:s,program:i}=t;this.gpus.get(e[0].texture.gl).runProgram(i)}getTexture(t){return this.gpus.get(t).createMatrixTexture(1,1)}deleteTexture(t,e){this.gpus.get(t).deleteMatrixTexture(e)}}function Tt(t,e,s,i,a,r,n){const o=a.program.variableNames;let l=`
    precision highp float;
    const vec2 halfCR = vec2(0.5, 0.5);
  `;if(null!=r)for(let t=0;t<o.length;t++){const e=o[t];l+=`uniform sampler2D ${e};
    `}l+=function(t,e,s,i,a){return`
    `+t.map(t=>N(t,s.program.outputShape)).join("\n")+`
    `+t.map(t=>V(t,s.program.outputShape)).join("\n")+`
    `+t.map(t=>B(t,s.program.outputShape)).join("\n")+`
    `+function(t,e,s,i,a){const r=`
      `+s.program.userCode,n=`
      `+t.map(t=>D(t.name,"",a.dtype)).join("\n")+`
      `+t.map(t=>k(t.name,t.name+"Value",a.dtype)).join("\n")+r;return S(t.map(t=>t.name),n,a.dtype)}(t,e,s,i,a)}(o.map(t=>i.get(t)),0,a,0,a.program.outputShape);const h=a.program.outputShape;return l+=`
    void main() {
      `+w(h,b(h))+`
    }
  `,new Z(r,function(t,e){const s=yt.build("",""),i=vt.build(t,""),a=dt();return jt.set(e,a),new et(a.program,a.uniformLocations,null,1,1)}(l,""),n,[])}var At="WEBGL_NUM_THREADS";class It{constructor(t,e){this.program=t,this.gpus=e,this.programs=new Map,this.programQueue=[],this.itemsToProcess=0,this.itemsProcessed=0}compile(t,e){const s=this.gpus.get(t);this.programs.has(e)||this.programs.set(e,new Q(s.compileProgram(t)))}run(t){this.itemsToProcess=t.length,this.itemsProcessed=0;for(let e=0;e<this.gpus.length;e++)this.programQueue.push(this.programs.get(e));this.process(t)}process(t){if(this.itemsProcessed===this.itemsToProcess)return;const e=t.slice(this.itemsProcessed,this.itemsProcessed+this.gpus.length);let s;s=typeof window=="undefined"?require("worker_threads"):{Worker:self.Worker};const i=new s.Worker(this.programQueue.shift(),{type:"module"}),a=this;i.postMessage(e),i.onmessage=s=>{a.itemsProcessed+=s.data,a.programQueue.push(i),a.process(t)}}}function Rt(t,e,s){if(s&&"complex64"===e)return t.reduce((t,e)=>t+`
      `,"");if(s&&"int32"===e)return t.reduce((t,e)=>t+`
      float get${e.name}() {
        return get${e.name}AtOutCoords();
      }
      `,"");if(s&&"float32"===e){const i="uniform sampler2D "+t.map(t=>t.name)+";",a="varying vec2 "+t.map(t=>"v_"+t.name)+";";return i+a+t.reduce((t,e)=>t+`
      vec2 get${e.name}() {
        return texture2D(${e.name}, v_${e.name}).rg;
      }
      `,"")}return t.reduce((t,e)=>t+`
    float get${e.name}() {
      return get${e.name}AtOutCoords();
    }
  `,"")}function Lt(t,e){const s=`
    `+t.map(t=>G(t.texture,t.name,e)).join("\n");return`
    `+s+`
    `+Rt(t,e)}function Mt(t,e,s,i){const a=F(i.program.userCode,i.program.outputShape),r=Lt(t,i.program.outputShape.dtype),n=e.uniforms;return a+n+r}function Ft(t,e,s){const i=new Map;for(let t=0;t<e.length;t++){const s=e[t];i.set(s.name,s.tensor)}const a=s.program.variableNames,r=Mt(a.map(t=>i.get(t)),s,i,s),n=dt();return jt.set(a.join(),n),new et(n.program,n.uniformLocations,a,e.length,1)}function Ut(t){return 1===t?"1":2===t?"2":3===t?"3":4===t?"4":""}function Nt(t){const e=t.rank;if(1===e)return"return texcoord.x;";{const t="shape["+String(e-1)+"]."+String("x"),s="texcoord."+String("xyzw"[e-1]);return`
    float flat = `+function t(e,s,i){const a="texcoord."+String("xyzw"[e-1]),r="shape["+String(e-1)+"]."+String("x");return 1===e?`${a}`:`${a} + ${r} * (`+t(e-1)+`)`}(e)+`;
    return flat;
  `}}function Bt(t){const e=t.rank,s="uniform float texShape["+String(e)+"];",i=`
  float get(vec2 uv) {
    float R = uv.y * texShape[0];
    float C = uv.x * texShape[1];
    return R * texShape[1] + C;
  }
  `,a=`
  float get(vec2 uv) {
    return uv.x;
  }
  `;return s+(1===e?a:i)}function Vt(t){const e=t.rank,s="uniform float shape["+String(e)+"];";return`
    `+s+`
    float getOffset(vec2 texcoord) {
      `+Nt(t)+`
    }
  `}function Gt(t){const e=t.rank,s="uniform float texShape["+String(e)+"];";return`
  `+s+`
  `+Bt(t)+`
  vec2 getUV(float flat) {
    `+function(t){const e=t.rank;if(1===e)return"return vec2(flat, 0.0);";const t="texShape["+String(e-1)+"]";return`
      float r = floor(flat / `+t+`);
      float c = mod(flat, `+t+`);
      return vec2(c, r);
    `}(t)+`
  }
`}function xt(t){const e="uniform float values["+String(t.size)+"];",s=Vt(t.shape),i=Gt(t.shape);return`
  `+e+`
  `+s+`
  `+i+`
  float getValue(vec2 uv) {
    float offset = getOffset(uv);
    return values[int(offset)];
  }
`}var qt=new class{constructor(){}build(t,e){const s=`
    precision highp float;
    uniform sampler2D source;
    `+e+`
    `+xt(t)+`
    void main() {
      gl_FragColor = vec4(getValue(gl_FragCoord.xy), 0, 0, 0);
    }
    `;return new Z(null,dt().program,null,[],[{name:"values",value:t.values}])}};var zt=new class{constructor(){}build(t,e,s){const i=`
    void main() {
      `+e+`
    }
    `,a=F("setOutput(result);",s);return"precision highp float;\n"+t+"\n"+a+"\n"+i}},Wt=new Map;function Kt(t,e,s,i){const a=function(t,e,s){const i=`
      precision highp float;
      varying vec2 uv;
      `+t+`
      void main() {
        `+e+`
      }
    `;return i},r=`float outputValue;
  `+s,n=dt();return Wt.set(i,n),new Ot(n.program,n.uniformLocations)}class Ht{constructor(t,e,s,i,a,r){this.program=t,this.uniformLocations=e,this.customUniformLocations=new Map,this.numInputs=s,this.numOutputs=i,this.enableShapeUniforms=a,this.variableNames=r}bind(t,e){t.useProgram(this.program);for(let s=0;s<this.numInputs;s++)t.bindTextureToUnit(e[s],s);if(this.enableShapeUniforms)for(let t=0;t<this.variableNames.length;t++){const s=this.variableNames[t],i=this.uniformLocations.get(s+"Shape"),a=this.uniformLocations.get(s+"TexShape");i&&a||e_("Variable "+s+" shape uniforms not found.");const r=e[t];t.uploadShapeUniform(i,r.shape),t.uploadShapeUniform(a,r.texData.texShape)}}}var Jt=new Map,Yt=new Map;class Zt{constructor(t){this.gpus=new Map,this.contexts=new Map;const e=Ct(t);this.contexts.set(t,new h(e,false)),this.gpus.set(t,new Ot(e,false)),this.programs=new Map}get(t){if(!this.contexts.has(t)){const e=Ct(t);this.contexts.set(t,new h(e,false)),this.gpus.set(t,new Ot(e,false))}return this.contexts.get(t)}compile(t,e,s,i){const a=s.map(t=>t.dataId).join("_")+"_"+i.dataId;Jt.has(a)||Jt.set(a,this.gpus.get(t).compileProgram(e))}run(t,e){const{program:s,inputs:i,output:a}=e,r=i.map(t=>t.dataId).join("_")+"_"+a.dataId;this.gpus.get(t).runProgram(s,i,a,Jt.get(r))}getTexture(t){return this.gpus.get(t).createMatrixTexture(1,1)}deleteTexture(t,e){this.gpus.get(t).deleteMatrixTexture(e)}getPixels(t,e,s){return this.gpus.get(t).getValuesFromTexture(e,s,s,1)}}function Qt(t){return 1===t.length?`${t[0]}`:2===t.length?`ivec2(${t.join(",")})`:3===t.length?`ivec3(${t.join(",")})`:4===t.length?`ivec4(${t.join(",")})`:"-1"}function Xt(t,e,s=!1,i=!1){const a=e.rank,r=Qt(e.shape),n=Qt(e.strides);if(s){return`
      `+t.map(t=>`uniform sampler2D ${t.name};`).join("\n")+`
      `+t.map(t=>`uniform int ${t.name}Shape[${a}];`).join("\n")+`
      `+t.map(t=>`uniform int ${t.name}Strides[${a-1}];`).join("\n")}const o=`const ivec${a} outShape=${r};
const ivec${a-1} outStrides=${n};
`;if(i){return t.map(t=>"uniform sampler2D "+t.name+";").join("\n")+o}return t.map(t=>"uniform sampler2D "+t.name+";").join("\n")}function te(t){const e=t.rank;if(e<2)return"return uv.x;";const s=t.shape.map((e,s)=>`coords[${s}]=mod(flat,float(${e}));
      flat=floor(flat/${e}.0);
`).join("\n"),i=t.strides.map((e,s)=>`offset+=coords[${s}]*${e}.0;`).join("\n");return`
  float offset=0.0;
  float flat=round(uv.x);
  float coords[${e}];
  ${s}
  ${i}
  return offset;
  `}function ee(t){return`
float get(vec2 uv) {
  return texture2D(source, uv).r;
}`}function ne(t){return`
  `+function(t){const e=t.rank;if(e<2)return"return flat;";const s=t.shape.map((e,s)=>`offset+=mod(coords[${s}],float(${e}))*${t.strides[s]}.0;`).join("\n");return`
  float offset=0.0;
  float coords[${e}]=vec2[](gl_FragCoord.xy);
  ${s}
  return offset;
  `}(t)}function re(t){const e=t.rank;let s="";for(let t=0;t<e;t++)s+=`float d${t} = floor(get(uv) / ${t>0?`float(${t.strides[t-1]})`:""}
  ) % float(${t.shape[t]});`;return s}function oe(t,e){const s=`
    `+t.map(t=>`uniform float ${t.name}Size;`).join("\n");return`
  precision highp float;
  varying vec2 uv;
  `+Xt(e,t,true,false)+s+t.map(t=>ee(t.shape)).join("\n")+t.map(t=>te(t.shape)).join("\n")+t.map(t=>ne(t.shape)).join("\n")+t.map(t=>re(t.shape)).join("\n")+`
  void main() {
    `+t.map(t=>`
    float v${t.name}=get(uv);
    float d${t.name} = get(uv);
    float d${t.name}_offset = get(uv);
    `).join("\n")+`
    gl_FragColor = vec4(0, 0, 0, 0);
  }
`}function ie(t){const e=`attribute vec2 position;
varying vec2 uv;
void main() {
  uv = position;
  gl_Position = vec4(position, 0, 1);
}
`;return`
  precision highp float;
  `+e}function se(t){const e=`attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0, 1);
}
`;return`
  precision highp float;
  `+e}class ae{constructor(t,e,s,i){this.program=t,this.uniformLocations=e,this.customUniformLocations=new Map,this.numInputs=s,this.numOutputs=i}bind(t,e){t.useProgram(this.program);for(let s=0;s<this.numInputs;s++)t.bindTextureToUnit(e[s],s)}}var ue=new Map,le=new Map;class ce{constructor(t){this.gpus=new Map,this.contexts=new Map;const e=Ct(t);this.contexts.set(t,new h(e,false)),this.gpus.set(t,new Ot(e,false)),this.programs=new Map}get(t){if(!this.contexts.has(t)){const e=Ct(t);this.contexts.set(t,new h(e,false)),this.gpus.set(t,new Ot(e,false))}return this.contexts.get(t)}compile(t,e,s){this.programs.has(e)||this.programs.set(e,this.gpus.get(t).compileProgram(s))}run(t,e){const{program:s,inputs:i,output:a}=e;this.gpus.get(t).runProgram(s,i,a,ue.get(a.dataId))}getTexture(t){return this.gpus.get(t).createMatrixTexture(1,1)}deleteTexture(t,e){this.gpus.get(t).deleteMatrixTexture(e)}getPixels(t,e,s){return this.gpus.get(t).getValuesFromTexture(e,s,s,1)}}function he(t,e,s,i,a,r){const n=`
    precision highp float;
    attribute vec2 position;
    varying vec2 uv;
    void main() {
      uv = position;
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
    }
    `,o=dt();return ue.set(e,o),new ae(o.program,o.uniformLocations,t,1)}class pe{constructor(t,e,s){this.program=t,this.gpus=e,this.programs=new Map,this.programQueue=[],this.itemsToProcess=0,this.itemsProcessed=0}compile(t,e,s){const i=s.inputs.map(t=>t.dataId).join("_")+"_"+s.output.dataId;ue.has(i)||ue.set(i,this.gpus.get(t).compileProgram(e))}run(t){this.itemsToProcess=t.length,this.itemsProcessed=0;for(let e=0;e<this.gpus.length;e++)this.programQueue.push(this.programs.get(e));this.process(t)}process(t){if(this.itemsProcessed===this.itemsToProcess)return;const e=t.slice(this.itemsProcessed,this.itemsProcessed+this.gpus.length);let s;s=typeof window=="undefined"?require("worker_threads"):{Worker:self.Worker};const i=new s.Worker(this.programQueue.shift(),{type:"module"}),a=this;i.postMessage(e),i.onmessage=s=>{a.itemsProcessed+=s.data,a.programQueue.push(i),a.process(t)}}}function de(t,e,s,i){const a=dt();return ue.set(e,a),new ae(a.program,a.uniformLocations,t,s)}function fe(t,e,s,i,a){const r=function(t,e,s,i,a){const r=zt.build(t,e,i),n=se(s),o=dt();return ue.set(a,o),new ae(o.program,o.uniformLocations,s.length,1)}(t,e,s,a),n=dt();return ue.set(i,n),new ae(n.program,n.uniformLocations,s.length,1)}var ge=new Map,me=new Map;function ve(t,e,s,i,a,r){const n=Xt(s,i,true,false),o=re(i),l=se(n);return ge.set(t,new ae(dt().program,dt().uniformLocations,s.length,1)),me.set(e,dt())}var ye,be,_e,we,ke;!function(t){t.COMPLEX64="complex64",t.FLOAT32="float32",t.INT32="int32",t.BOOL="bool"}(ye||(ye={})),function(t){t.NUMBER="number",t.STRING="string",t.BOOLEAN="boolean"}(be||(be={})),function(t){t.VERTEX="vertex",t.FRAGMENT="fragment",t.UNKNOWN="unknown"}(_e||(_e={})),function(t){t.SAMPLER_2D="sampler2D",t.SAMPLER_CUBE="samplerCube",t.INT="int",t.FLOAT="float",t.VEC2="vec2",t.VEC3="vec3",t.VEC4="vec4",t.IVEC2="ivec2",t.IVEC3="ivec3",t.IVEC4="ivec4",t.BOOL="bool",t.BVEC2="bvec2",t.BVEC3="bvec3",t.BVEC4="bvec4",t.MAT2="mat2",t.MAT3="mat3",t.MAT4="mat4"}(we||(we={})),function(t){t[t.DEFAULT=0]="DEFAULT",t[t.BY_CHANNEL=1]="BY_CHANNEL"}(ke||(ke={}));var Se="tf-core.js";function De(t){if(typeof fetch=="function")return fetch(t);if(typeof require=="function"){const e=require("fs");return new Promise((s,i)=>{e.readFile(t,(t,e)=>{t?i(t):s({buffer:async()=>e})})})}throw new Error("Could not fetch the model in this environment. Pre-load the model and pass it in the modelJson field.")}function Ee(t,e,s){if(null==s)return null;const i=s.find(e=>e.name===t);return null==i?null:i.data}function Ce(t){const e=t.match(/^tfjs_layers_model\/(.*)\/info$/);if(null!=e)return"LayersModel";const s=t.match(/^tfjs_graph_model\/(.*)\/info$/);return null!=s?"GraphModel":"JSON"}async function Oe(t,s){let i,a,r=0;const n={load:async()=>{if(null!=i)return i;const n=await s();if(n.modelTopology instanceof ArrayBuffer){const t=new Blob([n.modelTopology,n.weightData]);return i=await e.io.loadLayersModel(e.io.browserFiles([new File([t],"model.json")]))}if(n.modelJson instanceof ArrayBuffer){const t=new Blob([n.modelJson,n.weightData]);return i=await e.io.loadGraphModel(e.io.browserFiles([new File([t],"model.json")]))}const o=n.modelTopology||n.modelJson,l=new TextDecoder("utf-8");"string"!=typeof o&&(o=l.decode(o));const h=JSON.parse(o);return"layers-model"===h.format?i=await e.loadLayersModel({modelTopology:h,weightSpecs:n.weightSpecs,weightData:n.weightData,strict:n.strictLoading},void 0,n.weightPathPrefix):"graph-model"===h.format&&(i=await e.loadGraphModel({modelTopology:h,weightSpecs:n.weightSpecs,weightData:n.weightData,strict:n.strictLoading},void 0,n.weightPathPrefix)),i},dispose:()=>{i&&i.dispose(),i=null},estimateMemory:()=>{const e=null!=i?i.inputs.reduce((t,e)=>t+e.shape.reduce((t,e)=>t*(e>0?e:1),1),0):0,s=a?a.reduce((t,e)=>t+e.byteLength,0):0;return{uncompressedBytes:e+s,weightBytes:r}},predict:t=>{if(null==i)throw new Error("Model has not been loaded yet.");return i.predict(t)},execute:t=>{if(null==i)throw new Error("Model has not been loaded yet.");return i.execute(t)}};if(null!=t.modelUrl){const e=async()=>{const e=await t.modelUrl.load();return r=e.weightData.byteLength,a=await Promise.all(e.weightSpecs.map(async t=>{const s=new Float32Array(e.weightData,t.offset,t.size);return s})),e};n.load=async()=>e.io.loadLayersModel(t.modelUrl),n.predict=t=>(async()=>n.load().then(e=>e.predict(t)))(),n.execute=t=>(async()=>n.load().then(e=>e.execute(t)))(),n.estimateMemory=async()=>(await e(),n.estimateMemory())}return n}var je=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new Pt),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};var Pe=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new ce),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};var Te=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new Zt),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};var Ae=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new ce),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};var Ie=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new It),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};var Re=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new pe),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};var Le=new class{constructor(){this.backend=null,this.refCount=0}get(){return this.refCount++,this.backend||(this.backend=new ce),this.backend}release(){this.refCount--,0===this.refCount&&(this.backend=null)}};class Me{constructor(t,e,s,i,a,r){this.program=t,this.uniformLocations=e,this.customUniformLocations=new Map,this.numInputs=s,this.numOutputs=i,this.enableShapeUniforms=a,this.variableNames=r}bind(t,e){t.useProgram(this.program);for(let s=0;s<this.numInputs;s++)t.bindTextureToUnit(e[s],s);if(this.enableShapeUniforms)for(let t=0;t<this.variableNames.length;t++){const s=this.variableNames[t],i=this.uniformLocations.get(s+"Shape"),a=this.uniformLocations.get(s+"TexShape");i&&a||e_("Variable "+s+" shape uniforms not found.");const r=e[t];t.uploadShapeUniform(i,r.shape),t.uploadShapeUniform(a,r.texData.texShape)}}}var Fe=new Map;function Ue(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Ne(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Be(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Ve(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Ge(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function xe(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function qe(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Fe.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}var ze=new Map,We=new Map;function Ke(t,e,s,i,a){const r=function(t,e,s,i,a){const r=function(t,e,s,i,a){return`
      `+zt.build(t,e,i)+`
      `+se(s)}(t,e,s,a);return dt()}(t,e,s,i,a),n=function(t,e,s,i,a){const r=function(t,e,s,i,a){return`
      `+zt.build(t,e,i)+`
      `+se(s)}(t,e,s,a);return dt()}(t,e,s,i,a),o=dt();return ze.set(e,new Me(r.program,r.uniformLocations,s.length,1,a.program.enableShapeUniforms,a.program.variableNames)),We.set(e,new Me(n.program,n.uniformLocations,s.length,1,a.program.enableShapeUniforms,a.program.variableNames)),new Me(o.program,o.uniformLocations,s.length,1,a.program.enableShapeUniforms,a.program.variableNames)}var He=new Map;function Je(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return He.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Ye(t,e,s,i,a,r){const n=`
    `+ie(t)+`
    `+oe(t,s)+`
  `,o=dt();return He.set(s.program.variableNames.join("_"),o),new Me(o.program,o.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Ze(t){const e=`precision highp float;
uniform sampler2D source;
uniform float scale;
varying vec2 uv;
void main() {
  vec2 scaledUV = uv * scale;
  gl_FragColor = texture2D(source, scaledUV);
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("scale",i),new Me(i.program,i.uniformLocations,1,1)}function Qe(t){const e=`precision highp float;
uniform sampler2D source;
uniform float bias;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  color.rgb += bias;
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("bias",i),new Me(i.program,i.uniformLocations,1,1)}function Xe(t){const e=`precision highp float;
uniform sampler2D source;
uniform float scale;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  color.rgb *= scale;
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("scale",i),new Me(i.program,i.uniformLocations,1,1)}function tn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = max(color.rgb, value);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("value",i),new Me(i.program,i.uniformLocations,1,1)}function en(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = min(color.rgb, value);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("value",i),new Me(i.program,i.uniformLocations,1,1)}function nn(t){const e=`precision highp float;
uniform sampler2D source;
varying vec2 uv;
void main() {
  gl_FragColor = texture2D(source, uv);
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("noop",i),new Me(i.program,i.uniformLocations,1,1)}function rn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = pow(color.rgb, vec3(value));
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("pow",i),new Me(i.program,i.uniformLocations,1,1)}function on(t){const e=`precision highp float;
uniform sampler2D source;
uniform vec2 center;
uniform float scale;
uniform vec2 offset;
varying vec2 uv;

void main() {
  vec2 transformedUV = (uv - center) / scale + center - offset;
  gl_FragColor = texture2D(source, transformedUV);
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("transform",i),new Me(i.program,i.uniformLocations,1,1)}function sn(t){const e=`precision highp float;
uniform sampler2D source;
uniform vec2 size;
varying vec2 uv;

void main() {
  vec2 newUV = uv * size;
  gl_FragColor = texture2D(source, newUV);
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("resize",i),new Me(i.program,i.uniformLocations,1,1)}function an(t){const e=`precision highp float;
uniform sampler2D source;
varying vec2 uv;
void main() {
  gl_FragColor = texture2D(source, uv).bgra;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("bgr",i),new Me(i.program,i.uniformLocations,1,1)}function un(t){const e=`precision highp float;
uniform sampler2D source;
varying vec2 uv;
void main() {
  gl_FragColor = vec4(1.0 - texture2D(source, uv).rgb, 1.0);
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("invert",i),new Me(i.program,i.uniformLocations,1,1)}function ln(t){const e=`precision highp float;
uniform sampler2D source;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = vec4(vec3(gray), 1.0);
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("grayscale",i),new Me(i.program,i.uniformLocations,1,1)}function cn(t){const e=`precision highp float;
uniform sampler2D source;
varying vec2 uv;
void main() {
  vec4 color = texture2D(source, uv);
  float r = color.r;
  float g = color.g;
  float b = color.b;
  color.r = (0.393 * r + 0.769 * g + 0.189 * b);
  color.g = (0.349 * r + 0.686 * g + 0.168 * b);
  color.b = (0.272 * r + 0.534 * g + 0.131 * b);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("sepia",i),new Me(i.program,i.uniformLocations,1,1)}function hn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("brightness",i),new Me(i.program,i.uniformLocations,1,1)}function pn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  float a = (1.0 + value) / (1.0 - value);
  color.rgb = (color.rgb - 0.5) * a + 0.5;
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("contrast",i),new Me(i.program,i.uniformLocations,1,1)}function dn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("gamma",i),new Me(i.program,i.uniformLocations,1,1)}function fn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("exposure",i),new Me(i.program,i.uniformLocations,1,1)}function gn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  float a = (1.0 + value) / (1.0 - value);
  color.rgb = (color.rgb - 0.5) * a + 0.5;
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("saturation",i),new Me(i.program,i.uniformLocations,1,1)}function mn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("vibrance",i),new Me(i.program,i.uniformLocations,1,1)}function vn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("hue",i),new Me(i.program,i.uniformLocations,1,1)}function yn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("luma",i),new Me(i.program,i.uniformLocations,1,1)}function bn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("noise",i),new Me(i.program,i.uniformLocations,1,1)}function _n(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("denoise",i),new Me(i.program,i.uniformLocations,1,1)}function wn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("sharpen",i),new Me(i.program,i.uniformLocations,1,1)}function kn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("unsharpMask",i),new Me(i.program,i.uniformLocations,1,1)}function Sn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("vignette",i),new Me(i.program,i.uniformLocations,1,1)}function Dn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("lensBlur",i),new Me(i.program,i.uniformLocations,1,1)}function En(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("tiltShift",i),new Me(i.program,i.uniformLocations,1,1)}function Cn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("triangleBlur",i),new Me(i.program,i.uniformLocations,1,1)}function On(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("zoomBlur",i),new Me(i.program,i.uniformLocations,1,1)}function jn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("swirl",i),new Me(i.program,i.uniformLocations,1,1)}function Pn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb + value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("bulgePinch",i),new Me(i.program,i.uniformLocations,1,1)}function Tn(t){const e=`precision highp float;
uniform sampler2D source;
uniform float value;
varying vec2 uv;

void main() {
  vec4 color = texture2D(source, uv);
  color.rgb = clamp(color.rgb * value, 0.0, 1.0);
  gl_FragColor = color;
}
`,s=`precision highp float;
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = 0.5 * (position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
`,i=dt();return He.set("perspective",i),new Me(i.program,i.uniformLocations,1,1)}var An=new Map,In=new Map;function Rn(t,e,s,i){return An.set(s,i),new Me(i.program,i.uniformLocations,1,1,false,[])}function Ln(t,e,s,i,a){const r=function(t,e,s,i,a){return dt()}(t,e,s,i,a),n=function(t,e,s,i,a){return dt()}(t,e,s,i,a),o=dt();return An.set(s,new Me(r.program,r.uniformLocations,1,1,false,[])),In.set(s,new Me(n.program,n.uniformLocations,1,1,false,[])),new Me(o.program,o.uniformLocations,1,1,false,[])}var Mn=new Map;function Fn(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Mn.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Un(t,e,s){const i=new Map;for(let t=0;t<e.length;t++){const s=e[t];i.set(s.name,s.tensor)}const a=s.program.variableNames,r=Mt(a.map(t=>i.get(t)),s,i,s),n=dt();return Mn.set(a.join(),n),new Me(n.program,n.uniformLocations,e.length,1,true,a)}var Nn=new Map;function Bn(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Nn.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Vn(t){const e=dt();return Nn.set("custom",e),new Me(e.program,e.uniformLocations,1,1,false,[])}function Gn(t,e,s){const i=new Map;for(let t=0;t<e.length;t++){const s=e[t];i.set(s.name,s.tensor)}const a=s.program.variableNames,r=Mt(a.map(t=>i.get(t)),s,i,s),n=dt();return Nn.set(a.join(),n),new Me(n.program,n.uniformLocations,e.length,1,true,a)}function xn(t,e,s,i,a,r){const n=`
    precision highp float;
    attribute vec2 position;
    varying vec2 uv;
    void main() {
      uv = position;
      gl_Position = vec4(position * 2.0 - 1.0, 0, 1);
    }
    `,o=dt();return Nn.set(e,o),new Me(o.program,o.uniformLocations,t,1,false,[])}var qn=new Map;function zn(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return qn.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Wn(t,e,s){const i=new Map;for(let t=0;t<e.length;t++){const s=e[t];i.set(s.name,s.tensor)}const a=s.program.variableNames,r=Mt(a.map(t=>i.get(t)),s,i,s),n=dt();return qn.set(a.join(),n),new Me(n.program,n.uniformLocations,e.length,1,true,a)}function Kn(t,e,s){const i=s.program.variableNames,a=Mt(i.map(t=>e.get(t)),s,e,s),r=dt();return qn.set(i.join("_"),r),new Me(r.program,r.uniformLocations,s.program.inputs.length,1,true,i)}function Hn(t,e,s,i){const a=`
    `+t.map(t=>`uniform sampler2D ${t.name};`).join("\n")+`
    `+t.map(t=>`uniform int ${t.name}Shape[${s}];`).join("\n")+`
    `+t.map(t=>`uniform int ${t.name}Strides[${s-1}];`).join("\n"),r=`
    `+t.map(t=>`uniform int ${t.name}Width;`).join("\n")+`
    `+t.map(t=>`uniform int ${t.name}Height;`).join("\n"),n=se(""),o=dt();return qn.set(e,o),new Me(o.program,o.uniformLocations,t.length,1,true,i)}var Jn=new Map;function Yn(t,e,s,i){const a=s.program.variableNames.join("_"),r=dt();return Jn.set(a,r),new Me(r.program,r.uniformLocations,e,1,s.program.enableShapeUniforms,s.program.variableNames)}function Zn(t,e,s){const i=new Map;for(let t=0;t<e.length;t++){const s=e[t];i.set(s.name,s.tensor)}const a=s.program.variableNames,r=Mt(a.map(t=>i.get(t)),s,i,s),n=dt();return Jn.set(a.join(),n),new Me(n.program,n.uniformLocations,e.length,1,true,a)}function Qn(t,e,s,i){const a=`
    `+t.map(t=>`uniform sampler2D ${t.name};`).join("\n")+`
    `+t.map(t=>`uniform int ${t.name}Shape[${s}];`).join("\n")+`
    `+t.map(t=>`uniform int ${t.name}Strides[${s-1}];`).join("\n"),r=`
    `+t.map(t=>`uniform int ${t.name}Width;`).join("\n")+`
    `+t.map(t=>`uniform int ${t.name}Height;`).join("\n"),n=se(""),o=dt();return Jn.set(e,o),new Me(o.program,o.uniformLocations,t.length,1,true,i)}class Xn{constructor(){this.context=new h,this.program=null}get GPGPU(){const t=this.context.gl.getParameter(this.context.gl.VERSION).toLowerCase().indexOf("webgl 2.0")>-1;return new Ot(this.context.gl,t)}get TexUtil(){return this.context.textureManager.texUtil}compile(t){this.program=this.context.compileProgram(t)}run(t,e,s){const i=e.map(t=>t.dataId).join("_")+"_"+s.dataId;Jn.has(i)||Jn.set(i,this.program);const a=this.GPGPU;a.setProgram(Jn.get(i)),a.runProgram(t,e,s)}getPixels(t,e,s,i,a){return this.GPGPU.getValuesFromTexture(t,e,s,i,a)}}e.env().registerFlag(wt,!1),e.env().registerFlag(kt,e.env().get("HAS_WEBGL")),e.env().registerFlag("WEBGL_CHECK_NUMERICAL_PRECISION",!1),e.env().registerFlag("WEBGL_PACK_DEPTHWISECONV",!0),e.env().registerFlag("WEBGL_PACK_BINARY_OPERATIONS",!0),e.env().registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",!0),e.env().registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",!0),e.env().registerFlag("WEBGL_PACK_REDUCE",!0),e.env().registerFlag("WEBGL_LAZY_UPLOAD_PACKED_ENCODED_TEXTURE",!1),e.env().registerFlag("WEBGL_CONV_IM2COL",!0),e.env().registerFlag("WEBGL_MAX_TEXTURE_SIZE",-1),e.env().registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",-1),e.env().registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",!0),e.env().registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED",!1),e.env().registerFlag("WEBGL_FORCE_F16_TEXTURES",!1),e.env().registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",!0),e.env().registerFlag("WEBGL_PACK_CLIP",!0),e.env().registerFlag("WEBGL_PACK_NORMALIZATION",!0),e.env().registerFlag("WEBGL_PACK_AVGPOOL",!0),e.env().registerFlag("WEBGL_PACK_MAXPOOL",!0),e.env().registerFlag("WEBGL_FORCE_POWER_PREFERENCE_LOW_POWER_FOR_MOBILE",!1),e.env().registerFlag("SOFTWARE_WEBGL_ENABLED",!1),e.env().registerFlag("WEBGL_CPU_FORWARD",!1),e.env().registerFlag("WEBGL_PACK",!0),t.GPGPUContext=h,t.MathBackendWebGL=class extends e.KernelBackend{constructor(t){super(),this.gpgpu=t,this.dataIdMap=new Map,this.data=new Map}register(t,e,s){const i=new a(this,e,s,t);return this.data.set(i.id,i),i.id}write(t,e){const s=this.data.get(e);s.values=t,this.uploadToGPU(e)}read(t){return this.readSync(t)}readSync(t){const e=this.data.get(t);if(null==e.values){const s=this.gpgpu.createAndWaitForFence(),i=this.gpgpu.downloadMatrixFromTexture(e.texture,e.texShape[0],e.texShape[1]);this.gpgpu.waitForQueryAndGetTime(s),e.values=i}return e.values}disposeData(t){this.data.delete(t)}time(t){return this.gpgpu.runQuery(t)}memory(){return{unreliable:!1}}getNumOfCreatedFirstClassTextures(){return this.gpgpu.getNumOfCreatedFirstClassTextures()}getNumOfUsedFirstClassTextures(){return this.gpgpu.getNumOfUsedFirstClassTextures()}dispose(){this.gpgpu.dispose()}floatPrecision(){return 32}getBestTextureFormat(){return this.gpgpu.getBestTextureFormat()}getGPGPUContext(){return this.gpgpu}getCanvas(){return this.gpgpu.gl.canvas}getProgram(t){return this.gpgpu.getProgram(t)}},t.forceHalfFloat=function(){},t.webgl=new class{constructor(t){this.backend=t}register(t,e){this.backend.register(t.dataId,t.shape,t.dtype)}disposeData(t){this.backend.disposeData(t)}write(t,e){this.backend.write(e,t)}read(t){return this.backend.read(t)}readSync(t){return this.backend.readSync(t)}time(t){return this.backend.time(t)}memory(){return this.backend.memory()}floatPrecision(){return this.backend.floatPrecision()}getBestTextureFormat(){return this.backend.getBestTextureFormat()}getGPGPUContext(){return this.backend.getGPGPUContext()}getCanvas(){return this.backend.getCanvas()}getProgram(t){return this.backend.getProgram(t)}setData(t,e){const s=this.backend.getData(t);s.values=e,this.backend.uploadToGPU(t)}getData(t){return this.backend.getData(t)}},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=tf-backend-webgl.min.js.map```

---

