document.getElementById('difficulty').addEventListener('change', function() {
  console.log('You selected: ', this.value);
  if (this.value === 'custom'){
      document.getElementById('custom_diff').style.display = 'inline';
  } else {
      document.getElementById('custom_diff').style.display = 'none';
  }
});
const form = document.getElementById("settings");
form.addEventListener('submit', getSettingsInfo);
function getSettingsInfo(event){
    event.preventDefault();
        var game_mode = form.querySelector('[name="game_mode"]'),
            difficulty = form.querySelector('[name="difficulty"]'),
            width = form.querySelector('[name="width"]'),
            height = form.querySelector('[name="height"]'),
            bombs_quantity = form.querySelector('[name="bombs_quantity"]');
        if (document.getElementById('difficulty').value === 'custom') {
            if (width > 50) width = 50;
            if (height > 50) height = 50;
            if (bombs_quantity >= height * width) bombs_quantity = height * width - 1;
        } else {
            if (difficulty.value === 'easy'){
                width.value = 8;
                height.value = 8;
                bombs_quantity.value = 8;
            }
            if (difficulty.value === 'normal'){
                width.value = 16;
                height.value = 16;
                bombs_quantity.value = 32;
            }
            if (difficulty.value === 'hard'){
                width.value = 32;
                height.value = 32;
                bombs_quantity.value = 128;
            }
        }

    // var data = {
    //     game_mode: game_mode.value,
    //     difficulty: difficulty.value,
    //     width: width.value,
    //     height: height.value,
    //     bombs_quantity: bombs_quantity.value
    // };
    // console.log(data);
sessionStorage.setItem('game_mode', game_mode.value);
sessionStorage.setItem('difficulty', difficulty.value);
sessionStorage.setItem('width', width.value);
sessionStorage.setItem('height', height.value);
sessionStorage.setItem('bombs_quantity', bombs_quantity.value);
let adress = document.location.href.replace('level', "play");
window.location.href = adress;
}
