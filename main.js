var i = 0;
var b = 0;
var key = 0;
const sairme = document.querySelector("#sairme");
const home = document.querySelector("#home");
const covidyes = document.querySelector("#covid-yes");
const covidno = document.querySelector("#covid-no");
const vacyes = document.querySelector("#vaccine-yes");
const vacno = document.querySelector("#vaccine-no");
const insyes = document.querySelector("#ins-yes");
const insno = document.querySelector("#ins-no");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const number = document.querySelector("#number");


if(localStorage.getItem("token") == null){
	fetch("https://redberryform-server.up.railway.app/api/token").then(response => response.json()).then(data => {
		localStorage.setItem("token", data.tkn);
		console.log(data.tkn);
	});
}


function removeDb() {
	if(localStorage.getItem("submitted") == "yes"){
		var req = indexedDB.deleteDatabase("skillsDB");
		req.onsuccess = function () {
			console.log("Deleted database successfully");
		};
		req.onerror = function () {
			console.log("Couldn't delete database");
		};
		const token = localStorage.getItem("token");
		localStorage.clear();
		localStorage.setItem('token', token);
	}
}

function collapseApp(el, all){
	b++;
	var appBtn = document.querySelectorAll(".apps-btn");
	var appH = document.querySelectorAll(".apps-collapsible");
	var appsContent = document.querySelectorAll(".apps-content");
	var appsbody = document.querySelector(".apps-body");
	if(b == 1){
		appH[el].style.background="#F05039";
		appBtn[el].setAttribute("src", "images/VectorUp.svg");
		appsContent[el].style.display="block";
		if(el==all-1){
			document.querySelector(".end").style.display="block";
		}
		if(appH[el+1] != null){
			appH[el+1].style.marginTop = "1530px";
		}
	}else{
		appH[el].style.background="#FE3B1F";
		appBtn[el].setAttribute("src", "images/Vector.svg");
		appsContent[el].style.display="none";
		if(el==all-1){
			document.querySelector(".end").style.display="none";
		}
		if(appH[el+1] != null){
		 appH[el+1].style.marginTop = "0px";
		}
		b=0;
	}
}

function fetchApp(){

	fetch(`https://bootcamp-2022.devtest.ge/api/applications?token=${localStorage.getItem("token")}`).then(response => response.json()).then(data => {
		console.log(localStorage.getItem("token"));
		var appsnum = document.querySelector(".apps-num");
		var applist = document.querySelector(".applist");
	
		for(var i=0; i<data.length; i++){
			var datanum = i;
			if(data[i].had_covid_at == "1111-11-11"){
				var covid_date = "N/A"
			}else{
				var covid_date = data[i].had_covid_at;
			}

			if(data[i].vaccinated_at == "1111-11-11"){
				var vac_date = "N/A"
			}else{
				var vac_date = data[i].vaccinated_at;
			}

			var newApp = document.createElement("div");
			newApp.innerHTML = `<div class="apps-collapsible">
				<p class="apps-num">${i+1}<img onclick="collapseApp(${i}, ${data.length})" class="apps-btn" src="images/Vector.svg"></img></p>
				<div class="apps-content">
					<div class="apps-L">
						<div class="personal-app">
							<h1 class="apps-pers">Personal Information</h1>
							<div class="pers-cont">
								<p>First Name <snap class="pers-name">${data[i].first_name}</snap></p>
								<p>Last Name <snap class="pers-lname">${data[i].last_name}</snap></p>
								<p>E mail <snap class="pers-mail">${data[i].email}</snap></p>
								<p>Phone <snap class="pers-phone">${data[i].phone}</snap></p>
							</div>
						</div>
						<div class="covid-app">
							<h1 class="apps-pers covid-sit">Covid Situation</h1>
							<div class="apps-radio apps-radio-work">
								<div class="work-radio">
									<p>How would you prefer to work?</p>
									<input disabled value="from_office" type="radio" name="work-radio" id="sairme" required></input>
									<img class="sairme-btn" src="images/buttoff.svg">
									<label for="sairme">From Sairme Office</label>
									<br>
									<input disabled value="from_home" type="radio" name="work-radio" id="home" required></input>
									<img class="home-btn" src="images/buttoff.svg">
									<label for="home">From Home</label>
									<br>
									<input disabled value="hybrid" id="hybrid" type="radio" name="work-radio"required></input>
									<img class="hybrid-btn"src="images/buttoff.svg">
									<label for="hybrid">Hybrid</label>
								</div>
								<div class="covid-radio">
									<p> Did you have covid 19?</p>
								
									<input disabled value="yes" required type="radio" name="covid-radio" onclick="showDate()"id="covid-yes"></input>
									<img class="covidyes-btn" src="images/buttoff.svg">
									<label for="covid-yes">Yes</label>
									<br>
									<input disabled value="no" required onclick="showDate()" type="radio" name="covid-radio" id="covid-no"></input>
									<img class="covidno-btn"src="images/buttoff.svg">
									<label for="covid-no">No</label>
								</div>
								<div class="covid-date" id="covid-date">
									<p class="date-title" id="date-title"> When? </p>
									<p class="date-covid apps-date" id="date-covid">${covid_date} <img class="date-img apps-dateimg" id="date-img" src="images/calendar.svg"></p>
								</div>
								<div class="covid-radio2">
									<p> Have you been vaccinated?</p>
									<input disabled value="yes" required type="radio" name="covid-radio2" onclick="showDate()" id="vaccine-yes"></input>
									<img class="vacyes-btn" src="images/buttoff.svg">
									<label for="vaccine-yes">Yes</label>
									<br>
									<input disabled value="no" required type="radio" name="covid-radio2" onclick="showDate()" id="vaccine-no"></input>
									<img class="vacno-btn" src="images/buttoff.svg">
									<label for="vaccine-no">No</label>
								</div>
								<div class="covid-date" id="covid-date2">
									<p class="date-title" id="date-title2"> When did you get covid vaccine? </p>
									<p class="date-covid apps-date" id="date-covid2">${vac_date} <img class="date-img apps-dateimg" src="images/calendar.svg"></p>
								</div>
							</div>
						</div>
					</div>
						<div class="apps-R">
							<div class="apps-skillset">
								<h1 class="apps-pers">Skillset</h1>
								<div class="skillset-list">
									
									
								</div>
							</div>
							<div class="apps-insights apps-radio">
								<h1 class="apps-pers">Insights</h1>
								<div class="ins-radio apps-radio apps-radioIns">
								<p class="apps-insP"> Would you attend Devtalks and maybe <br> also organize your own?</p>
								<input disabled value="yes" onclick="showTxtArea()"required type="radio" name="ins-radio" id="ins-yes"></input>
								<img class="insyes-btn"  src="images/buttoff.svg">
								<label for="ins-yes">Yes</label>
								<br>
								<input disabled value="no" onclick="showTxtArea()"required type="radio" name="ins-radio" id="ins-no"></input>
								<img class="insno-btn" src="images/buttoff.svg">
								<label for="ins-no">No</label>
							</div>
							<div class="ins-textarea ins-textarea1 apps-insT">
								<p> What would you speak about at Devtalk?</p>
								<textarea disabled id="devtalkTopic" placeholder="I would..."></textarea>
							</div>
							<div class="ins-textarea ins-textarea2 apps-insT">
								<p> Tell us something special</p>
								<textarea disabled required class="special" id="special" placeholder="I..."></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>`
			applist.appendChild(newApp);
		}


		for(var i=0; i<data.length; i++){
			datanum = i;
			var persName = document.querySelectorAll(".pers-name");
			var persLname = document.querySelectorAll(".pers-lname");
			var persMail = document.querySelectorAll(".pers-mail");
			var persPhone = document.querySelectorAll(".pers-phone");
			var sairmebtn = document.querySelectorAll(".sairme-btn");
			var homebtn = document.querySelectorAll(".home-btn");
			var hybridbtn = document.querySelectorAll(".hybrid-btn");
			var covidyesbtn = document.querySelectorAll(".covidyes-btn");
			var covidnobtn = document.querySelectorAll(".covidno-btn");
			var vacyesbtn = document.querySelectorAll(".vacyes-btn");
			var vacnobtn = document.querySelectorAll(".vacno-btn");
			var insyesbtn = document.querySelectorAll(".insyes-btn");
			var insnobtn = document.querySelectorAll(".insno-btn");
			var datecovid = document.querySelectorAll("#date-covid");
			var datevac = document.querySelectorAll("#date-covid2");
			var devtalkT = document.querySelectorAll("#devtalkTopic");
			var specialT = document.querySelectorAll("#special");
			var skillsetList = document.querySelectorAll(".skillset-list");
			var coviddate = document.querySelectorAll("#covid-date");
			var coviddate2 = document.querySelectorAll("#covid-date2");
			var textarea = document.querySelectorAll(".ins-textarea1");
			var specialtext = document.querySelectorAll(".special");
			var devtext = document.querySelectorAll("#devtalkTopic");
			
				devtext[datanum].value = data[datanum].devtalk_topic;
			

			
				specialtext[datanum].value = data[datanum].something_special;
			

			// persName.textContent = data[i].first_name;
			// persLname.textContent = data[i].last_name;
			// persMail.textContent = data[i].email;
			// persPhone.textContent = data[i].phone;
			// datecovid.firstChild.nodeValue = data[i].had_covid_at;
			// datevac.firstChild.nodeValue = data[i].vaccinated_at;
			// devtalkT.value = data[i].devtalk_topic;
			// specialT.value = data[i].something_special;
			// appsnum.firstChild.nodeValue = i;

			if(data[datanum].phone == null){
		
					persPhone[datanum].textContent = "N/A";
				
			}

			if(data[datanum].work_preference == "from_office"){
			
					sairmebtn[datanum].setAttribute("src", "images/button.svg");
				
			}
			if(data[datanum].work_preference == "from_home"){
				
					homebtn[datanum].setAttribute("src", "images/button.svg");
				
			}
			if(data[datanum].work_preference == "hybrid"){
			
					hybridbtn[datanum].setAttribute("src", "images/button.svg");
				
			}
			if(data[datanum].had_covid == true){
			
					covidyesbtn[datanum].setAttribute("src", "images/button.svg");
					coviddate[datanum].style.display = "block";
				
			}
			if(data[datanum].had_covid == false){
			
					covidnobtn[datanum].setAttribute("src", "images/button.svg");
					coviddate[datanum].style.display = "none";
				
			}
			if(data[datanum].vaccinated == true){
		
					vacyesbtn[datanum].setAttribute("src", "images/button.svg");
					coviddate2[datanum].style.display = "block";
				
			}
			if(data[datanum].vaccinated == false){
				
					vacnobtn[datanum].setAttribute("src", "images/button.svg");
					coviddate2[datanum].style.display = "none";
	
			}
			if(data[datanum].will_organize_devtalk == true){
			
					textarea[datanum].style.display = "block";
					insyesbtn[datanum].setAttribute("src", "images/button.svg");
				
			}
			if(data[datanum].will_organize_devtalk == false){
			
					textarea[datanum].style.display = "none";
					insnobtn[datanum].setAttribute("src", "images/button.svg");
				
			}
		

		const skillIds = {
			1: 'HTML',
			2: 'CSS',
			3: 'PHP',
			4: 'Laravel',
			5: 'React.JS',
			6: 'Vue.JS',
			7: 'Svelte',
			8: 'Angular',
		};


		for(var l=0; l<data[datanum].skills.length; l++){
			var skillp = document.createElement("div");
			skillp.innerHTML = `<p> <snap class="skillset-skill">${skillIds[data[datanum].skills[l].id]} </snap> <snap class="yox">Years of Experience: <snap class="skillset-year">${data[datanum].skills[l].experience}</snap></snap></p> `
				skillsetList[datanum].appendChild(skillp);
		}
	}
})};

function fetchSkills() {
	fetch("https://bootcamp-2022.devtest.ge/api/skills")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const html = data
				.map((title) => {
					return `<option id="opt"> ${title.title}</option>`;
				})
				.join("");
			var skillSel = document.querySelector(".select-skill");
			skillSel.innerHTML = `
			${html}`;
		})
		.catch((error) => {
			console.log(error);
		});
}

class Userskill {
	constructor(skill, exp) {
		this.skill = skill;
		this.exp = exp;
	}
}

function skillToDb(skill, exp) {
	const dbRequest = indexedDB.open("skillsDB", 1);
	dbRequest.onerror = function (event) {
		console.error(event);
	};

	dbRequest.onupgradeneeded = function () {
		const db = dbRequest.result;
		const store = db.createObjectStore("skills", {
			keyPath: "id",
			autoIncrement: "true",
		});
		store.createIndex("skillName", "id", { unique: true });
	};

	dbRequest.onsuccess = function (e) {
		key++;
		const skill = document.querySelector(".select-skill").value;
		const exp = document.querySelector("#skills-exp").value;
		const db = dbRequest.result;
		const transaction = db.transaction("skills", "readwrite");
		const store = transaction.objectStore("skills");

		const skillIds = {
			HTML: 1,
			CSS: 2,
			PHP: 3,
			Laravel: 4,
			"React.JS": 5,
			"Vue.JS": 6,
			Svelte: 7,
			Angular: 8,
		};

		var resp = store.put({ id: skillIds[skill], lang: skill, year: exp });
		resp.onsuccess = function (e) {
			var ID = e.target.result;
			const k = document.querySelector("#key");
			const skillsList = document.querySelector("#skills-list-skills");
		};
	};
}

function fillSkillValues() {
	const skill = document.querySelector(".select-skill").value;
	const exp = document.querySelector("#skills-exp").value;
	const userskill = new Userskill(skill, exp);
	const row = document.querySelector("#row");
	const form = document.querySelector("#skills");
	exp.value = "";
	const opt = document.querySelector("#opt");

	if (localStorage.getItem("IDB") == "true") {
		const dbRequest = indexedDB.open("skillsDB", 1);
		dbRequest.onsuccess = function () {
			const db = dbRequest.result;
			const transaction = db.transaction("skills", "readwrite");
			const store = transaction.objectStore("skills");
			const getReq = store.getAll();

			getReq.onsuccess = (e) => {
				let req = e.target;
				row.innerHTML = req.result
					.map((skills) => {
						return `
						<div id="newSkill" class="skills-exp-div">
							<div id="skills-list-skills">
								<div id="keyId" key="">
									<span id="skills-list-title">${skills.lang}</span><span id="skills-list-year">Years of Experience: ${skills.year}</span>
											</div>
									<img onclick='removeSkill(this)'id="remove" src="images/remove.svg">
								</div>
							</div>`;
					})
					.join("\n");
				form.appendChild(row);

				const newpage = document.querySelector("#nextpage");
				const newskill = document.querySelector("#newSkill");
				const switchbar = document.querySelector(".skill-switchbar");

				if (req.result.length === 4) {
					switchbar.classList.add("skill-switch");
					row.appendChild(switchbar);
				}
				if (req.result.length > 4) {
					row.appendChild(switchbar);
					switchbar.classList.add("skill-switch");
				}
				if (req.result.length > 0) {
					newpage.setAttribute("form", "skills");
					newpage.removeAttribute("onclick");
				}
			};
		};
	}
}

function fillValues() {
	if (localStorage.getItem("fname") != null) {
		fname.value = localStorage.getItem("fname");
	}
	if (localStorage.getItem("lname") != null) {
		lname.value = localStorage.getItem("lname");
	}
	if (localStorage.getItem("email") != null) {
		email.value = localStorage.getItem("email");
	}
	if (localStorage.getItem("number") != null) {
		number.value = localStorage.getItem("number");
	}
}

function fillCovidValues() {

	if(localStorage.getItem("covid-date") != null) {
		var datecovid = document.querySelector("#date-covid");
		datecovid.value=localStorage.getItem("covid-date");
	}

	if(localStorage.getItem("vaccine-date") != null) {
		var datevac = document.querySelector("#date-covid2");
		datevac.value=localStorage.getItem("vaccine-date");
	}

	if (localStorage.getItem("work-place") != null) {
		var workradios = document.getElementsByName("work-radio");
		var workplace = localStorage.getItem("work-place");
		for (var i = 0; i < workradios.length; i++) {
			if (workradios[i].value == workplace) {
				workradios[i].checked = true;
			}
		}
	}
	if (localStorage.getItem("covid-history") != null) {
		var covidradios = document.getElementsByName("covid-radio");
		var covidhistory = localStorage.getItem("covid-history");
		for (var i = 0; i < covidradios.length; i++) {
			if (covidradios[i].value == covidhistory) {
				covidradios[i].checked = true;
			}
		}
	}
	if (localStorage.getItem("vaccine-history") != null) {
		var covidradios2 = document.getElementsByName("covid-radio2");
		var vaccinehistory = localStorage.getItem("vaccine-history");
		for (var i = 0; i < covidradios2.length; i++) {
			if (covidradios2[i].value == vaccinehistory) {
				covidradios2[i].checked = true;
			}
		}
	}
	showDate();
}

function fillInsightsValues() {
	if (localStorage.getItem("devtalks") != null) {
		var insradio = document.getElementsByName("ins-radio");
		var devtalk = localStorage.getItem("devtalks");
		for (var i = 0; i < insradio.length; i++) {
			if (insradio[i].value == devtalk) {
				insradio[i].checked = true;
				showTxtArea();
			}
		}
	}
	if (localStorage.getItem("special") != null) {
		const special = document.querySelector("#special");
		special.value = localStorage.getItem("special");
	}
	if (localStorage.getItem("devtalkTopic") != null) {
		const devtalkTopic = document.querySelector("#devtalkTopic");
		devtalkTopic.value = localStorage.getItem("devtalkTopic");
	}
}

function pinfoToStorage() {
	localStorage.setItem("fname", fname.value);
	localStorage.setItem("lname", lname.value);
	localStorage.setItem("email", email.value);
	localStorage.setItem("number", number.value);
}

function insightsToStorage() {
	const insRadio = document.querySelector("input[name=ins-radio]:checked");
	localStorage.setItem("devtalks", insRadio.value);
	const special = document.querySelector("#special").value;
	localStorage.setItem("special", special);
	const devtalkTopic = document.querySelector("#devtalkTopic").value;
	localStorage.setItem("devtalkTopic", devtalkTopic);
}

function covidinfoToStorage() {
	const workRadio = document.querySelector("input[name=work-radio]:checked");
	const covidRadio = document.querySelector("input[name=covid-radio]:checked");
	const covidRadio2 = document.querySelector(
		"input[name=covid-radio2]:checked"
	);
	const datecovid = document.querySelector("#date-covid");
	const datevac = document.querySelector("#date-covid2");

	localStorage.setItem("work-place", workRadio.value);
	localStorage.setItem("covid-history", covidRadio.value);
	localStorage.setItem("vaccine-history", covidRadio2.value);
	localStorage.setItem("covid-date", datecovid.value);
	localStorage.setItem("vaccine-date", datevac.value);
}

function addskill() {
	const skill = document.querySelector(".select-skill").value;
	const exp = document.querySelector("#skills-exp").value;
	const userskill = new Userskill(skill, exp);
	const row = document.querySelector("#row");
	const form = document.querySelector("#skills");
	exp.value = "";
	const opt = document.querySelector("#opt");
	const newSkill = document.querySelector("#newSkill");
	if (!exp) {
		showError();
	} else {
		i++;
		localStorage.setItem("IDB", "true");
		localStorage.setItem("skills", "yes");
		skillToDb(skill, exp);
		fillSkillValues();
		const newpage = document.querySelector("#nextpage");
		const newskill = document.querySelector("#newSkill");
		const switchbar = document.querySelector(".skill-switchbar");

		const dbRequest = indexedDB.open("skillsDB", 1);
		dbRequest.onsuccess = function () {
			const db = dbRequest.result;
			const transaction = db.transaction("skills", "readonly");
			const store = transaction.objectStore("skills");
			const getReq = store.getAll();
			getReq.onsuccess = (e) => {
				var req = e.target;
				if (req.result.length === 4) {
					switchbar.classList.add("skill-switch");
					row.appendChild(switchbar);
				}
				if (req.result.length > 4) {
					switchbar.classList.add("skill-switch");
					row.appendChild(switchbar);
				}
				if (req.result.length > 0) {
					newpage.removeAttribute("onclick");
					newpage.setAttribute("form", "skills");
				}
			};
		};
	}
}

function showError() {
	document.querySelector(".skill-error").style.display = "block";
	setTimeout(
		() => (document.querySelector(".skill-error").style.display = "none"),
		4000
	);
}

function removeSkill(el) {
	var element = el;
	b++;
	i--;
	const skillList = document.querySelector("#skills-list-skills");
	const newpage = document.querySelector("#nextpage");
	const body = document.querySelector(".skills-divL");
	const switchbar = document.querySelector(".skill-switchbar");
	const skill = document.querySelector(".select-skill").value;
	var selectobject = document.getElementById("selectBox");

	const skillIds = {
		HTML: 1,
		CSS: 2,
		PHP: 3,
		Laravel: 4,
		"React.JS": 5,
		"Vue.JS": 6,
		Svelte: 7,
		Angular: 8,
	};

	const dbRequest = indexedDB.open("skillsDB", 1);
	dbRequest.onsuccess = function () {
		const db = dbRequest.result;
		const transaction = db.transaction("skills", "readwrite");
		const store = transaction.objectStore("skills");
		const getReq = store.getAll();
		getReq.onsuccess = (e) => {
			var req = e.target;
			var int = req.result.length;

			if (int < 5) {
				switchbar.classList.remove("skill-switch");
				body.appendChild(switchbar);
				b = int;
			}
			if (int == 1) {
				newpage.removeAttribute("form");
				newpage.setAttribute("onclick", "showError()");
				localStorage.setItem("skills", "no");
			}
			element.parentElement.parentElement.remove();
			var deleteKey =
				skillIds[
					element.previousSibling.previousSibling.firstElementChild.textContent
				];
			store.delete(deleteKey);
		};
	};
}

function checkErrors() {
	if (fname.checkValidity()) {
		document.querySelector(".fname-warn").style.display = "none";
	} else {
		document.querySelector(".fname-div").classList.add("pinfo-error");
		document.querySelector(".fname-warn").style.display = "flex";
	}
	if (lname.checkValidity()) {
		document.querySelector(".lname-warn").style.display = "none";
	} else {
		document.querySelector(".lname-div").classList.add("pinfo-error");
		document.querySelector(".lname-warn").style.display = "flex";
	}
	if (email.checkValidity()) {
		document.querySelector(".email-warn").style.display = "none";
	} else {
		document.querySelector(".email-div").classList.add("pinfo-error");
		document.querySelector(".email-warn").style.display = "flex";
	}
	if (number.checkValidity()) {
		document.querySelector(".phone-warn").style.display = "none";
	} else {
		document.querySelector(".phone-div").classList.add("pinfo-error");
		document.querySelector(".phone-warn").style.display = "flex";
	}
}

function showDate() {
	if (covidyes.checked) {
		var coviddate = document.querySelector("#date-covid");
		document.querySelector("#covid-date").style.display = "block";
		coviddate.max = new Date().toISOString().split("T")[0];
		document.querySelector("#covid-date").required = true;
	} else {
		document.querySelector("#covid-date").style.display = "none";
		document.querySelector("#covid-date").required = false;
		document.querySelector("#covid-date").value = "";
	}

	if (vacyes.checked) {
		var vacdate = document.querySelector("#date-covid2");
		vacdate.max = new Date().toISOString().split("T")[0];
		document.querySelector("#covid-date2").style.display = "block";
			document.querySelector("#covid-date2").required = true;
	} else {
		document.querySelector("#covid-date2").style.display = "none";
		document.querySelector("#covid-date2").required = false;
		document.querySelector("#covid-date2").value = "";
	}
}

function showTxtArea() {
	if (insyes.checked) {
		document.querySelector(".ins-textarea1").style.display = "block";
		document.querySelector(".ins-form").classList.add("ins-form1");
		document.querySelector(".ins-switchbar").classList.add("ins-switch");
		document.querySelector("#devtalkTopic").required = true;
	} else {
		document.querySelector(".ins-textarea1").style.display = "none";
		document.querySelector(".ins-form").classList.remove("ins-form1");
		document.querySelector(".ins-switchbar").classList.remove("ins-switch");
		document.querySelector("#devtalkTopic").required = false;
		document.querySelector("#devtalkTopic").value = "";
	}
}

function changePage(url) {
	return () => {
		window.open(url, "_self");
	};
}

function changePageAfter(second) {
	return (url) => {
		setTimeout(changePage(url), second * 1000);
	};
}

const changePageAfter3sec = changePageAfter(3);

function thanks() {
	if (
		localStorage.getItem("fname") == null ||
		localStorage.getItem("lname") == null ||
		localStorage.getItem("email") == null ||
		localStorage.getItem("devtalks") == null ||
		localStorage.getItem("special") == null ||
		localStorage.getItem("work-place") == null ||
		localStorage.getItem("covid-history") == null ||
		localStorage.getItem("vaccine-history") == null ||
		localStorage.getItem("IDB") == null ||
		localStorage.getItem("skills") == "no" ||
		localStorage.getItem("covid-date") == null ||
		localStorage.getItem("vaccine-date") ==  null
	) {
		document.querySelector(".thanks").textContent = "Fill the form!";
		changePageAfter3sec("submit.html");
	} else {
		sendForm();
		document.querySelector(".thanks").textContent = "Thanks for Joining 😊";
		localStorage.setItem("submitted", "yes");
		changePageAfter3sec("index.html");
	}
}

function checkForms() {
	const subtn = document.querySelector("#subBtn");
	if (
		localStorage.getItem("fname") == null ||
		localStorage.getItem("lname") == null ||
		localStorage.getItem("email") == null ||
		localStorage.getItem("devtalks") == null ||
		localStorage.getItem("special") == null ||
		localStorage.getItem("work-place") == null ||
		localStorage.getItem("covid-history") == null ||
		localStorage.getItem("vaccine-history") == null ||
		localStorage.getItem("IDB") == null ||
		localStorage.getItem("skills") == "no" ||
		localStorage.getItem("covid-date") == null ||
		localStorage.getItem("vaccine-date") ==  null
	) {
		subtn.disabled = true;
		invalidSubmit();
	} else {
		subtn.disabled = false;
	}
}

function invalidSubmit() {
	document.querySelector(".submit-error").style.display = "block";
}

function sendForm() {
	var nmb;
	var hc;
	var vh;
	var dt;
	var dtt;
	var cdate;
	var skId;
	var expe;
	var vdate;
	const dbRequest = indexedDB.open("skillsDB", 1);
	dbRequest.onsuccess = function () {
		const db = dbRequest.result;
		const transaction = db.transaction("skills", "readwrite");
		const store = transaction.objectStore("skills");
		const getReq = store.getAll();

		getReq.onsuccess = (e) => {
			let req = e.target;

			const skills = req.result.map((res) => ({
				id: res.id,
				experience: res.year,
			}));

			if (localStorage.getItem("number") != "") {
				nmb = localStorage.getItem("number");
			}

			if (localStorage.getItem("devtalkTopic") != "") {
				dtt = localStorage.getItem("devtalkTopic");
			}

			if (localStorage.getItem("covid-history") == "yes") {
				hc = true;
				cdate = localStorage.getItem("covid-date");
			} else {
				hc = false;
			}

			if (localStorage.getItem("vaccine-history") == "yes") {
				vh = true;
				vdate = localStorage.getItem("vaccine-date");
			} else {
				vh = false;
			}

			if (localStorage.getItem("devtalks") == "yes") {
				dt = true;
			} else {
				dt = false;
			}

			if(localStorage.getItem("cdate") == "") {
				cdate = "1111-11-11"
			}
			if(localStorage.getItem("vdate") == "") {
				vdate = "1111-11-11"
			}


			fetch("https://bootcamp-2022.devtest.ge/api/application", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					token: localStorage.getItem("token"),
					first_name: localStorage.getItem("fname"),
					last_name: localStorage.getItem("lname"),
					email: localStorage.getItem("email"),
					phone: nmb,
					work_preference: localStorage.getItem("work-place"),
					had_covid: hc,
					had_covid_at: cdate,
					vaccinated: vh,
					vaccinated_at: vdate,
					will_organize_devtalk: dt,
					devtalk_topic: dtt,
					something_special: localStorage.getItem("special"),
					skills,
				}),
			});
		};
	};
}
