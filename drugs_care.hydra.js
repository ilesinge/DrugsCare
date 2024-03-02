// ctrl-option-o

require('hydra_lib.js');
window.gameLoop()// Detect game controler events
a.setBins(1)     // amount of bins (bands) to separate the audio spectrum
a.setSmooth(0.9) // audio reactivity smoothness from 0 to 1
a.setScale(10)   // loudness upper limit (maps to 0)
a.setCutoff(0.1) // loudness from which to start listening to (maps to 0)

hush()

s1.initScreen()
window.bc["x"] = 0
window.onButton = function(e){
  if (e.detail == "x") {
    switch (window.bc["x"] % 5) {
    case 1:
      hush()
      s0.initVideo("https://lapeanut.xyz/v/flock1.mp4")
      s1.initScreen()
      src(s1).modulateScale(osc(4)).blend(src(s0).saturate(10).invert().luma().scale(()=>0.99).diff(src(s0))).out()
      break;
    case 2:
      s0.initVideo("https://lapeanut.xyz/v/notice.mp4")
      src(o0).modulateHue(src(o0).scale(1.01),1).layer(src(s0).colorama(()=>Math.sin(time/2)*0.15+0.05).mask(shape(2,0.15).scale(4,1).repeat(1,40).modulateRotate(osc(5)).brightness(0))).out(o0)
      break;
    case 3:
      s0.initVideo("https://lapeanut.xyz/v/funambule.mp4")
      s1.initScreen()
      src(s0).saturate(5).diff(src(s0).luma().saturate(5).scrollX(-0.002,0).scrollY(-0.002,0).scale(()=>Math.sin(time)*0.05+1)).mask(shape(2).scale(1.5).modulateScale(osc(10).blend(solid(1,1,1)))).add(src(s1).brightness(-0.2).luma().scrollX(-0.005, -0.05).scrollY(-0.005,()=>0.05)).contrast(()=>a.fft[0]*2+0.3).out()
      break;
    case 4:
      s0.initVideo("https://lapeanut.xyz/v/train1.mp4")
      s1.initScreen()
      src(s0).saturate(10)
      .mult(src(s1).luma().blend(gradient(0.1))).contrast(1.2).layer(shape(100,0.25,0.5).luma().color(()=>Math.sin(time)/2+0.5,()=>Math.sin(time/3)/2+0.5,()=>Math.sin(time/5)/2+0.5).scale(1,0.1,10).repeat(30).modulateRotate(osc(1).mult(shape(10,10,10))).modulateScale(osc(0.1,0.001,-10).diff(noise(()=>2*a.fft[0])))).out()
      break;
    case 0:
      hush()
      s1.initScreen()
      src(s1).mask(gradient()).modulateScale(noise(()=>1*a.fft[0]
      ).brightness(-0.8)).blend(src(s1).modulateScale(osc(10).pixelate(20,20).scrollX(0,0.05).scrollY(0,-0.05))).out()
      break;
    }
  }
}


hush()
