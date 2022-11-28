import { companiesRegistered, typeCatData, prevNotifs, companiesAndTypes } from "./JSON.js";

const typeList = document.querySelector(".company-types");
let catList = document.querySelector(".company-categories");
const companyList = document.querySelector(".company-send-list");



const prevNotifList = document.querySelector(".prev-notif tbody");

const sendNotifsBtn = document.querySelector(".tab1-btn");
const prevNotifsBtn = document.querySelector(".tab2-btn");
const sendNotifsContent = document.querySelector(".notifications-group");
const prevNotifsContent = document.querySelector(".previous-notifs-group");


sendNotifsBtn.addEventListener("click", () => {
    prevNotifsBtn.classList.remove("active-page");
    prevNotifsContent.classList.add("hidden");
    sendNotifsBtn.classList.add("active-page");
    sendNotifsContent.classList.remove("hidden");
});

prevNotifsBtn.addEventListener("click", () => {
    prevNotifsBtn.classList.add("active-page");
    prevNotifsContent.classList.remove("hidden");
    sendNotifsBtn.classList.remove("active-page");
    sendNotifsContent.classList.add("hidden");
});

$(document).ready( function () {
    $('#basic-datatable').DataTable();
    console.log('document ready');
} );






/*let data = JSON.parse(typeCatData);
const unique = [... new Map(data.map((d) => [d.type, d])).values()]; //unique array of types code that works for array of objects
let prevNotifications = JSON.parse(prevNotifs);


unique.forEach(object => {

typeList.insertAdjacentHTML("beforeend", `
<li><label id="type" for="${object.type}">
<input data-type="${object.type}" class="form-check-input type-check" id="${object.type}" name="type" type="checkbox" /> ${object.type}
</label>
</li>
`)
});


/* companies.forEach(company => {
companyList.insertAdjacentHTML("beforeend", `
<li><label id="type" for="${company}">
<input data-type="${company}" class="form-check-input type-check" id="${company}" name="type" type="checkbox" /> ${company}
</label>
</li>
`)
});
*/

/*prevNotifications.forEach(object => {
prevNotifList.insertAdjacentHTML("beforeend", `
<tr>
<td>${object.sent}</td>
<td>${object.body}</td>
<td>${object.date}</td>
</tr>
`)

});
*/

/* let companyAndTypes = JSON.parse(companiesAndTypes)

const checkboxes = document.querySelectorAll(".type-check");
checkboxes.forEach(box => {
box.addEventListener("change", e => {
let entries = Object.entries(companyAndTypes)
let type = e.target.dataset.type;
entries.forEach(entry => {
    let items = entry[1];
    if (box.checked && type == entry[0]) {
        items.forEach(item => {
           let itemFilter = item.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');
            companyList.insertAdjacentHTML("beforeend", `
            <li class="${type + itemFilter}"><label id="type" for="${item}">
            <input data-type="${item}" value="${type}" class="form-check-input type-check" id="${item} ${type + itemFilter}" name="type" type="checkbox" /> ${item}
            </label>
            </li>
            `);
        });
    } else if (!e.target.checked && type == entry[0]) {
        let items = entry[1];
        items.forEach(item => {
           let itemFilter = item.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');
            let lis = document.getElementsByClassName(`${type + itemFilter}`);
            let array = Array.from(lis)
            array.forEach(item => {
            item.remove();
            })
    })
}
})
});
})
*/

const data = JSON.parse(typeCatData);
const unique = [... new Map(data.map((d) => [d.type, d])).values()]; //unique array of types code that works for array of objects
let uniqueTypes = [];
unique.forEach(object => {
    uniqueTypes.push(object.type)
    });
    try {
        uniqueTypes.forEach(type => {
            let typeFilter = type.toLowerCase().replaceAll(' ', '-').replaceAll(',', '').replaceAll('&', 'and').replaceAll('/', '-');
       
            typeList.insertAdjacentHTML("beforeend", `
            <li class="typeLi"><label id="key" for="${typeFilter}">
            <input data-type="${typeFilter}" class="form-check-input type-check" id="${typeFilter}" name="type" value="${type}" type="checkbox" /> ${type}
            </label>
            <br /></li>
            `)
        });
    }
        catch {
            typeData.insertAdjacentHTML("beforeend", `
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
                catList.insertAdjacentHTML("beforeend", `
                <li class="catLi ${e.target.dataset.type}"><label id="key" for="${object.category}">
                <input class="form-check-input cat-check" id="${object.category}" name="category" value="${object.category}" type="checkbox" /> <strong>${e.target.dataset.type.toUpperCase()}: ${object.category}
                </label>
                <br /></li>
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



        //Select All Btns 

        const typeAllBox = document.querySelector(".select-all-type");
        const catAllBox = document.querySelector(".select-all-category");
        const companyAllBox = document.querySelector(".select-all-company");


        typeAllBox.addEventListener("click", e => {
            let typeArray = Array.from(document.getElementsByClassName("type-check"));
           
            if (e.target.checked) {
            typeArray.forEach(item => {
                item.checked = true;
            })
        } 

        if (!e.target.checked) {
            typeArray.forEach(item => {
                item.checked = false;
            })
        }
        });


        catAllBox.addEventListener("click", e => {
            let catArray = Array.from(document.getElementsByClassName("cat-check"));
           
            if (e.target.checked) {
            catArray.forEach(item => {
                item.checked = true;
            })
        } 

        if (!e.target.checked) {
            catArray.forEach(item => {
                item.checked = false;
            })
        }
        });

        companyAllBox.addEventListener("click", e => {
            let compArray = Array.from(document.getElementsByClassName("company-check"));
           
            if (e.target.checked) {
            compArray.forEach(item => {
                item.checked = true;
            })
        } 

        if (!e.target.checked) {
            compArray.forEach(item => {
                item.checked = false;
            })
        }
        });




        let companies = JSON.parse(companiesRegistered);

        console.log(companies);

        companies.forEach(company => {
            companyList.insertAdjacentHTML("beforeend", `
            <li class="compLi ${company}"><label id="key" for="${company}">
            <input class="form-check-input company-check" id="${company}" name="category" value="${company}" type="checkbox" />${company}
            </label>
            `);
            });
    
