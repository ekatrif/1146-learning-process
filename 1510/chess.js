$(function () {
  $("td").click(whoIs, markStep);
});

function whoIs(e) {
  let hlpstr = "";
  hlpstr += "This is " + e.target.id + ". ";
  let hlpcls = e.target.classList;
  if (!hlpcls.contains("white") && !hlpcls.contains("black")) {
    hlpstr += "Empty here.";
  } else {
    if (hlpcls.contains("white")) {
      hlpstr += "White ";
    } else {
      hlpstr += "Black ";
    }
    if (hlpcls.contains("king")) {
      hlpstr += "king here.";
    } else if (hlpcls.contains("queen")) {
      hlpstr += "queen here.";
    } else if (hlpcls.contains("rook")) {
      hlpstr += "rook here.";
    } else if (hlpcls.contains("bishop")) {
      hlpstr += "bishop here.";
    } else if (hlpcls.contains("knight")) {
      hlpstr += "knight here.";
    } else {
      hlpstr += "pawn here.";
    }
  }
  console.log(hlpstr);
}

function markStep(e) {
  // По клику на клетке пометить ее классом stepfrom.
  // Если на кликнутой клетке уже есть такой класс, просто убрать его.
  $(this).toggleClass("stepfrom");

  // Если есть другая клетка с этим классом, пометить кликнутую клетку классом stepto.
  // Если на кликнутой клетке есть класс stepto, просто убрать его.

  if ($("td").not(this).hasClass("stepfrom")) {
    $(this).removeClass("stepfrom").toggleClass("stepto");
  }
  // Если на доске уже есть другая клетка с классом stepto, убрать классы stepfrom и stepto с ранее помеченных клеток, кликнутую пометить классом stepfrom.

  if ($("td").hasClass("stepfrom") && $("td").not(this).hasClass("stepto")) {
    $("td").removeClass("stepfrom");
    $("td").removeClass("stepto");
    $(this).addClass("stepfrom");
  }
  // Если после всех манипуляций на доске остались клетки с классами stepfrom и steptoб вывести в консоль объект вида {stepfrom: <cell id>, stepto: <cell id>}
  let x, y;
  x = $(".stepfrom").attr("id");
  y = $(".stepto").attr("id");
  if ($("td").hasClass("stepfrom") && $("td").hasClass("stepto") && x != y) {
    hlpstr = "stepfrom: " + x + ", stepto: " + y;
    console.log(hlpstr);
  }
}
