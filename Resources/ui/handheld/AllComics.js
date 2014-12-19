function ApplicationWindow(title,cat) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'#ccc'
	});
	
	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
			
	var style = Ti.UI.ActivityIndicatorStyle.DARK;
	
	var errorMsg = Ti.UI.createLabel({
	  color: 'black',
	  font: {fontFamily:'Tahoma', fontSize:'16sp', fontWeight:'bold'},
	  text: 'Network Connection Error !',
	  style:style,
	  top:height*0.3,
	  //left:(width-Ti.UI.SIZE)/2,
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  height:Ti.UI.SIZE,
	  width:'100%'
	});
	
	self.addEventListener('Crefresh', function(e)
	{
		errorMsg.hide();
		self.setOpacity(0.3);
		var toast = Ti.UI.createNotification({
			message:'Loading Comics',
		    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	
		
			
		
		var activityIndicator = Ti.UI.createActivityIndicator({
		  color: 'black',
		  font: {fontFamily:'Tahoma', fontSize:'16sp', fontWeight:'bold'},
		  message: 'Loading...',
		  style:style,
		  top:height*0.5,
		  //left:width*0.38,
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  height:Ti.UI.SIZE,
		  width:'100%'
		});
		

		
		self.add(activityIndicator);
		activityIndicator.show();
		
		
		var page = "1";
		var url = "http://www.ess.mx/comics/arabic/"+cat+"/"+page;
		var table = Ti.UI.createTableView({
			separatorColor:'#ccc',
			width:'95%',
			backgroundColor:'#fff',
		});
		
	
		var tableData = [];
		var json, i, row, fullImgURL, thumbImgURL, userName, userRole, postTitle, postLikes, postDislikes
			, image, postTitleLabel, userNameLabel, fullImg, FullImg,fullImgTitle, comicURL, commentsLabel, comments, view
			, actionLabel, likeLabel, likeNoLabel, dislikeLabel, dislikeNoLabel, backgroundLabel, headerView, roleImage, achi
			, profileUserAchi, profileUsertitle, profileUserRole, profileView, fullComicUrl, profileuserRoleTag;
					
	    			
		//var p = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

		
		var roleURL;
			
		var labelActionHeight = height*0.05;
		var labelActionTop = height*0.02;
		var likeNoLabelTop = labelActionHeight*0.5;
		var gapHeight = height*0.07;
		var titleHeight = gapHeight *0.5;
		
		var loadMoreComicIndicator = Ti.UI.createActivityIndicator({
		  color: 'black',
		  font: {fontFamily:'Tahoma', fontSize:'16sp'},
		  message: '',
		  style:style,
		  top:'50%',
		  //left:'50%',
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  height:Ti.UI.SIZE,
		  width:'100%',
		  top: gapHeight,
		  bottom:gapHeight,
		  className:'postTitleLabel',
		  action:'load'
		});
		
		var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
	    		json = JSON.parse(this.responseText);
	    		//Ti.API.info(json);
	    		for (i = 0; i < json.length; i++) {
	    			
	    			//Ti.API.info(json[i][2]['userData']);
	    			
	    			fullImgURL = "http://www.ess.mx/uploads/"+json[i][0]['postData']['src'];
	    			thumbImgURL = "http://www.ess.mx/uploads/thumbs/thumb_"+json[i][0]['postData']['src'];
	    			
	    			userName = json[i][2]['userData']['user'];
	    			userRole = json[i][2]['userData']['role'];
	    			achi = json[i][2]['userData']['achs'];

					var p = /<img[^>]+src="([^">]+)/g;
					var m;
					if ( m = p.exec( userRole ) ) {
					    roleURL = 'http://www.ess.mx'+m[1];
					}
					
					//Ti.API.info(userName+" "+userRole+" "+m);
	    			
	    			comicURL = 'http://www.ess.mx'+json[i][0]['postData']['typeData']['url'];
	    			
	    			postTitle = json[i][0]['postData']['title'];
	    			postLikes = json[i][0]['postData']['likes'];
	    			postDislikes = json[i][0]['postData']['dislikes'];
	    			
	    			comments = json[i][1]['commentData'];
	    			
	    			row = Ti.UI.createTableViewRow({
			            height:'auto',
			        	image:thumbImgURL,
					  	fullURL:fullImgURL,
					  	className:cat,
					  	title:userName,
						action:'',
						comicURL:comicURL
			        });
			        
	    			image = Ti.UI.createImageView({
					  image:fullImgURL,
					  fullURL:fullImgURL,
					  left:'2%',
					  top: labelActionTop,
					  title:userName,
					  className:"image",
					  action:'',
					  width:'96%',
					  height:'auto',
					  comicURL:comicURL,
					  defaultImage:'/images/defImg.png'
					});
					
					
					userNameLabel = Ti.UI.createLabel({
					  color:'black',
					  text: userName,
					  font:{fontSize:'16sp',fontFamily:'Tahoma', fontWeight:'bold'},
					  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
					  left: '2%',
					  fullURL:fullImgURL,
					  title:userName,
					  className:"userNameLabel",
					  action:'profile',
					  comicURL:comicURL,
					  top: titleHeight,
					  userRole:roleURL,
					  userAchi:achi,
					  title:userName,
					  userRoleTag:userRole,
					});
					
					postTitleLabel = Ti.UI.createLabel({
					  color:'black',
					  text: postTitle,
					  font:{fontSize:'14sp',fontFamily:'Tahoma'},
					  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
					  left: '2%',
					  top:labelActionTop,
					  fullURL:fullImgURL,
					  title:userName,
					  className:"userNameLabel",
					  action:'',
					  comicURL:comicURL
					});
					
					commentsLabel = Ti.UI.createLabel({
					  color:'black',
					  text: "Comments ( "+comments.length+ " )",
					  font:{fontSize:'16sp',fontFamily:'Tahoma'},
					  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
					  top: '10dip',
					  left: '2%',
					  className:"comment",
					  action:'comment',
					  comments:comments,
					});
					
					 view = Titanium.UI.createView({
					   borderRadius:0,
					   backgroundColor:'white',
					   width:'100%',
					   height:'auto',
					   layout:'vertical',
					   title:userName,
					   action:'',
					   comicURL:comicURL,
					   fullURL:fullImgURL,
					   title:userName,
					});
					
					 actionLabel = Titanium.UI.createView({
					   borderRadius:0,
					   backgroundColor:'white',
					   width:'100%',
					   height:'auto',
					//   layout:'horizontal',
					   title:userName,
					   action:'',
					   comicURL:comicURL,
					   fullURL:fullImgURL,
					   title:userName,
					});

					likeLabel = Ti.UI.createImageView({
					  image:'/images/like.png',
					  fullURL:fullImgURL,
					  left:'2%',
					  top: labelActionTop,
					  title:userName,
					  className:"like",
					  action:'',
					  width:'10%',
					  height:labelActionHeight,
					  comicURL:comicURL,
					  defaultImage:'/images/like.png'
					});
					
					
					likeNoLabel = Ti.UI.createLabel({
					  color:'black',
					  text: postLikes,
					  font:{fontSize:'13sp',fontFamily:'Tahoma'},
					  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
					  top: likeNoLabelTop,
					  left: '13%',
					  fullURL:fullImgURL,
					  title:userName,
					  className:"userNameLabel",
					  action:'',
					  comicURL:comicURL
					});
					
					dislikeLabel = Ti.UI.createImageView({
					  image:'/images/dislike.png',
					  fullURL:fullImgURL,
					  right:'2%',
					  top: labelActionTop,
					  title:userName,
					  className:"like",
					  action:'',
					  width:'10%',
					  height:labelActionHeight,
					  comicURL:comicURL,
					  defaultImage:'/images/dislike.png'
					});
					
					
					dislikeNoLabel = Ti.UI.createLabel({
					  color:'black',
					  text: postDislikes,
					  font:{fontSize:'13sp',fontFamily:'Tahoma'},
					  textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
					  top: likeNoLabelTop,
					  right: '13%',
					  fullURL:fullImgURL,
					  title:userName,
					  className:"userNameLabel",
					  action:'',
					  comicURL:comicURL
					});
					
					actionLabel.add(likeLabel);
					actionLabel.add(likeNoLabel);
					actionLabel.add(dislikeNoLabel);
					actionLabel.add(dislikeLabel);
					
					backgroundLabel = Ti.UI.createLabel({
					  top: labelActionTop,
					  backgroundColor:'#ccc',
					  left: '0%',
					  width:'100%',
					  height:gapHeight,
					  //title:userName,
					  action:'backgroundLabel',
					  comicURL:comicURL,
					  fullURL:fullImgURL,
					});
					
	    			headerView = Titanium.UI.createView({
					   borderRadius:0,
					   backgroundColor:'white',
					   width:'100%',
					   height:'auto',
					   layout:'horizontal',
					   title:userName,
					   action:'profile',
					   comicURL:comicURL,
					   fullURL:fullImgURL,
					   title:userName,
					   userRole:roleURL,
					   userAchi:achi,
					   userRoleTag:userRole,
					});
					
	    			roleImage = Ti.UI.createImageView({
					  image:roleURL,
					  fullURL:fullImgURL,
					  left:'2%',
					  top: labelActionTop,
					  title:userName,
					  className:"image",
					  action:'profile',
					  height: gapHeight ,
					  comicURL:comicURL,
					  userRole:roleURL,
					  userAchi:achi,
					  title:userName,
					  userRoleTag:userRole,
					});
					headerView.add(roleImage);
					headerView.add(userNameLabel);
					
					view.add(headerView);
					view.add(postTitleLabel);
					view.add(image);
					view.add(actionLabel);
					view.add(backgroundLabel);
					
					row.add(view);
					
					tableData.push(row);
	    		}
			    
				table.setData(tableData);
				
				
				function addNewComics(table,cat,page){
					
					
					
					var toast = Ti.UI.createNotification({
						message:'Loading More Comics',
					    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
					
					var url = "http://www.ess.mx/comics/arabic/"+cat+"/"+page;
					/*
					var json, i, row, fullImgURL, thumbImgURL, userName, userRole, postTitle, postLikes, postDislikes
						, image, postTitleLabel, userNameLabel, postLikesLabel, postDislikesLabel, fullImg, FullImg, comicURL, commentsLabel, comments, postTitleLabel
						, view, actionLabel, likeLabel, likeNoLabel, dislikeLabel, dislikeNoLabel, backgroundLabel;
						
					var labelActionHeight = height*0.05;
					var labelActionTop = height*0.02;
					var likeNoLabelTop = labelActionHeight*0.5;
					var gapHeight = height*0.07;
					*/
						
					var xhr = Ti.Network.createHTTPClient({
					    onload: function() {
					    	table.deleteRow(table.data[0].rowCount-1);
					    	loadMoreComicIndicator.hide();
					    	postTitleLabel.show();
					    	
				    		json = JSON.parse(this.responseText);
				    		
				    		for (i = 0; i < json.length; i++) {
				    			fullImgURL = "http://www.ess.mx/uploads/"+json[i][0]['postData']['src'];
				    			thumbImgURL = "http://www.ess.mx/uploads/thumbs/thumb_"+json[i][0]['postData']['src'];
				    			
				    			userName = json[i][2]['userData']['user'];
				    			userRole = json[i][2]['userData']['role'];
				    			achi = json[i][2]['userData']['achs'];
				    			
				    			var p = /<img[^>]+src="([^">]+)/g;
								var m;
								if ( m = p.exec( userRole ) ) {
								    roleURL = 'http://www.ess.mx'+m[1];
								}
				    			
				    			comicURL = 'http://www.ess.mx'+json[i][0]['postData']['typeData']['url'];
				    			
				    			postTitle = json[i][0]['postData']['title'];
				    			postLikes = json[i][0]['postData']['likes'];
				    			postDislikes = json[i][0]['postData']['dislikes'];
				    			
				    			comments = json[i][1]['commentData'];
				    			
				    			row = Ti.UI.createTableViewRow({
						            height:'auto',
						        	image:thumbImgURL,
								  	fullURL:fullImgURL,
								  	title:userName,
								  	className:cat,
								  	action:'',
								  	comicURL:comicURL
						        });
						        
				    			image = Ti.UI.createImageView({
								  image:fullImgURL,
								  fullURL:fullImgURL,
								  left:'2%',
								  top: labelActionTop,
								  title:userName,
								  className:"image",
								  action:'',
								  width:'96%',
								  height:'auto',
								  comicURL:comicURL,
								  defaultImage:'/images/defImg.png'
								});
								
								
								userNameLabel = Ti.UI.createLabel({
								  color:'black',
								  text: userName,
								  font:{fontSize:'16sp',fontFamily:'Tahoma', fontWeight:'bold'},
								  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
								  left: '2%',
								  fullURL:fullImgURL,
								  title:userName,
								  className:"userNameLabel",
								  action:'profile',
								  comicURL:comicURL,
								  top: titleHeight,
								  userRole:roleURL,
								  userAchi:achi,
								  title:userName,
								  userRoleTag:userRole,
								});
								
								postTitleLabel = Ti.UI.createLabel({
								  color:'black',
								  text: postTitle,
								  font:{fontSize:'14sp',fontFamily:'Tahoma'},
								  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
								  left: '2%',
								  top:labelActionTop,
								  fullURL:fullImgURL,
								  title:userName,
								  className:"userNameLabel",
								  action:'',
								  comicURL:comicURL
								});
								
								commentsLabel = Ti.UI.createLabel({
								  color:'black',
								  text: "Comments ( "+comments.length+ " )",
								  font:{fontSize:'16sp',fontFamily:'Tahoma'},
								  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
								  top: '10dip',
								  left: '2%',
								  className:"comment",
								  action:'comment',
								  comments:comments,
								});
								
								 view = Titanium.UI.createView({
								   borderRadius:0,
								   backgroundColor:'white',
								   width:'100%',
								   height:'auto',
								   layout:'vertical',
								   title:userName,
								   action:'',
								   comicURL:comicURL,
								   fullURL:fullImgURL,
								   title:userName,
								});
								
								 actionLabel = Titanium.UI.createView({
								   borderRadius:0,
								   backgroundColor:'white',
								   width:'100%',
								   height:'auto',
								//   layout:'horizontal',
								   title:userName,
								   action:'',
								   comicURL:comicURL,
								   fullURL:fullImgURL,
								   title:userName,
								});
				
								likeLabel = Ti.UI.createImageView({
								  image:'/images/like.png',
								  fullURL:fullImgURL,
								  left:'2%',
								  top: labelActionTop,
								  title:userName,
								  className:"like",
								  action:'',
								  width:'10%',
								  height:labelActionHeight,
								  comicURL:comicURL,
								  defaultImage:'/images/like.png'
								});
								
								
								likeNoLabel = Ti.UI.createLabel({
								  color:'black',
								  text: postLikes,
								  font:{fontSize:'13sp',fontFamily:'Tahoma'},
								  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
								  top: likeNoLabelTop,
								  left: '13%',
								  fullURL:fullImgURL,
								  title:userName,
								  className:"userNameLabel",
								  action:'',
								  comicURL:comicURL
								});
								
								dislikeLabel = Ti.UI.createImageView({
								  image:'/images/dislike.png',
								  fullURL:fullImgURL,
								  right:'2%',
								  top: labelActionTop,
								  title:userName,
								  className:"like",
								  action:'',
								  width:'10%',
								  height:labelActionHeight,
								  comicURL:comicURL,
								  defaultImage:'/images/dislike.png'
								});
								
								
								dislikeNoLabel = Ti.UI.createLabel({
								  color:'black',
								  text: postDislikes,
								  font:{fontSize:'13sp',fontFamily:'Tahoma'},
								  textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
								  top: likeNoLabelTop,
								  right: '13%',
								  fullURL:fullImgURL,
								  title:userName,
								  className:"userNameLabel",
								  action:'',
								  comicURL:comicURL
								});
								
								actionLabel.add(likeLabel);
								actionLabel.add(likeNoLabel);
								actionLabel.add(dislikeNoLabel);
								actionLabel.add(dislikeLabel);
								
								backgroundLabel = Ti.UI.createLabel({
								  top: labelActionTop,
								  backgroundColor:'#ccc',
								  left: '0%',
								  width:'100%',
								  height:gapHeight,
								  //title:userName,
								  action:'backgroundLabel',
								  comicURL:comicURL,
								  fullURL:fullImgURL,
								});
								
								headerView = Titanium.UI.createView({
								   borderRadius:0,
								   backgroundColor:'white',
								   width:'100%',
								   height:'auto',
								   layout:'horizontal',
								   title:userName,
								   action:'profile',
								   comicURL:comicURL,
								   fullURL:fullImgURL,
								   title:userName,
								   userRole:roleURL,
								   userAchi:achi,
								   userRoleTag:userRole,
								});
								
				    			roleImage = Ti.UI.createImageView({
								  image:roleURL,
								  fullURL:fullImgURL,
								  left:'2%',
								  top: labelActionTop,
								  title:userName,
								  className:"image",
								  action:'profile',
								  height: gapHeight ,
								  comicURL:comicURL,
								  userRole:roleURL,
								  userAchi:achi,
								  title:userName,
								  userRoleTag:userRole,
								});
								headerView.add(roleImage);
								headerView.add(userNameLabel);
								
								view.add(headerView);
								view.add(postTitleLabel);
								view.add(image);
								view.add(actionLabel);
								view.add(backgroundLabel);
								
								row.add(view);
								
								table.appendRow(row);
				    		}
				    		
				    		row = Ti.UI.createTableViewRow({
					            height:'auto',
							  	className:'loadmore',
							  	action:'load'
					        });
								
							postTitleLabel = Ti.UI.createLabel({
							  color:'black',
							  text: 'Load More Comics',
							  action:'load',
							  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							  font:{fontSize:'16sp',fontFamily:'Tahoma', fontWeight:'bold'},
							  top: gapHeight,
							  //left: '33%',
							  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
							  width:'100%',
							  bottom:gapHeight,
							  className:'postTitleLabel',
							});
							row.add(loadMoreComicIndicator);
							row.add(postTitleLabel);
							table.appendRow(row);
							table.scrollToIndex(table.data[0].rowCount-6);
						    //return "done";
					    },
					    onerror: function(e) {
					    	loadMoreComicIndicator.hide();
					    	postTitleLabel.show();
				    		/*row = Ti.UI.createTableViewRow({
					            height:'auto',
							  	className:'loadmore',
					        });
								
							postTitleLabel = Ti.UI.createLabel({
							  color:'black',
							  text: 'Load More Comics',
							  action:'load',
							  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							  font:{fontSize:'16sp',fontFamily:'Tahoma', fontWeight:'bold'},
							  top: '30dip',
							  left: '33%',
							  bottom:'30dip'
							});
							row.add(loadMoreComicIndicator);
							row.add(postTitleLabel);
							table.appendRow(row);*/
							var toast = Ti.UI.createNotification({
								message:'There was an error retrieving the Comics. Try again.',
							    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
							});
							toast.show();
					    },
					});
					xhr.open("GET", url);
					xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01');
					xhr.setRequestHeader('Accept-Encoding','gzip,deflate,sdch');
					xhr.setRequestHeader('Accept-Language','en-US,en;q=0.8,ar;q=0.6');
					//xhr.setRequestHeader('Access-Token','NULL');
					//xhr.setRequestHeader('Connection','keep-alive');
					xhr.setRequestHeader('User-Agent','Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36');
					//xhr.setRequestHeader('Host','www.ess.mx');
					//xhr.setRequestHeader('Origin','www.ess.mx');
					//xhr.setRequestHeader('Referer','www.ess.mx');
					xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
					xhr.send();
					 
				}
	
				table.addEventListener('click', function(e)
				{
					var action = '';
					//Ti.API.info(e.source);
					if(e.source.className == 'loadmore'){
						
						action = e.source.children[0].action;
					}else{
						action = e.source.action;
					}
						
					//Ti.API.info(page);
					if(action == 'load'){
						loadMoreComicIndicator.show();
						postTitleLabel.hide();
						self.setOpacity(0.3);
						page++;
						addNewComics(table,cat,page);
						self.setOpacity(1.0);
						
					}else if (action == 'comment'){
						var Com = require('ui/handheld/Comments');
						var allComments = e.source.comments;
						if(allComments.length > 0){
							self.containingTab.open(new Com(allComments));
						}else{
							var noComments = Ti.UI.createNotification({
								message:'No Comments on this Comic',
							    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
							});
							noComments.show();
						}
					}else if (action == 'backgroundLabel'){
						
					}else if(action == 'profile'){
						profileUserAchi = e.source.userAchi;
						profileUserRole = e.source.userRole;
						profileUsertitle = e.source.title;
						profileuserRoleTag = e.source.userRoleTag;
						profileView = require('ui/handheld/Profile');
						self.containingTab.open(new profileView(profileUsertitle,profileUserRole,profileUserAchi,profileuserRoleTag));
						
					}else{
						fullImg = e.source.fullURL;
						fullImgTitle = e.source.title;
						fullComicUrl = e.source.comicURL;
						FullImg = require('ui/handheld/FullImg');
						self.containingTab.open(new FullImg(fullImg,fullImgTitle,fullComicUrl));	
					}
						    
				});
				
				row = Ti.UI.createTableViewRow({
		            height:'auto',
				  	className:'loadmore',
				  	action:'load'
		        });
					
				postTitleLabel = Ti.UI.createLabel({
				  color:'black',
				  text: 'Load More Comics',
				  action:'load',
				  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
				  font:{fontSize:'16sp',fontFamily:'Tahoma', fontWeight:'bold'},
				  top: gapHeight ,
				  //left: '33%',
				  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				  width:'100%',
				  bottom:gapHeight
				});
				
				row.add(loadMoreComicIndicator);
				row.add(postTitleLabel);
				table.appendRow(row);
				
				
				self.add(table);
				activityIndicator.hide();
				self.setOpacity(1.0);
		    },
		    onerror: function(e) {
		    	activityIndicator.hide();
				var toast = Ti.UI.createNotification({
					message:'There was an error retrieving the Comics. Try again.',
				    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
	

				self.add(errorMsg);
				errorMsg.show();
				self.setOpacity(1.0);
			    /*Ti.API.info("STATUS: " + this.status);
			    Ti.API.info("TEXT:   " + this.responseText);
			    Ti.API.info("ERROR:  " + e.error);
			    alert('There was an error retrieving the remote data. Try again.');*/
		    },
		    //timeout:5000
		});
		xhr.open("GET", url);
		xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01');
		xhr.setRequestHeader('Accept-Encoding','gzip,deflate,sdch');
		xhr.setRequestHeader('Accept-Language','en-US,en;q=0.8,ar;q=0.6');
		//xhr.setRequestHeader('Access-Token','NULL');
		//xhr.setRequestHeader('Connection','keep-alive');
		xhr.setRequestHeader('User-Agent','Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36');
		//xhr.setRequestHeader('Host','www.ess.mx');
		//xhr.setRequestHeader('Origin','www.ess.mx');
		//xhr.setRequestHeader('Referer','www.ess.mx');
		xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
		xhr.send();
	});
	
	self.fireEvent('Crefresh');
	
	return self;
};


module.exports = ApplicationWindow;
