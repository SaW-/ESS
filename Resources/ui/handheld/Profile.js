function Profile(title,role,achi,roleTag) {
	var self = Ti.UI.createWindow({
		title:'Profile',
		backgroundColor:'#fff',
		layout:'vertical'
	});

	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
	var scrollView = Ti.UI.createView({
	  //contentWidth: 'auto',
	  //contentHeight: 'auto',
	  //showVerticalScrollIndicator: true,
	  //showHorizontalScrollIndicator: true,
	  height: '100%',
	  width: '100%',
	  layout:'vertical'
	});

	var	titleLabel = Ti.UI.createLabel({
		  color:'black',
		  text: title,
		  font:{fontSize:'19sp',fontFamily:'Tahoma', fontWeight:'bold'},
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  top: '2%',
		  className:"title",
	});
	
	var icon = Ti.UI.createImageView({
				  image:role,
				  top: '2%',
				  className:"image",
	});
	
	
	var t, roleTitles = [],
    		rexRoleTitle = /<img[^>]+title="([^">]+)/g;

	while ( t = rexRoleTitle.exec( roleTag ) ) {
	    roleTitles.push( t[1] );
	}
	
	var	rankTitle = Ti.UI.createLabel({
			  color:'black',
			  text: "Rank",
			  font:{fontSize:'19sp',fontFamily:'Tahoma'},
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  top: '2%',
			  className:"rankTitle",
		});
		
	for(var i=0;i<roleTitles.length;i++){
		rankTitle.setText( roleTitles[i]);
	}
				
	var	achiLabel = Ti.UI.createLabel({
		  color:'black',
		  text: 'Achievements',
		  font:{fontSize:'19sp',fontFamily:'Tahoma'},
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  top: '3%',
		  className:"Achievements",
	});

	if(!achi){
		
		var	noAchiLabel = Ti.UI.createLabel({
		  color:'black',
		  text: 'No Achievements available for this User !',
		  font:{fontSize:'19sp',fontFamily:'Tahoma'},
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  top: '4%',
		  className:"Achievements",
		});
	
		scrollView.add(titleLabel);
		scrollView.add(icon);
		scrollView.add(rankTitle);
		scrollView.add(noAchiLabel);
	}else{
		
		var m, urls = [],mTitle, Titles = [],
    		rex = /<img[^>]+src="([^">]+)/g,
    		rexTitle = /<img[^>]+title="([^">]+)/g;
    		
		while ( m = rex.exec( achi ) ) {
		    urls.push( 'http://www.ess.mx'+m[1] );
		}
		
		while ( mTitle = rexTitle.exec( achi ) ) {
		    Titles.push( mTitle[1] );
		}
		//Ti.API.info(urls);
		//Ti.API.info(Titles);
		
		scrollView.add(titleLabel);
		scrollView.add(icon);
		scrollView.add(rankTitle);
		scrollView.add(achiLabel);
		
		var ach, /*header,*/ row, tit;
		
		var table = Ti.UI.createTableView({
			separatorColor:'transparent', 
			width:'100%',
			backgroundColor:'#fff',
		});
		var tableData = [];
		
		for(var i=0;i<urls.length;i++){
			if(i < urls.length && i < Titles.length){
				row = Ti.UI.createTableViewRow({
				            height:'auto',
				            top:'4%',
			        });
				        
				 /*       
				header = Titanium.UI.createView({
					   borderRadius:0,
					   backgroundColor:'white',
					   width:'100%',
					   height:'auto',
					   layout:'horizontal',
					});
						*/
						
				ach = Ti.UI.createImageView({
					  image:urls[i],
					  top: '2%',
					  left:'2%',
					  height: height*0.05,
					  width: width*0.1,
					  className:"image",
				});
				
				tit = Ti.UI.createLabel({
						  //top: labelActionTop,
						  text:Titles[i],
						  left: width*0.15,
						  //height:gapHeight,
						  color:'black',
						  className:"userNameLabel",
						  font:{fontSize:'14sp',fontFamily:'Tahoma'},
						  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
				});
				row.add(ach);
				row.add(tit);
				
				//row.add(header);
				
				tableData.push(row);
			}
			
		}
		
		table.setData(tableData);
		scrollView.add(table);
	}

		
	self.add(scrollView);
	
	return self;
};


module.exports = Profile;
