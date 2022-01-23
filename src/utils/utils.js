const click_sound = "mixkit-select-click-1109";
const click_sound2 = "click";
const click_sound3 = "click2";
const click_sound_path = "../assets/audio/";
const mp3_postfix = "mp3";
const wav_postfix = "wav";
const ogg_postfix = "ogg";

function parse_name(){

}

function playSound(name) {
    let url = click_sound_path+click_sound3+'.'+ogg_postfix;
    var audio = new Audio();
    audio.src = url;
    console.log(`AUDIO url:${url}`);
    return audio.play();
}

export {playSound}
