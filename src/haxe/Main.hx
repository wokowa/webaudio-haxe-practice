import js.JQuery;
import PageSetup;

class Main {
	static var pageObj : PageSetup;

	static function main() {
		new JQuery("document").ready(function(e){
			pageObj = new PageSetup();
		});
	}
}