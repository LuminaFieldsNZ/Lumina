


  function showSection(sectionId) {
    const sections = ['graphS', 'projectsS', 'calendarS', 'justiceS', 'glossaryS', 'timelineS']; // List of all section IDs

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


  showSection('glossaryS');



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


  const workHoursData = [
    { date: "2024-10-25", hours: 5 },
    { date: "2024-11-01", hours: 12 },
    { date: "2024-11-08", hours: 9 },
    { date: "2024-11-15", hours: 7 },
    { date: "2024-11-22", hours: 14 },
    { date: "2024-11-29", hours: 10 },
    { date: "2024-12-06", hours: 8 },
    { date: "2024-12-13", hours: 15 },
    { date: "2024-12-20", hours: 13 },
    { date: "2024-12-27", hours: 16 },
    { date: "2025-01-03", hours: 18 },
    { date: "2025-01-10", hours: 20 },
    { date: "2025-01-17", hours: 22 },
    { date: "2025-01-24", hours: 17 },
    { date: "2025-01-31", hours: 15 },
    { date: "2025-02-07", hours: 10 },
    { date: "2025-02-14", hours: 8 },
    { date: "2025-02-21", hours: 12 },
    { date: "2025-02-28", hours: 14 },
    { date: "2025-03-07", hours: 19 }
];



   // 🌟 Bubble Chart for Work Summary
   var workSummaryCtx = document.getElementById('workSummaryChart').getContext('2d');

   new Chart(workSummaryCtx, {
       type: 'bubble',
       data: {
           datasets: [{
               label: 'Hours Worked',
               data: workHoursData.map(d => ({
                   x: new Date(d.date),
                   y: d.hours,
                   r: d.hours / 2  // Bubble size scales with hours worked
               })),
               backgroundColor: 'rgba(75, 192, 192, 0.6)',
               borderColor: 'rgba(75, 192, 192, 1)',
               borderWidth: 2
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   type: 'time',
                   time: { unit: 'week' },
                   title: { display: true, text: 'Date' }
               },
               y: {
                   beginAtZero: true,
                   title: { display: true, text: 'Hours Worked' }
               }
           },
           plugins: { legend: { display: true } }
       }
   });
