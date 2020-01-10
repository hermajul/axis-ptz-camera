const https = require('https');
var md5 = require("crypto-js/md5");

class Axis {

    constructor(host, username, password, options){
        this.host = host;
        this.username = username;
        this.password = password;
        this.options = {
            username: this.username,
            password: this.password,
            host: this.host,
            rejectUnauthorized: false,
            sendImmediately: false
        }
       this.camera = options.camera ? options.camera : 1;

       this.ptz = new PTZ(this.options, this.camera);
       this.image = new Image(this.options, this.camera);
    }
    
}

class PTZ{

    constructor(options, camera){
        this.options = options;
        this.camera = camera;
    }
    async pan(angle){ //-180.0 ... 180.0
        var cmd = '/axis-cgi/com/ptz.cgi?pan=' + angle + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async tilt(angle){ //-180.0 ... 180.0
        var cmd = '/axis-cgi/com/ptz.cgi?tilt=' + angle + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async move(pos){ // home | up | down | left | right | upleft | upright | downleft | downright | stop
        var cmd = '/axis-cgi/com/ptz.cgi?move=' + pos + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async zoom(steps){ //1 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?zoom=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async focus(steps){ //1 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?focus=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async iris(steps){ //1 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?iris=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async brightness(steps){ //1 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?brightness=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async rpan(angle){ //-360.0 ... 360.0
        var cmd = '/axis-cgi/com/ptz.cgi?rpan=' + angle + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async rtilt(angle){ //-360.0 ... 360.0
        var cmd = '/axis-cgi/com/ptz.cgi?rtilt=' + angle + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async rzoom(steps){ //-999 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?rzoom=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async rfocus(steps){ //-9999 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?rfocus=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async riris(steps){ //-9999 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?riris=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async rbrightness(steps){ //-999 ... 9999
        var cmd = '/axis-cgi/com/ptz.cgi?rbrightness=' + steps + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async autofocus(state){ //true | false
        var cmd = '/axis-cgi/com/ptz.cgi?autofocus=' + (state ? 'on':'off')  + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async autoiris(state){ //true | false
        var cmd = '/axis-cgi/com/ptz.cgi?autoiris=' + (state ? 'on':'off') + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async continuouspantiltmove(panSpeed, tiltSpeed){ //-100 ... 100,-100 ... 100
        var cmd = '/axis-cgi/com/ptz.cgi?continuouspantiltmove='+panSpeed+',' + tiltSpeed + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async continuouszoommove(move){ //-100 ... 0 ... 100
        var cmd = '/axis-cgi/com/ptz.cgi?continuouszoommove='+move + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async continuousfocusmove(move){ //-100 ... 0 ... 100
        var cmd = '/axis-cgi/com/ptz.cgi?continuousfocusmove='+move + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async continuousirismove(move){ //-100 ... 0 ... 100
        var cmd = '/axis-cgi/com/ptz.cgi?continuousirismove='+move + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async continuousbrightnessmove(move){ //-100 ... 0 ... 100
        var cmd = '/axis-cgi/com/ptz.cgi?continuousbrightnessmove='+move + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async gotoserverpresetname(presetname){ //string
        var cmd = '/axis-cgi/com/ptz.cgi?gotoserverpresetname='+presetname + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async gotoserverpresetno(presetno){ // int 1... 
        var cmd = '/axis-cgi/com/ptz.cgi?gotoserverpresetno='+presetno + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async gotodevicepreset(presetno){ // int 1... 
        var cmd = '/axis-cgi/com/ptz.cgi?gotodevicepreset='+presetno + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async speed(speed){ // 1 ... 100
        var cmd = '/axis-cgi/com/ptz.cgi?speed='+speed + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async ircutfilter(state){ //on | off | auto
        var cmd = '/axis-cgi/com/ptz.cgi?ircutfilter=' + state + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async backlight(state){ //true | false
        var cmd = '/axis-cgi/com/ptz.cgi?backlight=' + (state ? 'on':'off') + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async query(str){ // limits | mode | position | presetposall | presetposcam | speed
        var cmd = '/axis-cgi/com/ptz.cgi?query=' + str+ '&camera=' + this.camera;
        return request(cmd, this.options);            
    }
    async info(){
        var cmd = '/axis-cgi/com/ptz.cgi?info=1' + '&camera=' + this.camera;
        return request(cmd, this.options);            
    }
    async setserverpresetname(presetname){ //string
        var cmd = '/axis-cgi/com/ptz.cgi?setserverpresetname='+presetname + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async setserverpresetno(presetno){ // int 1... 
        var cmd = '/axis-cgi/com/ptz.cgi?setserverpresetno='+presetno + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async removeserverpresetname(presetname){ //string
        var cmd = '/axis-cgi/com/ptz.cgi?removeserverpresetname='+presetname + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async removeserverpresetno(presetno){ // int 1... 
        var cmd = '/axis-cgi/com/ptz.cgi?removeserverpresetno='+presetno + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async center(x, y){ //imagewidth[n], imageheight[n]
        var cmd = '/axis-cgi/com/ptz.cgi?center='+x+',' + y + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }
    async areazoom(x, y, z){ //imagewidth[n], imageheight[n]
        var cmd = '/axis-cgi/com/ptz.cgi?areazoom='+x+','+y+','+z + '&camera=' + this.camera;
        return requestPTZ(cmd, this.options);            
    }

    async movePrediction(state){ //imagewidth[n], imageheight[n]
        var cmd = '/axis-cgi/param.cgi?action=update&PTZ.UserAdv.MovePrediction';
        return request(cmd, this.options);            
    }
    async reachPos(){
        var posOld = await this.query('position')
        var posNew = null;
        while(true){
            posNew = await this.query('position')
            if(posOld===posNew){
                return true;
            }
            posOld=posNew;
        }
        
    }
}  

class Image{
    constructor(options, camera){
        this.options = options;
        this.camera = camera;
    }
    async snapshotJPEG(options){ //compresion
        var cmd = '/axis-cgi/jpg/image.cgi'+ '?camera=' + this.camera;
        Object.keys(options).forEach(function(k){
            //console.log(k + ' - ' + options[k]);
            cmd = cmd + '&' + k + '='+options[k];
        });
        var raw = await request(cmd, this.options); 
        return new Buffer.from(raw,'latin1')    
    }
}

module.exports = Axis;


var params = null;
var ha1=null;

function requestPTZ(cmd, options){
    //console.log(cmd)
    
    return new Promise(resolve => {
        options.path = cmd;
            https.get(options, (res) => {
                try {  
                    //console.log(res);
                    if(res.headers['www-authenticate']){
                        var challengeParams = parseDigest(res.headers['www-authenticate'])
                        ha1 = md5(options.username + ':' + challengeParams.realm + ':' + options.password)
                        var ha2 = md5('GET:' + options.path)
                        var response = md5(ha1 + ':' + challengeParams.nonce + ':1::auth:' + ha2)
                        var authRequestParams = {
                            username : options.username,
                            realm : challengeParams.realm,
                            nonce : challengeParams.nonce,
                            uri : options.path, 
                            qop : challengeParams.qop,
                            response : response,
                            nc : '1',
                            cnonce : '',
                        }
                        params = authRequestParams;
                        options.headers = { 'Authorization' : renderDigest(params) }
                        https.get(options, (res) => {
                            resolve(res.statusCode==204)
                        });
                    }else{
                        var ha2 = md5('GET:' + options.path)
                        params.response = md5(ha1 + ':' + params.nonce + ':1::auth:' + ha2)
                        params.uri = options.path
                        options.headers = { 'Authorization' : renderDigest(params) }
                        https.get(options, (res) => {
                            resolve(res.statusCode==204)
                        });
                    }
                    
                } catch (error) {                    
                    console.log(error)
                    //resolve(false)   
                }

            }).on("error", (err) => {
                resolve(false)
                console.log("Error: " + err.message);
        });
    });
}

function request(cmd, options){
    //console.log(cmd)
    
    return new Promise(resolve => {
        options.path = cmd;
            https.get(options, (res) => {
                try {  
                    //console.log(res.headers);
                    if(res.headers['www-authenticate']){
                        var challengeParams = parseDigest(res.headers['www-authenticate'])
                        ha1 = md5(options.username + ':' + challengeParams.realm + ':' + options.password)
                        var ha2 = md5('GET:' + options.path)
                        var response = md5(ha1 + ':' + challengeParams.nonce + ':1::auth:' + ha2)
                        var authRequestParams = {
                            username : options.username,
                            realm : challengeParams.realm,
                            nonce : challengeParams.nonce,
                            uri : options.path, 
                            qop : challengeParams.qop,
                            response : response,
                            nc : '1',
                            cnonce : '',
                        }
                        params = authRequestParams;
                        options.headers = { 'Authorization' : renderDigest(params) }
                        https.get(options, (res) => {
                            resolve(res.statusCode==204)
                        });
                    }else{
                        var ha2 = md5('GET:' + options.path)
                        params.response = md5(ha1 + ':' + params.nonce + ':1::auth:' + ha2)
                        params.uri = options.path
                        options.headers = { 'Authorization' : renderDigest(params) }
                        https.get(options, (res) => {
                            res.setEncoding('latin1')
                            var content = ''
                            res.on('data', function(chunk) {
                                content += chunk
                            }).on('end', function() {
                                resolve(content)
                            })
                        });
                    }
                    
                } catch (error) {                    
                    console.log(error)
                    //resolve(false)   
                }

            }).on("error", (err) => {
                resolve(false)
                console.log("Error: " + err.message);
        });
    });
}

function parseDigest(header){
    var prefix = "Digest ";
    var challenge = header.substr(header.indexOf(prefix) + prefix.length);
    var parts = challenge.split(",");
    var length = parts.length;
    var params = {};
    for (var i = 0; i < length; i++) {
      var part = parts[i].match(/^\s*?([a-zA-Z0-0]+)="(.*)"\s*?$/);
      if (part && part.length > 2) {
        params[part[1]] = part[2];
      }
    }

    return params;
}
function renderDigest(params) {
    var parts = [];
    for (var i in params) {
      parts.push(i + "=\"" + params[i] + "\"");
    }
    return "Digest " + parts.join(",");
} 