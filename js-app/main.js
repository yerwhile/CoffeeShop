const mainContainer = document.querySelector("#container")
const beanFormContainer = document.querySelector("#addBean")

const url = "https://localhost:5001/api/beanvariety/";


const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            mainContainer.innerHTML = DisplayBeanVarieties(beanVarieties);
        })
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

function sendBean (userServiceRequest) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(url, fetchOptions).then(resp => resp.json()).then(addedBean => {
        console.log(addedBean);
    })
}

const DisplayBeanVarieties = (bvArr) => {

    return `
                <h3>Bean Varieties</h3>
                <ul>
                ${bvArr.map(
                    (bvObj) => {
                        return `
                        <li class="bvObjects">
                            <p>Bean Name: ${bvObj.name}</p>
                            <p>Bean Region: ${bvObj.region}</p>
                        </li>`
                    }
                ).join("")}
                </ul>`
}

const AddBean = () => {
    let html = `
        <div class="field">
            <label class="label" for="bvName">Name</label>
            <input type="text" name="bvName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="bvRegion">Region</label>
            <input type="text" name="bvRegion" class="input" />
        </div>
        <div class="field">
            <label class="label" for="bvNotes">Notes</label>
            <input type="text" name="bvNotes" class="input" />
        </div>

        <button class="button" id="submitBean">Add a Bean Variety</button>
    `

    return html
}

beanFormContainer.innerHTML = AddBean();
const beanButton = document.querySelector("#submitBean");


beanButton.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitBean") {
        // Get what the user typed into the form fields
        const beanName = document.querySelector("input[name='bvName']").value
        const beanRegion = document.querySelector("input[name='bvRegion']").value
        const beanNotes = document.querySelector("input[name='bvNotes']").value

        // Make an object out of the user input
        const beanToSendToAPI = {
            name: beanName,
            notes: beanNotes,
            region: beanRegion
        }

        // Send the data to the API for permanent storage
        sendBean(beanToSendToAPI);
    }
})