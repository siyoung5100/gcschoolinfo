const schedule = document.querySelector('.timetable');
const schedulelist = document.querySelector('.schedule')

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

function isITRT_CNTNT(something){
  if (something.name == 'ITRT_CNTNT') {
    return true;
  }
}

function getScheduleAPI(){
  fetch(`https://open.neis.go.kr/hub/misTimetable?KEY=${API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${API_EDUCODE}&SD_SCHUL_CODE=${API_SCHOOLCODE}&ALL_TI_YMD=20210827&GRADE=3&CLASS_NM=7`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    const scheduleInfo = json.misTimetable[1].row
    console.log(scheduleInfo);
    const realSchedule = scheduleInfo.filter(isITRT_CNTNT);
    schedulelist.innerHTML = realSchedule;
    console.log(realSchedule);
  });
}

function init(){
  getScheduleAPI();
}

init();