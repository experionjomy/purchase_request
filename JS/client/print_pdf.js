function printDiv() {
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function(element, renderer) {
            return true;
        }
    };
    doc.fromHTML($('#fullCalModal').get(0), 10, 10, {
        'width': 100,
        'elementHandlers': specialElementHandlers
    });
    doc.output("dataurlnewwindow");
}

function pdfDiv() {
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function(element, renderer) {
            return true;
        }
    };

    doc.fromHTML($('#fullCalModal').get(0), 10, 10, {
        'width': 100,
        'elementHandlers': specialElementHandlers

    });
    doc.save("new.pdf");
}