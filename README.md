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
