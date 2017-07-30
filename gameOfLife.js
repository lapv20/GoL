
	
	
	$(document).ready(function(){
		createTable("map");
	});
	
	var SIZE = 40;
	var refreshIntervalId=null;
	var isPlay = false;

	function createTable(id) {
		var table = $("#"+id);
		var i,j;
		
		for(i = 1; i <= SIZE; i++) {
			table.append(createRow(SIZE,i));
		}
		
	}
	
	function createRow(size,id) {
		var tr = createElement("tr",id);
		var i=1, td;
		for(i = 1; i <= size; i++) {
			//td = createElement("td",id+"-"+i).append(id+""+i);
			td = createElement("td",id+"-"+i);
			//td = createElement("td",id+"-"+i).append(".");
			td.addClass("death");
			tr.append(td);
		}
		return tr;
	}
	
	
	function createElement(type, id) {
		var onClick = "", attr = "";
		if(type == "td") {
			onClick = "onclick='select(this);'";
			attr = " i='uno'";
		}
		return $("<"+type+" id='"+id+"' " + onClick + attr + "></"+type+">");
	}
	
	function play() {
		$('#play').attr('class','btn btn-disable');
		$('#stop').attr('class','btn btn-danger');
		refreshIntervalId = setInterval(function(){ change() }, 500);
		
	}
	
	function stop() {
		$('#stop').attr('class','btn btn-disable');
		$('#play').attr('class','btn btn-primary');
		clearInterval(refreshIntervalId)
	}
	
	function nextStep() {
		change();
	}
	
	function change() {
		var i,j,status, neighbors = 0;
		var deads = [], alive = [];
		
		for(i = 1; i <= SIZE; i++) {
			for(j = 1; j <= SIZE; j++) {
				status = $("#"+i+"-"+j).attr("class") == 'live' ? 'live' : 'death';
				neighbors = getVecinosVivos(i,j);
								
				//born
				if(status == 'death' && neighbors == 3) {
					alive.push("#"+i+"-"+j);
				}
				//overpopulation
				if(status == 'live' && neighbors > 3) {
					deads.push("#"+i+"-"+j);
				}
				//loneliness
				if(status == 'live' && neighbors < 2) {
					deads.push("#"+i+"-"+j);
				}
			}
		}
		
		for(i = 0; i <= alive.length; i++) {
			$(alive[i]).attr("class", "live");
		}
		for(i = 0; i <= deads.length; i++) {
			$(deads[i]).attr("class", "death");
		}		
	}
	
	
	function getVecinosVivos(i,j) {
		var can = 0;
		
		//up
		if($("#"+(i-1)+"-"+(j-1)).attr("id") != null && $("#"+(i-1)+"-"+(j-1)).attr("class") == "live") {
			can++;
		}
		if($("#"+(i-1)+"-"+(j)).attr("id") != null && $("#"+(i-1)+"-"+(j)).attr("class") == "live") {
			can++;
		}
		if($("#"+(i-1)+"-"+(j+1)).attr("id") != null && $("#"+(i-1)+"-"+(j+1)).attr("class") == "live") {
			can++;
		}
		//middle
		if($("#"+(i)+"-"+(j-1)).attr("id") != null && $("#"+(i)+"-"+(j-1)).attr("class") == "live") {
			can++;
		}
		if($("#"+(i)+"-"+(j+1)).attr("id") != null && $("#"+(i)+"-"+(j+1)).attr("class") == "live") {
			can++;
		}
		//down
		if($("#"+(i+1)+"-"+(j-1)).attr("id") != null && $("#"+(i+1)+"-"+(j-1)).attr("class") == "live") {
			can++;
		}
		if($("#"+(i+1)+"-"+(j)).attr("id") != null && $("#"+(i+1)+"-"+(j)).attr("class") == "live") {
			can++;
		}
		if($("#"+(i+1)+"-"+(j+1)).attr("id") != null && $("#"+(i+1)+"-"+(j+1)).attr("class") == "live") {
			can++;
		}
		return can;
	}
	
	function select(element) {
		if($("#"+element.id).attr("class") == "live") {
			$("#"+element.id).attr("class", "death");
		} else if($("#"+element.id).attr("class") == "death") {
			$("#"+element.id).attr("class", "live");
		}
	}