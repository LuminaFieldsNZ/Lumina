const infractionData = [
    // ================== CRYCELLA FREITAG ==================
    {
        party: "Crycella Freitag",
        infraction: "Perjury & False Statements",
        occurrences: 7,
        backgroundColor: "#fee4cb",
        progressColor: "#e85b51",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-11", 
                brief: "Falsely testified under oath about Micheal's stability and housing", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/DecChunk#paternity-response" 
            },
            { 
                date: "2024-12-16", 
                brief: "Claimed Micheal 'kicked her out' despite moving voluntarily", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/DecChunk#emergency-response" 
            },
            { 
                date: "2025-01-07", 
                brief: "Fabricated safety concerns ('I'm scared of him') without evidence", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#communication-order" 
            },
            { 
                date: "2025-02-18", 
                brief: "Misrepresented living conditions in custody filings", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#venue-motion" 
            },
            { 
                date: "2025-03-03", 
                brief: "Submitted false testimony about Micheal's parenting", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#witness-statement" 
            },
            { 
                date: "2025-03-17", 
                brief: "Lied about financial contributions to child support", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#financial-motion" 
            },
            { 
                date: "2025-03-27", 
                brief: "Falsely claimed inability to facilitate visitation", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#contempt-motion" 
            }
        ]
    },
    {
        party: "Crycella Freitag",
        infraction: "Evidence Tampering",
        occurrences: 5,
        backgroundColor: "#ffd3d3",
        progressColor: "#d12b2b",
        severity: "Critical",
        events: [
            { 
                date: "2025-01-30", 
                brief: "Submitted edited 12-minute video (original 40+ minutes)", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#video-tampering" 
            },
            { 
                date: "2025-02-26", 
                brief: "Withheld unedited audio recordings of interactions", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#evidence-submission" 
            },
            { 
                date: "2025-03-14", 
                brief: "Selectively provided text messages omitting key context", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#text-evidence" 
            },
            { 
                date: "2025-03-25", 
                brief: "Altered timestamps on submitted documentation", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#timestamp-issue" 
            },
            { 
                date: "2025-04-04", 
                brief: "Failed to produce original video files per court order", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#video-order" 
            }
        ]
    },
    // ================== JOZEF HANRATTY ==================
    {
        party: "Jozef Hanratty",
        infraction: "Perjury",
        occurrences: 4,
        backgroundColor: "#d1f5ea",
        progressColor: "#0aaa92",
        severity: "High",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Falsely testified about Micheal's eviction status", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/DecChunk#hanratty-affidavit" 
            },
            { 
                date: "2025-01-28", 
                brief: "Lied about lease agreement terms under oath", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#lease-testimony" 
            },
            { 
                date: "2025-02-18", 
                brief: "Provided false statements about housing stability", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#housing-claims" 
            },
            { 
                date: "2025-03-17", 
                brief: "Committed perjury regarding landlord-tenant relationship", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#tenancy-perjury" 
            }
        ]
    },
    // ================== JOSH GARRETT ==================
    {
        party: "Josh Garrett",
        infraction: "Attorney Misconduct",
        occurrences: 12,
        backgroundColor: "#e9e7fd",
        progressColor: "#5e54ef",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Advised client to cease co-parenting communication", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/DecChunk#attorney-complaint" 
            },
            { 
                date: "2025-01-07", 
                brief: "Failed to disclose financial records per discovery requests", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#discovery-violation" 
            },
            { 
                date: "2025-01-30", 
                brief: "Coached witnesses with 'Watch his reaction' instructions", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#witness-coaching" 
            },
            { 
                date: "2025-02-26", 
                brief: "Knowingly presented falsified evidence to court", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#fabricated-evidence" 
            },
            { 
                date: "2025-03-03", 
                brief: "Obstructed service of legal documents", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#service-obstruction" 
            },
            { 
                date: "2025-03-17", 
                brief: "Violated Rule 4.4 (Respect for Rights of Third Persons)", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#rule-violation" 
            },
            { 
                date: "2025-03-25", 
                brief: "Made false statements to Layne Project supervisors", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#layne-misrep" 
            },
            { 
                date: "2025-03-27", 
                brief: "Failed to comply with court-ordered evaluation scheduling", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#eval-obstruction" 
            },
            { 
                date: "2025-03-28", 
                brief: "Misrepresented court orders to third parties", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#order-misrep" 
            },
            { 
                date: "2025-04-03", 
                brief: "Engaged in ex parte communications with court staff", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#ex-parte" 
            },
            { 
                date: "2025-04-04", 
                brief: "Obstructed access to psychological evaluators", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#eval-obstruction" 
            },
            { 
                date: "2025-04-04", 
                brief: "Conspired to fabricate eviction proceedings", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#eviction-fraud" 
            }
        ]
    },
    // ================== JUDGE SELBY ==================
    {
        party: "Judge Matt Alan Selby",
        infraction: "Judicial Bias",
        occurrences: 15,
        backgroundColor: "#d3e5ff",
        progressColor: "#2a7de1",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Ignored submitted lease agreement disproving eviction claims", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/DecChunk#lease-ignored" 
            },
            { 
                date: "2025-01-07", 
                brief: "Applied unequal standards to motion filings", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#filing-bias" 
            },
            { 
                date: "2025-01-28", 
                brief: "Refused to review exculpatory text message evidence", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#text-ignore" 
            },
            { 
                date: "2025-02-18", 
                brief: "Maintained jurisdiction despite UCCJEA violations", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#jurisdiction-issue" 
            },
            { 
                date: "2025-02-26", 
                brief: "Failed to address witness perjury", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#perjury-ignore" 
            },
            { 
                date: "2025-03-03", 
                brief: "Disregarded evidence of evidence tampering", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#tampering-ignore" 
            },
            { 
                date: "2025-03-14", 
                brief: "Allowed racial bias in evaluator selection process", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#racial-bias" 
            },
            { 
                date: "2025-03-17", 
                brief: "Delegated judicial duties to opposing counsel", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#delegation" 
            },
            { 
                date: "2025-03-25", 
                brief: "Failed to rule on motions for 60+ days", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#motion-delay" 
            },
            { 
                date: "2025-03-27", 
                brief: "Mischaracterized Micheal's statements on record", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#mischaracterization" 
            },
            { 
                date: "2025-03-28", 
                brief: "Permitted violations of court orders without consequence", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#order-violations" 
            },
            { 
                date: "2025-03-31", 
                brief: "Refused to address parental alienation evidence", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#alienation-ignore" 
            },
            { 
                date: "2025-04-03", 
                brief: "Cancelled hearing without proper notice", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#hearing-cancel" 
            },
            { 
                date: "2025-04-04", 
                brief: "Failed to enforce psychological evaluation order", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#eval-enforcement" 
            },
            { 
                date: "2025-04-04", 
                brief: "Ignored evidence of fraudulent eviction filing", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#eviction-ignore" 
            },
            { 
                date: "2025-04-04", 
                brief: "Selectively enforced procedural rules", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#selective-enforcement" 
            }
        ]
    },
    // ================== STONE COUNTY CLERKS ==================
    {
        party: "Stone County Clerks",
        infraction: "Procedural Obstruction",
        occurrences: 8,
        backgroundColor: "#fff8e1",
        progressColor: "#ffb300",
        severity: "High",
        events: [
            { 
                date: "2025-01-31", 
                brief: "Delayed processing of appeal documents", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#appeal-delay" 
            },
            { 
                date: "2025-02-26", 
                brief: "Misrepresented appellate record requirements", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#record-misrep" 
            },
            { 
                date: "2025-03-03", 
                brief: "Created financial barriers to appeal process", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#financial-barrier" 
            },
            { 
                date: "2025-03-17", 
                brief: "Refused to schedule emergency motion on Motion Day", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#motion-denial" 
            },
            { 
                date: "2025-03-25", 
                brief: "Withheld public records of scheduled hearings", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#sunshine-violation" 
            },
            { 
                date: "2025-03-27", 
                brief: "Failed to provide clear guidance on payment methods", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#payment-issue" 
            },
            { 
                date: "2025-04-03", 
                brief: "Improperly handled filing of Notice of Appeal", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#filing-issue" 
            },
            { 
                date: "2025-04-04", 
                brief: "Obstructed access to court records", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#records-access" 
            }
        ]
    },
    // ================== KELLY TRUELOVE ==================
    {
        party: "Kelly Truelove",
        infraction: "Fraud & Collusion",
        occurrences: 5,
        backgroundColor: "#ffebee",
        progressColor: "#d32f2f",
        severity: "High",
        events: [
            { 
                date: "2025-01-28", 
                brief: "Conspired to fabricate eviction claims", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Jan25Chunk#eviction-collusion" 
            },
            { 
                date: "2025-02-18", 
                brief: "Provided false statements about lease agreement", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Feb25Chunk#lease-misrep" 
            },
            { 
                date: "2025-03-17", 
                brief: "Coordinated with Josh Garrett on false testimony", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#garrett-collusion" 
            },
            { 
                date: "2025-03-27", 
                brief: "Filed then dismissed fraudulent eviction lawsuit", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Mar25Chunk#eviction-dismissal" 
            },
            { 
                date: "2025-04-04", 
                brief: "Misrepresented landlord-tenant relationship", 
                evidenceLink: "https://luminafieldsnz.github.io/Lumina/legal/Apr25Chunk#tenant-misrep" 
            }
        ]
    }
];




function generateInfractionBoxes() {
    const container = document.querySelector('#cards');
    
    infractionData.forEach((infraction, index) => {
        const infractionBox = document.createElement('div');
        infractionBox.className = 'project-box-wrapper';
        
        let eventHTML = infraction.events.map(event => `
            <div class="event-item">
                <div class="event-header">
                    <strong>${event.date}</strong>
                    <span class="party-tag">${infraction.party}</span>
                </div>
                <p>${event.brief}</p>
                <a href="${event.evidenceLink}" target="_blank" class="evidence-link">
                    <i class="fas fa-external-link-alt"></i> View Evidence
                </a>
            </div>
        `).join('');
        
        infractionBox.innerHTML = `
            <div class="project-box" style="background-color: ${infraction.backgroundColor};">
                <div class="project-box-header">
                    <span class="occurrence-badge">${infraction.occurrences} Occurrences</span>
                    <span class="severity-badge" style="background-color: ${infraction.progressColor}">${infraction.severity}</span>
                </div>
                <div class="project-box-content-header">
                    <p class="box-content-header">${infraction.infraction}</p>
                    <p class="box-content-party">${infraction.party}</p>
                </div>
                <div class="box-progress-wrapper">
                    <p class="box-progress-header">Severity Level</p>
                    <div class="box-progress-bar">
                        <span class="box-progress" style="width: ${getSeverityWidth(infraction.severity)}; background-color: ${infraction.progressColor};"></span>
                    </div>
                </div>
                <button class="accordion-btn" onclick="toggleAccordion(${index})">
                    <span>View Documented Events</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="accordion-content" id="accordion-${index}">
                    ${eventHTML}
                </div>
            </div>
        `;
        
        container.appendChild(infractionBox);
    });
}

function getSeverityWidth(severity) {
    switch(severity) {
        case "Critical": return "100%";
        case "High": return "80%";
        case "Medium": return "60%";
        default: return "40%";
    }
}

function toggleAccordion(index) {
    const content = document.getElementById(`accordion-${index}`);
    const btn = content.previousElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    
    // Toggle icon
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    generateInfractionBoxes();
});