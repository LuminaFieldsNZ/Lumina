var timeline = [];

timeline.push({
    "events": [


      {
        "date": "November 17th, 2024",
        "title": "Connected Via Text Message",
        "subtitle": "Roomster then Text Message",
        "financialLoss": 0,
        "description": [
            {
                "label": "Took over all housemaking",
                "details": [
                    "Told Crycella to take 3 Months off to recover and let me handle everything Felix",
                    "Struggling with managing her brothers",
                    "Crycella was present each and every day"
                ]
            },
            {
                "label": "Occupation",
                "jobs": [
                    "Stay at home Dad Full Time"
                ],
                "hours": "Implementing LuminaFields education platform and biometric tracking"
            },
            {
                "label": "Felix: 100% Micheal guided day",
                "details": [
                    "Rigid schedule, integrating into our home after 3 days in hospital",
                    "Food training, expanding diet",
                    "Fighting with Crycella about her kicking us when she sleeps",
                    "Total weight: 7.8 lbs"
                ]
            },
            {
                "label": "Evidence",
                "documents": [
                    {
                        "name": "Exhibit A: Crycella running Woodandmortar LLC",
                        "link": "https://docs.google.com/document/d/1eMfyAm1sYUUfsc06yz3w82J5poMfImGY9vk9bPzcXbs/edit?usp=sharing"
                    },
                    {
                        "name": "Exhibit B: Crycella hair education",
                        "link": "https://docs.google.com/document/d/1eMfyAm1sYUUfsc06yz3w82J5poMfImGY9vk9bPzcXbs/edit?usp=sharing"
                    },
                    {
                        "name": "Exhibit C: Transcript",
                        "link": "https://drive.google.com/drive/folders/1srl1X_IIGzbusLfNomOc_5R1fMSbWBpv?usp=sharing"
                    }
                ]
            }
        ]
    },

    {
      "date": "November 20, 2024",
      "title": "Signed Lease",
      "subtitle": "Wanted something documented",
      "financialLoss": 2800,
      "description": [
          {
              "label": "Lease Agreement $800",
              "details": [
                  "Made the small mistake switching who was the subleasee and subleasor",
                  "Confirmed via text message that is was an easy mistake and a Non-issue, but later reciting the need for him to provide me with a 60 day notice",
                  "Later found out may have lied about owning the home, and made contact with another person he saying is the real homeowner"
              ]
          },
          {
            "label": "Broken Sink $1600",
            "details": [
                "This is what started everything. As I needed to cook the sink wouldn't drain, when I asked Jozef about it he again lied",
                "After 7 days, and him yelling at me twice - he allowed me to fix it under threat of being sued if I break anything",
                "I replaced the entire vent to the drain, since it was completly blocked which I quote I said no amount of snaking would fix it"
            ]
        },
          {
              "label": "Broken Cabinet $400",
              "details": [
                  "Jozef tried to fix it with tape and caulk",
                  "I cleaned all the area, and used wood glue and clamps",
                  "First time he threatened my position in the home"
              ]
          },
          {
              "label": "Evidence",
              "documents": [
                  {
                      "name": "Exhibit A: Expenses",
                      "link": "https://drive.google.com/file/d/12pInhGLSpQUvcVZBq9j4APbdcBX367sP/view?usp=drive_link"
                  },
                  {
                      "name": "Exhibit B: Video Recording",
                      "link": "https://drive.google.com/drive/folders/1srl1X_IIGzbusLfNomOc_5R1fMSbWBpv?usp=sharing"
                  },
                  {
                      "name": "Exhibit C: Transcript",
                      "link": "https://drive.google.com/drive/folders/1srl1X_IIGzbusLfNomOc_5R1fMSbWBpv?usp=sharing"
                  }
              ]
          }
      ]
  },

  {
    "date": "November 20, 2024",
    "title": "Signed Lease",
    "subtitle": "Wanted something documented",
    "financialLoss": 2800,
    "description": [
        {
            "label": "Lease Agreement $800",
            "details": [
                "Made the small mistake switching who was the subleasee and subleasor",
                "Confirmed via text message that is was an easy mistake and a Non-issue, but later reciting the need for him to provide me with a 60 day notice",
                "Later found out may have lied about owning the home, and made contact with another person he saying is the real homeowner"
            ]
        },
        {
          "label": "Broken Sink $1600",
          "details": [
              "This is what started everything. As I needed to cook the sink wouldn't drain, when I asked Jozef about it he again lied",
              "After 7 days, and him yelling at me twice - he allowed me to fix it on Dec 4th under threat of being sued if I break anything",
              "I replaced the entire vent to the drain, since it was completly blocked which I quote I said no amount of snaking would fix it"
          ]
      },
        {
            "label": "Broken Cabinet $400",
            "details": [
                "Jozef tried to fix it with tape and caulk",
                "I cleaned all the area, and used wood glue and clamps",
                "First time he threatened my position in the home"
            ]
        },
        {
            "label": "Evidence",
            "documents": [
                {
                    "name": "Exhibit A: Expenses",
                    "link": "https://drive.google.com/file/d/12pInhGLSpQUvcVZBq9j4APbdcBX367sP/view?usp=drive_link"
                },
                {
                    "name": "Exhibit B: Video Recording",
                    "link": "https://drive.google.com/drive/folders/1srl1X_IIGzbusLfNomOc_5R1fMSbWBpv?usp=sharing"
                },
                {
                    "name": "Exhibit C: Transcript",
                    "link": "https://drive.google.com/drive/folders/1srl1X_IIGzbusLfNomOc_5R1fMSbWBpv?usp=sharing"
                }
            ]
        }
    ]
}




    ]
});

function loadTimeline() {
    const timelineContainer = document.getElementById('timeline');

    timeline.forEach(data => {
        data.events.forEach(event => {
            const li = document.createElement('li');
            li.className = 'timeline-event';

            const icon = document.createElement('label');
            icon.className = 'timeline-event-icon';

            const copy = document.createElement('div');
            copy.className = 'timeline-event-copy';

            const date = document.createElement('p');
            date.className = 'timeline-event-thumbnail';
            date.textContent = event.date;

            const financialLoss = document.createElement('p');
            financialLoss.className = 'timeline-event-thumbnail';
            financialLoss.style.marginLeft = '15px';
            financialLoss.innerHTML = `Financial Loss: <font style="color: red;">$${event.financialLoss.toFixed(2)}</font>`;

            const title = document.createElement('h3');
            title.textContent = event.title;

            const subtitle = document.createElement('h4');
            subtitle.textContent = event.subtitle;

            copy.appendChild(date);
            copy.appendChild(financialLoss);
            copy.appendChild(title);
            copy.appendChild(subtitle);

            event.description.forEach(desc => {
                if (desc.label === "Evidence") {
                    const evidenceSection = document.createElement('p');
                    evidenceSection.innerHTML = "<strong>" + desc.label + "</strong><br>";

                    desc.documents.forEach(doc => {
                        const button = document.createElement('a');
                        button.href = doc.link;
                        button.target = "_blank";
                        button.innerHTML = `<button>View Document: ${doc.name}</button>`;
                        evidenceSection.appendChild(button);
                        evidenceSection.appendChild(document.createElement('br'));
                    });

                    copy.appendChild(evidenceSection);
                } else {
                    const section = document.createElement('p');
                    section.innerHTML = `<strong>${desc.label}</strong><br>${(desc.details || desc.jobs || []).join(', ')}`;
                    copy.appendChild(section);
                }
            });

            li.appendChild(icon);
            li.appendChild(copy);
            timelineContainer.appendChild(li);
        });
    });
}

window.onload = loadTimeline;
