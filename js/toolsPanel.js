LT.readTileImages = function(){
  var readTileImages = LT.ajaxRequest("POST", "php/read_images.php",{ 'type' : 'tile'});
  if (readTileImages.responseXML){
    var imageElements = readTileImages.responseXML.getElementsByTagName('image');
    LT.tileImages = {};
    for( var i = 0 ; i < imageElements.length; i++ ){
      var image = new LT.Image(imageElements[i]);
	  LT.tileImages[image.id] = image;
    }
  }
}

LT.readPieceImages = function(){
  var readPieceImages = LT.ajaxRequest("POST", "php/read_images.php",{ 'type' : 'piece'});
  if (readPieceImages.responseXML){
    var imageElements = readPieceImages.responseXML.getElementsByTagName('image');
    LT.pieceImages = {};
    for( var i = 0 ; i < imageElements.length; i++ ){
      var image = new LT.Image(imageElements[i]);
	  LT.pieceImages[image.id] = image;
    }
  }
}

LT.loadSwatches = function (){
  while(LT.tilesTab.firstChild){
    LT.tilesTab.removeChild(LT.tilesTab.firstChild);
  }
  var imagesArray = LT.sortObject(LT.tileImages, 'file');
  for( var i = 0 ; i < imagesArray.length; i++ ){
    newImage = LT.element('img', { title : imagesArray[i].file, 
	  style : 'border: 1px solid black; margin: 1px 1px 1px 1px', 
	  src : 'images/upload/tile/' + imagesArray[i].file}, LT.tilesTab);
	newImage.id = imagesArray[i].id;
	newImage.file = imagesArray[i].file;
	newImage.onclick = function() {
	  LT.selectedImageID = this.id;
      LT.selectedImage = this.file;
	}
  }
}
LT.loadPieceImages = function (){
  while(LT.pieceImageDiv.firstChild){
    LT.pieceImageDiv.removeChild(LT.pieceImageDiv.firstChild);
  }
  var imagesArray = LT.sortObject(LT.pieceImages, 'file');
  for( var i = 0 ; i < imagesArray.length; i++ ){
    newImage = LT.element('img', { title : imagesArray[i].file, 
	  style : 'border: 1px solid black; margin: 1px 1px 1px 1px', 
	  src : 'images/upload/piece/' + imagesArray[i].file}, LT.pieceImageDiv);
	newImage.id = imagesArray[i].id;
	newImage.file = imagesArray[i].file;
	newImage.onclick = function() {
	  LT.selectedImageID = this.id;
      LT.selectedImage = this.file;
	}
  }
}

LT.loadPieces = function (){
  var readPieces = LT.ajaxRequest("POST", "php/read_pieces.php",{ 'table_id' : LT.currentTable.id });
  if (readPieces.responseXML){
    var pieceElements = readPieces.responseXML.getElementsByTagName('piece');
    LT.pieces = {};
    for( var i = 0 ; i < pieceElements.length; i++ ){
      var piece = new LT.Piece(pieceElements[i]);
	  LT.pieces[piece.id] = piece;
      var newPiece = LT.element('div', { title : pieceElements[i].file, 
	  style : 'position: absolute; margin: 1px 1px 1px 1px', 
	  src : 'images/upload/piece/' + pieceElements[i].file}, LT.tableTop);
    }
  }
}

LT.createPiece = function () {
  var createPieceAjax = LT.ajaxRequest("POST", "php/create_piece.php",
    { table_id : LT.currentTable.id, 
	  image_id : 0, 
	  user_id : 0,
	  name : 0,
	  x : 0,
	  y : 0, 
	  x_offset : 0,
	  y_offset : 0,
	  height : 0,
	  width : 0 
	}
  );
}
populatePiecesTab = function () {
  alert(toString(LT.piecesTab.style));
  LT.piecesTab.style = 'overflow: hidden';
  alert(toString(LT.piecesTab.style));
  LT.piecesForm = LT.element('form', { }, LT.piecesTab);
  var nameDiv = LT.element('div', { 'class' : 'fLabel' }, LT.piecesForm, 'Name: ');
  inputPieceName = LT.element('input', { size : 10, type: 'text',
    'class' : 'fInput' }, nameDiv, 'Piece Name', 1);

  
  var yDiv = LT.element('div', { 'class' : 'fLabel' }, LT.piecesForm, 'Y Pos: ');
  LT.piecesForm.y = LT.element('input', { size : 1, 
    'class' : 'fInput' }, yDiv, '0', 1);
  var xDiv = LT.element('div', { 'class' : 'fLabel' }, LT.piecesForm, 'X Pos: ');
  LT.piecesForm.x = LT.element('input', { size : 1, 
    'class' : 'fInput' }, xDiv, '0', 1);
  var hDiv = LT.element('div', { 'class' : 'fLabel' }, LT.piecesForm, 'Height Offset: ');
  LT.heightOffset = LT.element('input', { size : 1, 
    'class' : 'fInput' }, hDiv, '0', 1);  
  var wDiv = LT.element('div', { 'class' : 'fLabel' }, LT.piecesForm, 'Width Offset: ');
  LT.widthOffset = LT.element('input', { size : 1, 
    'class' : 'fInput' }, wDiv, '0', 1);
  tableSubmit = LT.element('input', { type : 'button', style : 'cursor: pointer', 
        id : 'chatSubmit', size : 8, value : 'Create' }, LT.piecesForm);
  tableSubmit.onclick = function() { LT.createPiece(); };
  LT.pieceImageDiv = LT.element('div', { 'style' : 'clear: both; overflow: scroll;' }, LT.piecesTab, 'Columns: ');
  LT.loadPieceImages();
}
LT.createToolsPanel = function () {
  LT.toolsPanel = new LT.Panel( 'Tools', 'Tools', 6, 95, 210, 110);
  LT.toolsPanel.tabs = new LT.Tabs(LT.toolsPanel, ['Tiles', 'Pieces', 'Fog']);
  LT.piecesTab = LT.toolsPanel.tabs.tab[1].content;
  LT.fogTab = LT.toolsPanel.tabs.tab[2].content;
  LT.tilesTab = LT.toolsPanel.tabs.tab[0].content;
  populatePiecesTab();
  LT.element('div', {}, LT.fogTab, "YOU");
};

