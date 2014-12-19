function About() {
	var self = Ti.UI.createWindow({
		title:'About',
		backgroundColor:'#fff',
		layout:'vertical'
	});

	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
	var scrollView = Ti.UI.createScrollView({
	  //contentWidth: 'auto',
	  //contentHeight: 'auto',
	  showVerticalScrollIndicator: true,
	  //showHorizontalScrollIndicator: true,
	  height: '100%',
	  width: '100%',
	  layout:'vertical'
	});
	
	var icon = Ti.UI.createImageView({
				  image:'/images/ess.png',
				  top: '7%',
				  className:"image",
	});
				
	var	about = Ti.UI.createLabel({
		  color:'black',
		  text: 'This is not an official app for Egypt Sarcasm Society, This is just a fan app.\n\n\n This application is created by Shady Amir William.\n\n\n All the comics are copyrighted to ESS ™.\n\n\n Version : 2.2 BETA ',
		  font:{fontSize:'19sp',fontFamily:'Tahoma', fontWeight:'bold'},
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  top: '2%',
		  className:"about",
	});
	
	
	var social = Titanium.UI.createView({
		   borderRadius:0,
		   top:'2%',
		   backgroundColor:'white',
		   width:'100%',
		   height:height*0.15,
		   layout:'horizontal',
		});
		
	var mail = Ti.UI.createImageView({
		  image:'/images/social/email.png',
		  left:(width - (width*0.13)*4) / 2,
		  width:width*0.13,
		  height:height*0.08,
		  className:"image",
		});
		
	var facebook = Ti.UI.createImageView({
	  image:'/images/social/facebook.png',
	  left:'2%',
	  width:width*0.13,
	  height:height*0.08,
	  className:"image",
	});
	
	var twitter = Ti.UI.createImageView({
	  image:'/images/social/twitter.png',
	  left:'2%',
	  width:width*0.13,
	  height:height*0.08,
	  className:"image",
	});
	
	var gmail = Ti.UI.createImageView({
	  image:'/images/social/google.png',
	  left:'2%',
	  width:width*0.13,
	  height:height*0.08,
	  className:"image",
	});

	
	
	social.add(mail);
	social.add(facebook);
	social.add(twitter);
	social.add(gmail);
	
	mail.addEventListener('click', function(e){
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.toRecipients = ['e.saw.90@gmail.com'];
		emailDialog.setSubject('ESS app Feedback');
		emailDialog.open();
	});
	
	facebook.addEventListener('click', function(e){
		Ti.Platform.openURL('https://www.facebook.com/shady.william');
	});
	
	twitter.addEventListener('click', function(e){
		Ti.Platform.openURL('https://twitter.com/Shady_Amir');
	});
	
	gmail.addEventListener('click', function(e){
		Ti.Platform.openURL('https://plus.google.com/109053660584416977267');
	});
		
	scrollView.add(icon);
	scrollView.add(about);	
	scrollView.add(social);
	self.add(scrollView);
	return self;
};


module.exports = About;
