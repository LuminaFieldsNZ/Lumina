const infractionData = [
    // ================== CRYCELLA FREITAG ==================
    {
        party: "Crycella Freitag",
        infraction: "Perjury, Evidence Tampering & False Statements",
        occurrences: 10,
        backgroundColor: "#baa586",
        progressColor: "#e85b51",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Falsely testified about Micheal's housing stability in custody hearing",
                evidence: "Counter-Petition for Sole Custody (Dec 16, 2024), Section 3.B"
            },
            { 
                date: "2025-01-07", 
                brief: "Claimed Micheal 'kicked her out' despite moving voluntarily", 
                evidence: "Emergency Motion (Jan 7, 2025), Paragraph 2.1"
            },
            { 
                date: "2025-01-30", 
                brief: "Fabricated safety concerns ('I'm scared of him') without evidence", 
                evidence: "Motion for Contempt (Jan 30, 2025), Section II.1"
            },
            { 
                date: "2025-02-18", 
                brief: "Misrepresented living conditions in custody filings", 
                evidence: "Motion to Vacate Void Orders (Feb 18, 2025), Section III"
            },
            { 
                date: "2025-03-17", 
                brief: "Submitted false testimony about Micheal's parenting", 
                evidence: "Motion to Compel Testimony (Mar 17, 2025), Section II.1"
            },
            { 
                date: "2025-03-25", 
                brief: "Lied about financial contributions to child support", 
                evidence: "Motion for Relief (Jan 28, 2025), Section 1.D"
            },
            { 
                date: "2025-03-31", 
                brief: "Falsely claimed inability to facilitate visitation", 
                evidence: "Emergency Motion (Mar 31, 2025), Section 2.2"
            },
            { 
                date: "2025-01-30", 
                brief: "Submitted edited 12-minute video (original 40+ minutes)", 
                evidence: "Motion to Compel Testimony (Mar 17, 2025), Section II.3"
            },
            { 
                date: "2025-03-14", 
                brief: "Selectively provided text messages omitting key context", 
                evidence: "Motion to Reaffirm Evidence (Mar 14, 2025), Paragraph 4"
            },
            { 
                date: "2025-04-04", 
                brief: "Failed to produce original video files per court order", 
                evidence: "Emergency Motion (Apr 4, 2025), Section I"
            }
        ]
    },
    // ================== JOZEF HANRATTY ==================
    {
        party: "Jozef Hanratty",
        infraction: "Perjury",
        occurrences: 4,
        backgroundColor: "#d1f5ea",
        progressColor: "#e85b51",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Falsely testified about Micheal's eviction status", 
                evidence: "Witness Statement (Dec 18, 2024), Paragraphs 1-4"
            },
            { 
                date: "2025-01-28", 
                brief: "Lied about lease agreement terms under oath", 
                evidence: "Combined Motion (Jan 30, 2025), Section A.4"
            },
            { 
                date: "2025-02-18", 
                brief: "Provided false statements about housing stability", 
                evidence: "Affidavit (Feb 18, 2025), Section 2.B"
            },
            {
                date: "2025-04-07",
                brief: "Admitted on cross that Micheal had right to remain per verbal agreement with Kelly",
                evidence: "Combined Motion (Jan 30, 2025), Section A.4"
            }
        ]
    },
    // ================== JOSH GARRETT ==================
    {
        party: "Josh Garrett",
        infraction: "Attorney Misconduct",
        occurrences: 10,
        backgroundColor: "#e9e7fd",
        progressColor: "#e85b51",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Advised client to cease co-parenting communication", 
                evidence: "Complaint Against Attorney (Dec 16, 2024), Section 1"
            },
            { 
                date: "2025-01-07", 
                brief: "Failed to disclose financial records per discovery requests", 
                evidence: "Motion for Financial Disclosure (Dec 16, 2024), Section 4"
            },
            { 
                date: "2025-01-30", 
                brief: "Coached witnesses with 'Watch his reaction' instructions", 
                evidence: "Combined Motion (Jan 30, 2025), Section B.3"
            },
            { 
                date: "2025-02-26", 
                brief: "Knowingly presented falsified evidence to court", 
                evidence: "Motion for Sanctions (Feb 26, 2025), Argument Section"
            },
            { 
                date: "2025-03-17", 
                brief: "Violated Rule 4.4 (Respect for Rights of Third Persons)", 
                evidence: "Complaint Against Attorney (Dec 16, 2024), Section 4"
            },
            { 
                date: "2025-03-25", 
                brief: "Made false statements to Layne Project supervisors", 
                evidence: "Motion for Subpoena (Mar 17, 2025), Section II"
            },
            { 
                date: "2025-03-27", 
                brief: "Failed to comply with court-ordered evaluation scheduling", 
                evidence: "Motion to Comply (Mar 27, 2025), Section I"
            },
            { 
                date: "2025-04-03", 
                brief: "Engaged in ex parte communications with court staff", 
                evidence: "Judicial Notice (Apr 3, 2025), Paragraph 5"
            },
            { 
                date: "2025-04-04", 
                brief: "Obstructed access to psychological evaluators", 
                evidence: "Motion to Enforce (Apr 4, 2025), Section II"
            },
            {
                date: "2025-04-10",
                brief: "Knowingly misrepresented cause of Layne Project cancellation to justify Midtown psychological evaluation",
                evidence: "Supplement to Complaint Against Attorney (Apr 10, 2025), Section III"
            }
        ]
    },
    // ================== JUDGE SELBY ==================
    {
        party: "Judge Matt Alan Selby",
        infraction: "Judicial Bias",
        occurrences: 12,
        backgroundColor: "#d3e5ff",
        progressColor: "#e85b51",
        severity: "Critical",
        events: [
            { 
                date: "2024-12-16", 
                brief: "Ignored submitted lease agreement disproving eviction claims", 
                evidence: "Motion for Change of Judge (Jan 31, 2024), Point 1"
            },
            { 
                date: "2025-01-07", 
                brief: "Applied unequal standards to motion filings", 
                evidence: "Motion to Dismiss (Mar 17, 2025), Section I.1"
            },
            { 
                date: "2025-01-28", 
                brief: "Refused to review exculpatory text message evidence", 
                evidence: "Letter to Judge (Jan 31, 2024), Items 2-3"
            },
            { 
                date: "2025-02-18", 
                brief: "Maintained jurisdiction despite UCCJEA violations", 
                evidence: "Writ of Mandamus (Feb 18, 2025), Section II.A"
            },
            { 
                date: "2025-02-26", 
                brief: "Failed to address witness perjury", 
                evidence: "Motion for Sanctions (Feb 26, 2025), Argument Section"
            },
            { 
                date: "2025-03-03", 
                brief: "Disregarded evidence of evidence tampering", 
                evidence: "Motion for Sanctions (Mar 3, 2025), Section 2"
            },
            { 
                date: "2025-03-17", 
                brief: "Delegated judicial duties to opposing counsel", 
                evidence: "Motion to Compel Clerk (Mar 17, 2025), Section II.3"
            },
            { 
                date: "2025-03-25", 
                brief: "Failed to rule on motions for 60+ days", 
                evidence: "Motion to Clarify (Mar 25, 2025), Section 1"
            },
            { 
                date: "2025-03-27", 
                brief: "Mischaracterized Micheal's statements on record", 
                evidence: "Motion on Judicial Misconduct (Mar 27, 2025), Point 1"
            },
            { 
                date: "2025-03-28", 
                brief: "Permitted violations of court orders without consequence", 
                evidence: "Notice of Judicial Obstruction (Mar 28, 2025), Section 3"
            },
            { 
                date: "2025-03-31", 
                brief: "Refused to address parental alienation evidence", 
                evidence: "Emergency Motion (Mar 31, 2025), Section 2.2"
            },
            { 
                date: "2025-04-03", 
                brief: "Cancelled hearing without proper notice", 
                evidence: "Objection to Cancellation (Apr 3, 2025), Paragraph 3"
            }
        ]
    },
    // ================== STONE COUNTY CLERKS ==================
    {
        party: "Stone County Clerks",
        infraction: "Procedural Obstruction",
        occurrences: 5,
        backgroundColor: "#fff8e1",
        progressColor: "#e85b51",
        severity: "High",
        events: [
            { 
                date: "2025-02-26", 
                brief: "Misrepresented appellate record requirements", 
                evidence: "Formal Complaint (Feb 26, 2025), Section 1"
            },
            { 
                date: "2025-03-17", 
                brief: "Refused to schedule emergency motion on Motion Day", 
                evidence: "Motion to Compel Clerk (Mar 17, 2025), Section I"
            },
            { 
                date: "2025-03-25", 
                brief: "Withheld public records of scheduled hearings", 
                evidence: "Motion to Compel Clerk (Mar 17, 2025), Section II.4"
            },
            { 
                date: "2025-03-27", 
                brief: "Failed to provide clear guidance on payment methods", 
                evidence: "Formal Complaint (Feb 26, 2025), Section 2"
            },
            { 
                date: "2025-04-03", 
                brief: "Improperly handled filing of Notice of Appeal", 
                evidence: "Formal Complaint (Feb 26, 2025), Section 3"
            }
        ]
    },
    // ================== KELLY TRUELOVE ==================
    {
        party: "Kelly Truelove",
        infraction: "Fraud, Collusion, Witness Collusion",
        occurrences: 4,
        backgroundColor: "#ffebee",
        progressColor: "#e85b51",
        severity: "High",
        events: [
            { 
                date: "2025-01-28", 
                brief: "Conspired to fabricate eviction claims", 
                evidence: "Combined Motion (Jan 30, 2025), Section A.4"
            },
            { 
                date: "2025-02-26", 
                brief: "Provided false statements about lease agreement", 
                evidence: "Motion for Evidence (Feb 26, 2025), Section 1"
            },
            { 
                date: "2025-03-27", 
                brief: "Filed then dismissed fraudulent eviction lawsuit", 
                evidence: "Motion to Submit Evidence (Mar 27, 2025), Section 2"
            },
            {
                date: "2025-04-07",
                brief: "Refused to acknowledge verbal lease agreement",
                evidence: "Text Message Records (Google file drive (Kelly Truelove))"
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
                <div class="evidence-reference">
                    <i class="fas fa-file-alt"></i> ${event.evidence}
                </div>
            </div>
        `).join('');
        
        infractionBox.innerHTML = `
            <div class="project-box" style="background-color: ${infraction.backgroundColor};">
                <div class="project-box-header">
                    <span class="occurrence-badge">${infraction.occurrences} Occurrences</span>
                    <span class="severity-badge" style="font-weight: bold;">${infraction.severity}</span>
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