var TM_WebServices = SecurityInnovation.TeamMentor.WebClient.WebServices.TM_WebServices;

$(function()
	{	
		populateHomePageList();	

		//SecurityInnovation.TeamMentor.WebClient.WebServices.TM_WebServices.Login_PwdInClearText("admin","!!tmadmin",alert);
	});


var populateHomePageList = function()
	{
		$("#homepage_list").append('<li>Available Libraries</li>');
		
		var addLibraryLink = function(libraryName)
			{		
				var liHtml = '<li><a href="#'+ /*libraryName*/ '' +'about"		data-transition="slide"><img src="/TM/SingleLibrary.png" alt="'+libraryName +
							 '" class="ui-li-icon">'+ libraryName +'</a></li>';
				$("#homepage_list").append(liHtml);
			};

		TM_WebServices.GetLibraries(function(libraries)
			{
				$(libraries).each(function(index,value)
					{
						addLibraryLink(value.Caption);
					});
				$("#homepage_list").listview('refresh');
			});
				
		//addLibraryLink("OWASP");
		//addLibraryLink(".Net 3.5");
		
	};