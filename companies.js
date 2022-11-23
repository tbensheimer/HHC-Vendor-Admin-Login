import {contactsData, companyData, typeCatData, companiesRegistered, demo} from "./JSON.js";

const table = document.querySelector(".companies-data");

let companies = JSON.parse(companiesRegistered);
let companiesData = JSON.parse(companyData);

try {
companies.forEach(company => {
    let compFilter = company.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');
table.insertAdjacentHTML("beforeend", `
<tr class="${compFilter}">
<td><button style="border:none; background-color:rgb(251, 244, 238);" id="company">${company}</button></td>

<td><div class="form-check form-switch">
<input class="form-check-input" type="checkbox" role="switch" id="notifications-switch">
<label class="form-check-label" for="notifications-switch" hidden>Disable Company Notifications</label>
</div>
</td>

<td><a class="edit-link" href="/Vendor Login pages/editcompany.html"><i alt="building icon" class="link-icon-building fa-solid fa-building"></i></a></td>
<td><a class="edit-link" href="/Vendor Login pages/contacts.html"><i alt="address book icon" class="link-icon-book fa-solid fa-address-book"></i></a></td>
<td><a class="edit-link" href="/Vendor Login pages/manageTC.html"><i alt="briefcase icon" class="link-icon-case fa-solid fa-briefcase"></i></a></td>
<td><button data-company=${compFilter} data-bs-toggle="modal" data-bs-target="#delete-modal" id="trash" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;" type="text" class="remove btn btn-danger"><span><i data-company="${compFilter}" alt="trash icon" id="trash-icon" class="fa-solid fa-trash fa-xs white"></i></span></button></td>
</tr>
`)
});
}
catch {
    table.insertAdjacentHTML("afterend", `
<div class="alert alert-danger">Error: Could not retrieve data. Please try again.</div>
`)
}



document.getElementById('table').addEventListener("click", e => {
    if (e.target.id === 'notifications-switch' && e.target.checked) {
        let td = e.target.parentNode.parentNode;
        let tr = td.parentNode;
        tr.children[0].querySelector('button').setAttribute('disabled', 'disabled');
        tr.children[5].querySelector("button").setAttribute('disabled', 'disabled');
    }
    else if (e.target.id === 'notifications-switch' && !e.target.checked) {
        let td = e.target.parentNode.parentNode;
        let tr = td.parentNode;
        tr.children[0].querySelector('button').removeAttribute('disabled');
        tr.children[5].querySelector("button").removeAttribute('disabled');
    }
});


const modalBody1 = document.querySelector(".modal-body1");


document.getElementById('table').addEventListener("click", e => {
   if (e.target.id === 'edit') {

if (companiesData[`${e.target.dataset.company}`]) {
    let company = companiesData[`${e.target.dataset.company}`]

    modalBody1.innerHTML = "";
   
    modalBody1.insertAdjacentHTML("beforeend", `
<table class="table">
    <tr>
    <th>Email (Username)</th>
    <td contenteditable="true">${company['Email (Username)']}</td>
    </tr>
    <tr>
    <th>Password</th>
    <td contenteditable="true">${company['Password']}</td>
    </tr>
    <tr>
    <th>Name</th>
    <td contenteditable="true">${company['Name']}</td>
    </tr>
    <tr>
    <th>Federal ID or SSN</th>
    <td contenteditable="true">${company['Federal ID or SSN']}</td>
    </tr>
    <tr>
    <th>Supplier Category</th>
    <td contenteditable="true">${company['Supplier Category']}</td>
    </tr>
    <tr>
    <th>Website</th>
    <td contenteditable="true">${company['Website']}</td>
    </tr>
    <tr>
    <th>Diversity Certification</th>
    <td contenteditable="true">${company['Diversity Certification']}</td>
    </tr>
    <tr>
    <th>Address</th>
    <td contenteditable="true">${company['Address']}</td>
    </tr>
    <tr>
    <th>City</th>
    <td contenteditable="true">${company['City']}</td>
    </tr>
    <tr>
    <th>State</th>
    <td contenteditable="true">${company['State']}</td>
    </tr>
    <tr>
    <th>Postal Code</th>
    <td contenteditable="true">${company['Postal Code']}</td>
    </tr>
</table>
    `
    )
}


   }
    });

    // Contacts Code Below

    const addInputBtn = document.querySelector(".add-input");
    const inputRows = document.querySelector(".input-rows");
    const addContactBtn = document.querySelector(".add-contact");
    const firstName = document.querySelector(".first");
    const lastName = document.querySelector(".last");
    const contactEmail = document.querySelector(".contact-email");
    const contactNumber = document.querySelector(".number");
    const contactAlert = document.querySelector(".contact-alert");
    
    
    function insertRow() {
    
        inputRows.insertAdjacentHTML("beforebegin", `
            <tr class="inputted-contacts">
        <td class="expand" contenteditable="true">${firstName.value}</td>
        <td class="expand" contenteditable="true">${lastName.value}</td>
        <td class="expand" contenteditable="true">${contactEmail.value}</td>
        <td  class="expand"contenteditable="true">${contactNumber.value}</td>
        <td><button type="button" 
        style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;"
        class="del-cont btn btn-danger btn-sm" onclick="deleteRow(this)"><span>
        <i alt="trash icon" class="fa-solid fa-trash white"></i></span></button>
        </td>
      </tr>
            `)
            }
        
    
    let contacts = JSON.parse(contactsData);
    
    
    try {
    Object.entries(contacts).forEach((key) => {
    
    inputRows.insertAdjacentHTML("beforebegin", `
    <tr class="inputted-contacts">
    <td class="expand" contenteditable="true">${key[1][0]}</td>
    <td class="expand" contenteditable="true">${key[1][1]}</td>
    <td class="expand" contenteditable="true">${key[1][3]}</td>
    <td  class="expand"contenteditable="true">${key[1][2]}</td>
    <td><button type="button" 
    style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;"
    class="del-cont btn btn-danger btn-sm" onclick="deleteRow(this)"><span>
    <i alt="trash icon" class="fa-solid fa-trash white"></i></span></button>
    </td>
    </tr>
    `);
    })
    }
    catch {
        table.insertAdjacentHTML("beforebegin", `
        <div class="alert alert-danger"><strong>Error:</strong> Data could not be retrieved. Please try again</div>
        `)
    }
    
    
    addInputBtn.addEventListener("click", () => {
    
        inputRows.classList.toggle("hidden");
        contactAlert.classList.add("hidden");
        addInputBtn.setAttribute("disabled", "disabled");
        
        });
     
    addContactBtn.addEventListener("click", () => {
    
        if (firstName.value === "" || lastName.value === "" || contactEmail.value === "" || contactNumber.value === "") {
            contactAlert.classList.remove("hidden");
            contactAlert.innerHTML = "Please fill all required fields to add contact"
        }
    
        if (contactEmail.value !== "" && !contactEmail.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            contactAlert.classList.remove("hidden");
            contactAlert.innerHTML = "Please enter a valid email address"
        }
    
        if (firstName.value !== "" && lastName.value !== "" && contactEmail.value !== "" && contactNumber.value !== "" && contactEmail.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    
            contactAlert.classList.add("hidden");
            addInputBtn.removeAttribute("disabled");
    
            insertRow();
            
            firstName.value = "";
            lastName.value = "";
            contactEmail.value = "";
            contactNumber.value = "";
            inputRows.classList.add("hidden");
        }
    });

// Types and Categories Code Below



const typesTable = document.querySelector(".types-data");
let demonstration = JSON.parse(demo);
let typesArray = [];

try {
Object.entries(demonstration).forEach(demo => {

    let type = demo[0];
    let items = demo[1];

    let htmlStart = `<td class="types-td">
    <button class="collapsible btn types-td-btn" data-type="${type}" id="btn" name="type">
    <span><i alt="arrow down icon" class="fa-solid fa-chevron-down"></i></span> ${type}     
    </button>
    <div class="content content-div mt-4 pt-2">
    <button type="button" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;"
    class="del-type btn btn-danger btn-sm mb-2" onclick="deleteRow(this)">
    Remove Type</button>
    <p class="mb-2 mt-2"><u><strong>Categories:</strong></u></p>
    `;

    let htmlEnd = `
    <ul class="btn-div">
  
    </ul>
    </div>
    </td>`;

    let htmlItems = ``;

    for (var ii in items) {
        htmlItems += `<li class="category mb-1">${items[ii]}</li>`;
    }


    typesTable.insertAdjacentHTML("beforeend", htmlStart + htmlItems + htmlEnd);
typesArray.push(type)
    })
    }
catch {
    typesTable.insertAdjacentHTML("beforeend", `
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


const miniModalBody1 = document.querySelector(".mini-modal-body1");
const miniModalBody2 = document.querySelector(".mini-modal-body2");


const data = JSON.parse(typeCatData);

const unique = [... new Map(data.map((d) => [d.type, d])).values()]; //unique array of types code that works for array of objects
let uniqueTypes = [];
unique.forEach(object => {
    uniqueTypes.push(object.type)
    });


    try {
        uniqueTypes.forEach(type => {
            let typeFilter = type.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');
       
            miniModalBody1.insertAdjacentHTML("beforeend", `
            <li class="typeLi"><label id="key" for="${typeFilter}">
            <input data-type="${typeFilter}" class="form-check-input type-check" id="${typeFilter}" name="type" value="${type}" type="checkbox" /> ${type}
            </label>
            <br /></li>
            `)
        });
    }
        catch {
            miniModalBody1.insertAdjacentHTML("beforeend", `
        <div class="alert alert-danger"><strong>Error:</strong> Data could not be retrieved. Please try again</div>
        `)
        }


        try {
        const checkboxes = document.querySelectorAll(".type-check");
        checkboxes.forEach(box => {
        box.addEventListener("change", e => {
       data.forEach(object => {
        let objectFilter = object.type.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');
        if (e.target.checked && objectFilter === e.target.dataset.type) {
            miniModalBody2.insertAdjacentHTML("beforeend", `
            <li class="${e.target.dataset.type} catLi"><span><i alt="circle list icon" class="fa-regular fa-circle fa-2xs"></i></span> ${object.category}</li>
            `)
        }
       else if (!e.target.checked && objectFilter === e.target.dataset.type) {
            let lis = document.querySelectorAll(`.${e.target.dataset.type}`);
            lis.forEach(li => {
                let parent = li.parentNode;
                parent.removeChild(li)
            });
        }
       })
    });
    });
    }
    catch {
        catData.insertAdjacentHTML("beforeend", `
        <div class="alert alert-danger"><strong>Error:</strong> Data could not be retrieved. Please try again</div>
        `)
    }




    const addTypeBtn = document.querySelector(".add-type");
    const typesAddedAlert = document.querySelector(".type-added-alert");

    addTypeBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".type-check");
        checkboxes.forEach(box => {

            if (box.checked && !typesArray.includes(`${box.value}`)) {
                let typeFilter = box.value.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');


                typesArray.push(box.value)

                    let htmlStart = `<td class="types-td">
                    <button class="collapsible btn types-td-btn" data-type="${box.value}" id="btn" name="type">
                    <span><i alt="arrow down icon" class="fa-solid fa-chevron-down"></i></span> ${box.value}     
                    </button>
                    <div class="content content-div mt-4 pt-2">
                    <button type="button" style="--bs-btn-padding-y: .05rem; --bs-btn-padding-x: .4rem;"
                    class="del-type btn btn-danger btn-sm mb-2" onclick="deleteRow(this)">
                    Remove Type</button>
                    <p class="mb-2 mt-2"><u><strong>Categories:</strong></u></p>
                    `;
                
                    let htmlEnd = `
                    <ul class="btn-div">
                  
                    </ul>
                    </div>
                    </td>`;
                
                    let htmlItems = ``;

                   let cats = document.getElementsByClassName("catLi");
                    
                  let catsArray = Array.from(cats);

                catsArray.forEach(item => {
                    if (item.classList.contains(typeFilter)) {
                        htmlItems += `<li>${item.textContent}</li>`
                    }
                })
                typesTable.insertAdjacentHTML("beforeend", htmlStart + htmlItems + htmlEnd);

                typesAddedAlert.classList.remove("hidden");
                    }
                })
            })
