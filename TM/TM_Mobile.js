/*global SecurityInnovation $ document prettyPrint*/
var TM_WebServices = SecurityInnovation.TeamMentor.WebClient.WebServices.TM_WebServices;

var a = null;
var id = null;
var lib = null;

var addPage = function(pageId, pageName, pageType, backPage)
	{
			var page = $("<div data-role='page' id='" + pageId + "'>test</div>");	
			page.html($("#page_template").html());
			page.find(".header h3").html( pageType + ": " + pageName);
			page.find(".header a").attr('href', "#" + backPage).css('color','black');
			page.appendTo("body");
			return page;
	};

var addListItem = function(targetList, text, image, pageType, backPage, onClick)
	{
				var id = text.replace(/ /g,'_').replace(/:/g,'_').replace(/\(/g,'_').replace(/\)/g,'_').replace(/\./g,'_');
				var li = $( '<li><a href="#'+ id +'"		data-transition="slide"><img src="' +  image + '" alt="'+text +
							     '" class="ui-li-icon">'+ text +'</a></li>');
				targetList.append(li);
				var pageDiv = addPage(id, text,pageType , backPage);
//				li.click(function() { onClick(pageDiv);});		 

				li.click(function() 
					{
//						var pageDiv = addPage(id, text,pageType , backPage);

						onClick(pageDiv);
					});		 
	};
var addArticles = function(targetList, articles, backPage)
	{
		
		$(articles).each(function(index, article)
			{
				addListItem(targetList, article.Metadata.Title,"/images/blog.png", "Article", backPage,  
					function(pageDiv) 
						{

							var html = article.Content.Data_Json;
							pageDiv.find(".wrapper").html('<div data-role="content" class="content"> ' + html  +'</div>');
							pageDiv.find(".wrapper pre").addClass("prettyprint");
						    prettyPrint();

						});
				

			});
		targetList.listview('refresh');
//		alert("Loading articles : " + articles.size());
	};

var loadViewData = function(targetPage, viewGuid)
	{
		var backPage = targetPage.attr('id');
		if (targetPage.find("ul li").size()  <2)
		{
//			con("need to load data for viewId:" + viewGuid);
			TM_WebServices.GetGuidanceItemsInView(viewGuid, function(articles) {  addArticles(targetPage.find('ul'), articles, backPage); });

		}			
//		tv = targetDiv;
	};
var addViews = function(targetList, views, backPage)
	{
		$(views).each(function(index,view)
			{
				
				addListItem(targetList, view.caption, "/TM/ViewIcon.png",  "View", backPage, function(pageDiv) 
					{ 
						loadViewData(pageDiv , view.viewId);
					});
				

			});
	};

var addFolders = function(targetList, folders, backPage)
	{
		$(folders).each(function(index,value)
			{
				var folderName = value.name;
				var folderId = folderName.replace(/ /g,'_');
				var liHtml = '<li><a href="#'+ folderId  +'"		data-transition="slide"><img src="/TM/FolderIcon.png" alt="' + folderName +
							 '" class="ui-li-icon">'+ folderName +'</a></li>';
				targetList.append(liHtml);
				var folderDiv = addPage(folderId, folderName, "Folder", backPage);
				addViews(folderDiv.find("ul"), value.views, folderId);
			});
	};
	
var createLibraryView = function(library)
	{
			var libraryName = library.name;
//			libraryName = libraryName.replace(/ /g,'_');
			var libraryLink = libraryName.replace(/ /g,'_');
			var addLibraryLink = function() 
			{		
				var liHtml = '<li><a href="#'+ libraryLink +'"		data-transition="slide"><img src="/TM/SingleLibrary.png" alt="'+libraryName +
							 '" class="ui-li-icon">'+ libraryName +'</a></li>';
				$("#homepage_list").append(liHtml);
			};
		
			addLibraryLink(libraryName);
			var libraryDiv = addPage(libraryLink, libraryName, "Library", "homepage");
			addFolders(libraryDiv.find("ul"), library.subFolders, libraryLink);			
			addViews(libraryDiv.find("ul"), library.views, libraryLink);
			
			lib = library;
	};
	
var populateHomePageList = function()
	{
		$("#homepage_list").append('<li>Available Libraries</li>');
		

		TM_WebServices.GetFolderStructure_Libraries(function(libraries)
			{
				$(libraries).each(function(index,value)
					{
						createLibraryView(value);
					});
/*				if (document.location.hash === "" || document.location.hash === "#")
				{
						$("#homepage_list").listview('refresh');
				}*/
				
				$("#homepage_list:visible").listview('refresh');
				
				
//				$.mobile.changePage('#OWASP');
						   
			});
				
		//addLibraryLink("OWASP");
		//addLibraryLink(".Net 3.5");
		

	};
	


	$(function()
	{			
		populateHomePageList();	
		//SecurityInnovation.TeamMentor.WebClient.WebServices.TM_WebServices.Login_PwdInClearText("admin","!!tmadmin",alert);
	});