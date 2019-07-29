const uri = "api/wohn";
let wohnEinheiten = null;

/// <summary>
/// Ermittelt die Menge der aktiven Wohneinheiten.
/// </summary>
function getCount(data) {
    const el = $("#counter");
    let name = "Wohneinheit";
    var counter = 0;
    for (var i = 0; i <= data.length-1; i++) {
        if (data[i].istInaktiv === false) {
            counter++;
        }

    }
       
    if (counter) {
        if (counter > 1) {
            name = "Wohneinheiten";
        }
        el.text(counter.toString() + " aktive " + name + "!");
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
     getData();
   
});



/// <summary>
/// Holt sich die Daten aus der Datenbank.
/// </summary>
function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#WohnEinheiten");

            $(tBody).empty();

            getCount(data);

            $.each(data, function (key, item) {

                if (item.istInaktiv === false) {
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.bezeichnung))
                        .append($("<td></td>").text(item.strasse))
                        .append($("<td></td>").text(item.plz))
                        .append($("<td></td>").text(item.ort))
                        .append(
                            $("<td></td>").append(
                                $("<button>Edit</button>").on("click", function () {
                                    editItem(item.id);
                                })
                            )
                        )
                        .append(
                            $("<td></td>").append(
                                $("<button>Delete</button>").on("click", function () {
                                    deleteItem(item.id);
                                })
                            )
                        );
                    tr.appendTo(tBody);
                }
            });

            const tBody2 = $("#RecentWohn");

            $(tBody2).empty();
            $.each(data, function (key, item) {
                if (key === data.length - 1) {
                    const tr2 = $("<tr></tr>")

                        .append($("<td></td>").text(item.bezeichnung))
                        .append($("<td></td>").text(item.strasse))
                        .append($("<td></td>").text(item.plz))
                        .append($("<td></td>").text(item.ort))



                    tr2.appendTo(tBody2);
                }
            });



            wohnEinheiten = data;
        }
    });
}

/// <summary>
/// Fügt der Datenbank einen Datensatz hinzu.
/// </summary>
function addItem() {
    const item = {
        bezeichnung: $("#add-bezeichnung").val(),
        strasse: $("#add-strasse").val(),
        plz: $("#add-plz").val(),
        ort: $("#add-ort").val(),
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-bezeichnung").val("");
            $("#add-strasse").val("");
            $("#add-plz").val("");
            $("#add-ort").val("");
        }
    });
}
/// <summary>
/// Löscht einen Datensatz aus der Datenbank
/// </summary>
function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

/// <summary>
/// Editiert einen Datensatz aus der Datenbank
/// </summary>
function editItem(id) {
    $.each(wohnEinheiten, function (key, item) {
        if (item.id === id) {
            $("#edit-bezeichnung").val(item.bezeichnung);
            $("#edit-strasse").val(item.strasse);
            $("#edit-plz").val(item.plz);
            $("#edit-ort").val(item.ort);
            $("#edit-istInaktiv").prop('checked', item.istInaktiv);
            $("#edit-id").val(item.id);
        }
    });
    $("#spoiler").css({ display: "block" });
    $("#additem").css({ display: "none" });
}

/// <summary>
/// Verknüpfung der HTML Datenfelder mit der Datenbank
/// </summary>
$(".my-form").on("submit", function () {
    const item = {
        bezeichnung: $("#edit-bezeichnung").val(),
        strasse: $("#edit-strasse").val(),
        plz: $("#edit-plz").val(),
        ort: $("#edit-ort").val(),
        istInaktiv: $("#edit-istInaktiv").is(":checked"),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
    $("#additem").css({ display: "block" });
}