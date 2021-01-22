
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function changeTimer(el, serverDate) {
    const nowDate = new Date();
    const date = new Date(serverDate);
    const diff = new Date(nowDate.getTime() - date.getTime());
    const textDays = declOfNum(diff.getUTCDate() - 1, ['день', 'дня', 'дней']);
    const textHours = declOfNum(diff.getUTCHours(), ['час', 'часа', 'часов']);
    const textMinutes = declOfNum(diff.getUTCMinutes(), ['минута', 'минуты', 'минут']);
    const textSeconds = declOfNum(diff.getUTCSeconds(), ['секунда', 'секунды', 'секунд']);
    el.innerText = `${diff.getUTCDate() - 1} ${textDays}, ${diff.getUTCHours()} ${textHours}, ${diff.getUTCMinutes()} ${textMinutes}, ${diff.getUTCSeconds()} ${textSeconds}`;
}

document.addEventListener("DOMContentLoaded", () => {
    let serverDate = new Date();
    const timerEl = document.getElementById('timer');
    fetch('https://sasik-fail.herokuapp.com/api/getDate')
        .then(res => res.json())
        .then(data => {
            serverDate = data.date
            changeTimer(timerEl, serverDate);
        })
    let interval = setInterval(() => changeTimer(timerEl, serverDate), 1000)
    const refreshButton = document.getElementById('refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            fetch('https://sasik-fail.herokuapp.com/api/changeDate')
                .then(res => res.json())
                .then(data => {
                    clearInterval(interval);
                    serverDate = data.date;
                    changeTimer(timerEl, data.date)
                    interval = setInterval(() => changeTimer(timerEl, serverDate), 1000)
                })
        })
    }
})
