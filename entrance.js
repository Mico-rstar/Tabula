

// 视图切换功能
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const viewName = button.dataset.view;
        console.log('Switching to view:', viewName);


        switch (viewName) {
            case 'editor':
                showEditor();
                break;
            case 'drawflow':
                showDrawflow();
                break;
        }


    });
});

function showEditor() {
    document.getElementById('editor-option').style.background = '#faf8f8';
    document.getElementById('flow-option').style.background = '#ddd6d6';
    document.getElementById('editor-view').style.display = 'block';
    document.getElementById('drawflow-view').style.display = 'none';
}
function showDrawflow() {
    document.getElementById('editor-option').style.background = '#ddd6d6';
    document.getElementById('flow-option').style.background = '#faf8f8';
    document.getElementById('editor-view').style.display = 'none';
    document.getElementById('drawflow-view').style.display = 'block';
}

