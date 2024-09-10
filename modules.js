const modules = [
    {
      id: 'module1',
      header: 'User Profile',
      content: `Download JSON file: We don't believe in saving your data or hosting data online.
                 We believe you should be in charge of your data, so when you download your .json file
                 you're holding all the memory of Lumina interactions. You'll be prompted to update your name
                 and move to the next module.`,
      buttonAction: 'exportData();addCompletedModule(1);'
    },
    {
      id: 'module2',
      header: 'Unique Identity',
      content: `Once you've downloaded your profile.json file, you should navigate to the settings [gear icon] page.
                 Click the [choose file] button, and select your profile.json file to upload.
                 Here you can see and modify all of the data inside your profile.
                 Upload your recently downloaded profile.json file, to login then navigate to the animated logo button. [Top Left of screen] - 
                 design your avatar, then navigate to chat [message icon]. Press the [nudge] button to learn about the current topic.`
    },
    {
      id: 'module3',
      header: 'Getting Started',
      content: `We are currently talking about the systemic oppression of Black Americans. Why are Black entrepreneurs often overlooked in mainstream business?
                 Answer this in the chat, to open additional modules.`
    },
    {
      id: 'module4',
      header: 'Awaiting update',
      content: `Module 1 Complete.`,
      display: 'none'
    }
  ];

  // Function to create a module
  function createModule(module) {
    const moduleWrapper = document.createElement('div');
    moduleWrapper.className = 'project-box-wrapper';
    moduleWrapper.id = `${module.id}xx`;
    moduleWrapper.style.display = module.display || 'block';

    const moduleBox = document.createElement('div');
    moduleBox.className = 'project-box';
    moduleBox.id = module.id;
    moduleBox.style.backgroundColor = 'rgba(199, 60, 32, .1)';

    const header = document.createElement('div');
    header.className = 'project-box-header';

    const daysLeft = document.createElement('div');
    daysLeft.className = 'days-left';
    daysLeft.id = `${module.id}a`;
    daysLeft.style.color = 'rgba(199, 60, 32, 1)';
    daysLeft.textContent = 'incomplete';

    header.appendChild(daysLeft);

    const contentHeader = document.createElement('div');
    contentHeader.className = 'project-box-content-header';

    const boxContentHeader = document.createElement('p');
    boxContentHeader.className = 'box-content-header';
    boxContentHeader.textContent = module.header;

    const boxContentSubheader = document.createElement('p');
    boxContentSubheader.className = 'box-content-subheader';
    boxContentSubheader.innerHTML = `${module.content} ${module.buttonAction ? `<br><br><button class="open-modal" onclick="${module.buttonAction}">Download</button>` : ''}`;

    contentHeader.appendChild(boxContentHeader);
    contentHeader.appendChild(boxContentSubheader);

    moduleBox.appendChild(header);
    moduleBox.appendChild(contentHeader);

    moduleWrapper.appendChild(moduleBox);

    return moduleWrapper;
  }

  // Function to add modules to the DOM
  function addModules() {
    const splash = document.getElementById('splash');
    modules.forEach(module => {
      splash.appendChild(createModule(module));
    });
  }

  // Call addModules function to render modules
  addModules();