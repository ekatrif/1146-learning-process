$(function () {
  $("td").click(markStep);
});

function whoIs(cell) {
  let report = {
    id: null,
    content: null,
    color: null,
  };
  report.id = cell.id;
  hlpcls = cell.classList;
  if (hlpcls.contains("white")) {
    report.color = "white";
  } else if (hlpcls.contains("black")) {
    report.color = "black";
  }
  if (hlpcls.contains("king")) {
    report.content = "king";
  } else if (hlpcls.contains("queen")) {
    report.content = "queen";
  } else if (hlpcls.contains("rook")) {
    report.content = "rook";
  } else if (hlpcls.contains("bishop")) {
    report.content = "bishop";
  } else if (hlpcls.contains("knight")) {
    report.content = "knight";
  } else if (hlpcls.contains("pawn")) {
    report.content = "pawn";
  }
  return report;
}
function markStep(e) {
  let trg = $(e.target);
  let report = {
    stepfrom: null,
    stepto: null,
  };
  if (trg.hasClass("stepto")) {
    trg.removeClass("stepto");
  } else if ($(".stepto").length) {
    $(".stepto").removeClass("stepto");
    if (!trg.hasClass("stepfrom")) {
      $(".stepfrom").removeClass("stepfrom");
      trg.addClass("stepfrom");
    }
  } else if (trg.hasClass("stepfrom")) {
    trg.removeClass("stepfrom");
  } else if ($(".stepfrom").length) {
    trg.addClass("stepto");
  } else {
    trg.addClass("stepfrom");
  }
  if ($(".stepto").length && $(".stepfrom").length) {
    report.stepfrom = whoIs($(".stepfrom")[0]);
    report.stepto = whoIs($(".stepto")[0]);
    if (checkPath(report)) makeStep(report);
    $(".stepfrom").removeClass("stepfrom");
    $(".stepto").removeClass("stepto");
  }
}
function makeStep(plan) {
  $("#" + plan.stepfrom.id)
    .removeClass(plan.stepfrom.color)
    .removeClass(plan.stepfrom.content);
  $("#" + plan.stepto.id)
    .addClass(plan.stepfrom.color)
    .addClass(plan.stepfrom.content);
}
function checkPath(plan) {
  const formula = {
    cols: "abcdefgh",
    king: function (a, b) {
      let check_col = Math.abs(
        this.cols.indexOf(a[0]) - this.cols.indexOf(b[0])
      );
      let check_row = Math.abs(a[1] - b[1]);
      return check_col <= 1 && check_row <= 1;
    },
    queen: function (a, b) {
      // домашнее задание: написать функцию для хода королевы.
      // подсказка: она ходит ИЛИ как ладья, ИЛИ как слон.

      if (+a[1] + this.cols.indexOf(a[0]) == +b[1] + this.cols.indexOf(b[0])) {
        // b -> this.cols.indexOf(b[0]), +b[1]
        // a -> this.cols.indexOf(a[0]), +a[1]
        let start = +a[1],
          fin = +b[1],
          checksum = +b[1] + this.cols.indexOf(b[0]);
        if (fin < start) {
          start = +b[1];
          fin = +a[1];
        }
        for (let i = start + 1; i < fin; i++) {
          // i -> id[1]
          // id[0] -> this.cols[checksum - i]
          if (whoIs($("#" + this.cols[checksum - i] + i)[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      } else if (
        +a[1] - this.cols.indexOf(a[0]) ==
        +b[1] - this.cols.indexOf(b[0])
      ) {
        let start = +a[1],
          fin = +b[1],
          checksum = +b[1] - this.cols.indexOf(b[0]);
        if (fin < start) {
          start = +b[1];
          fin = +a[1];
        }
        for (let i = start + 1; i < fin; i++) {
          // id[1] -> i
          // id[0] -> this.cols[i - checksum]
          if (whoIs($("#" + this.cols[i - checksum] + i)[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      } else if (a[0] == b[0]) {
        // a = "a8" <-- b = "a1"
        let start = +b[1],
          fin = +a[1];
        if (fin < start) {
          start = +a[1];
          fin = +b[1];
        }
        for (let i = start + 1; i < fin; i++) {
          //console.log(a[0] + i);
          if (whoIs($("#" + a[0] + i)[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      } else if (a[1] == b[1]) {
        // a = "h1" <-- b = "a1"
        // cols.indexOf(a[0]) == 7
        // cols.indexOf(b[0]) == 0
        // i => [1,2,3,4,5,6]
        // cols[i] => [b,c,d,e,f,g]
        let start = this.cols.indexOf(b[0]),
          fin = this.cols.indexOf(a[0]);
        if (fin < start) {
          start = this.cols.indexOf(a[0]);
          fin = this.cols.indexOf(b[0]);
        }
        for (let i = start + 1; i < fin; i++) {
          //console.log(cols[i] + a[1]);
          if (whoIs($("#" + this.cols[i] + a[1])[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      }
      return false;
    },

    rook: function (a, b) {
      //return ((a[0] == b[0]) || (a[1] == b[1]));
      if (a[0] == b[0]) {
        // a = "a8" <-- b = "a1"
        let start = +b[1],
          fin = +a[1];
        if (fin < start) {
          start = +a[1];
          fin = +b[1];
        }
        for (let i = start + 1; i < fin; i++) {
          //console.log(a[0] + i);
          if (whoIs($("#" + a[0] + i)[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      } else if (a[1] == b[1]) {
        // a = "h1" <-- b = "a1"
        // cols.indexOf(a[0]) == 7
        // cols.indexOf(b[0]) == 0
        // i => [1,2,3,4,5,6]
        // cols[i] => [b,c,d,e,f,g]
        let start = this.cols.indexOf(b[0]),
          fin = this.cols.indexOf(a[0]);
        if (fin < start) {
          start = this.cols.indexOf(a[0]);
          fin = this.cols.indexOf(b[0]);
        }
        for (let i = start + 1; i < fin; i++) {
          //console.log(cols[i] + a[1]);
          if (whoIs($("#" + this.cols[i] + a[1])[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      }
      return false;
    },
    bishop: function (a, b) {
      if (+a[1] + this.cols.indexOf(a[0]) == +b[1] + this.cols.indexOf(b[0])) {
        // b -> this.cols.indexOf(b[0]), +b[1]
        // a -> this.cols.indexOf(a[0]), +a[1]
        let start = +a[1],
          fin = +b[1],
          checksum = +b[1] + this.cols.indexOf(b[0]);
        if (fin < start) {
          start = +b[1];
          fin = +a[1];
        }
        for (let i = start + 1; i < fin; i++) {
          // i -> id[1]
          // id[0] -> this.cols[checksum - i]
          if (whoIs($("#" + this.cols[checksum - i] + i)[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      } else if (
        +a[1] - this.cols.indexOf(a[0]) ==
        +b[1] - this.cols.indexOf(b[0])
      ) {
        let start = +a[1],
          fin = +b[1],
          checksum = +b[1] - this.cols.indexOf(b[0]);
        if (fin < start) {
          start = +b[1];
          fin = +a[1];
        }
        for (let i = start + 1; i < fin; i++) {
          // id[1] -> i
          // id[0] -> this.cols[i - checksum]
          if (whoIs($("#" + this.cols[i - checksum] + i)[0]).color) {
            console.log("Промежуточная клетка занята!");
            return false;
          }
        }
        return true;
      }
      return false;
    },
    knight: function (a, b) {
      let check_col = Math.abs(
        this.cols.indexOf(a[0]) - this.cols.indexOf(b[0])
      );
      let check_row = Math.abs(a[1] - b[1]);
      return (
        (check_col == 1 && check_row == 2) || (check_col == 2 && check_row == 1)
      );
    },
    pawn: function (a, b) {
      console.log("пока не обрабатывается");
      return true;
    },
  };
  if (
    plan.stepfrom.content &&
    !plan.stepto.content &&
    formula[plan.stepfrom.content](plan.stepto.id, plan.stepfrom.id)
  ) {
    return true;
  } else {
    if (plan.stepto.content) {
      console.log("Конечная клетка уже занята - ходить нельзя!");
    } else if (!plan.stepfrom.content) {
      console.log("Нечем ходить - начальная клетка пуста!");
    } else {
      console.log("Недопустимый ход для этой фигуры!");
    }
    return false;
  }
}
