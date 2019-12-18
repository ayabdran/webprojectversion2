window.onload = function () {
    alert("start again !");
}


window.unload = function () {
    alert("Goodbye!");
}

function randLetter() {
    var letters =
        ('A', 'B', 'C', 'D', 'E',
            'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z');

    var letters = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    return letters;
}


var x = document.getElementById('txt');
var g = document.getElementById('butt');
g.addEventListener('click', function () {
    for (var i = 0; i < x.value; i++) {
        if (x.value <= 0 || x.value >= 27) {
            document.write('<h2>you must inter only from 1 to 26 </h2>');
            document.write('<h3> Reload your page !!</h3>');
            break;
        } else {
            var element = document.createElement('input');
            //Assign different attributes to the element.
            element.setAttribute('type', 'button');
            element.setAttribute('value', randLetter());
            element.setAttribute('id', 'button' + i);
            document.body.appendChild(element);


            var interactions = [];
            interactions.push({
                eventType: 'click',
                eventTarget: event.target.id,
                eventTime: new Date().toString()
            });
            if (localStorage.getItem('interactions')) {
                var stored = JSON.parse(localStorage.getItem('interactions'));
                stored.push(...interactions);
                localStorage.setItem('interactions', JSON.stringify(stored));
            } else {
                localStorage.setItem('interactions', JSON.stringify(interactions));
            }
        }
    }
});


document.addEventListener('click', function (e) {
    for (var i = 0; i < x.value; i++) {
        if (e.target && e.target.id == 'button' + i) {

            var d = document.getElementById('button' + i).value.toLowerCase();
            var img = document.getElementById('img');
            img.setAttribute('src', d + '.png');
            document.getElementById('button' + i).style.border = "thick solid #0000FF";

            var interactions = [];
            interactions.push({
                eventType: 'click',
                eventTarget: e.target.id,
                eventTime: new Date().toString()
            });
            if (localStorage.getItem('interactions')) {
                var stored = JSON.parse(localStorage.getItem('interactions'));
                stored.push(...interactions);
                localStorage.setItem('interactions', JSON.stringify(stored));
            } else {
                localStorage.setItem('interactions', JSON.stringify(interactions));
            }
           
        }
    }
});



setInterval(() => {
    var events = JSON.parse(localStorage.getItem("interactions"));
    if(events != null) {
        $.post("server.php", {events: JSON.stringify(events)}, function (data) {
            localStorage.removeItem('interactions');
        });
    }
}, 5000);


function getEvents() {
    $('.event-list').empty();
    $.get("server.php?getEvents", function (data) {
        if(data !== ''){
            var events = JSON.parse(data);
            for(let i = 0; i < events.length; i++){
                $('.event-list').append(`<li>${events[i][0]} - ${events[i][1]} - ${events[i][2]}</li>`);
            }
        }
    });
}
