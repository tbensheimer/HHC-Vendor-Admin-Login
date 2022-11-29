import { typeCatData, demo } from "./JSON.js";

const table = document.querySelector(".types-cats-data");

let data = JSON.parse(typeCatData);

const unique = [... new Map(data.map((d) => [d.type, d])).values()]; //unique array of types code that works for array of objects
let uniqueTypes = [];

unique.forEach(object => {
    uniqueTypes.push(object.type)
    });

    let demonstration = JSON.parse(demo);


    try {
    Object.entries(demonstration).forEach(demo => {


        let type = demo[0];
        let items = demo[1];

        let htmlStart = `<td class="types-td">
        <button class="collapsible btn types-td-btn" data-type="${type}" id="btn" name="type">${type} <i alt="arrow down icon" class="fa-solid fa-chevron-down"></i></button>
        <div class="content content-div mt-4 pt-3">
        <div class="btn-div">
        <button id="add-category" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-primary mb-4" onclick="addCategory()" type="text">Add Category</button>
        <button style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-warning mb-4 edit-btn" onclick="editCategory(this)" type="text">Edit Categories</button>
        <button style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-success mb-4 save-btn hidden" onclick="saveCategory(this)" type="text">Save Categories</button>
        <button style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-danger mb-4" onclick="deleteType(this)" type="text">Delete Type</button>
        </div>
        `;
        let htmlEnd = `
        <div class="hidden input-category-div" id="input-category-div">
        <label for="add-category" hidden>Insert another category</label>
        <input id="add-category" type="text" placeholder=" Insert a Category..." class="category-input editable mb-3" />
        <button id="add-category-input" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-primary mb-3" type="text">Add</button>
        </div>

        </div>
        </td>`;

        let htmlItems = ``;

        for (var ii in items) {
            htmlItems += `<li class="category">${items[ii]}</li>`;
        }



        /*
        table.insertAdjacentHTML("beforeend", `
    <td class="types-td">
    <button class="collapsible btn types-td-btn" data-type="${type}" id="btn" name="type">${type} <i class="fa-solid fa-chevron-down"></i></button>
    <div class="content content-div mt-4 pt-2">
    <p class="category">${items.join("<br />")}</p>
    <div class="btn-div">
    <button  style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-primary mb-4" type="text">Add</button>
    <button  style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-warning mb-4" type="text">Edit</button>
    <button  style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-danger mb-4" type="text">Delete</button>
    </div>
    </div>
    </td>
    `)
        */
       
        table.insertAdjacentHTML("beforeend", htmlStart + htmlItems + htmlEnd);
    })
    
    }
catch {

    table.insertAdjacentHTML("beforeend", `
<div class="alert alert-danger">Error: Could not retrive data. Please try again.</div>
    `)

}


document.addEventListener('click', e => {
    if(e.target.id == 'btn') {

        e.target.classList.toggle("active");
        let td = e.target.parentNode;
        let content = td.querySelector(".content-div");
        let icon = td.parentNode.querySelector(".fa-chevron-down");
        icon.classList.toggle("rotate");
        content.classList.toggle("content")
    }
})

table.addEventListener("click", e => {
if (e.target.id == "add-category") {
let contentDiv = e.target.parentNode.parentNode;
let inputCategory = contentDiv.querySelector(".input-category-div");
inputCategory.classList.remove("hidden");
}

})

table.addEventListener("click", e => {
    const inputDiv = e.target.parentNode;
    const catInput = inputDiv.parentNode.querySelector(".category-input");

if (e.target.id == "add-category-input") {
if (catInput.value !== "") {
inputDiv.insertAdjacentHTML("beforebegin", `
<li class="category">${catInput.value}</li>
`);
inputDiv.classList.add("hidden");
catInput.value = "";
}
}
});


const modalBody = document.querySelector(".modal-body");
const modalTypeInput = document.querySelector(".modal-type-input");
const modalCategoryInput = document.querySelector(".modal-category-input");
const modalAddBtn = document.querySelector(".modal-add-type-cats-btn");
const typeSuccessAlert = document.querySelector(".added-type-alert");
const typeErrorAlert = document.querySelector(".type-error-alert");
const addAnotherCategory = document.querySelector(".add-category-input-btn");
const deleteLastCategory = document.querySelector(".delete-category-input-btn");




addAnotherCategory.addEventListener("click", () => {
    const catsinputs = Array.from(document.getElementsByClassName("modal-category-input"));
    let allInputsFilled = true
    catsinputs.forEach(input => {

        if (input.value === "") {
            allInputsFilled = false;
        }
    })

if (allInputsFilled && modalTypeInput.value !== "") {
    addAnotherCategory.insertAdjacentHTML("beforebegin", `
    <label for="add-another-category" hidden>Add another category</label>
    <input id="add-another-category" name="category" type="text" id="modal-category-input" class="form-control modal-category-input mb-4 added-input" placeholder="Add one category..." />
    `);
    typeErrorAlert.classList.add("hidden");
} 
else if (allInputsFilled === false || modalTypeInput.value === "") {
typeErrorAlert.classList.remove("hidden");
}
})

deleteLastCategory.addEventListener("click", () => {
    const addedInputs = Array.from(modalBody.getElementsByClassName("added-input"));
    let lastInput = addedInputs.pop();
    lastInput.remove();

});






modalAddBtn.addEventListener("click", () => {
let allInputsFilled = true;
const catsinputs = Array.from(document.getElementsByClassName("modal-category-input"));
catsinputs.forEach(input => {
    if (input.value === "") {
        allInputsFilled = false;
    }
})

if (allInputsFilled && modalTypeInput !== "") {
    let items = Array.from(document.getElementsByClassName("modal-category-input"))

    let htmlStart = `<td class="types-td">
        <button class="collapsible btn types-td-btn" data-type="${modalTypeInput.value}" id="btn" name="type">${modalTypeInput.value} <i class="fa-solid fa-chevron-down"></i></button>
        <div class="content content-div mt-4 pt-3">
        <div class="btn-div">
        <button id="add-category" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-primary mb-4" onclick="addCategory()" type="text">Add Category</button>
        <button style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-warning mb-4 edit-btn" onclick="editCategory(this)" type="text">Edit Categories</button>
        <button style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-success mb-4 save-btn hidden" onclick="saveCategory(this)" type="text">Save Categories</button>
        <button style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-danger mb-4" onclick="deleteType(this)" type="text">Delete Type</button>
        </div>
        `;
        let htmlEnd = `
        <div class="hidden input-category-div" id="input-category-div">
        <label for="add-another-cat" hidden>Add another Category</label>
        <input id="add-another-cat" type="text" name="category" placeholder=" Insert a Category..." class="category-input editable mb-3" />
        <button id="add-category-input" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" class="btn btn-primary mb-3" type="text">Add</button>
        </div>

        </div>
        </td>`;

        let htmlItems = ``;

        for (var ii in items) {
            console.log(items[ii].value)
            htmlItems += `<li class="category">${items[ii].value}</li>`;
        }
    
        table.insertAdjacentHTML("beforeend", htmlStart + htmlItems + htmlEnd);
        typeSuccessAlert.classList.remove("hidden");
        typeErrorAlert.classList.add("hidden");
        modalTypeInput.value = "";
        modalCategoryInput.value = "";
       const addedInputs = Array.from(modalBody.getElementsByClassName("added-input"));
    addedInputs.forEach(input => {
        input.remove();
    });
    } else {
        typeSuccessAlert.classList.add("hidden");
        typeErrorAlert.classList.remove("hidden");
    }
})
