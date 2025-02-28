


  function showSection(sectionId) {
    const sections = ['graphS', 'projectsS', 'calendarS']; // List of all section IDs

    // Loop through all sections and hide them
    sections.forEach(id => {
      const section = document.getElementById(id);
      section.style.position = 'absolute';
      section.style.opacity = '0';
      section.style.height = '0';
      section.style.overflow = 'hidden';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.position = 'relative';
    selectedSection.style.opacity = '1';
    selectedSection.style.height = 'auto';
    selectedSection.style.overflow = 'visible';
  }


  showSection('projectsS');



  var ctx = document.getElementById('phoneCallsChart').getContext('2d');
  var phoneCallsChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Total Calls', 'Crycella Yelled (90%)', 'Micheal Told Stories (18)', 'Crycella Yelled during Stories (80%)', 'Me Explaining (90%)', 'Distraction (50%)'], // Labels for the X-axis
          datasets: [{
              label: 'Percentage of Calls or Events',
              data: [100, 90, 75, 64, 81, 50], // Percentage data (percentage of calls or events)
              backgroundColor: [
                  '#FF6F61', // Red for total calls
                  '#FF9F43', // Orange for Crycella Yelled
                  '#36A2EB', // Blue for Micheal Told Stories
                  '#FFCD56', // Yellow for Crycella Yelled during Stories
                  '#4BC0C0', // Teal for Me Explaining
                  '#FF99CC'  // Pink for Distraction
              ],
              borderColor: [
                  '#FF6F61',
                  '#FF9F43',
                  '#36A2EB',
                  '#FFCD56',
                  '#4BC0C0',
                  '#FF99CC'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      max: 100,
                      stepSize: 20
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              }
          }
      }
  });