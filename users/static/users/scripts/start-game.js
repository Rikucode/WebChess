document.getElementById('difficulty').addEventListener('change', function() {
    console.log('You selected: ', this.value);
    var custom_diff = document.querySelectorAll('#custom_diff');
    if (this.value === 'custom') {
        for (var i = 0; i < custom_diff.length; i++) {
            var currentEl = custom_diff[i];
            currentEl.style.display = 'block';
        }
        if (document.getElementById('game_mode').value === 'timer'){
            for (var i = 0; i < custom_time.length; i++) {
                var currentEl = custom_time[i];
                currentEl.style.display = 'block';
            }
        }
        document.getElementById('container-box').style.height = '500px';
    } else {
        for (var i = 0; i < custom_diff.length; i++) {
            var currentEl = custom_diff[i];
            currentEl.style.display = 'none';
        }
        for (var i = 0; i < custom_time.length; i++) {
                var currentEl = custom_time[i];
                currentEl.style.display = 'none';
        }
        document.getElementById('container-box').style.height = '355px';
    }


});

document.getElementById('game_mode').addEventListener('change', function() {
    console.log('You selected: ', this.value);
    var custom_time = document.querySelectorAll('#custom_time');
    if (this.value === 'timer' && document.getElementById('difficulty').value === 'custom') {
        for (var i = 0; i < custom_time.length; i++) {
            var currentEl = custom_time[i];
            currentEl.style.display = 'block';
        }
    } else {
        for (var i = 0; i < custom_time.length; i++) {
            var currentEl = custom_time[i];
            currentEl.style.display = 'none';
        }
    }
});

const form = document.getElementById("settings");
form.addEventListener('submit', getSettingsInfo);

function getSettingsInfo(event) {
    event.preventDefault();
    var game_mode = form.querySelector('[name="game_mode"]'),
        difficulty = form.querySelector('[name="difficulty"]'),
        width = form.querySelector('[name="width"]'),
        height = form.querySelector('[name="height"]'),
        bombs_quantity = form.querySelector('[name="bombs_quantity"]'),
        time = form.querySelector('[name="time"]');
    var isTrue = true;
    if (document.getElementById('difficulty').value === 'custom') {
        if (bombs_quantity.value >= height.value * width.value || width.value > 32 || height.value > 32 || time.value <= 0 || time.value >= 60) {
            document.getElementById('warning').style.display = 'block';
            isTrue = false;
        }
    } else {
        if (difficulty.value === 'easy') {
            width.value = 8;
            height.value = 8;
            bombs_quantity.value = 8;
            time.value = 5;
        }
        if (difficulty.value === 'normal') {
            width.value = 16;
            height.value = 16;
            bombs_quantity.value = 32;
            time.value = 5;
        }
        if (difficulty.value === 'hard') {
            width.value = 32;
            height.value = 32;
            bombs_quantity.value = 128;
            time.value = 5;
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
    if (isTrue == true) {
        sessionStorage.setItem('game_mode', game_mode.value);
        sessionStorage.setItem('difficulty', difficulty.value);
        sessionStorage.setItem('width', width.value);
        sessionStorage.setItem('height', height.value);
        sessionStorage.setItem('bombs_quantity', bombs_quantity.value);
        sessionStorage.setItem('timer', time.value);
        let adress = document.location.href.replace('level', "play");
        window.location.href = adress;
    }
}
