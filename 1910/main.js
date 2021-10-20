$(function () {
  $("#date").focus(makeCalendar);

  $(".timer_btn").click(timerBtn);

  $(".sel_btn").click(function () {
    $(".sel_opts").toggle("slow");
    $(".selector").toggleClass("open");
  });

  $(".sel_option").click(selectOpt);

  $("#myform").on("submit", function (e) {
    e.preventDefault();
    checkForm();
  });
});

const markedDays = [
  "01-01-1971",
  "01-04-2000",
  "31-12-2012",
  "08-03-2020",
  "31-10-1999",
  "07-11-1917",
  "12-12-2012",
  "06-10-2009",
];
const mdays = [20, 5];
let timerData = null;
let timerId;
let timerFlag = false;
function makeCalendar() {
  let today = $("#date").val().split("-");
  if (today.length < 3) {
    today = new Date();
  } else {
    today = new Date(today[2], +today[1] - 1, today[0]);
  }
  let curMonth = today.getMonth();
  let curYear = today.getFullYear();
  makeCalendarTable(curMonth, curYear);
  $("#date").trigger("blur");
}
function makeCalendarTable(month, year) {
  const russMonth = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  while (month < 0) {
    month += 12;
    year -= 1;
  }
  while (month > 11) {
    month -= 12;
    year += 1;
  }
  let firstday = new Date(year, month);
  let prevdays = (firstday.getDay() + 6) % 7;
  let lastday = new Date(year, month + 1, 0);
  let monthdays = lastday.getDate();
  let weeks = Math.ceil((prevdays + monthdays) / 7);
  let hlpstr = "";
  hlpstr +=
    '<div class="dp_wrapper"><div class="dp_header"><span class="next">></span><span class="bignext">>></span><span class="prev"><</span><span class="bigprev"><<</span><b>' +
    russMonth[month] +
    " " +
    year +
    '</b></div><div class="dp_grid"><span class="headday">Пн</span><span class="headday">Вт</span><span class="headday">Ср</span><span class="headday">Чт</span><span class="headday">Пт</span><span class="headday holiday">Сб</span><span class="headday holiday">Вс</span>';
  for (let i = 0; i < weeks * 7; i++) {
    if (i < prevdays) {
      hlpstr += '<span class="empty"></span>';
    } else if (i - prevdays < monthdays) {
      let getdate =
        addChar(i - prevdays + 1, 2) + "-" + addChar(month + 1, 2) + "-" + year;
      let curdate = $("#date").val();
      if (curdate.length < 10) {
        curdate = new Date();
        curdate =
          addChar(curdate.getDate(), 2) +
          "-" +
          addChar(curdate.getMonth() + 1, 2) +
          "-" +
          curdate.getFullYear();
      }
      hlpstr += '<span class="getter';
      if (i % 7 == 5 || i % 7 == 6) hlpstr += " holiday"; // 0,1,2,3,4,5,6
      if (getdate == curdate) hlpstr += " today";
      for (let q of markedDays) {
        if (q.slice(0, 5) == getdate.slice(0, 5) && +q.slice(6) <= year)
          hlpstr += " markedday";
      }
      for (let w of mdays) {
        if (w == i - prevdays + 1) hlpstr += " cashday";
      }
      hlpstr +=
        '" data-get="' + getdate + '">' + (i - prevdays + 1) + "</span>";
    } else {
      hlpstr += '<span class="empty"></span>';
    }
  }
  hlpstr += "</div></div>";
  $("#calendar").html(hlpstr);
  //document.getElementById('calendar').innerHTML = hlpstr;
  $(".prev").click(function () {
    makeCalendarTable(month - 1, year);
  });
  $(".next").click(function () {
    makeCalendarTable(month + 1, year);
  });
  $(".bigprev").click(function () {
    makeCalendarTable(month, year - 1);
  });
  $(".bignext").click(function () {
    makeCalendarTable(month, year + 1);
  });
  $(".getter").click(function () {
    $("#date").val(this.dataset.get);
    $("#calendar").empty();
  });
}
function addChar(c, t) {
  c += "";
  //if (c.length < 2)
  while (c.length < t) {
    c = "0" + c;
  }
  return c;
}
function timerBtn() {
  if ($(".timer_btn").html() == "Запустить") {
    timerStart();
    $(".timer_btn").html("Остановить");
  } else if ($(".timer_btn").html() == "Остановить") {
    timerStop();
    $(".timer_btn").html("Сбросить");
  } else {
    writeTimer(0, 0, 0, 0);
    $(".timer_btn").html("Запустить");
  }
}
function timerStart() {
  if (!timerData) {
    timerFlag = true;
    timerData = new Date();
  } else if (timerFlag) {
    let currData = new Date();
    let delta = currData.getTime() - timerData.getTime(); // разница времени в мс
    let ms = delta % 1000;
    delta = Math.floor(delta / 1000);
    let s = delta % 60;
    delta = Math.floor(delta / 60);
    let m = delta % 60;
    delta = Math.floor(delta / 60);
    let h = delta % 24;
    writeTimer(h, m, s, ms);
  }
  if (timerFlag) timerId = setTimeout(timerStart);
}
function timerStop() {
  clearTimeout(timerId);
  timerFlag = false;
  timerData = null;
}
function writeTimer(hours, mins, secs, ms) {
  let hlpstr = "";
  hlpstr =
    addChar(hours, 2) +
    ":" +
    addChar(mins, 2) +
    ":" +
    addChar(secs, 2) +
    ".<span>" +
    addChar(ms, 3) +
    "</span>";
  $(".timer_field").html(hlpstr); // '00:00:00.<span>000</span>'
}
function selectOpt(e) {
  if ($(e.target).hasClass("heading")) return;
  $(".sel_head").html($(e.target).html());
  $(".sel_opts").hide("slow");
  $(".selector").removeClass("open").data("value", e.target.dataset.value);
  //console.log($(".selector").data("value"));
}

function checkForm() {
  let formdata = {
    date: null, // input id="date" value
    time: null, // div class="timer_field" !!!без тегов!!!
    city: null, // div class="selector" data-value
  };
  formdata = {
    date: $("#date").val(),
    time: $(".timer_field").text(),
    city: $(".sel_head").text(),
  };
  console.log(formdata);
}

/*function checkForm() {
  let formdata = {
    date: null, 
    time: null, 
    city: null, 
  };
  let numV = $(".selector").data("value");
  formdata = {
    date: $("#date").val(), 
    time: $(".timer_field").text(), 
    city: $('.sel_option[data-value="numV"]').text(),  
  };
  console.log(formdata);*/
