const API_KEY = "754f98fa53a74d959067224d575dc742"; //나이스 api 인증키
const API_EDUCODE = "Q10"; // 교육청 코드 넣는 부분
const API_SCHOOLCODE = "8531006"; //표준학교코드? 들어가는곳
//let API_DATE = "20210319";  //급식 날짜 고르는 부분
const menuabc = document.querySelector(".menu"); //h1태그 선택

function getDateInfo(){
  const date = new Date();
  const dayOfWeek = date.getDay();
  API_DATE = `${date.getFullYear()}${date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`}${date.getDate()}`;//간소화?
  console.log(API_DATE);
  if (dayOfWeek == 0 || dayOfWeek == 6){
    menuabc.innerHTML = "오늘은 학교 안 가는 날!";
  } else {
    getMenuAPI
  }
}


function getMenuAPI(){
  fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${API_EDUCODE}&SD_SCHUL_CODE=${API_SCHOOLCODE}&MLSV_YMD=${API_DATE}`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    const menuInfo = json.mealServiceDietInfo[1].row[0].DDISH_NM;
    menuabc.innerHTML = menuInfo;
    console.log(menuInfo);
  });
}

function init(){
  getDateInfo(); //이건 오늘 급식이 없어서...
  getMenuAPI();
}


init();


