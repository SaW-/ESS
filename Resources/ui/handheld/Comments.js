function Comments(comments) {
	var self = Ti.UI.createWindow({
		title:'Comments',
		backgroundColor:'#fff',
		layout:'vertical'
	});

	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
	var table = Ti.UI.createTableView({
			separatorColor:'#ccc',
			width:'100%',
			backgroundColor:'#fff',
	});
	var tableData = [];
	var row, commentsLabel;
	for (var i = 0; i < comments.length; i++) {	
		row = Ti.UI.createTableViewRow({
            height:'auto',
		  	className:'comment',
        });

		
		commentsLabel = Ti.UI.createLabel({
		  color:'black',
		  text: comments[i]['user']+" : \n"+comments[i]['text'],
		  font:{fontSize:'17sp',fontFamily:'Tahoma', fontWeight:'bold'},
		  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		  top: '10dip',
		  left:"2%",
		  className:"comment",
		});
		
		row.add(commentsLabel);

		
		
		tableData.push(row);
	}
	
	table.setData(tableData);
	self.add(table);
	
	return self;
};


module.exports = Comments;
