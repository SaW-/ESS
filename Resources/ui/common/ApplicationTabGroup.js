function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	self.addEventListener('open',function(e){	
		var actionBar = self.getActivity().actionBar;
		if (actionBar) {
	 		actionBar.title = "ESS";
	 	}
	});
	
	//create app tabs
	var win1 = new Window(L('newest'),"newest"),
		win2 = new Window(L('trending'),"trending"),
		win3 = new Window(L('lames'),"lames");
		//win4 = new Window(L('fav'),"fav");
	
	var tab1 = Ti.UI.createTab({
		title: L('newest'),
		icon: '/images/newest1.png',
		window: win1,
		id:0
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('trending'),
		icon: '/images/trending1.png',
		window: win2,
		id:1
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('lames'),
		icon: '/images/lames1.png',
		window: win3,
		id:2
	});
	win3.containingTab = tab3;
	
	/*var tab4 = Ti.UI.createTab({
		title: L('settings'),
		icon: '/images/KS_nav_views.png',
		window: win4
	});
	win4.containingTab = tab4;
	*/
	
	
	
	self.addTab(tab2);
	self.addTab(tab1);
	self.addTab(tab3);
	//self.addTab(tab4);
	
	
	self.addEventListener('focus', function(e) {
        createMenu();
    });
    
    function createMenu() {
		var activity = self.activity;
		activity.invalidateOptionsMenu();
		
		
      	var about = require('ui/handheld/About');
        activity.onCreateOptionsMenu = function(e) {
            //Ti.API.info(self.activeTab.title + ' onCreateOptionsMenu');
            var menu = e.menu;
            var m1 = menu.add({ title : 'About' });
            m1.addEventListener('click', function(e) {
				self.activeTab.open(new about);
            });
            
			var refresh = menu.add({
				title : "Reload",
				icon :  (Ti.Android.R.drawable.ic_menu_rotate ? Ti.Android.R.drawable.ic_menu_rotate : "/images/reload.png") ,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
			});
			
			refresh.addEventListener("click", function(e) {
				if(self.activeTab.title == 'Newest'){
					win1.fireEvent('Crefresh');
				}else if(self.activeTab.title == 'Trending'){
					win2.fireEvent('Crefresh');
				}else if(self.activeTab.title == 'Lames'){
					win3.fireEvent('Crefresh');
				}
				
			});
        };
    }
    
    
        /*
	self.addEventListener('swipe', function(e){
		
		// if(e.direction == 'left'){
			// activeTab--;
			// self.setActiveTab(activeTab);
		// }else if(e.direction == 'right'){
			// activeTab++;
			// self.setActiveTab(activeTab);
		// }
		
		if(self.activeTab.title == 'Trending'){
			if(e.direction == 'left'){
				self.setActiveTab(1);
			}
		}else if(self.activeTab.title == 'Newest'){
			if(e.direction == 'right'){
				self.setActiveTab(0);
			}else if(e.direction == 'left'){
				self.setActiveTab(2);
			}
		}else if(self.activeTab.title == 'Lames'){
			if(e.direction == 'right'){
				self.setActiveTab(1);
			}
		}
		
	});*/
	
	
	
	return self;
};

module.exports = ApplicationTabGroup;
