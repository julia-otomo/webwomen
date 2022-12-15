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

function renderCardJobsList() {
    const jobsList = document.querySelector('#jobs__list');

    jobsData.forEach (job => {
        let jobsCards = createCardJobsList(job);

        jobsList.append(jobsCards);
    })
}

function createCardApplyJobsLIst (element) {
    
}

renderCardJobsList()