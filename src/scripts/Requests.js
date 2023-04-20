import { getRequests, getPlumbers, deleteRequest, saveCompletion } from "./dataAccess.js"

const convertRequestToListItem = (request) => {
    const plumbers = getPlumbers()
    const listItem = `<li class="serviceRequestListItem">
                        <div class="requestDescription">${request.description}</div>
                        <select class="plumbers" id="plumbers">
                            <option value="">Choose</option>
                            ${
                                plumbers.map(
                                    plumber => {
                                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                    }
                                ).join("")
                            }
                        </select>
                        <button class="request__delete"
                            id="request--${request.id}">
                            Delete
                        </button>
                    </li>`
    return listItem
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListItem).join("")
            }
        </ul>`
    return html
}

const mainContainer = document.querySelector("#container")

//click event listener for delete button
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

//change event for selecting a plumber for completion
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                "requestId": requestId,
                "plumberId": plumberId,
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)