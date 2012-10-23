/*global SecurityInnovation $ document*/
var TM_WebServices = SecurityInnovation.TeamMentor.WebClient.WebServices.TM_WebServices;

var a = null;
var id = null;
var lib = null;

var addPage = function(pageId, pageName)
	{
			var page = $("<div data-role='page' id='" + pageId + "'>test</div>");	
			page.html($("#page_template").html());
			page.find(".header h3").html("Library: " + pageName);
			page.appendTo("body");
			return page;
	};

var addViews = function(targetList, views)
	{
		$(views).each(function(index,value)
			{
				var liHtml = '<li><a href="#'+ value.caption +'"		data-transition="slide"><img src="/TM/ViewIcon.png" alt="'+value.caption +
							 '" class="ui-li-icon">'+ value.caption +'</a></li>';
				targetList.append(liHtml);
			});
	};

var addFolders = function(targetList, folders)
	{
		$(folders).each(function(index,value)
			{
				var folderLink = value.name.replace(/ /g,'_');
				var liHtml = '<li><a href="#'+ folderLink  +'"		data-transition="slide"><img src="/TM/FolderIcon.png" alt="'+value.name  +
							 '" class="ui-li-icon">'+ value.name +'</a></li>';
				targetList.append(liHtml);
				id = value;	
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
			var libraryDiv = addPage(libraryLink, libraryName);
			addFolders(libraryDiv.find("ul"), library.subFolders);			
			addViews(libraryDiv.find("ul"), library.views);
			
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
				
				
				$.mobile.changePage('#OWASP');
						   
			});
				
		//addLibraryLink("OWASP");
		//addLibraryLink(".Net 3.5");
		

	};
	
	
	$(function()
	{	
		populateHomePageList();	

		//SecurityInnovation.TeamMentor.WebClient.WebServices.TM_WebServices.Login_PwdInClearText("admin","!!tmadmin",alert);
	});