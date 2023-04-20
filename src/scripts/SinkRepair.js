import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"

export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <article class="serviceForm">
        ${ServiceForm()}
    </article>

    <article class="serviceRequests">
        <h2>Service Requests</h2>
        <section>
        <div class="ServiceRequestsHeaders">
            <h3>Description</h3><h3>Completed By</h3>
        </div>
            ${Requests()}
        </section>
    </article>
    `
}

