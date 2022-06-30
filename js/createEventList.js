const endpoint = "https://script.google.com/macros/s/AKfycbyII9rQVL1zB3uNT-IZ0QUrc-YnyfsCovuJdr1-29ZgijYOlDDBb_EZLh4vFBLlmrDOig/exec";

function zeroPadding(num, len){
	return ( Array(len).join('0') + num ).slice( -len );
}

function createDateString(startDateObject, endDateObject){


        // Tag
        let dNum = zeroPadding(startDateObject.getDate(), 2);
        let dateString = dNum.toString();

        // Monat
        let monthNo = startDateObject.getMonth() + 1;
        let moNum = zeroPadding(monthNo, 2);
        let monthString = moNum.toString();

        // Stunde
        let hNumStart = zeroPadding(startDateObject.getHours(), 2);
        let startHourString = hNumStart.toString();

        let hNumEnd = zeroPadding(endDateObject.getHours(), 2);
        let endHourString = hNumEnd.toString();

        // Minute
        let miNumStart = zeroPadding(startDateObject.getMinutes(), 2);
        let startMinutesString = miNumStart.toString();

        let miNumEnd = zeroPadding(endDateObject.getMinutes(), 2);
        let endMinutesString = miNumEnd.toString();

        // Wochentag
        const weekDays = ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'];
        let startWeekDay = startDateObject.getDay();
        let startWeekDayString = '(' + weekDays[startWeekDay] + ') ';
        //console.log(startWeekDayString);

        let fullString = dateString + '.' + monthString + '. ' + startWeekDayString + startHourString + ':' + startMinutesString + ' – ' + endHourString + ':' + endMinutesString;
        return fullString
}

function createTable(){
        $.ajax({
        type: 'GET',
        url: endpoint,
        dataType: 'json',
        success: out => {
            //console.log(out);
            out = out.slice(0, 12);
            let calendarHtml = '';

          //darHtml += '<h1>Agenda</h1>';
            calendarHtml += '<table><colgroup><col class="Veranstaltung"><col class="Veranstaltungszeit"></colgroup>';
            calendarHtml += '<tr><th scope="col">Veranstaltung</th><th scope="col">Veranstaltungszeit</th></tr>';

            out.forEach( el => {
                // Durch "Date()" wird die ISO-Zeitstring in Zeit-Objekt umgewandelt. Die Basis der Zeit wird auch (UTC) -> (CET/CEST) geändert.
                // Es gibt weitere Methods wie getMonth, getDay, getDate, getHours, getMinutes usw., um die Zeitangabe besser darzustellen.
                let st = new Date(el.startTime);
                let ed = new Date(el.endTime);

                let timeString = createDateString(st, ed);

                if (el.eventTitle.indexOf('Gesamt') !== -1 ){
                    calendarHtml += '<tr class="warning"><td>' + el.eventTitle + '</td>';
                    calendarHtml += '<td class="time">' + timeString + '</td></tr>';
                } else {
                    calendarHtml += '<tr class="normal"><td>' + el.eventTitle + '</td>';
                    calendarHtml += '<td class="time">' + timeString + '</td></tr>';
                }

            })

            calendarHtml += '</table>';

            document.querySelector('#calendar').innerHTML = calendarHtml;

        }
        });
}

    // Tabelle wird einmal in einer Stunde erneuert
    let intervalID = setInterval(createTable(), 3600000)
