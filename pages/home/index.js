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

    let jobsListTypesAndButton = document.createElement('div');
    jobsListTypesAndButton.classList.add('jobs__list--types-and-jobs');

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

    let applyJobsArray = getApplyJobsArray();
    
    if (applyJobsArray.find(job => {
        return addButton.dataset.id == job.id;
    })) {
        addButton.innerText = 'Remover Candidatura';
    } else {
        addButton.innerText = 'Cadastrar';
    }

    jobsListTypesAndButton.append(jobsListType, addButton);

    li.append(title, jobsListLocal, descriptionJob, jobsListTypesAndButton);

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
    let applyJobsArray = getApplyJobsArray()
    let p = document.querySelector('.apply-jobs__p')
    if (applyJobsArray.length === 0) {
        p.classList.add('apply-jobs-empty');
    } else {
        p.classList.remove('apply-jobs-empty')
    }
}

function getApplyJobsArray() {
    return JSON.parse(localStorage.getItem('@Apply-jobs')) || [];
}

function findJobsById (array, id) {
    
    return array.find(job => job.id == id);
}

function addAndRemoveJobs () {
    let jobsListButtons = document.querySelectorAll('.jobs__list--button');

    jobsListButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let applyJobsArray = getApplyJobsArray();
            let buttonId = e.target.dataset.id;
            let jobFound = findJobsById(jobsData, buttonId);
            let obj1 = {nome: 'sioadioasdj'};
            let obj2 = {nome: 'sioadioasdj'};
            
            if (!applyJobsArray.find(job => {
                return job.id == jobFound.id
            })) {
                applyJobsArray.push(jobFound);
                button.innerText = 'Remover candidatura';
                localStorage.setItem('@Apply-jobs', JSON.stringify(applyJobsArray));
                renderCardsApplyJobs ();
                applyJobsContainer();
            } else {
                let jobIndex = applyJobsArray.indexOf(jobFound);
                applyJobsArray.splice(jobIndex, 1);
                button.innerText = 'Candidatar';
                localStorage.setItem('@Apply-jobs', JSON.stringify(applyJobsArray));
                renderCardsApplyJobs ();
                applyJobsContainer();
            }
        })
    })
}

function renderCardsApplyJobs () {
   let applyJobsList = getApplyJobsArray();
   let ulApplyJobs = document.querySelector('#apply-jobs__list');

   ulApplyJobs.innerHTML = '';

   applyJobsList.forEach(job => {
    let cards = createCardApplyJobsLIst(job);
    ulApplyJobs.append(cards);
    removeApplyedJob ();
    applyJobsContainer ();
   })
}

function removeApplyedJob () {
    let removeButtons = document.querySelectorAll('.remove-button');
    
    removeButtons.forEach (button => {
        button.addEventListener('click', (e) => {
            let applyJobsArray = getApplyJobsArray();
            let buttonId = e.target.dataset.id;
            let filteredArray = applyJobsArray.filter(job => job.id != buttonId);
            localStorage.setItem('@Apply-jobs', JSON.stringify(filteredArray));
            renderCardsApplyJobs();
            let findButton = document.querySelectorAll('.jobs__list--button');
            let findButtonArray = [...findButton];
            findButtonArray.find(button => button.dataset.id == buttonId).innerText = 'Candidatar';
            applyJobsContainer();
        })
    })
}

renderCardJobsList(jobsData);
applyJobsContainer();
addAndRemoveJobs ();
renderCardsApplyJobs ();