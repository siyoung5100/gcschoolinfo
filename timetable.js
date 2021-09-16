const schedulelist = document.querySelector('.timetable')
var classNumber;

function getDate(){
  const date = new Date();
  const dayOfWeek = date.getDay();
  API_DATE = `${date.getFullYear()}${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}${date.getDate()}`;//간소화?
  console.log(API_DATE);
  if (dayOfWeek == 0 || dayOfWeek == 6){
    schedulelist.innerHTML = "오늘은 학교 안 가는 날!";
  } else {
    getScheduleAPI();
  }
}

function getScheduleAPI(){
  fetch(`https://open.neis.go.kr/hub/misTimetable?KEY=${API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${API_EDUCODE}&SD_SCHUL_CODE=${API_SCHOOLCODE}&ALL_TI_YMD=${API_DATE}&GRADE=3&CLASS_NM=7`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    const classNumber = json.misTimetable[0].head[0].list_total_count
    const scheduleInfo = json.misTimetable[1].row
    pharsingSchedule(classNumber, scheduleInfo);
  });
}

function pharsingSchedule(n, json){
  var loopN = 0
  var realSchedule = '';
  while (loopN < n){
    realSchedule += `${loopN + 1}${json[loopN].ITRT_CNTNT}</br>`;
    loopN += 1
  }
  console.log(realSchedule);
  schedulelist.innerHTML = realSchedule;
}

function init(){
  getDate();
}

init();
