$(function () {
  $("#date").focus(makeCalendar);
});

const markedDays = ["22-09-2009", "22-11-2017", "13-07-1984", "13-03-1982"];
const mdays = [20, 5];
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
        addChar(i - prevdays + 1) + "-" + addChar(month + 1) + "-" + year;
      let curdate = $("#date").val();
      if (curdate.length < 10) {
        curdate = new Date();
        curdate =
          addChar(curdate.getDate()) +
          "-" +
          addChar(curdate.getMonth() + 1) +
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
function addChar(c) {
  c += "";
  if (c.length < 2) c = "0" + c;
  return c;
}
