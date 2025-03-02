
var id = document.getElementById("drawflow");
const editor = new Drawflow(id);
editor.reroute = true;
const dataToImport = {
  "drawflow": {
    "Home": {
      "data": {
        "13": {
          "id": 13,
          "name": "start",
          "data": {},
          "class": "start",
          "html": "\n        <div>\n          <div class=\"title-box\"><i></i>开始</div>\n        </div>\n        ",
          "typenode": false,
          "inputs": {},
          "outputs": {
            "output_1": {
              "connections": [
                {
                  "node": "15",
                  "output": "input_1"
                }
              ]
            }
          },
          "pos_x": 18,
          "pos_y": 92
        },
        "14": {
          "id": 14,
          "name": "end",
          "data": {},
          "class": "end",
          "html": "\n          <div>\n            <div class=\"title-box\"><i></i> end</div>\n          </div>\n          ",
          "typenode": false,
          "inputs": {
            "input_1": {
              "connections": [
                {
                  "node": "15",
                  "input": "output_1"
                }
              ]
            }
          },
          "outputs": {},
          "pos_x": 476,
          "pos_y": 472
        },
        "15": {
          "id": 15,
          "name": "test",
          "data": {
            "db": {
              "dbname": "",
              "key": ""
            }
          },
          "class": "test",
          "html": "\n          <div>\n            <div class=\"title-box\"><i></i> test </div>\n            <div class=\"box\">\n              <p>test</p>\n              <input type=\"text\" df-db-dbname placeholder=\"DB name\"><br><br>\n              <input type=\"text\" df-db-key placeholder=\"DB key\">\n              <p>Output Log</p>\n            </div>\n          </div>\n          ",
          "typenode": false,
          "inputs": {
            "input_1": {
              "connections": [
                {
                  "node": "13",
                  "input": "output_1"
                }
              ]
            }
          },
          "outputs": {
            "output_1": {
              "connections": [
                {
                  "node": "14",
                  "output": "input_1"
                }
              ]
            }
          },
          "pos_x": 254,
          "pos_y": 170
        }
      }
    }
  }
}

editor.start();
editor.import(dataToImport);

editor.clearModuleSelected()


//export data
document.getElementsByClassName("btn-export")[0].addEventListener("click", function () {
  console.log("export", editor.export(), null, 4);
});

/* DRAG EVENT */

/* Mouse and Touch Actions */

var elements = document.getElementsByClassName('drag-drawflow');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('touchend', drop, false);
  elements[i].addEventListener('touchmove', positionMobile, false);
  elements[i].addEventListener('touchstart', drag, false);
}

var mobile_item_selec = '';
var mobile_last_move = null;
function positionMobile(ev) {
  mobile_last_move = ev;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
  }
}

function drop(ev) {
  if (ev.type === "touchend") {
    var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
    }
    mobile_item_selec = '';
  } else {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("node");
    addNodeToDrawFlow(data, ev.clientX, ev.clientY);
  }

}

function addNodeToDrawFlow(name, pos_x, pos_y) {
  if (editor.editor_mode === 'fixed') {
    return false;
  }
  pos_x = pos_x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
  pos_y = pos_y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));


  switch (name) {
    case 'start':
      var start = `
        <div>
          <div class="title-box" ondblclick="showSidebar(event)"><i></i>开始</div>
        </div>
      `;
      editor.addNode('start', 0, 1, pos_x, pos_y, 'start', { "input": {}, "output": {} }, start);
      break;
    case 'end':
      var end = `
          <div>
            <div class="title-box" ondblclick="showSidebar(event)"><i></i> end</div>
          </div>
          `
      editor.addNode('end', 1, 0, pos_x, pos_y, 'end', {}, end);
      break;

    case 'test':
      var test = `
          <div>
            <div class="title-box" ondblclick="showSidebar(event)"><i></i> test </div>
            <div class="box">
              <p>test</p>
              <input type="text" df-db-dbname placeholder="DB name"><br><br>
              <input type="text" df-db-key placeholder="DB key">
              <p>Output Log</p>
            </div>
          </div>
          `;
      editor.addNode('test', 1, 1, pos_x, pos_y, 'test', { "db": { "dbname": '', "key": '' } }, test);
      break;

    default:
  }
}

var transform = '';
function showpopup(e) {
  e.target.closest(".drawflow-node").style.zIndex = "9999";
  e.target.children[0].style.display = "block";
  //document.getElementById("modalfix").style.display = "block";

  //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
  transform = editor.precanvas.style.transform;
  editor.precanvas.style.transform = '';
  editor.precanvas.style.left = editor.canvas_x + 'px';
  editor.precanvas.style.top = editor.canvas_y + 'px';
  console.log(transform);

  //e.target.children[0].style.top  =  -editor.canvas_y - editor.container.offsetTop +'px';
  //e.target.children[0].style.left  =  -editor.canvas_x  - editor.container.offsetLeft +'px';
  editor.editor_mode = "fixed";

}

function closemodal(e) {
  e.target.closest(".drawflow-node").style.zIndex = "2";
  e.target.parentElement.parentElement.style.display = "none";
  //document.getElementById("modalfix").style.display = "none";
  editor.precanvas.style.transform = transform;
  editor.precanvas.style.left = '0px';
  editor.precanvas.style.top = '0px';
  editor.editor_mode = "edit";
}

function changeModule(event) {
  var all = document.querySelectorAll(".menu ul li");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function changeMode(option) {

  //console.log(lock.id);
  if (option == 'lock') {
    lock.style.display = 'none';
    unlock.style.display = 'block';
  } else {
    lock.style.display = 'block';
    unlock.style.display = 'none';
  }

}



//加载工作流输出
function createDataItem(key, value) {
  const item = document.createElement('div');
  item.className = 'args-output-item';

  const keyElement = document.createElement('span');
  keyElement.className = 'args-output-key';
  keyElement.textContent = key;

  const valueElement = document.createElement('span');
  valueElement.className = 'args-output-type';
  valueElement.textContent = value;

  item.appendChild(keyElement);
  item.appendChild(valueElement);

  return item;
}


//递归地创建输出对象信息
function createObjectItem(key, obj) {
  const item = document.createElement('div');
  item.className = 'args-output-item';

  const details = document.createElement('div');
  details.className = 'args-output-item';
  details.style.display = 'none';
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      details.appendChild(createObjectItem(key, value));
    } else {
      details.appendChild(createDataItem(key, value));
    }
  }

  const arrow = document.createElement('span');
  arrow.className = 'args-output-arrow';
  arrow.textContent = '▶';
  arrow.addEventListener('click', () => {
    if (arrow.textContent === '▶') {
      arrow.textContent = '▼';
      details.style.display = 'block';
    } else {
      arrow.textContent = '▶';
      details.style.display = 'none';
    }
  });

  const keyElement = document.createElement('span');
  keyElement.className = 'args-output-key';
  keyElement.textContent = key;

  item.appendChild(arrow);
  item.appendChild(keyElement);
  item.appendChild(details);

  return item;
}




document.addEventListener('DOMContentLoaded', function () {
  const data = {
    message: "String",
    pdf_content: "String",
    code: "Integer",
    data: {
      content: "String",
      title: {
        content: "String",
        check: "Boolean"
      }
    },
    err_msg: "String",
    error_code: "String",
    error_msg: "String"
  };
  const container = document.getElementById('args-output-container');

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object' && value !== null) {
      container.appendChild(createObjectItem(key, value));
    } else {
      container.appendChild(createDataItem(key, value));
    }
  }

});





function showSidebar(event) {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.right = '0';
  console.log('showSidebar', event.target.offsetParent.id);
}

function hideSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.right = '-400px';
  console.log('hideSidebar');
}