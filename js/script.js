const con = document.querySelector('.content')
const addTaskBtn = document.querySelector('#add-task')
const AddForm = document.querySelector('#create')
const AddModal = document.querySelector('.create')
const addFormBtn = AddForm.querySelector('.add')

const EditForm = document.querySelector('#edit')
const EditModal = document.querySelector('.edit')
const EditFormBtn = EditForm.querySelector('.editBtn')


AddModal.addEventListener('click', (e) => {
    const blur = AddModal.querySelector('.blur')

    if (e.target == blur) {
        AddModal.classList.add('none')
        document.body.style.overflow = 'auto'
    }
})

EditModal.addEventListener('click', (e) => {
    const blur = EditModal.querySelector('.blur')

    if (e.target == blur) {
        EditModal.classList.add('none')
        document.body.style.overflow = 'auto'
    }
})

let arr = []
let count = 0
edit
addTaskBtn.addEventListener('click', () => {
    AddModal.classList.remove('none')
})

addFormBtn.addEventListener('click', (e) => {
    const formData = new FormData(AddForm)
    let obj = {}
    const inputs = AddForm.querySelectorAll('input')
    const option = AddForm.querySelectorAll('option')


    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            inputs[i].classList.add('error')
            break
        } else if (i == inputs.length - 1) {
            formData.forEach((item, key) => {
                return obj[key] = item
            })
            CreateElement(obj)
            inputs[i].value = ''
            option[0].selected = true
            AddModal.classList.add('none')
        } else {
            inputs[i].classList.remove('error')
            continue;
        }
        inputs[i].value = ''
    }

    arr.push(obj)

    e.preventDefault()
})

function CreateElement(obj) {
    // Create elements
    let box = document.createElement('div')
    box.classList.add('box')
    box.id = count

    let title = document.createElement('h2')
    title.innerHTML = obj.title
    title.classList.add('title')
    title.id = 'title'

    let description = document.createElement('p')
    description.innerHTML = obj.description
    description.classList.add('description')
    description.id = 'description'

    let timeBox = document.createElement('div')
    timeBox.classList.add('time')


    let date = document.createElement('span')
    date.innerHTML = obj.date
    date.id = 'date'

    let time = document.createElement('span')
    time.innerHTML = obj.time
    time.id = 'time'

    let progressBox = document.createElement('div')
    progressBox.classList.add('progress-box')
    progressBox.id = 'progress'

    if (obj.progress == 'new') {
        progressBox.innerHTML = "Не выполнено"
        progressBox.classList.add('new')
    } else if (obj.progress == 'progress') {
        progressBox.innerHTML = "В прогрессе"
        progressBox.classList.add('progress')
    } else {
        progressBox.innerHTML = "Выполнено"
        progressBox.classList.add('done')
    }


    // Append
    timeBox.appendChild(date)
    timeBox.appendChild(time)

    box.appendChild(title)
    box.appendChild(description)
    box.appendChild(timeBox)
    box.appendChild(progressBox)

    con.append(box)

    // id count
    count++

    // edit
    box.addEventListener('click', () => {
        EditModal.classList.remove('none')
        for (let i = 0; i < EditForm.children.length - 1; i++) {
            let key = EditForm.children[i].name
            EditForm.children[key].value = obj[key]
        }
        edit(box)
    })
}
const box = document.querySelector('.box')

function edit(elem) {
    EditFormBtn.addEventListener('click', (e) => {
        const formData2 = new FormData(EditForm)
        const inputs = EditForm.querySelectorAll('input')

        let obj2 = {}

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].classList.add('error')
                break;
            } else if (i == inputs.length - 1) {
                formData2.forEach((item, key) => {
                    return obj2[key] = item
                })
                for (let i = 0; i < EditForm.children.length - 1; i++) {
                    let key = EditForm.children[i].name
                    let a = elem.querySelector(`#${key}`)
                    a.innerHTML = obj2[key]

                    elem.addEventListener('click', () => {
                        EditModal.classList.remove('none')
                        for (let k = 0; k < EditForm.children.length - 1; k++) {
                            let key2 = EditForm.children[k].name
                            EditForm.children[key2].value = obj2[key2]
                        }
                        edit(elem)
                    })
                }
                EditModal.classList.add('none')
            } else {
                inputs[i].classList.remove('error')
                continue;
            }
        }
        const progress = elem.querySelector('.progress-box')

        if (progress.innerHTML == 'new') {
            progress.innerHTML = "Не выполнено"
            progress.classList.remove('progress', 'done')
            progress.classList.add('new')
        } else if (progress.innerHTML == 'progress') {
            progress.innerHTML = "В прогрессе"
            progress.classList.remove('done', 'new')
            progress.classList.add('progress')
        } else if (progress.innerHTML == 'done') {
            progress.innerHTML = "Выполнено"
            progress.classList.remove('progress', 'new')
            progress.classList.add('done')
        }


        e.preventDefault()
    })
}

// EditForm.tagName