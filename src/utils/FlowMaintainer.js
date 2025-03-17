class FlowMaintainer {
    constructor(flowEditor, workflowContainer) {
        this.flowEditor = flowEditor;
        this.workflowContainer = workflowContainer;

    }

    save() {
        return {
            "flowEditor": this.flowEditor.export(),
            "flowContainer": this.workflowContainer.save()
        }
    }

    recover(flowEditorData, flowContentData) {
        flowEditor.import(flowEditorData);
        flowEditor.clearModuleSelected()

        workflowContainer.recover(flowContentData);

        window.parent.DRAPI.emit("recover-flow-list", {});
    }



}

