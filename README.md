# axis-ptz-camera
nodejs client for axis network ptz functions

## Getting Started
npm i axis-ptz-camera

## Examples

example for relative pan 50 degree
```javascript

var Axis = require('Axis');
var axis = new Axis("host","username","password",{'camera'='1'});

axis.ptz.rpan('50').then(async (res)=>{
    console.log(res);   //true    
})
```

example for relative pan 50 degree and waiting for reach position
```javascript

var Axis = require('Axis');
var axis = new Axis("host","username","password",{'camera'='1'});

axis.ptz.rpan('50').then(async (res)=>{
    console.log(res);   //true 
    axis.ptz.reachPos().then((reached) => {
        console.log(reached)  // true when reached
    })
})
```

##API
```javascript
// PTZ functions

axis.ptz.pan(angle) // pan camera => angle in degrees [-180.0 ... 180.0]
axis.ptz.tilt(angle) // tilt camera => angle in degrees [-180.0 ... 180.0]
axis.ptz.move(pos) // movement command as string [home | up | down | left | right | upleft | upright | downleft | downright | stop]
axis.ptz.zoom(steps) // zoom in steps [1 ... 9999]
axis.ptz.focus(steps) // zoom in steps [1 ... 9999]
axis.ptz.iris(steps) // zoom in steps [1 ... 9999]
axis.ptz.brightness(steps) // zoom in steps [1 ... 9999]

axis.ptz.rpan(angle) // pan camera relative => angle in degrees [-360.0 ... 360.0]
axis.ptz.rtilt(angle) // tilt camera relative =>  [-360.0 ... 360.0]
axis.ptz.rzoom(steps) // zoom camera relative => zoom in steps [-999 ... 999]
axis.ptz.rfocus(steps) // focus camera relative => focus in steps [-999 ... 999]
axis.ptz.riris(steps) // iris camera relative => iris in steps [-999 ... 999]
axis.ptz.rbrightness(steps) // brightness relative => brightness in steps [-999 ... 999]

axis.ptz.autofocus(state) // set autofocus [ true | false]
axis.ptz.autoiris(state) // set autoiris [ true | false]
axis.ptz.continuouspantiltmove(panSpeed, tiltSpeed) // continuous moving camera speed [-100 ... 0 ... 100] 0=stop 
axis.ptz.continuouszoommove(speed) // continuous zoom speed [-100 .. 100] 0=stop
axis.ptz.continuousfocusmove(speed) // continuous zoom speed [-100 .. 100] 0=stop
axis.ptz.continuousirismove(speed) // continuous zoom speed [-100 .. 100] 0=stop
axis.ptz.continuousbrightnessmove(speed) // continuous zoom speed [-100 .. 100] 0=stop

axis.ptz.gotoserverpresetname(presetname) // presetname as string
axis.ptz.gotoserverpresetno(presetname) // presetno as number
axis.ptz.setserverpresetname(presetname) // presetname as string
axis.ptz.setserverpresetno(presetname) // presetno as number
axis.ptz.removeserverpresetname(presetname) // presetname as string
axis.ptz.removeserverpresetno(presetname) // presetno as number

axis.ptz.speed(speed) //camera movement speed [1..100]
axis.ptz.ircutfilter(state) // set ircut filter [on | off | auto]
axis.ptz.backlight(state) // set backlight compensation [ true | false]
axis.ptz.query(str) // get specific device infos [ limits | mode | position | presetposall | presetposcam | speed ]
axis.ptz.info() // get device infos

axis.ptz.center(x,y) // center camera to pixel of actual image 
axis.ptz.areazoom(x,y,z) // zoom camera to pixel of actual image witdh z as zoomfactor

axis.ptz.reachPos() // function to wait for finished movements

//Image Functions
var options = {
        resolution: '1920x1080',
        compression: 0,
        colorlevel:100,
        color:1,
}    
var res = await axis.image.snapshotJPEG(options)
console.log(res.toString('base64')) 
```
