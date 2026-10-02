const tracks=[
  {title:"Crni leptir",src:"assets/audio/crni-leptir.mp3"},
  {title:"Zima je",src:"assets/audio/zima-je.mp3"},
  {title:"Zažmuri",src:"assets/audio/zazmuri.mp3"},
  {title:"Yugo",src:"assets/audio/yugo.mp3"},
  {title:"Tuge od sna",src:"assets/audio/tuge-od-sna.mp3"},
  {title:"Želim ti reći",src:"assets/audio/zelim-ti-reci.mp3"},
  {title:"Eh da je tuga snijeg",src:"assets/audio/eh-da-je-tuga-snijeg.mp3"},
  {title:"Da si tu",src:"assets/audio/da-si-tu.mp3"},
  {title:"Cipele",src:"assets/audio/cipele.mp3"},
  {title:"Gdje Dunav ljubi nebo",src:"assets/audio/gde-dunav-ljubi-nebo.mp3"}
];
const audio=document.querySelector("#audio"),gate=document.querySelector("#soundGate"),dock=document.querySelector("#audioDock"),dockPlay=document.querySelector("#dockPlay"),largePlay=document.querySelector("#largePlay"),largeCard=document.querySelector(".now-playing-card"),dockTitle=document.querySelector("#dockTitle"),largeTitle=document.querySelector("#largeTrackTitle"),seek=document.querySelector("#seek"),currentTime=document.querySelector("#currentTime"),duration=document.querySelector("#duration"),mute=document.querySelector("#mute"),trackButtons=[...document.querySelectorAll(".track")];
let activeTrack=0;
document.body.classList.add("gate-open");
document.querySelector("#year").textContent=new Date().getFullYear();
function formatTime(value){if(!Number.isFinite(value))return"0:00";return`${Math.floor(value/60)}:${String(Math.floor(value%60)).padStart(2,"0")}`}
function setPlayingState(isPlaying){const icon=isPlaying?"Ⅱ":"▶";dockPlay.textContent=icon;largePlay.textContent=icon;largeCard.classList.toggle("playing",isPlaying);const label=`${isPlaying?"Pauziraj":"Pusti"} ${tracks[activeTrack].title}`;dockPlay.setAttribute("aria-label",label);largePlay.setAttribute("aria-label",label);trackButtons.forEach((button,index)=>{button.querySelector(".track-icon").textContent=index===activeTrack&&isPlaying?"Ⅱ":"▶"})}
async function play(){try{await audio.play();setPlayingState(true);dock.classList.add("visible")}catch{setPlayingState(false)}}
function togglePlay(){audio.paused?play():audio.pause()}
function selectTrack(index,shouldPlay=true){activeTrack=index;audio.src=tracks[index].src;dockTitle.textContent=tracks[index].title;largeTitle.textContent=tracks[index].title;trackButtons.forEach((button,i)=>button.classList.toggle("active",i===index));setPlayingState(false);if(shouldPlay)play()}
function closeGate(withSound){gate.classList.add("closed");document.body.classList.remove("gate-open");dock.classList.add("visible");if(withSound)play()}
document.querySelector("#enterWithSound").addEventListener("click",()=>closeGate(true));
document.querySelector("#enterSilent").addEventListener("click",()=>closeGate(false));
dockPlay.addEventListener("click",togglePlay);largePlay.addEventListener("click",togglePlay);trackButtons.forEach(button=>button.addEventListener("click",()=>selectTrack(Number(button.dataset.track))));
audio.addEventListener("play",()=>setPlayingState(true));audio.addEventListener("pause",()=>setPlayingState(false));audio.addEventListener("loadedmetadata",()=>{duration.textContent=formatTime(audio.duration)});audio.addEventListener("timeupdate",()=>{currentTime.textContent=formatTime(audio.currentTime);seek.value=audio.duration?String(audio.currentTime/audio.duration*100):"0"});audio.addEventListener("ended",()=>selectTrack((activeTrack+1)%tracks.length));seek.addEventListener("input",()=>{if(audio.duration)audio.currentTime=Number(seek.value)/100*audio.duration});mute.addEventListener("click",()=>{audio.muted=!audio.muted;mute.textContent=audio.muted?"◖×":"◖))";mute.setAttribute("aria-label",audio.muted?"Uključi zvuk":"Isključi zvuk")});
const menuToggle=document.querySelector(".menu-toggle"),siteNav=document.querySelector("#siteNav");menuToggle.addEventListener("click",()=>{const isOpen=menuToggle.getAttribute("aria-expanded")==="true";menuToggle.setAttribute("aria-expanded",String(!isOpen));siteNav.classList.toggle("open",!isOpen)});siteNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{siteNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
const header=document.querySelector(".site-header");window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>30),{passive:true});
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}})},{threshold:.14});document.querySelectorAll(".reveal").forEach(element=>revealObserver.observe(element));
