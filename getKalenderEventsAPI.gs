// Um calendarID zu property hizuzufügen, siehe "README.txt"
var calenderID = PropertiesService.getScriptProperties().getProperty("calendarId");

function unescapeHTML(target) {
  if (typeof target !== 'string') return target;

	var patterns = {
		'&lt;'   : '<',
		'&gt;'   : '>',
		'&amp;'  : '&',
		'&quot;' : '"',
		'&#x27;' : '\'',
		'&#x60;' : '`',
    '&nbsp;' : ' '
	};

	return target.replace(/&(lt|gt|amp|quot|#x27|#x60|nbsp);/g, function(match) {
		return patterns[match];
	});
}


function doGet() {
  //Kalender holen
  let myCalendar = CalendarApp.getCalendarById(calenderID);

  // Startdatum heute
  let startDate = new Date();
  

  // Enddatum heute + 1 Jahr
  let endYear = startDate.getFullYear() + 1;
  let endMonth = startDate.getMonth();
  let endDay = startDate.getDate();
  let endDate = new Date(endYear, endMonth, endDay);
  
 

  // Events zwischen dem Start- und Enddatum holen 
  let myEvent = myCalendar.getEvents(startDate, endDate);
  
  // Beschreibungen von Events herausholen

  let events = myEvent.map(obj => {
   let rObj = {};
   rObj[ 'eventTitle' ] = obj.getTitle();
   rObj[ 'startTime' ] = obj.getStartTime();
   rObj[ 'endTime' ] = obj.getEndTime(); 
   let desc = obj.getDescription().replace(/(<([^>]+)>)/gi, '');
   let descPlaneText = unescapeHTML(desc);
   //Logger.log(descPlaneText);
   rObj['description'] = descPlaneText;
   return rObj;
  });
  
  let eventsJson = JSON.stringify(events); 
  Logger.log(eventsJson);

  // Textoutput Objekte erstellen
  let out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  out.setContent(eventsJson);
  
  return out;
}
