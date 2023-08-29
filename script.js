var nodes = null;
var edges = null;
var network = null;
var data = {
    nodes: nodes,
    edges: edges,
  }

function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

function draw() {
  destroy();
  nodes = [];
  edges = [];

  var container = document.getElementById("mynetwork");
  var options = {
    interaction: { keyboard: true },
    manipulation: {
      addNode: function (data, callback) {
        document.getElementById("operation").innerText = "Add Node";
        document.getElementById("node-id").value = data.id;
        document.getElementById("node-label").value = data.label;
        document.getElementById("node-label").value = data.title;
        document.getElementById("saveButton").onclick = saveData.bind(this, data, callback);
        document.getElementById("cancelButton").onclick = clearPopUp.bind();
        document.getElementById("network-popUp").style.display = "block";
      },
      editNode: function (data, callback) {
        document.getElementById("operation").innerText = "Edit Node";
        document.getElementById("node-id").value = data.id;
        document.getElementById("node-label").value = data.label;
        document.getElementById("saveButton").onclick = saveData.bind(this, data, callback);
        document.getElementById("cancelButton").onclick = cancelEdit.bind(this, callback);
        document.getElementById("network-popUp").style.display = "block";
      },

      addEdge: function (data, callback)  {
        var edgePopUp = document.getElementById("edge-popUp");
        edgePopUp.style.display = "block";
        document.getElementById("bidirectional").addEventListener("click", function () {
          data.arrows = null;
          data.label = document.getElementById("edge-label").value; // Get the edge label value
          callback(data);
          edgePopUp.style.display = "none";
        });
        
        document.getElementById("unidirectional").addEventListener("click", function () {
          data.arrows = "to";
          data.label = document.getElementById("edge-label").value; // Get the edge label value
          callback(data);
          edgePopUp.style.display = "none";
        });
        document.getElementById("edgeCancel").addEventListener("click", function () {
          edgePopUp.style.display = "none";
        });
      },
    },
    nodes: {
      shape: "dot",
      size: 20,
      color: "#FE7BE5",
      font: {
        size: 18,
        color: "#ffffff",
      },
      borderWidth: 2,
    },
    edges: {
      color: "#d6116d",
      width: 3,
      font: { 
        size: 18,
        color: "#ffffff",
        labelHighlightBold: false,
        strokeWidth: "2px",
      },
      
    },
  };
  network = new vis.Network(container, data, options);
}

function clearPopUp() {
  document.getElementById("saveButton").onclick = null;
  document.getElementById("cancelButton").onclick = null;
  document.getElementById("network-popUp").style.display = "none";
}

function cancelEdit(callback) {
  clearPopUp();
  callback(null);
}

function saveData(data, callback) {
  data.id = document.getElementById("node-id").value;
  data.label = document.getElementById("node-label").value;
  data.title = document.getElementById("node-title").value+ "\n Prerequisite: " +document.getElementById("node-prerequisite").value;
  document.getElementById("node-id").value = "";
  document.getElementById("node-label").value = "";
  document.getElementById("node-title").value = "";
  document.getElementById("node-prerequisite").value = "";
  clearPopUp();
  callback(data);
}

function init() {
  draw();
}

function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}
