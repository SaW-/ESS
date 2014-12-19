function FullImg(fullImg,title,comicURL) {
	var self = Ti.UI.createWindow({
		backgroundColor:'#fff',
		title:title
	});
	
	var toast = Ti.UI.createNotification({
		message:'Loading Comic',
	    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
	});
	toast.show();
	
	var height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;
	 			
	var htmlContent = '<html><head><meta name="viewport" content="width=' + width + ',initial-scale=1.0,minimum-scale=1.0,target-densitydpi=device-dpi"/><style>img{display:block;margin:0 auto;top:0px;}</style></head><body><img src="'+fullImg+'" /></body></html>';
	var webview = Titanium.UI.createWebView({
	 	//url:fullImg,
	 	html:htmlContent,
	 	width:Titanium.UI.FILL,
	 	height:Titanium.UI.FILL,
	 	loading:true,
	 	scalesPageToFit:true,
	 	
	 });
			
	var style = Ti.UI.ActivityIndicatorStyle.DARK;
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: 'black',
	  font: {fontFamily:'Tahoma', fontSize:'16sp', fontWeight:'bold'},
	  message: 'Loading...',
	  style:style,
	  top:height*0.5,
	  //left:width*0.4,
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  height:Ti.UI.SIZE,
	  width:'100%'
	});
		
	self.add(activityIndicator);
	activityIndicator.show();
	 
	 webview.addEventListener("load", function(e) {
	    activityIndicator.hide();
	});
	self.addEventListener('focus', function(e) {
        createMenu();
    });
	
	 function createMenu() {
		var activity = self.activity;
		activity.invalidateOptionsMenu();
		
        activity.onCreateOptionsMenu = function(e) {
            //Ti.API.info(self.activeTab.title + ' onCreateOptionsMenu');
            var menu = e.menu;

			var menushare = menu.add({
				title : "Share",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : (Ti.Android.R.drawable.ic_menu_share ? Ti.Android.R.drawable.ic_menu_share : "img/action_about.png.png")
			});
			menushare.addEventListener("click", function(e) {
				var txt = comicURL;
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_SEND,
					type : "text/plain"
			});
	
				intent.putExtra(Ti.Android.EXTRA_TEXT, txt);
				intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
				try {
					Ti.Android.currentActivity.startActivity(Ti.Android.createIntentChooser(intent,'Share'));
				} catch (ex) {
					Ti.UI.createNotification({
						message : 'Hey, install some sharing apps!'
					}).show();
				}
			});
        };
    }
			
	
	self.add(webview);
	return self;
};

module.exports = FullImg;
