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
      addEdge: function (data, callback) {
        callback(data)
      },
    },
    nodes: {
        shape: "dot",
        size: 20,
        font: {
          size: 15,
          color: "#111",
        },
        borderWidth: 2,
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
