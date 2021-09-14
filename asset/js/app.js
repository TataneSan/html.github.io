	
var mixedMode = {
	name: "htmlmixed",
	scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
		mode: null},
		{matches: /(text|application)\/(x-)?vb(a|script)/i,
			mode: "vbscript"}]
		};

		var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
			mode: mixedMode,
			styleActiveLine: true,
			lineNumbers: true,
			lineWrapping: true,
			tabMode: 'indent',
			htmlMode: true,
			styleActiveLine: true,
			matchTags: {bothTags: true},
			indentUnit: 4,
			indentWithTabs: true,
			viewportMargin: Infinity,
			matchTags: {bothTags: true},
			extraKeys: {"Ctrl-J": "toMatchingTag"},
			autofocus:true
		});

		addEventListener("keydown", function(event) {
			if (event.keyCode == 13 && event.shiftKey) {
				event.preventDefault();
				editPreview();
				return false;
			}
		});


		function updatePreview() {
			document.getElementById("preview").innerHTML = "";
			var previewFrame = document.getElementById('preview');
			var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
			preview.open();
			preview.write(editor.getValue());
			preview.close();

	/*    
	change font size
	editor.display.wrapper.style.fontSize = 50 + "px";
	editor.refresh();*/


}
updatePreview()


function editPreview() {
	var frame = document.getElementById("preview");
	frame.parentNode.removeChild(frame);
	var ifrm  = document.createElement("iframe");
	ifrm.setAttribute("frameborder", "0");
	ifrm.setAttribute("id", "preview");
	document.getElementById("sectionA").appendChild(ifrm);
	updatePreview();
}


function updateEditor() {
	var browserHeight = document.getElementById('wrapper-code').clientHeight;
	editor.getWrapperElement().style.height = browserHeight + 'px'; 
	editor.refresh(); 
}
updateEditor()



$(function(){
	$(document).on("click","#alv, #alh",function(){
		$("#alv, #alh").removeClass("selected");
		$(this).addClass("selected");
	})

	$(document).on("click","#alv",function(){
		$(".container-code, .container-preview").removeClass("container-code-horizontal");
		updateEditor();
	})

	$(document).on("click","#alh",function(){
		$(".container-code, .container-preview").addClass("container-code-horizontal");
		updateEditor();
	})

	if($(window).width() <= 412) {
		$("#alh").click();
	}



})