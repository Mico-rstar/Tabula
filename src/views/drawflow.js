
var id = document.getElementById("drawflow");
const editor = new Drawflow(id);
editor.reroute = true;

const dataToImport = {
  "drawflow": {
    "Home": {
      "data": {}
    }
  }
}


editor.start();
editor.import(dataToImport);

editor.clearModuleSelected()


class Maintainer {
  constructor() {
    this.container = {};
    this.id = 0;
  }

  add(key, value) {
    this.container[key] = value;
  }

  remove(key) {
    delete this.container[key];
  }

  get() {
    return this.container;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }


}
const workflowContainer = new Maintainer();

//save data
document.getElementsByClassName("btn-save")[0].addEventListener("click", function () {
  console.log(editor.export());
  console.log(workflowContainer.get()[workflowContainer.getId()]);
  workflowContainer.get()[workflowContainer.getId()].data = editor.export();
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

  //为flowlist添加动态事件
  const flowExpandBtn = document.getElementById('flow-expand-btn');
  flowExpandBtn.addEventListener('click', () => {
    const flowList = document.getElementById('flow-list-content');
    if (flowList.style.display === 'none') {
      flowList.style.display = 'block';
      flowExpandBtn.textContent = '▼';
    } else {
      flowList.style.display = 'none';
      flowExpandBtn.textContent = '▶';
    }
  }
  );

  const flowAddBtn = document.getElementById('flow-add-btn');
  flowAddBtn.addEventListener('click', () => {
    const modal = document.getElementById('flow-modal');
    modal.style.display = 'block';
  });

  //为modal添加动态事件
  const closeBtn = document.querySelector('.close');
  const cancelBtn = document.querySelector('.cancel-btn');
  const form = document.getElementById('workflowForm');

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  function closeModal() {
    document.querySelector('.modal').style.display = 'none';
  }

  const flowNameInput = document.getElementById('workflowName');
  //统计字数
  flowNameInput.addEventListener('input', () => {
    const length = flowNameInput.value.length;
    document.getElementById('name-char-count').textContent = length + "/30";
  });
  const descriptionInput = document.getElementById('workflowDescription');
  //统计字数
  descriptionInput.addEventListener('input', () => {
    const length = descriptionInput.value.length;
    document.getElementById('description-char-count').textContent = length + "/600";
  });



  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // 这里可以添加表单提交的逻辑
    console.log('Form submitted');
    if (flowNameInput.value !== '' && descriptionInput.value !== '') {
      //用时间戳生成id
      const id = Date.now();
      workflowContainer.add(id, {
        "name": flowNameInput.value, "description": descriptionInput.value, data: {
          "drawflow": {
            "Home": {
              "data": {}
            }
          }
        }
      });
      flowNameInput.value = '';
      descriptionInput.value = '';
      closeModal();
      renderWorklist();
    }
  });


});





function showSidebar(event) {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.right = '0';
  //console.log('showSidebar', event.target.offsetParent.id);
}

function hideSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.right = '-400px';
  //console.log('hideSidebar');
}


window.onclick = function (event) {
  hideSidebar();

}


function renderWorklist() {
  const flowList = document.getElementById('flow-list-content');
  flowList.innerHTML = '';
  Object.entries(workflowContainer.get()).forEach(([key, value]) => {
    var flowItem = document.createElement('div');
    flowItem.className = 'flow-list-item';
    flowItem.innerHTML = `
    <span>`+ value.name + `</span>
    <span class="flow-list-item-delete" id=`+ key + ` onclick="delFlowListItem(event)">–</span>`;

    flowItem.addEventListener('click', () => {
      document.querySelectorAll('.flow-list-item').forEach(item => {
        item.classList.remove('selected');
      });
      console.log('click', key, value);
      flowItem.classList.add('selected');
      editor.clearModuleSelected();
      editor.import(value.data);
      console.log(editor);
      workflowContainer.setId(key);
    });

    flowList.appendChild(flowItem);

  });
}

function delFlowListItem(event) {
  console.log("delItem", event);

  //删除workflowContainer指定id的元素
  workflowContainer.remove(event.target.id);
  renderWorklist();
}




