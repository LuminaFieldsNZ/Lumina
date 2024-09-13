



let state = {
     hair: './hair/hair0.png',
     glasses: './glasses/glasses0.png',
     body: './body/body0.png',
     outer: './outer/outer0.png'
 };


document.addEventListener('DOMContentLoaded', function() {
  const peepContent = document.documentElement.outerHTML;
});

function updateLayer(action, value) {
  const elementMap = {
    hair: 'hairLayer',
    glasses: 'glassesLayer',
    body: 'bodyLayer',
    outer: 'outerLayer'
  };
  
  const elementId = elementMap[action];
  if (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.src = value;
    }
  }
}

window.addEventListener('message', function(event) {
  if (event.data.action) {
    updateLayer(event.data.action, event.data.value);
  }
  
  if (event.data.state) {
    const { hair, glasses, body, outer } = event.data.state;
    updateLayer('hair', hair);
    updateLayer('glasses', glasses);
    updateLayer('body', body);
    updateLayer('outer', outer);
  }
}, false);
