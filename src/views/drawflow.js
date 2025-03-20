


var id = document.getElementById("drawflow");
var flowEditor = new Drawflow(id);

flowEditor.reroute = true;


const dataToImport = {
  "drawflow": {
    "Home": {
      "data": {}
    }
  }
}


flowEditor.start();
flowEditor.import(dataToImport);
flowEditor.clearModuleSelected()

//控制是否允许创建节点
var allowDropSignal = false;
flowEditor.editor_mode = "view";


class Maintainer {
  constructor(container) {
    if (container)
      this.container = container;
    else this.container = {};
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

  recover(container) {
    this.container = container;

    for (const [id, flowData] of Object.entries(workflowContainer.get())) {
      //将flowData转化为工作流引擎接口接收的格式
      flowData.workflow_id = id;
      const newFlowData = transformFlowData(flowData);
      console.log(newFlowData);

      //发送给服务端
      window.parent.ws.sendMsg({ type: "submitWorkflow", data: newFlowData }).then((res) => {
        console.log(res);
        if (res.data.status == 1) console.log("success");
        else console.log("submit error", res.data.err_msg);
      })
    }
  }

  //表示当前用户打开的工作流
  setId(id) {
    this.id = id;
  }

  setFlowId(flowId) {
    this.container[this.id].workflow_id = flowId;
  }

  save() {
    return this.container;
  }


}
const workflowContainer = new Maintainer();

window.parent.flowMaintainer = new FlowMaintainer(flowEditor, workflowContainer);

//save data
document.getElementsByClassName("btn-save")[0].addEventListener("click", function () {
  const flowData = flowEditor.export();
  console.log(flowData);
  console.log(workflowContainer.get()[workflowContainer.getId()]);
  workflowContainer.get()[workflowContainer.getId()].data = flowData;
  //将客户端id加入到发给后端的数据中
  workflowContainer.setFlowId(workflowContainer.getId());

  //将flowData转化为工作流引擎接口接收的格式
  const newFlowData = transformFlowData(workflowContainer.get()[workflowContainer.getId()]);
  console.log(newFlowData);

  //发送给服务端
  window.parent.ws.sendMsg({ type: "submitWorkflow", data: newFlowData }).then((res) => {
    if (res.data.status == 1) console.log("success");
    else console.log("submit error", res.data.err_msg);
  })

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


  console.log("drag");
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
  }
}

function drop(ev) {
  if (allowDropSignal === false) return;
  console.log("drop");
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
  if (flowEditor.editor_mode === 'fixed') {
    return false;
  }
  pos_x = pos_x * (flowEditor.precanvas.clientWidth / (flowEditor.precanvas.clientWidth * flowEditor.zoom)) - (flowEditor.precanvas.getBoundingClientRect().x * (flowEditor.precanvas.clientWidth / (flowEditor.precanvas.clientWidth * flowEditor.zoom)));
  pos_y = pos_y * (flowEditor.precanvas.clientHeight / (flowEditor.precanvas.clientHeight * flowEditor.zoom)) - (flowEditor.precanvas.getBoundingClientRect().y * (flowEditor.precanvas.clientHeight / (flowEditor.precanvas.clientHeight * flowEditor.zoom)));



  var nodeDiv = `
        <div>
          <div class="title-box" ondblclick="showSidebar(event)"><i></i>`+ window.nodeMaps[name].name + '_' + window.nodeMaps[name].count + `</div>
        </div>
      `;
  if (name === 'start')
    flowEditor.addNode(window.nodeMaps[name].name + '_' + window.nodeMaps[name].count, 0, 1, pos_x, pos_y, window.nodeMaps[name].name + '_' + window.nodeMaps[name].count, window.nodeMaps[name], nodeDiv);
  else if (name === 'end')
    flowEditor.addNode(window.nodeMaps[name].name + '_' + window.nodeMaps[name].count, 1, 0, pos_x, pos_y, window.nodeMaps[name].name + '_' + window.nodeMaps[name].count, window.nodeMaps[name], nodeDiv);
  else
    flowEditor.addNode(window.nodeMaps[name].name + '_' + window.nodeMaps[name].count, 1, 1, pos_x, pos_y, window.nodeMaps[name].name + '_' + window.nodeMaps[name].count, window.nodeMaps[name], nodeDiv);

  window.nodeMaps[name].count++;
  // if (name === 'start')
  //   flowEditor.addNode(name, 0, 1, pos_x, pos_y, name, {}, nodeDiv);
  // else if (name === 'end')
  //   flowEditor.addNode(name, 1, 0, pos_x, pos_y, name, {}, nodeDiv);
  // else
  //   flowEditor.addNode(name, 1, 1, pos_x, pos_y, name, {}, nodeDiv);

  document.querySelectorAll('.outputs').forEach(output => {
    output.addEventListener('mousedown', () => {
      console.log("click");
    });
  });

}

var transform = '';
function showpopup(e) {
  e.target.closest(".drawflow-node").style.zIndex = "9999";
  e.target.children[0].style.display = "block";
  //document.getElementById("modalfix").style.display = "block";

  //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
  transform = flowEditor.precanvas.style.transform;
  flowEditor.precanvas.style.transform = '';
  flowEditor.precanvas.style.left = flowEditor.canvas_x + 'px';
  flowEditor.precanvas.style.top = flowEditor.canvas_y + 'px';
  console.log(transform);

  //e.target.children[0].style.top  =  -flowEditor.canvas_y - flowEditor.container.offsetTop +'px';
  //e.target.children[0].style.left  =  -flowEditor.canvas_x  - flowEditor.container.offsetLeft +'px';
  flowEditor.editor_mode = "fixed";

}

function closemodal(e) {
  e.target.closest(".drawflow-node").style.zIndex = "2";
  e.target.parentElement.parentElement.style.display = "none";
  //document.getElementById("modalfix").style.display = "none";
  flowEditor.precanvas.style.transform = transform;
  flowEditor.precanvas.style.left = '0px';
  flowEditor.precanvas.style.top = '0px';
  flowEditor.editor_mode = "edit";
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







// const data = {
//   "start": {
//     "type": "start",
//     "name": "开始",

//     "description": "工作流开端",
//     "input_content": {
//       "title": "输入",
//       "data": {
//       }
//     },
//     "start_input": {
//       "title": "自定义入参",
//       "data": ["output"]
//     },
//     "output_content": {
//       "title": "输出",
//       "data": {
//       }

//     }
//   },
//   "test": {
//     "type": "test",
//     "name": "测试",
//     "description": "测试节点",
//     "input_content": {
//       "title": "输入",
//       "data": {
//         "input1": "",
//         "input2": ""
//       }
//     },
//     "attempt_match": {
//       "title": "意图匹配",
//       "data": []
//     },
//     "output_content": {
//       "title": "输出",
//       "data": {
//         "message": "String",
//         "data": {
//           "content": "String",
//           "title": {
//             "content": "String",
//             "check": "Boolean"
//           }
//         }
//       }
//     }
//   },
//   "llm": {
//     "type": "llm",
//     "name": "大模型",
//     "description": "调用工作流",
//     "input_content": {
//       "title": "输出",
//       "data": {
//         "input_content": ""
//       }
//     },
//     "output_content": {
//       "title": "输出",
//       "data": {
//       }
//     }
//   },
//   "intent_identify": {
//     "type": "intent_identify_plus",
//     "name": "意图识别",
//     "description": "根据意图选择对应分支",
//     "input_content": {
//       "title": "输入",
//       "data": {
//         "input_content": ""
//       }
//     },
//     "attempt_match": {
//       "title": "意图匹配",
//       "data": []
//     }
//   },
//   "end": {
//     "type": "end",
//     "name": "结束",
//     "description": "工作流截止",
//     "input_content": {
//       "title": "输入",
//       "data": {

//       }
//     },
//     "output_content": {
//       "title": "输出",
//       "data": {
//         "output_content": ""
//       }
//     }
//   }
// }





document.addEventListener('DOMContentLoaded', function () {

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



  /*
  window.ws.sendMsg({ "type": "getNodes", "data": {} }).then(
    (data) => {
      const nodeMaps = {};
      for (const [key, node] of Object.entries(data)) {
        nodeList.appendChild(createNodeItem(node.type, node.name));
        nodeMaps[node.type] = node;
      }
      window.nodeMaps = nodeMaps;
    }
  );
  */

});

//加载节点数据
const nodeList = document.getElementById("node-list");
window.parent.DRAPI.addEventListener("add-node", (data) => {
  console.log(window.parent);
  window.parent.ws.sendMsg({ type: 'getNodes' }).then((data) => {
    console.log('节点数据: ', data.data);

    const nodeMaps = {};
    for (const [key, node] of Object.entries(data.data)) {
      nodeList.appendChild(createNodeItem(node.type, node.name));
      node["count"] = 1;
      nodeMaps[node.type] = node;
    }
    window.nodeMaps = nodeMaps;
    window.parent.DRAPI.removeAllListeners('add-node');
  })
});


/* <div class="drag-drawflow" draggable="true" ondragstart="drag(event)" data-node="start">
  <span>开始</span>
</div> */
function createNodeItem(type, name) {
  const item = document.createElement('div');
  item.className = 'drag-drawflow';
  item.setAttribute('draggable', 'true');
  item.setAttribute('ondragstart', 'drag(event)');
  item.setAttribute('data-node', type);
  item.innerHTML = `
    <span>`+ name + `</span>
  `;
  return item;
}


function showSidebar(event) {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.right = '0';
  console.log(event);
  const flowData = flowEditor.export();
  const id = event.target.offsetParent.id.split('-')[1];
  console.log(getInputData(flowData, id));

  const myFlowSetting = new FlowSetting(flowEditor, id, flowData.drawflow.Home.data[id].data, getInputData(flowData, id));
  //console.log('showSidebar', event.target.offsetParent.id);
}

function hideSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.right = '-400px';
  //console.log('hideSidebar');
}


// window.onclick = function (event) {
//   hideSidebar();

// }

window.parent.DRAPI.addEventListener("recover-flow-list", () => {
  renderWorklist();
})

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
      allowDropSignal = true;

      console.log('click', key, value);
      flowItem.classList.add('selected');
      flowEditor.clearModuleSelected();
      flowEditor.import(value.data);
      console.log(flowEditor);
      flowEditor.editor_mode = "edit";
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




// 将flowData转换为符合工作流引擎接口的格式
function transformFlowData(flowdata) {

  const formedFlowData = { workflow_name: flowdata.name, tasks: {}, connections: [], nameMap: {}, id: flowdata.workflow_id };

  for (const [id, object] of Object.entries(flowdata.data.drawflow.Home.data)) {

    formedFlowData.tasks[id] = {
      id: id,
      name: object.name,
      type: object.data.type,
      input_content: object.data.input_content,
      output_content: object.data.output_content,

    }

    formedFlowData.nameMap[object.name] = id;

    if (object.data.attempt_match) {
      formedFlowData.tasks[id].attempt_match = object.data.attempt_match;
    }
    //连接节点
    let index = 0;
    for (const [output_n, obj] of Object.entries(object.outputs)) {
      obj.connections.forEach(connection => {
        if (object.data.attempt_match) {
          formedFlowData.connections.push({
            from: id,
            to: connection.node,
            branch: index
          });
        } else {
          formedFlowData.connections.push({
            from: id,
            to: connection.node,
            branch: -1
          });
        }
      });

      index++;
    }

  }
  return formedFlowData;
}


function getInputData(flowData, id) {

  const inputData = {};
  function getInputData(flowData, id, inputData) {

    if (flowData.drawflow.Home.data[id].inputs) {
      for (const [input_n, obj] of Object.entries(flowData.drawflow.Home.data[id].inputs)) {
        obj.connections.forEach(connection => {
          nodeId = connection.node;
          if (flowData.drawflow.Home.data[nodeId].data.output_content) {
            inputData[flowData.drawflow.Home.data[nodeId].name] = flowData.drawflow.Home.data[nodeId].data.output_content.data;
          }
          getInputData(flowData, nodeId, inputData);
        });
      }
    }
  }
  getInputData(flowData, id, inputData);
  return inputData;
}




//编辑事件
flowEditor.on('connectionCreated', function (data) {
  console.log('connectionCreated', data);
});

flowEditor.on('connectionRemoved', function (data) {
  console.log('connectionRemoved', data);
});

flowEditor.on('nodeCreated', function (data) {
  console.log('nodeCreated', data);
});

flowEditor.on('nodeRemoved', function (data) {
  console.log('nodeRemoved', data);
});

flowEditor.on('nodeDataChanged', function (data) {
  console.log('nodeDataChanged', data);
});