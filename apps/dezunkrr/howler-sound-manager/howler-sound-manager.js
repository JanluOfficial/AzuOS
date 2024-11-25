var gdjs;(function(f){const g=new f.Logger("Audio manager"),m={preload:!0,onplayerror:(d,e)=>g.error("Can't play an audio file: "+e),onloaderror:(d,e)=>g.error("Error while loading an audio file: "+e)},w=d=>d>1?1:d<0?0:d;class H{constructor(e,t,s,i){this._id=null;this._oncePlay=[];this._onPlay=[];this._howl=e,this._initialVolume=w(t),this._loop=s,this._rate=i}isLoaded(){return this._howl.state()==="loaded"}play(){if(this.isLoaded()){const e=this._howl.play(this._id===null?"__default":this._id);this._id=e,this._howl.volume(this._initialVolume,e),this._howl.loop(this._loop,e),this._howl.rate(f.HowlerSoundManager.clampRate(this._rate),e),this._onPlay.forEach(t=>{this.on("play",t),t(e)}),this._oncePlay.forEach(t=>t(e)),this._onPlay=[],this._oncePlay=[]}else this._howl.once("load",()=>this.play());return this}pause(){return this._id!==null&&this._howl.pause(this._id),this}stop(){return this._id!==null&&this._howl.stop(this._id),this}playing(){return(this._id!==null?this._howl.playing(this._id):!0)||!this.isLoaded()}paused(){return!this.playing()}stopped(){return this.paused()&&this.getSeek()===0}getRate(){return this._rate}setRate(e){return this._rate=e,this._id!==null&&(e=f.HowlerSoundManager.clampRate(e),this._howl.rate(e,this._id)),this}getLoop(){return this._loop}setLoop(e){return this._loop=e,this._id!==null&&this._howl.loop(e,this._id),this}getVolume(){return this._id===null?this._initialVolume:this._howl.volume(this._id)}setVolume(e){return this._initialVolume=w(e),this._id!==null&&this._howl.volume(this._initialVolume,this._id),this}getMute(){return this._id===null?!1:this._howl.mute(this._id)}setMute(e){return this._id!==null&&this._howl.mute(e,this._id),this}getSeek(){return this._id===null?0:this._howl.seek(this._id)}setSeek(e){return this._id!==null&&this._howl.seek(e,this._id),this}getSpatialPosition(e){return this._id===null?0:this._howl.pos(this._id)[e==="x"?0:e==="y"?1:2]}setSpatialPosition(e,t,s){return this._id!==null&&this._howl.pos(e,t,s,this._id),this}fade(e,t,s){return this._id!==null&&this._howl.fade(w(e),w(t),s,this._id),this}on(e,t){return e==="play"?this._id===null?this._onPlay.push(t):this._howl.on(e,t,this._id):this._id===null?this.once("play",()=>this.on(e,t)):this._howl.on(e,t,this._id),this}once(e,t){return e==="play"?this._id===null?this._oncePlay.push(t):this.playing()?t(this._id):this._howl.once(e,t,this._id):this._id===null?this.once("play",()=>this.once(e,t)):this._howl.once(e,t,this._id),this}off(e,t){return this._id!==null&&this._howl.off(e,t,this._id),this}}f.HowlerSound=H;class b{constructor(e,t){this._loadedMusics={};this._loadedSounds={};this._availableResources={};this._globalVolume=100;this._sounds={};this._musics={};this._freeSounds=[];this._freeMusics=[];this._pausedSounds=[];this._paused=!1;this._resources=e,this._resourcesLoader=t;const s=this;document.addEventListener("deviceready",function(){document.addEventListener("pause",function(){const i=s._freeSounds.concat(s._freeMusics);for(let o in s._sounds)s._sounds.hasOwnProperty(o)&&i.push(s._sounds[o]);for(let o in s._musics)s._musics.hasOwnProperty(o)&&i.push(s._musics[o]);for(let o=0;o<i.length;o++){const l=i[o];!l.paused()&&!l.stopped()&&(l.pause(),s._pausedSounds.push(l))}s._paused=!0},!1),document.addEventListener("resume",function(){for(let i=0;i<s._pausedSounds.length;i++){const o=s._pausedSounds[i];o.stopped()||o.play()}s._pausedSounds.length=0,s._paused=!1},!1)})}setResources(e){this._resources=e}static clampRate(e){return e>4?4:e<.5?.5:e}_getFileFromSoundName(e){return this._availableResources.hasOwnProperty(e)&&this._availableResources[e].file?this._availableResources[e].file:e}_storeSoundInArray(e,t){for(let s=0,i=e.length;s<i;++s)if(e[s]!==null&&e[s].stopped())return e[s]=t,t;return e.push(t),t}createHowlerSound(e,t,s,i,o){const l=this._getFileFromSoundName(e),r=t?this._loadedMusics:this._loadedSounds;return r.hasOwnProperty(l)||(r[l]=new Howl(Object.assign({src:[this._resourcesLoader.getFullUrl(l)],html5:t,xhr:{withCredentials:this._resourcesLoader.checkIfCredentialsRequired(l)},volume:0},m))),new f.HowlerSound(r[l],s,i,o)}loadAudio(e,t){const s=this._getFileFromSoundName(e),i=t?this._loadedMusics:this._loadedSounds;i.hasOwnProperty(s)||(i[s]=new Howl(Object.assign({src:[this._resourcesLoader.getFullUrl(s)],html5:t,xhr:{withCredentials:this._resourcesLoader.checkIfCredentialsRequired(s)},volume:0},m)))}unloadAudio(e,t){const s=this._getFileFromSoundName(e),i=t?this._loadedMusics:this._loadedSounds;if(!i[s])return;const o=i[s];function l(r){for(let _ in r)r[_]&&r[_]._howl===o&&(r[_].stop(),delete r[_])}l(this._freeMusics),l(this._freeSounds),l(Object.values(this._musics)),l(Object.values(this._sounds)),l(this._pausedSounds),i[s].unload(),delete i[s]}unloadAll(){Howler.unload(),this._freeSounds.length=0,this._freeMusics.length=0,this._sounds={},this._musics={},this._pausedSounds.length=0,this._loadedMusics={},this._loadedSounds={}}playSound(e,t,s,i){const o=this.createHowlerSound(e,!1,s/100,t,i);this._storeSoundInArray(this._freeSounds,o),o.once("play",()=>{this._paused&&(o.pause(),this._pausedSounds.push(o))}),o.play()}playSoundOnChannel(e,t,s,i,o){this._sounds[t]&&this._sounds[t].stop();const l=this.createHowlerSound(e,!1,i/100,s,o);this._sounds[t]=l,l.once("play",()=>{this._paused&&(l.pause(),this._pausedSounds.push(l))}),l.play()}getSoundOnChannel(e){return this._sounds[e]||null}playMusic(e,t,s,i){const o=this.createHowlerSound(e,!0,s/100,t,i);this._storeSoundInArray(this._freeMusics,o),o.once("play",()=>{this._paused&&(o.pause(),this._pausedSounds.push(o))}),o.play()}playMusicOnChannel(e,t,s,i,o){this._musics[t]&&this._musics[t].stop();const l=this.createHowlerSound(e,!0,i/100,s,o);this._musics[t]=l,l.once("play",()=>{this._paused&&(l.pause(),this._pausedSounds.push(l))}),l.play()}getMusicOnChannel(e){return this._musics[e]||null}setGlobalVolume(e){this._globalVolume=e,this._globalVolume>100&&(this._globalVolume=100),this._globalVolume<0&&(this._globalVolume=0),Howler.volume(this._globalVolume/100)}getGlobalVolume(){return this._globalVolume}clearAll(){Howler.stop(),this._freeSounds.length=0,this._freeMusics.length=0,this._sounds={},this._musics={},this._pausedSounds.length=0}preloadAudio(e,t,s){s=s||this._resources;const i={};for(let a=0,u=s.length;a<u;++a){let n=s[a];if(n.file&&n.kind==="audio"){if(this._availableResources[n.name])continue;this._availableResources[n.name]=n,i[n.file]=(i[n.file]||[]).concat(n)}}const o=Object.keys(i),l=o.length;if(l===0)return t(l);let r=0;const _=(a,u)=>{if(u&&g.warn("There was an error while preloading an audio file: "+u),r++,r===l)return t(l);e(r,l),y()},S=(a,u,n)=>{const c=n?this._loadedMusics:this._loadedSounds;c[a]=new Howl(Object.assign({},m,{src:[this._resourcesLoader.getFullUrl(a)],onload:u,onloaderror:u,html5:n,xhr:{withCredentials:this._resourcesLoader.checkIfCredentialsRequired(a)},volume:0}))},y=()=>{if(!o.length)return;const a=o.shift(),u=i[a][0];let n=0;const c=(h,p)=>{n--,n||_(h,p)};if(u.preloadAsMusic&&(n++,S(a,c,!0)),u.preloadAsSound)n++,S(a,c,!1);else if(u.preloadInCache){n++;const h=new XMLHttpRequest;h.withCredentials=this._resourcesLoader.checkIfCredentialsRequired(a),h.addEventListener("load",c),h.addEventListener("error",p=>c(p,"XHR error: "+a)),h.addEventListener("abort",p=>c(p,"XHR abort: "+a)),h.open("GET",this._resourcesLoader.getFullUrl(a)),h.send()}n||_()};y()}}f.HowlerSoundManager=b,f.SoundManager=b})(gdjs||(gdjs={}));
//# sourceMappingURL=howler-sound-manager.js.map