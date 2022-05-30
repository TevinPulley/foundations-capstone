const housesContainer = document.querySelector("#jobs-container");
const form = document.querySelector("form");

const baseURL = `http://localhost:4004/api/jobs`;

const jobsCallback = ({ data: jobs }) => displayJobs(jobs);
const errCallback = (err) => console.log(err);

const getAllJobs = () =>
  axios.get(baseURL).then(jobsCallback).catch(errCallback);
const createJob = (body) =>
  axios.post(baseURL, body).then(jobsCallback).catch(errCallback);
const deleteJob = (id) =>
  axios.delete(`${baseURL}/${id}`).then(jobsCallback).catch(errCallback);

function submitHandler(e) {
  e.preventDefault();

  let jobname = document.querySelector("#jobName");
  let jobnumber = document.querySelector("#jobNum");
  let partnumber = document.querySelector("#partNum");
  let partsection = document.querySelector("#partSect");

  let bodyObj = {
    jobname: jobname.value,
    jobnumber: jobnumber.value,
    partnumber: partnumber.value,
    partsection: partsection.value,
    duedate: duedate.value,
  };

  createJob(bodyObj);

  jobname.value = "";
  jobnumber.value = "";
  partnumber.value = "";
  partsection.value = "";
  duedate.value = "";
}

function createJobCard(job) {
  const jobCard = document.createElement("div");
  jobCard.classList.add("job-card");

  jobCard.innerHTML = `<p class="jobname">${job.jobname}</p>
  <div class="job-info">
    <p class"jobnumber">job # ${job.jobnumber}</p>
    <p class"partnumber">part # ${job.partnumber}</p>
    <p class"partsection">part-section: ${job.partsection}</p>
    <p class"duedate">due-date: ${job.duedate}</p>
    <button class="delete" onclick="deleteJob(${job.id})">delete</button>

  
    `;
  return jobCard;
}

function displayJobs(arr) {
  const jobsContainer = document.getElementById("jobs-container");
  jobsContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const jobCard = createJobCard(arr[i]);
    jobsContainer.appendChild(jobCard);
  }
}

form?.addEventListener("submit", submitHandler);

getAllJobs();
