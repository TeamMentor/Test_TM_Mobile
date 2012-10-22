$(function()
	{	
		populateHomePageList();	
	});

var populateHomePageList = function()
	{
		$("#homepage_list").append('<li>Available Libraries</li>');
		
		var libraryName = "OWASP";
		var liHtml = '<li><a href="#'+ /*libraryName*/ '' +'about"		data-transition="slide"><img src="/TM/SingleLibrary.png" alt="'+libraryName +
					 '" class="ui-li-icon">'+ libraryName +'</a></li>';
		$("#homepage_list").append(liHtml);

		$("#homepage_list").listview('refresh');
	};