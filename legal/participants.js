








const projectData = [
    {
      phone: "(785) 214-9030",
      name: "Crycella Freitag",
      email: "Crycellaf@gmail.com",
      role: "Mother",
      honestyPercentage: 10,
      backgroundColor: "#fee4cb",
      progressColor: "#e85b51",
      participants: [
        "lie.png",
        "heart.png",
        "contract.png",
        "thief.png"
      ],
      evidenceFunction: "openCrycella()"
    },
    {
      phone: "(417) 334-6316",
      name: "Joshua Garrett",
      email: "josh@joshgarrettlaw.com",
      role: "Mothers Lawyer",
      honestyPercentage: 50,
      backgroundColor: "#e9e7fd",
      progressColor: "#e85b51",
      participants: [
        "lie.png",
        "contract.png"
      ],
      evidenceFunction: "openJosh()"
    },
    {
      phone: "(913) 221-4183",
      name: "Carolyn Salmon",
      email: "crsalmon1@gmail.com",
      role: "Grandfather's Wife",
      honestyPercentage: 20,
      backgroundColor: "#ffca75",
      progressColor: "#e85b51",
      participants: [
        "lie.png",
        "heart.png"
      ],
      evidenceFunction: "openCarolyn()"
    },
    {
      phone: "(660) 525-8205",
      name: "Jozef Hanratty",
      email: "josh@joshgarrettlaw.com",
      role: "Fathers Roommate",
      honestyPercentage: 10,
      backgroundColor: "#ffd3e2",
      progressColor: "#e85b51",
      participants: [
        "lie.png",
        "contract.png"
      ],
      evidenceFunction: "openJozef()"
    },
    {
      phone: "(720) 498-5546",
      name: "Kelly Truelove",
      email: "ara@mokslaw.com",
      role: "Fathers Landlord",
      honestyPercentage: 50,
      backgroundColor: "#b5f5ea",
      progressColor: "#e85b51",
      participants: [
        "lie.png",
        "contract.png"
      ],
      evidenceFunction: "openKelly()"
    },
    {
      phone: "(660) 473-0562",
      name: "Amanda Freitag",
      email: "josh@joshgarrettlaw.com",
      role: "Grandmother",
      honestyPercentage: 70,
      backgroundColor: "#4ab560",
      progressColor: "#27cc27",
      participants: [
        "heart.png",
        "thief.png"
      ],
      evidenceFunction: "openAmanda()"
    },
    {
      phone: "(720) 635-6248",
      name: "Stephanie Reed",
      email: "josh@joshgarrettlaw.com",
      role: "Fathers Friend",
      honestyPercentage: 80,
      backgroundColor: "#91bdfa",
      progressColor: "#27cc27",
      participants: [
        "heart.png",
        "thief.png"
      ],
      evidenceFunction: "openStephanie()"
    }
  ];






  function generateProjectBoxes() {
    const container = document.querySelector('.project-boxes'); // Container to hold the boxes
  
    projectData.forEach((project, index) => {
      const projectBox = document.createElement('div');
      projectBox.className = 'project-box-wrapper';
  
      projectBox.innerHTML = `
        <div class="project-box" style="background-color: ${project.backgroundColor};">
          <div class="project-box-header">
            <span>${project.phone}</span>
            <div class="more-wrapper">
              <button class="project-btn-more">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>
          </div>
          <div class="project-box-content-header">
            <p class="box-content-header">${project.name}</p>
            <p class="box-content-subheader">${project.email}</p>
          </div>
          <div class="box-progress-wrapper">
            <p class="box-progress-header">${project.role}</p>
            <div class="box-progress-bar">
              <span class="box-progress" style="width: ${project.honestyPercentage}%; background-color: ${project.progressColor};"></span>
            </div>
            <p class="box-progress-percentage">Honesty: ${project.honestyPercentage}%</p>
          </div>
          <div class="project-box-footer">
            <div class="participants">
              ${project.participants.map(participant => `<img src="${participant}" alt="participant">`).join('')}
              <button class="add-participant" style="color: ${project.progressColor};">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                  <path d="M23 4v6h-6"/>
                  <path d="M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
              </button>
            </div>
            <a onclick="${project.evidenceFunction}">
              <div class="days-left" style="color: ${project.progressColor};">
                Evidence
              </div>
            </a>
          </div>
        </div>
      `;
  
      container.appendChild(projectBox);
    });
  }
  
  // Call the function to generate the boxes
  generateProjectBoxes();