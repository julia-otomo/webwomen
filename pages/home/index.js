function createCardJobsList (element) {
    
    let li = document.createElement('li');
    li.id = element.id;

    let title = document.createElement('h3');
    title.innerText = element.title;

    let jobsListLocal = document.createElement('div');
    jobsListLocal.classList.add('jobs__list--local');

    let spanLocal1 = document.createElement('span');
    let spanLocal2 = document.createElement('span');
    spanLocal1.classList.add('jobs__list--span1');
    spanLocal2.classList.add('jobs__list--span2');
    spanLocal1.innerText = element.enterprise;
    spanLocal2.innerText = element.location;

    jobsListLocal.append(spanLocal1, spanLocal2);

    let descriptionJob = document.createElement('p');
    descriptionJob.innerText = element.descrition;

    let jobsListType = document.createElement('div');
    jobsListType.classList.add('jobs__list--type');

    let spanType1 = document.createElement('span');
    let spanType2 = document.createElement('span');
    spanType1.classList.add('jobs__list--type1');
    spanType2.classList.add('jobs__list--type2');
    spanType1.innerText = element.modalities[0];
    spanType2.innerText = element.modalities[1];

    jobsListType.append(spanType1, spanType2);

    let addButton = document.createElement('button');
    addButton.classList.add('jobs__list--button');
    addButton.dataset.id = element.id;
    addButton.innerText = 'Cadastrar';

    li.append(title, jobsListLocal, descriptionJob, jobsListType, addButton);

    return li;
}

function renderCardJobsList(array) {
    const jobsList = document.querySelector('#jobs__list');

    array.forEach (job => {
        let jobsCards = createCardJobsList(job);

        jobsList.append(jobsCards);
    })
}

function createCardApplyJobsLIst (element) {
    let li = document.createElement('li');
    li.id = element.id;

    let applyJobsListTitle = document.createElement('div');
    applyJobsListTitle.classList.add('apply-jobs__list--title');

    let title = document.createElement('h3');
    title.innerText = element.title;

    let removeJob = document.createElement('button');
    removeJob.classList.add('remove-button');
    removeJob.dataset.id = element.id;

    let buttonImage = document.createElement('img');
    buttonImage.src = "/assets/img/trash-icon.svg";

    removeJob.append(buttonImage);

    applyJobsListTitle.append(title, removeJob);

    let applyJobsListLocal = document.createElement('div');
    applyJobsListLocal.classList.add('apply-jobs__list--local');

    let spanLocal1 = document.createElement('span');
    let spanLocal2 = document.createElement('span');
    spanLocal1.classList.add('span1');
    spanLocal2.classList.add('span2');
    spanLocal1.innerText = element.enterprise;
    spanLocal2.innerText = element.location;

    applyJobsListLocal.append(spanLocal1, spanLocal2);

    li.append(applyJobsListTitle, applyJobsListLocal);

    return li;
}

function applyJobsContainer () {
    const sectionApplyJobs = document.querySelector('.main__section--apply-jobs');
    const ulApplyJobs = document.querySelector('#apply-jobs__list');
    if (ulApplyJobs.children.length === 0) {
        let p = document.createElement('p');
        p.classList.add('apply-jobs-empty');
        p.innerText = 'Você ainda não aplicou para nenhuma vaga';

        sectionApplyJobs.appendChild(p);
    } 
}

function getApplyJobsArray() {
    return JSON.parse(localStorage.getItem('@Apply-jobs')) || [];
}

function findJobsById (array, id) {
    
    return array.find(job => job.id == id);
}

function addAndRemoveJobs () {
    let applyJobsArray = getApplyJobsArray();
    let jobsListButtons = document.querySelectorAll('.jobs__list--button');

    jobsListButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let buttonId = e.target.dataset.id;
            let jobFound = findJobsById(jobsData, buttonId);
            
            if (!applyJobsArray.includes(jobFound)) {
                applyJobsArray.push(jobFound);
                button.innerText = 'Remover candidatura';
                localStorage.setItem('@Apply-jobs', JSON.stringify(applyJobsArray));
            } else {
                let jobIndex = applyJobsArray.indexOf(jobFound);
                applyJobsArray.splice(jobIndex, 1);
                button.innerText = 'Candidatar';
                localStorage.setItem('@Apply-jobs', JSON.stringify(applyJobsArray));
            }
        })
    })
}

function renderCardsApplyJobs () {
   
}

renderCardJobsList(jobsData);
applyJobsContainer();
addAndRemoveJobs ();